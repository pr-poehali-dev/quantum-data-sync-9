import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "Что является «мозгом» компьютера?",
    options: ["Видеокарта", "Оперативная память", "Процессор (CPU)", "Жёсткий диск"],
    answer: 2,
  },
  {
    question: "Что хранит оперативная память (RAM)?",
    options: [
      "Файлы и документы постоянно",
      "Временные данные запущенных программ",
      "Операционную систему",
      "Видеоролики и фотографии",
    ],
    answer: 1,
  },
  {
    question: "Чем SSD отличается от HDD?",
    options: [
      "SSD медленнее, но дешевле",
      "SSD больше по объёму",
      "SSD работает на чипах и быстрее",
      "HDD использует лазер",
    ],
    answer: 2,
  },
  {
    question: "Что делает видеокарта (GPU)?",
    options: [
      "Управляет питанием компьютера",
      "Выводит изображение и обрабатывает графику",
      "Хранит операционную систему",
      "Охлаждает процессор",
    ],
    answer: 1,
  },
  {
    question: "Что такое операционная система?",
    options: [
      "Антивирусная программа",
      "Браузер для интернета",
      "Программа, управляющая всем компьютером",
      "Приложение для редактирования фото",
    ],
    answer: 2,
  },
  {
    question: "Что подключает все компоненты компьютера?",
    options: ["Блок питания", "Материнская плата", "Видеокарта", "Корпус"],
    answer: 1,
  },
  {
    question: "Сколько бит в одном байте?",
    options: ["4", "16", "8", "2"],
    answer: 2,
  },
  {
    question: "Как называется скорость процессора?",
    options: ["Мегапиксели", "Гигагерцы (ГГц)", "Гигабайты (ГБ)", "Ватты"],
    answer: 1,
  },
  {
    question: "Что происходит с данными в RAM при выключении компьютера?",
    options: [
      "Они сохраняются навсегда",
      "Они копируются на диск",
      "Они стираются",
      "Они уходят в облако",
    ],
    answer: 2,
  },
  {
    question: "Какая из ОС НЕ является популярной?",
    options: ["Windows", "macOS", "Linux", "CompuOS"],
    answer: 3,
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === questions[current].answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  const q = questions[current];
  const percent = Math.round((score / questions.length) * 100);

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="relative h-64 flex items-end justify-start overflow-hidden">
        <img
          src="/images/spiral-circles.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Header />
        <div className="relative z-10 px-6 pb-10 pt-24">
          <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">Проверь себя</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Викторина</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {finished ? (
          <div className="text-center">
            <div className="text-8xl mb-6">
              {percent >= 80 ? "🏆" : percent >= 50 ? "👍" : "📚"}
            </div>
            <h2 className="text-white text-3xl font-bold mb-4">
              {score} из {questions.length} правильных
            </h2>
            <p className="text-neutral-400 text-lg mb-2">
              {percent >= 80
                ? "Отлично! Ты настоящий знаток компьютеров."
                : percent >= 50
                ? "Хороший результат! Есть куда расти."
                : "Рекомендуем почитать нашу статью и попробовать ещё раз."}
            </p>
            <div className="w-full bg-neutral-800 h-2 rounded mt-8 mb-10">
              <div
                className="bg-white h-2 rounded transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleRestart}
                className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wide font-bold hover:bg-neutral-200 transition-colors"
              >
                Попробовать снова
              </button>
              <button
                onClick={() => navigate("/games")}
                className="border border-white text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-white/10 transition-colors"
              >
                Мини-игры
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <span className="text-neutral-500 text-sm uppercase tracking-wide">
                Вопрос {current + 1} из {questions.length}
              </span>
              <span className="text-neutral-400 text-sm">Счёт: {score}</span>
            </div>

            <div className="w-full bg-neutral-800 h-1 rounded mb-10">
              <div
                className="bg-white h-1 rounded transition-all duration-300"
                style={{ width: `${((current) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-white text-xl md:text-2xl font-bold mb-8 leading-tight">
              {q.question}
            </h2>

            <div className="space-y-3 mb-8">
              {q.options.map((opt, idx) => {
                let style =
                  "border border-neutral-700 text-neutral-300 hover:border-white hover:text-white";
                if (answered) {
                  if (idx === q.answer) {
                    style = "border border-green-500 bg-green-500/10 text-green-400";
                  } else if (idx === selected && idx !== q.answer) {
                    style = "border border-red-500 bg-red-500/10 text-red-400";
                  } else {
                    style = "border border-neutral-800 text-neutral-600";
                  }
                } else if (selected === idx) {
                  style = "border border-white text-white";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-6 py-4 text-base transition-all duration-200 ${style}`}
                  >
                    <span className="mr-3 text-neutral-600">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {answered && (
              <button
                onClick={handleNext}
                className="w-full bg-white text-black py-4 text-sm uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
              >
                {current + 1 >= questions.length ? "Завершить" : "Следующий вопрос →"}
              </button>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
