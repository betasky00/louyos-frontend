import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function GeneralUniversity() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    date: "",
    time: "",
    message: "",
  });

  const renderTitleWithAmpersand = (title: string) => {
    if (title.includes(" & ")) {
      const parts = title.split(" & ");
      return (
        <>
          {parts[0]} <span className="ampersand">&</span> {parts[1]}
        </>
      );
    }
    return title;
  };

  const categories = [
    {
      id: "quantitative",
      title: t("generalUniversity.quantitative.title"),
      subjects: t("generalUniversity.quantitative.subjects"),
    },
    {
      id: "statistics",
      title: t("generalUniversity.statistics.title"),
      subjects: t("generalUniversity.statistics.subjects"),
    },
    {
      id: "finance",
      title: t("generalUniversity.finance.title"),
      subjects: t("generalUniversity.finance.subjects"),
    },
    {
      id: "economics",
      title: t("generalUniversity.economics.title"),
      subjects: t("generalUniversity.economics.subjects"),
    },
    {
      id: "programming",
      title: t("generalUniversity.programming.title"),
      subjects: t("generalUniversity.programming.subjects"),
    },
  ];

  const sendEmail = async (data: typeof formData) => {
    try {
      const emailContent = `New Academy Session Booking from General University\n\nStudent Information:\n- Name: ${data.name}\n- Email: ${data.email}\n- Class: ${data.subject}\n- Preferred Date: ${data.date}\n- Preferred Time: ${data.time}\n- Message: ${data.message}\n\nTimestamp: ${new Date().toISOString()}`;

      const response = await fetch('https://api.manus.im/forge/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          to: 'academy@louyos.com',
          subject: `New Session Booking: ${data.subject}`,
          text: emailContent,
          html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${emailContent}</pre>`,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Email send failed:', response.status, error);
      } else {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Email send error:', error);
    }
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
            {t("generalUniversity.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-light mb-6">
            {t("generalUniversity.description")}
          </p>
          <p className="text-base text-gray-600 font-light">
            {t("generalUniversity.universities")}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-12 text-gray-900">Tutoring Categories</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-white"
              >
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )
                  }
                  className="w-full flex items-center justify-between hover:text-green-600 transition-colors"
                >
                  <h3 className="text-2xl font-playfair font-bold text-gray-900">{renderTitleWithAmpersand(category.title)}</h3>
                  <ChevronDown
                    size={24}
                    className={`transition-transform text-gray-600 ${
                      expandedCategory === category.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedCategory === category.id && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <ul className="space-y-3">
                      {Array.isArray(category.subjects) ? (category.subjects as string[]).map((subject: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-green-600 font-bold mt-1 text-lg">★</span>
                          <span className="text-gray-700 font-light">{subject}</span>
                        </li>
                      )) : null}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
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
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    placeholder="e.g., Python, Calculus, Finance"
                    required
                  />
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
