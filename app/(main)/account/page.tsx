'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { accountSchema, updatePasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCurrentUser } from '@/hooks/use-current-user';
import FileUploader from '../components/fileUploader';
import { profile, updatePassword } from '@/actions/profile';
import { FormError } from '@/components/form-error';
import { useSearchParams } from 'next/navigation';
import { getEmployeeById } from '@/actions/restaurant';
import { IEmploye } from '@/types/types';

const Page = () => {

    const searchParams = useSearchParams();

    const employeeId = searchParams.get('emp');

    const user = useCurrentUser();

    const [showUpdatePassword, setShowUpdatePassword] = useState<boolean>(false);

    const [employee, setEmployee] = useState<IEmploye>();

    const [error, setError] = useState<string>();

    const [success, setSuccess] = useState<string>();

    const [file, setFile] = useState<{url: string} | null>(null);

    const form = useForm<z.infer<typeof accountSchema>>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: user?.name as string,
            email: user?.email as string,
            twoFactor: user?.isTwoFactorEnabled as boolean,
            phone: user?.phone,
            image: user?.image as string || '/user.png',
        }
    });

    const passwordForm = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
        }
    });

    const onSubmit = (values: z.infer<typeof accountSchema>) => {
        profile(values).then(data => {
            if(data) {
                setError(data.error || '');
                setSuccess(data.success || '');
            }
        });
    };

    const onPasswordSubmit = (values: z.infer<typeof updatePasswordSchema>) => {
        const { oldPassword, newPassword, reNewPassword } = values;

        if(user) {
            const passwordDetails = {
                email: user.email,
                oldPassword: oldPassword,
                newPassword: newPassword,
                reNewPassword: reNewPassword
            };
            updatePassword(passwordDetails);
        }
    }

    const getEmployeeDetails = async () => {
        try {
            const data = await getEmployeeById(employeeId as string);
            console.log(data.success);
            // setEmployee(data.success);
            // if(data && data.success) {
            //     setEmployee(data.success);
            // }
            // // else if(data && data.error)(
            // //     setError(data.error)
            // // )
        } catch (error) {
            console.log(error);
        }
    }

    if(employeeId) {
        console.log(employeeId);
        getEmployeeDetails();
    }

    return (
        <div>
            <Card className="shadow-sm mb-4">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-2xl font-bold mb-2">Account</h1>
                    </CardTitle>
                    <CardDescription>
                        <p className="text-inputDark text-sm">
                            {employeeId ? 'Employee Information.' : 'Please configure your profile and fill in your information.'}
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name='image'
                                    render={({field}) => (
                                        <FormItem className='mb-2'>
                                            <FormControl>
                                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                                    <img src={field.value || file?.url} alt="profile" className="w-[100px] h-[100px] rounded-full" />
                                                    {!employeeId && (<div>
                                                        <div className="flex gap-2">
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
                                                            <Button variant="outline" size="sm" className="text-primary font-bold" onClick={() => form.setValue('image', '/user.png')}>Remove Photo</Button>
                                                        </div>
                                                        <span className="text-inputDark text-xs">Pick a photo up to 4MB</span>
                                                    </div>)}
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem className='mb-2'>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="w-full pl-0 mt-0"
                                                            placeholder="Enter your first name"
                                                            autoComplete='off'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="w-full pl-0"
                                                            placeholder="Enter your email"
                                                            autoComplete='off'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        {!employeeId &&(<FormField
                                            control={form.control}
                                            name='twoFactor'
                                            render={({ field }) => (
                                                <FormItem className="flex items-start flex-col gap-4 mb-6">
                                                    <FormLabel>Enable 2FA</FormLabel>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />)}
                                        <FormField
                                            control={form.control}
                                            name='phone'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="w-full pl-0"
                                                            placeholder="Enter your phone"
                                                            autoComplete='off'
                                                            type='number'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                {!employeeId && <Button size="sm" className='mt-3'>Update Profile</Button>}
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
            {!employeeId && (<>
                <Card className='shadow-sm mb-4'>
                    <CardContent className='py-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p>Password</p>
                                <span className='text-xs text-inputDark'>Change your password</span>
                            </div>
                            <Button variant="primary" onClick={() => setShowUpdatePassword(true)}>Change Password</Button>
                        </div>
                    </CardContent>
                </Card>
                {showUpdatePassword && (<Card className='shadow-sm'>
                    <CardHeader>
                        <CardTitle>
                            <h2>Update your password</h2>
                        </CardTitle>
                        <CardContent className='pt-4'>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                                    <div className='flex items-center gap-4'>
                                        <div>
                                            <FormField
                                                control={passwordForm.control}
                                                name='oldPassword'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Old Password</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className="w-full pl-0"
                                                                placeholder="Enter your password"
                                                                autoComplete='off'
                                                                type='password'
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <FormField
                                                control={passwordForm.control}
                                                name='newPassword'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>New Password</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className="w-full pl-0"
                                                                placeholder="Enter your password"
                                                                autoComplete='off'
                                                                type='password'
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <FormField
                                                control={passwordForm.control}
                                                name='reNewPassword'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Re New Password</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className="w-full pl-0"
                                                                placeholder="Enter your password"
                                                                autoComplete='off'
                                                                type='password'
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <FormError message={error} />
                                    <FormError message={success} />
                                    <Button className='mt-4' size="sm">Update Password</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </CardHeader>
                </Card>)}
            </>)}
        </div>
    )
}

export default Page
