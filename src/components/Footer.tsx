import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

export default function Footer() {
  const { t } = useLanguage();
  const [showLegalModal, setShowLegalModal] = useState<"notice" | "cookies" | "data" | null>(null);

  const legalContent = {
    notice: {
      title: t("footer.legalNotice"),
      content: `Louyos Academy & Consulting is a private tutoring and consulting company dedicated to providing educational services and business consulting. Our services are designed to support students and companies in their academic and professional development.

All materials, content, and services provided by Louyos are protected by intellectual property laws. Unauthorized reproduction, distribution, or use of our content is strictly prohibited.

As a provider of educational and consulting services, Louyos Academy & Consulting operates under Spanish law and maintains all necessary legal protections for both our business operations and client relationships. We are committed to providing high-quality services in compliance with all applicable regulations.

For any legal inquiries or concerns, please contact us at louyos_academy@louyos.com.`,
    },
    cookies: {
      title: t("footer.cookiePolicy"),
      content: `Louyos Academy & Consulting uses cookies and similar technologies to enhance your browsing experience and provide personalized services. Cookies are small files stored on your device that help us understand how you use our website.

Types of Cookies We Use:
- Essential cookies: Required for basic website functionality
- Analytics cookies: Help us understand user behavior and improve our services
- Preference cookies: Remember your language and settings

By using our website, you consent to our use of cookies. You can manage cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.

We are committed to protecting your privacy and ensuring transparency in our data practices. For more information about how we handle your data, please review our Data Protection policy.`,
    },
    data: {
      title: t("footer.dataProtection"),
      content: `Louyos Academy & Consulting is committed to protecting your personal data and ensuring compliance with applicable data protection regulations. We implement comprehensive security measures to safeguard your information.

Data We Collect:
- Contact information (name, email, phone)
- Educational background and learning goals
- Session preferences and scheduling information
- Payment and billing information

How We Use Your Data:
- To provide tutoring and consulting services
- To communicate about sessions and services
- To improve our offerings and customer experience
- To comply with legal obligations

Your Rights:
You have the right to access, correct, or delete your personal data. You may also request data portability or object to certain processing activities. To exercise these rights, please contact us at louyos_academy@louyos.com.

Data Security:
We employ industry-standard encryption and security protocols to protect your information. All staff members are trained in data protection best practices.

For any data protection inquiries or concerns, please contact our data protection team at louyos_academy@louyos.com.`,
    },
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4">Louyos</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {t("footer.about")}
              </p>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-bold mb-4 text-lg">{t("footer.contactTitle")}</h3>
              <p className="text-gray-400 mb-3 font-light">
                {t("footer.address")}
              </p>
              <p className="text-gray-400 mb-3 font-light">
                {t("footer.city")}
              </p>
              <p className="text-gray-400 mb-6 font-light">
                {t("footer.country")}
              </p>
              <p className="text-gray-400 mb-2">
                <a href="tel:+34626351439" className="hover:text-green-400 transition-colors font-light">
                  {t("contact.phone")}
                </a>
              </p>
              <p className="text-gray-400">
                <a href="mailto:louyos_academy@louyos.com" className="hover:text-green-400 transition-colors font-light">
                  louyos_academy@louyos.com
                </a>
              </p>
              <p className="text-gray-400">
                <a href="mailto:louyos-consulting@louyos.com" className="hover:text-green-400 transition-colors font-light">
                  louyos-consulting@louyos.com
                </a>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4 text-lg">{t("footer.quickLinksTitle")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/" className="hover:text-green-400 transition-colors font-light">
                    {t("nav.home")}
                  </a>
                </li>
                <li>
                  <a href="/academy" className="hover:text-green-400 transition-colors font-light">
                    {t("nav.academy")}
                  </a>
                </li>
                <li>
                  <a href="/consulting" className="hover:text-green-400 transition-colors font-light">
                    {t("nav.consulting")}
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-green-400 transition-colors font-light">
                    {t("nav.contact")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold mb-4 text-lg">{t("footer.legalTitle")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setShowLegalModal("notice")}
                    className="hover:text-green-400 transition-colors font-light text-left"
                  >
                    {t("footer.legalNotice")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowLegalModal("cookies")}
                    className="hover:text-green-400 transition-colors font-light text-left"
                  >
                    {t("footer.cookiePolicy")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowLegalModal("data")}
                    className="hover:text-green-400 transition-colors font-light text-left"
                  >
                    {t("footer.dataProtection")}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 font-light">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-playfair font-bold text-gray-900">
                  {legalContent[showLegalModal].title}
                </h2>
                <button
                  onClick={() => setShowLegalModal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="text-gray-700 font-light leading-relaxed whitespace-pre-wrap">
                {legalContent[showLegalModal].content}
              </div>
              <button
                onClick={() => setShowLegalModal(null)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
