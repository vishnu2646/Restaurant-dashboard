import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Dot, Download, MoreHorizontal, X } from 'lucide-react';
import React from 'react'

const DetailContent: React.FC = () => {
    return (
        <div className='h-screen'>
            <DialogHeader className='mb-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <DialogPrimitive.Close>
                            <X width={15} height={15} />
                        </DialogPrimitive.Close>
                        <Separator orientation='vertical' className='h-5' />
                        <div className='flex items-center gap-2'>
                            <ChevronUp width={15} height={15} />
                            <ChevronDown width={15} height={15} />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Download width={15} height={15}/>
                        <Separator orientation='vertical' className='h-5' />
                        <MoreHorizontal width={15} height={15}/>
                    </div>
                </div>
            </DialogHeader>
            <div className='mt-3'>
                <div className='mb-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold text-medium'>DD771583</h1>
                        <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div>
                        <span className='flex items-center text-input font-light text-xs'>Friday, January 19 <Dot /> 04.00 PM</span>
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='mb-2'>
                        <h1 className='font-bold text-medium'>Order Details</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Order number</td>
                                <td className="text-xs py-2">DD771583</td>
                            </tr>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Timestamp</td>
                                <td className="text-xs py-2">22 January, 2024, 06.00 PM</td>
                            </tr>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Combo</td>
                                <td className="text-xs py-2">Sizzle</td>
                            </tr>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Price</td>
                                <td className="text-xs py-2">$11.70</td>
                            </tr>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Status</td>
                                <td className="text-xs">
                                    <Select>
                                        <SelectTrigger>
                                            <Button variant="outline">
                                                <SelectValue placeholder="Select the status" />
                                            </Button>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="canclled">Cancelled</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Description</td>
                                <td className="text-xs py-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        <h1 className='font-bold text-medium'>Customer Details</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Customer name</td>
                                <td className="text-xs py-2">Cameron William</td>
                            </tr>
                            <tr>
                                <td className="text-input text-xs py-2 pr-4">Pickup number</td>
                                <td className="text-xs py-2">88712</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetailContent;
