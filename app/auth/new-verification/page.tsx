'use client';
import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const NewVerificationPage = () => {
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState<string | undefined>('');

    const [error, setError] = useState<string | undefined>('');

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const handleSunbmit = useCallback(() => {
        if(success || error) return;

        if(!token) {
            return;
        };

        setLoading(true);
        newVerification(token).then(data => {
            if(data.success) {
                setSuccess(data.success);
            } else if(data.error) {
                setError(data.error);
            }
        }).catch(error => {
            console.error(error);
            setError("Something went wrong")
        });
        setLoading(false);

    }, [token, success, error]);

    useEffect(() => {
        handleSunbmit();
    }, []);

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Card className='flex items-center justify-center flex-col'>
                <CardHeader>
                    <img src='/done-tick.jpg' alt='check-done' className='w-[150px] h-[150px]' />
                </CardHeader>
                <CardContent className='flex items-center justify-center flex-col'>
                    <p className='text-2xl text-inputDark mb-5'>Confirming your verification</p>
                    <ClipLoader
                        color="#fd7658"
                        loading={loading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Link href="/sign-in" className='mt-5'>
                        <Button>Back to Login</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewVerificationPage
