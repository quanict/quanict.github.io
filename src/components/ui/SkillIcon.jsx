"use client";
import { useEffect, useMemo, useState } from "react";
import {
    Code2,
    Paintbrush,
    Database,
    Layout,
    Cpu,
    Cloud
} from "lucide-react";

import {
    FaRegSun,
    FaPython,
    FaReact,
    FaNodeJs,

    FaGitAlt,
    FaLinux,
    FaFigma,

    FaGithub,
    FaJsSquare,
} from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";
import {
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiMongodb,
    SiRedux,
    SiFirebase,
    SiVercel,
    SiVite,
    SiNetlify,
    SiPostgresql,
    SiGraphql,
} from "react-icons/si";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";

const colors = {
    python :"text-[#3776AB]",
    react: "text-[#61DAFB]",
        next_js:"text-white",
        javascript: "text-[#F7DF1E]",
        typescript": return <SiTypescript className="w-4 h-4 text-[#3178C6]" />
        
        case "html5": return <BsFileEarmarkCode className="w-4 h-4 text-[#E34F26]" />
        case "css3": return <BsFileEarmarkCode className="w-4 h-4 text-[#1572B6]" />
        case "express.js": return <BsFileEarmarkCode className="w-4 h-4 text-[#000000]" />

        case "tailwind-css": return <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />
        case "bootstrap": return <SiTailwindcss className="w-4 h-4 text-[#563D7C]" />
        case "node.js": return <FaNodeJs className="w-4 h-4 text-[#339933]" />
        
        case "mongodb": return <SiMongodb className="w-4 h-4 text-[#47A248]" />
        case "postgresql": return <SiPostgresql className="w-4 h-4 text-[#336791]" />
        case "graphql": return <SiGraphql className="w-4 h-4 text-[#E10098]" />

        case "rest-apis": return <BsGrid1X2 className="w-4 h-4 text-[#FF6C37]" />
        case "google-cloud": return <SiVercel className="w-4 h-4 text-[#4285F4]" />

        case "responsive-design": return <Layout className="w-4 h-4 text-[#38B2AC]" />
        case "figma": return <FaFigma className="w-4 h-4 text-[#F24E1E]" />
        case "wireframing": return <BsGrid1X2 className="w-4 h-4 text-[#9CA3AF]" />
        case "prototyping": return <MdAnimation className="w-4 h-4 text-[#F59E0B]" />

        case "git": return <FaGitAlt className="w-4 h-4 text-[#F05032]" />
        case "github": return <FaGithub className="w-4 h-4 text-[#181717]" />
        case "linux": return <FaLinux className="w-4 h-4 text-[#FCC624]" />


        case "vs-code": return <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />
        case "redux": return <SiRedux className="w-4 h-4 text-[#764ABC]" />
        case "vite": return <SiVite className="w-4 h-4 text-[#646CFF]" />
        case "firebase": return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />
        case "nextauth": return <SiFirebase className="w-4 h-4 text-[#007ACC]" />
        case "netlify": return <SiNetlify className="w-4 h-4 text-[#00C7B7]"  />
        case "vercel": return <SiVercel className="w-4 h-4 text-white" />



        case "ui-animation": return <MdAnimation className="w-4 h-4 text-[#FF4081]" />
        case "svg-animation": return <MdAnimation className="w-4 h-4 text-[#00C853]" />
        case "3d-modeling": return <Cpu className="w-4 h-4 text-[#7C4DFF]" />
        case "graphic-design": return <Paintbrush className="w-4 h-4 text-[#FF6D00]" />
        case "motion-graphics": return <MdAnimation className="w-4 h-4 text-[#FF6D00]"/>

        case "frontend-development": return Code2


        default: return <FaRegSun className="w-4 h-4 text-[#61DAFB]" />


    }
}

const getIcon = function (name) {
    let alias = name.toLowerCase().replaceAll(' ', "-")
    let icon
    switch (alias) {
        case "python": return <FaPython className="w-4 h-4 text-[#3776AB]" />
        case "react": return <FaReact className="w-4 h-4 text-[#61DAFB]" />
        case "next.js": return <SiNextdotjs className="w-4 h-4 text-white" />
        case "javascript": return <FaJsSquare className="w-4 h-4 text-[#F7DF1E]" />
        case "typescript": return <SiTypescript className="w-4 h-4 text-[#3178C6]" />
        
        case "html5": return <BsFileEarmarkCode className="w-4 h-4 text-[#E34F26]" />
        case "css3": return <BsFileEarmarkCode className="w-4 h-4 text-[#1572B6]" />
        case "express.js": return <BsFileEarmarkCode className="w-4 h-4 text-[#000000]" />

        case "tailwind-css": return <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />
        case "bootstrap": return <SiTailwindcss className="w-4 h-4 text-[#563D7C]" />
        case "node.js": return <FaNodeJs className="w-4 h-4 text-[#339933]" />
        
        case "mongodb": return <SiMongodb className="w-4 h-4 text-[#47A248]" />
        case "postgresql": return <SiPostgresql className="w-4 h-4 text-[#336791]" />
        case "graphql": return <SiGraphql className="w-4 h-4 text-[#E10098]" />

        case "rest-apis": return <BsGrid1X2 className="w-4 h-4 text-[#FF6C37]" />
        case "google-cloud": return <SiVercel className="w-4 h-4 text-[#4285F4]" />

        case "responsive-design": return <Layout className="w-4 h-4 text-[#38B2AC]" />
        case "figma": return <FaFigma className="w-4 h-4 text-[#F24E1E]" />
        case "wireframing": return <BsGrid1X2 className="w-4 h-4 text-[#9CA3AF]" />
        case "prototyping": return <MdAnimation className="w-4 h-4 text-[#F59E0B]" />

        case "git": return <FaGitAlt className="w-4 h-4 text-[#F05032]" />
        case "github": return <FaGithub className="w-4 h-4 text-[#181717]" />
        case "linux": return <FaLinux className="w-4 h-4 text-[#FCC624]" />


        case "vs-code": return <TbBrandVscode className="w-4 h-4 text-[#007ACC]" />
        case "redux": return <SiRedux className="w-4 h-4 text-[#764ABC]" />
        case "vite": return <SiVite className="w-4 h-4 text-[#646CFF]" />
        case "firebase": return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />
        case "nextauth": return <SiFirebase className="w-4 h-4 text-[#007ACC]" />
        case "netlify": return <SiNetlify className="w-4 h-4 text-[#00C7B7]"  />
        case "vercel": return <SiVercel className="w-4 h-4 text-white" />



        case "ui-animation": return <MdAnimation className="w-4 h-4 text-[#FF4081]" />
        case "svg-animation": return <MdAnimation className="w-4 h-4 text-[#00C853]" />
        case "3d-modeling": return <Cpu className="w-4 h-4 text-[#7C4DFF]" />
        case "graphic-design": return <Paintbrush className="w-4 h-4 text-[#FF6D00]" />
        case "motion-graphics": return <MdAnimation className="w-4 h-4 text-[#FF6D00]"/>

        case "frontend-development": return Code2


        default: return <FaRegSun className="w-4 h-4 text-[#61DAFB]" />


    }
    return icon
}

export default function SkillIcon({ name = '' }) {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        if (name.length > 0) {
            setIcon(getIcon(name))
        }
    }, [name])

    return (<>
        <p>{icon}</p>
    </>)
}