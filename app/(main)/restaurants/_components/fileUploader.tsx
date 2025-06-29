'use client';
import React, { useRef } from 'react';
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { authenticator } from '@/actions/upload';
import { Button } from '@/components/ui/button';

interface RestaurentImageUploaderProps {
    onFileChange: (filePath: string) => void,
    file: {filePath: string} | null,
    setFile: (url: string) => void,
}

const FileUploader: React.FC<any> = ({onFileChange, file, setFile}: RestaurentImageUploaderProps) => {
    const ikUploadRef = useRef(null);

    const onError = (error: any) => {
        console.error(`Error`, error);
    };

    const onSuccess = (res: any) => {
        onFileChange(res.url);
        setFile(res);
    };

    return (
        <ImageKitProvider
            publicKey="public_Gb6FVuTjr1ScaIRiDjujIK+aDcE="
            urlEndpoint="https://ik.imagekit.io/FDvishnu"
            authenticator={authenticator}
        >
            <IKUpload
                className='hidden'
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
            />
            <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={(e) => {
                    e.preventDefault();
                    if(ikUploadRef.current) {
                        // @ts-ignore
                        ikUploadRef.current?.click();
                    }
                }}
            >
                Add Restaurant Image
            </Button>
        </ImageKitProvider>
    )
}

export default FileUploader
