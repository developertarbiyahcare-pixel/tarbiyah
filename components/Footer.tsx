import React from 'react';
import Card from './ui/Card';

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12 border-t-2 border-gray-300 dark:border-gray-700 pt-6">
            <div className="flex justify-center items-center gap-3">
                <p className="font-bold">© {new Date().getFullYear()} TARBIYAH CARE PREMIUM | All Rights Reserved.</p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                <a href="https://www.instagram.com/r_besar.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-xl"><i className="fab fa-instagram"></i></a>
            </div>
        </footer>
    );
};

export default Footer;