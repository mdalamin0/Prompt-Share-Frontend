"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group select-none">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl     group-hover:scale-105 transition-all duration-300 overflow-hidden">
        <Image
          src="/logo.png"
          alt="PromptShare Logo"
          width={40}
          height={40}
          priority
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-black text-base tracking-tight leading-none bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
          PromptShare
        </span>
        <span className="text-[9px] font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mt-0.5 leading-none">
          HUB
        </span>
      </div>
    </Link>
  );
}
