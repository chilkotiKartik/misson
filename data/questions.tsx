// Round 1: Indian Space History & Riddles
const round1Questions = [
  {
    question: "Which was India's first satellite, launched in 1975?",
    options: ["Bhaskara", "Rohini", "Aryabhata", "INSAT-1A"],
    correctAnswer: "Aryabhata",
    hint: "Named after an ancient Indian mathematician and astronomer",
    passwordPart: "L",
    difficulty: "easy",
  },
  {
    question: "ISRO's Mars Orbiter Mission is also known as:",
    options: ["Chandrayaan", "Mangalyaan", "Gaganyaan", "Aditya"],
    correctAnswer: "Mangalyaan",
    hint: "The Sanskrit name literally means 'Mars-craft'",
    passwordPart: "A",
    difficulty: "easy",
  },
  {
    question: "Decode this space riddle: I am the boundary where Earth's atmosphere meets space. What am I?",
    options: ["Karman Line", "Exosphere", "Stratopause", "Mesosphere"],
    correctAnswer: "Karman Line",
    hint: "Named after Theodore von Kármán, it's approximately 100 km above Earth's surface",
    passwordPart: "U",
    difficulty: "medium",
  },
  {
    question:
      "Solve this cryptic clue: 'The eye that never blinks but sees all below' refers to which type of satellite?",
    options: ["Weather Satellite", "Communication Satellite", "Earth Observation Satellite", "Navigation Satellite"],
    correctAnswer: "Earth Observation Satellite",
    hint: "These satellites continuously monitor Earth's surface",
    passwordPart: "N",
    difficulty: "hard",
  },
  {
    question:
      "If you arrange the first letters of all ISRO's successful lunar missions in chronological order, what would you get?",
    options: ["CLC", "CCL", "LCC", "LLC"],
    correctAnswer: "CCL",
    hint: "Chandrayaan-1 (2008), Chandrayaan-2 (2019), Chandrayaan-3 (2023)",
    passwordPart: "C",
    difficulty: "hard",
  },
]

// Round 2: Aviation & Aerospace Encryption
const round2Questions = [
  {
    question: "In aviation phonetic alphabet, what word represents the letter 'H'?",
    options: ["Hotel", "Hawk", "Horizon", "Honor"],
    correctAnswer: "Hotel",
    hint: "International phonetic alphabet used by pilots worldwide",
    passwordPart: "H",
    difficulty: "medium",
  },
  {
    question: "Decrypt this aerospace code: 'November-Alpha-Sierra-Alpha' spells:",
    options: ["NASS", "NASA", "NESA", "NISA"],
    correctAnswer: "NASA",
    hint: "The phonetic alphabet spells out a famous space agency",
    passwordPart: "A",
    difficulty: "medium",
  },
  {
    question: "If you apply a Caesar cipher with shift 3 to 'VSDFH', what aerospace term do you get?",
    options: ["PLANE", "SPACE", "ORBIT", "STARS"],
    correctAnswer: "SPACE",
    hint: "Caesar cipher shifts each letter by a fixed number in the alphabet",
    passwordPart: "C",
    difficulty: "hard",
  },
  {
    question: "Solve this binary code to reveal an aerospace term: 01010011 01010100 01000001 01010010",
    options: ["MOON", "STAR", "MARS", "SHIP"],
    correctAnswer: "STAR",
    hint: "Each 8-bit binary sequence represents one ASCII character",
    passwordPart: "K",
    difficulty: "expert",
  },
  {
    question: "What is the result when you XOR the binary representations of 'ISS' and 'MIR'?",
    options: ["Space Station", "Orbital Lab", "Cosmic Dock", "Lunar Base"],
    correctAnswer: "Orbital Lab",
    hint: "XOR (exclusive OR) is a bitwise operation that outputs true only when inputs differ",
    passwordPart: "E",
    difficulty: "expert",
  },
]

// Round 3: Pattern Recognition & Logic
const round3Questions = [
  {
    question: "What comes next in this space-themed sequence: Mercury, Venus, Earth, ?",
    options: ["Jupiter", "Saturn", "Mars", "Neptune"],
    correctAnswer: "Mars",
    hint: "These are planets in order of distance from the Sun",
    passwordPart: "R",
    difficulty: "easy",
  },
  {
    question: "Identify the pattern: 0, 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "24"],
    correctAnswer: "21",
    hint: "Each number is the sum of the two preceding ones",
    passwordPart: "S",
    difficulty: "medium",
  },
  {
    question: "If EARTH = 5+1+18+20+8 = 52, then MARS = ?",
    options: ["51", "52", "50", "49"],
    correctAnswer: "50",
    hint: "Add the position of each letter in the alphabet (A=1, B=2, etc.)",
    passwordPart: "E",
    difficulty: "medium",
  },
  {
    question: "Solve this logical puzzle: If all rockets use fuel, and some fuel is hydrogen, then:",
    options: [
      "All rockets use hydrogen",
      "No rockets use hydrogen",
      "Some rockets use hydrogen",
      "Hydrogen is not used as fuel",
    ],
    correctAnswer: "Some rockets use hydrogen",
    hint: "This is a syllogism - analyze the logical relationship between the statements",
    passwordPart: "C",
    difficulty: "hard",
  },
  {
    question: "Decode this pattern: 3.14159, 2.71828, 1.61803, ?",
    options: ["1.41421", "1.73205", "2.30259", "0.57721"],
    correctAnswer: "1.41421",
    hint: "These are famous mathematical constants (π, e, φ, and ?)",
    passwordPart: "U",
    difficulty: "expert",
  },
]

export const questions = [round1Questions, round2Questions, round3Questions]

// The final password from all rounds combined is: "LAUNCH SPACEROCKET"
// But we're using just "LAUNCH" for the demo
