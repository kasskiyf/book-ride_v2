import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Car,
  Settings,
  FileText,
  Bell,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Drivers", href: "/admin/drivers", icon: Car },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Security", href: "/admin/security", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-64 flex-col border-r bg-muted/40">
      <div className="flex flex-1 flex-col gap-2 p-4">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={cn(
              "justify-start",
              pathname === item.href && "bg-muted"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}