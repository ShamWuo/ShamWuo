export const SITE_CONFIG = {
    name: "Samuel Wu",
    role: "Full-Stack Software Developer & Startup Founder",
    location: "Boulder, Colorado",
    tagline: "Building AI-native diagnostic tools and scalable community OS.",
    description: "I build and ship high-performance software, AI-native products, and scalable community management systems. Specializing in TypeScript, Next.js, and AI model orchestration.",
    email: "samuel@shamwuo.com",
    socials: {
        github: "https://github.com/ShamWuo",
        twitter: "https://twitter.com/ShamWuo",
        linkedin: "https://linkedin.com/in/ShamWuo",
    },
    nav: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],
    personal: {
        intro: "I build software and study physics through movement. Dev by day, piano player and martial artist by night.",
        shortBio: "Software dev by day, piano player and martial artist by night. Currently obsessed with making AI actually useful.",
        interests: [
            {
                title: "Music",
                description: "Studying classical piano — deeply immersed in Chopin's nocturnes and the architecture of sound.",
                icon: "Music",
            },
            {
                title: "Movement",
                description: "Practicing Gong Fu and exploring the physics of internal power and momentum.",
                icon: "Zap",
            },
            {
                title: "Side Quests",
                description: "Building tools for musicians, messy game mechanics, and digital gardening.",
                icon: "Gamepad",
            }
        ]
    },
    awards: [
        {
            title: "Business Innovator Award",
            organization: "MEGA Hackathon",
            year: "2026",
            description: "Recognized for technical and business innovation in AI-driven diagnostic tools.",
        }
    ],
    experience: [
        {
            role: "Founder & Lead Developer",
            company: "Serify",
            period: "2025 - Present",
            description: "Building a context-aware AI learning engine that extracts concepts from multimedia and generates diagnostic practice questions.",
        },
        {
            role: "Lead Developer",
            company: "Quormet",
            period: "2025 - Present",
            description: "Architecting a unified community management OS for neighborhood associations and apartment complexes.",
        },
        {
            role: "Founder",
            company: "Prasic",
            period: "2024 - 2025",
            description: "Developed a structured practice and accountability app for musicians using React Native and Supabase.",
        }
    ],
    projects: [
        {
            title: "Serify",
            description: "AI that actually teaches. Ingests any media to generate Feynman-style diagnostic feedback.",
            tech: ["Next.js", "TypeScript", "Supabase", "Gemini AI"],
            liveHref: "https://serify.study",
            githubHref: "https://github.com/ShamWuo/Serify",
            featured: true,
        },
        {
            title: "Prasic",
            description: "Structural accountability for musicians. Log, track, and master your repertoire.",
            tech: ["React Native", "Expo", "Supabase"],
            githubHref: "https://github.com/ShamWuo/Prasic",
            featured: true,
        },
        {
            title: "Quormet",
            description: "Un-breaking community OS. Modern governance for HOAs and apartment complexes.",
            tech: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL"],
            liveHref: "https://quormet.com",
            githubHref: "https://github.com/Quormet/Quormet",
            featured: true,
        },
        {
            title: "Certirise",
            description: "AI-powered compliance tracker with automated event systems and vector AI integration.",
            tech: ["Automation", "Next.js", "Supabase"],
            githubHref: "https://github.com/ShamWuo/certirise",
            featured: false,
        },
        {
            title: "HOAreply",
            description: "AI-powered inbox automation system for HOA management and the reply pipeline.",
            tech: ["AI Automation", "Next.js", "Stripe"],
            githubHref: "https://github.com/ShamWuo/HOAreply",
            featured: false,
        }
    ],
};


