import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center sm:p-20">
      <main className="flex flex-col items-center gap-8 max-w-2xl">
        <h1 className="text-4xl font-bold sm:text-6xl tracking-tight text-gray-900">
          年度40问
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed">
          每年我都会问自己这40个问题。我发现这是反思过去一年（无论好坏）以及展望未来一年如何发展的最有价值的练习之一。
        </p>
        <div className="mt-8">
          <Link
            href="/question/1"
            className="px-8 py-4 text-lg border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 rounded-full"
          >
            开始旅程
          </Link>
        </div>
      </main>
      <footer className="absolute bottom-8 text-sm text-gray-400">
        <a
          href="https://stephango.com/40-questions"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          Inspired by Steph Ango
        </a>
      </footer>
    </div>
  );
}
