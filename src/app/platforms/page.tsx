"use client";

import { usePlatformConnections } from "@/hooks/use-platforms";
import { PlatformCard } from "@/components/platforms/platform-card";

const PLATFORMS = [
  {
    id: "meta",
    name: "Meta",
    description: "Facebook & Instagram Ads",
    icon: "M",
    color: "bg-blue-500",
  },
  {
    id: "google",
    name: "Google Ads",
    description: "Search, Display & YouTube",
    icon: "G",
    color: "bg-red-500",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "B2B advertising",
    icon: "in",
    color: "bg-blue-700",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Short-form video ads",
    icon: "T",
    color: "bg-gray-900",
  },
];

export default function PlatformsPage() {
  const { data: connections, isLoading } = usePlatformConnections();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Platform Connections</h1>
        <p className="text-gray-500">Connect your ad accounts to manage campaigns</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLATFORMS.map((platform) => {
          const connection = connections?.find(
            (c: { platform: string }) => c.platform === platform.id
          );
          return (
            <PlatformCard
              key={platform.id}
              platform={platform}
              connection={connection}
              loading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
