"use client";

import { useState } from "react";
import { Image, PenTool, Sparkles, Loader2, Shield, Download, Copy, RefreshCw, Wand2, Layers, Type, Palette } from "lucide-react";

const imageStyles = [
  { id: "lifestyle", label: "Lifestyle Photography", desc: "Product in natural outdoor setting" },
  { id: "product", label: "Product Shot", desc: "Clean product-focused imagery" },
  { id: "action", label: "Action Shot", desc: "Product in use during activity" },
  { id: "mood", label: "Mood / Atmospheric", desc: "Emotional, cinematic feel" },
  { id: "flat-lay", label: "Flat Lay", desc: "Top-down product arrangement" },
  { id: "ugc", label: "UGC Style", desc: "Authentic, user-generated feel" },
];

const platforms = [
  { id: "instagram-feed", label: "Instagram Feed", ratio: "1:1", size: "1080×1080" },
  { id: "instagram-story", label: "Instagram Story", ratio: "9:16", size: "1080×1920" },
  { id: "facebook-feed", label: "Facebook Feed", ratio: "4:5", size: "1080×1350" },
  { id: "google-display", label: "Google Display", ratio: "16:9", size: "1200×628" },
  { id: "tiktok", label: "TikTok", ratio: "9:16", size: "1080×1920" },
  { id: "snapchat", label: "Snapchat", ratio: "9:16", size: "1080×1920" },
];

const generatedImages = [
  { id: 1, style: "lifestyle", platform: "instagram-feed", url: "https://placehold.co/540x540/1a1a2e/FFB3C7?text=Hiker+on+ridge%0AMoody+Dawn+Light&font=raleway", caption: "Hiker on misty ridge at dawn wearing Hillwalker 2.0", brandScore: 96 },
  { id: 2, style: "action", platform: "instagram-story", url: "https://placehold.co/540x960/2d3436/FFB3C7?text=Rain+Running%0AGore-Tex+Detail&font=raleway", caption: "Runner in rain, Gore-Tex water beading close-up", brandScore: 94 },
  { id: 3, style: "product", platform: "facebook-feed", url: "https://placehold.co/540x675/0a3d62/ffffff?text=Product+Hero%0A3-in-1+System&font=raleway", caption: "Hillwalker 2.0 product hero, 3-in-1 system visible", brandScore: 98 },
  { id: 4, style: "mood", platform: "google-display", url: "https://placehold.co/600x314/1a1a2e/FFB3C7?text=Mountain+Panorama%0ACinematic+Wide&font=raleway", caption: "Wide mountain panorama, lone hiker, cinematic grade", brandScore: 92 },
  { id: 5, style: "flat-lay", platform: "instagram-feed", url: "https://placehold.co/540x540/f5f5f0/1a1a2e?text=Flat+Lay%0AGear+Essentials&font=raleway", caption: "Flat lay of complete hiking kit with Berghaus products", brandScore: 95 },
  { id: 6, style: "ugc", platform: "tiktok", url: "https://placehold.co/540x960/2d3436/FFB3C7?text=UGC+POV%0ATrail+Selfie&font=raleway", caption: "UGC-style selfie on trail, authentic & unpolished", brandScore: 88 },
];

const copyVariants = [
  { id: 1, type: "Primary", headline: "Built Different. Tested on Every Ridge in Britain.", body: "The new Hillwalker 2.0 Gore-Tex jacket. Three-layer protection, 280g lighter. From the Lakes to the Highlands — this is the jacket that keeps going when the weather says stop.", cta: "Shop Now", brandScore: 95, scores: { tone: 97, vocabulary: 93, style: 95 } },
  { id: 2, type: "Emotional", headline: "The Mountain Doesn't Care. You Should.", body: "Introducing the Hillwalker 2.0. Engineered for the worst conditions, designed for the longest days. Waterproof. Breathable. Unstoppable. Three ways to wear it, one jacket to trust.", cta: "Explore Now", brandScore: 91, scores: { tone: 93, vocabulary: 88, style: 92 } },
  { id: 3, type: "Functional", headline: "3 Layers. 3 Ways to Wear It. 0 Compromises.", body: "Shell, insulated, or both — the Hillwalker 2.0 Gemini adapts to every condition. Gore-Tex 2L outer. Synthetic down inner. 280g lighter than last gen. Because British weather doesn't pick one mood.", cta: "See Details", brandScore: 93, scores: { tone: 91, vocabulary: 95, style: 93 } },
];

export default function StudioPage() {
  const [tab, setTab] = useState<"images" | "copy">("images");
  const [imagePrompt, setImagePrompt] = useState("Hiker wearing Berghaus Hillwalker 2.0 jacket on a misty mountain ridge at dawn, moody atmospheric lighting, rain visible");
  const [selectedStyle, setSelectedStyle] = useState("lifestyle");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram-feed", "instagram-story"]);
  const [generating, setGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Copy state
  const [copyPrompt, setCopyPrompt] = useState("Write ad copy for the Berghaus Hillwalker 2.0 Gore-Tex jacket — a 3-in-1 waterproof jacket, lighter than previous model, targeting UK outdoor enthusiasts");
  const [copyPlatform, setCopyPlatform] = useState("meta");
  const [copyTone, setCopyTone] = useState("confident");
  const [generatingCopy, setGeneratingCopy] = useState(false);
  const [showCopyResults, setShowCopyResults] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowResults(true);
    }, 3000);
  };

  const handleGenerateCopy = () => {
    setGeneratingCopy(true);
    setTimeout(() => {
      setGeneratingCopy(false);
      setShowCopyResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">AI Creative Studio</h1>
        <p className="text-gray-500">Generate images with Gemini Imagen and copy with Claude — all brand-scored</p>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        <button onClick={() => setTab("images")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${tab === "images" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
          <Image className="h-4 w-4" /> Image Generation
        </button>
        <button onClick={() => setTab("copy")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${tab === "copy" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
          <PenTool className="h-4 w-4" /> Copy Generation
        </button>
      </div>

      {tab === "images" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Controls */}
          <div className="space-y-5">
            <div className="rounded-xl border bg-white p-5 space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><Wand2 className="h-4 w-4 text-rose-500" /> Image Prompt</h3>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={4}
                className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:bg-white"
              />

              <h3 className="font-semibold flex items-center gap-2"><Palette className="h-4 w-4 text-rose-500" /> Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {imageStyles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`rounded-lg border p-2.5 text-left text-xs transition-all ${selectedStyle === s.id ? "border-rose-400 bg-rose-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-medium block">{s.label}</span>
                    <span className="text-gray-400">{s.desc}</span>
                  </button>
                ))}
              </div>

              <h3 className="font-semibold flex items-center gap-2"><Layers className="h-4 w-4 text-rose-500" /> Platform Formats</h3>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatforms(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                    className={`rounded-lg border p-2 text-left text-xs transition-all ${selectedPlatforms.includes(p.id) ? "border-rose-400 bg-rose-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-medium block">{p.label}</span>
                    <span className="text-gray-400">{p.ratio} · {p.size}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-3 text-sm font-semibold text-white hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 transition-all"
              >
                {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating with Gemini Imagen...</> : <><Sparkles className="h-4 w-4" /> Generate Images</>}
              </button>
            </div>

            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">Brand Guardian Active</span>
              </div>
              <p className="text-xs text-orange-700">Kai is reviewing all generated images against Berghaus brand guidelines. Images below 85% brand score will be flagged.</p>
            </div>
          </div>

          {/* Results */}
          <div>
            {!showResults && !generating && (
              <div className="flex h-96 items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <Image className="mx-auto h-12 w-12 mb-3" />
                  <p className="font-medium">Configure and generate images</p>
                  <p className="text-sm">Powered by Gemini Imagen 3</p>
                </div>
              </div>
            )}

            {generating && (
              <div className="flex h-96 items-center justify-center rounded-xl border-2 border-rose-200 bg-rose-50/30">
                <div className="text-center">
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-rose-400 mb-3" />
                  <p className="font-medium text-gray-700">Generating 6 images across formats...</p>
                  <p className="text-sm text-gray-500 mt-1">Gemini Imagen 3 is creating your visuals</p>
                  <p className="text-xs text-gray-400 mt-1">Kai (Brand Guardian) will review each image</p>
                </div>
              </div>
            )}

            {showResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Generated Images</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setShowResults(false); setGenerating(true); setTimeout(() => { setGenerating(false); setShowResults(true); }, 2500); }} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50">
                      <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800">
                      <Download className="h-3.5 w-3.5" /> Download All
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {generatedImages.map(img => (
                    <div key={img.id} className="group overflow-hidden rounded-xl border-2 border-gray-100 bg-white transition-all hover:border-rose-200 hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img src={img.url} alt={img.caption} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex w-full items-center justify-between p-3">
                            <button className="rounded-lg bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm hover:bg-white/30">
                              <Download className="h-3.5 w-3.5" />
                            </button>
                            <button className="rounded-lg bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm hover:bg-white/30">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-600 line-clamp-2">{img.caption}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 uppercase">{img.style} · {img.platform}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${img.brandScore >= 95 ? "bg-green-100 text-green-700" : img.brandScore >= 90 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                            <Shield className="h-2.5 w-2.5" /> {img.brandScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Copy Generation Tab */
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-5">
            <div className="rounded-xl border bg-white p-5 space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><Type className="h-4 w-4 text-amber-500" /> Brief</h3>
              <textarea
                value={copyPrompt}
                onChange={(e) => setCopyPrompt(e.target.value)}
                rows={4}
                className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:border-amber-300 focus:bg-white"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Platform</label>
                  <select value={copyPlatform} onChange={(e) => setCopyPlatform(e.target.value)} className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm">
                    <option value="meta">Meta (FB + IG)</option>
                    <option value="google">Google Ads</option>
                    <option value="tiktok">TikTok</option>
                    <option value="snapchat">Snapchat</option>
                    <option value="email">Email</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">Tone</label>
                  <select value={copyTone} onChange={(e) => setCopyTone(e.target.value)} className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm">
                    <option value="confident">Confident</option>
                    <option value="adventurous">Adventurous</option>
                    <option value="technical">Technical</option>
                    <option value="casual">Casual / UGC</option>
                    <option value="urgent">Urgency / FOMO</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateCopy}
                disabled={generatingCopy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white hover:from-amber-600 hover:to-orange-700 disabled:opacity-50"
              >
                {generatingCopy ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating with Claude...</> : <><Sparkles className="h-4 w-4" /> Generate 3 Variants</>}
              </button>
            </div>
          </div>

          <div>
            {!showCopyResults && !generatingCopy && (
              <div className="flex h-96 items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <PenTool className="mx-auto h-12 w-12 mb-3" />
                  <p className="font-medium">Describe what you need and generate copy</p>
                  <p className="text-sm">3 variants scored against your brand voice</p>
                </div>
              </div>
            )}

            {generatingCopy && (
              <div className="flex h-96 items-center justify-center rounded-xl border-2 border-amber-200 bg-amber-50/30">
                <div className="text-center">
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-amber-400 mb-3" />
                  <p className="font-medium text-gray-700">Sam is writing 3 variants...</p>
                  <p className="text-sm text-gray-500 mt-1">Kai is scoring each against brand guidelines</p>
                </div>
              </div>
            )}

            {showCopyResults && (
              <div className="space-y-4">
                <h3 className="font-semibold">Generated Copy — 3 Variants</h3>
                {copyVariants.map(v => (
                  <div key={v.id} className="rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-amber-200 hover:shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{v.type}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${v.brandScore >= 95 ? "bg-green-100 text-green-700" : v.brandScore >= 90 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                        <Shield className="h-3 w-3" /> Brand Score: {v.brandScore}%
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">"{v.headline}"</h4>
                    <p className="text-sm text-gray-700 mb-3">{v.body}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>Tone: {v.scores.tone}%</span>
                        <span>Vocabulary: {v.scores.vocabulary}%</span>
                        <span>Style: {v.scores.style}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-gray-50">
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                        <button className="flex items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-amber-600">
                          Use in Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
