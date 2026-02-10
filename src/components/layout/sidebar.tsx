"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Sparkles,
  BarChart3,
  Plug,
  Settings,
  BookOpen,
  FileText,
  Calendar,
  Users,
  List,
  MessageSquare,
  Brain,
  Image,
  Search,
  Shield,
  Palette,
} from "lucide-react";

const navigation = [
  {
    name: "AI Studio",
    href: "/ai",
    icon: MessageSquare,
    highlight: true,
    children: [
      { name: "Campaign Chat", href: "/ai", icon: Sparkles },
      { name: "AI Agents", href: "/ai/agents", icon: Brain },
      { name: "Creative Studio", href: "/ai/studio", icon: Palette },
      { name: "Research & Briefs", href: "/ai/research", icon: Search },
      { name: "Brand Brain", href: "/ai/brand", icon: Shield },
    ],
  },
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
    children: [
      { name: "All Campaigns", href: "/campaigns", icon: List },
      { name: "Audiences", href: "/campaigns/audiences", icon: Users },
    ],
  },
  {
    name: "Content",
    href: "/content",
    icon: Image,
    children: [
      { name: "Generate", href: "/content", icon: Sparkles },
      { name: "Library", href: "/content/library", icon: BookOpen },
      { name: "Templates", href: "/content/templates", icon: FileText },
      { name: "Calendar", href: "/content/calendar", icon: Calendar },
    ],
  },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Platforms", href: "/platforms", icon: Plug },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[260px] flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-sm font-bold text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-lg font-bold">Marketing AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const isExpanded = item.children && isActive;
          const isHighlight = "highlight" in item && item.highlight;

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isHighlight && !isActive
                    ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100"
                    : isActive
                    ? isHighlight
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                      : "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {isHighlight && (
                  <span className="ml-auto rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] font-bold text-white">AI</span>
                )}
              </Link>

              {isExpanded && item.children && (
                <div className="ml-4 mt-1 space-y-0.5 border-l pl-3">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                          isChildActive
                            ? isHighlight ? "text-purple-700" : "text-brand-700"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <child.icon className="h-3.5 w-3.5" />
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer — Agent Status */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <p className="text-xs font-medium text-purple-700">8 AI Agents Online</p>
          </div>
          <p className="text-xs text-purple-600">
            Ready to build your next campaign
          </p>
          <Link href="/ai" className="mt-2 inline-block text-xs font-medium text-purple-700 hover:underline">
            Start Campaign →
          </Link>
        </div>
      </div>
    </aside>
  );
}
