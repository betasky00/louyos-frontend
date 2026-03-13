import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function Academy() {
  const { t } = useLanguage();
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

  const categories = [
    {
      id: "quantitative",
      title: t("academy.categories.quantitative.title"),
      subjects: t("academy.categories.quantitative.subjects"),
    },
    {
      id: "statistics",
      title: t("academy.categories.statistics.title"),
      subjects: t("academy.categories.statistics.subjects"),
    },
    {
      id: "finance",
      title: t("academy.categories.finance.title"),
      subjects: t("academy.categories.finance.subjects"),
    },
    {
      id: "economics",
      title: t("academy.categories.economics.title"),
      subjects: t("academy.categories.economics.subjects"),
    },
    {
      id: "programming",
      title: t("academy.categories.programming.title"),
      subjects: t("academy.categories.programming.subjects"),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject) {
      toast.error(t("forms.error"));
      return;
    }

    // Store in localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push({
      type: "session",
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    toast.success(t("forms.success"));
    setFormData({ name: "", email: "", subject: "", date: "", time: "", message: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t("academy.title")}</h1>
          <p className="text-xl text-gray-600 mb-4">
            {t("academy.description")}
          </p>
          <p className="text-base text-gray-600">
            {t("academy.formats")}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Tutoring Categories</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-6">
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )
                  }
                  className="w-full flex items-center justify-between hover:text-green-600 transition-colors"
                >
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <ChevronDown
                    size={24}
                    className={`transition-transform ${
                      expandedCategory === category.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedCategory === category.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="space-y-2">
                      {Array.isArray(category.subjects) ? (category.subjects as string[]).map((subject: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-green-600 font-bold mt-1">•</span>
                          <span>{subject}</span>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          {!showForm ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t("academy.requestCTA")}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {t("academy.requestCTA")}
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">{t("forms.sessionRequest")}</h2>
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
                    placeholder="e.g., Python, Calculus, Finance"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("forms.date")}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("forms.time")}
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
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
                    placeholder="Tell us more about your learning goals..."
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
