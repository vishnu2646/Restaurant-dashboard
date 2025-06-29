'use client';
import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem,
    FormField
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { register } from '@/actions/register';

const Page = () => {

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SignUpSchema>>({
            resolver: zodResolver(SignUpSchema),
            defaultValues: {
                email: "",
                name: "",
                password: "",
            }
        });

    const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Register your account</h1>
                        <p className="text-balance text-sm text-inputDark">
                            Enter your email below to Create your account
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                className="pl-0 w-full"
                                                type="email"
                                                placeholder="jhon.do@example.com"
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                className="pl-0 w-full"
                                                type="text"
                                                placeholder="Jhon Doe"
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="password">Password</Label>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                className="pl-0 w-full"
                                                type="password"
                                                placeholder="******"
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" className="w-full" disabled={isPending} variant={isPending ? 'disabled' : 'default'}>
                            Register
                        </Button>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-inputDark">
                                Or continue with
                            </span>
                        </div>
                        <div className='flex items-center justify-between flex-wrap md:flex-nowrap gap-2'>
                            <Button variant="outline" className="w-full">
                                <img src='/google.png' alt='logog' className='w-5 h-5'/>
                                Sign up with Google
                            </Button>
                            <Button variant="outline" className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                        fill="currentColor"
                                    />
                                </svg>
                                Sign up with GitHub
                            </Button>
                        </div>
                    </div>
                    <div className="text-center text-sm">
                        Already have an account? {' '}
                        <a href='/sign-in' className="underline underline-offset-4">
                            Sign in
                        </a>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default Page
