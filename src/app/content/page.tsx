"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useBrands } from "@/hooks/use-content";
import type { VariantDetail, ImageGenerateResponse } from "@/types";
import {
  Sparkles, Copy, Check, Image, Type, BookOpen, Calendar, ChevronRight,
  AlertCircle, Save,
} from "lucide-react";

type Tab = "copy" | "image";

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>("copy");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Content Generator</h1>
          <p className="text-gray-500">Generate ad copy, social posts, images, and more with AI</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/content/library"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <BookOpen className="h-4 w-4" /> Library
          </Link>
          <Link
            href="/content/templates"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Type className="h-4 w-4" /> Templates
          </Link>
          <Link
            href="/content/calendar"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4" /> Calendar
          </Link>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setTab("copy")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "copy" ? "bg-white text-brand-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Type className="mr-2 inline h-4 w-4" /> Copy Generation
        </button>
        <button
          onClick={() => setTab("image")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "image" ? "bg-white text-brand-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Image className="mr-2 inline h-4 w-4" /> Image Generation
        </button>
      </div>

      {tab === "copy" ? <CopyGenerator /> : <ImageGenerator />}
    </div>
  );
}

// -------------------------------------------------------------------
// Copy Generator
// -------------------------------------------------------------------

function CopyGenerator() {
  const [brief, setBrief] = useState("");
  const [contentType, setContentType] = useState("ad_copy");
  const [platform, setPlatform] = useState("meta");
  const [tone, setTone] = useState("professional");
  const [brandId, setBrandId] = useState<number | null>(null);
  const [audience, setAudience] = useState("");
  const [keyMessage, setKeyMessage] = useState("");
  const [numVariants, setNumVariants] = useState(3);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [variants, setVariants] = useState<VariantDetail[]>([]);
  const [contentId, setContentId] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const { data: brands } = useBrands();

  const handleGenerate = async () => {
    if (!brief.trim()) return;
    setGenerating(true);
    try {
      const res = await api.post<{ content_id: number; variants: VariantDetail[] }>("/content/generate", {
        type: contentType,
        platform,
        brief,
        tone,
        brand_id: brandId,
        audience: audience || undefined,
        key_message: keyMessage || undefined,
        num_variants: numVariants,
      });
      setVariants(res.variants);
      setContentId(res.content_id);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, version: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(version);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Input Panel (2/5) */}
      <div className="space-y-4 rounded-lg border bg-white p-6 lg:col-span-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          >
            <option value="ad_copy">Ad Copy</option>
            <option value="social_post">Social Post</option>
            <option value="email">Email</option>
            <option value="blog_article">Blog Article</option>
            <option value="product_description">Product Description</option>
            <option value="video_script">Video Script</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          >
            <option value="meta">Meta (Facebook/Instagram)</option>
            <option value="google">Google Ads</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <select
            value={brandId ?? ""}
            onChange={(e) => setBrandId(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          >
            <option value="">No brand (generic)</option>
            {brands?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} {b.voice_tone ? `(${b.voice_tone})` : ""}
              </option>
            ))}
          </select>
          {brandId && (
            <p className="mt-1 text-xs text-brand-600">
              Brand voice will be injected and consistency scored
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="playful">Playful</option>
            <option value="urgent">Urgent</option>
            <option value="inspirational">Inspirational</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brief</label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
            placeholder="Describe what you want to promote, key messages, target audience..."
          />
        </div>

        {/* Advanced Fields */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-90" : ""}`} />
          Advanced options
        </button>
        {showAdvanced && (
          <div className="space-y-3 rounded-lg bg-gray-50 p-3">
            <div>
              <label className="block text-xs font-medium text-gray-600">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="mt-1 block w-full rounded border px-2 py-1.5 text-sm"
                placeholder="e.g., Small business owners aged 30-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Key Message / Offer</label>
              <input
                type="text"
                value={keyMessage}
                onChange={(e) => setKeyMessage(e.target.value)}
                className="mt-1 block w-full rounded border px-2 py-1.5 text-sm"
                placeholder="e.g., 30% off this weekend only"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">Number of Variants</label>
              <select
                value={numVariants}
                onChange={(e) => setNumVariants(Number(e.target.value))}
                className="mt-1 block w-full rounded border px-2 py-1.5 text-sm"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating || !brief.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {generating ? "Generating..." : "Generate Variants"}
        </button>
      </div>

      {/* Output Panel (3/5) */}
      <div className="space-y-4 lg:col-span-3">
        {variants.length === 0 && !generating && (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-white text-gray-400">
            Generated content will appear here
          </div>
        )}

        {generating && (
          <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
            <div className="flex flex-col items-center gap-3 text-brand-600">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <span>Generating {numVariants} variants...</span>
              {brandId && <span className="text-xs text-gray-400">+ scoring brand consistency</span>}
            </div>
          </div>
        )}

        {variants.map((variant) => (
          <div key={variant.version} className="rounded-lg border bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                  Variant {variant.version}
                </span>
                {variant.brand_score !== null && (
                  <BrandScoreBadge score={variant.brand_score} />
                )}
                {variant.character_count && (
                  <span className="text-xs text-gray-400">
                    {variant.character_count} chars
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(variant.text, variant.version)}
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                >
                  {copied === variant.version ? (
                    <><Check className="h-3.5 w-3.5" /> Copied</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" /> Copy</>
                  )}
                </button>
                <Link
                  href={`/content/library`}
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                >
                  <Save className="h-3.5 w-3.5" /> Library
                </Link>
              </div>
            </div>

            {variant.headline && (
              <p className="mb-1 text-sm font-semibold text-gray-900">{variant.headline}</p>
            )}
            <p className="whitespace-pre-wrap text-sm text-gray-700">{variant.text}</p>
            {variant.cta_text && (
              <p className="mt-2 text-sm font-medium text-brand-600">{variant.cta_text}</p>
            )}

            {variant.brand_score_breakdown && (
              <div className="mt-3 flex gap-4 border-t pt-3">
                {Object.entries(variant.brand_score_breakdown).map(([key, val]) => (
                  <div key={key} className="text-xs">
                    <span className="capitalize text-gray-400">{key}: </span>
                    <span className={val >= 70 ? "text-green-600" : "text-amber-600"}>{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {contentId && variants.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" /> Generate More Variants
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Image Generator
// -------------------------------------------------------------------

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("photorealistic");
  const [platform, setPlatform] = useState("");
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [count, setCount] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<ImageGenerateResponse | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const res = await api.post<ImageGenerateResponse>("/content/generate-image", {
        prompt,
        style,
        platform: platform || undefined,
        width,
        height,
        count,
      });
      setResult(res);
    } catch (err) {
      console.error("Image generation failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  const dimensionPresets = [
    { label: "Square (1:1)", w: 1024, h: 1024 },
    { label: "Landscape (16:9)", w: 1792, h: 1024 },
    { label: "Portrait (9:16)", w: 1024, h: 1792 },
    { label: "Meta Feed (4:5)", w: 1080, h: 1350 },
    { label: "LinkedIn (1200x627)", w: 1200, h: 627 },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Input */}
      <div className="space-y-4 rounded-lg border bg-white p-6 lg:col-span-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
            placeholder="Describe the marketing image you want to create..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          >
            <option value="photorealistic">Photorealistic</option>
            <option value="illustration">Illustration</option>
            <option value="flat_design">Flat Design</option>
            <option value="abstract">Abstract</option>
            <option value="branded">Branded</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensions</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {dimensionPresets.map((p) => (
              <button
                key={p.label}
                onClick={() => { setWidth(p.w); setHeight(p.h); }}
                className={`rounded border px-2 py-1 text-xs ${
                  width === p.w && height === p.h
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Images</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          <Image className="h-4 w-4" />
          {generating ? "Generating..." : "Generate Images"}
        </button>
      </div>

      {/* Output */}
      <div className="space-y-4 lg:col-span-3">
        {!result && !generating && (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-white text-gray-400">
            Generated images will appear here
          </div>
        )}

        {generating && (
          <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
            <div className="flex flex-col items-center gap-3 text-brand-600">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              <span>Generating {count} image{count > 1 ? "s" : ""}...</span>
              <span className="text-xs text-gray-400">This may take up to 30 seconds</span>
            </div>
          </div>
        )}

        {result && (
          <div className="grid gap-4 sm:grid-cols-2">
            {result.images.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-lg border bg-white">
                {img.url && !img.error ? (
                  <img
                    src={img.url}
                    alt={img.prompt_used}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-gray-50 text-sm text-red-500">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    {img.error || "Generation failed"}
                  </div>
                )}
                <div className="p-3">
                  <p className="line-clamp-2 text-xs text-gray-500">{img.prompt_used}</p>
                  {img.revised_prompt && (
                    <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                      Revised: {img.revised_prompt}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {result?.cost_usd !== null && result?.cost_usd !== undefined && (
          <p className="text-center text-xs text-gray-400">
            Generation cost: ${result.cost_usd.toFixed(3)}
          </p>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Brand Score Badge
// -------------------------------------------------------------------

function BrandScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-green-50 text-green-700 border-green-200"
      : score >= 60
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}>
      Brand: {Math.round(score)}%
    </span>
  );
}
