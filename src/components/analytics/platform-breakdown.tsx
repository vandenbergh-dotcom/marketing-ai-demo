"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PlatformBreakdownProps {
  data: Record<string, { spend: number; clicks: number; impressions: number; roas: number }>;
  loading?: boolean;
}

const PLATFORM_COLORS: Record<string, string> = {
  meta: "#1877F2",
  google: "#EA4335",
  linkedin: "#0A66C2",
  tiktok: "#000000",
  pinterest: "#E60023",
  twitter: "#1DA1F2",
};

export function PlatformBreakdown({ data, loading }: PlatformBreakdownProps) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  const chartData = Object.entries(data).map(([platform, metrics]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    spend: Number(metrics.spend),
    roas: metrics.roas,
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Connect platforms to see breakdown
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="platform" fontSize={12} />
          <YAxis tickFormatter={(v) => `€${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} fontSize={12} />
          <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
          <Bar dataKey="spend" fill="#4c6ef5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Platform metrics table */}
      <div className="space-y-2">
        {Object.entries(data).map(([platform, metrics]) => (
          <div key={platform} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: PLATFORM_COLORS[platform] || "#6B7280" }}
              />
              <span className="capitalize">{platform}</span>
            </div>
            <div className="flex gap-4 text-gray-500">
              <span>€{Number(metrics.spend).toFixed(0)}</span>
              <span>{metrics.roas.toFixed(1)}x ROAS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
