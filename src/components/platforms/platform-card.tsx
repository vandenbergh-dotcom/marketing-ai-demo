"use client";

import { api } from "@/lib/api";
import { useState } from "react";
import { Check, AlertCircle, Loader2, RefreshCw, Activity } from "lucide-react";

interface PlatformCardProps {
  platform: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  connection?: {
    id: number;
    status: string;
    account_name?: string | null;
    last_sync_at?: string | null;
    error_message?: string | null;
    token_expires_at?: string | null;
  };
  loading?: boolean;
}

export function PlatformCard({ platform, connection, loading }: PlatformCardProps) {
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [healthData, setHealthData] = useState<Record<string, unknown> | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const isConnected = connection?.status === "active";
  const isExpired = connection?.status === "expired";
  const hasError = connection?.status === "error";

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const res = await api.get<{ auth_url: string }>(`/integrations/${platform.id}/auth-url`);
      window.location.href = res.auth_url;
    } catch (err) {
      console.error("Failed to get auth URL:", err);
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connection) return;
    try {
      await api.delete(`/integrations/${connection.id}`);
      window.location.reload();
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  const handleSync = async () => {
    if (!connection) return;
    setSyncing(true);
    try {
      await api.post(`/integrations/${connection.id}/sync`);
      // Show syncing state for 3 seconds then refresh
      setTimeout(() => {
        setSyncing(false);
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error("Sync failed:", err);
      setSyncing(false);
    }
  };

  const handleCheckHealth = async () => {
    if (!connection) return;
    setCheckingHealth(true);
    try {
      const data = await api.get<Record<string, unknown>>(`/integrations/${connection.id}/health`);
      setHealthData(data);
    } catch (err) {
      console.error("Health check failed:", err);
    } finally {
      setCheckingHealth(false);
    }
  };

  const handleRefreshToken = async () => {
    if (!connection) return;
    try {
      await api.post(`/integrations/${connection.id}/refresh-token`);
      window.location.reload();
    } catch (err) {
      console.error("Token refresh failed:", err);
    }
  };

  if (loading) {
    return <div className="h-48 animate-pulse rounded-lg border bg-gray-100" />;
  }

  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white ${platform.color}`}
          >
            {platform.icon}
          </div>
          <div>
            <h3 className="font-semibold">{platform.name}</h3>
            <p className="text-sm text-gray-500">{platform.description}</p>
          </div>
        </div>
        {isConnected && <Check className="h-5 w-5 text-green-500" />}
        {isExpired && <AlertCircle className="h-5 w-5 text-yellow-500" />}
        {hasError && <AlertCircle className="h-5 w-5 text-red-500" />}
      </div>

      <div className="mt-4">
        {isConnected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Connected
              {connection?.account_name && ` — ${connection.account_name}`}
            </div>

            {connection?.last_sync_at && (
              <p className="text-xs text-gray-400">
                Last synced: {new Date(connection.last_sync_at).toLocaleString()}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Sync Now"}
              </button>
              <button
                onClick={handleCheckHealth}
                disabled={checkingHealth}
                className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                <Activity className="h-3.5 w-3.5" />
                {checkingHealth ? "Checking..." : "Health Check"}
              </button>
              <button
                onClick={handleDisconnect}
                className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
              >
                Disconnect
              </button>
            </div>

            {/* Health data display */}
            {healthData && (
              <div className="mt-2 rounded-md bg-gray-50 p-3 text-xs">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-gray-500">API Reachable:</span>
                  <span className={healthData.api_reachable ? "text-green-600" : "text-red-600"}>
                    {healthData.api_reachable ? "Yes" : "No"}
                  </span>
                  <span className="text-gray-500">Token Status:</span>
                  <span>{(healthData.token_status as string) || "unknown"}</span>
                  {healthData.token_expires_at ? (
                    <>
                      <span className="text-gray-500">Token Expires:</span>
                      <span>{new Date(healthData.token_expires_at as string).toLocaleDateString()}</span>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        ) : isExpired ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <AlertCircle className="h-4 w-4" />
              Token expired
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefreshToken}
                className="rounded-lg bg-yellow-500 px-3 py-1.5 text-sm text-white hover:bg-yellow-600"
              >
                Refresh Token
              </button>
              <button
                onClick={handleConnect}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                Reconnect
              </button>
            </div>
          </div>
        ) : hasError ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              Connection error
            </div>
            {connection?.error_message && (
              <p className="text-xs text-gray-500">{connection.error_message}</p>
            )}
            <button
              onClick={handleConnect}
              className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700"
            >
              Reconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {connecting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {connecting ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
}
