"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, Loader2, Check, Image, BarChart3, Target, Palette, PenTool, Shield, Search, Brain, ChevronRight, Zap, Plus } from "lucide-react";

// --- Agent Definitions ---
type AgentId = "maya" | "alex" | "luna" | "sam" | "aria" | "max" | "nova" | "kai";

const agents: Record<AgentId, { name: string; role: string; color: string; icon: React.ReactNode }> = {
  maya: { name: "Maya", role: "Chief Strategist", color: "bg-purple-500", icon: <Brain className="h-4 w-4" /> },
  alex: { name: "Alex", role: "Media Planner", color: "bg-blue-500", icon: <Target className="h-4 w-4" /> },
  luna: { name: "Luna", role: "Creative Director", color: "bg-pink-500", icon: <Palette className="h-4 w-4" /> },
  sam:  { name: "Sam", role: "Copywriter", color: "bg-amber-500", icon: <PenTool className="h-4 w-4" /> },
  aria: { name: "Aria", role: "Art Director", color: "bg-rose-500", icon: <Image className="h-4 w-4" /> },
  max:  { name: "Max", role: "Data Analyst", color: "bg-emerald-500", icon: <BarChart3 className="h-4 w-4" /> },
  nova: { name: "Nova", role: "Research Analyst", color: "bg-cyan-500", icon: <Search className="h-4 w-4" /> },
  kai:  { name: "Kai", role: "Brand Guardian", color: "bg-orange-500", icon: <Shield className="h-4 w-4" /> },
};

// --- Message Types ---
type MessageType = "user" | "agent" | "choices" | "images" | "campaign-card" | "analysis" | "publishing" | "typing";

interface ChatMessage {
  id: string;
  type: MessageType;
  agent?: AgentId;
  text?: string;
  choices?: { label: string; value: string }[];
  images?: { url: string; caption: string }[];
  campaign?: Record<string, unknown>;
  analysis?: { title: string; items: { label: string; value: string; change?: string }[] };
  publishing?: { platforms: { name: string; status: "pending" | "publishing" | "live" | "error" }[] };
}

// --- Conversation Steps ---
function buildConversation(productName: string): { delay: number; msg: ChatMessage; afterChoice?: string }[] {
  return [
    // Step 1: Maya greets and asks objective
    { delay: 800, msg: { id: "m1", type: "agent", agent: "maya", text: `Great — let's build a killer campaign for **${productName}**. I'm Maya, your Chief Strategist. I'll coordinate the whole team.\n\nFirst things first: **what's the primary goal?**` } },
    { delay: 400, msg: { id: "m2", type: "choices", choices: [
      { label: "Drive sales & conversions", value: "conversions" },
      { label: "Build brand awareness", value: "awareness" },
      { label: "Drive traffic to product page", value: "traffic" },
      { label: "Generate leads", value: "leads" },
    ] } },
    // Step 2: Nova does research
    { delay: 1200, afterChoice: "conversions", msg: { id: "m3", type: "agent", agent: "nova", text: `I'm Nova, your Research Analyst. Let me pull insights while Maya plans the strategy.\n\n**Researching market context...**\n\nI've analysed your previous campaigns, competitor activity, and current market trends. Here's what I found:` } },
    { delay: 1500, msg: { id: "m4", type: "analysis", analysis: { title: "Campaign Intelligence", items: [
      { label: "Best past campaign", value: "Hillwalker UK Push", change: "4.7x ROAS" },
      { label: "Top audience segment", value: "UK Hikers 30-55", change: "+34% conv. rate" },
      { label: "Best channel", value: "Google Shopping", change: "3.8x ROAS" },
      { label: "Peak buying season", value: "Now — Spring/Summer", change: "↑ 22% YoY" },
      { label: "Competitor activity", value: "The North Face running similar", change: "£45K/mo spend" },
      { label: "Content gap", value: "Video content on TikTok", change: "Underinvested" },
    ] } } },
    // Step 3: Maya presents strategy
    { delay: 2000, msg: { id: "m5", type: "agent", agent: "maya", text: `Based on Nova's research, here's my recommended strategy:\n\n**Campaign: ${productName}**\n**Objective:** Drive conversions (sales)\n**Duration:** 21 days\n**Markets:** UK & Ireland\n\n**Channel Mix:**\n- 🟦 **Meta (Instagram + Facebook):** 40% of budget — carousel ads + video, targeting hikers 25-55\n- 🟥 **Google Shopping + Search:** 35% — high-intent product searches\n- ⬛ **TikTok:** 15% — UGC-style video for 18-35 segment\n- 🟧 **Snapchat:** 10% — story ads for younger outdoor enthusiasts\n\nI'm handing over to Alex for detailed media planning. **What budget are we working with?**` } },
    { delay: 400, msg: { id: "m6", type: "choices", choices: [
      { label: "£10,000 — £20,000", value: "15000" },
      { label: "£20,000 — £40,000", value: "30000" },
      { label: "£40,000 — £60,000", value: "50000" },
      { label: "£60,000+", value: "75000" },
    ] } },
    // Step 4: Alex does media plan
    { delay: 1500, afterChoice: "30000", msg: { id: "m7", type: "agent", agent: "alex", text: `Alex here — Media Planner. With a **£30,000 budget over 21 days**, here's the optimal split:\n\n| Channel | Daily | Total | Strategy |\n|---------|-------|-------|----------|\n| Meta | £571 | £12,000 | Carousel + Video, Lookalike audiences |\n| Google | £500 | £10,500 | Shopping + Brand Search + Dynamic |\n| TikTok | £214 | £4,500 | UGC creator-style, Spark Ads |\n| Snapchat | £143 | £3,000 | Story ads, AR try-on filter |\n\n**Expected results** (based on your historical data):\n- 📊 **1.2M — 1.8M impressions**\n- 🖱️ **36,000 — 54,000 clicks**\n- 🛒 **1,400 — 2,100 conversions**\n- 💰 **Projected ROAS: 4.2x — 5.8x**\n\nNow let's get creative. Luna, over to you!` } },
    // Step 5: Luna + Kai creative direction
    { delay: 2000, msg: { id: "m8", type: "agent", agent: "luna", text: `Luna here — Creative Director. Let me set the visual and conceptual direction.\n\n**Creative Concept: "Built Different"**\n\nThe idea: Show the product in its natural element — real mountains, real weather, real performance. No studio shots. Raw, authentic, aspirational.\n\n**Visual Direction:**\n- Moody mountain landscapes, early morning light\n- Product in action — rain, wind, trail\n- Close-up texture shots of Gore-Tex fabric\n- Lifestyle POV angles for TikTok/Snapchat\n\nLet me check with Kai on brand alignment before we go further...` } },
    { delay: 1200, msg: { id: "m9", type: "agent", agent: "kai", text: `Kai — Brand Guardian here. I've checked Luna's direction against Berghaus brand guidelines:\n\n✅ **Tone:** Confident & adventurous — on brand\n✅ **Visual style:** Authentic outdoor settings — matches guidelines\n✅ **Typography:** Primary font Dazzed, accent highlight pink #FFB3C7\n✅ **Logo placement:** Bottom-right, min clearance zone\n⚠️ **One note:** Ensure product is visible within first 3 seconds of video content (brand requirement)\n\n**Brand alignment score: 96/100** — Approved. Go ahead, Luna.` } },
    // Step 6: Sam generates copy
    { delay: 1800, msg: { id: "m10", type: "agent", agent: "sam", text: `Sam — Copywriter. Here are 3 headline directions, scored against your brand voice:\n\n**Option 1** — Score: 95%\n> *"Built Different. Tested on Every Ridge in Britain."*\n> Body: The new ${productName}. Three-layer Gore-Tex. 280g lighter than last gen. From the Lakes to the Highlands, this is the jacket that keeps going when the weather says stop.\n\n**Option 2** — Score: 91%\n> *"The Mountain Doesn't Care. You Should."*\n> Body: Introducing the ${productName}. Engineered for the worst conditions, designed for the longest days. Waterproof. Breathable. Unstoppable.\n\n**Option 3** — Score: 88%\n> *"Every Layer. Every Condition. One Jacket."*\n> Body: Meet the next generation. The ${productName} gives you three ways to wear it — shell, insulated, or both. Because British weather doesn't pick one mood.\n\nI recommend **Option 1** — highest brand alignment and the strongest hook for conversion campaigns. Ready to see visuals?` } },
    { delay: 400, msg: { id: "m11", type: "choices", choices: [
      { label: "Generate images for all 3", value: "all_images" },
      { label: "Go with Option 1", value: "option_1" },
      { label: "I want to tweak the copy", value: "tweak" },
    ] } },
    // Step 7: Aria generates images
    { delay: 2500, afterChoice: "all_images", msg: { id: "m12", type: "agent", agent: "aria", text: `Aria — Art Director. I'm generating campaign visuals using **Gemini Imagen**. Creating 4 images across different formats...\n\n🎨 Generating hero image (1200×628)...\n🎨 Generating Instagram story (1080×1920)...\n🎨 Generating product close-up (1080×1080)...\n🎨 Generating TikTok thumbnail (1080×1920)...` } },
    { delay: 3000, msg: { id: "m13", type: "images", images: [
      { url: "https://placehold.co/600x314/1a1a2e/FFB3C7?text=Hero%3A+Hiker+on+Ridge%0AMoody+Dawn+Light&font=raleway", caption: "Hero — Hiker on misty ridge, dawn light, product in focus" },
      { url: "https://placehold.co/540x960/2d3436/FFB3C7?text=Story%3A+Rain+on%0AGore-Tex+Close-up&font=raleway", caption: "Story — Rain droplets on Gore-Tex fabric, macro detail" },
      { url: "https://placehold.co/540x540/1a1a2e/ffffff?text=Square%3A+Product%0AFlat+Lay+3-in-1&font=raleway", caption: "Square — Product flat lay, 3-in-1 system exploded view" },
      { url: "https://placehold.co/540x960/0a3d62/FFB3C7?text=TikTok%3A+POV%0ATrail+Running&font=raleway", caption: "TikTok — POV trail running shot, first-person view" },
    ] } },
    { delay: 800, msg: { id: "m14", type: "agent", agent: "aria", text: `All 4 visuals generated. These are optimised for each platform's aspect ratio and can be used directly. Kai has reviewed them — **brand score: 94/100**.\n\nShall I create more variations or are we ready to build the final campaign?` } },
    { delay: 400, msg: { id: "m15", type: "choices", choices: [
      { label: "Build the campaign — let's go!", value: "build" },
      { label: "Generate more image variants", value: "more_images" },
      { label: "Adjust creative direction", value: "adjust" },
    ] } },
    // Step 8: Campaign summary
    { delay: 2000, afterChoice: "build", msg: { id: "m16", type: "agent", agent: "maya", text: `Maya here — I've assembled everything from the team into a complete campaign. Here's your launch package:` } },
    { delay: 1000, msg: { id: "m17", type: "campaign-card", campaign: {
      name: `${productName} — "Built Different" Campaign`,
      objective: "Conversions (Sales)",
      budget: "£30,000 over 21 days",
      channels: [
        { name: "Meta", budget: "£12,000", formats: "Carousel + Video", audience: "UK Hikers 25-55, Lookalike" },
        { name: "Google", budget: "£10,500", formats: "Shopping + Search + Dynamic", audience: "High-intent searches" },
        { name: "TikTok", budget: "£4,500", formats: "UGC Spark Ads", audience: "Outdoor 18-35" },
        { name: "Snapchat", budget: "£3,000", formats: "Story + AR Filter", audience: "Adventure 18-30" },
      ],
      headline: "Built Different. Tested on Every Ridge in Britain.",
      brand_score: 95,
      expected_roas: "4.2x — 5.8x",
      expected_conversions: "1,400 — 2,100",
      images_generated: 4,
      agents_involved: ["Maya", "Nova", "Alex", "Luna", "Kai", "Sam", "Aria"],
    } } },
    { delay: 800, msg: { id: "m18", type: "agent", agent: "maya", text: `Everything's ready. 7 AI agents collaborated to build this campaign. Want to **publish to all platforms now**, or make adjustments?` } },
    { delay: 400, msg: { id: "m19", type: "choices", choices: [
      { label: "Publish to all platforms NOW", value: "publish" },
      { label: "Schedule for tomorrow 9 AM", value: "schedule" },
      { label: "I want to adjust something", value: "adjust_final" },
    ] } },
    // Step 9: Publishing
    { delay: 1500, afterChoice: "publish", msg: { id: "m20", type: "agent", agent: "alex", text: `Alex here — deploying to all platforms now. Sit tight...` } },
    { delay: 500, msg: { id: "m21", type: "publishing", publishing: { platforms: [
      { name: "Meta (Instagram + Facebook)", status: "publishing" },
      { name: "Google Ads (Shopping + Search)", status: "pending" },
      { name: "TikTok Ads", status: "pending" },
      { name: "Snapchat Ads", status: "pending" },
    ] } } },
    { delay: 2000, msg: { id: "m21b", type: "publishing", publishing: { platforms: [
      { name: "Meta (Instagram + Facebook)", status: "live" },
      { name: "Google Ads (Shopping + Search)", status: "publishing" },
      { name: "TikTok Ads", status: "publishing" },
      { name: "Snapchat Ads", status: "pending" },
    ] } } },
    { delay: 2000, msg: { id: "m21c", type: "publishing", publishing: { platforms: [
      { name: "Meta (Instagram + Facebook)", status: "live" },
      { name: "Google Ads (Shopping + Search)", status: "live" },
      { name: "TikTok Ads", status: "live" },
      { name: "Snapchat Ads", status: "publishing" },
    ] } } },
    { delay: 1500, msg: { id: "m21d", type: "publishing", publishing: { platforms: [
      { name: "Meta (Instagram + Facebook)", status: "live" },
      { name: "Google Ads (Shopping + Search)", status: "live" },
      { name: "TikTok Ads", status: "live" },
      { name: "Snapchat Ads", status: "live" },
    ] } } },
    // Step 10: Done
    { delay: 1000, msg: { id: "m22", type: "agent", agent: "maya", text: `**All platforms are live!** 🎉\n\nYour "${productName}" campaign is now running across 4 platforms. Here's what happens next:\n\n- **Max** (Data Analyst) is monitoring performance in real-time\n- **Kai** (Brand Guardian) will flag any platform review issues\n- You'll get a **daily performance briefing** at 9 AM\n- I'll suggest **optimisations** as data comes in\n\nYour first performance snapshot will be ready in ~2 hours once the platforms start serving. Anything else you need?` } },
    { delay: 400, msg: { id: "m23", type: "choices", choices: [
      { label: "Create another campaign", value: "new" },
      { label: "View campaign dashboard", value: "dashboard" },
      { label: "That's all — thanks team!", value: "done" },
    ] } },
  ];
}

// --- Components ---

function AgentAvatar({ agentId }: { agentId: AgentId }) {
  const a = agents[agentId];
  return (
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${a.color}`}>
      {a.icon}
    </div>
  );
}

function TypingIndicator({ agentId }: { agentId?: AgentId }) {
  const a = agentId ? agents[agentId] : null;
  return (
    <div className="flex items-start gap-3">
      {a && <AgentAvatar agentId={agentId!} />}
      {!a && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300"><Sparkles className="h-4 w-4 text-gray-600" /></div>}
      <div className="rounded-2xl rounded-tl-md bg-gray-100 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
          {a && <span className="ml-2 text-xs text-gray-400">{a.name} is thinking...</span>}
        </div>
      </div>
    </div>
  );
}

function MarkdownText({ text }: { text: string }) {
  // Simple markdown: **bold**, \n for newlines, | tables
  const lines = text.split("\n");
  const isTable = lines.some(l => l.trim().startsWith("|"));

  if (isTable) {
    const tableLines = lines.filter(l => l.trim().startsWith("|"));
    const headers = tableLines[0]?.split("|").filter(Boolean).map(h => h.trim()) || [];
    const rows = tableLines.slice(2).map(r => r.split("|").filter(Boolean).map(c => c.trim()));
    const nonTableLines = lines.filter(l => !l.trim().startsWith("|") && l.trim() !== "");

    return (
      <div>
        {nonTableLines.map((line, i) => (
          <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
        ))}
        {headers.length > 0 && (
          <div className="mt-2 overflow-hidden rounded-lg border">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>{headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-medium text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t">
                    {row.map((cell, j) => <td key={j} className="px-3 py-2 text-gray-700">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
      })}
    </div>
  );
}

function AnalysisCard({ analysis }: { analysis: NonNullable<ChatMessage["analysis"]> }) {
  return (
    <div className="ml-11 mt-1 overflow-hidden rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
      <div className="border-b border-cyan-100 bg-cyan-50/50 px-4 py-2">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-800">
          <Search className="h-4 w-4" /> {analysis.title}
        </h4>
      </div>
      <div className="divide-y divide-cyan-50">
        {analysis.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{item.value}</span>
              {item.change && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-700">{item.change}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Record<string, unknown> }) {
  const channels = campaign.channels as { name: string; budget: string; formats: string; audience: string }[];
  const agentsInvolved = campaign.agents_involved as string[];
  return (
    <div className="ml-11 mt-1 overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="border-b border-purple-100 bg-gradient-to-r from-purple-100/80 to-pink-100/80 px-5 py-3">
        <h4 className="text-base font-bold text-purple-900">{campaign.name as string}</h4>
        <p className="text-sm text-purple-600">{campaign.objective as string} · {campaign.budget as string}</p>
      </div>
      <div className="p-5 space-y-4">
        {/* Channels */}
        <div>
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Channel Plan</h5>
          <div className="grid gap-2 sm:grid-cols-2">
            {channels.map((ch, i) => (
              <div key={i} className="rounded-lg border bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{ch.name}</span>
                  <span className="text-sm text-purple-600 font-medium">{ch.budget}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{ch.formats}</p>
                <p className="text-xs text-gray-400">{ch.audience}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Headline */}
        <div className="rounded-lg bg-gray-900 p-4">
          <p className="text-xs text-gray-400 mb-1">Hero Headline</p>
          <p className="text-lg font-bold text-white">{campaign.headline as string}</p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center rounded-lg bg-green-50 p-3">
            <p className="text-xs text-green-600">Brand Score</p>
            <p className="text-xl font-bold text-green-700">{campaign.brand_score as number}%</p>
          </div>
          <div className="text-center rounded-lg bg-blue-50 p-3">
            <p className="text-xs text-blue-600">Expected ROAS</p>
            <p className="text-xl font-bold text-blue-700">{campaign.expected_roas as string}</p>
          </div>
          <div className="text-center rounded-lg bg-purple-50 p-3">
            <p className="text-xs text-purple-600">Conversions</p>
            <p className="text-xl font-bold text-purple-700">{campaign.expected_conversions as string}</p>
          </div>
        </div>
        {/* Agents */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-400 mr-1">Built by:</span>
          {agentsInvolved.map((name) => {
            const agentEntry = Object.entries(agents).find(([, a]) => a.name === name);
            if (!agentEntry) return null;
            const [id, a] = agentEntry;
            return (
              <span key={id} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white ${a.color}`}>
                {a.icon} {name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ImagesGrid({ images }: { images: NonNullable<ChatMessage["images"]> }) {
  return (
    <div className="ml-11 mt-1 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((img, i) => (
        <div key={i} className="group overflow-hidden rounded-xl border-2 border-rose-100 bg-white shadow-sm">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <img src={img.url} alt={img.caption} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          </div>
          <p className="p-2 text-xs text-gray-500">{img.caption}</p>
        </div>
      ))}
    </div>
  );
}

function PublishingStatus({ publishing }: { publishing: NonNullable<ChatMessage["publishing"]> }) {
  return (
    <div className="ml-11 mt-1 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50">
      <div className="divide-y divide-blue-100">
        {publishing.platforms.map((p, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-gray-800">{p.name}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              p.status === "live" ? "bg-green-100 text-green-700" :
              p.status === "publishing" ? "bg-blue-100 text-blue-700" :
              p.status === "error" ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-500"
            }`}>
              {p.status === "live" && <Check className="h-3 w-3" />}
              {p.status === "publishing" && <Loader2 className="h-3 w-3 animate-spin" />}
              {p.status === "live" ? "Live" : p.status === "publishing" ? "Publishing..." : p.status === "error" ? "Error" : "Waiting..."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Starter Campaign Cards ---
const starterCampaigns = [
  { title: "New Product Launch", desc: "Launch a new product with full-funnel campaign", prompt: "I want to launch a campaign for our new Berghaus Hillwalker 2.0 Gore-Tex jacket — it's a 3-in-1 waterproof jacket, lighter than the previous model" },
  { title: "Seasonal Collection", desc: "Promote a seasonal range across platforms", prompt: "Create a Spring/Summer 2026 campaign for our new outdoor collection — Tech Tees, trail shorts, and ultralight wind smocks" },
  { title: "Brand Awareness", desc: "Build brand recognition with new audiences", prompt: "I want to build brand awareness for Berghaus in the 18-30 adventure market — we're losing share to newer DTC brands" },
  { title: "Retargeting & Win-back", desc: "Re-engage past visitors and abandoned carts", prompt: "Set up a retargeting campaign for people who browsed our Gore-Tex jackets but didn't purchase in the last 30 days" },
];

// --- Main Page ---
export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingAgent, setTypingAgent] = useState<AgentId | undefined>();
  const [conversationStep, setConversationStep] = useState(-1);
  const [conversation, setConversation] = useState<ReturnType<typeof buildConversation>>([]);
  const [started, setStarted] = useState(false);
  const [waitingForChoice, setWaitingForChoice] = useState(false);
  const [expectedChoice, setExpectedChoice] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Advance conversation
  const advanceConversation = useCallback((steps: ReturnType<typeof buildConversation>, fromStep: number) => {
    let currentStep = fromStep;

    const processNext = () => {
      if (currentStep >= steps.length) {
        setIsTyping(false);
        setTypingAgent(undefined);
        return;
      }

      const step = steps[currentStep];

      // If this step requires a choice, pause and wait
      if (step.afterChoice && step.afterChoice !== expectedChoice) {
        // Skip steps that need a different choice
        currentStep++;
        processNext();
        return;
      }

      // Show typing indicator
      const nextAgent = step.msg.agent;
      if (nextAgent && step.msg.type === "agent") {
        setIsTyping(true);
        setTypingAgent(nextAgent);
      }

      setTimeout(() => {
        setIsTyping(false);
        setTypingAgent(undefined);

        // Replace publishing messages (they update in place)
        if (step.msg.type === "publishing") {
          setMessages(prev => {
            const existing = prev.findIndex(m => m.type === "publishing");
            if (existing >= 0) {
              const updated = [...prev];
              updated[existing] = step.msg;
              return updated;
            }
            return [...prev, step.msg];
          });
        } else {
          setMessages(prev => [...prev, step.msg]);
        }

        // If this is a choices message, pause for user input
        if (step.msg.type === "choices") {
          setWaitingForChoice(true);
          setConversationStep(currentStep);
          return;
        }

        currentStep++;
        processNext();
      }, step.delay);
    };

    processNext();
  }, [expectedChoice]);

  // Start campaign
  const startCampaign = (prompt: string) => {
    setStarted(true);
    setMessages([{ id: "u0", type: "user", text: prompt }]);
    const conv = buildConversation(extractProductName(prompt));
    setConversation(conv);
    setConversationStep(0);
    advanceConversation(conv, 0);
  };

  // Handle choice selection
  const handleChoice = (value: string) => {
    setWaitingForChoice(false);

    // Add user message for the choice
    const choiceMsg = conversation[conversationStep]?.msg;
    const choiceLabel = choiceMsg?.choices?.find(c => c.value === value)?.label || value;
    setMessages(prev => [...prev, { id: `uc_${conversationStep}`, type: "user", text: choiceLabel }]);

    // Find next steps after this choice
    const nextStep = conversationStep + 1;
    // Update expected choice for conditional steps
    setExpectedChoice(value);

    // Continue from next step with this choice context
    let step = nextStep;
    const processNext = () => {
      if (step >= conversation.length) {
        setIsTyping(false);
        return;
      }

      const s = conversation[step];

      // Skip steps that need a different choice
      if (s.afterChoice && s.afterChoice !== value) {
        step++;
        processNext();
        return;
      }

      const nextAgent = s.msg.agent;
      if (nextAgent && s.msg.type === "agent") {
        setIsTyping(true);
        setTypingAgent(nextAgent);
      }

      setTimeout(() => {
        setIsTyping(false);
        setTypingAgent(undefined);

        if (s.msg.type === "publishing") {
          setMessages(prev => {
            const existing = prev.findIndex(m => m.type === "publishing");
            if (existing >= 0) {
              const updated = [...prev];
              updated[existing] = s.msg;
              return updated;
            }
            return [...prev, s.msg];
          });
        } else {
          setMessages(prev => [...prev, s.msg]);
        }

        if (s.msg.type === "choices") {
          setWaitingForChoice(true);
          setConversationStep(step);
          return;
        }

        step++;
        processNext();
      }, s.delay);
    };

    processNext();
  };

  // Handle free text input
  const handleSend = () => {
    if (!input.trim()) return;
    if (!started) {
      startCampaign(input);
    } else {
      setMessages(prev => [...prev, { id: `u_${Date.now()}`, type: "user", text: input }]);
    }
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-purple-50 via-white to-pink-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AI Campaign Studio</h1>
              <p className="text-xs text-gray-500">8 AI agents ready to build your next campaign</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {(Object.entries(agents) as [AgentId, typeof agents[AgentId]][]).map(([id, a]) => (
              <div key={id} className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${a.color} opacity-80 hover:opacity-100 transition-opacity`} title={`${a.name} — ${a.role}`}>
                {a.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        {!started ? (
          /* Welcome Screen */
          <div className="mx-auto max-w-2xl space-y-8 py-12">
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">What are we building today?</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Describe your campaign in plain English. Our team of 8 AI agents will handle strategy, creative, copy, visuals, and publishing across all platforms.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {starterCampaigns.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => startCampaign(sc.prompt)}
                  className="group rounded-xl border-2 border-gray-100 bg-white p-4 text-left transition-all hover:border-purple-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold text-sm">{sc.title}</span>
                  </div>
                  <p className="text-xs text-gray-500">{sc.desc}</p>
                  <p className="mt-2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" /> Click to start
                  </p>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="h-px flex-1 bg-gray-200" />
              <span>or describe your campaign below</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((msg) => {
              if (msg.type === "user") {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-purple-600 px-4 py-3 text-sm text-white">
                      {msg.text}
                    </div>
                  </div>
                );
              }
              if (msg.type === "agent" && msg.agent) {
                const a = agents[msg.agent];
                return (
                  <div key={msg.id} className="flex items-start gap-3">
                    <AgentAvatar agentId={msg.agent} />
                    <div className="max-w-[85%]">
                      <p className="mb-1 text-xs font-medium text-gray-400">{a.name} · {a.role}</p>
                      <div className="rounded-2xl rounded-tl-md bg-gray-100 px-4 py-3 text-sm text-gray-800">
                        <MarkdownText text={msg.text || ""} />
                      </div>
                    </div>
                  </div>
                );
              }
              if (msg.type === "choices" && msg.choices) {
                return (
                  <div key={msg.id} className="ml-11 flex flex-wrap gap-2">
                    {msg.choices.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => waitingForChoice && handleChoice(c.value)}
                        disabled={!waitingForChoice}
                        className="rounded-full border-2 border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 transition-all hover:bg-purple-50 hover:border-purple-400 disabled:opacity-50 disabled:cursor-default"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                );
              }
              if (msg.type === "analysis" && msg.analysis) {
                return <AnalysisCard key={msg.id} analysis={msg.analysis} />;
              }
              if (msg.type === "images" && msg.images) {
                return <ImagesGrid key={msg.id} images={msg.images} />;
              }
              if (msg.type === "campaign-card" && msg.campaign) {
                return <CampaignCard key={msg.id} campaign={msg.campaign} />;
              }
              if (msg.type === "publishing" && msg.publishing) {
                return <PublishingStatus key={msg.id} publishing={msg.publishing} />;
              }
              return null;
            })}

            {isTyping && <TypingIndicator agentId={typingAgent} />}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button
            onClick={() => { setStarted(false); setMessages([]); setConversationStep(-1); setConversation([]); setWaitingForChoice(false); }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-500 transition-colors"
            title="New campaign"
          >
            <Plus className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={started ? "Type a message or click an option above..." : "Describe your campaign — e.g. 'Launch our new waterproof jacket targeting UK hikers'"}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 pr-12 text-sm outline-none focus:border-purple-400 focus:bg-white transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white disabled:bg-gray-300 transition-colors hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function extractProductName(prompt: string): string {
  // Try to extract a product name from the prompt
  const match = prompt.match(/(?:for|launch|campaign|promote)\s+(?:our\s+|the\s+|a\s+)?(?:new\s+)?(.+?)(?:\s*[-—–]\s*|\.\s*|$)/i);
  if (match) {
    const name = match[1].replace(/^(berghaus\s+)/i, "Berghaus ").trim();
    // Capitalize first letter of each word
    return name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").substring(0, 60);
  }
  return "New Product Campaign";
}
