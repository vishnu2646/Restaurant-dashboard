import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: 'public_Gb6FVuTjr1ScaIRiDjujIK+aDcE=',
    privateKey: 'private_6m684VuZ8IWk2HOd/XboZCiHMDo=',
    urlEndpoint: 'https://ik.imagekit.io/FDvishnu',
});

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}
