import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className='h-full w-full bg-errorBg flex items-center justify-center'>
            <img src='/errorImg.jpg' alt="error" className='h-full w-[50%]' />
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold'>Opps! Something went wrong!</h1>
                <Link href="/sign-in">
                    <Button className='mt-10'>
                        <MoveLeft />
                        Go Back
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Page
