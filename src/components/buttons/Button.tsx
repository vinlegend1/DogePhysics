import React from 'react'

interface Props {
    outline: boolean;
    size: "sm" | "md" | "lg";
    onMouseEnter: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave: React.MouseEventHandler<HTMLButtonElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({ outline, size, onMouseEnter, onMouseLeave, children, onClick }) => {
    return (
        <button className={`btn-${outline ? "outline-" : ""}${size}`} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </button>
    )
}

export default Button
