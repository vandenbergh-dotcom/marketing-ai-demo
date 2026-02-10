import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  AnalyticsOverview,
  ComparisonData,
  TopCampaignsData,
  CampaignAnalytics,
  AIInsightsData,
} from "@/types";

export function useAnalyticsOverview(startDate?: string, endDate?: string) {
  return useQuery<AnalyticsOverview>({
    queryKey: ["analytics", "overview", startDate, endDate],
    queryFn: () => {
      const params = new URLSearchParams();
      if (startDate) params.set("start_date", startDate);
      if (endDate) params.set("end_date", endDate);
      const qs = params.toString();
      return api.get(`/analytics/overview${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useAnalyticsComparison(
  startDate: string,
  endDate: string,
  compareStart: string,
  compareEnd: string,
  enabled = true,
) {
  return useQuery<ComparisonData>({
    queryKey: ["analytics", "compare", startDate, endDate, compareStart, compareEnd],
    queryFn: () => {
      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
        compare_start: compareStart,
        compare_end: compareEnd,
      });
      return api.get(`/analytics/compare?${params}`);
    },
    enabled: enabled && !!startDate && !!endDate && !!compareStart && !!compareEnd,
  });
}

export function useTopCampaigns(
  startDate?: string,
  endDate?: string,
  sortBy = "spend",
  limit = 10,
) {
  return useQuery<TopCampaignsData>({
    queryKey: ["analytics", "top-campaigns", startDate, endDate, sortBy, limit],
    queryFn: () => {
      const params = new URLSearchParams();
      if (startDate) params.set("start_date", startDate);
      if (endDate) params.set("end_date", endDate);
      params.set("sort_by", sortBy);
      params.set("limit", String(limit));
      return api.get(`/analytics/top-campaigns?${params}`);
    },
  });
}

export function useCampaignAnalytics(
  campaignId: number,
  startDate?: string,
  endDate?: string,
) {
  return useQuery<CampaignAnalytics>({
    queryKey: ["analytics", "campaign", campaignId, startDate, endDate],
    queryFn: () => {
      const params = new URLSearchParams();
      if (startDate) params.set("start_date", startDate);
      if (endDate) params.set("end_date", endDate);
      const qs = params.toString();
      return api.get(`/analytics/campaigns/${campaignId}${qs ? `?${qs}` : ""}`);
    },
    enabled: !!campaignId,
  });
}

export function useAIInsights(startDate?: string, endDate?: string) {
  return useQuery<AIInsightsData>({
    queryKey: ["analytics", "insights", startDate, endDate],
    queryFn: () => {
      const params = new URLSearchParams();
      if (startDate) params.set("start_date", startDate);
      if (endDate) params.set("end_date", endDate);
      const qs = params.toString();
      return api.get(`/analytics/insights${qs ? `?${qs}` : ""}`);
    },
  });
}

export function useExportAnalytics() {
  return useMutation({
    mutationFn: async (data: {
      start_date: string;
      end_date: string;
      format?: string;
      campaign_id?: number;
      platform?: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "/api/v1"}/analytics/export`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics_${data.start_date}_${data.end_date}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
}
