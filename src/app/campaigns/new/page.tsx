"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Objective =
  | "awareness"
  | "traffic"
  | "engagement"
  | "leads"
  | "conversions"
  | "sales";

const objectives: { value: Objective; label: string; description: string }[] = [
  { value: "awareness", label: "Brand Awareness", description: "Reach people likely to remember your ads" },
  { value: "traffic", label: "Traffic", description: "Drive visits to your website or app" },
  { value: "engagement", label: "Engagement", description: "Get more likes, comments, shares" },
  { value: "leads", label: "Lead Generation", description: "Collect leads through forms" },
  { value: "conversions", label: "Conversions", description: "Drive valuable actions on your website" },
  { value: "sales", label: "Sales", description: "Drive product or catalog sales" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    objective: "" as Objective | "",
    total_budget: "",
    daily_budget: "",
    start_date: "",
    end_date: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const data = {
        name: form.name,
        objective: form.objective,
        total_budget: form.total_budget ? parseFloat(form.total_budget) : null,
        daily_budget: form.daily_budget ? parseFloat(form.daily_budget) : null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      };
      await api.post("/campaigns", data);
      router.push("/campaigns");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Create Campaign</h1>

      {/* Step indicator */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded ${
              s <= step ? "bg-brand-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">Choose Objective</h2>
          <div className="grid gap-3">
            {objectives.map((obj) => (
              <button
                key={obj.value}
                onClick={() => {
                  setForm({ ...form, objective: obj.value });
                  setStep(2);
                }}
                className={`rounded-lg border p-4 text-left hover:border-brand-500 ${
                  form.objective === obj.value
                    ? "border-brand-600 bg-brand-50"
                    : ""
                }`}
              >
                <div className="font-medium">{obj.label}</div>
                <div className="text-sm text-gray-500">{obj.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">Campaign Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="e.g., Spring Sale 2026"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="mt-1 block w-full rounded-lg border px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="mt-1 block w-full rounded-lg border px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!form.name}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">Budget</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Budget (EUR)</label>
              <input
                type="number"
                value={form.total_budget}
                onChange={(e) => setForm({ ...form, total_budget: e.target.value })}
                className="mt-1 block w-full rounded-lg border px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Daily Budget (EUR)</label>
              <input
                type="number"
                value={form.daily_budget}
                onChange={(e) => setForm({ ...form, daily_budget: e.target.value })}
                className="mt-1 block w-full rounded-lg border px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="100"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Campaign"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
