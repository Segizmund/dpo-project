import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function CustomSelect({ label, items, isHome, value, onSelect, className, url }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        if (item.href) {
            setIsOpen(false);
            return;
        }
        if (onSelect) {
            onSelect(value?.id === item.id ? null : item);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block" ref={selectRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 font-medium transition duration-300 ease-linear py-2.5 px-6 rounded-full border whitespace-nowrap ${className}
                    ${value 
                        ? 'bg-[#A621F3] text-white border-[#A621F3]' 
                        : (isHome === true 
                            ? 'bg-transparent border-white text-white hover:opacity-60' 
                            : 'bg-transparent border-black hover:opacity-60')
                    }`}
            >
                <span>{value ? value.label : label}</span>
                <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                    {items.map((item, index) => (
                        item.href ? (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`${url === item.href ? 'bg-purple-50 border-[#A621F3] text-[#A621F3]' : ''} block px-5 py-3 text-sm hover:bg-purple-50 hover:text-[#A621F3] transition-colors`}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <button
                                key={index}
                                onClick={() => handleSelect(item)}
                                className={`w-full text-left px-5 py-3 text-sm transition-colors
                                    ${value?.id === item.id 
                                        ? 'bg-purple-100 text-purple-700 font-bold' 
                                        : 'text-gray-700 hover:bg-purple-50 hover:text-[#A621F3]'
                                    }`}
                            >
                                {item.label}
                            </button>
                        )
                    ))}
                    
                    {value && !items[0]?.href && (
                        <button 
                            onClick={() => { onSelect(null); setIsOpen(false); }}
                            className="w-full text-center py-2 text-xs text-red-400 hover:text-red-600 border-t mt-1"
                        >
                            Сбросить
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}