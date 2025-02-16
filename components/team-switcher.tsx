"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
    const { isMobile } = useSidebar()
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-foreground"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground">
                        <Image alt="logo" src='/logo.png' width={20} height={20} />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-light">
                            {activeTeam.name}
                        </span>
                        <span className="truncate text-xs">{activeTeam.plan}</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
