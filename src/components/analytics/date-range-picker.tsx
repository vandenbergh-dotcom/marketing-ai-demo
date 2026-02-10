"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  compareEnabled?: boolean;
  compareStart?: string;
  compareEnd?: string;
  onCompareChange?: (start: string, end: string) => void;
  onCompareToggle?: (enabled: boolean) => void;
}

const PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This month", days: -1 },
  { label: "Last month", days: -2 },
];

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function getPresetRange(preset: (typeof PRESETS)[0]): { start: string; end: string } {
  const today = new Date();
  if (preset.days === -1) {
    // This month
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: formatDate(start), end: formatDate(today) };
  }
  if (preset.days === -2) {
    // Last month
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: formatDate(start), end: formatDate(end) };
  }
  const start = new Date(today);
  start.setDate(today.getDate() - preset.days);
  return { start: formatDate(start), end: formatDate(today) };
}

function getPreviousPeriod(start: string, end: string): { start: string; end: string } {
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  const prevEnd = new Date(s.getTime() - 1); // day before start
  const prevStart = new Date(prevEnd.getTime() - diff);
  return { start: formatDate(prevStart), end: formatDate(prevEnd) };
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  compareEnabled = false,
  compareStart,
  compareEnd,
  onCompareChange,
  onCompareToggle,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayLabel = () => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    if (s.getFullYear() !== e.getFullYear()) {
      return `${s.toLocaleDateString("en-US", { ...opts, year: "numeric" })} - ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
    }
    return `${s.toLocaleDateString("en-US", opts)} - ${e.toLocaleDateString("en-US", opts)}, ${e.getFullYear()}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <Calendar className="h-4 w-4 text-gray-500" />
        <span>{displayLabel()}</span>
        {compareEnabled && (
          <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">
            vs
          </span>
        )}
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border bg-white p-4 shadow-lg">
          {/* Presets */}
          <div className="mb-3 grid grid-cols-2 gap-1.5">
            {PRESETS.map((preset) => {
              const range = getPresetRange(preset);
              const isActive = range.start === startDate && range.end === endDate;
              return (
                <button
                  key={preset.label}
                  onClick={() => {
                    onChange(range.start, range.end);
                    if (onCompareChange && compareEnabled) {
                      const prev = getPreviousPeriod(range.start, range.end);
                      onCompareChange(prev.start, prev.end);
                    }
                  }}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-brand-100 text-brand-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Custom date inputs */}
          <div className="space-y-2 border-t pt-3">
            <p className="text-xs font-medium text-gray-500">Custom Range</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-gray-400">From</label>
                <input
                  type="date"
                  className="w-full rounded border px-2 py-1.5 text-xs"
                  value={startDate}
                  onChange={(e) => onChange(e.target.value, endDate)}
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400">To</label>
                <input
                  type="date"
                  className="w-full rounded border px-2 py-1.5 text-xs"
                  value={endDate}
                  onChange={(e) => onChange(startDate, e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Compare toggle */}
          {onCompareToggle && (
            <div className="mt-3 border-t pt-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-gray-300 text-brand-600"
                  checked={compareEnabled}
                  onChange={(e) => {
                    onCompareToggle(e.target.checked);
                    if (e.target.checked && onCompareChange) {
                      const prev = getPreviousPeriod(startDate, endDate);
                      onCompareChange(prev.start, prev.end);
                    }
                  }}
                />
                <span className="text-xs font-medium text-gray-600">Compare to previous period</span>
              </label>
              {compareEnabled && compareStart && compareEnd && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400">Compare From</label>
                    <input
                      type="date"
                      className="w-full rounded border px-2 py-1.5 text-xs"
                      value={compareStart}
                      onChange={(e) => onCompareChange?.(e.target.value, compareEnd)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400">Compare To</label>
                    <input
                      type="date"
                      className="w-full rounded border px-2 py-1.5 text-xs"
                      value={compareEnd}
                      onChange={(e) => onCompareChange?.(compareStart, e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-md bg-brand-600 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
