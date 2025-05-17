import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Language names in their own language
const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português'
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-violet-300 hover:text-white hover:bg-indigo-900/50">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-indigo-900/80 backdrop-blur-sm border-indigo-600/30">
        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={`cursor-pointer text-violet-200 hover:text-white hover:bg-indigo-800/70 ${
              i18n.language === code ? 'bg-indigo-700/70 text-white' : ''
            }`}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;