import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Map, StarIcon, Trash, Users } from 'lucide-react'
import { IRestaurant } from '@/types/types';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { Button } from './ui/button';
import Link from 'next/link';

interface RestaurentCardProps {
    restaurant: IRestaurant;
}

const RestaurentCard: React.FC<RestaurentCardProps> = ({restaurant}) => {
    return (
        <>
            <Link href={`/restaurants/${restaurant.restaurantName}`}>
                <Card className='w-auto shadow-sm'>
                    <CardHeader className='p-0 relative top-0'>
                        <Button variant="primary" className='absolute right-3 top-3 '>
                            <Trash />
                        </Button>
                        <img src={restaurant.image} alt='image' className="mt-0 rounded-tr-[12px] rounded-tl-[12px] w-full h-[100px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[200px] lg:w-[300px] lg:h-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-center justify-between my-3 sm:flex-nowrap flex-wrap'>
                            <h2 className='truncate'>{restaurant.restaurantName}</h2>
                            <span className='flex items-center gap-2'>
                                <StarIcon className='text-destructive' width={15} height={15} fill='#f56164'/>
                                <span className='text-sm'>{restaurant.rating}</span>
                            </span>
                        </div>
                        <div>
                            <div className='flex items-center gap-2 mb-3'>
                                <Map className='w-5 h-5 text-input font-light'/>
                                <Tooltip>
                                    <TooltipTrigger className='text-left truncate w-[100px] sm:w-[100px] lg:w-full'>
                                        <span className='text-sm text-input font-light sm:truncate w-[100px]'>{restaurant.address}</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {restaurant.address}
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Users className='w-5 h-5 text-input font-light'/>
                                <span className='text-sm text-input font-light sm:truncate w-[100px]'>{restaurant.employeesCount} Employees</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}

export default RestaurentCard
