import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type GameId = "match" | "typing" | null;

const matchItems = [
  { term: "CPU", def: "Обрабатывает все вычисления" },
  { term: "RAM", def: "Временная память программ" },
  { term: "SSD", def: "Быстрый накопитель на чипах" },
  { term: "GPU", def: "Рисует изображение на экране" },
  { term: "ОС", def: "Управляет всем компьютером" },
];

const typingTexts = [
  "Процессор выполняет миллиарды операций в секунду",
  "Оперативная память хранит временные данные",
  "Видеокарта обрабатывает графику и изображения",
  "SSD работает быстрее чем HDD в пять раз",
];

function MatchGame() {
  const [selected, setSelected] = useState<{ side: "term" | "def"; index: number } | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number[]>([]);
  const [defs] = useState(() => [...matchItems].sort(() => Math.random() - 0.5));

  const handleTerm = (i: number) => {
    if (matched.includes(i)) return;
    if (selected?.side === "def") {
      const defIndex = defs.findIndex((d) => d.def === matchItems[i].def);
      if (selected.index === defIndex) {
        setMatched((m) => [...m, i]);
        setWrong([]);
      } else {
        setWrong([i]);
        setTimeout(() => setWrong([]), 800);
      }
      setSelected(null);
    } else {
      setSelected({ side: "term", index: i });
    }
  };

  const handleDef = (i: number) => {
    const termIndex = matchItems.findIndex((t) => t.def === defs[i].def);
    if (matched.includes(termIndex)) return;
    if (selected?.side === "term") {
      const defIndex = defs.findIndex((d) => d.def === matchItems[selected.index].def);
      if (i === defIndex) {
        setMatched((m) => [...m, selected.index]);
        setWrong([]);
      } else {
        setWrong([selected.index]);
        setTimeout(() => setWrong([]), 800);
      }
      setSelected(null);
    } else {
      setSelected({ side: "def", index: i });
    }
  };

  const isMatchedDef = (i: number) => {
    return matched.some((mi) => matchItems[mi].def === defs[i].def);
  };

  const reset = () => {
    setSelected(null);
    setMatched([]);
    setWrong([]);
  };

  const done = matched.length === matchItems.length;

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-2">Сопоставь термин и определение</h2>
      <p className="text-neutral-500 text-sm mb-6">Нажми термин, потом его описание</p>

      {done ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-white text-xl font-bold mb-6">Всё правильно!</p>
          <button onClick={reset} className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wide font-bold hover:bg-neutral-200">
            Играть снова
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            {matchItems.map((item, i) => {
              const isMatched = matched.includes(i);
              const isSelected = selected?.side === "term" && selected.index === i;
              const isWrong = wrong.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => handleTerm(i)}
                  className={`w-full py-3 px-4 text-left text-sm font-bold uppercase tracking-wide border transition-all duration-200 ${
                    isMatched
                      ? "border-green-500 bg-green-500/10 text-green-400 cursor-default"
                      : isWrong
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : isSelected
                      ? "border-white bg-white/10 text-white"
                      : "border-neutral-700 text-neutral-300 hover:border-white hover:text-white"
                  }`}
                >
                  {item.term}
                </button>
              );
            })}
          </div>
          <div className="space-y-3">
            {defs.map((item, i) => {
              const isMatched = isMatchedDef(i);
              const isSelected = selected?.side === "def" && selected.index === i;
              return (
                <button
                  key={i}
                  onClick={() => handleDef(i)}
                  className={`w-full py-3 px-4 text-left text-sm border transition-all duration-200 leading-tight ${
                    isMatched
                      ? "border-green-500 bg-green-500/10 text-green-400 cursor-default"
                      : isSelected
                      ? "border-white bg-white/10 text-white"
                      : "border-neutral-700 text-neutral-300 hover:border-white hover:text-white"
                  }`}
                >
                  {item.def}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TypingGame() {
  const [textIndex, setTextIndex] = useState(0);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const text = typingTexts[textIndex];

  const handleInput = (val: string) => {
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setInput(val);
    if (val === text) {
      const elapsed = (Date.now() - (startTime ?? Date.now())) / 1000 / 60;
      const words = text.split(" ").length;
      setWpm(Math.round(words / elapsed));
      let correct = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === text[i]) correct++;
      }
      setAccuracy(Math.round((correct / text.length) * 100));
    }
  };

  const next = () => {
    setTextIndex((i) => (i + 1) % typingTexts.length);
    setInput("");
    setStarted(false);
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
  };

  const done = input === text;

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-2">Скорость печати</h2>
      <p className="text-neutral-500 text-sm mb-6">Перепечатай текст как можно быстрее</p>

      <div className="mb-6 p-4 border border-neutral-700 bg-neutral-900">
        <p className="text-base leading-relaxed font-mono">
          {text.split("").map((char, i) => {
            let color = "text-neutral-500";
            if (i < input.length) {
              color = input[i] === char ? "text-green-400" : "text-red-400";
            } else if (i === input.length) {
              color = "text-white underline";
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {done ? (
        <div className="text-center py-6">
          <div className="text-5xl mb-4">⚡</div>
          <div className="flex gap-8 justify-center mb-6">
            <div>
              <p className="text-white text-3xl font-bold">{wpm}</p>
              <p className="text-neutral-500 text-sm uppercase tracking-wide">слов/мин</p>
            </div>
            <div>
              <p className="text-white text-3xl font-bold">{accuracy}%</p>
              <p className="text-neutral-500 text-sm uppercase tracking-wide">точность</p>
            </div>
          </div>
          <button onClick={next} className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wide font-bold hover:bg-neutral-200">
            Следующий текст →
          </button>
        </div>
      ) : (
        <textarea
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Начни печатать здесь..."
          rows={3}
          className="w-full bg-neutral-900 border border-neutral-700 text-white p-4 text-base font-mono resize-none focus:outline-none focus:border-white transition-colors"
        />
      )}
    </div>
  );
}

const games = [
  {
    id: "match" as GameId,
    icon: "🔗",
    title: "Термины",
    desc: "Сопоставь компьютерные термины с их описаниями",
  },
  {
    id: "typing" as GameId,
    icon: "⌨️",
    title: "Скорость набора",
    desc: "Перепечатай текст о компьютерах как можно быстрее",
  },
];

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<GameId>(null);

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="relative h-64 flex items-end justify-start overflow-hidden">
        <img
          src="/images/mountain-landscape.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Header />
        <div className="relative z-10 px-6 pb-10 pt-24">
          <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">Учись играя</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Мини-игры</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {!activeGame ? (
          <>
            <p className="text-neutral-400 text-lg mb-10">
              Выбери игру и закрепи знания об устройстве компьютеров
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="group text-left border border-neutral-700 p-8 hover:border-white transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h3 className="text-white text-xl font-bold mb-2 uppercase tracking-wide">
                    {game.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{game.desc}</p>
                  <div className="mt-6 text-xs uppercase tracking-wide text-white font-semibold group-hover:underline">
                    Играть →
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveGame(null)}
              className="text-neutral-500 text-sm uppercase tracking-wide hover:text-white transition-colors mb-10"
            >
              ← Все игры
            </button>
            <div className="border border-neutral-800 p-8">
              {activeGame === "match" && <MatchGame />}
              {activeGame === "typing" && <TypingGame />}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
