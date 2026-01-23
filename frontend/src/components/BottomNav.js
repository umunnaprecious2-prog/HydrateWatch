"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/posts", label: "Post", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 lg:hidden">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href === "/dashboard" && pathname === "/dashboard");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-[80px] transition-all ${
                isActive
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-gray-700 active:scale-95"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${isActive ? "bg-primary-50" : ""}`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-600" : ""}`} />
              </div>
              <span className={`text-xs mt-0.5 ${isActive ? "font-semibold text-primary-600" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </nav>
  );
}
