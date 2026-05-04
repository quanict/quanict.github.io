"use client"
import { useState } from "react";
import { experiences } from "@/data/experiences"
import ExperienceCard from "@/components/ui/card/Experience"

const ExperiencesSection = () => {
    const [particles] = useState(() =>
        Array.from({ length: 20 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            delay: Math.random() * 5,
        }))
    );

    return (
        <div className="min-h-screen bg-gradient-to-b relative overflow-hidden pt-32 pb-20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-[#04081A]" />

            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,70,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,70,0.15)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Animated particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
                        style={{
                            top: `${particles[i].top ?? 0}%`,
                            left: `${particles[i].left ?? 0}%`,
                            animationDelay: `${particles[i].delay ?? 0}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content container */}
            <div className="relative container mx-auto px-6 mt-10">
                {/* Section header with enhanced effects */}
                <div className="flex flex-col items-center space-y-8 mb-20">
                    <div className="relative">
                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center">
                            Professional Journey
                        </h2>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl">
                        {`Transforming ideas into digital reality, one project at a time`}
                    </p>
                </div>

                {/* Experience grid with improved layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} {...exp} />
                    ))}
                </div>
            </div>

            {/* Enhanced background effects */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
    )
}

export default ExperiencesSection