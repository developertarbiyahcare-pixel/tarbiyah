
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface PageHeaderProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    showBackButton?: boolean;
    backPath?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ isSidebarOpen, setSidebarOpen, showBackButton, backPath }) => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between bg-gray-200 dark:bg-slate-800 px-4 sm:px-6 md:px-8 py-4 border-b border-gray-300 dark:border-slate-700 shadow-lg rounded-b-lg">
            <div className="flex items-center space-x-4">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-2xl text-gray-600 dark:text-gray-100" aria-label="Toggle sidebar">
                    <i className="fas fa-bars"></i>
                </button>
                {showBackButton && (
                    <button onClick={backPath ? () => navigate(backPath) : () => navigate(-1)} className="text-2xl text-gray-600 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors" aria-label="Kembali">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                )}
            </div>
            <div className="text-center">
                <h1 className="flex items-center justify-center gap-2 text-lg font-bold text-primary whitespace-nowrap">
                    <i className="fa-solid fa-leaf"></i>
                    <span>TARBIYAH CARE PREMIUM</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Islamic Wellness & Life Guidance
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/profil" className="text-2xl text-gray-600 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors" aria-label="Profil Pengguna">
                    <i className="fas fa-user-circle"></i>
                </Link>
                <Link to="/pengaturan" className="text-2xl text-gray-600 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors" aria-label="Pengaturan">
                    <i className="fas fa-cog"></i>
                </Link>
            </div>
        </header>
    );
};

export default PageHeader;
