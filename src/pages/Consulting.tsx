import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { sendBookingEmail } from "../lib/emailService";

export default function Consulting() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const financialServices = t("consulting.financialServices");
  const quantitativeServices = t("consulting.quantitativeServices");

  const sendEmail = async (data: typeof formData) => {
    await sendBookingEmail('consulting', {
      ...data,
      educationLevel: 'Consulting',
      course: data.subject,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject) {
      toast.error(t("forms.error"));
      return;
    }

    // Store in localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push({
      type: "consulting",
      ...formData,
      educationLevel: 'Consulting',
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    await sendEmail(formData);

    toast.success(t("forms.success"));
    setFormData({ name: "", email: "", subject: "", message: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-gray-900">{t("consulting.title")}</h1>
          <p className="text-lg md:text-xl text-gray-700 font-light mb-6">
            {t("consulting.description")}
          </p>
          <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed max-w-4xl">
            {t("consulting.fullDescription")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-16 text-gray-900">{t("consulting.servicesTitle")}</h2>
          
          {/* Financial Services */}
          <div className="mb-16">
            <h3 className="text-3xl font-playfair font-bold mb-8 text-gray-900">{t("consulting.financialServicesTitle")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(financialServices) ? (financialServices as string[]).map((service: string, index: number) => (
                <div key={index} className="flex gap-4 p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                      <Check size={16} className="text-green-600" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 font-light leading-relaxed">{service}</p>
                </div>
              )) : null}
            </div>
          </div>
          
          {/* Quantitative Services */}
          <div>
            <h3 className="text-3xl font-playfair font-bold mb-8 text-gray-900">{t("consulting.quantitativeServicesTitle")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(quantitativeServices) ? (quantitativeServices as string[]).map((service: string, index: number) => (
                <div key={index} className="flex gap-4 p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                      <Check size={16} className="text-green-600" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 font-light leading-relaxed">{service}</p>
                </div>
              )) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Request Form */}
      <section className="py-20 md:py-28 bg-[#faf8f3]">
        <div className="max-w-2xl mx-auto px-4">
          {!showForm ? (
            <div className="text-center">
              <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900">{t("consulting.readyToConsult")}</h2>
              <p className="text-lg text-gray-700 mb-10 font-light">
                {t("consulting.consultCTA")}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t("consulting.requestConsultation")}
              </button>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-playfair font-bold mb-8 text-gray-900">{t("forms.consultingRequest")}</h2>
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
                    placeholder="e.g., Financial Modeling, Business Plan"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all min-h-32"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {t("forms.submit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border-2 border-gray-400 text-gray-700 hover:border-gray-600 hover:text-gray-900 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    {t("forms.cancel")}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
