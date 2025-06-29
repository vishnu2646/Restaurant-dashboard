'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem,
    FormField
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';
import SocialButtons from '../components/socialButtons';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {

    const [error, setError] = useState<string | undefined>("");

    const [success, setSuccess] = useState<string | undefined>("");

    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

    const searchParams = useSearchParams();

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email has already been used" : "";

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values).then(data => {
                if(data && data.error) {
                    form.reset();
                    setError(data.error);
                } else if (data && data.success) {
                    form.reset();
                    setSuccess(data.success);
                }

                if(data.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(error => {
                console.log(error);
                setError("Something went wrong.");
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
                        <h1 className="text-2xl font-bold">Login to your account</h1>
                        <p className="text-balance text-sm text-inputDark">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-6">
                        {
                            showTwoFactor && (
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        className="pl-0 w-full"
                                                        placeholder="123456"
                                                        autoComplete="off"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )
                        }
                        {
                            !showTwoFactor && (
                                <>
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
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center">
                                                        <Label htmlFor="password">Password</Label>
                                                        <a
                                                            href="/reset-password"
                                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                                        >
                                                            Forgot your password?
                                                        </a>
                                                    </div>
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
                                </>
                            )
                        }
                        <FormError message={error || urlError} />
                        <FormSuccess message={success} />
                        <Button type="submit" className="w-full" disabled={isPending} variant={isPending ? 'disabled' : 'default'}>
                            {showTwoFactor ? 'Confirm' : 'Login'}
                        </Button>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-inputDark">
                                Or continue with
                            </span>
                        </div>
                    </div>
                </form>
            </Form>
            <div className='mt-5'>
                <SocialButtons />
                <div className="text-center text-sm mt-4">
                    Don't have an account? {' '}
                    <a href='/sign-up' className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </div>
        </>
    )
}
