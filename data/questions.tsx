// Questions for all rounds with varying difficulty levels
// Each question contributes to a final code that unlocks the mystery box

// Round 1: Indian Space History & Cryptography
const round1Questions = [
  {
    id: "r1q1",
    question: "Which was India's first satellite, launched in 1975?",
    options: ["Bhaskara", "Rohini", "Aryabhata", "INSAT-1A"],
    correctAnswer: "Aryabhata",
    hint: "Named after an ancient Indian mathematician and astronomer",
    passwordPart: "M",
    difficulty: "easy",
  },
  {
    id: "r1q2",
    question: "Decode this binary sequence to reveal an ISRO mission: 01001101 01001111 01001101",
    options: ["AstroSat", "MOM", "Chandrayaan", "GSLV"],
    correctAnswer: "MOM",
    hint: "Convert each 8-bit binary to ASCII characters",
    passwordPart: "I",
    difficulty: "medium",
  },
  {
    id: "r1q3",
    question: "If A=1, B=2, C=3... what does this code reveal: 19 16 1 3 5 24?",
    options: ["ISRO-X", "SPACEX", "NASAX", "PSLV-X"],
    correctAnswer: "SPACEX",
    hint: "Convert each number to its corresponding letter in the alphabet",
    passwordPart: "S",
    difficulty: "medium",
  },
  {
    id: "r1q4",
    question:
      "Solve this cryptic clue: 'The eye that never blinks but sees all below' refers to which type of satellite?",
    options: ["Weather Satellite", "Communication Satellite", "Earth Observation Satellite", "Navigation Satellite"],
    correctAnswer: "Earth Observation Satellite",
    hint: "These satellites continuously monitor Earth's surface",
    passwordPart: "S",
    difficulty: "hard",
  },
  {
    id: "r1q5",
    question: "Apply a Caesar cipher with shift 3 to 'LVUR' to reveal an Indian space agency's rocket:",
    options: ["GSLV", "PSLV", "ASLV", "SSLV"],
    correctAnswer: "PSLV",
    hint: "Shift each letter 3 positions forward in the alphabet",
    passwordPart: "I",
    difficulty: "expert",
  },
]

// Round 2: Aerospace Engineering & Logic Puzzles
const round2Questions = [
  {
    id: "r2q1",
    question: "What is the escape velocity needed to leave Earth's gravitational field?",
    options: ["7.9 km/s", "11.2 km/s", "33.0 km/s", "5.3 km/s"],
    correctAnswer: "11.2 km/s",
    hint: "This is the minimum velocity needed for an object to escape Earth's gravitational pull",
    passwordPart: "O",
    difficulty: "medium",
  },
  {
    id: "r2q2",
    question: "Decrypt this aerospace code: 'November-Alpha-Sierra-Alpha' spells:",
    options: ["NASS", "NASA", "NESA", "NISA"],
    correctAnswer: "NASA",
    hint: "The phonetic alphabet spells out a famous space agency",
    passwordPart: "N",
    difficulty: "medium",
  },
  {
    id: "r2q3",
    question:
      "If rocket A travels at 28,000 km/h and rocket B travels at 40,000 km/h, how much faster (in %) is rocket B?",
    options: ["30%", "42.9%", "12%", "70%"],
    correctAnswer: "42.9%",
    hint: "Calculate: (40000-28000)/28000 × 100",
    passwordPart: "D",
    difficulty: "hard",
  },
  {
    id: "r2q4",
    question: "Solve this XOR operation to reveal a space term: 'MOON' XOR 'STAR'",
    options: ["ORBIT", "COMET", "EARTH", "VENUS"],
    correctAnswer: "COMET",
    hint: "XOR each letter's ASCII value and convert back to a letter",
    passwordPart: "E",
    difficulty: "expert",
  },
  {
    id: "r2q5",
    question: "What comes next in this sequence: Sputnik, Explorer, Luna, Vostok, Apollo, ?",
    options: ["Voyager", "Hubble", "Challenger", "Mir"],
    correctAnswer: "Voyager",
    hint: "These are major space mission programs in chronological order",
    passwordPart: "C",
    difficulty: "hard",
  },
]

// Round 3: Advanced Cryptography & Space Science
const round3Questions = [
  {
    id: "r3q1",
    question: "What is the name of the boundary where Earth's atmosphere meets space?",
    options: ["Karman Line", "Armstrong Limit", "Mesosphere", "Exosphere"],
    correctAnswer: "Karman Line",
    hint: "Named after Theodore von Kármán, it's approximately 100 km above Earth's surface",
    passwordPart: "R",
    difficulty: "medium",
  },
  {
    id: "r3q2",
    question: "Decode this message: '.-. --- -.-. -.- . -'",
    options: ["COMET", "SPACE", "ROCKET", "PLANET"],
    correctAnswer: "ROCKET",
    hint: "This is Morse code",
    passwordPart: "Y",
    difficulty: "hard",
  },
  {
    id: "r3q3",
    question: "If EARTH = 5+1+18+20+8 = 52, then MARS = ?",
    options: ["51", "50", "49", "48"],
    correctAnswer: "50",
    hint: "Add the position of each letter in the alphabet (A=1, B=2, etc.)",
    passwordPart: "P",
    difficulty: "medium",
  },
  {
    id: "r3q4",
    question: "Solve this pattern: 3.14159, 2.71828, 1.61803, ?",
    options: ["1.41421", "1.73205", "2.30259", "0.57721"],
    correctAnswer: "1.41421",
    hint: "These are famous mathematical constants (π, e, φ, and ?)",
    passwordPart: "T",
    difficulty: "expert",
  },
  {
    id: "r3q5",
    question: "Unscramble these letters to reveal a space phenomenon: CKBLAHELO",
    options: ["Black Hole", "Dark Matter", "Solar Wind", "Nebula Cloud"],
    correctAnswer: "Black Hole",
    hint: "A region of spacetime where gravity is so strong that nothing can escape from it",
    passwordPart: "2",
    difficulty: "hard",
  },
]

export const questions = [round1Questions, round2Questions, round3Questions]

// The final password from all rounds combined is: "MISSION DECRYPT2"
// This code will unlock the mystery box at the end of all rounds
