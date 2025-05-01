import React from "react";

function AuthLayout({children, image, imagePosition = 'right'}){
    return(
    <div className="auth-container">
        {imagePosition === 'left' && (
            <div className="auth-image-container">
                <img src={image} alt="Authentication illustration" className="max-w-[80%] h-auto" />
            </div>
        )}
        <div className="auth-content">
            <div className="auth-form-container">
                {children}
            </div>
        </div>
        {imagePosition === 'right' && (
            <div className="auth-image-container">
                <img src={image} alt="Authentication illustration" className="max-w-[80%] h-auto" />
            </div>
        )}
    </div>
    )
}

export default AuthLayout