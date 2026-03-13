import { useLanguage } from "../contexts/LanguageContext";
import { BookOpen, Briefcase, Check, ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {t("home.heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            {t("home.heroSubheadline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/academy" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
              {t("home.exploreCTA1")}
              <ArrowRight size={18} />
            </a>
            <a href="/consulting" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
              {t("home.exploreCTA2")}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p className="text-sm md:text-base">
            Students from IE, ICADE, CUNEF, Carlos III, King's College, London School of Economics, Lancaster, NEOMA...
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academy Card */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <BookOpen size={32} className="text-green-600 flex-shrink-0" />
                <h3 className="text-2xl font-bold">{t("home.academyTitle")}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t("home.academyDescription")}
              </p>
              <a href="/academy" className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2 transition-colors">
                {t("home.exploreCTA1")}
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Consulting Card */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <Briefcase size={32} className="text-green-600 flex-shrink-0" />
                <h3 className="text-2xl font-bold">{t("home.consultingTitle")}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t("home.consultingDescription")}
              </p>
              <a href="/consulting" className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2 transition-colors">
                {t("home.exploreCTA2")}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t("home.highlightsTitle")}
          </h2>
          <div className="max-w-3xl mx-auto">
            {Array.isArray(t("home.highlights")) ? (t("home.highlights") as string[]).map((highlight: string, index: number) => (
              <div key={index} className="flex gap-4 mb-6">
                <Check size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{highlight}</p>
              </div>
            )) : null}
          </div>
        </div>
      </section>

      {/* Scheduling Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto p-8 bg-green-50 border-2 border-green-200 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              {t("home.schedulingTitle")}
            </h3>
            <p className="text-lg text-gray-700">
              {t("home.schedulingDescription")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
