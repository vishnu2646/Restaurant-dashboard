"use client";

import * as React from "react"
import {
    GalleryVerticalEnd,
    Logs,
    UserRoundCog,
    UserRoundSearch,
} from "lucide-react"

// import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user";

// This is sample data.
const data = {
    teams: [
        {
            name: "EAT BITS",
            logo: GalleryVerticalEnd,
            plan: "",
        },
    ],
    projects: [
        {
            name: "Restaurants ",
            url: "/restaurants",
            icon: Logs,
            isActive: false,
        },
        {
            name: "Profile",
            url: "/account",
            icon: UserRoundCog,
            isActive: false,
        },
        {
            name: "Employees",
            url: "/employees",
            icon: UserRoundSearch,
            isActive: false,
        }
    ],
}

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

    const pathname = usePathname();

    const user = useCurrentUser();

    React.useEffect(() => {
        data.projects.forEach((project) => project.isActive = false);
        data.projects.forEach((project) => {
            if(pathname === '/') {
                data.projects[0].isActive = true;
            } else if(project.url.includes(pathname)) {
                project.isActive = true;
            }
        });
    }, [pathname]);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
