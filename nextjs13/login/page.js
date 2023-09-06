'use client';
import { useState, useEffect, useCallback } from "react";
import GoogleLogin from './googleLogin.js';

export default function Page() {
    const [userProfile, setUserProfile] = useState({});
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);

    const callApi = useCallback(async () => {
        // this pattern is to prevent infinite loop, since we will set state in an useEffect,
        // but because next.js doesnt like async in client component, using useEffect to fetch is necessary
        try {
            const res = await fetch('/api/getUser', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const resJson = await res.json();
            if (resJson.result) {
                if (Object.keys(resJson.result).length === 0) {
                    setShowGoogleLogin(true);
                } else {
                    if (resJson.result.email && resJson.result.name) {
                        setUserProfile({
                            email: resJson.result.email,
                            name: resJson.result.name,
                            picture: resJson.result.picture ? resJson.result.picture : "",
                        });
                    } else {
                        throw new Error("Server response missing email and name, responding with",resJson);
                    }
                }
            } else {
                throw new Error("Server response missing result, responding with",resJson);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);
    useEffect(() => {
        callApi();
    }, [callApi]);

    const handleLogin = (userDetail) => {
        if (userDetail.email && userDetail.name) {
            setShowGoogleLogin(false);
            setUserProfile({
                email: userDetail.email,
                name: userDetail.name,
                picture: userDetail.picture ? userDetail.picture : "",
            });
        }
    };
    const handleLogoutClick = async () => {
        const res = await fetch('/works/taiwan-ramen-2023/api/logout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const resJson = await res.json();
        if (resJson.result && resJson.result == 'success') {
            setUserProfile({});
            setShowGoogleLogin(true);
        }
    }
    return (
        <div className="w-full text-xs">
            <pre>{JSON.stringify(userProfile, null, 2)}</pre>
            {
                showGoogleLogin ? (<GoogleLogin handleLogin={handleLogin} />) : (
                <div>
                    {userProfile.email?(<button onClick={handleLogoutClick}>Logged in with {`${userProfile.email}`} Logout</button>):(`wait...`)}
                </div>)
            }
        </div>
    );
}
