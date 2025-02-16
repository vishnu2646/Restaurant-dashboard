import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Employees: React.FC = () => {
    return (
        <div className='hidden sm:block'>
            <div className='flex items-center justify-between pb-2'>
                <h1 className='font-bold text-medium'>Employees</h1>
                <Link href='/employees'>
                    <Button variant="link">
                        View All
                    </Button>
                </Link>
            </div>
            <Card className='shadow-none'>
                <CardContent className='flex flex-col gap-10 pt-5'>
                    <div className='flex items-start gap-2'>
                        <UserCircle width={30} height={30} className='text-input' />
                        <div>
                            <h4 className='font-semibold text-sm'>Arlene McCoy</h4>
                            <h6 className='font-light text-xs text-input'>Senior waiter</h6>
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <UserCircle width={30} height={30} className='text-input' />
                        <div>
                            <h4 className='font-semibold text-sm'>Guy Hawkins</h4>
                            <h6 className='font-light text-xs text-input'>Junior waiter</h6>
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <UserCircle width={30} height={30} className='text-input' />
                        <div>
                            <h4 className='font-semibold text-sm'>Guy Hawkins</h4>
                            <h6 className='font-light text-xs text-input'>Junior waiter</h6>
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <UserCircle width={30} height={30} className='text-input' />
                        <div>
                            <h4 className='font-semibold text-sm'>Guy Hawkins</h4>
                            <h6 className='font-light text-xs text-input'>Junior waiter</h6>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Employees
