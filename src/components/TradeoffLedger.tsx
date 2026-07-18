import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert,
  RefreshCw, 
  Layers, 
  TrendingUp, 
  HelpCircle,
  Database,
  Cpu,
  Lock,
  Globe,
  Search,
  X,
  FileJson,
  Check,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

export interface TechnicalDecision {
  id: string;
  title: string;
  domain: 'cloud' | 'data' | 'ai' | 'security';
  status: 'Accepted' | 'Proposed' | 'Superceded' | 'Deprecated';
  originalReasoning: string; // The "Why" - why it was built
  tradeoffs: string;          // The price paid - consequences
  costImpact: 'Low' | 'Medium' | 'High';
  entropyImpact: 'Low' | 'Medium' | 'High';
  blocksOrUnlocks: string;    // Path-dependency (locks/blocks)
  createdAt: string;
}

const DEFAULT_DECISIONS: TechnicalDecision[] = [
  {
    id: 'dec-1',
    title: 'Granular KMS Custody Keys for Multi-Tenant Partitioning',
    domain: 'security',
    status: 'Accepted',
    originalReasoning: 'Required to meet strict EU financial data privacy boundaries (GDPR/Schrems II) and guarantee tenant isolation at the cryptographic storage level, rather than relying solely on shared database row filtering.',
    tradeoffs: 'Increases initial deployment complexity, introduces strict key-rotation management overhead, and adds a slight query latency (~5ms) during decryption steps.',
    costImpact: 'Low',
    entropyImpact: 'Low',
    blocksOrUnlocks: 'Unlocks sovereign enterprise compliance; blocks using low-cost unencrypted global shared cache buckets.',
    createdAt: '2026-06-12'
  },
  {
    id: 'dec-2',
    title: 'Sovereign LLM Deployment on Dedicated VPC Instances',
    domain: 'ai',
    status: 'Accepted',
    originalReasoning: 'Ensures proprietary customer queries, training logs, and trade secrets never leave our secure VPC network boundary. Bypasses third-party SaaS terms where customer data could be harvested.',
    tradeoffs: 'Demands expensive dedicated node reservations ($3.5k/mo baseline), requires manual auto-scaling, and adds container-load orchestration latency compared to SaaS endpoints.',
    costImpact: 'High',
    entropyImpact: 'Medium',
    blocksOrUnlocks: 'Unlocks total IP custody and zero network leak risk; blocks cheap, serverless, pay-per-token public model providers.',
    createdAt: '2026-07-02'
  },
  {
    id: 'dec-3',
    title: 'Apache Kafka for Real-Time Event Stream Ingestion',
    domain: 'data',
    status: 'Proposed',
    originalReasoning: 'Needed to transition from high-latency batch analytics to real-time distributed ingestion. Crucial for live fraud detection and instant sub-second telemetry updates.',
    tradeoffs: 'Incurs considerable infrastructure costs for broker state maintenance and introduces high debugging complexity for distributed race conditions.',
    costImpact: 'High',
    entropyImpact: 'High',
    blocksOrUnlocks: 'Unlocks sub-second streaming capabilities; blocks standard transaction safety without event-sourcing adapter patterns.',
    createdAt: '2026-07-15'
  }
];

export default function TradeoffLedger() {
  const [decisions, setDecisions] = useState<TechnicalDecision[]>(() => {
    try {
      const saved = localStorage.getItem('glmu_decisions');
      return saved ? JSON.parse(saved) : DEFAULT_DECISIONS;
    } catch {
      return DEFAULT_DECISIONS;
    }
  });

  const [activeTab, setActiveTab] = useState<'all' | 'cloud' | 'data' | 'ai' | 'security'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDecision, setSelectedDecision] = useState<TechnicalDecision | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [importedStatus, setImportedStatus] = useState<'success' | 'error' | null>(null);
  const [importMessage, setImportMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    domain: 'cloud' as 'cloud' | 'data' | 'ai' | 'security',
    status: 'Accepted' as 'Accepted' | 'Proposed' | 'Superceded' | 'Deprecated',
    originalReasoning: '',
    tradeoffs: '',
    costImpact: 'Low' as 'Low' | 'Medium' | 'High',
    entropyImpact: 'Low' as 'Low' | 'Medium' | 'High',
    blocksOrUnlocks: ''
  });

  useEffect(() => {
    localStorage.setItem('glmu_decisions', JSON.stringify(decisions));
  }, [decisions]);

  // Calculate stats
  const activeDecisions = decisions.filter(d => d.status === 'Accepted' || d.status === 'Proposed');
  
  // Calculate Entropy Score
  const calculateEntropy = () => {
    if (activeDecisions.length === 0) return 10;
    
    let score = 20; // baseline
    activeDecisions.forEach(d => {
      if (d.entropyImpact === 'High') score += 20;
      else if (d.entropyImpact === 'Medium') score += 10;
      else score += 4;

      if (d.costImpact === 'High') score += 8;
      if (d.status === 'Proposed') score += 5; // uncertainty adds entropy
    });

    return Math.min(score, 100);
  };

  const entropyScore = calculateEntropy();

  const getEntropyTier = (score: number) => {
    if (score < 35) return { label: 'Low / Controlled', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: CheckCircle2, desc: 'Clean, reversible boundaries with clear reasoning. System debt is fully cataloged.' };
    if (score < 60) return { label: 'Moderate Tradeoffs', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Info, desc: 'Cost and dependencies are starting to cluster. Ensure older decisions are decommissioned.' };
    if (score < 80) return { label: 'High Accumulation', color: 'text-orange-600 bg-orange-50 border-orange-100', icon: AlertTriangle, desc: 'Warning: Path-dependency is high. Reversing choices will incur significant rewrite costs.' };
    return { label: 'Severe / Lost Intent', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: ShieldAlert, desc: 'Critical: Architectural decisions have run out of bounds. Original reasoning is highly obscured.' };
  };

  const entropyTier = getEntropyTier(entropyScore);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.originalReasoning.trim() || !formData.tradeoffs.trim()) {
      alert('Please fill in all required fields to preserve context.');
      return;
    }

    const newDec: TechnicalDecision = {
      id: `dec-${Date.now()}`,
      title: formData.title,
      domain: formData.domain,
      status: formData.status,
      originalReasoning: formData.originalReasoning,
      tradeoffs: formData.tradeoffs,
      costImpact: formData.costImpact,
      entropyImpact: formData.entropyImpact,
      blocksOrUnlocks: formData.blocksOrUnlocks || 'No immediate path lock-in declared.',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setDecisions(prev => [newDec, ...prev]);
    setIsAdding(false);
    setSelectedDecision(newDec);
    setFormData({
      title: '',
      domain: 'cloud',
      status: 'Accepted',
      originalReasoning: '',
      tradeoffs: '',
      costImpact: 'Low',
      entropyImpact: 'Low',
      blocksOrUnlocks: ''
    });
  };

  const handleDeleteDecision = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this architectural decision? Its original reasoning will be lost.')) {
      setDecisions(prev => prev.filter(d => d.id !== id));
      if (selectedDecision?.id === id) {
        setSelectedDecision(null);
      }
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset the ledger to GLMU Systems sample case-studies?')) {
      setDecisions(DEFAULT_DECISIONS);
      setSelectedDecision(null);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(decisions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `glmu-architecture-ledger-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && 'originalReasoning' in parsed[0]) {
          setDecisions(parsed);
          setImportedStatus('success');
          setImportMessage(`Imported ${parsed.length} architecture records successfully.`);
          setTimeout(() => setImportedStatus(null), 4000);
        } else {
          throw new Error('JSON format is invalid. Ensure it is an array of Technical Decisions.');
        }
      } catch (err: any) {
        setImportedStatus('error');
        setImportMessage(err.message || 'Failed to parse file.');
        setTimeout(() => setImportedStatus(null), 4000);
      }
    };
    fileReader.readAsText(file);
  };

  // Filter Decisions
  const filteredDecisions = decisions.filter(d => {
    const matchesTab = activeTab === 'all' || d.domain === activeTab;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.originalReasoning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.tradeoffs.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.blocksOrUnlocks.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'cloud': return <Globe className="w-3.5 h-3.5" />;
      case 'data': return <Database className="w-3.5 h-3.5" />;
      case 'ai': return <Cpu className="w-3.5 h-3.5" />;
      case 'security': return <Lock className="w-3.5 h-3.5" />;
      default: return <Layers className="w-3.5 h-3.5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'text-emerald-700 bg-emerald-50 border-emerald-200/50';
      case 'Proposed': return 'text-sky-700 bg-sky-50 border-sky-200/50';
      case 'Superceded': return 'text-amber-700 bg-amber-50 border-amber-200/50';
      case 'Deprecated': return 'text-stone-500 bg-stone-100 border-stone-200';
      default: return 'text-stone-600 bg-stone-100 border-stone-200';
    }
  };

  return (
    <div className="w-full bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden" id="tradeoff-ledger-main">
      
      {/* LEDGER HEADER */}
      <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold">Active Demonstration</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 mt-1">Platform Tradeoff & Entropy Ledger</h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            Capture critical architecture records and measure how path-dependencies erode scalability over time.
          </p>
        </div>
        
        {/* Connection Integrity Badge */}
        <div className="self-start md:self-auto flex items-center space-x-2.5 p-2 bg-stone-100/80 border border-stone-200 rounded-lg">
          <Check className="w-4 h-4 text-stone-600 bg-stone-200/60 p-0.5 rounded-full" />
          <div className="text-left">
            <p className="text-[9px] font-mono font-bold text-stone-700 uppercase tracking-wider leading-none">Offline Connection Verified</p>
            <p className="text-[8px] font-mono text-stone-500 mt-0.5 leading-none">Data isolated locally • GDPR Safe</p>
          </div>
        </div>
      </div>

      {/* METRICS GRID (BENTO VIEW) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-stone-100 bg-white">
        
        {/* Metric 1: Entropy Score */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-stone-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-medium">Technical Entropy Index</span>
              <span className="font-mono text-xs font-semibold text-stone-700">{entropyScore}%</span>
            </div>
            
            {/* Visual Bar */}
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mb-4">
              <motion.div 
                className={`h-full rounded-full ${
                  entropyScore < 35 ? 'bg-emerald-500' : 
                  entropyScore < 60 ? 'bg-amber-500' : 
                  entropyScore < 80 ? 'bg-orange-500' : 'bg-rose-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${entropyScore}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
          
          <div className={`p-3.5 border rounded-lg ${entropyTier.color} transition-all duration-300`}>
            <div className="flex items-start space-x-2">
              <entropyTier.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold font-display">{entropyTier.label}</p>
                <p className="text-[10px] leading-relaxed font-light mt-0.5">{entropyTier.desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: Path dependency overview */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-stone-100 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-3 font-medium">Path-Dependency Lock-in</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-light">Active Logged Choices</span>
                <span className="font-mono font-semibold text-stone-800">{activeDecisions.length} Decisions</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-light">High Cost Commitments</span>
                <span className="font-mono font-semibold text-amber-700">
                  {decisions.filter(d => d.costImpact === 'High' && d.status === 'Accepted').length} Projects
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-light">Superceded/Archived</span>
                <span className="font-mono font-semibold text-stone-500">
                  {decisions.filter(d => d.status === 'Superceded' || d.status === 'Deprecated').length} Safe Debt
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF9F6] border border-stone-200/60 p-3 rounded text-[10px] text-stone-600 font-light leading-relaxed">
            <strong className="text-stone-900 font-medium">Critical Factor:</strong> Each "Proposed" or unreviewed high-entropy decision increases architectural drift. Document reasoning to safeguard engineering velocity.
          </div>
        </div>

        {/* Metric 3: Simulation & Action Bar */}
        <div className="p-6 flex flex-col justify-between bg-stone-50/20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-3 font-medium">Ledger Portability</span>
            <p className="text-xs text-stone-500 font-light leading-relaxed mb-4">
              Download your entire system architecture log to share with team members, or import standard ADR files.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <button 
                onClick={handleExportJSON}
                className="flex-1 py-2 px-3 bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-mono rounded flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                title="Export architectural registry as a JSON file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <label 
                className="flex-1 py-2 px-3 bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-mono rounded flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                title="Import technical decisions from a verified JSON document"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImportJSON} 
                  className="hidden" 
                />
              </label>
            </div>

            <button 
              onClick={handleResetToDefaults}
              className="w-full py-1.5 text-[10px] font-mono text-stone-400 hover:text-stone-700 transition-colors cursor-pointer text-center"
            >
              Reset Registry to Sample Cases
            </button>
          </div>
        </div>
      </div>

      {/* IMPORT NOTIFICATIONS */}
      {importedStatus && (
        <div className={`p-3 text-xs font-mono text-center border-b ${
          importedStatus === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
        }`}>
          {importMessage}
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="px-6 py-4 bg-[#FAF9F6] border-b border-stone-100 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Filters */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {(['all', 'cloud', 'data', 'ai', 'security'] as const).map(domain => (
            <button
              key={domain}
              onClick={() => setActiveTab(domain)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded border transition-all cursor-pointer ${
                activeTab === domain 
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold' 
                  : 'bg-white border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-400'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search decisions, reasoning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 hover:border-stone-300 text-xs rounded focus:outline-none focus:border-stone-400"
          />
        </div>
      </div>

      {/* WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        
        {/* LEFT COLUMN: THE DECISION DIRECTORY */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-stone-100 max-h-[580px] overflow-y-auto">
          
          {/* Quick Action Button */}
          <div className="p-4 bg-stone-50/40 border-b border-stone-100 sticky top-0 bg-white/80 backdrop-blur-xs z-10 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">Registry List ({filteredDecisions.length})</span>
            <button 
              onClick={() => {
                setIsAdding(!isAdding);
                setSelectedDecision(null);
              }}
              className="px-2.5 py-1 bg-stone-950 hover:bg-stone-800 text-white text-[10px] font-mono uppercase tracking-widest rounded flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>{isAdding ? 'Close Form' : 'Add Choice'}</span>
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredDecisions.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs font-light">
                No technical decisions match this filter. Use "Add Choice" above to register a new one.
              </div>
            ) : (
              filteredDecisions.map(dec => {
                const isSelected = selectedDecision?.id === dec.id;
                return (
                  <div
                    key={dec.id}
                    onClick={() => {
                      setSelectedDecision(dec);
                      setIsAdding(false);
                    }}
                    className={`p-4 transition-all duration-150 cursor-pointer text-left ${
                      isSelected 
                        ? 'bg-stone-100/70 border-l-3 border-stone-900' 
                        : 'hover:bg-stone-50/50 border-l-3 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider block">
                        {dec.createdAt}
                      </span>
                      <span className={`px-1.5 py-0.5 font-mono text-[8px] uppercase border rounded-xs font-semibold ${getStatusColor(dec.status)}`}>
                        {dec.status}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-xs sm:text-sm text-stone-900 mt-1.5 line-clamp-1">
                      {dec.title}
                    </h3>

                    {/* Subtext snippets */}
                    <p className="text-[11px] text-stone-500 font-light mt-1 line-clamp-2">
                      {dec.originalReasoning}
                    </p>

                    <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-stone-100/50">
                      <div className="flex items-center space-x-1.5 text-stone-500 font-mono text-[9px] uppercase">
                        {getDomainIcon(dec.domain)}
                        <span>{dec.domain}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-[9px] font-mono text-stone-400">
                          Entropy: <strong className={dec.entropyImpact === 'High' ? 'text-rose-600 font-bold' : 'text-stone-700'}>{dec.entropyImpact}</strong>
                        </span>
                        
                        <button 
                          onClick={(e) => handleDeleteDecision(dec.id, e)}
                          className="text-stone-300 hover:text-rose-600 p-0.5 rounded transition-colors"
                          title="Delete decision record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS OR FORM VIEW */}
        <div className="lg:col-span-7 bg-stone-50/30 p-6 flex flex-col min-h-[420px] max-h-[580px] overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. ADDING NEW DECISION FORM */}
            {isAdding && (
              <motion.div 
                key="add-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                    <h3 className="font-display font-bold text-sm sm:text-base text-stone-900">Log Technical Tradeoff (ADR)</h3>
                    <button 
                      onClick={() => setIsAdding(false)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddDecision} className="space-y-4 text-left">
                    {/* Title */}
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Decision Title *</label>
                      <input 
                        type="text" 
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Serverless Lambda over Kubernetes Cluster"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-950 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-500 focus:bg-white"
                      />
                    </div>

                    {/* Domain & Status */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Domain</label>
                        <select 
                          name="domain"
                          value={formData.domain}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1.5 bg-stone-50 border border-stone-200 text-stone-950 text-xs rounded focus:outline-none focus:border-stone-500 cursor-pointer"
                        >
                          <option value="cloud">Cloud / Infrastructure</option>
                          <option value="data">Data Platform</option>
                          <option value="ai">AI / ML Infrastructure</option>
                          <option value="security">Security & KMS</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Status</label>
                        <select 
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1.5 bg-stone-50 border border-stone-200 text-stone-950 text-xs rounded focus:outline-none focus:border-stone-500 cursor-pointer"
                        >
                          <option value="Accepted">Accepted / Active</option>
                          <option value="Proposed">Proposed / Under Review</option>
                          <option value="Superceded">Superceded (Archived Debt)</option>
                          <option value="Deprecated">Deprecated (Retired)</option>
                        </select>
                      </div>
                    </div>

                    {/* Original Reasoning */}
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Original Reasoning (The Why) *</label>
                      <textarea 
                        name="originalReasoning"
                        required
                        rows={3}
                        value={formData.originalReasoning}
                        onChange={handleInputChange}
                        placeholder="Explain the path-dependent context. What forced this choice? What did you want to prevent? (This ensures reasoning is never lost as scaleups grow)"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-950 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-500 focus:bg-white resize-none font-light leading-relaxed"
                      />
                    </div>

                    {/* Tradeoffs */}
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Consequences & Tradeoffs (The Price Paid) *</label>
                      <textarea 
                        name="tradeoffs"
                        required
                        rows={2}
                        value={formData.tradeoffs}
                        onChange={handleInputChange}
                        placeholder="What architectural tax or operational complexity did you accept? (e.g. locked into AWS, maintenance billing, Cold starts)"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-950 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-500 focus:bg-white resize-none font-light leading-relaxed"
                      />
                    </div>

                    {/* Path Dependency (Locks/Blocks) */}
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Path Dependency Lock-In</label>
                      <input 
                        type="text" 
                        name="blocksOrUnlocks"
                        value={formData.blocksOrUnlocks}
                        onChange={handleInputChange}
                        placeholder="e.g. Unlocks rapid compliance delivery; Blocks multi-cloud multi-region egress boundaries"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-950 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-500 focus:bg-white"
                      />
                    </div>

                    {/* Cost & Entropy Impact */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">Operational Cost</label>
                        <select 
                          name="costImpact"
                          value={formData.costImpact}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1.5 bg-stone-50 border border-stone-200 text-stone-950 text-xs rounded focus:outline-none focus:border-stone-500 cursor-pointer"
                        >
                          <option value="Low">Low Cost Burden</option>
                          <option value="Medium">Medium Cost Burden</option>
                          <option value="High">High Cost Burden</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1 font-semibold">System Entropy Impact</label>
                        <select 
                          name="entropyImpact"
                          value={formData.entropyImpact}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1.5 bg-stone-50 border border-stone-200 text-stone-950 text-xs rounded focus:outline-none focus:border-stone-500 cursor-pointer"
                        >
                          <option value="Low">Low (Simple / Decoupled)</option>
                          <option value="Medium">Medium (Manageable Debt)</option>
                          <option value="High">High (Fragile / Rigid)</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-widest rounded transition-colors cursor-pointer"
                    >
                      Preserve Architectural Intent
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* 2. VIEWING SPECIFIC DECISION DETAILS */}
            {selectedDecision && !isAdding && (
              <motion.div 
                key="details-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full space-y-5 text-left"
              >
                {/* Header card details */}
                <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs relative">
                  
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-2 text-stone-500 font-mono text-[10px] uppercase">
                      {getDomainIcon(selectedDecision.domain)}
                      <span>{selectedDecision.domain} Platform</span>
                      <span>•</span>
                      <span>{selectedDecision.createdAt}</span>
                    </div>

                    <div className="flex space-x-1.5">
                      <span className={`px-2 py-0.5 font-mono text-[9px] uppercase border rounded font-semibold ${getStatusColor(selectedDecision.status)}`}>
                        {selectedDecision.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 leading-snug">
                    {selectedDecision.title}
                  </h3>
                </div>

                {/* The "Why" - Original Reasoning */}
                <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs border-l-3 border-emerald-500">
                  <h4 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1.5 font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Original Reasoning (The "Why")</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-800 font-light leading-relaxed whitespace-pre-wrap">
                    {selectedDecision.originalReasoning}
                  </p>
                  <p className="text-[9px] font-mono text-stone-400 mt-2.5">
                    * Retaining this reasoning blocks downstream "tech larping" and keeps architectural scope focused.
                  </p>
                </div>

                {/* Consequences / Tradeoffs */}
                <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs border-l-3 border-stone-800">
                  <h4 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1.5 font-bold flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-stone-700" />
                    <span>Consequences (The Price Paid)</span>
                  </h4>
                  <p className="text-xs text-stone-700 font-light leading-relaxed whitespace-pre-wrap">
                    {selectedDecision.tradeoffs}
                  </p>
                </div>

                {/* Path Dependency locks / blocks */}
                <div className="bg-[#FAF9F6] border border-stone-200/60 rounded-lg p-5 shadow-xs border-l-3 border-sky-500">
                  <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2 font-bold flex items-center space-x-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
                    <span>Path Dependency Chain</span>
                  </h4>
                  <div className="space-y-2.5">
                    <div className="bg-white border border-stone-100 p-2.5 rounded text-xs flex items-start space-x-2">
                      <ChevronRight className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                      <p className="text-stone-700 leading-relaxed font-light">
                        {selectedDecision.blocksOrUnlocks}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-2 bg-white border border-stone-100 rounded">
                        <span className="text-[8px] font-mono text-stone-400 uppercase block">Infrastructure Cost</span>
                        <strong className={`font-mono text-xs font-semibold ${
                          selectedDecision.costImpact === 'High' ? 'text-orange-600' : 'text-stone-700'
                        }`}>{selectedDecision.costImpact} Impact</strong>
                      </div>
                      <div className="p-2 bg-white border border-stone-100 rounded">
                        <span className="text-[8px] font-mono text-stone-400 uppercase block">Accumulated Entropy</span>
                        <strong className={`font-mono text-xs font-semibold ${
                          selectedDecision.entropyImpact === 'High' ? 'text-rose-600' : 'text-stone-700'
                        }`}>{selectedDecision.entropyImpact} Impact</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. DEFAULT PLACEHOLDER STATE */}
            {!selectedDecision && !isAdding && (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-12 px-4"
              >
                <div className="w-12 h-12 rounded-full border border-stone-200 bg-[#FAF9F6] flex items-center justify-center text-stone-400 mb-4 animate-pulse">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-stone-800 text-sm">Select an Architectural Decision</h3>
                <p className="text-xs text-stone-500 font-light max-w-sm mt-1 mb-4 leading-relaxed">
                  Choose any recorded decision from the left ledger folder, or log a custom trade-off to evaluate platform entropy dynamically.
                </p>

                {/* Quick tutorial helper */}
                <div className="w-full max-w-sm p-4 bg-white border border-stone-200/60 rounded-lg text-left text-xs space-y-2">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1">Scaleup Philosophy</p>
                  <p className="text-stone-600 font-light leading-relaxed">
                    By documenting the <strong className="font-semibold text-stone-900">"Why"</strong>, teams avoid reversing choices blindly later when original creators move on or systems grow.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
      
    </div>
  );
}
