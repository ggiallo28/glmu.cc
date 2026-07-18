import React, { useState } from 'react';

interface ScopeDetail {
  title: string;
  timeline: string;
  focus: string;
  whatWeBuild: string;
  deliverables: string[];
  verification: string;
}

const scopeDetails: Record<'infrastructure' | 'ai' | 'training', ScopeDetail> = {
  infrastructure: {
    title: "Multi-Tenant Platform Foundations",
    timeline: "3-6 Weeks",
    focus: "Deploying secure multi-tenant isolation boundaries, establishing granular KMS custody encryption keys, and engineering reusable infrastructure templates via Terraform.",
    whatWeBuild: "We design secure cloud architectures where tenant separation is structural. This includes configuring isolated VPC subnet networks, least-privilege IAM policies, and granular KMS data keys, all packaged into reusable infrastructure-as-code files.",
    deliverables: [
      "Private VPC subnet networks, security groups, and IAM roles.",
      "Modular Terraform templates structured for separate staging environments.",
      "Automated infrastructure drift checks and policy verification rules."
    ],
    verification: "Validated in production: Over twenty enterprise cloud platforms successfully migrated to secure three-tier subnetworks with zero security isolation boundaries breached across European financial operations."
  },
  ai: {
    title: "Sovereign AI & Agent Platform Design",
    timeline: "3-6 Weeks",
    focus: "Building robust multi-context semantic memory databases, implementing rigid model safety execution filters, and designing custom agent budget limit circuit-breakers.",
    whatWeBuild: "We deploy modular intelligent workflow orchestrators integrated with protected database layers. This features context memory pipelines, automated model execution boundaries, and rigid circuit-breakers built to mitigate loop cost overheads.",
    deliverables: [
      "Dedicated context database clusters and secure API proxy gateways.",
      "State-machine flow orchestrators preventing infinite execution run loops.",
      "Custom cost-containment dashboards with automatic budget threshold limits."
    ],
    verification: "Validated in production: Engineered robust budget protection layers and custom prompt filtering blocks for high-volume linguistic engines, completely preventing cost loops in active systems."
  },
  training: {
    title: "Enterprise Engineering Enablement",
    timeline: "3-6 Weeks",
    focus: "Providing authorized hyper-scaler training tracks, delivering targeted platform architecture reviews, and coaching engineering teams to achieve deep deployment autonomy.",
    whatWeBuild: "We deliver custom technical enablement sessions bridging architectural theory with active production delivery. This features certified curriculum prep-work, sandbox incident workshops, and direct code-level coaching for systems builders.",
    deliverables: [
      "Official certification exam study resources and practice review tracks.",
      "Practical sandbox incident response blueprints and live scenario guides.",
      "Comprehensive platform reviews and custom architecture reference guidebooks."
    ],
    verification: "Validated in production: Instructed over three thousand system engineers on high-availability patterns. Maintained official certification trainer status with premier technical partner networks across Europe."
  }
};

export default function App() {
  // Desktop Tab Selection
  const [selectedDomain, setSelectedDomain] = useState<'infrastructure' | 'ai' | 'training'>('infrastructure');
  
  // Mobile Accordion: allow multiple sections to be open at once, or closed completely!
  const [expandedMobileDomains, setExpandedMobileDomains] = useState<('infrastructure' | 'ai' | 'training')[]>(['infrastructure']);

  // Consultation Form State
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    area: 'Cloud Infrastructure',
    message: ''
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleMobileDomain = (domain: 'infrastructure' | 'ai' | 'training') => {
    if (expandedMobileDomains.includes(domain)) {
      setExpandedMobileDomains(expandedMobileDomains.filter(d => d !== domain));
    } else {
      setExpandedMobileDomains([...expandedMobileDomains, domain]);
      setSelectedDomain(domain); // Keep desktop state in sync
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { name, company, email, message } = formState;

    if (!name.trim() || !company.trim() || !email.trim() || !message.trim()) {
      setFormError('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormState({
        name: '',
        company: '',
        email: '',
        area: 'Cloud Infrastructure',
        message: ''
      });
    }, 1000);
  };

  const renderDomainContent = (key: 'infrastructure' | 'ai' | 'training') => {
    const details = scopeDetails[key];
    return (
      <div className="w-full flex flex-col justify-between h-full space-y-6 sm:space-y-8 animate-fade-in" id={`scope-content-${key}`}>
        <div className="space-y-6 sm:space-y-8">
          {/* Header with Title and Timeline */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-stone-900">{details.title}</h3>
              <p className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-wider">Engagement Track</p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded bg-stone-100 text-stone-700 font-mono text-[10px] sm:text-xs uppercase tracking-wide">
                Timeline: {details.timeline}
              </span>
            </div>
          </div>

          {/* Focus Callout */}
          <div className="bg-[#FAF9F6] border-l-2 border-stone-800 p-4 rounded-r">
            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Primary Focus</p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light italic">
              {details.focus}
            </p>
          </div>

          {/* What We Build */}
          <div>
            <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2 sm:mb-3">What we build</h4>
            <div className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light space-y-3">
              {details.whatWeBuild.split('\n\n').map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2 sm:mb-3">Key Deliverables</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm text-stone-600 font-light">
              {details.deliverables.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-stone-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Grounded In */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-100 bg-[#FAF9F6]/50 p-4 rounded border border-stone-200/40">
          <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Grounded in Production Reality</h4>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            {details.verification}
          </p>
        </div>
      </div>
    );
  };

  const domainsList: { key: 'infrastructure' | 'ai' | 'training'; num: string; label: string }[] = [
    { key: 'infrastructure', num: '01', label: 'Foundations' },
    { key: 'ai', num: '02', label: 'AI Safety' },
    { key: 'training', num: '03', label: 'Enablement' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white animate-fade-in" id="glmu-minimal">
      
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-stone-200/60" id="glmu-header">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Elegant Minimal Logo */}
            <div className="flex items-center space-x-2.5">
              <span className="font-display font-bold text-lg tracking-wider text-stone-950 uppercase">GLMU</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded">Consulting</span>
            </div>

            {/* Quick Action Link */}
            <div>
              <a 
                href="#contact" 
                className="text-xs font-mono uppercase tracking-wider text-stone-950 border-b border-stone-950 hover:border-transparent pb-0.5 transition-all"
                id="inquire-nav-link"
              >
                Inquire Portal
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-20 sm:py-28 border-b border-stone-200/60 overflow-hidden" id="glmu-hero">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-stone-950 mb-6 leading-[1.15]">
            Sovereign Cloud Architectures.<br />
            <span className="font-semibold text-stone-900">Enterprise AI & Enablement.</span>
          </h1>

          <p className="text-base text-stone-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Premium cloud consulting boutique. Designing and delivering secure, multi-tenant architectures and professional generative AI environments.
          </p>

          <div className="flex justify-center">
            <a 
              href="#contact" 
              className="px-8 py-3.5 text-xs font-mono uppercase tracking-wider bg-stone-950 text-white hover:bg-stone-800 transition-colors rounded text-center"
              id="hero-cta-btn"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* IDENTITY */}
      <section className="py-16 border-b border-stone-200/60 bg-[#FAF9F6]" id="glmu-identity">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Firm Profile</span>
              <h2 className="font-display text-2xl font-bold text-stone-900 mt-2">
                Operational Integrity
              </h2>
            </div>

            <div className="md:col-span-8 text-stone-500 text-sm sm:text-base font-light space-y-4 leading-relaxed">
              <p>
                Providing clear-cut systems design with direct production accountability. Operating with over a decade of technical experience, assisting enterprises in shifting legacy systems safely into modern multi-tenant environments.
              </p>
              <p>
                As active educators under authorized hyper-scaler training networks, advocating that world-class code and clean architecture remain completely accessible, reproducible, and verifiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE STREAMS */}
      <section className="py-20 border-b border-stone-200/60 bg-white" id="expertise">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Practice Streams</span>
            <h2 className="font-display text-2xl font-normal text-stone-900 mt-1">
              Core Architecture Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stream 1 */}
            <div className="flex flex-col justify-between p-6 rounded border border-stone-100 bg-stone-50/50 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/10 hover:shadow-sm group" id="stream-infrastructure">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-4 group-hover:text-blue-500 transition-colors">Stream 01</span>
                <h3 className="font-display font-semibold text-base text-stone-900 mb-2 group-hover:text-blue-900 transition-colors">Cloud Infrastructure</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                  Design and execution of highly isolated multi-tenant systems. Clean VPC boundaries, granular IAM least privilege, and standardized Terraform modules.
                </p>
              </div>
              <ul className="space-y-2 border-t border-stone-200/60 pt-4 text-[11px] text-stone-600 font-light">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-blue-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Multi-tenant VPC design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-blue-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>KMS isolation & custody</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-blue-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Terraform / HCL standards</span>
                </li>
              </ul>
            </div>

            {/* Stream 2 */}
            <div className="flex flex-col justify-between p-6 rounded border border-stone-100 bg-stone-50/50 transition-all duration-300 hover:border-violet-400 hover:bg-violet-50/10 hover:shadow-sm group" id="stream-ai">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-4 group-hover:text-violet-500 transition-colors">Stream 02</span>
                <h3 className="font-display font-semibold text-base text-stone-900 mb-2 group-hover:text-violet-900 transition-colors">AI & Systems</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                  Production deployment of safe AI agents. Context engineering, semantic layers, and strict budget/recursion boundaries.
                </p>
              </div>
              <ul className="space-y-2 border-t border-stone-200/60 pt-4 text-[11px] text-stone-600 font-light">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-violet-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Multi-agent coordination</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-violet-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Context storage architecture</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-violet-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Safety boundaries & filters</span>
                </li>
              </ul>
            </div>

            {/* Stream 3 */}
            <div className="flex flex-col justify-between p-6 rounded border border-stone-100 bg-stone-50/50 transition-all duration-300 hover:border-orange-400 hover:bg-orange-50/10 hover:shadow-sm group" id="stream-training">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-4 group-hover:text-orange-500 transition-colors">Stream 03</span>
                <h3 className="font-display font-semibold text-base text-stone-900 mb-2 group-hover:text-orange-900 transition-colors">Technical Training</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                  Elite enablement workshops. Certified curricula delivered across Europe. Deep-dives on serverless architecture and emerging cloud engineering.
                </p>
              </div>
              <ul className="space-y-2 border-t border-stone-200/60 pt-4 text-[11px] text-stone-600 font-light">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-orange-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Authorized Curricula</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-orange-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Champion-level training</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-stone-500 group-hover:text-orange-500 transition-colors"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Custom engineering bootcamps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIABLE CREDENTIALS */}
      <section className="py-20 border-b border-stone-200/60 bg-[#FAF9F6]" id="credentials">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Verifiable Credentials</span>
              <h2 className="font-display text-2xl font-bold text-stone-900 mt-2">
                Certified Professional Benchmarks
              </h2>
              <p className="text-xs text-stone-500 leading-relaxed font-light mt-4">
                Holding the highest tiers of professional credentials directly from the hyper-scalers, authorizing elite cloud architecture delivery and enterprise enablement across EU networks.
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Google Cloud Card */}
                <div className="p-6 bg-white border border-stone-200/60 rounded-lg flex flex-col justify-between min-h-[260px] transition-all hover:border-stone-400/80 group">
                  <div className="flex items-center justify-start mb-6">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" 
                      alt="Google Cloud Official Logo" 
                      className="h-9 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block border-b border-stone-100 pb-2">Google Cloud Platform</span>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 leading-snug">Professional Cloud Architect</h4>
                        <span className="text-[9px] font-mono text-stone-500 block mt-0.5">GCP (PCA-9831)</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 leading-snug">Generative AI Leader</h4>
                        <span className="text-[9px] font-mono text-stone-500 block mt-0.5">GCP (GAIL-2301)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AWS Card */}
                <div className="p-6 bg-white border border-stone-200/60 rounded-lg flex flex-col justify-between min-h-[260px] transition-all hover:border-stone-400/80 group">
                  <div className="flex items-center justify-start mb-6">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" 
                      alt="Amazon Web Services Official Logo" 
                      className="h-8 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block border-b border-stone-100 pb-2">Amazon Web Services</span>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 leading-snug">Authorized Instructor</h4>
                        <span className="text-[9px] font-mono text-stone-500 block mt-0.5">Active Status (AAI-CHAMP-8822)</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 leading-snug">Professional Solutions Architect</h4>
                        <span className="text-[9px] font-mono text-stone-500 block mt-0.5">Active Status (SAP-C02)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* INTERACTIVE COMPONENT - SCOPE DETAILS */}
      <section className="py-20 border-b border-stone-200/60 bg-white" id="scope-planner">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Scope Overview</span>
            <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
              Bespoke Engagement Models
            </h2>
          </div>

          {/* Desktop and Mobile Tabs/Accordion Container */}
          <div id="scope-planner-wrapper">
            {/* Desktop View */}
            <div className="hidden sm:block border border-stone-200 rounded-lg overflow-hidden bg-[#FAF9F6]">
              {/* Domain Tabs */}
              <div className="flex border-b border-stone-200 text-xs font-mono">
                {domainsList.map(({ key, num, label }) => {
                  const isActive = selectedDomain === key;
                  const baseClass = "flex-1 py-4 text-center transition-all cursor-pointer font-mono text-xs uppercase tracking-wider border-r border-stone-200 last:border-r-0";
                  const activeClass = isActive
                    ? "bg-white font-semibold text-stone-950"
                    : "bg-stone-50/20 text-stone-400 hover:text-stone-700 hover:bg-stone-100/50";
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDomain(key)}
                      className={`${baseClass} ${activeClass}`}
                    >
                      {num}. {label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Details */}
              <div className="p-8 bg-white min-h-[400px] flex flex-col justify-between" id="scope-display-box">
                {renderDomainContent(selectedDomain)}
              </div>
            </div>

            {/* Mobile View (Accordion) */}
            <div className="block sm:hidden space-y-4" id="scope-mobile-accordion">
              {domainsList.map(({ key, num, label }) => {
                const isSelected = expandedMobileDomains.includes(key);
                const headerClass = isSelected
                  ? "w-full flex items-center justify-between p-4 font-mono text-xs uppercase tracking-wider text-stone-950 bg-white font-semibold border-l-2 border-stone-950 cursor-pointer text-left focus:outline-none"
                  : "w-full flex items-center justify-between p-4 font-mono text-xs uppercase tracking-wider text-stone-400 bg-stone-50/50 hover:text-stone-700 hover:bg-stone-100/30 border-l-2 border-transparent cursor-pointer text-left focus:outline-none";

                const contentClass = isSelected
                  ? "p-5 bg-white border-t border-stone-100 block"
                  : "hidden";

                const iconRotation = isSelected ? "rotate-180" : "";

                return (
                  <div key={key} id={`mob-container-${key}`} className="border border-stone-200 rounded-lg overflow-hidden bg-[#FAF9F6] transition-all">
                    {/* Accordion Header Button */}
                    <button 
                      onClick={() => toggleMobileDomain(key)}
                      className={headerClass}
                    >
                      <span>{num}. {label}</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 transform ${iconRotation} text-stone-500 flex-shrink-0 ml-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Accordion Expandable Content */}
                    <div id={`mob-panel-${key}`} className={contentClass}>
                      {isSelected && renderDomainContent(key)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Bespoke Callout */}
          <div className="mt-8 p-6 bg-stone-100/50 border border-stone-200/60 rounded-lg animate-fade-in" id="why-bespoke-callout">
            <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">Why "Bespoke"</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              These are not off-the-shelf packages. Timeline and scope flex based on what you already have (a greenfield foundation vs. a legacy VPC with 47 security groups) and what your production reality is (a 3-person team vs. 50 engineers across 4 time zones). The deliverables are what survives contact with your constraints, not what a generic playbook says you should build.
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 border-b border-stone-200/60 bg-[#FAF9F6]" id="testimonials">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-10 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Institutional Trust</span>
            <h2 className="font-display text-2xl font-bold text-stone-900 mt-2">Client Advisory Board Feedback</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border border-stone-200/60 rounded flex flex-col justify-between animate-fade-in" id="quote-1">
              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed font-light mb-6">
                "Consulting restructured core spatial intelligence platform boundaries. Their focus on automated resource containment metrics saved significant operational overhead."
              </p>
              <div>
                <h4 className="font-display font-bold text-stone-900 text-xs">VP of Telecommunications</h4>
                <p className="text-[10px] font-mono text-stone-400 mt-0.5">TELCO GLOBAL EUROPE</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-stone-200/60 rounded flex flex-col justify-between animate-fade-in" id="quote-2">
              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed font-light mb-6">
                "Training execution is exemplary. Having key systems builders taught directly by Champion-level instructors has established complete internal deployment autonomy."
              </p>
              <div>
                <h4 className="font-display font-bold text-stone-900 text-xs">Director of Enterprise Enablement</h4>
                <p className="text-[10px] font-mono text-stone-400 mt-0.5">ATP GROUP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT PORTAL */}
      <section className="py-20 bg-white scroll-mt-20" id="contact">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-2">Connect</span>
                <h2 className="font-display text-3xl font-normal text-stone-900 leading-tight">
                  Initiate Case Review
                </h2>
                <p className="text-xs text-stone-500 mt-4 leading-relaxed font-light">
                  Submit a corporate brief regarding compliance boundaries or technical training requirements. Responses are provided to verified corporate emails within 24 business hours.
                </p>
              </div>

              <div className="space-y-4 mt-8 md:mt-0 pt-6 border-t border-stone-100">
                <div className="flex items-center space-x-3 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-stone-400 flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <a href="mailto:gianlu@glmu.cc" className="text-stone-600 hover:text-stone-900 font-mono">gianlu@glmu.cc</a>
                </div>
                <div className="flex items-center space-x-3 text-xs text-stone-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-stone-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  <span>Based in Italy, serving EU networks</span>
                </div>
                
                {/* Social references */}
                <div className="flex items-center space-x-3 pt-2">
                  <a 
                    href="https://linkedin.com/in/ggiallo28" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-400 hover:text-blue-600 hover:border-blue-400 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a 
                    href="https://github.com/ggiallo28" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-400 hover:text-stone-950 hover:border-stone-950 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a 
                    href="https://gmucciolo.it/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-400 hover:text-emerald-600 hover:border-emerald-400 transition-colors duration-300"
                    aria-label="Blog"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7">
              <div className="p-6 sm:p-8 rounded border border-stone-200 bg-[#FAF9F6]">
                {/* Success State Container */}
                {formSuccess ? (
                  <div id="form-success-container" className="text-center py-8">
                    <span className="p-2 bg-stone-100 text-stone-800 rounded-full inline-block mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    </span>
                    <h3 className="font-display font-semibold text-sm text-stone-950 mb-1">Inquiry Registered</h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto font-light leading-relaxed">
                      Technical specification sheet has been filed. An architect will connect shortly.
                    </p>
                    <button 
                      onClick={() => setFormSuccess(false)}
                      className="mt-4 text-xs font-mono uppercase tracking-wider text-stone-950 border-b border-stone-950 hover:border-transparent pb-0.5 transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  /* Consultation Form */
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {formError && (
                      <div id="form-error-container" className="p-3 text-[11px] bg-stone-100 border border-stone-200 text-stone-700 rounded font-mono">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">Contact Name *</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                          required
                          className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-300 text-xs rounded focus:outline-none focus:border-stone-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">Organization *</label>
                        <input 
                          type="text" 
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleInputChange}
                          placeholder="Acme Corp" 
                          required
                          className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-300 text-xs rounded focus:outline-none focus:border-stone-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">Business Email *</label>
                        <input 
                          type="text" 
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="j.doe@company.com" 
                          required
                          className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-300 text-xs rounded focus:outline-none focus:border-stone-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="area" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">Practice Area</label>
                        <select 
                          id="area"
                          name="area"
                          value={formState.area}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 text-xs rounded focus:outline-none focus:border-stone-400 cursor-pointer"
                        >
                          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                          <option value="AI & Machine Learning">AI & Machine Learning</option>
                          <option value="Enablement / Workshops">Enablement / Workshops</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">Requirements *</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Core deliverables..."
                        required
                        className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-300 text-xs rounded focus:outline-none focus:border-stone-400 resize-none font-light"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-stone-950 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-mono uppercase tracking-widest rounded transition-colors cursor-pointer"
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Corporate Inquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-10 border-t border-stone-200/60 bg-[#FAF9F6] text-stone-400 text-[11px]" id="glmu-footer">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-display font-semibold text-stone-900 uppercase">GLMU Consulting</span>
            <span>© <span>{new Date().getFullYear()}</span> glmu.cc. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <span>Corporate Registries: EU</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
