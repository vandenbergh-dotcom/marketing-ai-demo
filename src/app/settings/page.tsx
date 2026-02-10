"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [org, setOrg] = useState({ name: "", billing_email: "", plan_tier: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<{ name: string; billing_email: string; plan_tier: string }>("/settings/organization").then(setOrg).catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/settings/organization", {
        name: org.name,
        billing_email: org.billing_email,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your workspace</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold">Organization</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={org.name}
            onChange={(e) => setOrg({ ...org, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Billing Email</label>
          <input
            type="email"
            value={org.billing_email || ""}
            onChange={(e) => setOrg({ ...org, billing_email: e.target.value })}
            className="mt-1 block w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Plan</label>
          <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm capitalize">
            {org.plan_tier || "starter"}
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
