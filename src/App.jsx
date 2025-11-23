import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    Phone,
    ExternalLink,
    Moon,
    Sun,
    Code2,
    Terminal,
    Download,
    Menu,
    X,
    ChevronUp,
    Languages
} from 'lucide-react';

// --- Data & Configuration ---

const PERSONAL_INFO = {
    name: "Vishwabandhu K N",
    tagline: "BE in Information Science — Aspiring MERN Full-Stack Developer",
    contact: {
        phone: "+91 8971911042",
        email: "vishwabandhukn@gmail.com",
        linkedin: "https://www.linkedin.com/in/vishwabandhu-kn-37375325b/",
        github: "https://github.com/vishwabandhukn",
    },
    education: "PES College Of Engineering, Mandya — BE ISE (2022–2026), CGPA: 8.0",
    about: "I am a passionate Information Science engineering student with a strong foundation in full-stack development. My expertise lies in the MERN stack, and I enjoy building scalable, user-centric applications. I am currently seeking opportunities to leverage my skills in a challenging environment."
};

const SKILLS = {
    ProgrammingLanguages: ["C", "C++", "Java"],
    Frontend: ["React", "HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    Backend: ["Node.js", "Express.js"],
    Database: ["MySQL", "MongoDB"],
    Tools: ["Git", "GitHub", "VS Code", "Postman"]
};

const CODING_PROFILES = [
    { name: "LeetCode", count: "300+ Problems", rating: "Max 1605", link: "https://leetcode.com/u/VISHHWABANDU/" },
    { name: "GeeksForGeeks", count: "250+ Problems", score: "", link: "https://www.geeksforgeeks.org/user/vishwabatxx8/" },
    { name: "Coding Ninjas", count: "XP 6,650 Points", score: "", link: "https://www.naukri.com/code360/profile/ecf0f7d0-52bc-44f2-8d65-8a54dff4e920" },
];

const EDUCATION_DATA = [
    {
        id: 1,
        institution: "Oxford High School",
        degree: "Secondary Education",
        year: "2020",
        score: "83.53%"
    },

    {
        id: 2,
        institution: "B Lingaiah Res Pre-University College",
        degree: "Pre-University Education",
        year: "2022",
        score: "86%"
    },
    {
        id: 3,
        institution: "PES College Of Engineering, Mandya",
        degree: "BE in Information Science & Engineering",
        year: "2022 — 2026",
        score: "CGPA: 8.0"
    },
];

export const projectsData = [
    {
        id: 1,
        title: "GyanPatra",
        shortDescription: "Full-stack multilingual news platform (English, Kannada, Hindi).",
        longDescription: "A comprehensive news aggregation platform that supports multiple languages including English, Kannada, and Hindi. It aggregates live updates from RSS feeds and web scraping. Features include a responsive UI, category filtering, and Redux for efficient state management across languages.",
        tech: ["React", "Node.js", "Express.js", "TailwindCSS", "Redux"],
        github: "https://github.com/vishwabandhukn/GyanPatra",
        image: "/gyanpatra.png"
    },
    {
        id: 2,
        title: "Comunity",
        shortDescription: "Video calling & chat application with real-time features.",
        longDescription: "A robust communication platform featuring secure authentication, friend management, and real-time messaging using Stream API. It includes video calling capabilities and uses TanStack Query for efficient data fetching and Redux for state management.",
        tech: ["React", "Node.js", "MongoDB", "Stream API", "TanStack Query"],
        github: "https://github.com/vishwabandhukn/Comunity",
        image: "/comunity.png"
    },
    {
        id: 3,
        title: "CodeSync AI Chat",
        shortDescription: "AI-powered developer chat with real-time collaboration.",
        longDescription: "An intelligent chat application designed for developers, featuring real-time collaboration and integration with the Gemini API for AI assistance. It utilizes Redis for caching, implements role-based access control, and supports streaming AI responses.",
        tech: ["React", "MongoDB", "Socket.io", "Redis", "Gemini API"],
        github: "https://github.com",
        image: "/codesyncai.png"
    }
];

// --- Hooks ---

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
};

const useScrollTo = () => {
    const scrollToId = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return scrollToId;
};

// --- Components ---

const ParticleBackground = ({ darkMode }) => {
    const canvasRef = React.useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((a, index) => {
                for (let i = index + 1; i < particles.length; i++) {
                    const b = particles[i];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = darkMode ? `rgba(255, 255, 255, ${1 - distance / 150})` : `rgba(0, 0, 0, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none"
        />
    );
};

const Navbar = ({ darkMode, toggleTheme }) => {
    const scrollTo = useScrollTo();
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { name: 'Home', id: 'hero' },
        { name: 'Projects', id: 'projects' },
        { name: 'Skills', id: 'skills' },
        { name: 'About', id: 'about' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollTo('hero')}>
                        VKN
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollTo(link.id)}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle Dark Mode"
                            >
                                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleTheme}
                            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        scrollTo(link.id);
                                        setIsOpen(false);
                                    }}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => {
    return (
        <section id="hero" className=" relative overflow-hidden lg:py-28">
            {/* Background Blobs - Kept for subtle color but reduced opacity if needed, or removed if particles are enough. Keeping for now as they add color. */}
            {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div> */}

            <div className=" max-w-7xl mx-auto  sm:px-6 lg:px-8 relative z-10 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
                >
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-4">
                            Hello, I'm
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {PERSONAL_INFO.name}
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            {PERSONAL_INFO.tagline}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
                            <a
                                href="#contact"
                                className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                            >
                                Get in Touch
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 shadow-sm"
                            >
                                <Download size={18} />
                                View Resume
                            </a>
                        </div>

                        <div className="mt-12 flex justify-center md:justify-start gap-6">
                            <SocialLink href={PERSONAL_INFO.contact.github} icon={<Github />} label="GitHub" />
                            <SocialLink href={PERSONAL_INFO.contact.linkedin} icon={<Linkedin />} label="LinkedIn" />
                            <SocialLink href={`mailto:${PERSONAL_INFO.contact.email}`} icon={<Mail />} label="Email" />
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="relative inline-block flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 animate-pulse"></div>
                        <img
                            src="/profile.jpg"
                            alt={PERSONAL_INFO.name}
                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
        aria-label={label}
    >
        {icon}
    </a>
);


const Education = () => {
    return (
        <section id="education" className="py-12 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">EDUCATION</h2>
                    <div className="space-y-6">
                        {EDUCATION_DATA.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-[1px] shadow-xl"
                            >
                                <div className="bg-white dark:bg-gray-900 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 flex-shrink-0">
                                            <Code2 size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                                {edu.institution}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2 text-center md:text-right w-full md:w-auto">
                                        <span className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                            {edu.year}
                                        </span>
                                        <div className="flex items-center justify-center md:justify-end gap-2 text-gray-900 dark:text-white font-bold text-lg">
                                            <span>{edu.score.includes('CGPA') ? edu.score : `Score: ${edu.score}`}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full"
        >
            <div className="h-64 bg-gray-100 dark:bg-gray-700 relative overflow-hidden group">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform" title="View Code">
                            <Github size={20} />
                        </a>
                    )}

                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 leading-relaxed">
                    {project.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const getSkillIcon = (skill) => {
        // Map skills to skillicons.dev IDs
        const iconMap = {
            "C": "c",
            "C++": "cpp",
            "Java": "java",
            "React": "react",
            "HTML5": "html",
            "CSS3": "css",
            "Tailwind CSS": "tailwind",
            "JavaScript": "js",
            "Node.js": "nodejs",
            "Express.js": "express",
            "MySQL": "mysql",
            "Git": "git",
            "GitHub": "github",
            "VS Code": "vscode",
            "Postman": "postman",
            "MongoDB": "mongodb"
        };

        if (iconMap[skill]) {
            return (
                <img
                    src={`https://skillicons.dev/icons?i=${iconMap[skill]}`}
                    alt={skill}
                    className="w-20 h-20 md:w-24 md:h-24 hover:scale-110 transition-transform duration-300"
                />
            );
        }

        return null;
    };

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">SKILLS</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed mb-10 font-light max-w-2xl mx-auto">
                        A comprehensive toolkit for building modern, scalable applications.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {Object.entries(SKILLS).map(([category, items], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 relative inline-block">
                                {category}
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500/30 rounded-full"></span>
                            </h3>

                            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                {items.map((skill) => (
                                    <div key={skill} className="flex flex-col items-center gap-3 group">
                                        {getSkillIcon(skill)}
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="pb-24 pt-0 bg-white dark:bg-gray-900 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                            About <span className="text-blue-600 dark:text-blue-400">Me</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-200 text-xl leading-relaxed font-light">
                            {PERSONAL_INFO.about}
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                        <Terminal size={24} />
                                    </div>
                                    Coding Profiles
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    {CODING_PROFILES.map((profile) => (
                                        <a
                                            key={profile.name}
                                            href={profile.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative overflow-hidden p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <div className="relative z-10">
                                                <h5 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                                                    {profile.name}
                                                </h5>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                                                    {profile.count}
                                                </p>
                                                {profile.rating && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md inline-block">
                                                        {profile.rating}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors"></div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] transform rotate-3 opacity-10 blur-2xl"></div>
                        <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-10 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                                Involvement
                            </h3>
                            <div className="space-y-6">
                                <div className="pl-4 border-l-2 border-blue-100 dark:border-gray-700">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Web Developer</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">FOSS Club</p>
                                    <p className="text-gray-600 dark:text-gray-200 font-light text-xl ">
                                        Developed event pages and maintained the club website, ensuring responsive design and accessibility. Collaborated with a team to deliver high-quality web solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">GET IN TOUCH</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Feel free to reach out through any of the platforms below.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <a href={`tel:${PERSONAL_INFO.contact.phone}`} className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                            <Phone size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                        <p className="text-gray-600 dark:text-gray-400">{PERSONAL_INFO.contact.phone}</p>
                    </a>

                    <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">{PERSONAL_INFO.contact.email}</p>
                    </a>

                    <a href={PERSONAL_INFO.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                            <Linkedin size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
                        <p className="text-gray-600 dark:text-gray-400">Connect with me</p>
                    </a>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const scrollTo = useScrollTo();

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{PERSONAL_INFO.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6">
                    <SocialLink href={PERSONAL_INFO.contact.github} icon={<Github size={20} />} label="GitHub" />
                    <SocialLink href={PERSONAL_INFO.contact.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
                    <SocialLink href={`mailto:${PERSONAL_INFO.contact.email}`} icon={<Mail size={20} />} label="Email" />
                </div>

                <button
                    onClick={() => scrollTo('hero')}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Scroll to top"
                >
                    <ChevronUp size={20} />
                </button>
            </div>
        </footer>
    );
};

// --- Main App Component ---

function App() {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 relative">
            <ParticleBackground darkMode={darkMode} />
            <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(darkMode)} />

            <main>
                <Hero />
                <About />
                <Education />

                <section id="projects" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">PROJECTS</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                A selection of projects that showcase my technical expertise and problem-solving abilities.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
                            {projectsData.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                <Skills />

                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;
