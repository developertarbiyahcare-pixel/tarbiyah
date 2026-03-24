
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import { istilahData } from '../../data/istilah';

const Istilah: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState('All');
    const listRef = useRef<HTMLDivElement>(null);
    const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const filteredIstilah = useMemo(() => {
        let items = istilahData;
        if (activeLetter !== 'All') {
            items = items.filter(item => item.term.toUpperCase().startsWith(activeLetter));
        }
        if (searchTerm) {
            items = items.filter(item =>
                item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.definition.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return items;
    }, [searchTerm, activeLetter]);

    const alphabet = [...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

    const handleLetterClick = (letter: string) => {
        setActiveLetter(letter);
        setSearchTerm(''); // Reset search term when letter is clicked
        const targetElement = letterRefs.current[letter];
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    const groupedTerms = useMemo(() => {
        return istilahData.reduce((acc, item) => {
            const firstLetter = item.term.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
            return acc;
        }, {} as Record<string, typeof istilahData>);
    }, []);

    const renderTerms = () => {
        if (searchTerm) {
            if (filteredIstilah.length === 0) {
                 return <p className="text-center text-gray-400 p-4">Istilah tidak ditemukan.</p>;
            }
            return filteredIstilah.map((item) => (
                 <div key={item.term} className="py-3">
                    <h4 className="font-bold text-lg text-primary">{item.term}</h4>
                    <p className="text-gray-300 text-sm">{item.definition}</p>
                </div>
            ));
        }
        
        return Object.keys(groupedTerms).sort().map(letter => (
            <div key={letter} ref={el => letterRefs.current[letter] = el} className="pt-4">
                <h3 className="text-2xl font-bold text-white bg-gray-700 dark:bg-gray-900 py-2 px-3 rounded-lg sticky top-0 z-10">{letter}</h3>
                <div className="divide-y divide-gray-700 dark:divide-gray-800">
                    {groupedTerms[letter].map(item => (
                        <div key={item.term} className="py-3">
                            <h4 className="font-bold text-lg text-primary">{item.term}</h4>
                            <p className="text-gray-300 text-sm">{item.definition}</p>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };


    return (
        <section id="istilah" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Istilah Penting dalam Islam</h2>
            
            <Card className="sticky top-0 lg:top-4 z-20 mb-6">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Cari istilah... (contoh: Aqidah, Fiqh)"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setActiveLetter('All');
                        }}
                        className="w-full p-3 border border-gray-500 rounded-lg bg-gray-700 text-white focus:ring-primary focus:border-primary"
                    />
                </div>
                 <div className="mt-4 flex flex-wrap justify-center gap-1">
                    {alphabet.map(letter => (
                        <button
                            key={letter}
                            onClick={() => handleLetterClick(letter)}
                            className={`w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm font-bold rounded-md transition-colors ${
                                activeLetter === letter && !searchTerm
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </Card>

            <Card>
                <div ref={listRef} className="max-h-[calc(100vh-20rem)] overflow-y-auto no-scrollbar relative pb-4">
                   {renderTerms()}
                </div>
            </Card>
        </section>
    );
};

export default Istilah;
