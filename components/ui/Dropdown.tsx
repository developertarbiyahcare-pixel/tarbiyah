
import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
    value: string;
    label: React.ReactNode;
}

interface DropdownProps {
    items: DropdownItem[];
    selectedValue: string;
    onSelect: (value: string) => void;
    label?: string;
    placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ items, selectedValue, onSelect, label, placeholder = 'Pilih...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedItem = items.find(item => item.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
        <div className="relative" ref={dropdownRef}>
             {label && <label className="block text-sm font-medium text-gray-200 mb-1">{label}</label>}
            <button
                type="button"
                className="w-full flex justify-between items-center p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className={`flex items-center ${!selectedItem ? 'text-gray-400' : ''}`}>{selectedItem?.label || placeholder}</span>
                <i className={`fas fa-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                >
                    {items.map(item => (
                        <li
                            key={item.value}
                            className="flex items-center px-4 py-2 text-gray-200 hover:bg-slate-600 cursor-pointer transition-colors duration-150"
                            role="menuitem"
                            onClick={() => {
                                onSelect(item.value);
                                setIsOpen(false);
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;