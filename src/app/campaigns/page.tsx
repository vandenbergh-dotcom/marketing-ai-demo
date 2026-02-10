"use client";

import { useState } from "react";
import Link from "next/link";
import { CampaignTable } from "@/components/campaigns/campaign-table";
import { useCampaigns } from "@/hooks/use-campaigns";
import { Plus } from "lucide-react";

export default function CampaignsPage() {
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const { data: campaigns, isLoading } = useCampaigns(statusFilter);

  const statuses = [
    { value: undefined, label: "All" },
    { value: "draft", label: "Draft" },
    { value: "review", label: "Review" },
    { value: "live", label: "Live" },
    { value: "paused", label: "Paused" },
    { value: "complete", label: "Complete" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-gray-500">Manage your advertising campaigns</p>
        </div>
        <Link
          href="/campaigns/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {statuses.map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(s.value)}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              statusFilter === s.value
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Campaign List */}
      <div className="rounded-lg border bg-white p-6">
        <CampaignTable campaigns={campaigns ?? []} loading={isLoading} />
      </div>
    </div>
  );
}
