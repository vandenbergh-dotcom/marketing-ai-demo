"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useCampaignDetail,
  useUpdateCampaign,
  useCampaignAction,
  usePushCampaign,
  useSyncCampaign,
  useDuplicateCampaign,
  useCreateAdSet,
  useDeleteAdSet,
  useCreateAd,
  useDeleteAd,
} from "@/hooks/use-campaigns";
import {
  ArrowLeft,
  Play,
  Pause,
  Send,
  CheckCircle,
  Copy,
  RefreshCw,
  Upload,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Edit3,
  Save,
  X,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  review: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  live: "bg-brand-100 text-brand-700",
  paused: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const PLATFORM_COLORS: Record<string, string> = {
  meta: "bg-blue-100 text-blue-700",
  google: "bg-red-100 text-red-700",
  linkedin: "bg-sky-100 text-sky-700",
  tiktok: "bg-pink-100 text-pink-700",
};

const OBJECTIVES = [
  "traffic", "conversions", "awareness", "engagement",
  "leads", "app_installs", "video_views", "reach",
];

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = Number(params.id);

  const { data: campaign, isLoading } = useCampaignDetail(campaignId);
  const updateCampaign = useUpdateCampaign(campaignId);
  const campaignAction = useCampaignAction(campaignId);
  const pushCampaign = usePushCampaign(campaignId);
  const syncCampaign = useSyncCampaign(campaignId);
  const duplicateCampaign = useDuplicateCampaign(campaignId);
  const createAdSet = useCreateAdSet(campaignId);
  const deleteAdSet = useDeleteAdSet(campaignId);

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, unknown>>({});
  const [expandedAdSets, setExpandedAdSets] = useState<Set<number>>(new Set());
  const [showAddAdSet, setShowAddAdSet] = useState(false);
  const [newAdSet, setNewAdSet] = useState({ name: "", platform: "meta", daily_budget: "" });
  const [pushResult, setPushResult] = useState<Record<string, unknown> | null>(null);
  const [syncResult, setSyncResult] = useState<Record<string, unknown> | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="py-20 text-center text-gray-500">Campaign not found</div>
    );
  }

  const toggleAdSet = (id: number) => {
    setExpandedAdSets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startEdit = () => {
    setEditForm({
      name: campaign.name,
      objective: campaign.objective,
      total_budget: campaign.total_budget ?? "",
      daily_budget: campaign.daily_budget ?? "",
      start_date: campaign.start_date ?? "",
      end_date: campaign.end_date ?? "",
    });
    setEditing(true);
  };

  const saveEdit = () => {
    const data: Record<string, unknown> = {};
    if (editForm.name !== campaign.name) data.name = editForm.name;
    if (editForm.objective !== campaign.objective) data.objective = editForm.objective;
    if (editForm.total_budget !== (campaign.total_budget ?? ""))
      data.total_budget = editForm.total_budget || null;
    if (editForm.daily_budget !== (campaign.daily_budget ?? ""))
      data.daily_budget = editForm.daily_budget || null;
    if (editForm.start_date !== (campaign.start_date ?? ""))
      data.start_date = editForm.start_date || null;
    if (editForm.end_date !== (campaign.end_date ?? ""))
      data.end_date = editForm.end_date || null;

    if (Object.keys(data).length > 0) {
      updateCampaign.mutate(data as Partial<typeof campaign>);
    }
    setEditing(false);
  };

  const handlePush = async () => {
    try {
      const result = await pushCampaign.mutateAsync({});
      setPushResult(result as unknown as Record<string, unknown>);
    } catch {
      // error handled by react-query
    }
  };

  const handleSync = async () => {
    try {
      const result = await syncCampaign.mutateAsync();
      setSyncResult(result as unknown as Record<string, unknown>);
    } catch {
      // error handled by react-query
    }
  };

  const handleDuplicate = async () => {
    try {
      const result = await duplicateCampaign.mutateAsync();
      router.push(`/campaigns/${result.new_id}`);
    } catch {
      // error handled by react-query
    }
  };

  const handleAddAdSet = () => {
    if (!newAdSet.name) return;
    createAdSet.mutate({
      name: newAdSet.name,
      platform: newAdSet.platform,
      daily_budget: newAdSet.daily_budget ? Number(newAdSet.daily_budget) : undefined,
    } as Partial<import("@/types").AdSet>);
    setNewAdSet({ name: "", platform: "meta", daily_budget: "" });
    setShowAddAdSet(false);
  };

  // Determine available actions based on status
  const statusActions: { label: string; action: string; icon: typeof Play; variant: string }[] = [];
  if (campaign.status === "draft") {
    statusActions.push({ label: "Submit for Review", action: "submit", icon: Send, variant: "bg-amber-600 hover:bg-amber-700" });
  }
  if (campaign.status === "review") {
    statusActions.push({ label: "Approve", action: "approve", icon: CheckCircle, variant: "bg-green-600 hover:bg-green-700" });
  }
  if (campaign.status === "approved") {
    statusActions.push({ label: "Launch", action: "launch", icon: Play, variant: "bg-brand-600 hover:bg-brand-700" });
  }
  if (campaign.status === "live") {
    statusActions.push({ label: "Pause", action: "pause", icon: Pause, variant: "bg-red-600 hover:bg-red-700" });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Link href="/campaigns" className="mt-1 text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            {editing ? (
              <input
                className="border-b-2 border-brand-500 text-2xl font-bold outline-none"
                value={editForm.name as string}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            ) : (
              <h1 className="text-2xl font-bold">{campaign.name}</h1>
            )}
            <div className="mt-1 flex items-center gap-2">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[campaign.status] || "bg-gray-100"}`}>
                {campaign.status}
              </span>
              {campaign.platforms.map((p) => (
                <span key={p} className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${PLATFORM_COLORS[p] || "bg-gray-100"}`}>
                  {p}
                </span>
              ))}
              <span className="text-xs text-gray-400">
                Created {new Date(campaign.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button onClick={saveEdit} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700">
                <Save className="h-4 w-4" /> Save
              </button>
              <button onClick={() => setEditing(false)} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                <X className="h-4 w-4" /> Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={startEdit} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                <Edit3 className="h-4 w-4" /> Edit
              </button>
              <button onClick={handleDuplicate} disabled={duplicateCampaign.isPending} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                <Copy className="h-4 w-4" /> Duplicate
              </button>
              {statusActions.map((sa) => (
                <button
                  key={sa.action}
                  onClick={() => campaignAction.mutate(sa.action)}
                  disabled={campaignAction.isPending}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white ${sa.variant}`}
                >
                  <sa.icon className="h-4 w-4" /> {sa.label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Campaign Details Card */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Campaign Details</h3>
          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Objective</label>
                <select
                  className="w-full rounded border px-3 py-1.5 text-sm"
                  value={editForm.objective as string}
                  onChange={(e) => setEditForm({ ...editForm, objective: e.target.value })}
                >
                  {OBJECTIVES.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Total Budget</label>
                  <input type="number" className="w-full rounded border px-3 py-1.5 text-sm" value={editForm.total_budget as string} onChange={(e) => setEditForm({ ...editForm, total_budget: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Daily Budget</label>
                  <input type="number" className="w-full rounded border px-3 py-1.5 text-sm" value={editForm.daily_budget as string} onChange={(e) => setEditForm({ ...editForm, daily_budget: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Start Date</label>
                  <input type="date" className="w-full rounded border px-3 py-1.5 text-sm" value={editForm.start_date as string} onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">End Date</label>
                  <input type="date" className="w-full rounded border px-3 py-1.5 text-sm" value={editForm.end_date as string} onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })} />
                </div>
              </div>
            </div>
          ) : (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Objective</dt>
                <dd className="font-medium">{campaign.objective}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Total Budget</dt>
                <dd className="font-medium">{campaign.total_budget ? `€${campaign.total_budget}` : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Daily Budget</dt>
                <dd className="font-medium">{campaign.daily_budget ? `€${campaign.daily_budget}` : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Start Date</dt>
                <dd className="font-medium">{campaign.start_date || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">End Date</dt>
                <dd className="font-medium">{campaign.end_date || "—"}</dd>
              </div>
            </dl>
          )}
        </div>

        {/* Platform Actions Card */}
        <div className="rounded-lg border bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Platform Actions</h3>
          <div className="space-y-3">
            <button
              onClick={handlePush}
              disabled={pushCampaign.isPending || !["approved", "live"].includes(campaign.status)}
              className="flex w-full items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              <Upload className="h-4 w-4 text-brand-600" />
              <span>Push to Platforms</span>
              {pushCampaign.isPending && <RefreshCw className="ml-auto h-4 w-4 animate-spin" />}
            </button>
            <button
              onClick={handleSync}
              disabled={syncCampaign.isPending}
              className="flex w-full items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-blue-600 ${syncCampaign.isPending ? "animate-spin" : ""}`} />
              <span>Sync Status</span>
            </button>

            {pushResult && (
              <div className="rounded-lg bg-green-50 p-3 text-xs">
                <p className="font-medium text-green-700">Push Result: {(pushResult as Record<string, unknown>).status as string}</p>
                {Object.entries((pushResult as Record<string, Record<string, unknown>>).platform_results || {}).map(([platform, res]) => {
                  const r = res as Record<string, unknown>;
                  return (
                    <p key={platform} className="mt-1 text-green-600">
                      {platform}: {r.status as string}
                      {r.error ? <span className="text-red-500"> — {String(r.error)}</span> : null}
                    </p>
                  );
                })}
              </div>
            )}

            {syncResult && (
              <div className="rounded-lg bg-blue-50 p-3 text-xs">
                <p className="font-medium text-blue-700">Sync Complete</p>
                {Object.entries((syncResult as Record<string, Record<string, unknown>>).synced_platforms || {}).map(([platform, res]) => (
                  <p key={platform} className="mt-1 text-blue-600">
                    {platform}: {res.status as string}
                    {res.platform_status && ` (${res.platform_status as string})`}
                  </p>
                ))}
              </div>
            )}
          </div>

          {campaign.ai_suggestions && (
            <div className="mt-4 rounded-lg bg-purple-50 p-3">
              <p className="text-xs font-medium text-purple-700">AI Suggestions</p>
              <p className="mt-1 text-xs text-purple-600">
                {JSON.stringify(campaign.ai_suggestions).slice(0, 200)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ad Sets */}
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="font-semibold">Ad Sets ({campaign.ad_sets.length})</h3>
          <button
            onClick={() => setShowAddAdSet(!showAddAdSet)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> Add Ad Set
          </button>
        </div>

        {showAddAdSet && (
          <div className="border-b bg-gray-50 px-5 py-3">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Name</label>
                <input
                  className="w-full rounded border px-3 py-1.5 text-sm"
                  placeholder="Ad set name"
                  value={newAdSet.name}
                  onChange={(e) => setNewAdSet({ ...newAdSet, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Platform</label>
                <select
                  className="rounded border px-3 py-1.5 text-sm"
                  value={newAdSet.platform}
                  onChange={(e) => setNewAdSet({ ...newAdSet, platform: e.target.value })}
                >
                  <option value="meta">Meta</option>
                  <option value="google">Google</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">Daily Budget</label>
                <input
                  type="number"
                  className="w-24 rounded border px-3 py-1.5 text-sm"
                  placeholder="€"
                  value={newAdSet.daily_budget}
                  onChange={(e) => setNewAdSet({ ...newAdSet, daily_budget: e.target.value })}
                />
              </div>
              <button onClick={handleAddAdSet} className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700">
                Add
              </button>
              <button onClick={() => setShowAddAdSet(false)} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        )}

        {campaign.ad_sets.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            No ad sets yet. Create one to get started.
          </div>
        ) : (
          <div className="divide-y">
            {campaign.ad_sets.map((adSet) => {
              const isExpanded = expandedAdSets.has(adSet.id);
              return (
                <div key={adSet.id}>
                  {/* Ad Set Row */}
                  <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
                    <button onClick={() => toggleAdSet(adSet.id)}>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{adSet.name}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PLATFORM_COLORS[adSet.platform] || "bg-gray-100"}`}>
                          {adSet.platform}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[adSet.status] || "bg-gray-100"}`}>
                          {adSet.status}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-400">
                        {adSet.daily_budget && <span>€{adSet.daily_budget}/day</span>}
                        {adSet.platform_id && (
                          <span className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" /> {adSet.platform_id.slice(0, 20)}...
                          </span>
                        )}
                        <span>{adSet.ads?.length || 0} ads</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteAdSet.mutate(adSet.id)}
                      className="rounded p-1 text-gray-300 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Expanded: Ads List */}
                  {isExpanded && (
                    <AdsList campaignId={campaignId} adSet={adSet} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AdsList({
  campaignId,
  adSet,
}: {
  campaignId: number;
  adSet: import("@/types").AdSet & { ads: import("@/types").Ad[] };
}) {
  const createAd = useCreateAd(campaignId, adSet.id);
  const deleteAd = useDeleteAd(campaignId, adSet.id);
  const [showAdd, setShowAdd] = useState(false);
  const [newAd, setNewAd] = useState({ name: "", headline: "", description: "", url: "" });

  const handleAdd = () => {
    if (!newAd.name) return;
    createAd.mutate({
      name: newAd.name,
      headline: newAd.headline || undefined,
      description: newAd.description || undefined,
      url: newAd.url || undefined,
    } as Partial<import("@/types").Ad>);
    setNewAd({ name: "", headline: "", description: "", url: "" });
    setShowAdd(false);
  };

  return (
    <div className="border-t bg-gray-50 px-5 py-3 ml-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase">Ads</span>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          <Plus className="h-3 w-3" /> Add Ad
        </button>
      </div>

      {showAdd && (
        <div className="mb-3 rounded-lg border bg-white p-3">
          <div className="grid gap-2">
            <input className="rounded border px-2 py-1 text-xs" placeholder="Ad name" value={newAd.name} onChange={(e) => setNewAd({ ...newAd, name: e.target.value })} />
            <input className="rounded border px-2 py-1 text-xs" placeholder="Headline" value={newAd.headline} onChange={(e) => setNewAd({ ...newAd, headline: e.target.value })} />
            <input className="rounded border px-2 py-1 text-xs" placeholder="Description" value={newAd.description} onChange={(e) => setNewAd({ ...newAd, description: e.target.value })} />
            <input className="rounded border px-2 py-1 text-xs" placeholder="URL" value={newAd.url} onChange={(e) => setNewAd({ ...newAd, url: e.target.value })} />
            <div className="flex gap-2">
              <button onClick={handleAdd} className="rounded bg-brand-600 px-3 py-1 text-xs text-white hover:bg-brand-700">Add</button>
              <button onClick={() => setShowAdd(false)} className="rounded border px-3 py-1 text-xs hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {adSet.ads.length === 0 ? (
        <p className="text-xs text-gray-400">No ads in this ad set</p>
      ) : (
        <div className="space-y-1.5">
          {adSet.ads.map((ad) => (
            <div key={ad.id} className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{ad.name}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${STATUS_COLORS[ad.status] || "bg-gray-100"}`}>
                    {ad.status}
                  </span>
                  {ad.review_status && (
                    <span className="text-[10px] text-gray-400">{ad.review_status}</span>
                  )}
                </div>
                {(ad.headline || ad.description) && (
                  <div className="mt-0.5 text-xs text-gray-500">
                    {ad.headline && <span className="font-medium">{ad.headline}</span>}
                    {ad.headline && ad.description && <span> — </span>}
                    {ad.description && <span>{ad.description.slice(0, 80)}</span>}
                  </div>
                )}
                {ad.url && (
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400">
                    <ExternalLink className="h-2.5 w-2.5" /> {ad.url}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteAd.mutate(ad.id)}
                className="rounded p-1 text-gray-300 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
