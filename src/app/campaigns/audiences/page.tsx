"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useAudiences,
  useCreateAudience,
  useDeleteAudience,
} from "@/hooks/use-campaigns";
import type { Audience } from "@/types";
import {
  ArrowLeft,
  Plus,
  Search,
  Users,
  Trash2,
  Globe,
  Target,
  Heart,
} from "lucide-react";

const PLATFORM_COLORS: Record<string, string> = {
  meta: "bg-blue-100 text-blue-700",
  google: "bg-red-100 text-red-700",
  linkedin: "bg-sky-100 text-sky-700",
  tiktok: "bg-pink-100 text-pink-700",
};

const TYPE_LABELS: Record<string, string> = {
  saved: "Saved Audience",
  custom: "Custom Audience",
  lookalike: "Lookalike Audience",
};

export default function AudiencesPage() {
  const [platformFilter, setPlatformFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    platform: "meta",
    type: "saved",
    demographics: "",
    interests: "",
    behaviors: "",
  });

  const { data: audiences, isLoading } = useAudiences(platformFilter || undefined);
  const createAudience = useCreateAudience();
  const deleteAudience = useDeleteAudience();

  const filtered = audiences?.filter((a) =>
    !search || a.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name) return;

    const data: Partial<Audience> = {
      name: form.name,
      platform: form.platform,
      type: form.type,
    };

    if (form.demographics) {
      try {
        data.demographics_json = JSON.parse(form.demographics);
      } catch {
        data.demographics_json = { raw: form.demographics };
      }
    }
    if (form.interests) {
      try {
        data.interests_json = JSON.parse(form.interests);
      } catch {
        data.interests_json = { keywords: form.interests.split(",").map((s) => s.trim()) };
      }
    }
    if (form.behaviors) {
      try {
        data.behaviors_json = JSON.parse(form.behaviors);
      } catch {
        data.behaviors_json = { keywords: form.behaviors.split(",").map((s) => s.trim()) };
      }
    }

    createAudience.mutate(data);
    setForm({ name: "", platform: "meta", type: "saved", demographics: "", interests: "", behaviors: "" });
    setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/campaigns" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Audiences</h1>
            <p className="text-gray-500">Build and manage targeting audiences</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Create Audience
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="rounded-lg border bg-white p-5">
          <h3 className="mb-4 font-semibold">New Audience</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-gray-500">Name</label>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="e.g. NL Tech Professionals 25-45"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Platform</label>
                <select
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                >
                  <option value="meta">Meta</option>
                  <option value="google">Google</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Type</label>
                <select
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="saved">Saved</option>
                  <option value="custom">Custom</option>
                  <option value="lookalike">Lookalike</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Demographics</label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-sm"
                rows={2}
                placeholder='JSON or text, e.g. {"age_min": 25, "age_max": 45, "genders": [1]}'
                value={form.demographics}
                onChange={(e) => setForm({ ...form, demographics: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Interests</label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-sm"
                rows={2}
                placeholder="Comma-separated: technology, startups, AI"
                value={form.interests}
                onChange={(e) => setForm({ ...form, interests: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Behaviors</label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-sm"
                rows={2}
                placeholder="Comma-separated: online shoppers, frequent travelers"
                value={form.behaviors}
                onChange={(e) => setForm({ ...form, behaviors: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleCreate} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
              Create Audience
            </button>
            <button onClick={() => setShowCreate(false)} className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm"
            placeholder="Search audiences..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="meta">Meta</option>
          <option value="google">Google</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
        </select>
      </div>

      {/* Audience Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((audience) => (
            <AudienceCard key={audience.id} audience={audience} onDelete={() => deleteAudience.mutate(audience.id)} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-white py-12 text-center">
          <Users className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500">No audiences yet</p>
          <button
            onClick={() => setShowCreate(true)}
            className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Create your first audience
          </button>
        </div>
      )}
    </div>
  );
}

function AudienceCard({ audience, onDelete }: { audience: Audience; onDelete: () => void }) {
  const interestCount = audience.interests_json
    ? Object.keys(audience.interests_json).length
    : 0;
  const demographicCount = audience.demographics_json
    ? Object.keys(audience.demographics_json).length
    : 0;
  const behaviorCount = audience.behaviors_json
    ? Object.keys(audience.behaviors_json).length
    : 0;

  return (
    <div className="rounded-lg border bg-white p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
            <Users className="h-5 w-5 text-brand-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{audience.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${PLATFORM_COLORS[audience.platform] || "bg-gray-100"}`}>
                {audience.platform}
              </span>
              <span className="text-[10px] text-gray-400">
                {TYPE_LABELS[audience.type] || audience.type}
              </span>
            </div>
          </div>
        </div>
        <button onClick={onDelete} className="rounded p-1 text-gray-300 hover:bg-red-50 hover:text-red-500">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
        {demographicCount > 0 && (
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" /> {demographicCount} demographics
          </span>
        )}
        {interestCount > 0 && (
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> {interestCount} interests
          </span>
        )}
        {behaviorCount > 0 && (
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3" /> {behaviorCount} behaviors
          </span>
        )}
      </div>

      {audience.size_estimate && (
        <div className="mt-2 text-xs">
          <span className="font-medium text-brand-600">
            ~{audience.size_estimate.toLocaleString()} people
          </span>
        </div>
      )}

      {audience.platform_audience_id && (
        <div className="mt-2 text-[10px] text-gray-400 truncate">
          Platform ID: {audience.platform_audience_id}
        </div>
      )}

      <div className="mt-2 text-[10px] text-gray-400">
        Created {new Date(audience.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
