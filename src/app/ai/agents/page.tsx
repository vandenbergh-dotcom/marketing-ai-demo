"use client";

import { useState } from "react";
import { Brain, Target, Palette, PenTool, Image, BarChart3, Search, Shield, Sparkles, Zap, Clock, CheckCircle2, TrendingUp } from "lucide-react";

const agentList = [
  {
    id: "maya", name: "Maya", role: "Chief Strategist",
    color: "from-purple-500 to-purple-700", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700",
    icon: <Brain className="h-6 w-6" />,
    description: "Orchestrates the entire campaign creation process. Defines objectives, allocates budgets, coordinates between agents, and ensures strategic alignment.",
    capabilities: ["Campaign strategy & positioning", "Budget allocation & optimization", "Cross-channel coordination", "Competitive positioning", "Go-to-market planning"],
    stats: { campaigns: 142, avgRoas: "4.8x", satisfaction: "97%" },
    recentWork: "Built 'Hillwalker 2.0 Launch' campaign — 5.2x ROAS",
    model: "Claude Opus 4.6",
  },
  {
    id: "alex", name: "Alex", role: "Media Planner",
    color: "from-blue-500 to-blue-700", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700",
    icon: <Target className="h-6 w-6" />,
    description: "Plans and optimises media spend across all platforms. Builds audience segments, sets bid strategies, and manages real-time budget allocation.",
    capabilities: ["Multi-platform media planning", "Audience segmentation & targeting", "Bid strategy optimization", "Budget pacing & allocation", "Platform API management"],
    stats: { campaigns: 156, avgRoas: "4.2x", satisfaction: "95%" },
    recentWork: "Optimised Trango Heritage campaign — saved 22% on CPA",
    model: "Claude Sonnet 4.5",
  },
  {
    id: "luna", name: "Luna", role: "Creative Director",
    color: "from-pink-500 to-pink-700", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700",
    icon: <Palette className="h-6 w-6" />,
    description: "Sets the creative direction for campaigns. Defines visual concepts, art direction, and ensures creative excellence across all touchpoints.",
    capabilities: ["Creative concept development", "Art direction & mood boards", "Cross-platform creative strategy", "A/B test creative planning", "Brand visual consistency"],
    stats: { campaigns: 128, avgRoas: "5.1x", satisfaction: "98%" },
    recentWork: "'Built Different' concept for Hillwalker — 95% brand score",
    model: "Claude Opus 4.6",
  },
  {
    id: "sam", name: "Sam", role: "Copywriter",
    color: "from-amber-500 to-amber-700", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700",
    icon: <PenTool className="h-6 w-6" />,
    description: "Writes ad copy, headlines, descriptions, CTAs, and long-form content. Adapts tone and style to match brand voice across platforms.",
    capabilities: ["Ad copy & headlines", "Email marketing copy", "Social media content", "Product descriptions", "Multi-language adaptation"],
    stats: { campaigns: 189, avgRoas: "4.5x", satisfaction: "96%" },
    recentWork: "3 headline variants for SS26 — top variant at 95% brand score",
    model: "Claude Sonnet 4.5",
  },
  {
    id: "aria", name: "Aria", role: "Art Director",
    color: "from-rose-500 to-rose-700", bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700",
    icon: <Image className="h-6 w-6" />,
    description: "Generates campaign visuals, product images, lifestyle photography, and video concepts using AI image generation (Gemini Imagen).",
    capabilities: ["AI image generation (Gemini Imagen)", "Multi-format asset creation", "Product photography & lifestyle", "Video storyboard & thumbnail", "Platform-specific sizing"],
    stats: { campaigns: 112, avgRoas: "3.9x", satisfaction: "94%" },
    recentWork: "Generated 4 hero images for 'Built Different' campaign",
    model: "Gemini Imagen 3",
  },
  {
    id: "max", name: "Max", role: "Data Analyst",
    color: "from-emerald-500 to-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Monitors campaign performance in real-time. Detects anomalies, identifies optimization opportunities, and generates actionable insights.",
    capabilities: ["Real-time performance monitoring", "Anomaly detection & alerts", "ROAS & conversion tracking", "Attribution modeling", "Predictive analytics"],
    stats: { campaigns: 167, avgRoas: "5.3x", satisfaction: "96%" },
    recentWork: "Detected TikTok creative fatigue — saved £2,400 in wasted spend",
    model: "Claude Sonnet 4.5",
  },
  {
    id: "nova", name: "Nova", role: "Research Analyst",
    color: "from-cyan-500 to-cyan-700", bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700",
    icon: <Search className="h-6 w-6" />,
    description: "Conducts market research, competitor analysis, trend identification, and audience insights to inform campaign strategy.",
    capabilities: ["Market & trend research", "Competitor campaign analysis", "Audience insight generation", "Keyword & search research", "Industry benchmarking"],
    stats: { campaigns: 98, avgRoas: "4.1x", satisfaction: "93%" },
    recentWork: "Identified underserved 18-30 adventure market segment",
    model: "Claude Sonnet 4.5 + Web Search",
  },
  {
    id: "kai", name: "Kai", role: "Brand Guardian",
    color: "from-orange-500 to-orange-700", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700",
    icon: <Shield className="h-6 w-6" />,
    description: "Ensures every piece of content, copy, and creative aligns with brand guidelines. Scores content against brand rules and flags violations.",
    capabilities: ["Brand consistency scoring", "Tone & voice validation", "Visual guideline enforcement", "Legal & compliance checking", "Cross-platform brand audit"],
    stats: { campaigns: 201, avgRoas: "N/A", satisfaction: "99%" },
    recentWork: "Reviewed 47 assets this week — 96% average brand score",
    model: "Claude Opus 4.6",
  },
];

export default function AgentsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedAgent = agentList.find(a => a.id === selected);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Marketing Agency</h1>
          <p className="text-gray-500">8 specialised AI agents working as your full-service marketing team</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-sm font-medium text-green-700">All agents online</span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Campaigns Created", value: "1,193", icon: <Sparkles className="h-5 w-5 text-purple-500" />, change: "+24 this week" },
          { label: "Average ROAS", value: "4.6x", icon: <TrendingUp className="h-5 w-5 text-emerald-500" />, change: "+0.3x vs last month" },
          { label: "Assets Generated", value: "8,420", icon: <Image className="h-5 w-5 text-rose-500" />, change: "+312 this week" },
          { label: "Brand Score Avg", value: "94%", icon: <Shield className="h-5 w-5 text-orange-500" />, change: "Consistently high" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border bg-white p-4">
            <div className="flex items-center gap-2 mb-1">
              {stat.icon}
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Agent Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agentList.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelected(selected === agent.id ? null : agent.id)}
            className={`group relative rounded-xl border-2 bg-white p-5 text-left transition-all hover:shadow-lg ${
              selected === agent.id ? `${agent.border} shadow-lg` : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-md`}>
              {agent.icon}
            </div>
            <h3 className="font-bold">{agent.name}</h3>
            <p className={`text-sm font-medium ${agent.text}`}>{agent.role}</p>
            <p className="mt-2 text-xs text-gray-500 line-clamp-2">{agent.description}</p>

            <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {agent.stats.campaigns} campaigns</span>
            </div>

            {/* Online indicator */}
            <div className="absolute right-3 top-3 flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-[10px] text-green-500 font-medium">Active</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Agent Detail */}
      {selectedAgent && (
        <div className={`rounded-xl border-2 ${selectedAgent.border} ${selectedAgent.bg} p-6`}>
          <div className="flex items-start gap-5">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedAgent.color} text-white shadow-lg`}>
              {selectedAgent.icon}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold">{selectedAgent.name} — {selectedAgent.role}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedAgent.description}</p>
                <p className="text-xs text-gray-400 mt-1">Powered by {selectedAgent.model}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Capabilities</h4>
                  <ul className="space-y-1.5">
                    {selectedAgent.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" /> {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2">
                      <span className="text-sm text-gray-600">Campaigns</span>
                      <span className="font-bold">{selectedAgent.stats.campaigns}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2">
                      <span className="text-sm text-gray-600">Avg ROAS</span>
                      <span className="font-bold">{selectedAgent.stats.avgRoas}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2">
                      <span className="text-sm text-gray-600">Satisfaction</span>
                      <span className="font-bold">{selectedAgent.stats.satisfaction}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Recent Work</h4>
                  <div className="flex items-start gap-2 rounded-lg bg-white/60 p-3">
                    <Clock className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">{selectedAgent.recentWork}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
