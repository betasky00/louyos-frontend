import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Louyos</h3>
            <p className="text-gray-400">
              Premium tutoring and consulting services for top universities and companies.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              <a href="tel:+34626351439" className="hover:text-green-400 transition-colors">
                {t("contact.phone")}
              </a>
            </p>
            <p className="text-gray-400">
              <a href="mailto:louyos@gmail.com" className="hover:text-green-400 transition-colors">
                {t("contact.email")}
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-green-400 transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="/academy" className="hover:text-green-400 transition-colors">
                  {t("nav.academy")}
                </a>
              </li>
              <li>
                <a href="/consulting" className="hover:text-green-400 transition-colors">
                  {t("nav.consulting")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-400 transition-colors">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Louyos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
