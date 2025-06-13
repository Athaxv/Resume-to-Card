"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon } from "lucide-react";
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="relative bg-white text-black dark:bg-black dark:text-white min-h-screen overflow-hidden">
      {/* Background Glow Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-250px] left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-white/20 to-transparent dark:from-white/10 blur-[160px] opacity-40" />
      </div>
    
      {/* Hero Section inside WavyBackground */}
      <WavyBackground className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center h-screen justify-center">
          <AnimatedShinyText className="pb-2"> Resume Generator</AnimatedShinyText>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-black dark:text-white max-w-4xl">
            Turn Your Resume Into a Modern Developer Card
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
            Instantly transform your resume into a slick, shareable profile card that highlights your skills and personality — designed for modern portfolios.
          </p>
          <Button variant="outline" onClick={() => router.push('/resume')} className="mt-8 text-base px-6 py-3 border-gray-500 dark:border-gray-300">
            Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </section>
      </WavyBackground>

      {/* Footer */}
      {/* <footer className="relative z-10 text-center py-6 border-t border-gray-200 dark:border-zinc-800 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} ResumeCard. All rights reserved.
      </footer> */}
    </main>
  );
}
