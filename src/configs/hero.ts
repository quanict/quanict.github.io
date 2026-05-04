

import { HeroData } from "@/features/Hero/types"

// import HeroImg from "@/features/About/images/IMG_20250331_132637.jpg";

const hero: HeroData = {
    experience_years : 17,
    img: "images/IMG_20250331_132637.jpg",
    roles: [
        "Full-Stack Developer & UI/UX Enthusiast",
        "JavaScript & TypeScript Lover",
        "React & NextJS Developer",
        "Learning MARN Stack",
        "Git & GitHub for Version Control",
        "Passionate about Clean Code",
    ],
    titles: [
        "From Code to Leadership – My Journey in Software Engineering"
    ],

    name: process.env.NEXT_PUBLIC_HERO_FULLNAME|| "Mohi Uddin",
    welcome: "Welcome to my universe",
    description: "Experienced software engineer with over 17 years in web and system development, working across start-ups and large enterprises. Skilled in full-stack development, system architecture, and leading software teams to deliver scalable, maintainable, and efficient solutions.",
    profile_link: "",
    about: {
        description: "I'm Nguyen Hong Quan, a passionate and experienced Senior Software Engineer / Project Leader with over 17 years of hands-on experience in full-stack web development, cloud-based architecture, and team leadership. \
                    \nI specialize in building robust, scalable, and user-centric applications using technologies like PHP, Node.js, Python, and modern frontend frameworks such as React.js, Vue.js, and Nuxt.js. My professional journey spans across startups, enterprise environments, and freelance consulting, giving me a broad perspective and adaptive problem-solving skills. \
                    \nThroughout my career, I've led and contributed to various impactful projects—ranging from cinema booking systems, domain hosting platforms, and financial form builders, to custom WHMCS modules and video conferencing tools. \
                    \nI take pride in combining technical expertise with product thinking, ensuring that every solution not only works well, but also delivers a great user experience. \
                    \nWhether it's building from scratch, optimizing legacy code, or mentoring junior developers, I bring commitment, curiosity, and clarity to every challenge.\
                    ",
        singature: ""
    }
}
export default hero