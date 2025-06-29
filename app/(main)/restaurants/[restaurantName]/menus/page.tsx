'use client';
import React, { useEffect, useState } from 'react';
import { ArrowUpDown, PlusIcon, Search } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomDialog, CustomDialogContent, CustomDialogFooter, CustomDialogHeader, CustomDialogTitle, CustomDialogTrigger } from '../../../components/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { menuItemSchema } from '@/schemas';
import MenuCard from './components/menuCard';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FileUploader from './components/fileUploader';
import { createItem, createRestaurantMenu, deleteRestaurantMenuItem, getItems, getRestaurantMenus } from '@/actions/menuItem';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { IMenuProps } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import RestaurantSkeleton from '@/components/restaurantSkeleton';

const Page = () => {

    const searchParams = useSearchParams();

    const restaurantId = searchParams.get('restaurantId');

    const [file, setFile] = useState<{url: string} | null>(null);

    const [items, setItems] = useState<IMenuProps[]>([]);

    const [menuItems, setMenuItems] = useState<IMenuProps[]>([]);

    const [success, setSuccess] = useState<string>('');

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedItems, setSelectedItems] = useState<IMenuProps[]>([]);

    if(!restaurantId) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <h1>Invalid Restaurant Menus to Load.</h1>
            </div>
        )
    }

    const menuItemForm = useForm<z.infer<typeof menuItemSchema>>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            name: '',
            price: '',
            description: '',
            image: '/food.png'
        }
    });

    const handleMenuSelect = (menu: IMenuProps) => {
        if(menu.selected) {
            setSelectedItems((prevItems) => [...prevItems, menu]);
        } else {
            const updatedSelectedItems = selectedItems.filter(item => item.id !== menu.id);
            setSelectedItems(updatedSelectedItems);
        }
    };

    const handleAddItemsToMenu = async () => {
        const data = await createRestaurantMenu(selectedItems, restaurantId as string);
        if(data && data.success) {
            alert(data.success);
        } else if(data && data.error) {
            alert(data.error);
        }
        fetchRestaurantMenus();
    }

    const onMenuItemSubmit = async (values: z.infer<typeof menuItemSchema>) => {
        const data = await createItem(values);
        if(data && data.success) {
            setSuccess(data.success);
        } else if(data && data.error) {
            setError(data.error);
        }
        menuItemForm.reset();

        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            setSuccess('');
            setError('');
        }, 2000);
    }

    const handleClearSelectedItems = () => setSelectedItems([]);

    const fetchItems = async () => {
        const data = await getItems();
        if(data && data.success) {
            setItems(data.success as any);
        } else if(data && data.error) {
            setError(data.error);
        }
    }

    const fetchRestaurantMenus = async () => {
        setIsLoading(true);
        const data = await getRestaurantMenus(restaurantId as string);
        if(data && data.success) {
            setMenuItems(data.success);
        } else {
            setError(data.error);
        }
        setIsLoading(false);
    }

    const deleteMenuItem = async (menu: IMenuProps) => {
        const data = await deleteRestaurantMenuItem(menu.id, restaurantId as string);
        if (data && data.success) {
            alert(data.success);
        } else if (data && data.error) {
            alert(data.error);
        }
        fetchRestaurantMenus();
    }

    useEffect(() => {
        fetchRestaurantMenus();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <Input type="text" placeholder="Search category by name...">
                    <Search width={15} height={15} className="text-input" />
                </Input>
                <Button className="md:mt-0 mt-5" variant="primary">
                    <ArrowUpDown width={15} height={15} />
                    Sort by
                </Button>
            </div>
            <div className='flex items-start gap-4 h-full'>
                <CustomDialog>
                    <CustomDialogTrigger className='h-full' asChild>
                        <div
                            className='h-full flex items-center justify-center
                            border-dashed border-2 rounded-md border-inputDark p-2'
                            onClick={fetchItems}
                        >
                            <div className='h-full p-5 flex items-center justify-center rounded-md bg-white border-dashed border-1 border-inputDark'>
                                <PlusIcon width={15} height={15} />
                            </div>
                        </div>
                    </CustomDialogTrigger>
                    <CustomDialogContent>
                        <CustomDialogHeader>
                            <CustomDialogTitle className='font-semibold text-base'>Add Items</CustomDialogTitle>
                        </CustomDialogHeader>
                        <div className='flex items-center justify-between'>
                            <Input placeholder='Search Item by name' className='w-full'>
                                <Search width={15} height={15} className="text-input" />
                            </Input>
                            {selectedItems.length > 0 && (<Button variant="outline" onClick={handleClearSelectedItems}>Clear all</Button>)}
                        </div>
                        <div className='w-full'>
                            <div className='flex w-full mt-3 items-start justify-center gap-4 flex-wrap max-h-[400px] overflow-y-scroll no-scrollbar'>
                                {items.map((item) => (
                                    <MenuCard menu={item} key={item.id} isAddDialog={true} onSelectMenu={handleMenuSelect} />
                                ))}
                            </div>
                        </div>
                        <CustomDialogFooter>
                            <div className='flex items-center justify-between w-full'>
                                <CustomDialog>
                                    <CustomDialogTrigger asChild>
                                        <Button variant="disabled">
                                            <PlusIcon width={20} height={20} />
                                            Create New Item
                                        </Button>
                                    </CustomDialogTrigger>
                                    <CustomDialogContent>
                                        <CustomDialogHeader>
                                            <CustomDialogTitle className='font-semibold text-base'>
                                                Add Item
                                            </CustomDialogTitle>
                                        </CustomDialogHeader>
                                        <FormSuccess message={success} />
                                        <FormError message={error} />
                                        <Form {...menuItemForm}>
                                            <form onSubmit={menuItemForm.handleSubmit(onMenuItemSubmit)}>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <FormField
                                                                control={menuItemForm.control}
                                                                name='image'
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <>
                                                                                <img src={field.value || file?.url} alt="profile" className="w-[100px] h-[100px] rounded-full" />
                                                                                <FileUploader
                                                                                    type="image"
                                                                                    accept="image/*"
                                                                                    placeholder="upload your profile image"
                                                                                    folder="ids"
                                                                                    variant="light"
                                                                                    onFileChange={field.onChange}
                                                                                    file={file}
                                                                                    setFile={setFile}
                                                                                />
                                                                            </>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className='flex items-center flex-col flex-wrap gap-4'>
                                                            <div>
                                                                <FormField
                                                                    control={menuItemForm.control}
                                                                    name='name'
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Item Name</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    {...field}
                                                                                    placeholder='Enter Item Name'
                                                                                    className="pl-0"
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div>
                                                                <FormField
                                                                    control={menuItemForm.control}
                                                                    name='price'
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Item Price</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    {...field}
                                                                                    placeholder='Enter Item Price'
                                                                                    type='number'
                                                                                    className="pl-0"
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='my-3'>
                                                        <FormField
                                                            control={menuItemForm.control}
                                                            name='description'
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Item description</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            {...field}
                                                                            placeholder='Enter Item Description'
                                                                            rows={5}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <CustomDialogFooter>
                                                    <Button variant="disabled" type='submit'>
                                                        Add Item
                                                    </Button>
                                                    <DialogPrimitive.Close>
                                                        <Button>
                                                            Cancel
                                                        </Button>
                                                    </DialogPrimitive.Close>
                                                </CustomDialogFooter>
                                            </form>
                                        </Form>
                                    </CustomDialogContent>
                                </CustomDialog>
                                <Button onClick={handleAddItemsToMenu}>
                                    <PlusIcon width={20} height={20} />
                                    Add Items to Menu
                                </Button>
                            </div>
                        </CustomDialogFooter>
                    </CustomDialogContent>
                </CustomDialog>
                <div className='flex items-start gap-5 flex-wrap w-full h-full'>
                    {error && (
                        <div className='flex items-center justify-center w-full h-full'>
                            <h1>No Menu Items to display, and something went wrong.</h1>
                        </div>
                    )}
                    {menuItems.map((menu) => (
                        <RestaurantSkeleton isLoading={isLoading} key={menu.id}>
                            <MenuCard
                                menu={menu}
                                onDeleteMenuItem={deleteMenuItem}
                            />
                        </RestaurantSkeleton>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Page
