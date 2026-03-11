import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Promo />

      {/* Раздел с вкладками */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Разделы сайта</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Учись, проверяй знания<br />и играй
          </h3>
          <p className="text-neutral-600 text-lg mb-12 max-w-2xl mx-auto">
            Три способа познакомиться с миром компьютеров — выбери свой формат
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                path: "/article",
                icon: "📖",
                title: "Статья",
                desc: "Подробный гид по устройству компьютеров: от процессора до операционной системы",
              },
              {
                path: "/quiz",
                icon: "🧠",
                title: "Викторина",
                desc: "Проверь свои знания — 10 вопросов о железе, программах и истории IT",
              },
              {
                path: "/games",
                icon: "🎮",
                title: "Мини-игры",
                desc: "Учись играя: собери компьютер, угадай компонент, набери скорость набора",
              },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="group text-left border border-neutral-200 p-8 hover:border-black transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-neutral-900 mb-2 uppercase tracking-wide">
                  {item.title}
                </h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6 text-xs uppercase tracking-wide text-black font-semibold group-hover:underline">
                  Перейти →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
