import React, { useEffect } from 'react';

const CustomLogin: React.FC = () => {

    useEffect(() => {
        // Set the cookie when the component mounts
        const expirationDays = 1; // Set cookie to expire in 1 day
        const date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000)); // Milliseconds
        const expires = "expires=" + date.toUTCString();

        // Set the cookie
        document.cookie = `force_redirect=to_ai; path=/; ${expires}`;
    }, []); // Empty dependency array ensures this runs only once on mount
    const handleLogin = () => {
        // Perform the redirect
        const redirectUrl = 'https://authlab.test/wp-login.php?force_redirect=1&from=authlab_ai';
        window.location.href = redirectUrl;
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login with AuthLab</h2>
                <button className="login-button" onClick={handleLogin}>
                    Login with AuthLab.test
                </button>
            </div>
        </div>
    );
};

export default CustomLogin;
