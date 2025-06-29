'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircleIcon, Search, X } from 'lucide-react';
import * as z from 'zod';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import RestaurentCard from '@/components/restaurent-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { restaurantSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUploader from './_components/fileUploader';
import { createRestaurant, getRestaurants } from '@/actions/restaurant';
import { useRouter } from 'next/navigation';
import { IRestaurant } from '@/types/types';

const Page = () => {

    const router = useRouter();

    const [file, setFile] = useState<{url: string} | null>(null);

    const [restaurant, setRestaurant] = useState<IRestaurant[]>([]);

    const [error, setError] = useState<string>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof restaurantSchema>>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: {
            name: '',
            rating: '',
            address: '',
            empCount: '',
            image: '/restaurant.png',
        }
    });

    const onSubmit = (values: z.infer<typeof restaurantSchema>) => {
        createRestaurant(values).then(data => {
            if(data && data.success) {
                alert(data.success);
            } else if(data && data.error) {
                alert(data.error);
            }
        });
        form.reset();
        router.push('/restaurant');
    };

    const fetchRestaurants = async () => {
        setIsLoading(true);
        const data = await getRestaurants();
        if(data && data.success) {
            setRestaurant(data.success as any);
        } else if(data && data.error) {
            setError(data.error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRestaurants();
    }, []);

    if(error) {
        return (
            <>
                <div>
                    <h1 className='text-xl font-bold'>{error}</h1>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <Input type="text" placeholder="Search by name...">
                    <Search width={15} height={15} className="text-input" />
                </Input>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="md:mt-0 mt-5">
                            <PlusCircleIcon width={20} height={20} />
                            Add Restaurants
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <div className='flex items-center justify-between'>
                                <DialogTitle className='font-bold text-xl'>
                                    Add Restaurant
                                </DialogTitle>
                                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </DialogPrimitive.Close>
                            </div>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='my-2'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Restaurant Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='Enter Restaurant Name'
                                                        className='pl-0 w-full'
                                                        autoComplete='off'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='my-2'>
                                    <FormField
                                        control={form.control}
                                        name='rating'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Restaurant Ratings</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='Enter Restaurant Rating'
                                                        className='pl-0 w-full'
                                                        autoComplete='off'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='my-2'>
                                    <FormField
                                        control={form.control}
                                        name='address'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Restaurant Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='Enter Restaurant Address'
                                                        className='pl-0 w-full'
                                                        autoComplete='off'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='my-2'>
                                    <FormField
                                        control={form.control}
                                        name='empCount'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Restaurant Employee count</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder='Enter Restaurant Employee Count'
                                                        className='pl-0 w-full'
                                                        autoComplete='off'
                                                        type='number'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='my-2'>
                                    <FormField
                                        control={form.control}
                                        name='image'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <>
                                                        <img src={field.value || file?.url} alt="profile" className="w-full h-[150px]" />
                                                        <FileUploader
                                                            type="image"
                                                            accept="image/*"
                                                            placeholder="Upload your ID"
                                                            folder="ids"
                                                            variant="light"
                                                            onFileChange={field.onChange}
                                                            file={file}
                                                            setFile={setFile}
                                                        />
                                                    </>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit'>Save Restaurant</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            <section className="flex items-start justify-start gap-5">
                {restaurant && restaurant.map((restaurant) => (
                    <RestaurentCard restaurant={restaurant} isLoading={isLoading} key={restaurant.id} />
                ))}
            </section>
        </>
    )
}

export default Page