'use client';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircleIcon, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import EmployeeCard from './components/employeeCard';
import { employee } from '@/data/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select';
import { createRestaurantEmployee, getRestaurantEmployee, getRestaurants } from '@/actions/restaurant';
import { IEmploye, IRestaurant } from '@/types/types';
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useForm } from 'react-hook-form';
import { employeeSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import FileUploader from './components/fileUploader';
import { useSearchParams } from 'next/navigation';

const Page: React.FC = () => {

    const searchParams = useSearchParams();

    const restaurantId = searchParams.get('restaurantId');

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

    const [employees, setEmployees] = useState<IEmploye[]>([]);

    const [error, setError] = useState<string>('');

    const [success, setSuccess] = useState<string>('');

    const [file, setFile] = useState<{url: string} | null>(null);

    const employeeForm = useForm<z.infer<typeof employeeSchema>>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: '',
            position: '',
            image: '/user1.jpg',
            restaurantId: '',
        }
    });

    const onSubmitEmployeeForm = async (values: z.infer<typeof employeeSchema>) => {
        const data = await createRestaurantEmployee(values);
        if(data && data.success) {
            setSuccess(data.success);
        } else if(data && data.error) {
            setError(data.error);
        }
    }

    const fetchRestaurants = async () => {
        const data = await getRestaurants();
        if(data && data.success) {
            setRestaurants(data.success as any);
        } else if(data && data.error) {
            setError(data.error);
        }
    };

    const handleSelectChange = async (id: string) => {
        const data = await getRestaurantEmployee(id);
        if(data && data.success) {
            setEmployees(data.success as any);
        } else if(data && data.error) {
            console.log(data.error);
            setError(data.error);
        }
    }

    useEffect(() => {
        fetchRestaurants();
        if(restaurantId) {
            handleSelectChange(restaurantId as string);
        }
    }, []);

    if(error) {
        return (
            <div>
                <h2>{error}</h2>
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <div className='flex items-center gap-4'>
                    <Input type="text" placeholder="Search by name...">
                        <Search width={15} height={15} className="text-input" />
                    </Input>
                    <Select onValueChange={(id: string) => handleSelectChange(id)} defaultValue='all'>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all" defaultChecked>All</SelectItem>
                                {restaurants.map(restaurant => (
                                    <SelectItem value={restaurant.id.toString()} key={restaurant.id}>{restaurant.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="md:mt-0 mt-5">
                            <PlusCircleIcon width={20} height={20} />
                            Add Employee
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
                            <Form {...employeeForm}>
                                <form onSubmit={employeeForm.handleSubmit(onSubmitEmployeeForm)}>
                                    <div className='my-4'>
                                        <FormField
                                            name='name'
                                            control={employeeForm.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Emloyee Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='pl-0 w-full'
                                                            autoComplete='off'
                                                            placeholder='Enter Employee Name'
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='mb-4'>
                                            <FormField
                                                name='position'
                                                control={employeeForm.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Emloyee position</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className='pl-0 w-full'
                                                                autoComplete='off'
                                                                placeholder='Enter Employee position'
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <FormField
                                                control={employeeForm.control}
                                                name='restaurantId'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Select the Restaurant</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Select the value' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {restaurants.map(restaurant => (
                                                                    <SelectItem value={restaurant.id.toString()} key={restaurant.id}>{restaurant.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}

                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <FormField
                                            control={employeeForm.control}
                                            name='image'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <>
                                                            <img src={field.value || file?.url} alt="profile" className="w-full h-[250px]" />
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
                                    <Button type='submit'>Create Employee</Button>
                                </form>
                            </Form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='flex items-center gap-4 flex-wrap'>
                {employees.map((emp, index) => (
                    <EmployeeCard emp={emp} key={index} />
                ))}
            </div>
        </>
    )
}

export default Page
