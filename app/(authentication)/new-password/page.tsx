'use client';
import React from 'react';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { NewPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MoveLeft } from 'lucide-react';
import { newPassword } from '@/actions/new-password';
import Link from 'next/link';

const Page = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const [success, setSuccess] = useState<string | undefined>('');

    const [error, setError] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    }

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Reset your Password</h1>
                        <p className="text-balance text-sm text-inputDark">
                            Enter new password below to reset your password
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
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
                            Reset Password
                        </Button>
                    </div>
                </form>
            </Form>
            <Link href="/sign-in">
                <Button variant="link" className='px-0 my-4'>
                    <MoveLeft width={15} height={15} />
                    Back to Login
                </Button>
            </Link>
        </>
    )
}

export default Page
