import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t("forms.error"));
      return;
    }

    // Store in localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push({
      type: "contact",
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    toast.success(t("forms.success"));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-gray-900">{t("contact.title")}</h1>
          <p className="text-lg md:text-xl text-gray-700 font-light">
            {t("contact.description")}
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-12 text-gray-900">Get in Touch</h2>

              <div className="space-y-10">
                {/* Phone */}
                <div className="flex gap-6">
                  <div className="p-3 bg-green-50 rounded-lg h-fit">
                    <Phone size={28} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Phone</h3>
                    <a
                      href="tel:+34626351439"
                      className="text-gray-700 hover:text-green-600 transition-colors text-lg font-light"
                    >
                      {t("contact.phone")}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6">
                  <div className="p-3 bg-green-50 rounded-lg h-fit">
                    <Mail size={28} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Email</h3>
                    <div className="space-y-2">
                      <a
                        href="mailto:academy@louyos.com"
                        className="text-gray-700 hover:text-green-600 transition-colors text-lg font-light block"
                      >
                        academy@louyos.com
                      </a>
                      <a
                        href="mailto:consulting@louyos.com"
                        className="text-gray-700 hover:text-green-600 transition-colors text-lg font-light block"
                      >
                        consulting@louyos.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Availability</h3>
                  <p className="text-gray-700 mb-2 font-light">Monday - Friday: 9:00 AM - 6:00 PM (CET)</p>
                  <p className="text-gray-700 font-light">Saturday: 10:00 AM - 2:00 PM (CET)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-12 text-gray-900">{t("contact.formTitle")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("forms.name")}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("forms.email")}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("forms.subject")}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("forms.message")}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all min-h-40"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {t("forms.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
