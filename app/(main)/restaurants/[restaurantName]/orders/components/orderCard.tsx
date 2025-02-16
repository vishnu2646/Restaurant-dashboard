'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { Label } from "@/components/ui/label"
import { IndianRupee, PenTool, X } from 'lucide-react';
import React, { useRef } from 'react'
import { Input } from '@/components/ui/input';

const OrderCard = () => {

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    return (
        <>
            <Card className='shadow-none'>
                <CardHeader>
                    <div className='flex items-start justify-between'>
                        <div className='flex items-start gap-2'>
                            <div className='w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center'>
                                <span className='text-center text-sm'>A4</span>
                            </div>
                            <div>
                                <h4 className='font-medium text-base'>Ariel Hokmet</h4>
                                <p className='text-xs text-input'>Order #DD945632</p>
                            </div>
                        </div>
                        <div>
                            <Badge variant="secondary">Complted</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <span className='text-inputDark text-sm'>Wed, July 12, 2024</span>
                        <span className='text-inputDark text-sm'>06:12 PM</span>
                    </div>
                    <Separator className='my-2'/>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan={2} className="p-2 text-input text-xs">Items</td>
                                <td className="p-2 text-input text-xs">Qty</td>
                                <td className="p-2 text-input text-xs">Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2} className="p-2 text-sm">Scrambled eggs with toas</td>
                                <td className="p-2 text-sm">1</td>
                                <td className="p-2 text-sm">$16.99</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="p-2 text-sm">Smoked Salmon Bangel</td>
                                <td className="p-2 text-sm">2</td>
                                <td className="p-2 text-sm">$38.98</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="p-2 text-sm">Classic Lemonade</td>
                                <td className="p-2 text-sm">1</td>
                                <td className="p-2 text-sm">$16.99</td>
                            </tr>
                        </tbody>
                    </table>
                    <Separator className='my-2' />
                    <div className='flex items-center justify-between mb-4'>
                        <h4>Total</h4>
                        <h4>$87.34</h4>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button variant="disabled">See Details</Button>
                        <Button onClick={() => dialogRef.current?.showModal()}>Pay Bills</Button>
                    </div>
                </CardContent>
            </Card>
            <dialog
                ref={dialogRef}
                className='p-5 w-full md:w-1/2 rounded-md
                block opacity-0 translate-y-20 transition-[opacity, transform] inset-0
                [&[open]]:opacity-100 [&[open]]:translate-y-0 [&:not([open])]:pointer-events-none
                duration-300
                '
            >
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-lg md:text-xl'>Pay Bill</h2>
                    <X width={15} height={15} className='cursor-pointer' onClick={() => dialogRef.current?.close()}/>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                    {/* left */}
                    <div className='flex-1'>
                        <p className='mb-2 text-base font-semibold'>Customer Info</p>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-start gap-2'>
                                <div className='w-10 h-10 bg-primary flex items-center justify-center rounded-md'>
                                    <h4 className='text-white'>A4</h4>
                                </div>
                                <div>
                                    <h4 className='text-sm font-medium'>Ariel Hikmet</h4>
                                    <p className='text-xs text-inputDark'>Order #95 / Dine</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-xs text-inputDark text-right'>Wed, July 12, 2024</p>
                                <p className='text-xs text-inputDark text-right'>06:21 PM</p>
                            </div>
                        </div>

                        <div className='mt-4 bg-border p-4 rounded-md'>
                            <p className='mb-2 text-base font-semibold'>Items</p>
                            <div className='flex items-center justify-between mb-3'>
                                <div>
                                    <p className='text-inputDark text-sm mb-1'>Scrambled Eggs with toast</p>
                                    <p className='text-xs'>$16.99</p>
                                </div>
                                <div>
                                    <p className='text-xs'>1x</p>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mb-3'>
                                <div>
                                    <p className='text-inputDark text-sm mb-1'>Scrambled Eggs with toast</p>
                                    <p className='text-xs'>$16.99</p>
                                </div>
                                <div>
                                    <p className='text-xs'>1x</p>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mb-3'>
                                <div>
                                    <p className='text-inputDark text-sm mb-1'>Scrambled Eggs with toast</p>
                                    <p className='text-xs'>$16.99</p>
                                </div>
                                <div>
                                    <p className='text-xs'>1x</p>
                                </div>
                            </div>

                            <Separator className='mb-3 bg-black' />

                            <div className='flex items-center justify-between mb-3'>
                                <p className='text-inputDark text-xs'>Items (5)</p>
                                <p className='text-inputDark text-xs'>$73.79</p>
                            </div>
                            <div className='flex items-center justify-between mb-3'>
                                <p className='text-inputDark text-xs'>Tax (5%)</p>
                                <p className='text-inputDark text-xs'>$3.79</p>
                            </div>

                            <div className='flex items-center justify-between'>
                                <p className='text-xs'>Total</p>
                                <p className='text-xs'>$77.58</p>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className='flex-1'>
                        <p className='font-semibold text-sm mb-3'>Select a payment method</p>
                        <select className='border border-input p-2 w-full rounded-md outline-none'>
                            <option>Cash</option>
                            <option>Card</option>
                            <option>UPI</option>
                        </select>

                        <div className='flex items-center justify-between mt-4 gap-2'>
                            <Input placeholder='Enter Amount' className='w-full md:w-28'>
                                <IndianRupee width={10} height={10}/>
                            </Input>
                            <Input placeholder='Transaction Id' className='w-full md:w-28'>
                                <PenTool width={10} height={10}/>
                            </Input>
                        </div>

                        <Button className='mt-4 w-full'>Pay Bill</Button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default OrderCard
