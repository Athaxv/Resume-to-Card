// ResumeCard.jsx
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResumeCard = () => {
  const router = useRouter();

  const [randomCards, setRandomCards] = useState([
    {
      name: "Devina Mehra",
      about: "Frontend engineer passionate about animations and UI/UX",
      skills: "React, TypeScript, Framer Motion",
      projects: ["UI Lib Builder", "Portfolio Designer"],
      github: "https://github.com/devinamehra",
      linkedin: "https://linkedin.com/in/devinamehra",
    },
    {
      name: "Aditya Sharma",
      about: "Backend specialist with love for scalable APIs",
      skills: "Node.js, PostgreSQL, Redis",
      projects: ["FastAuth", "DBSync"],
      github: "https://github.com/adityasharma",
      linkedin: "https://linkedin.com/in/adityasharma",
    },
  ]);

  const [resumeCards, setResumeCards] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResumeCards(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (e) {
        console.error("Failed to parse resume data", e);
      }
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-zinc-50 to-white dark:from-black dark:to-zinc-900 px-6 py-16 text-black dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 max-w-7xl mx-auto gap-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center md:text-left bg-gradient-to-br from-black to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
          Explore Developers
        </h1>
        <Button
          onClick={() => router.push("/form")}
          className="text-sm md:text-base px-6 py-3 font-semibold border dark:border-white bg-gradient-to-tr from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 hover:scale-105 transition"
        >
          Create New Resume
        </Button>
      </div>

      {/* Random Cards */}
      <h2 className="text-2xl font-bold mb-6 max-w-7xl mx-auto text-zinc-700 dark:text-zinc-300">Other Developer Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-20">
        {randomCards.map((item, i) => (
          <Card key={i} className="border dark:border-zinc-700 shadow-md hover:shadow-xl transition rounded-2xl bg-white dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-zinc-800 dark:text-white">
                {item.name}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.about}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-semibold">Skills:</span> {item.skills}</p>
              <p><span className="font-semibold">Projects:</span> {item.projects.join(", ")}</p>
              <div className="flex gap-3 pt-2">
                <a href={item.linkedin} target="_blank" className="text-blue-500 underline text-sm">LinkedIn</a>
                <a href={item.github} target="_blank" className="text-blue-500 underline text-sm">GitHub</a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Created Cards */}
      {resumeCards.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-zinc-700 dark:text-zinc-300">Your Created Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {resumeCards.map((data, index) => (
              <Card
                key={index}
                className="border dark:border-zinc-700 rounded-2xl shadow-xl bg-white dark:bg-zinc-900 p-6 transition hover:shadow-2xl"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-zinc-800 dark:text-white">
                    {data.fullName}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{data.about}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm md:text-base">
                  <p><strong>Skills:</strong> {data.skills}</p>
                  <p><strong>Projects:</strong> {data.projects.join(", ")}</p>
                  <p><strong>LinkedIn:</strong> <a href={data.linkedin} className="text-blue-500 underline" target="_blank">{data.linkedin}</a></p>
                  <p><strong>GitHub:</strong> <a href={data.github} className="text-blue-500 underline" target="_blank">{data.github}</a></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ResumeCard;
