
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface NavItem {
    id: string;
    icon: string;
    to?: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { id: 'beranda', icon: 'fas fa-home', to: '/beranda' },
    { id: 'tarbiyah-journey', icon: 'fas fa-crown', to: '/tarbiyah-journey' },
    { id: 'journey_ai_title', icon: 'fas fa-user-cog', to: '/tarbiyah-personal' },
    { id: 'jurnal-muhasabah', icon: 'fas fa-book-medical', to: '/jurnal-muhasabah' },
    { id: 'lentera-hati', icon: 'fas fa-lightbulb', to: '/lentera-hati' },
    { id: 'bimbingan', icon: 'fas fa-hands-helping', to: '/bimbingan' },
    { id: 'mushaf', icon: 'fas fa-book-quran', to: '/mushaf' },
    { id: 'tahsin-ai', icon: 'fas fa-microphone-lines', to: '/tahsin-ai' },
    { id: 'kalender', icon: 'fas fa-calendar-alt', to: '/kalender' },
    { id: 'doaharian', icon: 'fas fa-praying-hands', to: '/doaharian' },
    { id: 'pustaka_ilmu', icon: 'fas fa-book-open', to: '/pustaka-ilmu' },
    { id: 'halal', icon: 'fas fa-check-double', to: '/halal' },
    { id: 'kalkulator', icon: 'fas fa-calculator', to: '/kalkulator' },
    { id: 'masjid_terdekat', icon: 'fas fa-map-marked-alt', to: '/masjid-terdekat' },
    { id: 'tasbih', icon: 'fas fa-hand-pointer', to: '/tasbih-digital' },
    { id: 'roadmap', icon: 'fas fa-road', to: '/roadmap' },
    { id: 'kuis', icon: 'fas fa-question-circle', to: '/kuis' },
    { id: 'khutbah-generator', icon: 'fas fa-microphone-alt', to: '/khutbah-generator' },
    { id: 'donasi', icon: 'fas fa-donate', to: '/donasi' },
    { id: 'sumber', icon: 'fas fa-link', to: '/sumber' },
    { id: 'laporan_spiritual', icon: 'fas fa-chart-line', to: '/laporan-spiritual' },
    { id: 'testimoni', icon: 'fas fa-star', to: '/testimoni' },
    { id: 'faq', icon: 'fas fa-info-circle', to: '/faq' },
    { id: 'thanks-to', icon: 'fas fa-heart', to: '/thanks-to' },
    { id: 'tentang_kami', icon: 'fas fa-users-cog', to: '/tentang-kami' },
];

interface SidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    isLandingPage: boolean;
    isDeveloper: boolean;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen, isLandingPage, isDeveloper, onLogout }) => {
    const location = useLocation();
    const { t } = useLanguage();
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    useEffect(() => {
        const activeCategory = navItems.find(item => 
            item.children && item.children.some(child => location.pathname.startsWith(child.to!))
        );
        if (activeCategory) {
            setOpenCategory(activeCategory.id);
        }
    }, [location.pathname]);

    const handleCategoryToggle = (categoryId: string) => {
        setOpenCategory(prev => (prev === categoryId ? null : categoryId));
    };

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClass = `flex items-start p-3 rounded-lg text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-200`;
        const activeClass = 'bg-slate-700 text-primary font-semibold border-l-4 border-primary';
        return `${baseClass} ${isActive ? activeClass : ''}`;
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <aside className={`fixed inset-0 z-50 bg-slate-900 w-full h-full transform transition-transform duration-300 ease-in-out ${isSidebarOpen && !isLandingPage ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4 flex flex-col h-full max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-6">
                    <Link to="/beranda" onClick={closeSidebar} className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-primary">
                        <i className="fa-solid fa-leaf"></i>
                        <span className="leading-tight">TARBIYAH CARE PREMIUM</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="text-3xl text-gray-300 hover:text-white transition-colors" aria-label="Tutup sidebar">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <nav className="flex-grow space-y-2 overflow-y-auto no-scrollbar pb-4">
                    {navItems.map(item => {
                        if (item.children) {
                            const isOpen = openCategory === item.id;
                            const isChildActive = item.children.some(child => location.pathname.startsWith(child.to!));

                            return (
                                <div key={item.id}>
                                    <button
                                        onClick={() => handleCategoryToggle(item.id)}
                                        className={`w-full flex items-start p-3 rounded-lg text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-200 ${isChildActive ? 'text-white' : ''}`}
                                    >
                                        <i className={`${item.icon} w-6 text-center pt-1`}></i>
                                        <span className="ml-3 flex-1 leading-snug text-left">{item.id === 'journey_ai_title' || item.id === 'tasbih' ? t(item.id as any) : t(item.id as any)}</span>
                                        <i className={`fas fa-chevron-right transition-transform duration-200 pt-1 ${isOpen ? 'rotate-90' : ''}`}></i>
                                    </button>
                                    {isOpen && (
                                        <div className="pl-6 space-y-2 mt-1">
                                            {item.children.map(child => (
                                                <NavLink
                                                    key={child.id}
                                                    to={child.to!}
                                                    onClick={closeSidebar}
                                                    className={getNavLinkClass}
                                                >
                                                    <i className={`${child.icon} w-6 text-center pt-1`}></i>
                                                    <span className="ml-3 flex-1 leading-snug">{t(child.id as any)}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.to!}
                                    onClick={closeSidebar}
                                    end={item.to === '/beranda' || item.to === '/pustaka-ilmu'}
                                    className={getNavLinkClass}
                                >
                                    <i className={`${item.icon} w-6 text-center pt-1`}></i>
                                    <span className="ml-3 flex-1 leading-snug">{item.id === 'journey_ai_title' || item.id === 'tasbih' || item.id === 'tahsin-ai' ? (item.id === 'tahsin-ai' ? 'Tahsin AI' : t(item.id as any)) : t(item.id as any)}</span>
                                </NavLink>
                            );
                        }
                    })}
                    
                    {isDeveloper && (
                        <>
                            <div className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Developer
                            </div>
                            <NavLink
                                to="/admin"
                                onClick={closeSidebar}
                                className={getNavLinkClass}
                            >
                                <i className="fas fa-user-shield w-6 text-center pt-1"></i>
                                <span className="ml-3 flex-1 leading-snug">Management</span>
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="flex-shrink-0 border-t border-slate-700 pt-4 pb-2 flex justify-center">
                    <button
                        onClick={() => {
                            onLogout();
                            closeSidebar();
                        }}
                        className="p-3 rounded-lg text-red-400 hover:bg-red-900/50 hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                        aria-label="Logout"
                    >
                        <span className="font-bold">Keluar</span>
                        <i className="fas fa-sign-out-alt text-xl"></i>
                    </button>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;
