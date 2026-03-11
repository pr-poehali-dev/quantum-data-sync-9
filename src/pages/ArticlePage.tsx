import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: "🖥️",
    title: "Что такое компьютер?",
    text: "Компьютер — это электронная машина, которая обрабатывает информацию. Он умеет принимать данные, хранить их, выполнять вычисления и выводить результат. Современный компьютер состоит из множества компонентов, каждый из которых выполняет свою задачу.",
  },
  {
    icon: "⚙️",
    title: "Процессор (CPU)",
    text: "Процессор — «мозг» компьютера. Он выполняет все вычисления: запускает программы, обрабатывает команды, управляет остальными компонентами. Скорость процессора измеряется в гигагерцах (ГГц). Чем выше частота и больше ядер — тем быстрее работает компьютер.",
  },
  {
    icon: "🧠",
    title: "Оперативная память (RAM)",
    text: "RAM — временное хранилище данных. Когда вы открываете программу, она загружается в оперативную память — так процессор быстро получает к ней доступ. Больше RAM = больше программ можно держать открытыми одновременно. Стандарт сегодня — 8–16 ГБ.",
  },
  {
    icon: "💾",
    title: "Накопитель (SSD/HDD)",
    text: "Накопитель хранит всё постоянно: операционную систему, файлы, программы. HDD — старый тип, использует магнитные диски, медленнее. SSD — современный, работает на чипах памяти, в 5–10 раз быстрее HDD. Именно SSD делает компьютер шустрым при запуске.",
  },
  {
    icon: "🎨",
    title: "Видеокарта (GPU)",
    text: "Видеокарта отвечает за вывод изображения на экран. В играх и 3D-приложениях она берёт на себя миллиарды вычислений в секунду. Встроенная видеокарта встроена в процессор — подходит для работы и видео. Дискретная — отдельный мощный чип для игр и графики.",
  },
  {
    icon: "🔌",
    title: "Материнская плата",
    text: "Материнская плата — главная плата компьютера, к которой подключаются все остальные компоненты. Она обеспечивает их взаимодействие и питание. Без материнской платы ни один компонент не сможет работать в связке с другими.",
  },
  {
    icon: "💡",
    title: "Операционная система",
    text: "Операционная система (ОС) — программа, которая управляет всем компьютером. Самые популярные: Windows, macOS и Linux. ОС запускается первой при включении компьютера и создаёт среду, в которой работают все остальные программы.",
  },
];

export default function ArticlePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="relative h-64 flex items-end justify-start overflow-hidden">
        <img
          src="/images/mountain-landscape.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <Header />
        <div className="relative z-10 px-6 pb-10 pt-24">
          <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">Образовательная статья</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Как устроен компьютер
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-neutral-400 text-lg leading-relaxed mb-16 border-l-2 border-neutral-600 pl-6">
          Разбираемся в главных компонентах компьютера — от процессора до операционной системы.
          Объясняем простым языком, без технического жаргона.
        </p>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <article key={i} className="border-b border-neutral-800 pb-12 last:border-0">
              <div className="flex items-start gap-4">
                <span className="text-3xl mt-1">{s.icon}</span>
                <div>
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-3">{s.title}</h2>
                  <p className="text-neutral-400 leading-relaxed text-base md:text-lg">{s.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-500 mb-6">Теперь проверь свои знания!</p>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-white text-black px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors duration-300"
          >
            Пройти викторину →
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
