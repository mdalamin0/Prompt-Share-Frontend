/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Terminal,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundDecoration from "@/components/shared/BackroundDecoration";

const faqCategories = [
  { id: "general", label: "General Hub", icon: HelpCircle },
  { id: "engine", label: "Prompt Engine", icon: Terminal },
  { id: "security", label: "Security & Licensing", icon: ShieldCheck },
];

const faqData = [
  {
    category: "general",
    q: "What is PromptShare Hub exactly?",
    a: "PromptShare Hub is a centralized engineering network built for prompt engineers and software developers. It replaces scattered text files and messy spreadsheets with a standardized workspace for cloud-hosting, optimizing, and cloning elite AI automation scripts.",
  },
  {
    category: "general",
    q: "Is there a usage limit for searching public prompts?",
    a: "No, discovering and reading prompt models in the Public Registry is completely open and unrestricted for the developer community. You can clone or test any template released under the global public workspace feed.",
  },
  {
    category: "engine",
    q: "How does the Studio dynamic variable syntax work?",
    a: "Our studio parser scans text structures for tokens enclosed within standard double curly braces, such as {{role}}, {{framework}}, or {{code}}. When you trigger or inspect these modular models, the system dynamically populates form input fields for rapid token generation without altering the baseline prompt script.",
  },
  {
    category: "engine",
    q: "What happens when I hit the 'Clone Model' or 'Fork' action?",
    a: "Clicking the Fork or Clone action generates an immediate, independent clone snapshot of that public prompt template directly into your private user profile repo. The fork aggregate counters reflect on the global feed, while you retain exclusive rights to customize your cloned codebase script.",
  },
  {
    category: "security",
    q: "Can I host secure enterprise prompt matrices privately?",
    a: "Yes. Every workspace environment provides granular access toggles. If the Public Repository Release checkbox is unchecked during deployment, the prompt script model is encrypted and rendered strictly private within your encrypted dashboard cluster, hiding it from all global APIs.",
  },
  {
    category: "security",
    q: "Can a prompt author delete a model after I fork it?",
    a: "No. The moment you execute a Fork mutation trigger, the copy is deep-cloned into your standalone data directory schema block. Subsequent modifications or physical removal actions performed by the original author on their source prompt will never impact or delete your workspace replica repository.",
  },
];

export default function PublicFaqPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqData.filter(
    (item) => item.category === activeCategory,
  );

  return (
    <section className="page-section w-full min-h-screen bg-background text-foreground block relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="hidden md:block">
        <BackgroundDecoration />
      </div>

      <div className="container-app  pt-8 sm:pt-12 pb-24 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 mb-8 w-full page-section">
          <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            render={<Link href="/" />}
            className="size-9 border-border bg-card text-muted-foreground hover:text-foreground shrink-0 shadow-sm"
            aria-label="Back to home page"
          >
            <ArrowLeft size={16} />
          </Button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-black text-foreground tracking-tight">
              Knowledge Repository
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-xl leading-relaxed font-medium">
              Review systemic specifications, variable injection frameworks, and
              codebase licensing details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-6 sm:mt-10 w-full">
          <aside className="lg:col-span-1 sticky top-24 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 p-1.5 bg-muted/40 border border-border/40 rounded-xl max-w-full lg:max-w-none shrink-0 scrollbar-none [-webkit-overflow-scrolling:touch]">
            {faqCategories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap lg:whitespace-normal text-left transition-all shrink-0 lg:w-full select-none ${
                    isSelected
                      ? "bg-card text-primary border border-border/60 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30 border border-transparent"
                  }`}
                >
                  <CatIcon
                    size={14}
                    className={
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </aside>

          <div className="lg:col-span-3 space-y-3 w-full min-w-0">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card border border-border/60 flex flex-col justify-between transition-all duration-200 rounded-xl w-full"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-foreground hover:bg-accent/20 transition-colors"
                >
                  <span className="pr-4 leading-normal">{faq.q}</span>
                  <ChevronDown
                    size={14}
                    className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === idx
                      ? "max-h-[300px] border-t border-border/30 bg-muted/10"
                      : "max-h-0"
                  }`}
                >
                  <p className="p-4 sm:p-5 text-xs text-muted-foreground leading-relaxed font-medium whitespace-pre-wrap break-words">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
