
import BackgroundDecoration from "@/components/shared/BackroundDecoration";
import Features from "@/features/home/components/Features";
import Hero from "@/features/home/components/Hero";
import Stats from "@/features/home/components/Stats";


export default function HomePage() {
  return (
    <div>
      <div className="w-full min-h-screen bg-background text-foreground block relative overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <BackgroundDecoration/>
        <Hero />
        <Stats/>
        <Features />
      </div>
    </div>
  );
}
