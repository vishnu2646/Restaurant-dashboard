import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const RecentOrdersCard: React.FC = () => {
    return (
        <div className='flex-1 min-h-full'>
            <div className='flex items-center justify-between pb-2'>
                <h1 className='font-bold text-medium'>Recent Orders</h1>
                <Link href='/restaurants/Chole New Yorkban/recent-orders'>
                    <Button variant="link">
                        View All
                    </Button>
                </Link>
            </div>
            <Card className='shadow-none'>
                <div className='py-4'>
                    <CardContent className='pb-2'>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='flex items-center'>
                                <span className='mr-2'>DD945632</span>
                                <Badge variant="warning">Pending</Badge>
                            </div>
                            <MoreVertical width={15} height={15}/>
                        </div>
                        <span className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident non iusto incidunt voluptas earum, nam adipisci.</span> <br />
                        <span className='text-xs text-input'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                        <Separator className='mt-2'/>
                    </CardContent>
                    <CardContent className='border-0 pb-2'>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='flex items-center'>
                                <span className='mr-2'>DD945645</span>
                                <Badge variant="secondary">Completed</Badge>
                            </div>
                            <MoreVertical width={15} height={15}/>
                        </div>
                        <span className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident non iusto incidunt voluptas earum, nam adipisci.</span> <br />
                        <span className='text-xs text-input'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                        <Separator className='mt-2'/>
                    </CardContent>
                    <CardContent className='border-0 pb-2'>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='flex items-center'>
                                <span className='mr-2'>DD945634</span>
                                <Badge variant="destructive">Cancelled</Badge>
                            </div>
                            <MoreVertical width={15} height={15}/>
                        </div>
                        <span className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident non iusto incidunt voluptas earum, nam adipisci.</span> <br />
                        <span className='text-xs text-input'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default RecentOrdersCard
