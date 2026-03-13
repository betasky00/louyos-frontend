import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default function Consulting() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const services = t("consulting.services");

  const handleSubmit = (e: React.FormEvent) => {
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
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    toast.success(t("forms.success"));
    setFormData({ name: "", email: "", subject: "", message: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t("consulting.title")}</h1>
          <p className="text-xl text-gray-600">
            {t("consulting.description")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(services) ? (services as string[]).map((service: string, index: number) => (
              <div key={index} className="flex gap-4 p-6 border border-gray-200 rounded-lg">
                <Check size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg">{service}</p>
              </div>
            )) : null}
          </div>
        </div>
      </section>

      {/* Consulting Request Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          {!showForm ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Consult?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Let's discuss your business needs and how we can help.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Request a Consultation
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">{t("forms.consultingRequest")}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("forms.name")}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("forms.email")}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("forms.subject")}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="e.g., Financial Modeling, Business Plan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("forms.message")}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 min-h-32"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                    {t("forms.submit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
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
