import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Mail, 
  Linkedin, 
  Github, 
  Globe, 
  Building2,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    area: 'Cloud Infrastructure',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Interactive Scope tool - super sleek, uncrowded
  const [selectedDomain, setSelectedDomain] = useState<'infrastructure' | 'ai' | 'training'>('infrastructure');

  const scopeDetails = {
    infrastructure: {
      title: "Multi-Tenant Platform Foundations",
      timeline: "3-6 Weeks",
      focus: "Isolating tenant boundaries, setting up least-privilege KMS encryption, and drafting spec-driven Terraform modules.",
      whatWeBuild: "A production-grade foundation layer where tenant isolation is architectural, not aspirational. VPC design with separate CIDR blocks, KMS encryption with per-tenant key isolation, and IAM roles structured so unauthorized cross-reads are structurally impossible. Infrastructure is delivered via reusable Terraform modules governed by OPA rego policies to block invalid plans and detect drift.",
      deliverables: [
        "VPC, subnets, NAT gateways, KMS keys, and IAM roles stack",
        "Terraform modules with environment parameter files (dev/prod)",
        "OPA rego policies and cross-stack orchestration contracts"
      ],
      verification: "Grounded in: 27+ architectural phases deployed on a production analytics platform (2024-2026). Platform migration: three-layer template-driven architecture with multi-zone networks, multi-zone relational databases, and serverless database clusters."
    },
    ai: {
      title: "Sovereign AI & Agent Governance",
      timeline: "2-4 Weeks",
      focus: "Engineering purpose-built data context stores (graph, vector, relational) and safeguarding agent workflows with strict cost circuit-breakers.",
      whatWeBuild: "Production-ready AI agent systems where agents lack direct database access, cost guardrails prevent runaway loops, and queries are routed across a five-context architecture (key-value storage for state, graph database for topology, search index for documents, relational database for history, and object storage for raw evidence) utilizing private endpoints and strict row/column database access control filters.",
      deliverables: [
        "Multi-agent coordination via state-machine orchestrators or cloud-native workflow engines",
        "Context store schema design with access policies and private network isolation",
        "Agent governance layer with budget thresholds and execution ceilings"
      ],
      verification: "Grounded in: Production multi-agent platforms. Built circuit-breaker and cost mitigation framework following a 250 million token recursive loop recovery incident."
    },
    training: {
      title: "Enterprise Engineering Enablement",
      timeline: "Flexible / Structured",
      focus: "Delivering structured curriculum programs and advanced technical deep-dives to help corporate engineering teams achieve operational autonomy.",
      whatWeBuild: "Technical training programs designed to bridge the gap between cloud architecture theory and production-grade execution. This includes official certification courses via authorized training networks, advanced multi-cloud deep-dives based on real-world production post-mortems, custom problem-centric workshops, and targeted architecture mentorship to help engineering teams build long-term operational autonomy.",
      deliverables: [
        "Official cloud certification tracks via authorized training partnerships",
        "Advanced cloud deep-dives with real production case studies and exercises",
        "Custom 1-3 day intensive architecture and incident response bootcamps"
      ],
      verification: "Grounded in: Certified instructor training over 3,500 engineers across Europe. Conference speaker and author of production-based case studies."
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        area: 'Cloud Infrastructure',
        message: ''
      });
    }, 1000);
  };

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

          <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-stone-950 mb-6 leading-[1.15]">
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
            <div className="flex flex-col justify-between p-6 rounded border border-stone-100 bg-stone-50/50" id="stream-infrastructure">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-4">Stream 01</span>
                <h3 className="font-display font-semibold text-base text-stone-900 mb-2">Cloud Infrastructure</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                  Design and execution of highly isolated multi-tenant systems. Clean VPC boundaries, granular IAM least privilege, and standardized Terraform modules.
                </p>
              </div>
              <ul className="space-y-2 border-t border-stone-200/60 pt-4 text-[11px] text-stone-600 font-light">
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Multi-tenant VPC design</span></li>
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>KMS isolation & custody</span></li>
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Terraform / HCL standards</span></li>
              </ul>
            </div>

            {/* Stream 2 */}
            <div className="flex flex-col justify-between p-6 rounded border border-stone-100 bg-stone-50/50" id="stream-ai">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-4">Stream 02</span>
                <h3 className="font-display font-semibold text-base text-stone-900 mb-2">AI & Systems</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                  Production deployment of safe AI agents. Context engineering, semantic layers, and strict budget/recursion boundaries.
                </p>
              </div>
              <ul className="space-y-2 border-t border-stone-200/60 pt-4 text-[11px] text-stone-600 font-light">
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Multi-agent coordination</span></li>
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Context storage architecture</span></li>
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Safety boundaries & filters</span></li>
              </ul>
            </div>

            {/* Stream 3 */}
            <div className="flex flex-col justify-between p-6 rounded border border-stone-100 bg-stone-50/50" id="stream-training">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-4">Stream 03</span>
                <h3 className="font-display font-semibold text-base text-stone-900 mb-2">Technical Training</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                  Elite enablement workshops. Certified curricula delivered across Europe. Deep-dives on serverless architecture and emerging cloud engineering.
                </p>
              </div>
              <ul className="space-y-2 border-t border-stone-200/60 pt-4 text-[11px] text-stone-600 font-light">
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Authorized Curricula</span></li>
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Champion-level training</span></li>
                <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-stone-500" /> <span>Custom engineering bootcamps</span></li>
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
                All credentials correspond to actual active authorizations which may be verified on the official partner portals.
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="space-y-3">
                
                <div className="flex items-center justify-between p-4 bg-white border border-stone-200/60 rounded">
                  <div className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-semibold text-stone-900">Google Professional Cloud Architect</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">GCP (PCA-9831)</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-stone-200/60 rounded">
                  <div className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-semibold text-stone-900">Google Cloud Generative AI Leader</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">GCP (GAIL-2301)</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-stone-200/60 rounded">
                  <div className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    <span className="text-xs font-semibold text-stone-900">AWS Authorized Instructor</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Active Status (AAI-CHAMP-8822)</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-stone-200/60 rounded">
                  <div className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    <span className="text-xs font-semibold text-stone-900">AWS Professional Solutions Architect</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Active Status (SAP-C02)</span>
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

          <div className="border border-stone-200 rounded-lg overflow-hidden bg-[#FAF9F6]">
            
            {/* Domain Tabs */}
            <div className="flex border-b border-stone-200 text-xs font-mono">
              <button 
                onClick={() => setSelectedDomain('infrastructure')}
                className={`flex-1 py-4 text-center transition-all ${selectedDomain === 'infrastructure' ? 'bg-white font-semibold text-stone-950 border-r border-stone-200' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100/50'}`}
              >
                01. Foundations
              </button>
              <button 
                onClick={() => setSelectedDomain('ai')}
                className={`flex-1 py-4 text-center transition-all ${selectedDomain === 'ai' ? 'bg-white font-semibold text-stone-950 border-x border-stone-200' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100/50'}`}
              >
                02. AI Safety
              </button>
              <button 
                onClick={() => setSelectedDomain('training')}
                className={`flex-1 py-4 text-center transition-all ${selectedDomain === 'training' ? 'bg-white font-semibold text-stone-950 border-l border-stone-200' : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100/50'}`}
              >
                03. Enablement
              </button>
            </div>

            {/* Tab Details */}
            <div className="p-8 bg-white min-h-[400px] flex flex-col justify-between" id="scope-display-box">
              <div className="space-y-8">
                {/* Header with Title and Timeline */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-display font-semibold text-xl text-stone-900">{scopeDetails[selectedDomain].title}</h3>
                    <p className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-wider">Engagement Track</p>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded bg-stone-100 text-stone-700 font-mono text-xs uppercase tracking-wide">
                      Timeline: {scopeDetails[selectedDomain].timeline}
                    </span>
                  </div>
                </div>

                {/* Focus Callout */}
                <div className="bg-[#FAF9F6] border-l-2 border-stone-800 p-4 rounded-r">
                  <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Primary Focus</p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light italic">
                    {scopeDetails[selectedDomain].focus}
                  </p>
                </div>

                {/* What We Build */}
                <div>
                  <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-3">What we build</h4>
                  <div className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light space-y-4">
                    {scopeDetails[selectedDomain].whatWeBuild.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-3">Key Deliverables</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-stone-600 font-light">
                    {scopeDetails[selectedDomain].deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-stone-400 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Grounded In */}
              <div className="mt-8 pt-6 border-t border-stone-100 bg-[#FAF9F6]/50 p-4 rounded border border-stone-200/40">
                <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Grounded in Production Reality</h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {scopeDetails[selectedDomain].verification}
                </p>
              </div>
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
                "GLMU Consulting restructured core spatial intelligence platform boundaries. Their focus on automated resource containment metrics saved significant operational overhead."
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
                <p className="text-[10px] font-mono text-stone-400 mt-0.5">GO COURSES ATP GROUP</p>
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
                  <Mail className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <a href="mailto:gianlu@glmu.cc" className="text-stone-600 hover:text-stone-900 font-mono">gianlu@glmu.cc</a>
                </div>
                <div className="flex items-center space-x-3 text-xs text-stone-500">
                  <Globe className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span>Based in Italy, serving EU networks</span>
                </div>
                
                {/* Social references */}
                <div className="flex items-center space-x-3 pt-2">
                  <a 
                    href="https://linkedin.com/in/ggiallo28" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-400 hover:text-stone-900 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://github.com/ggiallo28" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-400 hover:text-stone-900 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://gmucciolo.it/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-400 hover:text-stone-900 transition-colors"
                    aria-label="Blog"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7">
              <div className="p-6 sm:p-8 rounded border border-stone-200 bg-[#FAF9F6]">
                
                {submitSuccess ? (
                  <div className="text-center py-8" id="form-success-container">
                    <span className="p-2 bg-stone-100 text-stone-800 rounded-full inline-block mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </span>
                    <h3 className="font-display font-semibold text-sm text-stone-950 mb-1">Inquiry Registered</h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto font-light leading-relaxed">
                      Technical specification sheet has been filed. An architect will connect shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" id="consultation-form">
                    
                    {formError && (
                      <div className="p-3 text-[11px] bg-stone-100 border border-stone-200 text-stone-700 rounded font-mono">
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
                          value={formData.name}
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
                          value={formData.company}
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
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
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
                          value={formData.area}
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
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
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
            <span>© {new Date().getFullYear()} glmu.cc. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <span>Corporate Registries: EU</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
