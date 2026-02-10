import Link from "next/link";
import type { Campaign } from "@/types";

interface CampaignTableProps {
  campaigns: Campaign[];
  loading?: boolean;
  showPlatform?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  review: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  live: "bg-green-100 text-green-700",
  paused: "bg-orange-100 text-orange-700",
  complete: "bg-purple-100 text-purple-700",
  archived: "bg-gray-100 text-gray-500",
};

const PLATFORM_STYLES: Record<string, { bg: string; label: string }> = {
  meta: { bg: "bg-blue-100 text-blue-700", label: "Meta" },
  google: { bg: "bg-red-100 text-red-700", label: "Google" },
  linkedin: { bg: "bg-blue-100 text-blue-800", label: "LinkedIn" },
  tiktok: { bg: "bg-gray-100 text-gray-800", label: "TikTok" },
  multi: { bg: "bg-purple-100 text-purple-700", label: "Multi" },
};

export function CampaignTable({ campaigns, loading, showPlatform = true }: CampaignTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        No campaigns yet. Create your first one!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-3 font-medium">Campaign</th>
            <th className="pb-3 font-medium">Status</th>
            {showPlatform && <th className="pb-3 font-medium">Platform</th>}
            <th className="pb-3 font-medium">Objective</th>
            <th className="pb-3 font-medium text-right">Budget</th>
            <th className="pb-3 font-medium text-right">Dates</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-gray-50">
              <td className="py-3">
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="font-medium text-gray-900 hover:text-brand-600"
                >
                  {campaign.name}
                </Link>
              </td>
              <td className="py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    STATUS_STYLES[campaign.status] || "bg-gray-100"
                  }`}
                >
                  {campaign.status}
                </span>
              </td>
              {showPlatform && (
                <td className="py-3">
                  {campaign.platforms && campaign.platforms.length > 0 ? (
                    <div className="flex gap-1">
                      {campaign.platforms.map((p: string) => {
                        const style = PLATFORM_STYLES[p] || PLATFORM_STYLES.multi;
                        return (
                          <span
                            key={p}
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${style.bg}`}
                          >
                            {style.label}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              )}
              <td className="py-3 capitalize text-gray-600">{campaign.objective}</td>
              <td className="py-3 text-right text-gray-600">
                {campaign.daily_budget
                  ? `€${Number(campaign.daily_budget).toFixed(0)}/day`
                  : campaign.total_budget
                  ? `€${Number(campaign.total_budget).toFixed(0)}`
                  : "-"}
              </td>
              <td className="py-3 text-right text-gray-500">
                {campaign.start_date
                  ? new Date(campaign.start_date).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
