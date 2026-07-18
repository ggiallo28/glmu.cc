// WebMCP initialization - runs after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
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
      name: 'send_corporate_inquiry',
      description: 'Submit a corporate inquiry to GLMU Consulting (contact name, organization, business email, practice area, and requirements)',
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
      // Rather than submitting via a hidden background fetch, this drives the real
      // on-page form: scrolls to it, types each field visibly, then clicks the real
      // submit button so React's own handleFormSubmit performs the actual delivery.
      // Preact (not preact/compat) binds JSX onChange to the native "change" event,
      // not "input" - so state only syncs once a change event fires per field.
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

        function typeInto(el, text) {
          return new Promise(function(resolve) {
            el.focus();
            el.value = '';
            var i = 0;
            (function step() {
              i++;
              el.value = text.slice(0, i);
              if (i < text.length) {
                setTimeout(step, 18 + Math.random() * 22);
              } else {
                el.dispatchEvent(new Event('change', { bubbles: true }));
                resolve();
              }
            })();
          });
        }

        function selectValue(el, value) {
          el.focus();
          el.value = value;
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return delay(200);
        }

        return waitFor(function() { return section.querySelector('#name'); }, 8000)
          .then(function() {
            return typeInto(section.querySelector('#name'), name);
          })
          .then(function() { return delay(150); })
          .then(function() { return typeInto(section.querySelector('#company'), company); })
          .then(function() { return delay(150); })
          .then(function() { return typeInto(section.querySelector('#email'), email); })
          .then(function() { return selectValue(section.querySelector('#area'), area); })
          .then(function() { return typeInto(section.querySelector('#message'), message); })
          .then(function() { return delay(300); })
          .then(function() {
            return new Promise(function(resolve) {
              var settled = false;
              var observer = new MutationObserver(function() {
                var success = section.querySelector('#form-success-container');
                var error = section.querySelector('#form-error-container');
                if (success && !settled) {
                  settled = true;
                  observer.disconnect();
                  resolve({ content: [{ type: 'text', text: 'Form filled and submitted successfully. Inquiry registered - an architect will connect shortly.' }] });
                } else if (error && !settled) {
                  settled = true;
                  observer.disconnect();
                  resolve({ content: [{ type: 'text', text: 'Form filled and submitted, but the site reported an error: ' + error.textContent }] });
                }
              });
              observer.observe(section, { childList: true, subtree: true });
              var submitBtn = section.querySelector('button[type="submit"]');
              if (submitBtn) submitBtn.click();
              setTimeout(function() {
                if (!settled) {
                  settled = true;
                  observer.disconnect();
                  resolve({ content: [{ type: 'text', text: 'Form filled and submitted; could not confirm the result within the timeout - please check the page.' }] });
                }
              }, 10000);
            });
          })
          .catch(function(err) {
            return { content: [{ type: 'text', text: 'Error: ' + (err && err.message ? err.message : 'failed to fill or submit the form.') }] };
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

  // Watch the connection-status element and rephrase auth/registration failures
  // into actionable messages (the minified webmcp.js only says "Authorization failed"
  // or "Disconnected", which doesn't tell the user to generate a fresh token).
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

  // Reposition widget: move from fixed floating to inline next to blog icon
  var widget = document.getElementById(mcp.elementId);
  if (widget) {
    // Find the blog link and its parent social container
    var blogLink = document.querySelector('a[aria-label="Blog"]');
    if (blogLink) {
      var socialContainer = blogLink.parentElement;
      if (socialContainer) {
        // Insert widget after the blog link
        blogLink.insertAdjacentElement('afterend', widget);
        // Override fixed positioning to flow inline
        widget.style.position = 'relative';
        widget.style.zIndex = '';
        widget.style.bottom = '';
        widget.style.right = '';
        // Match the social icon sizing/styling
        var trigger = widget.querySelector('.webmcp-trigger');
        if (trigger) {
          trigger.style.width = '24px';
          trigger.style.height = '24px';
          trigger.style.borderRadius = '4px';
          trigger.title = 'Connect MCP agent - paste connection token';
          trigger.innerHTML = '<svg width="14" height="14" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 84.8528L85.8822 16.9706C95.2548 7.59798 110.451 7.59798 119.823 16.9706V16.9706C129.196 26.3431 129.196 41.5391 119.823 50.9117L68.5581 102.177" stroke="white" stroke-width="12" stroke-linecap="round"/><path d="M69.2652 101.47L119.823 50.9117C129.196 41.5391 144.392 41.5391 153.765 50.9117L154.118 51.2652C163.491 60.6378 163.491 75.8338 154.118 85.2063L92.7248 146.6C89.6006 149.724 89.6006 154.789 92.7248 157.913L105.331 170.52" stroke="white" stroke-width="12" stroke-linecap="round"/><path d="M102.853 33.9411L52.6482 84.1457C43.2756 93.5183 43.2756 108.714 52.6482 118.087V118.087C62.0208 127.459 77.2167 127.459 86.5893 118.087L136.794 67.8822" stroke="white" stroke-width="12" stroke-linecap="round"/></svg>';
        }
        // Add a small hidden instruction line that appears on hover
        var instructions = document.createElement('span');
        instructions.textContent = 'Agent Connect';
        instructions.style.cssText = 'position:absolute;left:calc(100% + 4px);top:50%;transform:translateY(-50%);font-size:9px;font-family:monospace;color:#78716c;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.2s;';
        widget.appendChild(instructions);
        widget.addEventListener('mouseenter', function() { instructions.style.opacity = '1'; });
        widget.addEventListener('mouseleave', function() { instructions.style.opacity = '0'; });
      }
    }
  }

  // Add connection instructions inside the modal
  var content = widget.querySelector('.webmcp-content');
  if (content) {
    var header = content.querySelector('.webmcp-close');
    if (header) {
      var instructionsBox = document.createElement('div');
      instructionsBox.style.cssText = 'margin-bottom:10px;padding:8px;background:#f5f5f4;border-radius:4px;font-size:11px;line-height:1.5;color:#44403c;font-family:monospace;border:1px solid #e7e5e4;';
      var promptText = 'I want to connect to glmu.cc via the @jason.today/webmcp package. First, check if it\'s already registered as an MCP server for my client; if not, register it (check --help to see the right flag for my client). Then generate a connection token (use the generate-token/get-token tool if it\'s already available, otherwise run npx @jason.today/webmcp --new in the terminal) and give me the raw token to paste into the widget on the page. Then wait - don\'t explain anything yet. Once I tell you I\'ve pasted the token and connected (and, if needed, restarted the MCP client so the tools appear), confirm the site registered correctly, then briefly explain how these tools work and what I can ask you: get_overview for the firm\'s positioning tagline, get_firm_profile for ideal-client profile and operating philosophy, get_scope_details for a specific engagement scope (infrastructure, ai, or training), get_credentials for certifications, get_contact for email/social links, get_competencies for the tech stack, get_testimonials for client references, and send_corporate_inquiry to submit a name/company/email/practice area/message. Also mention I can ask you to read the full site content (page://current) or a specific page section (section://{elementId}).';
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
});
