export const authenticator = async (): Promise<{ token: string; expire: number; signature: string }> => {
    try {
        const response = await fetch(`http://localhost:3000/api/imagekit`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (!data?.token || !data?.expire || !data?.signature) {
            throw new Error("Missing required data: token, expire, or signature.");
        }

        const { signature, expire, token } = data;

        return { token, expire, signature };
    } catch (error: any) {
        console.log('Authentication failed:' + error.message);
        throw new Error('Failed to authenticate ImageKit');
    }
}