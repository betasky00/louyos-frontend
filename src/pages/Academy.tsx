import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "wouter";
import { BookOpen } from "lucide-react";

export default function Academy() {
  const { t } = useLanguage();
  const router = useRouter() as any;
  const navigate = router[1] as (path: string) => void;

  const levels = [
    {
      id: "ie",
      label: t("academy.ie"),
      description: t("academy.ieDescription"),
      path: "/academy/ie",
      color: "from-green-400 to-green-600",
    },
    {
      id: "university",
      label: t("academy.university"),
      description: t("academy.universityDescription"),
      path: "/academy/university",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "lycee",
      label: t("academy.lycee"),
      description: t("academy.lyceeDescription"),
      path: "/academy/lycee",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "primaire",
      label: t("academy.primaire"),
      description: t("academy.primaireDescription"),
      path: "/academy/primaire",
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-gray-900">
            {t("academy.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-light">
            {t("academy.description")}
          </p>
        </div>
      </section>

      {/* Level Selection */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-16 text-center text-gray-900">
            {t("academy.selectLevel")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => navigate(level.path)}
                className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* White background */}
                <div className="absolute inset-0 bg-white group-hover:bg-opacity-95 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${level.color} rounded-lg`}>
                      <BookOpen size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-playfair font-bold text-gray-900">
                        {level.label}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 font-light text-lg">
                    {level.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
