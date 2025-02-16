'use client';
import React from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation';

const MainLayout = ({children}: { children: React.ReactNode }) => {

    const pathname = usePathname();

    const pathNameArr = pathname.split('/');

    const title = pathNameArr[pathNameArr.length - 1].replaceAll('%20', ' ') || 'Dashboard';

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header
                    className="
                        flex z-10 h-16 shrink-0 items-center gap-2 transition-[width,height]
                        ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
                >
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="font-bold text-lg uppercase">{title}</h1>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-5 bg-sidebar">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout
