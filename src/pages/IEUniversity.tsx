import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sendBookingEmail } from "../lib/emailService";

export default function IEUniversity() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bba" | "master">("bba");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    date: "",
    time: "",
    message: "",
  });

  const bbaClasses = t("ieUniversity.bbaClasses") as string[];
  const masterClasses = t("ieUniversity.masterClasses") as string[];

  const sendEmail = async (data: typeof formData) => {
    await sendBookingEmail('academy', data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject) {
      toast.error(t("forms.error"));
      return;
    }

    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push({
      type: "session",
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    // Send email
    await sendEmail(formData);

    toast.success(t("forms.success"));
    setFormData({ name: "", email: "", subject: "", date: "", time: "", message: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate("/academy")}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Academy
          </button>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-gray-900">
            {t("ieUniversity.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-light">
            {t("ieUniversity.description")}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("bba")}
              className={`pb-4 px-6 font-semibold text-lg transition-all duration-300 ${
                activeTab === "bba"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("ieUniversity.bba")}
            </button>
            <button
              onClick={() => setActiveTab("master")}
              className={`pb-4 px-6 font-semibold text-lg transition-all duration-300 ${
                activeTab === "master"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("ieUniversity.master")}
            </button>
          </div>

          {/* BBA Classes */}
          {activeTab === "bba" && (
            <div className="space-y-4">
              <h2 className="text-3xl font-playfair font-bold mb-8 text-gray-900">
                {t("ieUniversity.bba")} Classes
              </h2>
              <div className="space-y-3">
                {Array.isArray(bbaClasses) && bbaClasses.map((cls: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">★</span>
                    <p className="text-lg text-gray-700 font-light">{cls}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Master Classes */}
          {activeTab === "master" && (
            <div className="space-y-4">
              <h2 className="text-3xl font-playfair font-bold mb-8 text-gray-900">
                {t("ieUniversity.master")} Classes
              </h2>
              <div className="space-y-3">
                {Array.isArray(masterClasses) && masterClasses.map((cls: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white">
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">★</span>
                    <p className="text-lg text-gray-700 font-light">{cls}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Session Request Form */}
      <section className="py-20 md:py-28 bg-[#faf8f3]">
        <div className="max-w-2xl mx-auto px-4">
          {!showForm ? (
            <div className="text-center">
              <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900">Ready to Start?</h2>
              <p className="text-lg text-gray-700 mb-10 font-light">
                {t("academy.requestCTA")}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t("academy.requestCTA")}
              </button>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-playfair font-bold mb-8 text-gray-900">{t("forms.sessionRequest")}</h2>
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
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all bg-white"
                    required
                  >
                    <option value="">{t("forms.selectClass")}</option>
                    {activeTab === "bba" && Array.isArray(bbaClasses) && bbaClasses.map((cls: string, idx: number) => (
                      <option key={idx} value={cls}>{cls}</option>
                    ))}
                    {activeTab === "master" && Array.isArray(masterClasses) && masterClasses.map((cls: string, idx: number) => (
                      <option key={idx} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-900">
                      {t("forms.date")}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-900">
                      {t("forms.time")}
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    />
                  </div>
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
                    placeholder="Tell us more about your learning goals..."
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
