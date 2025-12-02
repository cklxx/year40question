"use client";

import { questions } from "@/data/questions";
import Link from "next/link";
import { useEffect, useState } from "react";
import PdfExport from "@/components/PdfExport";

export default function SummaryPage() {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const loadedAnswers: { [key: number]: string } = {};
        questions.forEach((q) => {
            const answer = localStorage.getItem(`year40-answer-${q.id}`);
            if (answer) {
                loadedAnswers[q.id] = answer;
            }
        });
        setAnswers(loadedAnswers);
    }, []);

    const handleCopy = () => {
        let text = "我的年度40问\n\n";
        questions.forEach((q) => {
            const answer = answers[q.id];
            if (answer) {
                text += `${q.id}. ${q.zh}\n${answer}\n\n`;
            }
        });
        navigator.clipboard.writeText(text);
        alert("已复制到剪贴板！");
    };

    const handleClear = () => {
        if (confirm("确定要清除所有答案吗？此操作无法撤销。")) {
            questions.forEach((q) => {
                localStorage.removeItem(`year40-answer-${q.id}`);
            });
            setAnswers({});
            alert("所有答案已清除。");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-8 sm:p-20 max-w-3xl mx-auto">
            <header className="w-full flex justify-between items-center mb-12">
                <Link href="/" className="text-sm text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
                    返回首页
                </Link>
                <div className="flex gap-4">
                    <button
                        onClick={handleCopy}
                        className="text-sm px-4 py-2 border border-gray-900 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-full"
                    >
                        复制
                    </button>
                    <PdfExport answers={answers} />
                    <button
                        onClick={handleClear}
                        className="text-sm px-4 py-2 border border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors rounded-full"
                    >
                        清除
                    </button>
                </div>
            </header>

            <main className="w-full flex flex-col gap-12">
                {questions.map((q) => (
                    <div key={q.id} className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-4">
                            <span className="text-sm text-gray-400 font-mono">{q.id.toString().padStart(2, '0')}</span>
                            <h3 className="text-lg font-serif font-medium text-gray-900">{q.zh}</h3>
                        </div>
                        {answers[q.id] ? (
                            <p className="pl-10 text-gray-700 font-serif whitespace-pre-wrap leading-relaxed">
                                {answers[q.id]}
                            </p>
                        ) : (
                            <p className="pl-10 text-gray-300 font-serif italic">
                                未回答
                            </p>
                        )}
                    </div>
                ))}


            </main>
        </div>
    );
}
