"use client";

import { MetricCard } from "@/components/analytics/metric-card";
import { SpendChart } from "@/components/analytics/spend-chart";
import { CampaignTable } from "@/components/campaigns/campaign-table";
import { useAnalyticsOverview } from "@/hooks/use-analytics";
import { useCampaigns } from "@/hooks/use-campaigns";

export default function DashboardPage() {
  const { data: overview, isLoading: overviewLoading } = useAnalyticsOverview();
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of your marketing performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Spend"
          value={overview?.summary?.spend ?? 0}
          format="currency"
          loading={overviewLoading}
        />
        <MetricCard
          title="Impressions"
          value={overview?.summary?.impressions ?? 0}
          format="number"
          loading={overviewLoading}
        />
        <MetricCard
          title="Clicks"
          value={overview?.summary?.clicks ?? 0}
          format="number"
          loading={overviewLoading}
        />
        <MetricCard
          title="ROAS"
          value={overview?.summary?.roas ?? 0}
          format="multiplier"
          loading={overviewLoading}
        />
      </div>

      {/* Spend Trend Chart */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Spend Trend</h2>
        <SpendChart data={overview?.daily_trend ?? []} loading={overviewLoading} />
      </div>

      {/* Recent Campaigns */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Recent Campaigns</h2>
        <CampaignTable campaigns={campaigns ?? []} loading={campaignsLoading} />
      </div>
    </div>
  );
}
