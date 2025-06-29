"use client";

import React, { useEffect, useState } from 'react';
import { ChevronDown, HandPlatter, ReceiptIndianRupee, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Line, LineChart, CartesianGrid, XAxis, LabelList } from "recharts"
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import RecentOrdersCard from './components/recentOrdersCard';
import Employees from './components/employees';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getRestaurantByName } from '@/actions/restaurant';
import { IRestaurant } from '@/types/types';

const chartData = [
    { timing: "8.00 AM", money: 80 },
    { timing: "11.00 AM", money: 200 },
    { timing: "2.00 PM", money: 120 },
    { timing: "4.00 PM", money: 190 },
    { timing: "8.00 PM", money: 130 },
    { timing: "11.00 PM", money: 140 },
];

const chartConfig = {
    money: {
        label: "money",
    },
} satisfies ChartConfig;

const Page: React.FC = () => {

    const params = useParams();

    const { restaurantName } = params;

    const [restaurant, setRestaurant] = useState<IRestaurant>();

    const [error, setError] = useState<string>();

    const fetchRestaurant = async () => {
        const restaurant = restaurantName.toString().replaceAll('%20', ' ')
        const data = await getRestaurantByName(restaurant as string);
        if(data && data.succeess) {
            setRestaurant(data.succeess as IRestaurant);
        } if(data && data.error) {
            setError(data.error)
        }
    };

    if(error)  {
        return (
            <>
                <h1>No Restaurant data to display.</h1>
            </>
        )
    }

    useEffect(() => {
        fetchRestaurant();
    }, []);

    return (
        <section>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <h1 className='font-bold text-2xl'>{restaurant?.name}</h1>
                <div className='flex items-center gap-5'>
                    <Link href={`/restaurants/${restaurant?.name}/menus?restaurantId=${restaurant?.id}`}>
                        <Button className="md:mt-0 mt-5">
                            <HandPlatter width={20} height={20}  />
                            Restaurant Menus
                        </Button>
                    </Link>
                    <Link href={`/restaurants/Chole New Yorkban/orders`}>
                        <Button className="md:mt-0 mt-5" variant="secondary">
                            <ReceiptIndianRupee width={20} height={20} />
                        </Button>
                    </Link>
                    <Link href={`/restaurants/Chole New Yorkban/settings`}>
                        <Button className="md:mt-0 mt-5" variant="destructive">
                            <Settings width={20} height={20} />
                        </Button>
                    </Link>
                </div>
            </div>
            <main className='flex flex-col sm:flex-row items-start justify-between gap-4 pb-4'>
                <div className='flex-1 min-h-full w-full'>
                    <div className='flex items-center justify-between mb-2'>
                        <h1 className='font-semibold text-medium'>Total Income</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center">
                                    <span className='text-xs mr-3'>Yesterday</span>
                                    <ChevronDown width={15} height={15} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Today</DropdownMenuItem>
                                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Card className='shadow-sm'>
                        <CardHeader>
                            <CardTitle>
                                <span className='text-input text-lg font-medium'>$ {' '}</span>
                                <span className='text-3xl font-semibold'>908.04</span>
                            </CardTitle>
                            <CardDescription>
                                <span className='text-input text-[12px]'>Sales Over time</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="timing"
                                        tickLine={true}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 9)}
                                        stroke='var(--chart-2)'
                                        fill='var(--chart-2)'
                                    />
                                    <ChartTooltip content={<ChartTooltipContent indicator='line' />} labelClassName='text-secondary' />
                                    <defs>
                                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor="var(--chart-2)"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--chart-2)"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey="money"
                                        type="natural"
                                        fill="url(#fillMobile)"
                                        fillOpacity={0.4}
                                        stroke="var(--chart-2)"
                                        stackId="a"
                                    >
                                        <LabelList
                                            position="top"
                                            offset={12}
                                            className="text-input"
                                            fontSize={12}
                                        />
                                    </Area>
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex-1 min-h-full w-full'>
                    <div className='flex items-center justify-between mb-2'>
                        <h1 className='font-semibold text-medium'>Income</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center">
                                    <span className='text-xs mr-3'>Yesterday</span>
                                    <ChevronDown width={15} height={15} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Today</DropdownMenuItem>
                                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Card className='shadow-sm'>
                        <CardHeader>
                            <div className="flex h-10 items-center space-x-4 text-sm">
                                <div className='p-2'>
                                    <p className='text-3xl font-semibold mb-0'>908</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='block w-1 rounded-sm h-2 bg-secondary'></span>
                                        <p className='text-xs text-input font-light mb-0'>Total Order</p>
                                    </div>
                                </div>
                                <Separator orientation="vertical" />
                                <div className='p-2'>
                                    <p className='text-3xl font-semibold mb-0'>$ 600</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='block w-1 rounded-sm h-2 bg-primary'></span>
                                        <p className='text-xs text-input font-light mb-0'>Total Amount</p>
                                    </div>
                                </div>
                                <Separator orientation="vertical" />
                                <div className='p-2'>
                                    <p className='text-3xl font-semibold mb-0'>13</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='block w-1 rounded-sm h-2 bg-tertiary'></span>
                                        <p className='text-xs text-input font-light mb-0'>Total Bills</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className='py-5'>
                            <div>
                                <ChartContainer config={chartConfig}>
                                    <LineChart
                                        accessibilityLayer
                                        data={chartData}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="timing"
                                            tickLine={true}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 9)}
                                            stroke='var(--chart-1)'
                                            fill='var(--chart-1)'
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />
                                        <Line
                                            dataKey="money"
                                            type="natural"
                                            fill='var(--chart-1)'
                                            stroke="var(--chart-1)"
                                        >
                                            <LabelList
                                                position="top"
                                                offset={12}
                                                className="text-input"
                                                fontSize={12}
                                            />
                                        </Line>
                                    </LineChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <main className='flex flex-col sm:flex-row items-start justify-between gap-4'>
                {restaurant && <RecentOrdersCard restaurant={restaurant} />}
                {restaurant && <Employees restaurant={restaurant} />}
            </main>
        </section>
    )
}

export default Page
