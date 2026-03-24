
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className = '', ...props }, ref) => {
    return (
        <div ref={ref} className={`bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-xl transition-all duration-300 ease-in-out ${className}`} {...props}>
            {children}
        </div>
    );
});

export default Card;
