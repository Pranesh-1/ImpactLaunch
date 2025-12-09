import React from 'react';
import { BarChart3, Users, Globe, MousePointerClick } from 'lucide-react';
import SEO from '../components/SEO';

const StatCard = ({ icon: Icon, label, value, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Icon size={24} />
            </div>
            <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {trend}
            </span>
        </div>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 pt-24 font-sans">
            <SEO title="Dashboard" />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Impact Analytics</h1>
                        <p className="text-slate-500">Real-time growth metrics for your ventures.</p>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-lg text-sm font-medium border border-slate-200 text-slate-600">
                        Last 30 Days
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={Users} label="Total Leads" value="1,284" trend="+12%" />
                    <StatCard icon={Globe} label="Traffic Source" value="Social" trend="+5%" />
                    <StatCard icon={BarChart3} label="Conversion Rate" value="3.2%" trend="+0.4%" />
                    <StatCard icon={MousePointerClick} label="Avg. Daily Clicks" value="450" trend="+18%" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Chart Area (Mock) */}
                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 flex items-end justify-between px-6 pb-6 pt-20 gap-2 opacity-50">
                            {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75, 60, 95].map((h, i) => (
                                <div key={i} className="w-full bg-blue-500 rounded-t-sm hover:bg-emerald-500 transition-colors" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="relative z-10 bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm">
                            <span className="font-bold text-slate-800">Traffic Overview (Mock)</span>
                        </div>
                    </div>

                    {/* Lead List */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="font-bold mb-4">Recent Leads</h3>
                        <div className="space-y-4">
                            {[
                                { name: "EcoFarms", status: "New", time: "2m ago" },
                                { name: "CleanWater AI", status: "Contacted", time: "1h ago" },
                                { name: "EduTech Global", status: "New", time: "3h ago" },
                                { name: "Solarify", status: "Closed", time: "1d ago" },
                            ].map((lead, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {lead.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{lead.name}</div>
                                            <div className="text-xs text-slate-400">{lead.time}</div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${lead.status === 'New' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:text-blue-700">View All Leads</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
