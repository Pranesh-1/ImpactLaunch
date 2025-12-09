import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Globe, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
            <SEO />

            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 backdrop-blur-md border-b border-white/20">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                        ImpactLaunch
                    </div>
                    <Link to="/build" className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition font-medium">
                        Launch App
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6">
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6"
                    >
                        Build Startups for <br />
                        <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">People, Planet & Profit</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto"
                    >
                        The AI-powered growth platform for purpose-driven founders. Generate marketing, automate leads, and scale your impact.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/build" className="group flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white text-lg font-semibold rounded-full hover:bg-emerald-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Start Building <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Globe, title: "Global Impact", desc: "Tools designed for climate, education, and social ventures." },
                        { icon: Zap, title: "AI Automation", desc: "Generate SEO-optimized content and growth strategies in seconds." },
                        { icon: Leaf, title: "Sustainable Growth", desc: "Analytics and tracking built for long-term value, not just hype." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition"
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center text-slate-500 text-sm">
                <p>© 2024 ImpactLaunch. Built for the Future.</p>
            </footer>
        </div>
    );
}
