import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-emerald-400" />
          <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-emerald-400 hover:bg-black/20">
              Home
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* About Content */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/20 shadow-lg">
          <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">What is Mission Decrypt?</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                Mission Decrypt is an immersive ISRO-themed cyber mission where participants take on the role of elite
                codebreakers.
              </p>
              <p className="text-gray-300 mb-4">
                As an agent, you'll crack codes across 3 challenging rounds, with each answer contributing to a unique
                final password that unlocks the mission's ultimate secret.
              </p>
              <p className="text-gray-300 mb-4">The mission features:</p>
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                <li>Randomly generated avatars for anonymity and fun</li>
                <li>Three rounds of increasingly difficult challenges</li>
                <li>Real-time leaderboard to track your progress against other agents</li>
                <li>Rank progression from Cadet to Commander</li>
                <li>A spectacular launch animation when you crack the final code</li>
              </ul>
              <p className="text-gray-300">
                Inspired by space science, cybersecurity, and gaming, Mission Decrypt creates a unique experience that
                tests your knowledge and problem-solving skills.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-xl font-bold mb-3 text-purple-400">The Challenge Structure</h3>
                <p className="text-gray-300 mb-3">Each mission consists of three rounds:</p>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>Indian Space History & Riddles</li>
                  <li>World Aviation & Aerospace Tech</li>
                  <li>Global Missions & Pattern Logic</li>
                </ol>
              </div>

              <div className="bg-black/40 p-6 rounded-lg border border-cyan-500/30">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">The Final Password</h3>
                <p className="text-gray-300">
                  Your answers from each round contribute to a unique final password. Enter it correctly to trigger the
                  launch sequence and join the Hall of ISRO Agents.
                </p>
              </div>

              <div className="bg-black/40 p-6 rounded-lg border border-emerald-500/30">
                <h3 className="text-xl font-bold mb-3 text-emerald-400">Ready for the Mission?</h3>
                <Link href="/auth/signup">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400">
                    Begin Your Training
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
