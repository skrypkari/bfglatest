import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

// Вынеси cva наружу, чтобы TypeScript корректно обработал типизацию
const buttonVariants = cva(
    ['font-bold', 'transition-all'],
    {
        variants: {
            type: {
                primary: ['bg-emerald-600', 'rounded-xl', 'text-white', 'hover:bg-emerald-500', 'cursor-pointer'],
                outline: ['border', 'border-emerald-600', 'rounded-xl', 'text-white', 'hover:bg-emerald-600', 'cursor-pointer'],
            },
            size: {
                sm: ['text-sm', 'p-2'],
                md: ['text-base', 'p-2.5'],
            },
        },
        defaultVariants: {
            type: 'primary',
            size: 'md',
        },
    }
);

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    type?: 'primary' | 'outline'; // типы для варианта
    size?: 'sm' | 'md'; // размеры для варианта
    onClick?: React.MouseEventHandler<HTMLButtonElement>
} & VariantProps<typeof buttonVariants>;

const Button = ({ children, className, type = 'primary', size = 'md', onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className={buttonVariants({ type, size }) + ` ${className}`}>
            {children}
        </button>
    );
};

export default Button;
