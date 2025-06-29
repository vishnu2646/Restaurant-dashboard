import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { useCurrentRole } from '@/hooks/use-current-role';
import { IMenuProps } from '@/types/types';
import { CircleCheck, Trash } from 'lucide-react';
import React from 'react';

interface IMenu {
    menu: IMenuProps;
    isAddDialog?: boolean;
    onSelectMenu?: (menu: IMenuProps) => void;
    onDeleteMenuItem?: (menu: IMenuProps) => void;
}

const MenuCard: React.FC<IMenu> = ({menu, isAddDialog, onSelectMenu, onDeleteMenuItem }: IMenu) => {

    const role = useCurrentRole();

    const selectItemsFormMenu = (item: IMenuProps) => {
        item.selected = !item.selected;
        if(onSelectMenu) {
            onSelectMenu(item);
        }
    }

    const deleteMenuItem = (item: IMenuProps) => {
        if(onDeleteMenuItem) {
            onDeleteMenuItem(item);
        }
    }

    return (
        <Card
            className='shadow-none'
            onClick={() => selectItemsFormMenu(menu)}
        >
            <CardContent className='p-0'>
                <div className='w-[250px] h-[150px] relative'>
                    {role === 'ADMIN' && (
                        <Button variant="primary" className='absolute right-2 top-2 z-10' onClick={() => deleteMenuItem(menu)}>
                            <Trash width={15} height={15} />
                        </Button>
                    )}
                    {isAddDialog && menu.selected && (<CircleCheck width={15} height={15} className='absolute right-2 top-2 z-10 text-white' fill='var(--primary)' />)}
                    <img src={menu.image} className='w-full h-full rounded-t-lg' alt='img'/>
                </div>
                <div className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-semibold text-base'>{menu.name}</h3>
                        <h3 className='text-sm font-light'>{menu.price}</h3>
                    </div>
                    <p className='max-w-[200px] truncate text-sm text-inputDark'>{menu.description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default MenuCard
