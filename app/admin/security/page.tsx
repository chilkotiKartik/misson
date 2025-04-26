"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, RefreshCw, Save, AlertTriangle, Eye, Lock, UserX, Clock, MonitorSmartphone } from "lucide-react"

export default function SecurityPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  // Security settings
  const [antiCheat, setAntiCheat] = useState(true)
  const [tabSwitchDetection, setTabSwitchDetection] = useState(true)
  const [maxTabSwitches, setMaxTabSwitches] = useState(3)
  const [timeMonitoring, setTimeMonitoring] = useState(true)
  const [maxIdleTime, setMaxIdleTime] = useState(5)
  const [ipRestriction, setIpRestriction] = useState(false)
  const [deviceRestriction, setDeviceRestriction] = useState(false)
  const [sameQuestions, setSameQuestions] = useState(true)
  const [randomizeOptions, setRandomizeOptions] = useState(false)
  const [autoLockout, setAutoLockout] = useState(true)
  const [lockoutThreshold, setLockoutThreshold] = useState(5)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoading(false)
      setLastRefreshed(new Date())
    }, 1000)
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)

      // Play success sound
      const audio = new Audio("/sounds/success-chime.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-gray-400">Configure security and anti-cheating measures</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">Last refreshed: {lastRefreshed.toLocaleTimeString()}</p>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Tabs defaultValue="anti-cheat" className="w-full">
          <TabsList className="bg-gray-900/60 border border-gray-800">
            <TabsTrigger
              value="anti-cheat"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Shield className="h-4 w-4 mr-2" />
              Anti-Cheat
            </TabsTrigger>
            <TabsTrigger
              value="access"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Lock className="h-4 w-4 mr-2" />
              Access Control
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Eye className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                <CardTitle>Anti-Cheating Measures</CardTitle>
              </div>
              <CardDescription>Configure settings to prevent cheating during the event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Anti-Cheat System</Label>
                    <p className="text-sm text-gray-400">Master control for all anti-cheating measures</p>
                  </div>
                  <Switch
                    checked={antiCheat}
                    onCheckedChange={setAntiCheat}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                <div className="pl-6 space-y-4 border-l-2 border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Tab Switching Detection</Label>
                      <p className="text-sm text-gray-400">Detect when participants switch browser tabs</p>
                    </div>
                    <Switch
                      checked={tabSwitchDetection}
                      onCheckedChange={setTabSwitchDetection}
                      disabled={!antiCheat}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-0.5">
                      <Label htmlFor="max-tab-switches">Maximum Tab Switches</Label>
                      <p className="text-sm text-gray-400">Number of allowed tab switches before warning</p>
                    </div>
                    <Input
                      id="max-tab-switches"
                      type="number"
                      value={maxTabSwitches}
                      onChange={(e) => setMaxTabSwitches(Number.parseInt(e.target.value))}
                      disabled={!antiCheat || !tabSwitchDetection}
                      min={1}
                      max={10}
                      className="w-20 bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Time Monitoring</Label>
                      <p className="text-sm text-gray-400">Monitor time spent on each question</p>
                    </div>
                    <Switch
                      checked={timeMonitoring}
                      onCheckedChange={setTimeMonitoring}
                      disabled={!antiCheat}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-0.5">
                      <Label htmlFor="max-idle-time">Maximum Idle Time (minutes)</Label>
                      <p className="text-sm text-gray-400">Time before flagging participant as idle</p>
                    </div>
                    <Input
                      id="max-idle-time"
                      type="number"
                      value={maxIdleTime}
                      onChange={(e) => setMaxIdleTime(Number.parseInt(e.target.value))}
                      disabled={!antiCheat || !timeMonitoring}
                      min={1}
                      max={30}
                      className="w-20 bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Same Questions for All Participants</Label>
                    <p className="text-sm text-gray-400">Ensure all participants receive identical questions</p>
                  </div>
                  <Switch
                    checked={sameQuestions}
                    onCheckedChange={setSameQuestions}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Randomize Answer Options</Label>
                    <p className="text-sm text-gray-400">Shuffle the order of multiple choice options</p>
                  </div>
                  <Switch
                    checked={randomizeOptions}
                    onCheckedChange={setRandomizeOptions}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-400">Important Note</h4>
                    <p className="text-sm text-amber-300/80">
                      Anti-cheating measures are designed to maintain fair competition. Participants will be notified
                      that their actions are being monitored. Excessive restrictions may impact user experience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-400" />
                <CardTitle>Access Control</CardTitle>
              </div>
              <CardDescription>Configure access restrictions for participants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">IP Restriction</Label>
                    <p className="text-sm text-gray-400">Restrict access to specific IP ranges</p>
                  </div>
                  <Switch
                    checked={ipRestriction}
                    onCheckedChange={setIpRestriction}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Device Restriction</Label>
                    <p className="text-sm text-gray-400">Limit to one device per participant</p>
                  </div>
                  <Switch
                    checked={deviceRestriction}
                    onCheckedChange={setDeviceRestriction}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Lockout</Label>
                    <p className="text-sm text-gray-400">Lock accounts after suspicious activity</p>
                  </div>
                  <Switch
                    checked={autoLockout}
                    onCheckedChange={setAutoLockout}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-0.5">
                    <Label htmlFor="lockout-threshold">Lockout Threshold</Label>
                    <p className="text-sm text-gray-400">Number of violations before lockout</p>
                  </div>
                  <Input
                    id="lockout-threshold"
                    type="number"
                    value={lockoutThreshold}
                    onChange={(e) => setLockoutThreshold(Number.parseInt(e.target.value))}
                    disabled={!autoLockout}
                    min={1}
                    max={10}
                    className="w-20 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-md p-4">
                <h4 className="font-medium mb-2">Currently Locked Accounts</h4>
                <div className="text-center py-4 text-gray-400 text-sm">No locked accounts at this time</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-400" />
                <CardTitle>Monitoring Dashboard</CardTitle>
              </div>
              <CardDescription>Real-time monitoring of suspicious activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MonitorSmartphone className="h-4 w-4 text-cyan-400" />
                        <span className="font-medium">Tab Switches</span>
                      </div>
                      <span className="text-amber-400 font-bold">12</span>
                    </div>
                    <p className="text-xs text-gray-400">Total tab switches detected</p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="font-medium">Idle Warnings</span>
                      </div>
                      <span className="text-amber-400 font-bold">5</span>
                    </div>
                    <p className="text-xs text-gray-400">Participants flagged as idle</p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserX className="h-4 w-4 text-cyan-400" />
                        <span className="font-medium">Suspicious Activity</span>
                      </div>
                      <span className="text-red-400 font-bold">3</span>
                    </div>
                    <p className="text-xs text-gray-400">Potential cheating attempts</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-md p-4">
                  <h4 className="font-medium mb-2">Recent Security Alerts</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-2 bg-amber-500/10 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Multiple tab switches detected</div>
                        <div className="text-xs text-gray-400">User: byte_breaker | 10 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 bg-red-500/10 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Suspicious rapid submissions</div>
                        <div className="text-xs text-gray-400">User: neural_ninja | 15 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 bg-amber-500/10 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Idle timeout warning</div>
                        <div className="text-xs text-gray-400">User: crypto_king | 25 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardFooter className="flex justify-end gap-4 pt-6">
              <Button variant="outline" className="border-gray-700 text-gray-300">
                Reset to Defaults
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
