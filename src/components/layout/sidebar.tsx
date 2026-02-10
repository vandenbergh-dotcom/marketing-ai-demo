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
  Image,
  Users,
  List,
} from "lucide-react";

const navigation = [
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
    name: "AI Content",
    href: "/content",
    icon: Sparkles,
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
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
          M
        </div>
        <span className="text-lg font-bold">Marketing AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const isContentSection = item.children && pathname.startsWith(item.href);

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>

              {/* Sub-navigation for content */}
              {isContentSection && item.children && (
                <div className="ml-4 mt-1 space-y-0.5 border-l pl-3">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                          isChildActive
                            ? "text-brand-700"
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

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-brand-50 p-3">
          <p className="text-xs font-medium text-brand-700">Starter Plan</p>
          <p className="mt-1 text-xs text-brand-600">
            3 of 5 campaigns used
          </p>
          <button className="mt-2 text-xs font-medium text-brand-700 hover:underline">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
