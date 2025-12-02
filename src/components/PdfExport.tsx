"use client";

import { questions } from "@/data/questions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

interface PdfExportProps {
    answers: { [key: number]: string };
}

export default function PdfExport({ answers }: PdfExportProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const printRef = useRef<HTMLDivElement>(null);

    const generatePdf = async () => {
        if (!printRef.current) return;
        setIsGenerating(true);
        setProgress(0);

        try {
            const pdf = new jsPDF("l", "px", [1280, 720]); // Landscape, 720p aspect ratio
            const slides = printRef.current.children;
            const totalSlides = slides.length;

            for (let i = 0; i < totalSlides; i++) {
                setProgress(i + 1);
                const slide = slides[i] as HTMLElement;

                // Wait for images/fonts if necessary (html2canvas usually handles this)
                const canvas = await html2canvas(slide, {
                    scale: 2, // Higher scale for better quality
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#fdfbf7", // Match the light background
                });

                const imgData = canvas.toDataURL("image/png");

                if (i > 0) {
                    pdf.addPage([1280, 720], "l");
                }

                pdf.addImage(imgData, "PNG", 0, 0, 1280, 720);

                // Allow UI to update
                await new Promise(resolve => setTimeout(resolve, 10));
            }

            pdf.save("yearly-reflection.pdf");
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("PDF生成失败，请重试。");
        } finally {
            setIsGenerating(false);
            setProgress(0);
        }
    };

    const currentYear = new Date().getFullYear();
    const dateString = new Date().toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <button
                onClick={generatePdf}
                disabled={isGenerating}
                className="text-sm px-4 py-2 border border-gray-900 text-gray-900 hover:bg-gray-100 transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
                {isGenerating ? `生成中 (${progress}/${questions.length + 1})` : "导出 PDF"}
            </button>

            {/* Hidden container for PDF generation */}
            <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                <div ref={printRef}>
                    {/* Cover Slide */}
                    <div className="w-[1280px] h-[720px] flex font-serif">
                        {/* Left Dark Side */}
                        <div className="w-1/2 bg-[#3a3830] text-[#a39e93] flex flex-col justify-center items-center relative">
                            <div className="absolute top-1/3 w-px h-24 bg-[#5c594f]"></div>
                            <div className="mt-8 text-center">
                                <div className="text-2xl tracking-[0.2em] mb-4">{currentYear}</div>
                                <h1 className="text-6xl text-[#fdfbf7] leading-tight font-bold">
                                    年度<br />反思
                                </h1>
                                <div className="w-12 h-0.5 bg-[#8c8574] mt-8 mx-auto"></div>
                            </div>
                        </div>
                        {/* Right Light Side */}
                        <div className="w-1/2 bg-[#fdfbf7] text-[#5c594f] flex flex-col justify-center items-center">
                            <div className="text-center max-w-md">
                                <p className="text-3xl leading-relaxed mb-8 font-medium text-[#171717]">
                                    关于过去一年的<br />40个灵魂拷问
                                </p>
                                <p className="text-xl text-[#8c8574]">{dateString}</p>
                            </div>
                        </div>
                    </div>

                    {/* Question Slides */}
                    {questions.map((q) => (
                        <div key={q.id} className="w-[1280px] h-[720px] flex font-serif">
                            {/* Left Dark Side - Question */}
                            <div className="w-1/2 bg-[#3a3830] text-[#a39e93] p-24 flex flex-col justify-between relative">
                                <div className="text-sm tracking-[0.2em] uppercase text-[#8c8574]">
                                    Question {q.id}
                                </div>

                                <div className="max-w-xl">
                                    <h2 className="text-4xl text-[#fdfbf7] font-medium mb-8 leading-snug">
                                        {q.zh}
                                    </h2>
                                    <p className="text-xl text-[#8c8574] font-serif italic">
                                        {q.en}
                                    </p>
                                </div>

                                <div className="w-12 h-0.5 bg-[#5c594f]"></div>

                                <div className="absolute bottom-24 right-24 text-sm tracking-[0.2em] text-[#5c594f]">
                                    {q.id} of {questions.length}
                                </div>
                            </div>

                            {/* Right Light Side - Answer */}
                            <div className="w-1/2 bg-[#fdfbf7] text-[#171717] p-24 flex flex-col justify-center">
                                <p className="text-2xl text-[#3a3830] leading-relaxed whitespace-pre-wrap">
                                    {answers[q.id] || ""}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
