"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MetricCard } from "@/components/analytics/metric-card";
import { SpendChart } from "@/components/analytics/spend-chart";
import { PlatformBreakdown } from "@/components/analytics/platform-breakdown";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { useCampaignAnalytics, useExportAnalytics } from "@/hooks/use-analytics";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

const PLATFORM_COLORS: Record<string, string> = {
  meta: "bg-blue-100 text-blue-700",
  google: "bg-red-100 text-red-700",
  linkedin: "bg-sky-100 text-sky-700",
  tiktok: "bg-pink-100 text-pink-700",
};

export default function CampaignAnalyticsPage() {
  const params = useParams();
  const campaignId = Number(params.id);

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [startDate, setStartDate] = useState(formatDate(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));

  const { data, isLoading } = useCampaignAnalytics(campaignId, startDate, endDate);
  const exportAnalytics = useExportAnalytics();

  const summary = data?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/analytics" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {data?.campaign_name || `Campaign ${campaignId}`}
            </h1>
            <p className="text-gray-500">Campaign performance details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
          />
          <button
            onClick={() =>
              exportAnalytics.mutate({
                start_date: startDate,
                end_date: endDate,
                campaign_id: campaignId,
              })
            }
            disabled={exportAnalytics.isPending}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <Link
            href={`/campaigns/${campaignId}`}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <ExternalLink className="h-4 w-4" /> View Campaign
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <MetricCard title="Impressions" value={summary?.impressions ?? 0} format="number" loading={isLoading} />
        <MetricCard title="Clicks" value={summary?.clicks ?? 0} format="number" loading={isLoading} />
        <MetricCard title="CTR" value={summary?.ctr ?? 0} format="percent" loading={isLoading} />
        <MetricCard title="Spend" value={summary?.spend ?? 0} format="currency" loading={isLoading} />
        <MetricCard title="ROAS" value={summary?.roas ?? 0} format="multiplier" loading={isLoading} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Daily Performance</h2>
          <SpendChart data={data?.daily_trend ?? []} loading={isLoading} />
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Platform Breakdown</h2>
          <PlatformBreakdown data={data?.by_platform ?? {}} loading={isLoading} />
        </div>
      </div>

      {/* Ad Set Breakdown Table */}
      <div className="rounded-lg border bg-white">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Ad Set Performance</h2>
        </div>

        {isLoading ? (
          <div className="p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-3 h-10 animate-pulse rounded bg-gray-100" />
            ))}
          </div>
        ) : data && data.ad_set_breakdown.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs text-gray-500">
                  <th className="px-4 py-2">Ad Set</th>
                  <th className="px-4 py-2">Platform</th>
                  <th className="px-4 py-2 text-right">Impressions</th>
                  <th className="px-4 py-2 text-right">Clicks</th>
                  <th className="px-4 py-2 text-right">CTR</th>
                  <th className="px-4 py-2 text-right">Spend</th>
                  <th className="px-4 py-2 text-right">Revenue</th>
                  <th className="px-4 py-2 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.ad_set_breakdown.map((as) => (
                  <tr key={as.ad_set_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium">{as.ad_set_name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PLATFORM_COLORS[as.platform] || "bg-gray-100"}`}>
                        {as.platform}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">{as.impressions.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">{as.clicks.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">{as.ctr.toFixed(2)}%</td>
                    <td className="px-4 py-2.5 text-right font-medium">&euro;{as.spend.toFixed(0)}</td>
                    <td className="px-4 py-2.5 text-right">&euro;{as.revenue.toFixed(0)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={as.roas >= 1 ? "text-green-600 font-medium" : "text-red-600"}>
                        {as.roas.toFixed(1)}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            No ad set data for this period
          </div>
        )}
      </div>
    </div>
  );
}
