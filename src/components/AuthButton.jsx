import React from "react";

function AuthButton({children, ...props}){
    return(
        <button
            {...props}
            className="auth-button"
        >
            {children}
        </button>
    )
}

export default AuthButton