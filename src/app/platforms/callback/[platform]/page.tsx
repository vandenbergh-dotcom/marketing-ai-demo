"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  const platform = params.platform as string;

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setStatus("error");
      setError(searchParams.get("error_description") || errorParam);
      return;
    }

    if (!code || !state) {
      setStatus("error");
      setError("Missing authorization code or state parameter");
      return;
    }

    // Exchange the code for tokens
    api
      .post(`/integrations/${platform}/callback`, { code, state })
      .then(() => {
        setStatus("success");
        setTimeout(() => router.push("/platforms"), 2000);
      })
      .catch((err) => {
        setStatus("error");
        setError(err.message || "Failed to connect platform");
      });
  }, [platform, searchParams, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-600" />
            <h2 className="mt-4 text-lg font-semibold">
              Connecting {platform.charAt(0).toUpperCase() + platform.slice(1)}...
            </h2>
            <p className="mt-1 text-gray-500">Exchanging authorization tokens</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-lg font-semibold text-green-700">Connected!</h2>
            <p className="mt-1 text-gray-500">Redirecting to platforms page...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-lg font-semibold text-red-700">Connection Failed</h2>
            <p className="mt-1 text-gray-500">{error}</p>
            <button
              onClick={() => router.push("/platforms")}
              className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700"
            >
              Back to Platforms
            </button>
          </>
        )}
      </div>
    </div>
  );
}
