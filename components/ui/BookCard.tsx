import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
    to: string;
    icon: string;
    title: string;
    subtitle: string;
}

const BookCard: React.FC<BookCardProps> = ({ to, icon, title, subtitle }) => {
    return (
        <Link 
            to={to} 
            className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-2 aspect-[2/3]"
        >
            <div className="flex flex-col h-full bg-gradient-to-b from-slate-700 to-slate-800 p-4 border border-slate-600">
                <div className="flex-grow flex items-center justify-center">
                    <i className={`${icon} text-5xl text-primary group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-white text-md leading-tight">{title}</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{subtitle}</p>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;
