"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useContentCalendar } from "@/hooks/use-content";
import type { CalendarItem } from "@/types";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  ad_copy: "bg-blue-100 border-blue-300 text-blue-800",
  social_post: "bg-purple-100 border-purple-300 text-purple-800",
  email: "bg-amber-100 border-amber-300 text-amber-800",
  blog_article: "bg-green-100 border-green-300 text-green-800",
  video_script: "bg-pink-100 border-pink-300 text-pink-800",
  product_description: "bg-cyan-100 border-cyan-300 text-cyan-800",
};

const PLATFORM_ICONS: Record<string, string> = {
  meta: "M",
  google: "G",
  linkedin: "Li",
  tiktok: "Tk",
};

const STATUS_DOT: Record<string, string> = {
  draft: "bg-gray-400",
  review: "bg-amber-400",
  approved: "bg-green-400",
  published: "bg-brand-500",
};

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function ContentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate date range for API query
  const { startDate, endDate } = useMemo(() => {
    if (view === "month") {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };
    } else {
      const dayOfWeek = currentDate.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() + mondayOffset);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };
    }
  }, [currentDate, view, year, month]);

  const { data: items } = useContentCalendar(startDate, endDate);

  const navigate = (direction: -1 | 1) => {
    const next = new Date(currentDate);
    if (view === "month") {
      next.setMonth(next.getMonth() + direction);
    } else {
      next.setDate(next.getDate() + 7 * direction);
    }
    setCurrentDate(next);
  };

  // Group items by date
  const itemsByDate = useMemo(() => {
    const map: Record<string, CalendarItem[]> = {};
    items?.forEach((item) => {
      const dateKey = new Date(item.scheduled_date).toISOString().split("T")[0];
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(item);
    });
    return map;
  }, [items]);

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    if (view === "month") {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startOffset = (firstDay.getDay() + 6) % 7; // Monday-based
      const days: { date: Date; isCurrentMonth: boolean }[] = [];

      // Previous month padding
      for (let i = startOffset - 1; i >= 0; i--) {
        const d = new Date(year, month, -i);
        days.push({ date: d, isCurrentMonth: false });
      }
      // Current month
      for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push({ date: new Date(year, month, d), isCurrentMonth: true });
      }
      // Next month padding
      while (days.length % 7 !== 0) {
        const d = new Date(year, month + 1, days.length - startOffset - lastDay.getDate() + 1);
        days.push({ date: d, isCurrentMonth: false });
      }
      return days;
    } else {
      const dayOfWeek = currentDate.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(currentDate);
      monday.setDate(currentDate.getDate() + mondayOffset);
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return { date: d, isCurrentMonth: true };
      });
    }
  }, [currentDate, view, year, month]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/content" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Content Calendar</h1>
            <p className="text-gray-500">Plan and schedule your content</p>
          </div>
        </div>
        <Link
          href="/content"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Create Content
        </Link>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border p-2 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-semibold">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={() => navigate(1)}
            className="rounded-lg border p-2 hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Today
          </button>
        </div>
        <div className="flex rounded-lg border">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1.5 text-sm ${view === "month" ? "bg-gray-100 font-medium" : ""}`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-3 py-1.5 text-sm ${view === "week" ? "bg-gray-100 font-medium" : ""}`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-hidden rounded-lg border bg-white">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b bg-gray-50">
          {DAY_NAMES.map((day) => (
            <div key={day} className="px-2 py-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className={`grid grid-cols-7 ${view === "week" ? "" : "auto-rows-[120px]"}`}>
          {calendarDays.map(({ date, isCurrentMonth }, i) => {
            const dateKey = date.toISOString().split("T")[0];
            const dayItems = itemsByDate[dateKey] || [];
            const isToday = dateKey === today;

            return (
              <div
                key={i}
                className={`border-b border-r p-1 ${
                  !isCurrentMonth ? "bg-gray-50" : ""
                } ${view === "week" ? "min-h-[200px]" : ""}`}
              >
                <div className={`mb-1 text-right text-xs ${
                  isToday
                    ? "flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white ml-auto"
                    : isCurrentMonth ? "text-gray-700" : "text-gray-400"
                }`}>
                  {date.getDate()}
                </div>
                <div className="space-y-0.5">
                  {dayItems.slice(0, view === "week" ? 10 : 3).map((item) => (
                    <div
                      key={item.id}
                      className={`truncate rounded border px-1 py-0.5 text-[10px] leading-tight ${
                        TYPE_COLORS[item.type] || "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[item.status] || "bg-gray-400"}`} />
                      {item.platform && (
                        <span className="mr-0.5 font-mono text-[9px]">{PLATFORM_ICONS[item.platform]}</span>
                      )}
                      {item.title}
                    </div>
                  ))}
                  {dayItems.length > (view === "week" ? 10 : 3) && (
                    <div className="text-[10px] text-gray-400">
                      +{dayItems.length - (view === "week" ? 10 : 3)} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`h-3 w-3 rounded border ${color}`} />
            <span className="text-xs text-gray-500">{type.replace("_", " ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
