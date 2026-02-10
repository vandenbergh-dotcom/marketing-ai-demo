"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendChartProps {
  data: { date: string; spend: number; clicks: number; impressions: number }[];
  loading?: boolean;
}

export function SpendChart({ data, loading }: SpendChartProps) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        No data available for the selected period
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4c6ef5" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#4c6ef5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          fontSize={12}
        />
        <YAxis
          tickFormatter={(v) => `€${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
          fontSize={12}
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat("en-EU", {
              style: "currency",
              currency: "EUR",
            }).format(value)
          }
        />
        <Area
          type="monotone"
          dataKey="spend"
          stroke="#4c6ef5"
          strokeWidth={2}
          fill="url(#spendGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
