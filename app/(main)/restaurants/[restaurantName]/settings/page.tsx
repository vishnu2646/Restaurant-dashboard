import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react'
import RecentOrdersCard from '../components/recentOrdersCard';

const Page = () => {
    const timings = [
        {
            day: 'Monday',
            checked: true,
            openTime: '',
            closeTime: '',
        },
        {
            day: 'Tuesday',
            checked: false,
            openTime: '',
            closeTime: '',
        },
        {
            day: 'Wednesday',
            checked: true,
            openTime: '',
            closeTime: '',
        },
        {
            day: 'Thursday',
            checked: true,
            openTime: '',
            closeTime: '',
        },
        {
            day: 'Friday',
            checked: true,
            openTime: '',
            closeTime: '',
        },
        {
            day: 'Saturday',
            checked: false,
            openTime: '',
            closeTime: '',
        },
    ]
    return (
        <div>
            <div className='flex flex-col sm:flex-row items-center gap-4 mb-4'>
                <div className='flex-1 w-full'>
                    <h1 className='text-xl font-bold mb-2'>Add General Info</h1>
                    <Card className='rounded-2xl shadow-none'>
                        <CardContent className='pt-5'>
                            <div className="grid w-full max-w-sm items-center gap-1 mb-3">
                                <Label htmlFor="restaurantName" className='text-xs text-sidebar-foreground'>Restaurant Name</Label>
                                <Input type="text" id="restaurantName" placeholder="Enter Restaurant Name" className='pl-0 w-full' />
                            </div>
                            <div className='flex items-center gap-4 mb-3'>
                                <div className="grid w-full max-w-sm items-center gap-1">
                                    <Label htmlFor="street" className='text-xs text-sidebar-foreground'>Street</Label>
                                    <Input type="text" id="street" placeholder="Enter Street" className='pl-0' />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1">
                                    <Label htmlFor="city" className='text-xs text-sidebar-foreground'>City</Label>
                                    <Input type="text" id="city" placeholder="Enter City" className='pl-0' />
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className="grid w-full max-w-sm items-center gap-1">
                                    <Label htmlFor="state" className='text-xs text-sidebar-foreground'>State/Province</Label>
                                    <Input type="text" id="state" placeholder="Enter State" className='pl-0' />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1">
                                    <Label htmlFor="country" className='text-xs text-sidebar-foreground'>Country</Label>
                                    <Input type="text" id="country" placeholder="Enter Country" className='pl-0' />
                                </div>
                            </div>
                            <div className='my-4'>
                                <h1 className='font-semibold text-base'>Contact Information</h1>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className="grid w-full max-w-sm items-center gap-1">
                                    <Label htmlFor="phone" className='text-xs text-sidebar-foreground'>Phone Number</Label>
                                    <Input type="number" id="phone" placeholder="Enter Phone Number" className='pl-0' />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1">
                                    <Label htmlFor="email" className='text-xs text-sidebar-foreground'>Email Address</Label>
                                    <Input type="email" id="email" placeholder="Enter Email" className='pl-0' />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex-1 w-full'>
                    <h1 className='text-xl font-bold mb-2'>Opening Hours</h1>
                    <Card className='rounded-2xl shadow-none'>
                        <CardContent className='pt-2'>
                            <table>
                                <tbody>
                                    {timings.map((timing, index) => (
                                        <tr key={index}>
                                            <td className='px-4 py-2'>
                                                <h4 className='font-medium text-sm'>{timing.day}</h4>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <Switch checked={timing.checked}/>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <input type='time' className='pl-0 w-[80px]' />
                                            </td>
                                            <td className='px-4 py-2'>
                                                <input type='time' className='pl-0 w-[80px]' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <RecentOrdersCard />
            </div>
        </div>
    )
}

export default Page
