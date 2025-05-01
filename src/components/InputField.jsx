import React from "react";

function InputField({label, className="", ...props}){
    return(
    <div className="mb-5">
        <label htmlFor={props.id} className="block text-sm font-normal mb-1">
            {label}
        </label>
        <input
            {...props}
            className={`auth-input ${className}`}
        />
    </div>
    );
}

export default InputField