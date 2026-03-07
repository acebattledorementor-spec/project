import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, 'bookings.json')

function loadBookings() {
  if (!existsSync(dataPath)) return []
  try {
    return JSON.parse(readFileSync(dataPath, 'utf8'))
  } catch {
    return []
  }
}

function saveBookings(bookings) {
  writeFileSync(dataPath, JSON.stringify(bookings, null, 2), 'utf8')
}

const ADMIN_USERNAME = 'aceBattledore'
const ADMIN_PASSWORD = 'password123'
const validTokens = new Set()

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {}
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = `tk_${Date.now()}_${Math.random().toString(36).slice(2)}`
    validTokens.add(token)
    return res.json({ success: true, token })
  }
  res.status(401).json({ success: false, error: 'Invalid credentials' })
})

app.post('/api/auth/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) validTokens.delete(token)
  res.json({ success: true })
})

app.get('/api/bookings', authMiddleware, (req, res) => {
  try {
    const bookings = loadBookings()
    const sorted = [...bookings].sort((a, b) => (a.date_ymd + a.court).localeCompare(b.date_ymd + b.court) || (b.created_at || '').localeCompare(a.created_at || ''))
    res.json({ bookings: sorted })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/api/bookings/available', (req, res) => {
  const { date, court } = req.query
  if (!date || !court) return res.status(400).json({ error: 'date and court required' })
  try {
    const bookings = loadBookings()
    const allSlotIds = new Set()
    for (const b of bookings) {
      if (b.date_ymd === date && b.court === court && Array.isArray(b.slot_ids)) {
        b.slot_ids.forEach(id => allSlotIds.add(id))
      }
    }
    res.json({ bookedSlotIds: [...allSlotIds] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const handleBookingConfirmation = (req, res) => {
  const {
    dateYmd,
    court,
    slotIds,
    name,
    phone,
    email,
    purpose,
    dateText,
    timeSlots,
    total
  } = req.body || {}

  if (!dateYmd || !court || !Array.isArray(slotIds) || slotIds.length === 0 || !name || !phone || !email || total == null) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const purposeText = typeof purpose === 'string' ? purpose.trim() : ''

    const bookings = loadBookings()
    const bookedSet = new Set()
    for (const b of bookings) {
      if (b.date_ymd === dateYmd && b.court === court && Array.isArray(b.slot_ids)) {
        b.slot_ids.forEach(id => bookedSet.add(id))
      }
    }

    const conflict = slotIds.some(id => bookedSet.has(id))
    if (conflict) {
      return res.status(409).json({
        success: false,
        error: 'One or more selected slots are already booked. Please choose different slots.',
        code: 'SLOT_CONFLICT'
      })
    }

    const nextId = bookings.length ? Math.max(...bookings.map(b => b.id || 0)) + 1 : 1
    const newBooking = {
      id: nextId,
      date_ymd: dateYmd,
      court,
      purpose: purposeText,
      slot_ids: slotIds,
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      amount: Number(total),
      date_text: dateText || '',
      time_slots_text: timeSlots || '',
      created_at: new Date().toISOString()
    }
    bookings.push(newBooking)
    saveBookings(bookings)

    res.json({
      success: true,
      bookingReceipt: {
        customerName: name,
        phone,
        email,
        amount: Number(total),
        court,
        dateText: dateText || '',
        timeSlots: timeSlots || ''
      }
    })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

app.post('/api/bookings/confirm-booking', handleBookingConfirmation)
app.post('/api/bookings/confirm-payment', handleBookingConfirmation)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
