import { useLanguage } from "../contexts/LanguageContext";
import { BookOpen, Briefcase, Check, ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 bg-[#faf8f3]">
        <div className="max-w-6xl mx-auto px-4 text-center">
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
            Students from IE, ICADE, CUNEF, Carlos III, King's College, London School of Economics, Lancaster, NEOMA...
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
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.271c-.402.23-.779.561-1.114.947a9.9 9.9 0 00-1.5 3.694c-.243.882-.29 1.85-.135 2.76.074.464.19.916.35 1.345a9.888 9.888 0 001.271 2.855c.401.534.878 1.022 1.42 1.428.542.407 1.158.748 1.835.998.677.25 1.423.422 2.198.498.775.076 1.577-.007 2.35-.244.773-.237 1.508-.625 2.18-1.147a9.889 9.889 0 002.254-2.671c.55-.906.93-1.905 1.118-2.948.188-1.043.15-2.126-.11-3.158a9.9 9.9 0 00-.75-2.573 9.87 9.87 0 00-1.5-2.215 9.87 9.87 0 00-2.215-1.5 9.87 9.87 0 00-2.573-.75c-1.032-.26-2.115-.298-3.158-.11m0-2.082C6.727 2.97 1 8.695 1 12c0 3.305 5.727 9.03 11.051 9.03 5.324 0 11.051-5.725 11.051-9.03 0-3.305-5.727-9.03-11.051-9.03z"/>
            </svg>
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
