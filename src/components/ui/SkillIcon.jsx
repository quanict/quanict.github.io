"use client";
import React from "react";
import {
    Code2,
    Paintbrush,
    Database,
    Layout,
    Cpu,
    Cloud,
    Computer,
    GalleryThumbnails,
} from "lucide-react";

import * as FaIcon from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";
import * as SiIcon from "react-icons/si";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { MdAnimation } from "react-icons/md";

/**
 * https://animate-ui.com/
 */

const icons = {
    "python" : {icon:FaIcon.FaPython, color : "text-[#3776AB]"}
}

const getColor = function (name) {
    let className
    switch (name) {
        case "python": className = "text-[#3776AB]"; break;
        case "react": className = "text-[#61DAFB]"; break;
        case "next.js": className = "text-white"; break;
        case "javascript": className = "text-[#F7DF1E]"; break;
        case "typescript": className = "text-[#3178C6]"; break;

        case "html5": className = "text-[#E34F26]"; break;
        case "css3": className = "text-[#1572B6]"; break;
        case "express.js": className = "text-[#000000]"; break;

        case "tailwind-css": className = "text-[#38B2AC]"; break;
        case "bootstrap": className = "text-[#563D7C]"; break;
        case "node.js": className = "text-[#339933]"; break;

        case "mongodb": className = "text-[#47A248]"; break;
        case "postgresql": className = "text-[#336791]"; break;
        case "graphql": className = "text-[#E10098]"; break;

        case "rest-apis": className = "text-[#FF6C37]"; break;
        case "google-cloud": className = "text-[#4285F4]"; break;

        case "responsive-design": className = "text-[#38B2AC]"; break;
        case "figma": className = "text-[#F24E1E]"; break;
        case "wireframing": className = "text-[#9CA3AF]"; break;
        case "prototyping": className = "text-[#F59E0B]"; break;

        case "git": className = "text-[#F05032]"; break;
        case "github": className = "text-[#181717]"; break;
        case "linux": className = "text-[#FCC624]"; break;
        case "kubernetes": className = "text-[#326CE5]"; break;
        case "docker": className = "text-[#2496ED]"; break;
        case "aws": className = "text-[#FF9900]"; break;

        case "vs-code": className = "text-[#007ACC]"; break;
        case "redux": className = "text-[#764ABC]"; break;
        case "vite": className = "text-[#646CFF]"; break;
        case "firebase": className = "text-[#FFCA28]"; break;
        case "nextauth": className = "text-[#007ACC]"; break;
        case "netlify": className = "text-[#00C7B7]"; break;
        case "vercel": className = "text-white"; break;
        case "webpack": className = "text-[#8DD6F9]"; break;
        case "jest": className = "text-[#C21325]"; break;


        case "ui-animation": className = "text-[#FF4081]"; break;
        case "svg-animation": className = "text-[#00C853]"; break;
        case "3d-modeling": className = "text-[#7C4DFF]"; break;
        case "graphic-design": className = "text-[#FF6D00]"; break;
        case "motion-graphics": className = "text-[#FF6D00]"; break;

        case "frontend-development": className = "text-blue-400"; break;
        case "backend-development": className = "text-green-400"; break;
        case "ui-ux-design": className = "text-purple-400"; break;
        case "cloud-devops": className = "text-orange-400"; break;
        case "tools-technologies": className = "text-pink-400"; break;
        case "creative-skills": className = "text-yellow-400"; break;

        default: className = "text-blue-400"; break;


    }
    return className
}

const getIcon = function (name) {
    let alias = name.toLowerCase().replaceAll(' ', "-")
    let icon
    switch (alias) {
        case "python": icon = FaIcon.FaPython; break;
        case "react": icon = FaIcon.FaReact; break;
        case "next.js": icon = SiIcon.SiNextdotjs; break;
        case "javascript": icon = FaIcon.FaJsSquare; break;
        case "typescript": icon = SiIcon.SiTypescript; break;

        case "html5":
        case "css3": icon = BsFileEarmarkCode; break;
        case "express.js": icon = BsFileEarmarkCode; break;

        case "tailwind-css":
        case "bootstrap": icon = SiIcon.SiTailwindcss; break;
        case "node.js": icon = FaIcon.FaNodeJs; break;

        case "mongodb": icon = SiIcon.SiMongodb; break;
        case "postgresql": icon = SiIcon.SiPostgresql; break;
        case "graphql": icon = SiIcon.SiGraphql; break;

        case "rest-apis": icon = BsGrid1X2; break;
        case "google-cloud": icon = SiIcon.SiVercel; break;

        case "responsive-design": icon = Layout; break;
        case "figma": icon = FaIcon.FaFigma; break;
        case "wireframing": icon = BsGrid1X2; break;
        case "prototyping": icon = MdAnimation; break;
        

        case "git": icon = FaIcon.FaGitAlt; break;
        case "github": icon = FaIcon.FaGithub; break;
        case "linux": icon = FaIcon.FaLinux; break;
        case "kubernetes": icon = BsGrid1X2; break;
        case "docker": icon = FaIcon.FaDocker; break;
        case "aws": icon = FaIcon.FaAws; break;
        // case "ci-cd": icon = FcWorkflow; break;

        case "vs-code": icon = TbBrandVscode; break;
        case "redux": icon = SiIcon.SiRedux; break;
        case "vite": icon = SiIcon.SiVite; break;
        case "firebase":
        case "nextauth": icon = SiIcon.SiFirebase; break;
        case "netlify": icon = SiIcon.SiNetlify; break;
        case "vercel": icon = SiIcon.SiVercel; break;
        case "webpack": icon = SiIcon.SiWebpack; break;
        case "jest": icon = SiIcon.SiJest; break;

        case "ui-animation": icon = MdAnimation; break;
        case "svg-animation": icon = MdAnimation; break;
        case "3d-modeling": icon = Cpu; break;
        case "graphic-design": icon = Paintbrush; break;
        case "motion-graphics": icon = MdAnimation; break;

        case "coding":
        case "frontend-development": icon = Code2; break;
        case "backend-development": icon = Database; break;
        case "ui-ux-design": icon = Layout; break;
        case "cloud-devops": icon = Cloud; break;
        case "tools-technologies": icon = Cpu; break;
        case "creative-skills": icon = Paintbrush; break;

        case "computer" : icon = Computer; break;
        case "gallery" : icon = GalleryThumbnails; break;

        default: icon = FaIcon.FaReact; break;

    }
    return icon
}

export default function SkillIcon({ name = '', size = '4', className = '' }) {
    const iconName = name.toLowerCase()
        .replaceAll(' & ', "-")
        .replaceAll('/', "-")
        .replaceAll(' ', "-")
    const Icon = getIcon(iconName)

    const classes = className.split(' ')
    classes.push(`w-${size} h-${size}`)
    classes.push(getColor(iconName))

    return (<>
        <p><Icon className={classes.join(' ')} /></p>
    </>)
}