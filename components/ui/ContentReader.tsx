
import React, { useState, useEffect } from 'react';
import type { ContentPage } from '../../types';

interface ContentReaderProps {
    title: string;
    subtitle: string;
    icon: string;
    pages: ContentPage[] | string; // Allow string for simple content
    basePath: string; // e.g., "/tauhid"
}

const ContentReader: React.FC<ContentReaderProps> = ({ title, subtitle, icon, pages, basePath }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [openCollapsibleIndex, setOpenCollapsibleIndex] = useState<number | null>(null);

    useEffect(() => {
        // Scroll to top and reset collapsible state when page changes
        window.scrollTo(0, 0);
        setOpenCollapsibleIndex(null);
    }, [currentPage]);
    
    if (typeof pages === 'string') {
        // Handle simple string content
        return (
            <article className="animate-fade-in">
                <header className="mb-6">
                     <div className="flex items-center mb-4">
                        <i className={`${icon} text-4xl text-primary mr-4`}></i>
                        <div className="flex-grow">
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 italic">{subtitle}</p>
                        </div>
                    </div>
                </header>
                <div className="space-y-6 text-gray-700 dark:text-gray-300 prose prose-invert max-w-none leading-relaxed text-justify whitespace-pre-line">
                   {pages}
                </div>
            </article>
        );
    }
    
    const renderPageContent = (page: ContentPage) => {
        return page.body.map((item, index) => {
            switch (item.type) {
                case 'paragraph':
                    return (
                        <div key={index} className="mb-4">
                            {item.title && <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.title}</h4>}
                            <p className="leading-relaxed text-justify">{item.text}</p>
                        </div>
                    );
                case 'list':
                case 'sublist':
                     return (
                        <div key={index} className={item.type === 'sublist' ? 'pl-6' : ''}>
                            {item.title && <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.title}</h4>}
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                {item.items?.map((listItem, i) => {
                                    if (typeof listItem === 'string') {
                                        return <li key={i}>{listItem}</li>;
                                    } else if (listItem && typeof listItem === 'object' && 'title' in listItem && 'points' in listItem) {
                                        return (
                                            <li key={i}>
                                                <strong>{listItem.title}:</strong>
                                                <ul className="list-disc list-inside pl-6 space-y-1 mt-1">
                                                    {listItem.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                                                </ul>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                    );
                case 'table':
                    return (
                         <div key={index} className="my-6 overflow-x-auto">
                            {item.title && <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.title}</h4>}
                            <table className="min-w-full text-sm border border-gray-600">
                                <thead className="bg-gray-700 dark:bg-gray-900">
                                    <tr>
                                        {item.table?.headers.map((header, hIndex) => (
                                            <th key={hIndex} className="p-2 border-b border-gray-600 text-left">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.table?.rows.map((row, rIndex) => (
                                        <tr key={rIndex} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-600/50 dark:hover:bg-gray-700/50">
                                            {row.map((cell, cIndex) => (
                                                <td key={cIndex} className="p-2 border-r border-gray-700 last:border-r-0">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                case 'collapsible':
                    const isOpen = openCollapsibleIndex === index;
                    return (
                        <div key={index} className="my-4 border border-slate-600 rounded-lg">
                            <button
                                onClick={() => setOpenCollapsibleIndex(isOpen ? null : index)}
                                className={`w-full flex justify-between items-center p-3 bg-slate-700 hover:bg-slate-600 transition-colors ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
                                aria-expanded={isOpen}
                            >
                                <h4 className="font-semibold text-gray-200 text-left">
                                    <i className="fas fa-file-alt mr-3 text-primary"></i>
                                    {item.title}
                                </h4>
                                <i className={`fas fa-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            {isOpen && (
                                <div className="p-4 bg-slate-800/50 rounded-b-lg animate-fade-in">
                                    <ul className="space-y-4 text-gray-300">
                                        {item.items?.map((listItem, i) => {
                                            if (typeof listItem === 'string') {
                                                return <li key={i} className="list-disc list-inside">{listItem}</li>;
                                            } else if (listItem && typeof listItem === 'object' && 'title' in listItem && 'points' in listItem) {
                                                 return (
                                                    <li key={i} className="list-none"> {/* Reset list style for the container */}
                                                        <h5 className="font-semibold text-gray-100">{listItem.title}</h5>
                                                        <ul className="list-disc list-inside pl-5 mt-1 space-y-1 text-gray-400">
                                                            {listItem.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                                                        </ul>
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    const progressPercentage = pages.length > 1 ? ((currentPage + 1) / pages.length) * 100 : 100;

    return (
        <article className="animate-fade-in">
            <header className="mb-6">
                 <div className="flex items-center mb-4">
                    <i className={`${icon} text-4xl text-primary mr-4`}></i>
                    <div className="flex-grow">
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 italic">{subtitle}</p>
                    </div>
                </div>
            </header>
            
            {pages.length > 1 && (
                <div className="mb-6">
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">Halaman {currentPage + 1} dari {pages.length}</p>
                </div>
            )}

            <div className="space-y-6 text-gray-700 dark:text-gray-300 prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">{pages[currentPage].title}</h2>
                {renderPageContent(pages[currentPage])}
            </div>
            
            {pages.length > 1 && (
                <nav className="mt-8 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 0}
                        className="px-6 py-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Sebelumnya
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage >= pages.length - 1}
                        className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Berikutnya <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </nav>
            )}
        </article>
    );
};

export default ContentReader;
