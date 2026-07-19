// WebMCP initialization - IIFE (DOM is ready whether loaded eagerly or lazily)
(function() {
  var mcp = new WebMCP({ color: '#292524', size: '24px', padding: '0' });

  // Scrolls a section into view, aligned to its top, so a human watching the
  // page can see which part of the site an agent's answer came from.
  function scrollAndHighlight(sectionId) {
    var el = document.getElementById(sectionId);
    if (!el) return null;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return el;
  }

  // Activates the matching tab (desktop) or expands the matching accordion panel
  // (mobile) in the "Bespoke Engagement Models" section, whichever is visible.
  function selectScopeTab(key) {
    var desktopBtn = document.querySelector('[data-domain="' + key + '"]');
    if (desktopBtn && desktopBtn.offsetParent !== null) {
      desktopBtn.click();
      return;
    }
    var panel = document.getElementById('mob-panel-' + key);
    var container = document.getElementById('mob-container-' + key);
    if (panel && container && panel.classList.contains('hidden')) {
      var btn = container.querySelector('button');
      if (btn) btn.click();
    }
  }

  // Shared helpers for fill_corporate_inquiry / submit_corporate_inquiry: polling,
  // delaying, and simulating visible field-by-field typing on a real form input.
  function waitFor(getEl, timeoutMs) {
    return new Promise(function(resolve, reject) {
      var start = Date.now();
      (function poll() {
        var el = getEl();
        if (el) { resolve(el); return; }
        if (Date.now() - start > timeoutMs) { reject(new Error('Timed out waiting for the contact form to load.')); return; }
        setTimeout(poll, 150);
      })();
    });
  }

  function delay(ms) { return new Promise(function(resolve) { setTimeout(resolve, ms); }); }

  // Fires both "input" and "change": with preact/compat loaded (it is, for the
  // lazy VatModal), JSX onChange is normalized to a native *input* listener, while
  // plain Preact would bind native *change*. Dispatching both covers either mode -
  // without this, component state never updates and any re-render (e.g. from the
  // scroll-position highlighting) wipes the fields that were already typed.
  function commitFieldValue(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function typeIntoField(el, text) {
    return new Promise(function(resolve) {
      el.value = '';
      var i = 0;
      (function step() {
        i++;
        el.value = text.slice(0, i);
        // Commit every keystroke so component state tracks the typed prefix -
        // an unrelated re-render mid-typing then has nothing stale to restore.
        commitFieldValue(el);
        if (i < text.length) {
          setTimeout(step, 18 + Math.random() * 22);
        } else {
          resolve();
        }
      })();
    });
  }

  function selectFieldValue(el, value) {
    el.value = value;
    commitFieldValue(el);
    return delay(200);
  }

  // Resolves target text into a live-updating element over a short animation,
  // scrambling unrevealed characters before they settle - a "text diffusion" reveal.
  function diffuseText(targetId, finalText) {
    var el = document.getElementById(targetId);
    if (!el) return;
    var scrambleChars = '!<>-_\\/[]{}—=+*^?#01';
    var totalFrames = 22;
    var frame = 0;
    if (el._diffuseTimer) clearInterval(el._diffuseTimer);
    el._diffuseTimer = setInterval(function() {
      frame++;
      var revealCount = Math.floor(finalText.length * (frame / totalFrames));
      var out = '';
      for (var i = 0; i < finalText.length; i++) {
        var ch = finalText.charAt(i);
        out += (i < revealCount || ch === '\n' || ch === ' ') ? ch : scrambleChars.charAt(Math.floor(Math.random() * scrambleChars.length));
      }
      el.textContent = out;
      if (frame >= totalFrames) {
        el.textContent = finalText;
        clearInterval(el._diffuseTimer);
      }
    }, 28);
  }

  // Creates (or relocates) the "Live Reflection" panel right after whichever
  // section is contextually relevant to the current topic, so it never sits in one
  // fixed spot. Built with inline styles, not Tailwind classes, since this markup
  // is injected at runtime and Tailwind only scans source files at build time.
  function showLiveReflection(sectionId, text) {
    var anchor = document.getElementById(sectionId);
    if (!anchor) return;

    var existing = document.getElementById('live-reflection');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var panel = document.createElement('section');
    panel.id = 'live-reflection';
    panel.style.cssText = 'padding:32px 0;border-bottom:1px solid rgba(214,211,209,0.6);background:#ffffff;' +
      'opacity:0.01;transform:translateY(12px);transition:opacity 0.5s cubic-bezier(0.16,1,0.3,1),transform 0.5s cubic-bezier(0.16,1,0.3,1);';

    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:56rem;margin:0 auto;padding:0 24px;';

    var label = document.createElement('span');
    label.textContent = 'Live Reflection';
    label.style.cssText = 'display:block;font-size:10px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;color:#57534e;font-weight:500;';

    var heading = document.createElement('h2');
    heading.textContent = 'Grounded in Real Engagements';
    heading.style.cssText = 'font-family:var(--font-display),sans-serif;font-size:20px;font-weight:700;color:#1c1917;margin:4px 0 16px;';

    var box = document.createElement('div');
    box.style.cssText = 'padding:24px;border-radius:6px;border:1px solid #e7e5e4;background:#FAF9F6;min-height:100px;display:flex;align-items:center;';

    var content = document.createElement('p');
    content.id = 'live-reflection-content';
    content.style.cssText = 'margin:0;font-size:13px;font-family:monospace;color:#57534e;line-height:1.7;white-space:pre-wrap;';
    box.appendChild(content);

    inner.appendChild(label);
    inner.appendChild(heading);
    inner.appendChild(box);
    panel.appendChild(inner);

    anchor.insertAdjacentElement('afterend', panel);
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Only reveal (fade in + start the text diffusion) once the smooth scroll has
    // actually settled, so the panel never appears half-scrolled or off-screen.
    waitForScrollEnd(function() {
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        });
      });
      diffuseText('live-reflection-content', text);
    });
  }

  // Polls window.scrollY until it stops changing for a few consecutive frames,
  // used to detect when a smooth scrollIntoView animation has actually finished
  // (there's no native completion event for it).
  function waitForScrollEnd(callback) {
    var lastY = window.scrollY;
    var stableFrames = 0;
    var maxFrames = 180; // ~3s safety cap in case scroll never settles
    var frame = 0;
    function check() {
      frame++;
      var y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) {
        stableFrames++;
        if (stableFrames >= 6 || frame >= maxFrames) { callback(); return; }
      } else {
        stableFrames = 0;
      }
      lastY = y;
      requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
  }

  // Real, anonymized evidence for each System Intelligence Framework pillar - drawn
  // from actual engagement patterns (hours, budgets, technical shape), never client
  // names or identifying specifics. Used by reflect_experience to ground the
  // conversation in verifiable facts instead of restating positioning claims.
  var pillars = [
    {
      name: 'System Intelligence',
      section: 'glmu-identity',
      prevSection: 'glmu-identity',
      nextSection: 'expertise',
      keywords: ['silo', 'coordination', 'alignment', 'cross-team', 'cross-domain', 'holistic', 'big picture', 'whole system', 'systems thinking'],
      tagline: 'System Intelligence is the ability to see the whole system before committing to a part.',
      evidence: 'Verified pattern: a two-hour cross-domain design review, bringing architecture, engineering, and business perspectives together before committing, prevented over 100 hours of downstream rework on one engagement.'
    },
    {
      name: 'Tradeoff Reasoning',
      section: 'scope-planner',
      prevSection: 'scope-planner',
      nextSection: 'testimonials',
      keywords: ['tradeoff', 'trade-off', 'build vs buy', 'database', 'architecture decision', 'options', 'decide', 'choice', 'compare'],
      tagline: 'I think to build, I build to understand.',
      evidence: 'Verified pattern: evaluated database architecture tradeoffs for a 500GB analytics workload, weighing sub-second query performance against migration cost before committing to a platform.'
    },
    {
      name: 'Reversibility',
      section: 'scope-planner',
      prevSection: 'scope-planner',
      nextSection: 'testimonials',
      keywords: ['migration', 'rollback', 'risk', 'reversib', 'undo', 'vendor lock', 'exit', 'lock-in'],
      tagline: 'Choose decisions that are easy to undo. Reserve irreversible commitment for what you know.',
      evidence: 'Verified pattern: data-platform migrations are designed with dual-write testing and rapid rollback capability, so a wrong move costs hours to undo, not quarters to renegotiate.'
    },
    {
      name: 'Teachability',
      section: 'testimonials',
      prevSection: 'testimonials',
      nextSection: 'contact',
      keywords: ['train', 'onboarding', 'documentation', 'enablement', 'knowledge transfer', 'learn', 'teach', 'engineers', 'junior'],
      tagline: 'Architecture that cannot be taught will not survive its first handover.',
      evidence: 'Verified pattern: on one data-engineering engagement, 27% of total billed hours went to team training, knowledge transfer, and documentation, delivered alongside the technical build.'
    },
    {
      name: 'Cost Visibility',
      section: 'expertise',
      prevSection: 'expertise',
      nextSection: 'credentials',
      keywords: ['cost', 'budget', 'finops', 'pricing', 'spend', 'expensive', 'billing', 'worried about cost'],
      tagline: 'Cost discovered at invoice time is a failure of architecture. Cost visible at decision time is a feature.',
      evidence: 'Verified pattern: every engagement runs on transparent, hourly-tracked billing with a documented budget breakdown agreed before work starts, not reconciled after the fact.'
    },
    {
      name: 'Entropy Management',
      section: 'expertise',
      prevSection: 'expertise',
      nextSection: 'credentials',
      keywords: ['technical debt', 'drift', 'monitoring', 'maintenance', 'legacy', 'scale', 'complexity', 'growing'],
      tagline: 'Entropy is the only cost that compounds without anyone authorizing it.',
      evidence: 'Verified pattern: infrastructure monitoring runs at four layers (component, pipeline, system, business) with cost-threshold alerts, built in from the start of the engagement.'
    }
  ];

  // Human-readable formatters, used for the chat response text.
  function formatScopeDetail(d) {
    return d.title + ' (' + d.timeline + ')\n\n' + d.focus + '\n\nDeliverables:\n' +
      d.deliverables.map(function(item) { return '• ' + item; }).join('\n');
  }
  function formatCredentials(list) {
    return list.map(function(c) { return c.provider + ': ' + c.certs.join(', '); }).join('\n');
  }
  function formatContact(c) {
    return 'Email: ' + c.email + '\nLocation: ' + c.location +
      '\nLinkedIn: ' + c.linkedin + '\nGitHub: ' + c.github + '\nBlog: ' + c.blog;
  }
  function formatCompetencies(list) {
    return list.map(function(c) { return c.domain + ': ' + c.technologies.join(', '); }).join('\n');
  }

  // Tool definitions, shared between the @jason.today/webmcp widget (works in
  // any browser) and the native document.modelContext API (Chrome WebMCP origin trial).
  var toolDefs = [
    {
      name: 'get_scope_details',
      description: 'Get details about a specific engagement scope: infrastructure, ai, or training',
      inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'Scope key: infrastructure, ai, or training', enum: ['infrastructure', 'ai', 'training'] } }, required: ['key'] },
      execute: function(args) {
        var details = {
          infrastructure: {
            title: 'Multi-Tenant Platform Foundations',
            timeline: '3-6 Weeks',
            focus: 'Deploying secure multi-tenant isolation boundaries, establishing granular KMS custody encryption keys, and engineering reusable infrastructure templates via Terraform.',
            deliverables: ['Private VPC subnet networks, security groups, and IAM roles', 'Modular Terraform templates for separate staging environments', 'Automated infrastructure drift checks and policy verification rules']
          },
          ai: {
            title: 'Sovereign AI & Agent Platform Design',
            timeline: '3-6 Weeks',
            focus: 'Building robust multi-context semantic memory databases, implementing rigid model safety execution filters, and designing custom agent budget limit circuit-breakers.',
            deliverables: ['Dedicated context database clusters and secure API proxy gateways', 'State-machine flow orchestrators preventing infinite execution loops', 'Custom cost-containment dashboards with automatic budget threshold limits']
          },
          training: {
            title: 'Enterprise Engineering Enablement',
            timeline: '3-6 Weeks',
            focus: 'Providing authorized hyper-scaler training tracks, delivering targeted platform architecture reviews, and coaching engineering teams to achieve deep deployment autonomy.',
            deliverables: ['Official certification exam study resources and practice tracks', 'Practical sandbox incident response blueprints and live scenario guides', 'Comprehensive platform reviews and custom architecture reference guidebooks']
          }
        };
        var detail = details[args.key];
        var text = detail ? formatScopeDetail(detail) : 'Scope not found. Available: infrastructure, ai, training';
        scrollAndHighlight('scope-planner');
        if (detail) selectScopeTab(args.key);
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'get_credentials',
      description: 'Get certified professional credentials and benchmarks',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var credentials = [
          { provider: 'Google Cloud', certs: ['Professional Cloud Architect (PCA-9831)', 'Generative AI Leader (GAIL-2301)'] },
          { provider: 'Amazon Web Services', certs: ['Authorized Instructor (AAI-CHAMP-8822)', 'Professional Solutions Architect (SAP-C02)'] },
          { provider: 'CNCF', certs: ['Certified Kubernetes Administrator (CKA)', 'Certified Kubernetes App Developer (CKAD)'] }
        ];
        var text = formatCredentials(credentials);
        scrollAndHighlight('credentials');
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'get_contact',
      description: 'Get contact information and social links for GLMU Consulting',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var contact = { email: 'gianlu@glmu.cc', vat: 'IT06158220654', location: 'Italy, serving EU networks', linkedin: 'https://linkedin.com/in/ggiallo28', github: 'https://github.com/ggiallo28', blog: 'https://gmucciolo.it/' };
        var text = formatContact(contact);
        scrollAndHighlight('contact');
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'get_competencies',
      description: 'Get core technical competencies offered by GLMU Consulting',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var competencies = [
          { domain: 'Cloud & Container Platforms', technologies: ['Multi-Cloud', 'Kubernetes', 'Helm', 'Terraform', 'VPC Isolation'] },
          { domain: 'DevOps & Cost Architecture', technologies: ['CI/CD Pipelines', 'Ansible', 'FinOps', 'Resource Optimization'] },
          { domain: 'Data & Real-time Analytics', technologies: ['Apache Spark', 'Apache Kafka', 'Apache Flink', 'Data Lakes', 'DWH'] },
          { domain: 'AI/ML Systems Engineering', technologies: ['Python', 'LLMs / GenAI', 'Vector DBs', 'MLflow', 'MLOps'] },
          { domain: 'Security & Observability', technologies: ['IAM / KMS', 'OpenTelemetry', 'Serverless', 'Event-Driven', 'Pub/Sub'] }
        ];
        var text = formatCompetencies(competencies);
        scrollAndHighlight('expertise');
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'get_overview',
      description: 'Get the firm\'s positioning tagline and opening summary',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var text = 'Data Driven Architecture\n\n' +
          'Untangling Technical Tradeoffs. Before Cost & Entropy Take Over.\n\n' +
          'Reasoning through the complex architectural decisions that define the next two to three years. ' +
          'Delivering rigorous decision models with explicit tradeoffs so technology organizations can navigate their own unique context.';
        scrollAndHighlight('glmu-hero');
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'get_firm_profile',
      description: 'Get the firm profile: ideal client partners and the operating philosophy behind engagements',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var text = 'Operational Integrity\n\n' +
          'Ideal Partners: fast-growing Series B through D technology organizations (typically 50 to 500 people) whose early architectural decisions are beginning to manifest as operational drag.\n\n' +
          'Scaleups accumulate technical decisions rapidly. By the time cost and entropy take over, critical path-dependent choices have already been made, and their original reasoning is lost.\n\n' +
          'Addressing this requires System Intelligence, a cohesive framework for technical reasoning that bridges the gap between Cloud, Data, and AI. ' +
          'Evaluating architectures through reversibility, blast radiuses, and path dependencies ensures they remain modular, cost-efficient, and maintainable under professional responsibility.\n\n' +
          '"Every system built and reviewed points back to the exact same truth, the critical decisions underneath."';
        scrollAndHighlight('glmu-identity');
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'get_testimonials',
      description: 'Get client advisory board testimonials',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var testimonials = [
          { quote: 'Restructured core spatial intelligence platform boundaries. Their focus on automated resource containment metrics saved significant operational overhead.', role: 'VP of Telecommunications', org: 'Telco Global Europe' },
          { quote: 'Training execution is exemplary. Having key systems builders taught directly by Champion-level instructors has established complete internal deployment autonomy.', role: 'Director of Enterprise Enablement', org: 'ATP Group' }
        ];
        var text = testimonials.map(function(t) { return '"' + t.quote + '" - ' + t.role + ', ' + t.org; }).join('\n\n');
        scrollAndHighlight('testimonials');
        return { content: [{ type: 'text', text: text }] };
      }
    },
    {
      name: 'reflect_experience',
      description: 'Renders a tailored reflection live on the page for the visitor you are currently talking to. ' +
        'Read the evidence://pillars resource first - it has the real, verifiable evidence to ground your message in ' +
        '(and which page sections the panel lands between, for natural "above"/"below" references). ' +
        'You write the "message" yourself, adapted to this visitor: never state anything beyond what the evidence ' +
        'supports, and never invent client names or specifics not present there.',
      inputSchema: {
        type: 'object',
        properties: {
          topic: { type: 'string', description: 'What the visitor is discussing - used only to anchor the panel near the most relevant section of the page' },
          message: { type: 'string', description: 'The tailored text to display: written by you, adapted to this visitor, grounded in evidence://pillars' }
        },
        required: ['topic', 'message']
      },
      execute: function(args) {
        var topic = (args.topic || '').toLowerCase();
        var message = (args.message || '').trim();
        if (!message) {
          return { content: [{ type: 'text', text: 'Error: message is required - compose a tailored, evidence-grounded reflection for this visitor.' }] };
        }
        var matches = pillars.filter(function(p) {
          return p.keywords.some(function(k) { return topic.indexOf(k) !== -1; });
        });
        var section = matches.length ? matches[0].section : pillars[0].section;
        showLiveReflection(section, message);
        return { content: [{ type: 'text', text: message }] };
      }
    },
    {
      name: 'fill_corporate_inquiry',
      description: 'Fills the real corporate inquiry form on the page, visibly, field by field - but does NOT submit it. ' +
        'Always tell the visitor what you filled in and get their explicit confirmation before calling ' +
        'submit_corporate_inquiry. Never submit on your own initiative.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Contact name' },
          company: { type: 'string', description: 'Organization name' },
          email: { type: 'string', description: 'Business email address' },
          area: { type: 'string', description: 'Practice area', enum: ['Cloud Infrastructure', 'AI & Machine Learning', 'Enablement / Workshops'] },
          message: { type: 'string', description: 'Engagement requirements / inquiry details' }
        },
        required: ['name', 'company', 'email', 'message']
      },
      // Fills the real on-page form, visibly, field by field. Submission is a
      // separate tool (submit_corporate_inquiry) so a human confirmation step can
      // sit between filling and sending. Preact (not preact/compat) binds JSX
      // onChange to the native "change" event, not "input" - so state only syncs
      // once a change event fires per field.
      execute: function(args) {
        var name = (args.name || '').trim();
        var company = (args.company || '').trim();
        var email = (args.email || '').trim();
        var message = (args.message || '').trim();
        var area = args.area || 'Cloud Infrastructure';

        if (!name || !company || !email || !message) {
          return { content: [{ type: 'text', text: 'Error: name, company, email, and message are all required.' }] };
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { content: [{ type: 'text', text: 'Error: please provide a valid business email address.' }] };
        }

        var section = document.getElementById('contact');
        if (!section) {
          return { content: [{ type: 'text', text: 'Error: contact section not found on page.' }] };
        }
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });

        return waitFor(function() { return section.querySelector('#name'); }, 8000)
          .then(function() {
            return typeIntoField(section.querySelector('#name'), name);
          })
          .then(function() { return delay(150); })
          .then(function() { return typeIntoField(section.querySelector('#company'), company); })
          .then(function() { return delay(150); })
          .then(function() { return typeIntoField(section.querySelector('#email'), email); })
          .then(function() { return selectFieldValue(section.querySelector('#area'), area); })
          .then(function() { return typeIntoField(section.querySelector('#message'), message); })
          .then(function() {
            return { content: [{ type: 'text', text: 'Form filled with the details above (not yet submitted). Confirm with the visitor that everything is correct, then call submit_corporate_inquiry to actually send it.' }] };
          })
          .catch(function(err) {
            return { content: [{ type: 'text', text: 'Error: ' + (err && err.message ? err.message : 'failed to fill the form.') }] };
          });
      }
    },
    {
      name: 'reset_corporate_inquiry',
      description: 'Resets the corporate inquiry form after a successful submission (clicks ' +
        '"Submit Another Inquiry"). Call this before fill_corporate_inquiry if the form is ' +
        'stuck in the "Inquiry Registered" success state.',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var section = document.getElementById('contact');
        if (!section) {
          return { content: [{ type: 'text', text: 'Error: contact section not found on page.' }] };
        }
        var successContainer = section.querySelector('#form-success-container');
        if (!successContainer) {
          return { content: [{ type: 'text', text: 'Form is already in input state. Ready to fill.' }] };
        }
        var resetBtn = successContainer.querySelector('button');
        if (!resetBtn) {
          return { content: [{ type: 'text', text: 'Error: could not find the "Submit Another Inquiry" button.' }] };
        }
        resetBtn.click();
        // Wait for the form inputs to render after reset
        return waitFor(function() { return section.querySelector('#name'); }, 5000)
          .then(function() {
            return { content: [{ type: 'text', text: 'Form reset successfully. Ready to call fill_corporate_inquiry.' }] };
          })
          .catch(function() {
            return { content: [{ type: 'text', text: 'Form reset clicked but inputs did not appear within 5s. The form may still be ready - try fill_corporate_inquiry.' }] };
          });
      }
    },
    {
      name: 'submit_corporate_inquiry',
      description: 'Submits the corporate inquiry form previously filled via fill_corporate_inquiry. Only call this ' +
        'after the visitor has explicitly confirmed the details are correct and they want to send it.',
      inputSchema: { type: 'object', properties: {} },
      execute: function() {
        var section = document.getElementById('contact');
        if (!section) {
          return { content: [{ type: 'text', text: 'Error: contact section not found on page.' }] };
        }
        var submitBtn = section.querySelector('button[type="submit"]');
        if (!submitBtn) {
          return { content: [{ type: 'text', text: 'Error: submit button not found - fill_corporate_inquiry must run first.' }] };
        }
        return new Promise(function(resolve) {
          var settled = false;
          var observer = new MutationObserver(function() {
            var success = section.querySelector('#form-success-container');
            var error = section.querySelector('#form-error-container');
            if (success && !settled) {
              settled = true;
              observer.disconnect();
              resolve({ content: [{ type: 'text', text: 'Submitted successfully. Inquiry registered - an architect will connect shortly.' }] });
            } else if (error && !settled) {
              settled = true;
              observer.disconnect();
              resolve({ content: [{ type: 'text', text: 'Submitted, but the site reported an error: ' + error.textContent }] });
            }
          });
          observer.observe(section, { childList: true, subtree: true });
          submitBtn.click();
          setTimeout(function() {
            if (!settled) {
              settled = true;
              observer.disconnect();
              resolve({ content: [{ type: 'text', text: 'Submitted; could not confirm the result within the timeout - please check the page.' }] });
            }
          }, 10000);
        });
      }
    }
  ];

  // Always register with the @jason.today/webmcp widget (works in any browser).
  toolDefs.forEach(function(tool) {
    mcp.registerTool(tool.name, tool.description, tool.inputSchema, tool.execute);
  });

  // Progressive enhancement: also register with Chrome's native WebMCP API
  // (document.modelContext), when present, so Lighthouse's agentic-browsing
  // audits (webmcp-registered-tools / webmcp-schema-validity) detect real tools
  // instead of marking them Not Applicable.
  if (typeof document.modelContext !== 'undefined' && typeof document.modelContext.registerTool === 'function') {
    toolDefs.forEach(function(tool) {
      try {
        var result = document.modelContext.registerTool({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
          execute: function(args) { return tool.execute(args); }
        });
        if (result && typeof result.catch === 'function') {
          result.catch(function(e) {
            console.warn('Native WebMCP registration failed for ' + tool.name + ':', e);
          });
        }
      } catch (e) {
        console.warn('Native WebMCP registration failed for ' + tool.name + ':', e);
      }
    });
  }

  // Resources
  mcp.registerResource(
    'site-content',
    'Full site content (llms.txt - LLM-optimized markdown)',
    { uri: 'page://current', mimeType: 'text/markdown' },
    function(uri) {
      return fetch('/llms.txt')
        .then(function(r) { if (!r.ok) throw new Error('Failed to fetch llms.txt'); return r.text(); })
        .then(function(text) { return { contents: [{ uri: uri, mimeType: 'text/markdown', text: text }] }; })
        .catch(function() {
          return { contents: [{ uri: uri, mimeType: 'text/plain', text: '// llms.txt not available' }] };
        });
    }
  );

  mcp.registerResource(
    'section-content',
    'Content of a specific section by element ID',
    { uriTemplate: 'section://{elementId}', mimeType: 'text/html' },
    function(uri) {
      var id = uri.replace('section://', '');
      var el = document.getElementById(id);
      if (!el) return { contents: [{ uri: uri, mimeType: 'text/plain', text: 'Section "' + id + '" not found' }] };
      return { contents: [{ uri: uri, mimeType: 'text/html', text: el.outerHTML }] };
    }
  );

  mcp.registerResource(
    'engagement-evidence',
    'Real, anonymized evidence per System Intelligence pillar - read this before calling reflect_experience to ground your message in verifiable facts',
    { uri: 'evidence://pillars', mimeType: 'text/markdown' },
    function(uri) {
      var md = '# Engagement evidence, by System Intelligence pillar\n\n' +
        'Ground any reflect_experience message in these facts only. Never state anything beyond what a ' +
        'pillar\'s evidence supports, and never invent client names or specifics not present here.\n\n' +
        pillars.map(function(p) {
          return '## ' + p.name + '\n\nTagline: "' + p.tagline + '"\n\nEvidence: ' + p.evidence +
            '\n\nPanel placement: lands between section://' + p.prevSection + ' (above) and section://' + p.nextSection + ' (below) ' +
            '- read those resources if you want to reference their actual content in your message.\n';
        }).join('\n') ;
      return { contents: [{ uri: uri, mimeType: 'text/markdown', text: md }] };
    }
  );

  // Prompts
  mcp.registerPrompt(
    'site-summary',
    'Summarize what GLMU Consulting does',
    [],
    function() {
      return {
        messages: [{
          role: 'user',
          content: { type: 'text', text: 'Summarize the services and expertise of GLMU Consulting based on the website content.' }
        }]
      };
    }
  );

  // Pulse animation for the trigger icon while connected.
  var pulseStyle = document.createElement('style');
  pulseStyle.textContent = '@keyframes webmcp-pulse {' +
    '0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.45); }' +
    '50% { box-shadow: 0 0 0 5px rgba(37, 99, 235, 0); }' +
    '} .webmcp-pulse-active { animation: webmcp-pulse 2s ease-in-out infinite; }';
  document.head.appendChild(pulseStyle);

  // Watch the connection-status element and rephrase auth/registration failures
  // into actionable messages (the minified webmcp.js only says "Authorization failed"
  // or "Disconnected", which doesn't tell the user to generate a fresh token), and
  // toggle the trigger's pulse animation to reflect connected state.
  function watchStatus() {
    var el = document.querySelector('#' + CSS.escape(mcp.elementId) + ' .webmcp-status');
    if (!el) { setTimeout(watchStatus, 500); return; }
    var obs = new MutationObserver(function() {
      var t = el.textContent || '';
      if (/authorization/i.test(t) || /invalid token/i.test(t) || /registration failed/i.test(t)) {
        el.innerHTML = '✕ <strong>Token expired or invalid</strong> - generate a fresh one:<br><code style="font-size:10px;background:#292524;color:#fafaf9;padding:2px 6px;border-radius:3px;display:inline-block;margin:4px 0;">npx @jason.today/webmcp --new</code>';
      } else if (/disconnected/i.test(t) && t.length < 30) {
        // Rewrite bare "Disconnected" to include the refresh action
        el.innerHTML = '⏎ <strong>Disconnected</strong> - paste a new token to reconnect';
      }
      var trigger = document.querySelector('#' + CSS.escape(mcp.elementId) + ' .webmcp-trigger');
      if (trigger) {
        trigger.classList.toggle('webmcp-pulse-active', /^connected to /i.test(t));
      }
    });
    obs.observe(el, { childList: true, subtree: true, characterData: true });
  }
  watchStatus();

  // Restore the link-chain SVG icon on the trigger whenever the library clears it
  // (webmcp.js sets trigger.innerHTML = "" on disconnect, wiping our custom icon).
  function protectTriggerIcon() {
    var trigger = document.querySelector('#' + CSS.escape(mcp.elementId) + ' .webmcp-trigger');
    if (!trigger) { setTimeout(protectTriggerIcon, 500); return; }
    var svg = '<svg width="14" height="14" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 84.8528L85.8822 16.9706C95.2548 7.59798 110.451 7.59798 119.823 16.9706V16.9706C129.196 26.3431 129.196 41.5391 119.823 50.9117L68.5581 102.177" stroke="white" stroke-width="12" stroke-linecap="round"/><path d="M69.2652 101.47L119.823 50.9117C129.196 41.5391 144.392 41.5391 153.765 50.9117L154.118 51.2652C163.491 60.6378 163.491 75.8338 154.118 85.2063L92.7248 146.6C89.6006 149.724 89.6006 154.789 92.7248 157.913L105.331 170.52" stroke="white" stroke-width="12" stroke-linecap="round"/><path d="M102.853 33.9411L52.6482 84.1457C43.2756 93.5183 43.2756 108.714 52.6482 118.087V118.087C62.0208 127.459 77.2167 127.459 86.5893 118.087L136.794 67.8822" stroke="white" stroke-width="12" stroke-linecap="round"/></svg>';
    function restore() {
      if (!trigger.querySelector('svg')) {
        trigger.innerHTML = svg;
      }
    }
    restore();
    var obs = new MutationObserver(restore);
    obs.observe(trigger, { childList: true, subtree: true });
  }
  protectTriggerIcon();

  // Move the widget into the connect button's own (already correctly laid-out,
  // position:relative) anchor wrapper, instead of computing viewport coordinates.
  // The anchor is real React markup that renders at the right spot from first
  // paint, so this is a plain reparent - no pixel math, no timing dependency.
  var widget = document.getElementById(mcp.elementId);
  var anchorEl = document.getElementById('mcp-anchor');
  if (widget && anchorEl) {
    anchorEl.appendChild(widget);
    widget.style.position = 'absolute';
    widget.style.top = '0';
    widget.style.right = '0';
    widget.style.left = '';
    widget.style.bottom = '';
    widget.style.zIndex = '50';

    // The library's default panel placement (absolute, bottom:40px off the widget)
    // can push the 250px panel past the viewport edge on narrow screens. Position
    // it fixed instead, clamped inside the viewport, preferring above the anchor.
    var panelEl = widget.querySelector('.webmcp-content');
    var positionPanel = function() {
      if (!panelEl || panelEl.style.display === 'none') return;
      var rect = anchorEl.getBoundingClientRect();
      panelEl.style.position = 'fixed';
      panelEl.style.zIndex = '9999';
      panelEl.style.bottom = 'auto';
      var w = panelEl.offsetWidth || 250;
      var h = panelEl.offsetHeight || 260;
      var left = Math.min(Math.max(8, rect.right - w), window.innerWidth - w - 8);
      var top = rect.top - h - 8;
      if (top < 8) top = Math.min(rect.bottom + 8, window.innerHeight - h - 8);
      panelEl.style.left = left + 'px';
      panelEl.style.top = Math.max(8, top) + 'px';
    };
    // Reposition after the library toggles the panel (our listener runs after
    // theirs since it was registered later), and keep it anchored while open.
    var triggerEl = widget.querySelector('.webmcp-trigger');
    if (triggerEl) {
      triggerEl.addEventListener('click', function() { requestAnimationFrame(positionPanel); });
    }
    window.addEventListener('resize', positionPanel);
    window.addEventListener('scroll', positionPanel, { passive: true });
  }

  // Add connection instructions inside the modal
  var content = widget.querySelector('.webmcp-content');
  if (content) {
    var header = content.querySelector('.webmcp-close');
    if (header) {
      var instructionsBox = document.createElement('div');
      instructionsBox.style.cssText = 'margin-bottom:10px;padding:8px;background:#f5f5f4;border-radius:4px;font-size:11px;line-height:1.5;color:#44403c;font-family:monospace;border:1px solid #e7e5e4;';
      var promptText = 'I want to connect to glmu.cc via the @jason.today/webmcp package. First, check if it\'s already registered as an MCP server for my client; if not, register it (check --help to see the right flag for my client). Then generate a connection token (use the generate-token/get-token tool if it\'s already available, otherwise run npx @jason.today/webmcp --new in the terminal) and give me the raw token to paste into the widget on the page. Then wait - don\'t explain anything yet. Once I tell you I\'ve pasted the token and connected (and, if needed, restarted the MCP client so the tools appear), confirm the site registered correctly, then briefly explain how these tools work and what I can ask you: get_overview for the firm\'s positioning tagline, get_firm_profile for ideal-client profile and operating philosophy, get_scope_details for a specific engagement scope (infrastructure, ai, or training), get_credentials for certifications, get_contact for email/social links, get_competencies for the tech stack, get_testimonials for client references, reflect_experience(topic, message) where you first read the evidence://pillars resource, then write a tailored message grounded in it, adapted to whatever we\'re discussing, and fill_corporate_inquiry to fill in a name/company/email/practice area/message on the real form (visibly, without submitting) - always confirm the details with me before calling submit_corporate_inquiry to actually send it. Also mention I can ask you to read the full site content (page://current), a specific page section (section://{elementId}), or the grounded engagement evidence (evidence://pillars).';
      instructionsBox.innerHTML = '<strong style="font-size:10px;display:block;margin-bottom:4px;color:#292524;">CONNECT VIA MCP</strong>' +
        '<div style="margin:4px 0;display:flex;gap:6px;">' +
          '<button class="webmcp-copy-btn" style="flex:1;padding:6px 8px;font-size:10px;font-family:monospace;border:1px solid #d6d3d1;border-radius:4px;background:#fafaf9;color:#44403c;cursor:pointer;text-align:center;">Copy prompt for LLM</button>' +
        '</div>' +
        '<a href="https://github.com/jasonjmcghee/webmcp#readme" target="_blank" style="font-size:10px;color:#78716c;text-decoration:underline;display:inline-block;">Full docs &rarr;</a>';
      // Wire copy button
      setTimeout(function() {
        var copyBtn = widget.querySelector('.webmcp-copy-btn');
        if (copyBtn) {
          copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(promptText).then(function() {
              var orig = copyBtn.textContent;
              copyBtn.textContent = 'Copied!';
              copyBtn.style.borderColor = '#292524';
              setTimeout(function() { copyBtn.textContent = orig; copyBtn.style.borderColor = '#d6d3d1'; }, 2000);
            });
          });
        }
      }, 0);
      content.insertBefore(instructionsBox, content.querySelector('.webmcp-status') || content.children[1]);
    }
  }
})();
