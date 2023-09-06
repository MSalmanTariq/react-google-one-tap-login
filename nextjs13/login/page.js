import { useState, useEffect } from "react";
import GoogleLogin from './googleLogin.js';

export default function Page() {
    const [userProfile, setUserProfile] = useState({});
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);

    useEffect(() => {
        fetch('/api/getUser')
            .then(res => res.json())
            .then(resJson => {
				// Parsing user info
                if (resJson.result && resJson.result.email && resJson.result.name) {
                    setUserProfile({
                        email: resJson.result.email,
                        name: resJson.result.name,
                        picture: resJson.result.picture || "",
                    });
                } else {
                    setShowGoogleLogin(true);
                }         
            }).catch(console.error);
    }, []);

	// Handle user login and logout
    const handleLogin = (userDetail) => {
        setShowGoogleLogin(false);
        setUserProfile(userDetail);
    };

    const handleLogout = () => {
        fetch('/api/logout')
            .then(res => res.json())
            .then(resJson => {
				// Checking logout status
				if (resJson.result === 'success') {
                    setUserProfile({});
                    setShowGoogleLogin(true);
                }
            }).catch(console.error);
    };

	// Front-end rendering
    return (
        <div className="w-full text-xs">
            <pre>{JSON.stringify(userProfile, null, 2)}</pre>
            {
                showGoogleLogin ? 
				<GoogleLogin handleLogin={handleLogin} /> :
				<button onClick={handleLogout}>Logged in with {userProfile.email} - Logout</button>
            }
        </div>
    );
}
