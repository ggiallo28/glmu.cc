import './index.css';

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

let selectedDomain: 'infrastructure' | 'ai' | 'training' = 'infrastructure';

function updateActiveTab() {
  const tabs = ['infrastructure', 'ai', 'training'] as const;
  
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-${tab}`);
    if (!btn) return;
    
    if (tab === selectedDomain) {
      if (tab === 'infrastructure') {
        btn.className = "flex-1 py-4 text-center transition-all bg-white font-semibold text-stone-950 border-r border-stone-200 cursor-pointer";
      } else if (tab === 'ai') {
        btn.className = "flex-1 py-4 text-center transition-all bg-white font-semibold text-stone-950 border-x border-stone-200 cursor-pointer";
      } else {
        btn.className = "flex-1 py-4 text-center transition-all bg-white font-semibold text-stone-950 border-l border-stone-200 cursor-pointer";
      }
    } else {
      btn.className = "flex-1 py-4 text-center transition-all text-stone-400 hover:text-stone-700 hover:bg-stone-100/50 cursor-pointer";
    }
  });

  const details = scopeDetails[selectedDomain];
  
  const titleEl = document.getElementById('scope-title');
  const timelineEl = document.getElementById('scope-timeline');
  const focusEl = document.getElementById('scope-focus');
  const whatWeBuildEl = document.getElementById('scope-what-we-build');
  const deliverablesEl = document.getElementById('scope-deliverables');
  const verificationEl = document.getElementById('scope-verification');

  if (titleEl) titleEl.textContent = details.title;
  if (timelineEl) timelineEl.textContent = `Timeline: ${details.timeline}`;
  if (focusEl) focusEl.textContent = details.focus;
  
  if (whatWeBuildEl) {
    whatWeBuildEl.innerHTML = details.whatWeBuild
      .split('\n\n')
      .map(p => `<p>${p}</p>`)
      .join('');
  }
  
  if (deliverablesEl) {
    deliverablesEl.innerHTML = details.deliverables
      .map(item => `
        <li class="flex items-start space-x-2">
          <span class="text-stone-400 mt-1 flex-shrink-0">•</span>
          <span>${item}</span>
        </li>
      `).join('');
  }
  
  if (verificationEl) {
    verificationEl.textContent = details.verification;
  }

  // Trigger smooth animation on the display inner wrapper
  const wrapper = document.getElementById('scope-animate-wrapper');
  if (wrapper) {
    wrapper.classList.remove('animate-fade-in');
    void wrapper.offsetWidth; // force reflow
    wrapper.classList.add('animate-fade-in');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Set up footer year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear().toString();
  }

  // Set up tabs interaction
  const tabIds = ['tab-infrastructure', 'tab-ai', 'tab-training'] as const;
  tabIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        const domain = el.getAttribute('data-domain') as 'infrastructure' | 'ai' | 'training';
        if (domain) {
          selectedDomain = domain;
          updateActiveTab();
        }
      });
    }
  });

  // Initial tab render
  updateActiveTab();

  // Set up form submission interaction
  const form = document.getElementById('consultation-form') as HTMLFormElement | null;
  const formErrorContainer = document.getElementById('form-error-container');
  const formSuccessContainer = document.getElementById('form-success-container');
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (formErrorContainer) {
        formErrorContainer.classList.add('hidden');
        formErrorContainer.textContent = '';
      }

      const nameInput = document.getElementById('name') as HTMLInputElement | null;
      const companyInput = document.getElementById('company') as HTMLInputElement | null;
      const emailInput = document.getElementById('email') as HTMLInputElement | null;
      const areaSelect = document.getElementById('area') as HTMLSelectElement | null;
      const messageTextarea = document.getElementById('message') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const company = companyInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const area = areaSelect?.value || 'Cloud Infrastructure';
      const message = messageTextarea?.value.trim() || '';

      if (!name || !company || !email || !message) {
        showError('Please complete all required fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Please enter a valid business email address.');
        return;
      }

      // Disable button and show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      setTimeout(() => {
        // Hide form, show success
        form.classList.add('hidden');
        if (formSuccessContainer) {
          formSuccessContainer.classList.remove('hidden');
        }
        
        // Reset form fields
        form.reset();
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Corporate Inquiry';
        }
      }, 1000);
    });
  }

  function showError(msg: string) {
    if (formErrorContainer) {
      formErrorContainer.textContent = msg;
      formErrorContainer.classList.remove('hidden');
    }
  }
});
