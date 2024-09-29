import React from 'react';

const CustomLogin: React.FC = () => {

    const handleLogin = () => {
        // Perform the redirect
        const redirectUrl = 'https://authlab.test/?from=authlab_ai';
        window.location.href = redirectUrl;
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login with AuthLab</h2>
                <button className="login-button" onClick={handleLogin}>
                    Click to Proceed
                </button>
            </div>
        </div>
    );
};

export default CustomLogin;
