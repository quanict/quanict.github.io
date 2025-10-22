"use client";
import PropTypes from "prop-types";
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

/**
 * https://simpleicons.org/
 */
// import { SimpleIcon } from 'react-icon-cloud';


const getIcon = (name) => {
    let icon,
        className = "text-[#61DAFB]"

    const iconName = name.toLowerCase()
        .replaceAll(' & ', "-")
        .replaceAll('/', "-")
        .replaceAll(' ', "-")

    switch (iconName) {
        case "python": icon = FaIcon.FaPython; className = "text-[#4B8BBE]"; break;
        case "php": icon = FaIcon.FaPhp; className = "text-[#474a8a]"; break;
        case "java": icon = FaIcon.FaJava; className = "text-[#3776AB]"; break;
        case "dart": icon = SiIcon.SiDart; className = "text-[#0075BA]"; break;
        case "swift": icon = SiIcon.SiSwift; className = "text-[#0075BA]"; break;

        case "nodejs":
        case "node-js":
        case "node.js":
            icon = FaIcon.FaNodeJs; className = "text-[#3C873A]";
            break;
        case "javascript": icon = FaIcon.FaJsSquare; className = "text-[#F7DF1E]"; break;
        case "typescript": icon = SiIcon.SiTypescript; className = "text-[#3178C6]"; break;
        case "html5": icon = FaIcon.FaHtml5; className = "text-[#E34F26]"; break;
        case "css3": icon = FaIcon.FaCss3; className = "text-[#1572B6]"; break;

        case "react":
        case "reactjs":
            icon = FaIcon.FaReact; className = "text-[#61DAFB]"; break;
        case "next-js":
        case "next.js":
            icon = SiIcon.SiNextdotjs; className = "text-[#000000]";
            break;
        case "nuxtjs":
            icon = SiIcon.SiNuxtdotjs; className = "text-[#000000]";
            break;
        case "vuejs":
            icon = SiIcon.SiVuedotjs; className = "text-[#000000]";
            break;

        case "laravel": icon = FaIcon.FaLaravel; className = "text-[#F05340]"; break;
        case "codeigniter":
        case "codeigniter-2":
            icon = SiIcon.SiCodeigniter; className = "text-[#dd4814]"; break;
        case "drupal": icon = SiIcon.SiDrupal; className = "text-[#0678BE]"; break;
        case "cakephp":
        case "cakephp2":
            icon = SiIcon.SiCakephp; className = "text-[#D33C43]"; break;
        case "joomla": icon = SiIcon.SiJoomla; className = "text-[#5091CD]"; break;
        case "wordpress": icon = SiIcon.SiWordpress; className = "text-[#D33C44]"; break;
        case "magento": icon = SiIcon.SiMagento; className = "text-[#D33C44]"; break;
        // case "whmcs": icon = SiIcon.Sif; className = "text-[#D33C44]"; break;
        case "shopify": icon = SiIcon.SiShopify; className = "text-[#7AB55C]"; break;
        case "symfony-2": icon = SiIcon.SiSymfony; className = "text-[#000000]"; break;
        case "composer-packagist": icon = SiIcon.SiComposer; className = "text-[#000000]"; break;

        case "smarty": icon = SiIcon.SiSmart; className = "text-[#000000]"; break;

        case "flutter": icon = SiIcon.SiFlutter; className = "text-[#02569B]"; break;


        case "express-js":
        case "express.js":
            icon = SiIcon.SiExpress;
            className = "text-[#000000]";
            break;
        case "tailwind-css": icon = SiIcon.SiTailwindcss; className = "text-[#38B2AC]"; break;
        case "bootstrap": icon = SiIcon.SiBootstrap; className = "text-[#563D7C]"; break;
        case "jquery": icon = SiIcon.SiJquery; className = "text-[#0769AD]"; break;
        case "cypress": icon = SiIcon.SiCypress; className = "text-[#563D7C]"; break;


        case "mongodb": icon = SiIcon.SiMongodb; className = "text-[#47A248]"; break;
        case "postgresql": icon = SiIcon.SiPostgresql; className = "text-[#336791]"; break;
        case "graphql": icon = SiIcon.SiGraphql; className = "text-[#E10098]"; break;
        case "mysql": icon = SiIcon.SiMysql; className = "text-[#00758f]"; break;

        case "rest-apis": icon = BsIcon.BsGrid1X2; className = "text-[#FF6C37]"; break;
        case "google-cloud": icon = SiIcon.SiGooglecloud; className = "text-[#4285F4]"; break;

        case "responsive-design": icon = MdIcon.Layout; className = "text-[#38B2AC]"; break;
        case "figma": icon = FaIcon.FaFigma; className = "text-[#F24E1E]"; break;
        case "wireframing": icon = BsIcon.BsGrid1X2; className = "text-[#9CA3AF]"; break;
        case "prototyping": icon = MdIcon.MdAnimation; className = "text-[#F59E0B]"; break;


        case "git": icon = FaIcon.FaGitAlt; className = "text-[#F05032]"; break;
        case "github": icon = FaIcon.FaGithub; className = "text-[#181717]"; break;
        case "gitlab": icon = FaIcon.FaGitlab; className = "text-[#FC6D26]"; break;
        case "linux": icon = FaIcon.FaLinux; className = "text-[#003a72]"; break;
        case "kubernetes": icon = BsIcon.BsGrid1X2; className = "text-[#326CE5]"; break;
        case "docker": icon = FaIcon.FaDocker; className = "text-[#2496ED]"; break;
        case "aws": icon = FaIcon.FaAws; className = "text-[#FF9900]"; break;
        case "sonarqube": icon = SiIcon.SiSonarqube; className = "text-[#126ED3]"; break;

        case "aws-lambda": icon = SiIcon.SiAwslambda; className = "text-[#126ED3]"; break;
        // case "ci-cd": icon = FcWorkflow; break;

        case "vs-code": icon = TbIcon.TbBrandVscode; className = "text-[#007ACC]"; break;
        case "redux": icon = SiIcon.SiRedux; className = "text-[#764ABC]"; break;
        case "vite": icon = SiIcon.SiVite; className = "text-[#646CFF]"; break;
        case "firebase": icon = SiIcon.SiFirebase; className = "text-[#DD2C00]"; break;
        // case "nextauth": icon = SiIcon.SiFirebase; className = "text-[#007ACC]"; break;
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
        case "linux-bash": icon = SiIcon.SiGnubash; className = "text-[#0b57a4]"; break;

        case "fedora": icon = SiIcon.SiFedora; className = "text-[#0b57a4]"; break;
        case "centos": icon = SiIcon.SiCentos; className = "text-[#9ece26]"; break;
        case "ubuntu": icon = SiIcon.SiUbuntu; className = "text-[#E95420]"; break;
        case "nginx": icon = SiIcon.SiNginx; className = "text-[#000000]"; break;
        case "apache": icon = SiIcon.SiApache; className = "text-[#000000]"; break;


        case "android": icon = SiIcon.SiAndroid; className = "text-[#000000]"; break;
        case "android-studio": icon = SiIcon.SiAndroidstudio; className = "text-[#3DDC84]"; break;

        case "jira": icon = SiIcon.SiJira; className = "text-[#0052CC]"; break;
        case "ci-cd": icon = BsIcon.BsCCircle; className = "text-[#fc2323]"; break;
        case "prisma": icon = SiIcon.SiPrisma; className = "text-[#000000]"; break;
        case "google-api": icon = SiIcon.SiGooglecloud; className = "text-[#000000]"; break;
        case "google_meet": icon = SiIcon.SiGooglemeet; break;
        case "vpc": icon = LuIcon.Computer; break;
        case "networking": 
        case "network-connectivity-center":
            icon = LuIcon.Network; break;


        case "computer": icon = LuIcon.Computer; break;
        case "gallery": icon = LuIcon.GalleryThumbnails; break;
        case "frameworks": icon = LuIcon.Frame; break;
        case "language": icon = LuIcon.Computer; break;
        case "camera": icon = LuIcon.LucideCamera; break;
        case "ticket": icon = LuIcon.LucideTicketsPlane; break;

        case "php-unit": icon = SiIcon.SiPhp; className = "text-[#000000]"; break;
        case "selenium": icon = SiIcon.SiSelenium; className = "text-[#000000]"; break;

        case "gemini": icon = SiIcon.SiGooglegemini; className = "text-[#4796E3]"; break;

        default:
            console.warn(`==== not found icon=[${iconName}]`)
            icon = FaIcon.FaImage
            className = "text-blue-400"
    }
    return { icon, className }
}

export default function QhIcon({ name, size, className }) {
    let classes = [
        `w-${size || 12} h-${size || 12}`
    ]

    const Icon2 = getIcon(name)
    classes.push(Icon2.className)
    if (className) {
        classes.push(className)
    }

    return (
        <div className="justify-self-center self-center">
            <Icon2.icon className={classes.join(' ')} title={name} />
        </div>
    )
}

QhIcon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string
};
