import { useState, useRef, useEffect } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import type { VatData } from './VatModal';

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
    whatWeBuild: "Designing secure cloud architectures where tenant separation is structural. This includes configuring isolated VPC subnet networks, least-privilege IAM policies, and granular KMS data keys, all packaged into reusable infrastructure-as-code files.",
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
    whatWeBuild: "Deploying modular intelligent workflow orchestrators integrated with protected database layers. This features context memory pipelines, automated model execution boundaries, and rigid circuit-breakers built to mitigate loop cost overheads.",
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
    whatWeBuild: "Delivering custom technical enablement sessions bridging architectural theory with active production delivery. This features certified curriculum prep-work, sandbox incident workshops, and direct code-level coaching for systems builders.",
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

  // Active benchmark card index (for mobile scroll triggers)
  const [activeBenchmarkCard, setActiveBenchmarkCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active competency card index (for mobile scroll triggers)
  const [activeCompetencyCard, setActiveCompetencyCard] = useState<number | null>(null);
  const competencyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      // Read phase: gather all geometry first, before any state writes invalidate layout.

      // 1. Competencies Section Scroll Sync
      let closestCompIdx: number | null = null;
      let minCompDistance = Infinity;

      competencyRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            if (distance < minCompDistance) {
              minCompDistance = distance;
              closestCompIdx = idx;
            }
          }
        }
      });

      // Clear highlight if the closest card is too far from the viewport center (e.g., past screen boundaries)
      if (minCompDistance > window.innerHeight * 0.45) {
        closestCompIdx = null;
      }

      // 2. Benchmark/Credentials Section Scroll Sync
      let closestBenchmarkIdx: number | null = null;
      let minBenchmarkDistance = Infinity;

      cardRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            if (distance < minBenchmarkDistance) {
              minBenchmarkDistance = distance;
              closestBenchmarkIdx = idx;
            }
          }
        }
      });

      // Clear highlight if the closest card is too far from the viewport center
      if (minBenchmarkDistance > window.innerHeight * 0.45) {
        closestBenchmarkIdx = null;
      }

      // Write phase: apply both state updates after all reads are done.
      setActiveCompetencyCard(closestCompIdx);
      setActiveBenchmarkCard(closestBenchmarkIdx);
    };

    // Run initially to set active state
    handleScroll();

    const handleResizeAndMobile = () => {
      checkMobile();
      handleScroll();
    };

    window.addEventListener('resize', handleResizeAndMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResizeAndMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lazy-loaded Contact Form: fetched only once the contact section nears the viewport,
  // so it's off the initial-load critical path.
  const [ShowForm, setShowForm] = useState<boolean>(false);
  const [FormComponent, setFormComponent] = useState<any>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = contactSectionRef.current;
    if (!el) return;

    const loadForm = () => {
      import('./ContactForm').then(mod => {
        setFormComponent(() => mod.default);
        setShowForm(true);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        loadForm();
      }
    }, { rootMargin: '200px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lazy-loaded VAT Modal (code-split: only fetched on click)
  const VatModal = lazy(() => import('./VatModal'));

  // VAT Modal State
  const [vatModalOpen, setVatModalOpen] = useState(false);
  const [vatData, setVatData] = useState<VatData | null>(null);

  const fetchVatData = () => {
    setVatModalOpen(true);
    setVatData({
      isValid: true,
      requestDate: new Date().toISOString(),
      msCode: 'IT',
      vatNumber: '06158220654',
      name: 'MUCCIOLO GIANLUIGI',
      address: 'CONTRADA FONTANA SALERNO 6\n84049 CASTEL SAN LORENZO SA\nItaly'
    });
  };

  const toggleMobileDomain = (domain: 'infrastructure' | 'ai' | 'training') => {
    if (expandedMobileDomains.includes(domain)) {
      setExpandedMobileDomains(expandedMobileDomains.filter(d => d !== domain));
    } else {
      setExpandedMobileDomains([...expandedMobileDomains, domain]);
      setSelectedDomain(domain); // Keep desktop state in sync
    }
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
              <p className="text-[10px] font-mono text-stone-600 mt-1 uppercase tracking-wider font-medium">Engagement Track</p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded bg-stone-100 text-stone-700 font-mono text-[10px] sm:text-xs uppercase tracking-wide font-medium">
                Timeline: {details.timeline}
              </span>
            </div>
          </div>

          {/* Focus Callout */}
          <div className="bg-[#FAF9F6] border-l-2 border-stone-800 p-4 rounded-r">
            <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-1.5 font-medium">Primary Focus</p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light italic">
              {details.focus}
            </p>
          </div>

          {/* What We Build */}
          <div>
            <h4 className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-2 sm:mb-3 font-medium">What is built</h4>
            <div className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light space-y-3">
              {details.whatWeBuild.split('\n\n').map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-2 sm:mb-3 font-medium">Key Deliverables</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm text-stone-600 font-light">
              {details.deliverables.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-stone-600 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Grounded In */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-100 bg-[#FAF9F6]/50 p-4 rounded border border-stone-200/40">
          <h4 className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-1.5 font-medium">Grounded in Production Reality</h4>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
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
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <span className="font-display font-bold text-lg tracking-wider text-stone-950 uppercase">
                GLMU
              </span>
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

      {/* MAIN CONTENT LANDMARK */}
      <main id="main-content" className="flex-grow">
      
      {/* HERO SECTION */}
      <section className="relative py-20 sm:py-28 border-b border-stone-200/60 overflow-hidden scroll-mt-20" id="glmu-hero">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded bg-stone-100 text-stone-800 font-mono text-[10px] uppercase tracking-widest mb-4 font-medium">
            Data Driven Architecture
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-stone-950 mb-6 leading-[1.15]">
            Untangling Technical Tradeoffs.<br />
            <span className="font-semibold text-stone-900">Before Cost & Entropy Take Over.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Reasoning through the complex architectural decisions that define the next two to three years. Delivering rigorous decision models with explicit tradeoffs so technology organizations can navigate their own unique context.
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
      {/* IDENTITY / FIRM PROFILE */}
          <section className="py-16 border-b border-stone-200/60 bg-[#FAF9F6] scroll-mt-20" id="glmu-identity">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-medium">Firm Profile</span>
                <h2 className="font-display text-2xl font-bold text-stone-900 mt-2 leading-tight">
                  Operational Integrity
                </h2>
              </div>
              <div className="p-4 bg-stone-100/60 border border-stone-200/50 rounded">
                <span className="text-[9px] font-mono uppercase tracking-wider text-stone-600 block mb-1.5 font-medium">Ideal Partners</span>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Partnering best with fast-growing <strong className="font-medium text-stone-900">Series B through D</strong> technology organizations (typically 50 to 500 people) whose early architectural decisions are beginning to manifest as operational drag.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 text-stone-600 text-sm sm:text-base font-light space-y-4 leading-relaxed">
              <p className="text-stone-900 font-normal">
                Scaleups accumulate technical decisions rapidly. By the time cost and entropy take over, critical path-dependent choices have already been made, and their original reasoning is lost.
              </p>
              <p>
                Addressing this requires <strong className="font-semibold text-stone-900">System Intelligence</strong>, a cohesive framework for technical reasoning that bridges the gap between Cloud, Data, and AI.
              </p>
              <p>
                Evaluating architectures through reversibility, blast radiuses, and path dependencies ensures they remain modular, cost-efficient, and maintainable under professional responsibility.
              </p>
              <p className="border-l-2 border-stone-800 pl-4 py-1 italic text-stone-800 text-sm">
                Every system built and reviewed points back to the exact same truth, the critical decisions underneath.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL DEPTH & ARCHITECTURE COMPETENCIES */}
      <section className="py-20 border-b border-stone-200/60 bg-white scroll-mt-20" id="expertise">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-14">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-medium">Practice Streams</span>
            <h2 className="font-display text-2xl font-normal text-stone-900 mt-1">
              Core Technical Competencies
            </h2>
            <p className="text-xs text-stone-600 font-light mt-2 max-w-xl leading-relaxed">
              Delivering high-integrity systems engineering and detailed decision models. Core technical capabilities span the entire cloud, data, and intelligent systems stack neutrally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="competencies-grid">
            {/* Competency 1 */}
            <div 
              ref={(el) => { competencyRefs.current[0] = el; }}
              data-competency-index="0"
              className={`p-5 border rounded transition-all duration-300 group ${
                (isMobile && activeCompetencyCard === 0)
                  ? 'border-sky-300 bg-sky-50/20 shadow-sm'
                  : 'border-stone-200/60 bg-[#FAF9F6]/50 hover:border-sky-300 hover:bg-sky-50/20 hover:shadow-sm'
              }`}
            >
              <span className={`text-[9px] font-mono block mb-2 uppercase font-medium transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 0) ? 'text-sky-500' : 'text-stone-600 group-hover:text-sky-500'
              }`}>Domain 01</span>
              <h3 className={`font-display font-semibold text-sm mb-1.5 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 0) ? 'text-sky-950' : 'text-stone-950 group-hover:text-sky-950'
              }`}>Cloud & Container Platforms</h3>
              <p className={`text-xs font-light leading-relaxed mb-4 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 0) ? 'text-stone-700' : 'text-stone-600 group-hover:text-stone-700'
              }`}>
                Designing multi-cloud foundations, multi-region Kubernetes, serverless architectures, declarative templates, and isolated network boundaries.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {['Multi-Cloud', 'Kubernetes', 'Helm', 'Terraform', 'VPC Isolation'].map(tech => (
                  <span 
                    key={tech} 
                    className={`px-1.5 py-0.5 bg-white font-mono text-[9px] border rounded font-medium transition-all duration-300 ${
                      (isMobile && activeCompetencyCard === 0)
                        ? 'text-sky-700 bg-sky-50 border-sky-200'
                        : 'text-stone-600 border-stone-200/60 group-hover:text-sky-700 group-hover:bg-sky-50 group-hover:border-sky-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Competency 2 */}
            <div 
              ref={(el) => { competencyRefs.current[1] = el; }}
              data-competency-index="1"
              className={`p-5 border rounded transition-all duration-300 group ${
                (isMobile && activeCompetencyCard === 1)
                  ? 'border-amber-300 bg-amber-50/20 shadow-sm'
                  : 'border-stone-200/60 bg-[#FAF9F6]/50 hover:border-amber-300 hover:bg-amber-50/20 hover:shadow-sm'
              }`}
            >
              <span className={`text-[9px] font-mono block mb-2 uppercase font-medium transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 1) ? 'text-amber-500' : 'text-stone-600 group-hover:text-amber-500'
              }`}>Domain 02</span>
              <h3 className={`font-display font-semibold text-sm mb-1.5 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 1) ? 'text-amber-950' : 'text-stone-950 group-hover:text-amber-950'
              }`}>DevOps & Cost Architecture</h3>
              <p className={`text-xs font-light leading-relaxed mb-4 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 1) ? 'text-stone-700' : 'text-stone-600 group-hover:text-stone-700'
              }`}>
                Engineering automated change verification pipelines and formulating explicit FinOps cost models to continuously audit and optimize cloud expenditure.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {['CI/CD Pipelines', 'Ansible', 'FinOps', 'Resource Optimization'].map(tech => (
                  <span 
                    key={tech} 
                    className={`px-1.5 py-0.5 bg-white font-mono text-[9px] border rounded font-medium transition-all duration-300 ${
                      (isMobile && activeCompetencyCard === 1)
                        ? 'text-amber-700 bg-amber-50 border-amber-200'
                        : 'text-stone-600 border-stone-200/60 group-hover:text-amber-700 group-hover:bg-amber-50 group-hover:border-amber-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Competency 3 */}
            <div 
              ref={(el) => { competencyRefs.current[2] = el; }}
              data-competency-index="2"
              className={`p-5 border rounded transition-all duration-300 group ${
                (isMobile && activeCompetencyCard === 2)
                  ? 'border-orange-300 bg-orange-50/20 shadow-sm'
                  : 'border-stone-200/60 bg-[#FAF9F6]/50 hover:border-orange-300 hover:bg-orange-50/20 hover:shadow-sm'
              }`}
            >
              <span className={`text-[9px] font-mono block mb-2 uppercase font-medium transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 2) ? 'text-orange-500' : 'text-stone-600 group-hover:text-orange-500'
              }`}>Domain 03</span>
              <h3 className={`font-display font-semibold text-sm mb-1.5 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 2) ? 'text-orange-950' : 'text-stone-950 group-hover:text-orange-950'
              }`}>Data & Real-time Analytics</h3>
              <p className={`text-xs font-light leading-relaxed mb-4 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 2) ? 'text-stone-700' : 'text-stone-600 group-hover:text-stone-700'
              }`}>
                Architecting parallelized ETL data ingestion pipelines, high-volume distributed stream processors, and high-performance cloud-native data warehouses.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {['Apache Spark', 'Apache Kafka', 'Apache Flink', 'Data Lakes', 'DWH'].map(tech => (
                  <span 
                    key={tech} 
                    className={`px-1.5 py-0.5 bg-white font-mono text-[9px] border rounded font-medium transition-all duration-300 ${
                      (isMobile && activeCompetencyCard === 2)
                        ? 'text-orange-700 bg-orange-50 border-orange-200'
                        : 'text-stone-600 border-stone-200/60 group-hover:text-orange-700 group-hover:bg-orange-50 group-hover:border-orange-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Competency 4 */}
            <div 
              ref={(el) => { competencyRefs.current[3] = el; }}
              data-competency-index="3"
              className={`p-5 border rounded transition-all duration-300 group ${
                (isMobile && activeCompetencyCard === 3)
                  ? 'border-purple-300 bg-purple-50/20 shadow-sm'
                  : 'border-stone-200/60 bg-[#FAF9F6]/50 hover:border-purple-300 hover:bg-purple-50/20 hover:shadow-sm'
              }`}
            >
              <span className={`text-[9px] font-mono block mb-2 uppercase font-medium transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 3) ? 'text-purple-500' : 'text-stone-600 group-hover:text-purple-500'
              }`}>Domain 04</span>
              <h3 className={`font-display font-semibold text-sm mb-1.5 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 3) ? 'text-purple-950' : 'text-stone-950 group-hover:text-purple-950'
              }`}>AI/ML Systems Engineering</h3>
              <p className={`text-xs font-light leading-relaxed mb-4 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 3) ? 'text-stone-700' : 'text-stone-600 group-hover:text-stone-700'
              }`}>
                Deploying production-grade model orchestration pipelines, robust context memory databases, strict execution safety filters, and structured MLOps.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {['Python', 'LLMs / GenAI', 'Vector DBs', 'MLflow', 'MLOps'].map(tech => (
                  <span 
                    key={tech} 
                    className={`px-1.5 py-0.5 bg-white font-mono text-[9px] border rounded font-medium transition-all duration-300 ${
                      (isMobile && activeCompetencyCard === 3)
                        ? 'text-purple-700 bg-purple-50 border-purple-200'
                        : 'text-stone-600 border-stone-200/60 group-hover:text-purple-700 group-hover:bg-purple-50 group-hover:border-purple-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Competency 5 */}
            <div 
              ref={(el) => { competencyRefs.current[4] = el; }}
              data-competency-index="4"
              className={`p-5 border rounded transition-all duration-300 group sm:col-span-2 ${
                (isMobile && activeCompetencyCard === 4)
                  ? 'border-rose-300 bg-rose-50/20 shadow-sm'
                  : 'border-stone-200/60 bg-[#FAF9F6]/50 hover:border-rose-300 hover:bg-rose-50/20 hover:shadow-sm'
              }`}
            >
              <span className={`text-[9px] font-mono block mb-2 uppercase font-medium transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 4) ? 'text-rose-500' : 'text-stone-600 group-hover:text-rose-500'
              }`}>Domain 05</span>
              <h3 className={`font-display font-semibold text-sm mb-1.5 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 4) ? 'text-rose-950' : 'text-stone-950 group-hover:text-rose-950'
              }`}>Security & Observability</h3>
              <p className={`text-xs font-light leading-relaxed mb-4 transition-colors duration-300 ${
                (isMobile && activeCompetencyCard === 4) ? 'text-stone-700' : 'text-stone-600 group-hover:text-stone-700'
              }`}>
                Implementing granular IAM permission models, strict KMS key custody, highly resilient serverless architectures, decoupled transactional event-driven systems, and deep OpenTelemetry tracing.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {['IAM / KMS', 'OpenTelemetry', 'Serverless', 'Event-Driven', 'Pub/Sub'].map(tech => (
                  <span 
                    key={tech} 
                    className={`px-1.5 py-0.5 bg-white font-mono text-[9px] border rounded font-medium transition-all duration-300 ${
                      (isMobile && activeCompetencyCard === 4)
                        ? 'text-rose-700 bg-rose-50 border-rose-200'
                        : 'text-stone-600 border-stone-200/60 group-hover:text-rose-700 group-hover:bg-rose-50 group-hover:border-rose-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIABLE CREDENTIALS */}
      <section className="py-20 border-b border-stone-200/60 bg-[#FAF9F6] scroll-mt-20" id="credentials">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-medium">Verifiable Credentials</span>
            <h2 className="font-display text-2xl font-bold text-stone-900 mt-2">
              Certified Professional Benchmarks
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-light mt-2 max-w-xl">
              Holding elite credentials that validate advanced multi-cloud systems engineering, secure isolation protocols, and autonomous container orchestration capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Google Cloud Card */}
            <div 
              ref={(el) => { cardRefs.current[0] = el; }}
              data-card-index="0"
              className="p-5 bg-white border border-stone-200/60 rounded-lg flex flex-col justify-between min-h-[250px] transition-all hover:border-stone-400/80 group"
            >
              <div className="flex items-center justify-start mb-4 h-12">
                <img 
                  src="/google-cloud-logo.svg" 
                  alt="Google Cloud" 
                  width="181" height="28"
                  className={`h-[26px] sm:h-[30px] w-auto object-contain transition-all duration-500 ${
                    (isMobile && activeBenchmarkCard === 0) 
                      ? 'grayscale-0 contrast-100 brightness-100 opacity-100 scale-105' 
                      : 'grayscale contrast-75 brightness-95 opacity-70 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                />
              </div>
              
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-stone-600 uppercase tracking-widest block border-b border-stone-100 pb-2 font-medium">Google Cloud</span>
                
                <div className="space-y-3 flex-grow mt-3">
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">Professional Cloud Architect</h3>
                    <span className="text-[9px] font-mono text-stone-600 block mt-0.5">GCP (PCA-9831)</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">Generative AI Leader</h3>
                    <span className="text-[9px] font-mono text-stone-600 block mt-0.5">GCP (GAIL-2301)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AWS Card */}
            <div 
              ref={(el) => { cardRefs.current[1] = el; }}
              data-card-index="1"
              className="p-5 bg-white border border-stone-200/60 rounded-lg flex flex-col justify-between min-h-[250px] transition-all hover:border-stone-400/80 group"
            >
              <div className="flex items-center justify-start mb-4 h-12">
                <img 
                  src="/aws-logo.svg" 
                  alt="Amazon Web Services" 
                  width="304" height="182"
                  className={`h-[38px] sm:h-[44px] w-auto object-contain transition-all duration-500 ${
                    (isMobile && activeBenchmarkCard === 1) 
                      ? 'grayscale-0 contrast-100 brightness-100 opacity-100 scale-105' 
                      : 'grayscale contrast-75 brightness-95 opacity-70 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                />
              </div>
              
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-stone-600 uppercase tracking-widest block border-b border-stone-100 pb-2 font-medium">Amazon Web Services</span>
                
                <div className="space-y-3 flex-grow mt-3">
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">Authorized Instructor</h3>
                    <span className="text-[9px] font-mono text-stone-600 block mt-0.5">AWS (AAI-CHAMP-8822)</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">Professional Solutions Architect</h3>
                    <span className="text-[9px] font-mono text-stone-600 block mt-0.5">AWS (SAP-C02)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CNCF Card */}
            <div 
              ref={(el) => { cardRefs.current[2] = el; }}
              data-card-index="2"
              className="p-5 bg-white border border-stone-200/60 rounded-lg flex flex-col justify-between min-h-[250px] transition-all hover:border-stone-400/80 group"
            >
              <div className="flex items-center justify-start mb-4 h-12">
                <img 
                  src="/cncf-logo.svg" 
                  alt="Cloud Native Computing Foundation" 
                  width="399" height="76"
                  className={`h-[26px] sm:h-[30px] w-auto object-contain transition-all duration-500 ${
                    (isMobile && activeBenchmarkCard === 2) 
                      ? 'grayscale-0 contrast-100 brightness-100 opacity-100 scale-105' 
                      : 'grayscale contrast-75 brightness-95 opacity-70 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                />
              </div>
              
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-stone-600 uppercase tracking-widest block border-b border-stone-100 pb-2 font-medium">Cloud Native Computing</span>
                
                <div className="space-y-3 flex-grow mt-3">
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">Certified Kubernetes Administrator</h3>
                    <span className="text-[9px] font-mono text-stone-600 block mt-0.5">CNCF (CKA)</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug">Certified Kubernetes App Developer</h3>
                    <span className="text-[9px] font-mono text-stone-600 block mt-0.5">CNCF (CKAD)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Note */}
          <div className="mt-8 pt-5 border-t border-stone-200/60 p-4 rounded bg-white border border-stone-200/40" id="kubernetes-validation-note">
            <h4 className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-1.5 font-medium">Deployment Validation</h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed animate-fade-in">
              Delivering secure multi-tenant platforms, AI systems, and real-time data architectures for European telecom and finance clients. Proven across 27+ architectural phases, container deployments, and hands-on training for thousands of engineers.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT - SCOPE DETAILS */}
      <section className="py-20 border-b border-stone-200/60 bg-white scroll-mt-20" id="scope-planner">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-medium">Scope Overview</span>
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
                    : "bg-stone-50/20 text-stone-600 hover:text-stone-700 hover:bg-stone-100/50 font-medium";
                  return (
                    <button
                      key={key}
                      data-domain={key}
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
                  : "w-full flex items-center justify-between p-4 font-mono text-xs uppercase tracking-wider text-stone-600 bg-stone-50/50 hover:text-stone-700 hover:bg-stone-100/30 border-l-2 border-transparent cursor-pointer text-left focus:outline-none font-medium";

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
                      <svg className={`w-4 h-4 transition-transform duration-300 transform ${iconRotation} text-stone-600 flex-shrink-0 ml-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <h3 className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-2 font-medium">Why "Bespoke"</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              These are not off-the-shelf packages. Timeline and scope flex based on what you already have (a greenfield foundation vs. a legacy VPC with 47 security groups) and what your production reality is (a 3-person team vs. 50 engineers across 4 time zones). The deliverables are what survives contact with your constraints, not what a generic playbook says you should build.
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 border-b border-stone-200/60 bg-[#FAF9F6] scroll-mt-20" id="testimonials">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-10 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-medium">Institutional Trust</span>
            <h2 className="font-display text-2xl font-bold text-stone-900 mt-2">Client Advisory Board Feedback</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border border-stone-200/60 rounded flex flex-col justify-between animate-fade-in" id="quote-1">
              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed font-light mb-6">
                "Restructured core spatial intelligence platform boundaries. Their focus on automated resource containment metrics saved significant operational overhead."
              </p>
              <div>
                <h3 className="font-display font-bold text-stone-900 text-xs">VP of Telecommunications</h3>
                <p className="text-[10px] font-mono text-stone-600 mt-0.5 font-medium">TELCO GLOBAL EUROPE</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-stone-200/60 rounded flex flex-col justify-between animate-fade-in" id="quote-2">
              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed font-light mb-6">
                "Training execution is exemplary. Having key systems builders taught directly by Champion-level instructors has established complete internal deployment autonomy."
              </p>
              <div>
                <h3 className="font-display font-bold text-stone-900 text-xs">Director of Enterprise Enablement</h3>
                <p className="text-[10px] font-mono text-stone-600 mt-0.5 font-medium">ATP GROUP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT PORTAL */}
      <section className="py-20 bg-white scroll-mt-20" id="contact" ref={contactSectionRef}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 block mb-2 font-medium">Connect</span>
                <h2 className="font-display text-3xl font-normal text-stone-900 leading-tight">
                  Initiate Case Review
                </h2>
                <p className="text-xs text-stone-600 mt-4 leading-relaxed font-light">
                  Submit a corporate brief regarding compliance boundaries or technical training requirements. Responses are provided to verified corporate emails within 24 business hours.
                </p>
              </div>

              <div className="space-y-4 mt-8 md:mt-0 pt-6 border-t border-stone-100">
                <div className="flex items-center space-x-3 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-stone-600 flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <a href="mailto:gianlu@glmu.cc" className="text-stone-600 hover:text-stone-900 font-mono">gianlu@glmu.cc</a>
                </div>
                <div className="flex items-center space-x-3 text-xs text-stone-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-stone-600 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  <span>Based in Italy, serving EU networks</span>
                </div>
                
                {/* Social references */}
                <div className="flex items-center space-x-3 pt-2">
                  <a 
                    href="https://linkedin.com/in/ggiallo28" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-600 hover:text-blue-600 hover:border-blue-400 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a 
                    href="https://github.com/ggiallo28" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-600 hover:text-stone-950 hover:border-stone-950 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a 
                    href="https://gmucciolo.it/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 rounded border border-stone-200 text-stone-600 hover:text-emerald-600 hover:border-emerald-400 transition-colors duration-300"
                    aria-label="Blog"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form (lazy-loaded) */}
            {ShowForm && FormComponent ? <FormComponent /> : (
              <div className="md:col-span-7">
                <div className="p-6 sm:p-8 rounded border border-stone-200 bg-[#FAF9F6]">
                  <div className="flex items-center justify-center py-12">
                    <span className="text-[10px] font-mono text-stone-600">Loading inquiry form...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto py-10 border-t border-stone-200/60 bg-[#FAF9F6] text-stone-600 text-[11px]" id="glmu-footer">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium">
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-stone-900 uppercase">
              GLMU SYSTEMS
            </span>
            <span>© <span>{new Date().getFullYear()}</span> glmu.cc. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <span>Corporate Registries: EU • VAT <button onClick={fetchVatData} className="underline decoration-stone-300 hover:decoration-stone-600 focus:outline-none transition-colors cursor-pointer text-stone-600 hover:text-stone-900 font-mono font-semibold" aria-label="Verify VAT IT06158220654 via VIES">IT06158220654</button></span>
          </div>
        </div>
      </footer>

      {/* VAT VERIFICATION MODAL (lazy-loaded via code-split) */}
      {vatModalOpen && (
        <Suspense fallback={null}>
          <VatModal data={vatData} onClose={() => setVatModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
