"use client";

import { useState } from "react";
import { Shield, CheckCircle2, AlertTriangle, XCircle, Upload, Palette, Type, Eye, TrendingUp, FileText } from "lucide-react";

const brandProfile = {
  name: "Berghaus",
  tagline: "Outdoor Clothing & Equipment Since 1966",
  voice: {
    tone: ["Confident", "Adventurous", "Authentic", "No-nonsense"],
    style: "Direct and active. Short punchy sentences mixed with technical product detail. Heritage references woven naturally. British outdoor voice — never preachy, always practical.",
    doList: [
      "Use active voice and strong verbs",
      "Reference real British outdoor locations (Lakes, Highlands, Snowdonia)",
      "Include technical specs (Gore-Tex, Polartec, weight in grams)",
      "Keep sentences short — max 15 words for headlines",
      "Use 'we' and 'you' — speak directly to the adventurer",
    ],
    dontList: [
      "Never use 'extreme' or 'epic' unironically",
      "Avoid exclamation marks in headlines",
      "Don't use stock photo language ('smiling family hiking')",
      "Never compare directly to competitors by name",
      "Don't use 'game-changing' or 'revolutionary'",
    ],
  },
  visual: {
    primaryColor: "#000000",
    secondaryColor: "#FFB3C7",
    accentColor: "#1a1a2e",
    typography: "Dazzed (primary), system sans-serif (body)",
    logoRules: "Bottom-right placement. Minimum 24px clearance zone. White on dark backgrounds, black on light.",
    imageRules: [
      "Real outdoor settings only — no studio shots for hero images",
      "Product must be visible within first 3 seconds of video",
      "Moody, atmospheric lighting preferred over bright sunny",
      "Include people wearing products in natural situations",
      "No composites or unrealistic retouching",
    ],
  },
};

const recentScores = [
  { content: "SS26 Carousel Ad Copy", type: "Ad Copy", score: 95, agent: "Sam", issues: 0, date: "2 hours ago" },
  { content: "Hillwalker Ridge Hero Image", type: "Image", score: 96, agent: "Aria", issues: 0, date: "3 hours ago" },
  { content: "TikTok Rain Test Script", type: "Video Script", score: 88, agent: "Sam", issues: 2, date: "5 hours ago" },
  { content: "Trango Heritage Instagram Story", type: "Social Post", score: 94, agent: "Sam", issues: 0, date: "1 day ago" },
  { content: "Extrem Range Google Ad", type: "Ad Copy", score: 91, agent: "Sam", issues: 1, date: "1 day ago" },
  { content: "Wandermoor PDP Product Shot", type: "Image", score: 82, agent: "Aria", issues: 3, date: "2 days ago" },
  { content: "Winter Clearance Email Banner", type: "Image", score: 97, agent: "Aria", issues: 0, date: "3 days ago" },
  { content: "Summer Essentials Newsletter", type: "Email", score: 93, agent: "Sam", issues: 0, date: "3 days ago" },
];

export default function BrandPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "voice" | "visual" | "audit">("overview");

  const avgScore = Math.round(recentScores.reduce((s, r) => s + r.score, 0) / recentScores.length);
  const passRate = Math.round(recentScores.filter(r => r.score >= 85).length / recentScores.length * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Brain</h1>
          <p className="text-gray-500">AI-powered brand guardian — every asset scored against your guidelines</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border-2 border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-medium text-orange-700 hover:bg-orange-100">
          <Upload className="h-4 w-4" /> Upload Brand Guidelines
        </button>
      </div>

      {/* Health Dashboard */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-xs font-medium text-green-600">Brand Health</span>
          </div>
          <p className="text-3xl font-bold text-green-700">{avgScore}%</p>
          <p className="text-xs text-green-500">Average brand score</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
            <span className="text-xs font-medium text-gray-500">Pass Rate</span>
          </div>
          <p className="text-3xl font-bold">{passRate}%</p>
          <p className="text-xs text-gray-400">Assets above 85% threshold</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-5 w-5 text-purple-500" />
            <span className="text-xs font-medium text-gray-500">Assets Reviewed</span>
          </div>
          <p className="text-3xl font-bold">{recentScores.length}</p>
          <p className="text-xs text-gray-400">This week</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium text-gray-500">Trend</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">↑ 3%</p>
          <p className="text-xs text-gray-400">vs last week</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {(["overview", "voice", "visual", "audit"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-colors ${activeTab === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
            {t === "overview" && <Shield className="h-4 w-4" />}
            {t === "voice" && <Type className="h-4 w-4" />}
            {t === "visual" && <Palette className="h-4 w-4" />}
            {t === "audit" && <Eye className="h-4 w-4" />}
            {t === "overview" ? "Brand Profile" : t === "voice" ? "Voice & Tone" : t === "visual" ? "Visual Identity" : "Audit Log"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white font-bold text-lg">B</div>
              <div>
                <h3 className="text-lg font-bold">{brandProfile.name}</h3>
                <p className="text-sm text-gray-500">{brandProfile.tagline}</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Brand Voice</h4>
              <div className="flex flex-wrap gap-2">
                {brandProfile.voice.tone.map(t => (
                  <span key={t} className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">{t}</span>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">{brandProfile.voice.style}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Brand Colours</h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-black border" /> <span className="text-xs">#000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: "#FFB3C7" }} /> <span className="text-xs">#FFB3C7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: "#1a1a2e" }} /> <span className="text-xs">#1a1a2e</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-3">Recent Brand Scores</h3>
            <div className="space-y-2">
              {recentScores.slice(0, 6).map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">{r.content}</p>
                    <p className="text-xs text-gray-400">{r.type} · by {r.agent} · {r.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.issues > 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">{r.issues} issues</span>}
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${r.score >= 95 ? "bg-green-100 text-green-700" : r.score >= 90 ? "bg-blue-100 text-blue-700" : r.score >= 85 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {r.score >= 95 ? <CheckCircle2 className="h-3 w-3" /> : r.score >= 85 ? <AlertTriangle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {r.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "voice" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-3"><CheckCircle2 className="h-5 w-5" /> Do</h3>
            <ul className="space-y-2">
              {brandProfile.voice.doList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-red-700 flex items-center gap-2 mb-3"><XCircle className="h-5 w-5" /> Don&apos;t</h3>
            <ul className="space-y-2">
              {brandProfile.voice.dontList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "visual" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border bg-white p-6 space-y-4">
              <h3 className="font-semibold">Typography</h3>
              <p className="text-sm text-gray-600">{brandProfile.visual.typography}</p>
              <h3 className="font-semibold">Logo Rules</h3>
              <p className="text-sm text-gray-600">{brandProfile.visual.logoRules}</p>
            </div>
            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold mb-3">Image Guidelines</h3>
              <ul className="space-y-2">
                {brandProfile.visual.imageRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Eye className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /> {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "audit" && (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Content</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Issues</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">When</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentScores.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{r.content}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{r.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{r.agent}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${r.score >= 95 ? "bg-green-100 text-green-700" : r.score >= 90 ? "bg-blue-100 text-blue-700" : r.score >= 85 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {r.score}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{r.issues > 0 ? <span className="text-amber-600">{r.issues} found</span> : <span className="text-green-600">None</span>}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
