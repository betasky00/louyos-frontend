import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "es" as const, label: "Español", flag: "🇪🇸" },
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
  ];

  const getCurrentFlag = () => {
    return languages.find((lang) => lang.code === language)?.flag || "🇬🇧";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="text-2xl font-playfair font-bold text-green-600 hover:text-green-700 transition-colors">
          Louyos
        </a>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            {t("nav.home")}
          </a>
          <a href="/academy" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            {t("nav.academy")}
          </a>
          <a href="/consulting" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            {t("nav.consulting")}
          </a>
          <a href="/contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            {t("nav.contact")}
          </a>
        </div>

        {/* Right Side - Language Selector and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Language Selector - Flag Icon */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-2xl"
              title={`Current language: ${languages.find((l) => l.code === language)?.label}`}
            >
              {getCurrentFlag()}
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      language === lang.code ? "bg-green-50 text-green-600 font-semibold" : ""
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </a>
            <a
              href="/academy"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.academy")}
            </a>
            <a
              href="/consulting"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.consulting")}
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
