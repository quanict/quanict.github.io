"use client";
import React from "react";
import 
// {
//     Paintbrush,
// } 
* as LuIcon
from "lucide-react";

import * as FaIcon from "react-icons/fa";
import * as TbIcon from "react-icons/tb";
import * as SiIcon from "react-icons/si";
import * as BsIcon from "react-icons/bs";
import * as MdIcon from "react-icons/md";

let Icon = FaIcon.FaPython
const getIcon = (name) => {
    let icon,
        className = "text-[#61DAFB]"
    switch (name) {
        case "python": icon = FaIcon.FaPython; className = "text-[#4B8BBE]"; break;
        case "php": icon = FaIcon.FaPhp; className = "text-[#474a8a]"; break;
        case "java": icon = FaIcon.FaJava; className = "text-[#3776AB]"; break;
        case "dart": icon = SiIcon.SiDart; className = "text-[#0075BA]"; break;
        case "node-js": icon = FaIcon.FaNodeJs; className = "text-[#3C873A]"; break;
        case "javascript": icon = FaIcon.FaJsSquare; className = "text-[#F7DF1E]"; break;
        case "typescript": icon = SiIcon.SiTypescript; className = "text-[#3178C6]"; break;
        case "html5": icon = FaIcon.FaHtml5; className = "text-[#E34F26]"; break;
        case "css3": icon = FaIcon.FaCss3; className = "text-[#1572B6]"; break;

        case "react": icon = FaIcon.FaReact; className = "text-[#61DAFB]"; break;
        case "next-js": icon = SiIcon.SiNextdotjs; className = "text-[#000000]"; break;
        case "laravel": icon = FaIcon.FaLaravel; className = "text-[#F05340]"; break;
        case "codeigniter": icon = SiIcon.SiCodeigniter; className = "text-[#dd4814]"; break;
        case "drupal": icon = SiIcon.SiDrupal; className = "text-[#000000]"; break;
        case "cakephp": icon = SiIcon.SiCakephp; className = "text-[#D33C44]"; break;
        case "joomla": icon = SiIcon.SiJoomla; className = "text-[#86be3c]"; break;
        case "wordpress": icon = SiIcon.SiWordpress; className = "text-[#D33C44]"; break;
        case "shopify": icon = SiIcon.SiShopify; className = "text-[#D33C44]"; break;
        
        case "flutter": icon = SiIcon.SiFlutter; className = "text-[#000000]"; break;

        
        case "express-js": icon = SiIcon.SiExpress; className = "text-[#000000]"; break;
        case "tailwind-css": icon = SiIcon.SiTailwindcss; className = "text-[#38B2AC]"; break;
        case "bootstrap": icon = SiIcon.SiBootstrap; className = "text-[#563D7C]"; break;
        case "jquery": icon = SiIcon.SiJquery; className = "text-[#563D7C]"; break;
        case "cypress": icon = SiIcon.SiCypress; className = "text-[#563D7C]"; break;
        

        case "mongodb": icon = SiIcon.SiMongodb; className = "text-[#47A248]"; break;
        case "postgresql": icon = SiIcon.SiPostgresql; className = "text-[#336791]"; break;
        case "graphql": icon = SiIcon.SiGraphql; className = "text-[#E10098]"; break;
        case "mysql": icon = SiIcon.SiMysql; className = "text-[#00758f]"; break;

        case "rest-apis": icon = BsIcon.BsGrid1X2; className = "text-[#FF6C37]"; break;
        case "google-cloud": icon = SiIcon.SiGooglecloud; className = "text-[#4285F4]"; break;

        case "responsive-design": icon = Layout; className = "text-[#38B2AC]"; break;
        case "figma": icon = FaIcon.FaFigma; className = "text-[#F24E1E]"; break;
        case "wireframing": icon = BsIcon.BsGrid1X2; className = "text-[#9CA3AF]"; break;
        case "prototyping": icon = MdAnimation; className = "text-[#F59E0B]"; break;


        case "git": icon = FaIcon.FaGitAlt; className = "text-[#F05032]"; break;
        case "github": icon = FaIcon.FaGithub; className = "text-[#181717]"; break;
        case "gitlab": icon = FaIcon.FaGitlab; className = "text-[#e2432a]"; break;
        case "linux": icon = FaIcon.FaLinux; className = "text-[#003a72]"; break;
        case "kubernetes": icon = BsIcon.BsGrid1X2; className = "text-[#326CE5]"; break;
        case "docker": icon = FaIcon.FaDocker; className = "text-[#2496ED]"; break;
        case "aws": icon = FaIcon.FaAws; className = "text-[#FF9900]"; break;
        case "sonarqube": icon = SiIcon.SiSonarqube; className = "text-[#FF9900]"; break;
        // case "ci-cd": icon = FcWorkflow; break;

        case "vs-code": icon = TbIcon.TbBrandVscode; className = "text-[#007ACC]"; break;
        case "redux": icon = SiIcon.SiRedux; className = "text-[#764ABC]"; break;
        case "vite": icon = SiIcon.SiVite; className = "text-[#646CFF]"; break;
        case "firebase":
        case "nextauth": icon = SiIcon.SiFirebase; className = "text-[#007ACC]"; break;
        case "netlify": icon = SiIcon.SiNetlify; className = "text-[#00C7B7]"; break;
        case "vercel": icon = SiIcon.SiVercel; className = "text-[#000000]"; break;
        case "webpack": icon = SiIcon.SiWebpack; className = "text-[#8DD6F9]"; break;
        case "jest": icon = SiIcon.SiJest; className = "text-[#C21325]"; break;

        case "ui-animation": icon = MdIcon.MdAnimation; className = "text-[#FF4081]"; break;
        case "svg-animation": icon = MdIcon.MdAnimation; className = "text-[#00C853]"; break;
        case "3d-modeling": icon = LuIcon.Cpu; className = "text-[#7C4DFF]"; break;
        case "graphic-design": icon = LuIcon.Paintbrush; className = "text-[#FF6D00]"; break;
        case "motion-graphics": icon = MdIcon.MdAnimation; className = "text-[#FF6D00]"; break;

        case "coding":
        case "frontend-development": icon = LuIcon.Code2; className = "text-blue-400"; break;
        case "backend-development": icon = LuIcon.Database; className = "text-green-400"; break;
        case "ui-ux-design": icon = LuIcon.Layout; className = "text-purple-400"; break;
        case "cloud-devops": icon = LuIcon.Cloud; className = "text-orange-400"; break;
        case "tools-technologies": icon = LuIcon.Cpu; className = "text-pink-400"; break;
        case "creative-skills": icon = LuIcon.Paintbrush; className = "text-yellow-400"; break;

        case "fedora": icon = SiIcon.SiFedora; className = "text-[#0b57a4]"; break;
        case "centos": icon = SiIcon.SiCentos; className = "text-[#9ece26]"; break;
        case "ubuntu": icon = SiIcon.SiUbuntu; className = "text-[#E95420]"; break;
        case "nginx": icon = SiIcon.SiNginx; className = "text-[#000000]"; break;
        case "apache": icon = SiIcon.SiApache; className = "text-[#000000]"; break;

        case "android": icon = SiIcon.SiAndroid; className = "text-[#000000]"; break;
        case "android-studio": icon = SiIcon.SiAndroidstudio; className = "text-[#000000]"; break;
        
        case "jira": icon = SiIcon.SiJira; className = "text-[#000000]"; break;
        case "ci-cd": icon = BsIcon.BsCCircle; className = "text-[#fc2323]"; break;

        case "prisma": icon = SiIcon.SiPrisma; className = "text-[#000000]"; break;

        case "computer": icon = LuIcon.Computer; break;
        case "gallery": icon = LuIcon.GalleryThumbnails; break;
        default:
            icon = FaIcon.FaImage
            className = "text-blue-400"
    }
    return { icon, className }
}

export default function QhIcon({ name, size }) {
    let classes = [
        `w-${size||12} h-${size||12}`
    ]
    
    const Icon2 = getIcon(name)
    classes.push(Icon2.className)

    
    return (
        <div className="justify-self-center self-center">
            <Icon2.icon className={classes.join(' ')} title={name} />
        </div>
    )
}