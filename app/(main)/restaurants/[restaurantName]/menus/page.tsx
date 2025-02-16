import React from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, PlusIcon, Search } from 'lucide-react';
import MenuCard from './components/menuCard';
import { menus } from '@/data/data';
import { CustomDialog, CustomDialogContent, CustomDialogFooter, CustomDialogHeader, CustomDialogTrigger } from '../../../components/dialog';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Page = () => {

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
                    <CustomDialogTrigger className='h-full'>
                        <div className='h-full flex items-center justify-center border-dashed border-2 rounded-md border-inputDark p-2'>
                            <div className='h-full p-5 flex items-center justify-center rounded-md bg-white border-dashed border-1 border-inputDark'>
                                <PlusIcon width={15} height={15} />
                            </div>
                        </div>
                    </CustomDialogTrigger>
                    <CustomDialogContent>
                        <CustomDialogHeader>
                            <CustomDialogHeader className='font-semibold text-base'>Add Items</CustomDialogHeader>
                        </CustomDialogHeader>
                        <div className='w-[50%]'>
                            <Input placeholder='Search Item by name' className='w-full'>
                                <Search width={15} height={15} className="text-input" />
                            </Input>
                        </div>
                        <div className='w-full'>
                            <div className='flex w-full mt-3 items-start justify-center gap-4 flex-wrap max-h-[400px] overflow-y-scroll no-scrollbar'>
                                {menus.map((menu, index) => (
                                    <MenuCard menu={menu} key={index} isAddDialog={true} />
                                ))}
                            </div>
                        </div>
                        <CustomDialogFooter>
                            <div className='flex items-center justify-between w-full'>
                                <CustomDialog>
                                    <CustomDialogTrigger>
                                        <Button variant="disabled">
                                            <PlusIcon width={20} height={20} />
                                            Create New Item
                                        </Button>
                                    </CustomDialogTrigger>
                                    <CustomDialogContent>
                                        <CustomDialogHeader>
                                            <h2 className='font-semibold text-base'>Add Item</h2>
                                        </CustomDialogHeader>
                                        <div>
                                            <div className='flex items-center flex-wrap gap-4'>
                                                <div>
                                                    <Image src='/cake.jpg' className='rounded-[50%]' width={50} height={50} alt='image' />
                                                </div>
                                                <div>
                                                    <Label className='text-sm'>Item Name</Label>
                                                    <Input placeholder='Item Name' className='pl-0'/>
                                                </div>
                                                <div>
                                                    <Label className='text-sm'>Item Category</Label>
                                                    <Input placeholder='Item Category' className='pl-0'/>
                                                </div>
                                                <div>
                                                    <Label className='text-sm'>Item Price</Label>
                                                    <Input placeholder='Item Price' type='number' className='pl-0'/>
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                <Label className='text-sm'>Item Description</Label>
                                                <Textarea placeholder='Item Description' rows={4} />
                                            </div>
                                        </div>
                                        <CustomDialogFooter>
                                            <DialogPrimitive.Close>
                                                <Button variant="disabled">
                                                    Confirm
                                                </Button>
                                            </DialogPrimitive.Close>
                                            <DialogPrimitive.Close>
                                                <Button>
                                                    Cancel
                                                </Button>
                                            </DialogPrimitive.Close>
                                        </CustomDialogFooter>
                                    </CustomDialogContent>
                                </CustomDialog>
                                <DialogPrimitive.Close>
                                    <Button>
                                        <PlusIcon width={20} height={20} />
                                        Add Items to Menu
                                    </Button>
                                </DialogPrimitive.Close>
                            </div>
                        </CustomDialogFooter>
                    </CustomDialogContent>
                </CustomDialog>
                <div className='flex items-center gap-5 flex-wrap'>
                    {menus.map((menu, index) => (
                        <MenuCard menu={menu} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Page
