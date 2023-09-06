'use client';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

export default function GoogleLogin({ handleLogin }) {
    if (typeof window !== "undefined") { //prevent next.js build time error
        useGoogleOneTapLogin({
            onError: (error) => { console.log(error); },
            onSuccess: async (response) => { 
                if (response.email) {
                    const callApi = async () => {
                        // this pattern is because you can't directly call async in client component in next.js
                        try {
                            const res = await fetch('/api/login', {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(response),
                            })
                            const resJson = await res.json();
                            if (resJson && resJson.result && resJson.result == 'success') {
                                handleLogin(response);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    };
                    callApi();
                } },
            googleAccountConfigs: {
                client_id: "USE YOUR CLIENT ID"
            },
        });
    }
    return null;
}
