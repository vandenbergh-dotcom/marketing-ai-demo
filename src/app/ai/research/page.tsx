"use client";

import { useState } from "react";
import { Search, Sparkles, Loader2, TrendingUp, Users, Globe, Target, BarChart3, FileText, Lightbulb, ArrowRight } from "lucide-react";

const mockResearchResults = {
  market: {
    title: "UK Outdoor Apparel Market",
    size: "£4.2B (2025)",
    growth: "+6.8% YoY",
    trends: [
      { trend: "Gorpcore crossover", desc: "Outdoor brands worn as streetwear — younger demographics driving growth", impact: "High" },
      { trend: "Sustainability demands", desc: "72% of consumers factor sustainability into outdoor gear purchases", impact: "High" },
      { trend: "DTC brand proliferation", desc: "New challenger brands (Finisterre, Montane, Rab) taking market share", impact: "Medium" },
      { trend: "Weather-driven demand", desc: "Increasingly unpredictable UK weather driving waterproof jacket sales +12%", impact: "High" },
    ],
  },
  competitors: [
    { name: "The North Face", spend: "£180K/mo", channels: "Meta, Google, TikTok", positioning: "Lifestyle + Performance", strength: "Strong TikTok presence" },
    { name: "Patagonia", spend: "£95K/mo", channels: "Meta, Google", positioning: "Sustainability-led", strength: "Purpose-driven messaging" },
    { name: "Arc'teryx", spend: "£120K/mo", channels: "Google, Meta", positioning: "Premium technical", strength: "Aspirational brand perception" },
    { name: "Montane", spend: "£35K/mo", channels: "Google, Meta", positioning: "Technical value", strength: "Price-performance messaging" },
  ],
  audience: {
    segments: [
      { name: "Weekend Warriors", size: "4.2M", age: "30-55", behavior: "Hike 2-4x/month, buy seasonally", spend: "£200-400/yr", opportunity: "Core audience — reliable converters" },
      { name: "Young Adventurers", size: "2.8M", age: "18-30", behavior: "Instagram-driven, trend-conscious", spend: "£150-300/yr", opportunity: "Growth segment — gorpcore trend" },
      { name: "Serious Mountaineers", size: "620K", age: "25-55", behavior: "Technical gear focus, brand loyal", spend: "£500-1200/yr", opportunity: "High LTV — Extrem range target" },
      { name: "Family Hikers", size: "3.1M", age: "35-50", behavior: "Buy for whole family, value-driven", spend: "£400-800/yr", opportunity: "Multi-product baskets" },
    ],
  },
};

const briefSections = [
  { title: "Campaign Objective", content: "Drive online sales of the Hillwalker 2.0 Gore-Tex jacket during the peak Spring/Summer buying season (March-May 2026), targeting UK outdoor enthusiasts across Meta, Google, TikTok, and Snapchat." },
  { title: "Target Audience", content: "Primary: UK Hikers & Hillwalkers 30-55 (Weekend Warriors segment, 4.2M addressable). Secondary: Young Adventurers 18-30 (gorpcore crossover, 2.8M addressable). Both segments index high for waterproof jacket purchases in Q1-Q2." },
  { title: "Key Message", content: "\"Built Different\" — The Hillwalker 2.0 is the evolution of Britain's most trusted waterproof jacket. 3-in-1 versatility, 280g lighter, Gore-Tex 2L protection. Positioned against The North Face on performance and Patagonia on heritage authenticity." },
  { title: "Creative Direction", content: "Real outdoor settings (Lake District, Highlands, Snowdonia). Moody atmospheric lighting. Product in action — rain, wind, trail. UGC-style content for TikTok/Snapchat. Heritage storytelling for brand building on Meta." },
  { title: "Budget & Timing", content: "£30,000 over 21 days. 40% Meta, 35% Google Shopping/Search, 15% TikTok, 10% Snapchat. Front-loaded spend in week 1 to build momentum, then optimise based on performance data." },
  { title: "Success Metrics", content: "Primary: 4.0x+ ROAS, 1,400+ conversions. Secondary: CPA below £22, CTR above 2.5%. Brand metrics: 90%+ brand score on all assets, positive sentiment in ad comments." },
];

export default function ResearchPage() {
  const [query, setQuery] = useState("Research the UK outdoor apparel market for a Berghaus Hillwalker 2.0 jacket campaign targeting hikers");
  const [researching, setResearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeSection, setActiveSection] = useState<"market" | "competitors" | "audience" | "brief">("market");

  const handleResearch = () => {
    setResearching(true);
    setTimeout(() => {
      setResearching(false);
      setShowResults(true);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Research & Briefs</h1>
        <p className="text-gray-500">Nova analyses the market, competitors, and audience — then generates a complete creative brief</p>
      </div>

      {/* Search */}
      <div className="rounded-xl border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Research Brief</h3>
            <p className="text-xs text-gray-500">Describe your product and campaign goals — Nova will research everything</p>
          </div>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:border-cyan-400"
          placeholder="E.g. 'Research the UK outdoor apparel market for a new waterproof jacket campaign targeting hikers aged 25-55'"
        />
        <button
          onClick={handleResearch}
          disabled={researching}
          className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-700 px-6 py-3 text-sm font-semibold text-white hover:from-cyan-600 hover:to-cyan-800 disabled:opacity-50"
        >
          {researching ? <><Loader2 className="h-4 w-4 animate-spin" /> Nova is researching...</> : <><Sparkles className="h-4 w-4" /> Start Research</>}
        </button>
      </div>

      {researching && (
        <div className="rounded-xl border-2 border-cyan-100 bg-cyan-50/30 p-8">
          <div className="flex items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            <div>
              <p className="font-medium text-gray-700">Nova (Research Analyst) is working...</p>
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                <p className="flex items-center gap-2"><Search className="h-3.5 w-3.5" /> Analysing UK outdoor apparel market data...</p>
                <p className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> Scanning competitor advertising activity...</p>
                <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Building audience segment profiles...</p>
                <p className="flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> Generating creative brief...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <>
          {/* Section Tabs */}
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
            {([
              { id: "market" as const, label: "Market Analysis", icon: <TrendingUp className="h-4 w-4" /> },
              { id: "competitors" as const, label: "Competitors", icon: <Target className="h-4 w-4" /> },
              { id: "audience" as const, label: "Audience Segments", icon: <Users className="h-4 w-4" /> },
              { id: "brief" as const, label: "Creative Brief", icon: <FileText className="h-4 w-4" /> },
            ]).map(t => (
              <button key={t.id} onClick={() => setActiveSection(t.id)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${activeSection === t.id ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {activeSection === "market" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border bg-white p-5">
                  <p className="text-xs text-gray-500">Market Size</p>
                  <p className="text-2xl font-bold">{mockResearchResults.market.size}</p>
                </div>
                <div className="rounded-xl border bg-white p-5">
                  <p className="text-xs text-gray-500">Growth</p>
                  <p className="text-2xl font-bold text-emerald-600">{mockResearchResults.market.growth}</p>
                </div>
                <div className="rounded-xl border bg-white p-5">
                  <p className="text-xs text-gray-500">Key Trends</p>
                  <p className="text-2xl font-bold">{mockResearchResults.market.trends.length}</p>
                </div>
              </div>
              <div className="space-y-3">
                {mockResearchResults.market.trends.map((t, i) => (
                  <div key={i} className="rounded-xl border bg-white p-4 flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{t.trend}</h4>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${t.impact === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{t.impact} impact</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "competitors" && (
            <div className="rounded-xl border bg-white overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Brand</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Est. Monthly Spend</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Channels</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Positioning</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Key Strength</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockResearchResults.competitors.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3 text-sm">{c.spend}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{c.channels}</td>
                      <td className="px-4 py-3 text-sm">{c.positioning}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{c.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "audience" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {mockResearchResults.audience.segments.map((seg, i) => (
                <div key={i} className="rounded-xl border-2 border-gray-100 bg-white p-5 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{seg.name}</h4>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{seg.size} people</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-gray-400">Age:</span> <span className="font-medium">{seg.age}</span></div>
                    <div><span className="text-gray-400">Annual spend:</span> <span className="font-medium">{seg.spend}</span></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{seg.behavior}</p>
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                    <Target className="h-4 w-4 text-emerald-600 shrink-0" />
                    <p className="text-xs text-emerald-700 font-medium">{seg.opportunity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "brief" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">AI-Generated Creative Brief</h3>
                <button className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700">
                  <ArrowRight className="h-4 w-4" /> Send to AI Campaign Studio
                </button>
              </div>
              <div className="space-y-3">
                {briefSections.map((s, i) => (
                  <div key={i} className="rounded-xl border bg-white p-5">
                    <h4 className="font-semibold text-sm text-cyan-700 mb-2">{s.title}</h4>
                    <p className="text-sm text-gray-700">{s.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
