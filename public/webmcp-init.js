// WebMCP initialization - runs after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  var mcp = new WebMCP({ color: '#292524', size: '24px', padding: '0' });

  // Tools
  mcp.registerTool(
    'get_scope_details',
    'Get details about a specific engagement scope: infrastructure, ai, or training',
    { key: { type: 'string', description: 'Scope key: infrastructure, ai, or training' } },
    function(args) {
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
      if (!detail) return { content: [{ type: 'text', text: 'Scope not found. Available: infrastructure, ai, training' }] };
      return { content: [{ type: 'text', text: JSON.stringify(detail, null, 2) }] };
    }
  );

  mcp.registerTool(
    'get_credentials',
    'Get certified professional credentials and benchmarks',
    {},
    function() {
      var credentials = [
        { provider: 'Google Cloud', certs: ['Professional Cloud Architect (PCA-9831)', 'Generative AI Leader (GAIL-2301)'] },
        { provider: 'Amazon Web Services', certs: ['Authorized Instructor (AAI-CHAMP-8822)', 'Professional Solutions Architect (SAP-C02)'] },
        { provider: 'CNCF', certs: ['Certified Kubernetes Administrator (CKA)', 'Certified Kubernetes App Developer (CKAD)'] }
      ];
      return { content: [{ type: 'text', text: JSON.stringify(credentials, null, 2) }] };
    }
  );

  mcp.registerTool(
    'get_contact',
    'Get contact information and social links for GLMU Consulting',
    {},
    function() {
      var contact = { email: 'gianlu@glmu.cc', vat: 'IT06158220654', location: 'Italy, serving EU networks', linkedin: 'https://linkedin.com/in/ggiallo28', github: 'https://github.com/ggiallo28', blog: 'https://gmucciolo.it/' };
      return { content: [{ type: 'text', text: JSON.stringify(contact, null, 2) }] };
    }
  );

  mcp.registerTool(
    'get_competencies',
    'Get core technical competencies offered by GLMU Consulting',
    {},
    function() {
      var competencies = [
        { domain: 'Cloud & Container Platforms', technologies: ['Multi-Cloud', 'Kubernetes', 'Helm', 'Terraform', 'VPC Isolation'] },
        { domain: 'DevOps & Cost Architecture', technologies: ['CI/CD Pipelines', 'Ansible', 'FinOps', 'Resource Optimization'] },
        { domain: 'Data & Real-time Analytics', technologies: ['Apache Spark', 'Apache Kafka', 'Apache Flink', 'Data Lakes', 'DWH'] },
        { domain: 'AI/ML Systems Engineering', technologies: ['Python', 'LLMs / GenAI', 'Vector DBs', 'MLflow', 'MLOps'] },
        { domain: 'Security & Observability', technologies: ['IAM / KMS', 'OpenTelemetry', 'Serverless', 'Event-Driven', 'Pub/Sub'] }
      ];
      return { content: [{ type: 'text', text: JSON.stringify(competencies, null, 2) }] };
    }
  );

  // Resources
  mcp.registerResource(
    'page-html',
    'Full page HTML content',
    { uri: 'page://current', mimeType: 'text/html' },
    function(uri) {
      return { contents: [{ uri: uri, mimeType: 'text/html', text: document.documentElement.outerHTML }] };
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
          trigger.title = 'Connect MCP agent — paste connection token';
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
      var promptText = 'I want to connect to glmu.cc via WebMCP. Check if I already have an MCP client installed (like Claude, Cursor, Cline, or Windsurf), then run npx @jason.today/webmcp --config [my client] in my terminal to install WebMCP. Use the generate-token tool to create a connection token for glmu.cc and give me the raw token so I can paste it into the website\'s WebMCP widget. Once connected, you can use the following tools on this site: get_scope_details (get info about infrastructure, ai, or training engagements), get_credentials (certified professional credentials), get_contact (email and social links), get_competencies (technical capabilities). You can also read the full page content via page://current or specific sections via section://{elementId}.';
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
