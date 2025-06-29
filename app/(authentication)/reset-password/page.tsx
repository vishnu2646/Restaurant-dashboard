'use client';
import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem,
    FormField
} from '@/components/ui/form';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MoveLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { ResetSchema } from '@/schemas';
import { reset } from '@/actions/reset';
import Link from 'next/link';

const Page = () => {
    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setSuccess("");
        setError("");
        startTransition(() => {
            reset(values).then(data => {
                setSuccess(data.success);
                setError(data.error);
            });
        });
    }

    return (
        <>
            <Form {...form}>
                <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Reset your password</h1>
                        <p className="text-balance text-sm text-inputDark">
                            Enter your email below to reset password for your account.
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" variant={isPending ? "disabled" : "default"}>
                        Confirm Reset password
                    </Button>
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
