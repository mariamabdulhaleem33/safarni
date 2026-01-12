import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronRight, Loader2, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { AVAILABLE_LANGUAGES } from '../../../constants/profile.constants';
import { setTranslateCookie, getCurrentLanguage } from '../../../utils/profile.utils';
import type { Language } from '../../../types/profile.types';

export const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLangCode = localStorage.getItem('selectedLanguage') || getCurrentLanguage();
    const selectedLanguage = AVAILABLE_LANGUAGES.find(l => l.code === currentLangCode) || AVAILABLE_LANGUAGES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageSelect = (language: Language): void => {
        if (language.code === selectedLanguage.code) {
            setIsOpen(false);
            return;
        }

        setIsChanging(true);
        setIsOpen(false);
        localStorage.setItem('selectedLanguage', language.code);
        setTranslateCookie(language.code);

        toast.success(`Changing to ${language.name}...`, {
            icon: language.flag,
            duration: 1000,
        });

        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <div
                onClick={() => !isChanging && setIsOpen(!isOpen)}
                className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <Globe size={22} className="text-gray-600 stroke-[1.5]" />
                    <span className="font-medium text-base text-gray-800">App Language</span>
                </div>

                <div className="flex items-center gap-2">
                    {isChanging ? (
                        <Loader2 size={18} className="animate-spin text-blue-500" />
                    ) : (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                            <span>{selectedLanguage.flag}</span>
                            <span>{selectedLanguage.name}</span>
                        </span>
                    )}
                    <ChevronRight
                        size={20}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg z-50 overflow-hidden">
                    {AVAILABLE_LANGUAGES.map((language) => (
                        <div
                            key={language.code}
                            onClick={() => handleLanguageSelect(language)}
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedLanguage.code === language.code ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{language.flag}</span>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800">{language.name}</span>
                                    <span className="text-sm text-gray-500">{language.nativeName}</span>
                                </div>
                            </div>
                            {selectedLanguage.code === language.code && (
                                <Check size={20} className="text-blue-500" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};