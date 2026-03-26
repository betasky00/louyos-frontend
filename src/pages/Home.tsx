import { useLanguage } from "../contexts/LanguageContext";
import { BookOpen, Briefcase, Check, ArrowRight, MessageCircle } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663343272180/SKr95mWvk2iL2qiW74xYnp/ChatGPTImageMar26,2026at06_29_45PM_4c1602b7.png" 
              alt="Louyos Logo" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-gray-900 leading-tight">
            Louyos Academy <span className="ampersand">&</span> Consulting
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 font-light max-w-3xl mx-auto">
            {t("home.heroSubheadline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/academy" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {t("home.exploreCTA1")}
              <ArrowRight size={18} />
            </a>
            <a 
              href="/consulting" 
              className="border-2 border-gray-400 text-gray-700 hover:border-gray-600 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
            >
              {t("home.exploreCTA2")}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm md:text-base text-gray-600 font-light">
            {t("home.credibilityLabel")}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 md:py-28 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academy Card */}
            <div className="p-8 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-50 rounded-lg">
                  <BookOpen size={28} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-playfair font-bold text-gray-900">{t("home.academyTitle")}</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed font-light">
                {t("home.academyDescription")}
              </p>
              <a 
                href="/academy" 
                className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2 transition-all duration-300 border-b-2 border-green-600 hover:border-green-700 pb-1"
              >
                {t("home.exploreCTA1")}
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Consulting Card */}
            <div className="p-8 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Briefcase size={28} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-playfair font-bold text-gray-900">{t("home.consultingTitle")}</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed font-light">
                {t("home.consultingDescription")}
              </p>
              <a 
                href="/consulting" 
                className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2 transition-all duration-300 border-b-2 border-green-600 hover:border-green-700 pb-1"
              >
                {t("home.exploreCTA2")}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <a
            href="https://wa.me/34626351439"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 text-gray-900">
            {t("home.highlightsTitle")}
          </h2>
          <div className="max-w-3xl mx-auto">
            {Array.isArray(t("home.highlights")) ? (t("home.highlights") as string[]).map((highlight: string, index: number) => (
              <div key={index} className="flex gap-4 mb-8">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                    <Check size={18} className="text-green-600" />
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{highlight}</p>
              </div>
            )) : null}
          </div>
        </div>
      </section>

      {/* Scheduling Info Section */}
      <section className="py-20 md:py-28 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto p-10 bg-white border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-3xl font-playfair font-bold mb-6 text-gray-900">
              {t("home.schedulingTitle")}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {t("home.schedulingDescription")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
