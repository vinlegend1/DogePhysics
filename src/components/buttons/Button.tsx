import React from 'react'

interface Props {
    outline: boolean;
    size: "sm" | "md" | "lg";
}

const Button: React.FC<Props> = ({ outline, size, children }) => {
    return (
        <button className={`btn-${outline ? "outline-" : ""}${size}`}>
            {children}
        </button>
    )
}

export default Button
