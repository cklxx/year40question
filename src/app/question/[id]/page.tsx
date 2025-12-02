"use client";

import { questions } from "@/data/questions";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function QuestionPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const question = questions.find((q) => q.id === id);
    const [answer, setAnswer] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Load answer from local storage
        const savedAnswer = localStorage.getItem(`year40-answer-${id}`);
        if (savedAnswer) {
            setAnswer(savedAnswer);
        } else {
            setAnswer("");
        }
        // Focus textarea
        textareaRef.current?.focus();
    }, [id]);

    const handleNext = () => {
        // Save answer
        localStorage.setItem(`year40-answer-${id}`, answer);

        if (id < questions.length) {
            router.push(`/question/${id + 1}`);
        } else {
            router.push("/summary");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            handleNext();
        }
    };

    if (!question) {
        return <div>Question not found</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 max-w-3xl mx-auto">
            <div className="w-full flex justify-between items-center mb-12 text-sm text-gray-400 uppercase tracking-widest">
                <Link href={id > 1 ? `/question/${id - 1}` : "/"} className="hover:text-gray-900 transition-colors">
                    {id > 1 ? "上一题" : "返回首页"}
                </Link>
                <span>{id} / {questions.length}</span>
                <button onClick={handleNext} className="hover:text-gray-900 transition-colors">
                    {id < questions.length ? "跳过" : "完成"}
                </button>
            </div>

            <main className="w-full flex flex-col gap-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-gray-900 leading-tight">
                    {question.zh}
                </h2>
                <p className="text-gray-400 font-serif italic text-lg">
                    {question.en}
                </p>

                <textarea
                    ref={textareaRef}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="写下你的想法..."
                    className="w-full h-64 bg-transparent border-none outline-none text-xl text-gray-700 placeholder-gray-300 focus:ring-0 resize-none p-0 leading-relaxed font-serif"
                />

                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleNext}
                        className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <span className="text-sm uppercase tracking-widest">继续</span>
                        <span className="text-xs border border-gray-300 rounded px-1.5 py-0.5 group-hover:border-gray-900">⌘ + ↵</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
