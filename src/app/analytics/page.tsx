"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/analytics/metric-card";
import { SpendChart } from "@/components/analytics/spend-chart";
import { PlatformBreakdown } from "@/components/analytics/platform-breakdown";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import {
  useAnalyticsOverview,
  useAnalyticsComparison,
  useTopCampaigns,
  useAIInsights,
  useExportAnalytics,
} from "@/hooks/use-analytics";
import {
  Download,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  ExternalLink,
} from "lucide-react";

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

const SEVERITY_STYLES: Record<string, { bg: string; icon: string; border: string }> = {
  critical: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-200" },
  warning: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-200" },
  info: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
};

const INSIGHT_ICONS: Record<string, typeof Lightbulb> = {
  anomaly: AlertTriangle,
  recommendation: Lightbulb,
  trend: TrendingUp,
};

export default function AnalyticsPage() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [startDate, setStartDate] = useState(formatDate(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [compareStart, setCompareStart] = useState("");
  const [compareEnd, setCompareEnd] = useState("");
  const [sortBy, setSortBy] = useState("spend");

  const { data: overview, isLoading } = useAnalyticsOverview(startDate, endDate);
  const { data: comparison } = useAnalyticsComparison(
    startDate, endDate, compareStart, compareEnd, compareEnabled,
  );
  const { data: topCampaigns, isLoading: topLoading } = useTopCampaigns(
    startDate, endDate, sortBy,
  );
  const { data: insights, isLoading: insightsLoading } = useAIInsights(startDate, endDate);
  const exportAnalytics = useExportAnalytics();

  const summary = overview?.summary;
  const changes = comparison?.changes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500">Cross-platform performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
            compareEnabled={compareEnabled}
            compareStart={compareStart}
            compareEnd={compareEnd}
            onCompareChange={(s, e) => { setCompareStart(s); setCompareEnd(e); }}
            onCompareToggle={setCompareEnabled}
          />
          <button
            onClick={() => exportAnalytics.mutate({ start_date: startDate, end_date: endDate })}
            disabled={exportAnalytics.isPending}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            {exportAnalytics.isPending ? "Exporting..." : "Export CSV"}
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <MetricCard
          title="Impressions"
          value={summary?.impressions ?? 0}
          format="number"
          loading={isLoading}
          change={changes?.impressions}
        />
        <MetricCard
          title="Clicks"
          value={summary?.clicks ?? 0}
          format="number"
          loading={isLoading}
          change={changes?.clicks}
        />
        <MetricCard
          title="CTR"
          value={summary?.ctr ?? 0}
          format="percent"
          loading={isLoading}
          change={changes?.ctr}
        />
        <MetricCard
          title="Spend"
          value={summary?.spend ?? 0}
          format="currency"
          loading={isLoading}
          change={changes?.spend}
        />
        <MetricCard
          title="ROAS"
          value={summary?.roas ?? 0}
          format="multiplier"
          loading={isLoading}
          change={changes?.roas}
        />
      </div>

      {/* Comparison Banner */}
      {compareEnabled && comparison && (
        <div className="rounded-lg border bg-purple-50 p-4">
          <h3 className="text-sm font-semibold text-purple-800">Period Comparison</h3>
          <div className="mt-2 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {(["impressions", "clicks", "spend", "roas"] as const).map((key) => {
              const change = comparison.changes[key] ?? 0;
              const isPositive = key === "spend" ? change < 0 : change > 0;
              return (
                <div key={key} className="text-sm">
                  <span className="text-purple-600 capitalize">{key}</span>
                  <div className={`flex items-center gap-1 font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {change >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {Math.abs(change).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Daily Performance</h2>
          <SpendChart data={overview?.daily_trend ?? []} loading={isLoading} />
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Platform Breakdown</h2>
          <PlatformBreakdown data={overview?.by_platform ?? {}} loading={isLoading} />
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-semibold">AI Insights</h2>
          </div>
          {insights && (
            <span className="text-xs text-gray-400">
              Generated {new Date(insights.generated_at).toLocaleTimeString()}
            </span>
          )}
        </div>

        {insightsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        ) : insights && insights.insights.length > 0 ? (
          <div className="space-y-3">
            {insights.insights.map((insight, i) => {
              const style = SEVERITY_STYLES[insight.severity] || SEVERITY_STYLES.info;
              const Icon = INSIGHT_ICONS[insight.type] || Lightbulb;
              return (
                <div key={i} className={`rounded-lg border p-4 ${style.bg} ${style.border}`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`mt-0.5 h-5 w-5 ${style.icon}`} />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{insight.title}</h4>
                      <p className="mt-0.5 text-sm text-gray-600">{insight.description}</p>
                      {insight.suggestion && (
                        <p className="mt-1.5 text-xs text-gray-500 italic">{insight.suggestion}</p>
                      )}
                    </div>
                    {insight.value !== null && (
                      <span className={`text-lg font-bold ${style.icon}`}>
                        {typeof insight.value === "number"
                          ? insight.metric === "roas"
                            ? `${insight.value.toFixed(1)}x`
                            : `${insight.value >= 0 ? "+" : ""}${insight.value.toFixed(0)}%`
                          : insight.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No insights available for this period.</p>
        )}
      </div>

      {/* Top Campaigns Table */}
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Top Campaigns</h2>
          </div>
          <select
            className="rounded border px-2 py-1 text-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="spend">By Spend</option>
            <option value="revenue">By Revenue</option>
            <option value="impressions">By Impressions</option>
            <option value="clicks">By Clicks</option>
            <option value="conversions">By Conversions</option>
          </select>
        </div>

        {topLoading ? (
          <div className="p-6">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-gray-100" />
              ))}
            </div>
          </div>
        ) : topCampaigns && topCampaigns.campaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs text-gray-500">
                  <th className="px-4 py-2">Campaign</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 text-right">Impressions</th>
                  <th className="px-4 py-2 text-right">Clicks</th>
                  <th className="px-4 py-2 text-right">CTR</th>
                  <th className="px-4 py-2 text-right">Spend</th>
                  <th className="px-4 py-2 text-right">Revenue</th>
                  <th className="px-4 py-2 text-right">ROAS</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topCampaigns.campaigns.map((c) => (
                  <tr key={c.campaign_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium">{c.campaign_name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        c.status === "live" ? "bg-green-100 text-green-700"
                        : c.status === "paused" ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">{c.impressions.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">{c.clicks.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">{c.ctr.toFixed(2)}%</td>
                    <td className="px-4 py-2.5 text-right font-medium">&euro;{Number(c.spend).toFixed(0)}</td>
                    <td className="px-4 py-2.5 text-right">&euro;{Number(c.revenue).toFixed(0)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={c.roas >= 1 ? "text-green-600 font-medium" : "text-red-600"}>
                        {c.roas.toFixed(1)}x
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/analytics/campaigns/${c.campaign_id}`}
                        className="text-brand-600 hover:text-brand-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            No campaign data for this period
          </div>
        )}
      </div>
    </div>
  );
}
