import React from "react";

export default function InputBox(props) {
    
    return (
        <>
            <input
                className="w-100" 
                placeholder={props.text}
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    ) 
}