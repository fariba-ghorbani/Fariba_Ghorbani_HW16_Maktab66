import React, { useEffect, useState } from "react";

export default function InputBox(props) {
    

    return (
        <>
            <input 
                placeholder={props.text}
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    ) 
}