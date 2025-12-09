import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Send } from 'lucide-react';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';

export default function Builder() {
    const [formData, setFormData] = useState({ idea: '', mission: '' });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const resultRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

        try {
            // 1. Generate Content
            const aiRes = await axios.post(`${API_URL}/generate`, formData);
            setResult(aiRes.data);

            // 2. Submit Lead (Automation)
            await axios.post(`${API_URL}/submit`, {
                name: 'Guest User', // Simplification
                email: 'guest@example.com',
                ...formData,
                aiResult: aiRes.data
            });

        } catch (error) {
            console.error(error);
            alert('Failed to generate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-6 pt-24 font-sans">
            <SEO title="Startup Builder" />

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Input Section */}
                <div>
                    <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="text-emerald-500" /> Build Your Vision
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-600">Startup Idea</label>
                            <textarea
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none"
                                placeholder="e.g. Solar powered irrigation for rural farms..."
                                value={formData.idea}
                                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-600">Mission / Impact</label>
                            <input
                                type="text"
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="e.g. Reduce water usage by 50%"
                                value={formData.mission}
                                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                            />
                        </div>

                        <div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-600">Target Audience & Tone</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="Target Audience (e.g. Gen Z)"
                                        value={formData.audience || ''}
                                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                    />
                                    <select
                                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                                        value={formData.tone || 'Professional'}
                                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                    >
                                        <option>Professional</option>
                                        <option>Playful</option>
                                        <option>Inspirational</option>
                                        <option>Urgent</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-600">Brand Vibe</label>
                                <input
                                    type="text"
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="e.g. Futuristic, Earthy, Minimalist, Corporate..."
                                    value={formData.vibe || ''}
                                    onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Launch & Generate</>}
                        </button>
                    </form>
                </div>

                {/* Output Section */}
                <div>
                    {result ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div ref={resultRef} className="bg-white p-0 rounded-2xl shadow-2xl border relative overflow-hidden"
                                style={{ borderColor: result.design?.primaryColor || '#10B981' }}>
                                <div className="h-3 w-full" style={{ backgroundColor: result.design?.primaryColor || '#10B981' }} />

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-3xl font-bold" style={{ color: result.design?.primaryColor || '#064e3b' }}>
                                                Launch Strategy
                                            </h2>
                                            <p className="text-slate-500 text-sm mt-1">Generated for: {formData.audience || 'General Audience'}</p>
                                        </div>
                                        <div
                                            className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                                            style={{
                                                backgroundColor: `${result.design?.primaryColor}20` || '#d1fae5',
                                                color: result.design?.primaryColor || '#065f46'
                                            }}
                                        >
                                            {formData.tone || 'PRO'} Mode
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Strategy Section */}
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: result.design?.accentColor || '#3B82F6' }}></span>
                                                Go-To-Market Strategy
                                            </h3>
                                            <ul className="space-y-3">
                                                {result.strategy?.map((s, i) => (
                                                    <li key={i} className="flex gap-3 text-slate-700 text-sm">
                                                        <span className="font-bold" style={{ color: result.design?.primaryColor || '#10B981' }}>{i + 1}.</span>
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            {/* Headlines */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Winning Headlines</h3>
                                                <ul className="space-y-2">
                                                    {result.headlines?.map((h, i) => (
                                                        <li key={i} className="text-sm font-medium text-slate-800 border-l-2 border-slate-200 pl-3">{h}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Differentiators */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Differentiators</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {result.differentiators?.map((d, i) => (
                                                        <span key={i} className="text-xs bg-slate-50 text-slate-700 px-2 py-1 rounded-md font-medium border border-slate-200">
                                                            {d}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Sneak Peek */}
                                        <div className="p-4 rounded-xl border" style={{
                                            backgroundColor: `${result.design?.primaryColor}10` || '#f0fdf4',
                                            borderColor: `${result.design?.primaryColor}30` || '#dcfce7'
                                        }}>
                                            <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: result.design?.primaryColor || '#059669' }}>
                                                Viral Social Post
                                            </h3>
                                            <p className="text-sm text-slate-700 italic">"{result.socialCaptions?.[0]}"</p>
                                        </div>

                                        {/* Growth Stack (SEO & Analytics) */}
                                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                            {/* SEO Preview */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    🔍 Google Search Preview
                                                </h3>
                                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm font-sans">
                                                    <div className="text-[#1a0dab] text-lg leading-snug cursor-pointer hover:underline truncate">
                                                        {result.seo?.title || `${formData.idea} - Official Site`}
                                                    </div>
                                                    <div className="text-[#006621] text-xs mt-1">
                                                        www.impactlaunch.demo › {formData.idea.replace(/\s+/g, '-').toLowerCase()}
                                                    </div>
                                                    <div className="text-[#545454] text-sm mt-1 leading-normal line-clamp-2">
                                                        {result.seo?.description || "Sustainable solutions for modern problems. Join us today."}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Analytics Setup */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    📊 Analytics Setup (GA4)
                                                </h3>
                                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-bold text-slate-600">Primary Goal</span>
                                                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Conv.</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-800 mb-4">{result.analytics?.goal || "Sign Up"}</p>

                                                    <p className="text-xs font-bold text-slate-500 mb-2">Track These Events:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {result.analytics?.events?.map((evt, i) => (
                                                            <code key={i} className="text-xs bg-white border border-slate-300 px-2 py-1 rounded text-red-500 font-mono">
                                                                {evt}
                                                            </code>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer CTA */}
                                <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                                    <p className="text-xs text-slate-400 font-medium uppercase mb-2">Recommended CTA</p>
                                    <div
                                        className="inline-block px-6 py-2 text-white rounded-lg font-bold shadow-md"
                                        style={{ backgroundColor: result.design?.accentColor || '#10B981' }}
                                    >
                                        {result.cta}
                                    </div>
                                    {result.design?.explanation && (
                                        <p className="text-[10px] text-slate-400 mt-2">
                                            🎨 Palette: {result.design.explanation}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <SocialShare
                                title={result.headlines?.[0]}
                                text={`Strategy for ${formData.idea}: ${result.strategy?.[0]}`}
                                elementRef={resultRef}
                            />
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-8">
                            <Sparkles size={48} className="mb-4 opacity-20" />
                            <p>Your AI generated growth plan will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
