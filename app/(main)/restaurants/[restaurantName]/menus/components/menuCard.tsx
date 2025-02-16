import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { IMenuProps } from '@/types/types';
import { CircleCheck, Trash } from 'lucide-react';
import React from 'react';

interface IMenu {
    menu: IMenuProps;
    isAddDialog?: boolean;
}

const MenuCard: React.FC<IMenu> = ({menu, isAddDialog}: IMenu) => {
    return (
        <Card className='shadow-none'>
            <CardContent className='p-0'>
                <div className='w-[250px] h-[150px] relative'>
                    {isAddDialog ? <CircleCheck width={15} height={15} className='absolute right-2 top-2 z-10 text-white' fill='var(--primary)' /> : <Button variant="primary" className='absolute right-2 top-2 z-10'>
                        <Trash width={15} height={15} />
                    </Button>}
                    <img src={menu.image} className='w-full h-full rounded-t-lg' alt='img'/>
                </div>
                <div className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-semibold text-base'>{menu.title}</h3>
                        <h3 className='text-sm font-light'>{menu.price}</h3>
                    </div>
                    <p className='max-w-[200px] truncate text-sm text-inputDark'>{menu.description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default MenuCard
