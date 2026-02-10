"use client";

import { useState } from "react";
import Link from "next/link";
import { useTemplates, useCreateTemplate } from "@/hooks/use-content";
import type { ContentTemplate } from "@/types";
import { ArrowLeft, Search, Plus, FileText, Sparkles, X } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  ad_copy: "Ad Copy",
  social_post: "Social Post",
  email: "Email",
  blog_article: "Blog Article",
  landing_page: "Landing Page",
  video_script: "Video Script",
  product_description: "Product Description",
};

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const { data: templates, isLoading } = useTemplates({
    type: typeFilter || undefined,
    q: search || undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/content" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Content Templates</h1>
            <p className="text-gray-500">Pre-built prompts for consistent, high-quality content</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Create Template
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-lg border py-2 pl-10 pr-3 text-sm"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          {Object.entries(TYPE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      {/* Templates Grid */}
      {isLoading && (
        <div className="flex h-40 items-center justify-center text-gray-400">Loading...</div>
      )}

      {!isLoading && templates?.length === 0 && (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-gray-400">
          <p>No templates yet</p>
          <button
            onClick={() => setShowCreate(true)}
            className="mt-2 text-sm text-brand-600 hover:underline"
          >
            Create your first template
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates?.map((tmpl) => (
          <TemplateCard key={tmpl.id} template={tmpl} />
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreate && <CreateTemplateModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function TemplateCard({ template }: { template: ContentTemplate }) {
  return (
    <div className="rounded-lg border bg-white p-5 hover:border-brand-300">
      <div className="mb-3 flex items-start justify-between">
        <div className="rounded bg-brand-50 p-2">
          <FileText className="h-4 w-4 text-brand-600" />
        </div>
        <div className="flex items-center gap-2">
          {template.industry && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {template.industry}
            </span>
          )}
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            {TYPE_LABELS[template.type] || template.type}
          </span>
        </div>
      </div>
      <h3 className="font-medium">{template.name}</h3>
      {template.objective && (
        <p className="mt-1 text-sm text-gray-500">{template.objective}</p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Used {template.usage_count} times
        </span>
        <Link
          href={`/content?template=${template.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          <Sparkles className="h-3 w-3" /> Use Template
        </Link>
      </div>
      {template.example_output && (
        <div className="mt-3 rounded bg-gray-50 p-2">
          <p className="line-clamp-3 text-xs text-gray-500">{template.example_output}</p>
        </div>
      )}
    </div>
  );
}

function CreateTemplateModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("ad_copy");
  const [industry, setIndustry] = useState("");
  const [objective, setObjective] = useState("");
  const [promptStructure, setPromptStructure] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const createTemplate = useCreateTemplate();

  const handleCreate = async () => {
    if (!name.trim() || !promptStructure.trim()) return;
    await createTemplate.mutateAsync({
      name,
      type,
      industry: industry || undefined,
      objective: objective || undefined,
      prompt_structure: promptStructure,
      example_output: exampleOutput || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Create Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="e.g., E-commerce Sale Ad"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              >
                {Object.entries(TYPE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="e.g., E-commerce"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Objective</label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="e.g., Drive conversions with urgency"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prompt Structure</label>
            <textarea
              value={promptStructure}
              onChange={(e) => setPromptStructure(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="The base prompt that will be prepended to generation requests..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Example Output</label>
            <textarea
              value={exampleOutput}
              onChange={(e) => setExampleOutput(e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Example of what this template should produce..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || !promptStructure.trim() || createTemplate.isPending}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {createTemplate.isPending ? "Creating..." : "Create Template"}
          </button>
        </div>
      </div>
    </div>
  );
}
