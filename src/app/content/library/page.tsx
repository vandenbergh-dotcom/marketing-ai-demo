"use client";

import { useState } from "react";
import Link from "next/link";
import { useContentList, useContentVersions, useDeleteContent } from "@/hooks/use-content";
import type { Content } from "@/types";
import {
  Search, Filter, Grid, List, Trash2, Eye, Sparkles,
  ArrowLeft, X, FileText, Mail, Video, ShoppingBag,
} from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  ad_copy: "Ad Copy",
  social_post: "Social Post",
  email: "Email",
  blog_article: "Blog Article",
  landing_page: "Landing Page",
  video_script: "Video Script",
  product_description: "Product Description",
};

const STATUS_COLORS: Record<string, string> = {
  generating: "bg-blue-100 text-blue-700",
  draft: "bg-gray-100 text-gray-700",
  review: "bg-amber-100 text-amber-700",
  changes_requested: "bg-orange-100 text-orange-700",
  approved: "bg-green-100 text-green-700",
  published: "bg-brand-100 text-brand-700",
  archived: "bg-gray-100 text-gray-500",
};

const PLATFORM_LABELS: Record<string, string> = {
  meta: "Meta",
  google: "Google",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

const TYPE_ICONS: Record<string, typeof FileText> = {
  ad_copy: FileText,
  social_post: FileText,
  email: Mail,
  blog_article: FileText,
  video_script: Video,
  product_description: ShoppingBag,
};

export default function ContentLibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: items, isLoading } = useContentList({
    status: statusFilter || undefined,
    type: typeFilter || undefined,
    platform: platformFilter || undefined,
    q: search || undefined,
  });

  const deleteContent = useDeleteContent();

  const handleDelete = async (id: number) => {
    if (confirm("Delete this content?")) {
      await deleteContent.mutateAsync(id);
      if (selectedId === id) setSelectedId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/content" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Content Library</h1>
            <p className="text-gray-500">Browse and manage your generated content</p>
          </div>
        </div>
        <Link
          href="/content"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Sparkles className="h-4 w-4" /> Generate New
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search content..."
            className="w-full rounded-lg border py-2 pl-10 pr-3 text-sm"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          {Object.entries(TYPE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="review">In Review</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">All Platforms</option>
          {Object.entries(PLATFORM_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
        <div className="flex rounded-lg border">
          <button
            onClick={() => setView("grid")}
            className={`p-2 ${view === "grid" ? "bg-gray-100" : ""}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 ${view === "list" ? "bg-gray-100" : ""}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        <div className="flex-1">
          {isLoading && (
            <div className="flex h-40 items-center justify-center text-gray-400">Loading...</div>
          )}

          {!isLoading && items?.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-gray-400">
              No content found. Generate some content to get started.
            </div>
          )}

          {view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items?.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(selectedId === item.id ? null : item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border bg-white">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Title</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Platform</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Created</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items?.map((item) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer hover:bg-gray-50 ${selectedId === item.id ? "bg-brand-50" : ""}`}
                      onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                    >
                      <td className="px-4 py-3 font-medium">{item.title}</td>
                      <td className="px-4 py-3 text-gray-500">{TYPE_LABELS[item.type] || item.type}</td>
                      <td className="px-4 py-3 text-gray-500">{item.platform ? PLATFORM_LABELS[item.platform] || item.platform : "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status] || ""}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Sidebar */}
        {selectedId && (
          <ContentDetailSidebar
            contentId={selectedId}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}

function ContentCard({
  item,
  isSelected,
  onSelect,
  onDelete,
}: {
  item: Content;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const Icon = TYPE_ICONS[item.type] || FileText;

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border bg-white p-4 transition-colors hover:border-brand-300 ${
        isSelected ? "border-brand-500 ring-1 ring-brand-200" : ""
      }`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded bg-gray-100 p-1.5">
            <Icon className="h-4 w-4 text-gray-500" />
          </div>
          <span className="text-xs text-gray-500">{TYPE_LABELS[item.type] || item.type}</span>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status] || ""}`}>
          {item.status}
        </span>
      </div>
      <h3 className="line-clamp-2 text-sm font-medium">{item.title}</h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {item.platform ? PLATFORM_LABELS[item.platform] || item.platform : "General"}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

function ContentDetailSidebar({
  contentId,
  onClose,
}: {
  contentId: number;
  onClose: () => void;
}) {
  const { data: versions, isLoading } = useContentVersions(contentId);

  return (
    <div className="w-[380px] shrink-0 rounded-lg border bg-white">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-medium">Version History</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      {isLoading && (
        <div className="flex h-32 items-center justify-center text-gray-400">Loading...</div>
      )}

      <div className="max-h-[600px] space-y-3 overflow-y-auto p-4">
        {versions?.map((v) => (
          <div key={v.id} className="rounded-lg border p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Version {v.version_number}</span>
              {v.brand_score !== null && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  v.brand_score >= 80
                    ? "bg-green-50 text-green-700"
                    : v.brand_score >= 60
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
                }`}>
                  {Math.round(v.brand_score)}%
                </span>
              )}
            </div>
            {v.headline && <p className="mb-1 text-xs font-semibold">{v.headline}</p>}
            <p className="whitespace-pre-wrap text-xs text-gray-600">{v.body_text}</p>
            {v.cta_text && <p className="mt-1 text-xs font-medium text-brand-600">{v.cta_text}</p>}
            <p className="mt-2 text-xs text-gray-400">
              {v.ai_model_used} &middot; {new Date(v.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
