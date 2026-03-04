import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ClipboardCheck, 
  Phone, 
  BookOpen, 
  Trophy, 
  Users,
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Send,
  Target,
  Award,
  Zap,
  Calendar
} from 'lucide-react'
import './App.css'

// ==================== DATA CONFIGURATION ====================
// You can easily modify this data to customize your website

const SITE_CONFIG = {
  name: "ACE BATTLEDORE",
  tagline: "Badminton Centre of Excellence",
  description: "Elevating Your Game to Championship Level",
  phone: "8884404456",
  email: "ACEBATTLEDOREMENTOR@GMAIL.COM",
  address: "21/1 Kempanahalli Village, Yelahanka, Bengaluru, Karnataka 560064",
  hours: "All Days: 6:00 AM - 10:00 PM"
}

const BOOKING_CONFIG = {
  courts: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5"],
  businessHours: { start: 6, end: 22 }, // 6am to 10pm
  pricing: {
    weekday: [
      { start: 6, end: 10, price: 325, label: "Morning (6AM-10AM)" },
      { start: 10, end: 15, price: 275, label: "Afternoon (10AM-3PM)" },
      { start: 15, end: 22, price: 325, label: "Evening (3PM-10PM)" }
    ],
    weekend: [
      { start: 6, end: 22, price: 350, label: "All Day (6AM-10PM)" }
    ]
  },
  bulkBookings: {
    monthly: {
      weekdaysOnly: { price: 6500, label: "Only Weekdays" },
      fullMonth: { price: 9750, label: "Full Month" }
    },
    quarterly: 29250,
    yearly: 109500
  }
}

const HOMEPAGE_IMAGES = [
  "/homepage/IMG_4762.jpeg",
  "/homepage/IMG_4761.jpeg",
  "/homepage/IMG_4760.jpeg",
  "/homepage/IMG_4759.jpeg",
  "/homepage/IMG_4757.jpeg",
  "/homepage/IMG_4756.jpeg",
  "/homepage/IMG_4755.jpeg",
  "/homepage/IMG_4752.jpeg"
]

const ABOUT_DATA = {
  story: `ACE Battledore was founded in 2015 with a vision to create world-class badminton players. 
  Our state-of-the-art facility spans over 50,000 square feet, featuring 5 international-standard courts, 
  professional coaching staff, and cutting-edge training equipment. We've trained over 100 players, 
  with many going on to compete at national and international levels.`,
  mission: "To nurture badminton talent and create champions through systematic training, world-class facilities, and passionate coaching.",
  vision: "To become the leading badminton training center, producing Olympic-level athletes and promoting the sport globally.",
  stats: [
    { number: "100+", label: "Players Trained" },
    { number: "5", label: "Professional Courts" },
    { number: "2", label: "Expert Coaches" },
    { number: "50+", label: "Championships Won" }
  ],
  team: [
    { name: "Buddha Apparao", role: "Founder", experience: "Visionary leader and passionate badminton enthusiast", image: "/team/Buddha Appa rao.jpeg" },
    { name: "Adilaxmi", role: "Founder", experience: "Co-founder dedicated to nurturing young talent", image: "/team/Adilaxmi.jpeg" },
    { name: "Pavan Buddha", role: "Head Coach", experience: "S/O Buddha Apparao, Professional certified coach", image: "/team/Pavan Buddha.jpeg" },
    { name: "Sai Buddha", role: "Head Coach", experience: "S/O Buddha Apparao, Elite training specialist", image: "/team/Sai Buddha.jpeg" },
    { name: "Sarath", role: "Facility Management Expert", experience: "Expert in facility management and operations", image: "/team/sarath.jpeg" }
  ]
}

const SKILL_PROGRAMS = [
  {
    id: 1,
    title: "Beginner's Foundation",
    level: "Beginner (Kids & Adults)",
    duration: "Monthly, 3-6 Months, Yearly",
    price: "₹4,000/Month | ₹11,500 (3M) | ₹23,000 (6M) | ₹40,500 (Yearly)",
    description: "Build strong fundamentals from scratch with COE Level 1 focus. Perfect for newcomers to badminton.",
    features: [
      "Grip, stance, and footwork basics",
      "Forehand & backhand drives",
      "Lift techniques and high strokes",
      "Simple rallies and basic game play",
      "Building confidence and discipline",
      "Front court strokes: Keeps, Drives, Lifts, Toss, Drop, Smash"
    ]
  },
  {
    id: 2,
    title: "Intermediate Mastery",
    level: "Intermediate (Kids & Adults)",
    duration: "Monthly, 3-6 Months, Yearly",
    price: "₹4,500-₹5,000/Month | ₹13,500 (3M) | ₹25,000 (6M) | ₹50,000 (Yearly)",
    description: "Refine your skills & improve game strategy with COE Level 2 focus. Build match-ready competence.",
    features: [
      "Advanced footwork & movement drills",
      "Smash, drop, and net shot variations",
      "Serve strategies for hard smash & double techniques",
      "Match playing skills (Lights and strength training)",
      "Back court expertise: Smash variations (Long/Mid/Short)",
      "Rally control & tempo management",
      "T-Pass and cross-court patterns"
    ]
  },
  {
    id: 3,
    title: "Advanced Competition",
    level: "Advanced",
    duration: "12-16 Weeks",
    price: "Custom Pricing Available",
    description: "Elite training for competitive players mastering technical and tactical play (COE Level 3).",
    features: [
      "Technical analysis of game play mechanics",
      "Tactical variation & shot selection",
      "Opponent analysis & matchup strategies",
      "Full-court movement patterns",
      "Video analysis and performance optimization",
      "Tournament preparation and match scenarios"
    ]
  },
  {
    id: 4,
    title: "Junior Champions",
    level: "Ages 8-16",
    duration: "Ongoing Programs",
    price: "₹4,000/Month | Custom Packages",
    description: "Specialized program building future champions from fundamentals through advanced techniques.",
    features: [
      "Age-appropriate stroke development",
      "Progressive COE assessment pathway (Level 1-4)",
      "Fun-based skill games & drills",
      "Competition preparation",
      "Mental conditioning for young athletes",
      "Individual & group coaching available"
    ]
  }
]

const INDUCTION_STEPS = [
  { 
    step: 1, 
    title: "Registration", 
    description: "Complete your online registration form and select your preferred program level." 
  },
  { 
    step: 2, 
    title: "Assessment", 
    description: "Attend a skill assessment session where our coaches evaluate your current level." 
  },
  { 
    step: 3, 
    title: "Orientation", 
    description: "Join our orientation session to understand facility rules, schedules, and expectations." 
  },
  { 
    step: 4, 
    title: "Equipment Setup", 
    description: "Get guidance on equipment selection and ensure you're ready for training." 
  },
  { 
    step: 5, 
    title: "Begin Training", 
    description: "Start your journey with your assigned coach and training group!" 
  }
]

const ASSESSMENT_QUESTIONS = [
  {
    id: 'experience',
    question: "How long have you been playing badminton?",
    options: ["Complete beginner", "Less than 1 year", "1-3 years", "3-5 years", "5+ years"]
  },
  {
    id: 'frequency',
    question: "How often do you currently play?",
    options: ["Never played", "Once a month", "Weekly", "2-3 times per week", "Daily"]
  },
  {
    id: 'goals',
    question: "What are your primary goals?",
    options: ["Fitness & Recreation", "Learn the basics", "Improve my game", "Compete in tournaments", "Professional career"]
  },
  {
    id: 'fitness',
    question: "How would you rate your current fitness level?",
    options: ["Sedentary", "Light activity", "Moderately active", "Very active", "Athletic"]
  }
]

const COE_ASSESSMENT = {
  title: "ACE BATTLEDORE - CENTER OF EXCELLENCE",
  description: "Comprehensive skill assessment framework for badminton excellence",
  levels: [
    {
      id: 'level-1',
      name: 'Level 1',
      title: 'Stroke Placement & Accuracy',
      duration: '10 shuttles × 1 set only',
      modules: [
        {
          id: 'm1',
          name: 'Module 1: Front Court - Standing (Ex.1)',
          criteria: [
            { 
              stance: '(A) Front Eight; Side',
              positions: [
                'i. Straight Keeps',
                'ii. Straight Drives',
                'iii. Straight Lift (High)',
                'iv. Toss',
                'v. Drop',
                'vi. Smash'
              ]
            },
            { 
              stance: '(B) Front Left Side - Straight Keeps',
              positions: [
                'i. Straight Keeps',
                'ii. Doubles',
                'iii. Tap',
                'iv. Lift (High)',
                'v. Push (Downwards)',
                'vi. Push-Lift'
              ]
            },
            { 
              stance: '(B) Cross Court Keep',
              positions: [
                'i. Tap',
                'ii. Tap (High)',
                'iii. Push',
                'iv. Push',
                'v. Even Lift'
              ]
            }
          ]
        },
        {
          id: 'm2',
          name: 'Module 2: Back Court (Straight)',
          criteria: [
            { 
              stance: '(A) Back Eight; Straight',
              positions: [
                'i. Toss',
                'ii. Drop - Slow, Fast',
                'iii. Smash - 1. Long, 2. Mid, 3. Short',
                'iv. Even Lift'
              ]
            },
            { 
              stance: '(B) Cross Court',
              positions: [
                'i. T-Pass',
                'ii. Drops - Slow, Fast',
                'iii. Smash - 1. Long, 2. Mid, 3. Short'
              ]
            },
            { 
              stance: '(B) Cross Court Keep',
              positions: [
                'i. Tap',
                'ii. Tap (High)',
                'iii. Push',
                'iv. Push (Downwards)',
                'v. Even Lift'
              ]
            }
          ]
        },
        {
          id: 'm3',
          name: 'Module 3: Full Court Movement & Patterns',
          criteria: [
            { 
              stance: 'Front Court Combinations',
              positions: [
                '(A) Front Eight; Side - Straight keeps + Drives + Lift',
                '(B) Front Left Side - Keep + Doubles + Tap + Lift',
                '(C) Front Cross Court - Tap + Tap (High) + Push + Even Lift'
              ]
            },
            { 
              stance: 'Back Court Combinations',
              positions: [
                '(A) Back Eight; Straight - Toss + Drop (Slow/Fast) + Smash (Long/Mid/Short)',
                '(B) Back Cross Court - T-Pass + Drops (Slow/Fast) + Smash',
                '(C) Back Cross Court Keep - Tap + Tap (High) + Push (Downwards) + Even Lift'
              ]
            },
            { 
              stance: 'Integrated Court Movement',
              positions: [
                'Transition from Front to Back Court',
                'Transition from Back to Front Court',
                'Cross-Court Recovery Patterns',
                'Full-Court Point Construction'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'level-2',
      name: 'Level 2',
      title: 'Physical Examination & Rally Control',
      modules: [
        {
          id: 'm4',
          name: 'Module 4: Physical Examination',
          criteria: ['Flexibility', 'Strength', 'Endurance', 'Speed & Agility', 'Coordination']
        },
        {
          id: 'm5',
          name: 'Module 5: Rally Control & Tempo',
          criteria: ['Shot Selection', 'Court Positioning', 'Pace Management', 'Point Construction', 'Recovery Patterns']
        }
      ]
    },
    {
      id: 'level-3',
      name: 'Level 3',
      title: 'Technical & Tactical Excellence',
      modules: [
        {
          id: 'm6',
          name: 'Module 6: Technical Analysis of Game Play',
          criteria: ['Stroke Mechanics', 'Footwork Efficiency', 'Body Rotation', 'Follow-through', 'Consistency']
        },
        {
          id: 'm7',
          name: 'Module 7: Tactical Variation (Shot Selection)',
          criteria: ['Offensive Tactics', 'Defensive Strategy', 'Match Reading', 'Opponent Analysis', 'Pressure Management']
        }
      ]
    },
    {
      id: 'level-4',
      name: 'Level 4',
      title: 'Champion Development',
      modules: [
        {
          id: 'm8',
          name: 'Physical Excellence',
          criteria: ['Peak Conditioning', 'Injury Prevention', 'Recovery Protocols', 'Nutrition Guidance']
        },
        {
          id: 'm9',
          name: 'Mental Fortitude',
          criteria: ['Pressure Handling', 'Focus & Concentration', 'Motivation Management', 'Championship Mindset']
        }
      ]
    }
  ]
}

// ==================== COMPONENTS ====================

// Animated Background Component
const AnimatedBackground = () => (
  <div className="animated-bg">
    <div className="shuttlecock-float s1">🏸</div>
    <div className="shuttlecock-float s2">🏸</div>
    <div className="shuttlecock-float s3">🏸</div>
    <div className="gradient-orb orb1"></div>
    <div className="gradient-orb orb2"></div>
  </div>
)

// Navigation Component
const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'coe', label: 'COE', icon: Award },
    { id: 'bookings', label: 'Book Court', icon: Calendar },
    { id: 'programs', label: 'Skill Programs', icon: Trophy },
    { id: 'induction', label: 'Induction', icon: BookOpen },
    { id: 'assessment', label: 'Self Assessment', icon: ClipboardCheck },
    { id: 'contact', label: 'Contact Us', icon: Phone }
  ]

  return (
    <nav className="navigation">
      <motion.div 
        className="nav-logo"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="logo-icon">🏸</span>
        <div className="logo-wrapper">
          <span className="logo-text">{SITE_CONFIG.name}</span>
          <span className="logo-subtitle">{SITE_CONFIG.tagline}</span>
        </div>
      </motion.div>
      
      <ul className="nav-tabs">
        {tabs.map((tab, index) => (
          <motion.li 
            key={tab.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  className="tab-indicator"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}

// Background Image Slideshow Component
const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HOMEPAGE_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="background-slideshow">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={HOMEPAGE_IMAGES[currentIndex]}
          alt={`ACE Battledore ${currentIndex + 1}`}
          className="background-image"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="background-overlay"></div>
      <div className="slideshow-indicators">
        {HOMEPAGE_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Hero Section
const HeroSection = ({ setActiveTab }) => (
  <motion.section 
    className="hero"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <BackgroundSlideshow />
    <motion.div 
      className="hero-banner"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span className="banner-welcome">Welcome to</span>
      <span className="banner-name">{SITE_CONFIG.name}</span>
      <span className="banner-divider">|</span>
      <span className="banner-tagline">{SITE_CONFIG.tagline}</span>
      <span className="banner-divider">|</span>
      <span className="banner-description">{SITE_CONFIG.description}</span>
    </motion.div>
  </motion.section>
)

// About Us Page
const AboutUs = () => (
  <motion.div 
    className="page about-page"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="page-header">
      <motion.h2 
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        About <span className="highlight">ACE Battledore</span>
      </motion.h2>
      <motion.p 
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Your Journey to Excellence Starts Here
      </motion.p>
    </div>

    <div className="about-content">
      <motion.div 
        className="about-story"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3><Star className="icon" /> Our Story</h3>
        <p>{ABOUT_DATA.story}</p>
      </motion.div>

      <div className="mission-vision">
        <motion.div 
          className="card mission-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Target className="card-icon" />
          <h4>Our Mission</h4>
          <p>{ABOUT_DATA.mission}</p>
        </motion.div>
        <motion.div 
          className="card vision-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Award className="card-icon" />
          <h4>Our Vision</h4>
          <p>{ABOUT_DATA.vision}</p>
        </motion.div>
      </div>

      <motion.div 
        className="stats-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {ABOUT_DATA.stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="stat-item"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="team-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3>Our Founders & Coaching Team</h3>
        <div className="team-grid">
          {ABOUT_DATA.team.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="team-avatar">
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="avatar-fallback">${member.name.split(' ').map(n => n[0]).join('')}</span>`;
                  }}
                />
              </div>
              <h4>{member.name}</h4>
              <p className="team-role">{member.role}</p>
              <p className="team-exp">{member.experience}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
)

// Skill Programs Page
const SkillPrograms = () => (
  <motion.div 
    className="page programs-page"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="page-header">
      <motion.h2 
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Badminton <span className="highlight">Skill Programs</span>
      </motion.h2>
      <motion.p 
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Choose Your Path to Excellence
      </motion.p>
    </div>

    <div className="programs-grid">
      {SKILL_PROGRAMS.map((program, index) => (
        <motion.div 
          key={program.id}
          className="program-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="program-badge">{program.level}</div>
          <h3>{program.title}</h3>
          <div className="program-meta">
            <span><Clock size={16} /> {program.duration}</span>
            <span className="program-price">{program.price}</span>
          </div>
          <p>{program.description}</p>
          <ul className="program-features">
            {program.features.map((feature, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
              >
                <Zap size={14} /> {feature}
              </motion.li>
            ))}
          </ul>
          <motion.button 
            className="btn-program"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

// Induction Page
const Induction = () => (
  <motion.div 
    className="page induction-page"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="page-header">
      <motion.h2 
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="highlight">Induction</span> Process
      </motion.h2>
      <motion.p 
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Your Step-by-Step Journey to Joining ACE Battledore
      </motion.p>
    </div>

    <div className="induction-timeline">
      {INDUCTION_STEPS.map((item, index) => (
        <motion.div 
          key={item.step}
          className="timeline-item"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
        >
          <motion.div 
            className="timeline-number"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {item.step}
          </motion.div>
          <div className="timeline-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div 
      className="induction-cta"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <h3>Ready to Begin?</h3>
      <p>Start your induction process today and join hundreds of aspiring badminton champions!</p>
      <motion.button 
        className="btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Registration <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  </motion.div>
)

// Self Assessment Page
const SelfAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer })
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setCompleted(true), 300)
    }
  }

  const getRecommendation = () => {
    const exp = answers.experience
    if (exp === "Complete beginner" || exp === "Less than 1 year") {
      return { level: "Beginner's Foundation", description: "Start with our foundational program to build strong basics!" }
    } else if (exp === "1-3 years") {
      return { level: "Intermediate Mastery", description: "Perfect time to advance your technical skills and strategy!" }
    } else {
      return { level: "Advanced Competition", description: "You're ready for competitive training and tournament prep!" }
    }
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setCompleted(false)
  }

  return (
    <motion.div 
      className="page assessment-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <motion.h2 
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Self <span className="highlight">Assessment</span>
        </motion.h2>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Find the Perfect Program for Your Level
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div 
            key="questions"
            className="assessment-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="progress-text">Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}</p>

            <motion.div 
              key={currentQuestion}
              className="question-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{ASSESSMENT_QUESTIONS[currentQuestion].question}</h3>
              <div className="options-grid">
                {ASSESSMENT_QUESTIONS[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`option-btn ${answers[ASSESSMENT_QUESTIONS[currentQuestion].id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswer(ASSESSMENT_QUESTIONS[currentQuestion].id, option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            className="assessment-result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="result-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              🎯
            </motion.div>
            <h3>Assessment Complete!</h3>
            <div className="recommendation-card">
              <h4>Recommended Program:</h4>
              <p className="recommendation-level">{getRecommendation().level}</p>
              <p>{getRecommendation().description}</p>
            </div>
            <div className="result-actions">
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Program Details <ChevronRight size={18} />
              </motion.button>
              <motion.button 
                className="btn-secondary"
                onClick={resetAssessment}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retake Assessment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// COE (Center of Excellence) Assessment Page
const CenterOfExcellence = () => {
  const [expandedLevel, setExpandedLevel] = useState(null)

  return (
    <motion.div 
      className="page coe-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <motion.h2 
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Award className="icon" /> Center of <span className="highlight">Excellence</span>
        </motion.h2>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {COE_ASSESSMENT.description}
        </motion.p>
      </div>

      <div className="coe-framework">
        <motion.div 
          className="coe-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Structured Assessment Framework</h3>
          <p>Our four-level assessment system ensures comprehensive evaluation of player development across technical, physical, and mental dimensions.</p>
        </motion.div>

        <div className="coe-levels">
          {COE_ASSESSMENT.levels.map((level, levelIndex) => (
            <motion.div 
              key={level.id}
              className="coe-level-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + levelIndex * 0.15 }}
            >
              <motion.div 
                className="level-header"
                onClick={() => setExpandedLevel(expandedLevel === level.id ? null : level.id)}
                whileHover={{ scale: 1.02 }}
                style={{ cursor: 'pointer' }}
              >
                <div className="level-badge">{level.name}</div>
                <div className="level-info">
                  <h3>{level.title}</h3>
                  {level.duration && <p className="level-duration">{level.duration}</p>}
                </div>
                <ChevronRight className={`level-icon ${expandedLevel === level.id ? 'expanded' : ''}`} />
              </motion.div>

              <AnimatePresence>
                {expandedLevel === level.id && (
                  <motion.div 
                    className="level-modules"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {level.modules.map((module, moduleIndex) => (
                      <motion.div 
                        key={module.id}
                        className="module"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: moduleIndex * 0.1 }}
                      >
                        <h4>{module.name}</h4>
                        {Array.isArray(module.criteria) && module.criteria.length > 0 && (
                          <ul className="criteria-list">
                            {module.criteria.map((criterion, idx) => {
                              if (typeof criterion === 'string') {
                                return <li key={idx}><span className="criterion-dot">•</span> {criterion}</li>
                              } else if (criterion.stance) {
                                return (
                                  <li key={idx}>
                                    <span className="stance-label">{criterion.stance}:</span>
                                    <ul className="sub-criteria">
                                      {criterion.positions.map((pos, pIdx) => (
                                        <li key={pIdx}>{pos}</li>
                                      ))}
                                    </ul>
                                  </li>
                                )
                              }
                              return null
                            })}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="coe-benefits"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h3>Why COE Assessment?</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <Trophy className="benefit-icon" />
              <h4>Comprehensive Evaluation</h4>
              <p>Multi-dimensional assessment covering technique, fitness, and strategy</p>
            </div>
            <div className="benefit-card">
              <Target className="benefit-icon" />
              <h4>Clear Progression</h4>
              <p>Structured pathway from beginner to champion level</p>
            </div>
            <div className="benefit-card">
              <Award className="benefit-icon" />
              <h4>Recognized Standard</h4>
              <p>Industry-validated framework aligned with badminton excellence</p>
            </div>
            <div className="benefit-card">
              <Zap className="benefit-icon" />
              <h4>Personalized Growth</h4>
              <p>Targeted feedback for continuous improvement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Contact Us Page
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <motion.div 
      className="page contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <motion.h2 
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contact <span className="highlight">Us</span>
        </motion.h2>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We'd Love to Hear From You
        </motion.p>
      </div>

      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Get in Touch</h3>
          <div className="info-items">
            <motion.div 
              className="info-item"
              whileHover={{ x: 10 }}
            >
              <Phone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>{SITE_CONFIG.phone}</p>
              </div>
            </motion.div>
            <motion.div 
              className="info-item"
              whileHover={{ x: 10 }}
            >
              <Mail className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>{SITE_CONFIG.email}</p>
              </div>
            </motion.div>
            <motion.div 
              className="info-item"
              whileHover={{ x: 10 }}
            >
              <MapPin className="info-icon" />
              <div>
                <h4>Address</h4>
                <p>{SITE_CONFIG.address}</p>
              </div>
            </motion.div>
            <motion.div 
              className="info-item"
              whileHover={{ x: 10 }}
            >
              <Clock className="info-icon" />
              <div>
                <h4>Hours</h4>
                <p>{SITE_CONFIG.hours}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ✅
                </motion.div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>Send us a Message</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <motion.button 
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <Send size={18} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Bookings Page
const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedCourt, setSelectedCourt] = useState('')
  const [selectedSlots, setSelectedSlots] = useState([])
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '' })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const isWeekend = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const getPrice = (hour, dateString) => {
    if (!dateString) return 0
    const weekend = isWeekend(dateString)
    const pricing = weekend ? BOOKING_CONFIG.pricing.weekend : BOOKING_CONFIG.pricing.weekday
    const slot = pricing.find(s => hour >= s.start && hour < s.end)
    return slot ? slot.price : 0
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = BOOKING_CONFIG.businessHours.start; hour < BOOKING_CONFIG.businessHours.end; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
      const price = getPrice(hour, selectedDate)
      slots.push({
        id: hour,
        time: `${startTime} - ${endTime}`,
        displayTime: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'} - ${(hour + 1) > 12 ? (hour + 1) - 12 : (hour + 1)}:00 ${(hour + 1) >= 12 ? 'PM' : 'AM'}`,
        price
      })
    }
    return slots
  }

  const toggleSlot = (slotId) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    )
  }

  const getTotalPrice = () => {
    return selectedSlots.reduce((total, slotId) => {
      return total + getPrice(slotId, selectedDate)
    }, 0)
  }

  const getSelectedTimeSlots = () => {
    return selectedSlots
      .sort((a, b) => a - b)
      .map(slotId => {
        const hour = slotId
        return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'} - ${(hour + 1) > 12 ? (hour + 1) - 12 : (hour + 1)}:00 ${(hour + 1) >= 12 ? 'PM' : 'AM'}`
      })
      .join(', ')
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    })
    const timeSlots = getSelectedTimeSlots()
    const total = getTotalPrice()
    
    // WhatsApp message
    const whatsappMessage = `🏸 *New Court Booking Request*

*Customer Details:*
Name: ${bookingForm.name}
Phone: ${bookingForm.phone}
Email: ${bookingForm.email}

*Booking Details:*
Date: ${formattedDate}
Court: ${selectedCourt}
Time Slots: ${timeSlots}
Duration: ${selectedSlots.length} hour(s)
Total Amount: ₹${total}

Please confirm this booking.`

    const whatsappUrl = `https://wa.me/919972765565?text=${encodeURIComponent(whatsappMessage)}`
    
    // Email notification
    const emailSubject = `New Court Booking - ${bookingForm.name} - ${formattedDate}`
    const emailBody = `New Court Booking Request

Customer Details:
- Name: ${bookingForm.name}
- Phone: ${bookingForm.phone}
- Email: ${bookingForm.email}

Booking Details:
- Date: ${formattedDate}
- Court: ${selectedCourt}
- Time Slots: ${timeSlots}
- Duration: ${selectedSlots.length} hour(s)
- Total Amount: ₹${total}

Please confirm this booking with the customer.`

    const emailUrl = `mailto:acebattledorementor@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Open email client
    window.location.href = emailUrl
    
    setBookingSubmitted(true)
    setTimeout(() => {
      setBookingSubmitted(false)
      setSelectedSlots([])
      setBookingForm({ name: '', phone: '', email: '' })
    }, 5000)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <motion.div 
      className="page bookings-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <motion.h2 
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Book a <span className="highlight">Court</span>
        </motion.h2>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Reserve your preferred court and time slot
        </motion.p>
      </div>

      <div className="booking-pricing-info">
        <motion.div 
          className="pricing-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4><Clock size={18} /> Weekday Rates (Mon-Fri)</h4>
          <ul>
            <li>6:00 AM - 10:00 AM: <strong>₹325/hour</strong></li>
            <li>10:00 AM - 3:00 PM: <strong>₹275/hour</strong></li>
            <li>3:00 PM - 10:00 PM: <strong>₹325/hour</strong></li>
          </ul>
        </motion.div>
        <motion.div 
          className="pricing-card weekend"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4><Star size={18} /> Weekend Rates (Sat-Sun-Holidays)</h4>
          <ul>
            <li>6:00 AM - 10:00 PM: <strong>₹350/hour</strong></li>
          </ul>
        </motion.div>
        <motion.div 
          className="pricing-card bulk"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h4><Trophy size={18} /> Bulk Booking Discounts</h4>
          <ul>
            <li><strong>Monthly (Weekdays):</strong> ₹6,500</li>
            <li><strong>Monthly (Full):</strong> ₹9,750</li>
            <li><strong>Quarterly:</strong> ₹29,250</li>
            <li><strong>Yearly:</strong> ₹1,09,500</li>
          </ul>
        </motion.div>
      </div>

      <div className="booking-container">
        <motion.div 
          className="booking-selectors"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="selector-group">
            <label><Calendar size={18} /> Select Date</label>
            <input 
              type="date" 
              value={selectedDate}
              min={today}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                setSelectedSlots([])
              }}
              className="date-input"
            />
            {selectedDate && (
              <span className="day-type">
                {isWeekend(selectedDate) ? '🌟 Weekend Rate' : '📅 Weekday Rate'}
              </span>
            )}
          </div>

          <div className="selector-group">
            <label><Target size={18} /> Select Court</label>
            <div className="court-buttons">
              {BOOKING_CONFIG.courts.map((court, index) => (
                <motion.button
                  key={court}
                  className={`court-btn ${selectedCourt === court ? 'selected' : ''}`}
                  onClick={() => setSelectedCourt(court)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {court}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {selectedDate && selectedCourt && (
          <motion.div 
            className="time-slots-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3><Clock size={20} /> Available Time Slots</h3>
            <p className="slots-instruction">Select one or more slots to book</p>
            <div className="time-slots-grid">
              {generateTimeSlots().map((slot) => (
                <motion.button
                  key={slot.id}
                  className={`time-slot ${selectedSlots.includes(slot.id) ? 'selected' : ''}`}
                  onClick={() => toggleSlot(slot.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="slot-time">{slot.displayTime}</span>
                  <span className="slot-price">₹{slot.price}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedSlots.length > 0 && (
          <motion.div 
            className="booking-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Court:</strong> {selectedCourt}</p>
              <p><strong>Slots:</strong> {selectedSlots.length} hour(s)</p>
              <p className="total-price"><strong>Total:</strong> ₹{getTotalPrice()}</p>
            </div>

            <AnimatePresence mode="wait">
              {bookingSubmitted ? (
                <motion.div 
                  key="success"
                  className="booking-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="success-icon">✅</div>
                  <h4>Booking Request Sent!</h4>
                  <p>Notification sent via WhatsApp & Email.</p>
                  <p className="confirm-note">We'll confirm your booking shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  className="booking-form"
                  onSubmit={handleBookingSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-row">
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    required
                  />
                  <motion.button 
                    type="submit"
                    className="btn-primary book-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Booking <Send size={18} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// ==================== MAIN APP ====================

function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [showHero, setShowHero] = useState(true)

  useEffect(() => {
    if (activeTab !== 'about') {
      setShowHero(false)
    }
  }, [activeTab])

  const renderPage = () => {
    switch (activeTab) {
      case 'about':
        return <AboutUs key="about" />
      case 'coe':
        return <CenterOfExcellence key="coe" />
      case 'programs':
        return <SkillPrograms key="programs" />
      case 'bookings':
        return <Bookings key="bookings" />
      case 'induction':
        return <Induction key="induction" />
      case 'assessment':
        return <SelfAssessment key="assessment" />
      case 'contact':
        return <ContactUs key="contact" />
      default:
        return <AboutUs key="about" />
    }
  }

  return (
    <div className="app">
      <AnimatedBackground />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'about' && showHero && (
          <HeroSection setActiveTab={setActiveTab} />
        )}
        
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="footer-logo">
            <span className="logo-icon">🏸</span>
            <span>{SITE_CONFIG.name}</span>
          </div>
          <p>{SITE_CONFIG.tagline}</p>
          <p className="copyright">© 2024 ACE Battledore. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  )
}

export default App
