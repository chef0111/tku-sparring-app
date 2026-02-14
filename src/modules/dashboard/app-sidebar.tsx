import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Home, Trophy, User } from 'lucide-react';
import { LogoIcon } from '@/components/ui/logo';
import { NavMain } from '@/modules/dashboard/nav-main';
import { UserNav } from '@/components/user/user-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Home', icon: Home, to: '/dashboard' },
  { title: 'Tournaments', icon: Trophy, to: '/dashboard/tournament' },
  { title: 'Athletes', icon: User, to: '/dashboard/athlete' },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/dashboard" />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <LogoIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">TKU Sparring</span>
                <span className="truncate text-xs">Tournament Manager</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
