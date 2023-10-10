import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    variant = 'primary',
    type = 'button'
}) => {
    const buttonStyles = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded',
        secondary: 'bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded'
    };

    return (
        <button
            type={type}
            className={buttonStyles[variant]}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
