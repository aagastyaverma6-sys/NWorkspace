let GROQ_API_KEY = localStorage.getItem('atom_groq_key');
let pomodoroInterval = null;
let timerSeconds = 1500;
let activeCmdIndex = -1;

const apps = {
    home: [
        { n: "Gmail", d: "Primary Workspace Email Matrix", u: "https://mail.google.com" },
        { n: "Notion", d: "Unified Knowledge Architecture Engine", u: "https://notion.so" },
        { n: "Google Calendar", d: "Temporal Schedule Matrix", u: "https://calendar.google.com" },
        { n: "Google Drive", d: "Distributed Cloud File Infrastructure", u: "https://drive.google.com" },
        { n: "Discord", d: "Central Communications Gateway", u: "https://discord.com" },
        { n: "Slack", d: "Enterprise Coordination Hub", u: "https://slack.com" },
        { n: "Spotify", d: "Acoustic Focus Stream Interface", u: "https://spotify.com" },
        { n: "Figma", d: "Collaborative Vector Design Matrix", u: "https://figma.com" },
        { n: "WhatsApp", d: "Synchronous Instant Messaging Interface", u: "https://web.whatsapp.com" },
        { n: "Trello", d: "Visual Kanban Task Operations Board", u: "https://trello.com" },
        { n: "Google Keep", d: "Low-Latency Semantic Scrapbook", u: "https://keep.google.com" },
        { n: "Zoom", d: "Real-Time Video Telepresence Gateway", u: "https://zoom.us" },
        { n: "Teams", d: "Corporate Multi-Tenant Communications", u: "https://teams.microsoft.com" },
        { n: "ClickUp", d: "Omnichannel Productivity Matrix", u: "https://clickup.com" },
        { n: "Airtable", d: "Relational Low-Code Database Mesh", u: "https://airtable.com" },
        { n: "Todoist", d: "Sequential Task Hierarchy Engine", u: "https://todoist.com" },
        { n: "Dropbox", d: "Cloud Object Synchronization Repository", u: "https://dropbox.com" },
        { n: "Evernote", d: "Legacy Document Storage Interface", u: "https://evernote.com" },
        { n: "Pinterest", d: "Visual Asset Aggregator Panel", u: "https://pinterest.com" },
        { n: "LinkedIn", d: "Professional Node Identity Interface", u: "https://linkedin.com" },
        { n: "ProtonMail", d: "Asymmetric Encrypted Communication Layer", u: "https://mail.proton.me" },
        { n: "Outlook", d: "Microsoft Mail Infrastructure Protocol", u: "https://outlook.live.com" },
        { n: "Linear", d: "High-Performance Linear Issue Pipeline", u: "https://linear.app" },
        { n: "Asana", d: "Cross-Functional Project Roadmap Console", u: "https://asana.com" },
        { n: "Miro", d: "Infinite Collaborative Virtual Canvas", u: "https://miro.com" },
        { n: "Basecamp", d: "Integrated Small Team Work Console", u: "https://basecamp.com" },
        { n: "Bitwarden", d: "Zero-Knowledge Credential Safe Vault", u: "https://vault.bitwarden.com" },
        { n: "1Password", d: "Secure Enterprise Identity Locker", u: "https://1password.com" },
        { n: "Pocket", d: "Asynchronous Long-Form Article Repository", u: "https://getpocket.com" },
        { n: "Feedly", d: "Syndicated RSS Feed Aggregator Node", u: "https://feedly.com" },
        { n: "Skiff", d: "Decentralized Encrypted Office Architecture", u: "https://skiff.org" },
        { n: "Calendly", d: "Automated Appointment Scheduling Engine", u: "https://calendly.com" },
        { n: "Loom", d: "Asynchronous Video Capture Pipeline", u: "https://loom.com" },
        { n: "Grammarly", d: "Context-Aware Syntactic Correction Engine", u: "https://grammarly.com" },
        { n: "Canva", d: "Rapid Presentation Graphic Engine", u: "https://canva.com" },
        { n: "Adobe Express", d: "Cloud-Native Asset Creation Panel", u: "https://express.adobe.com" },
        { n: "Coda", d: "Programmable Text Document Interface", u: "https://coda.io" },
        { n: "Obsidian Sync", d: "Local-First Markdown Graph Mirror", u: "https://obsidian.md" },
        { n: "Roam Research", d: "Bi-Directional Networked Thought Matrix", u: "https://roamresearch.com" },
        { n: "Logseq", d: "Privacy-Centric Outliner Document Engine", u: "https://logseq.com" },
        { n: "Day One", d: "Secure Personal Chronological Journal", u: "https://dayoneapp.com" },
        { n: "Standard Notes", d: "End-to-End Encrypted Text Repository", u: "https://standardnotes.com" },
        { n: "Toggle Track", d: "Precision Analytical Time Auditing Node", u: "https://toggl.com" },
        { n: "Clockify", d: "Distributed Project Hour Logger", u: "https://clockify.me" },
        { n: "Harvest", d: "Professional Time Auditing Framework", u: "https://getharvest.com" },
        { n: "Zapier", d: "Multi-Application Workflow Integration Mesh", u: "https://zapier.com" },
        { n: "Make", d: "Visual Automation Logical Flowchart", u: "https://make.com" },
        { n: "IFTTT", d: "Conditional Web Trigger Integration Node", u: "https://iftt.com" },
        { n: "Typeform", d: "Conversational Form Generation Protocol", u: "https://typeform.com" },
        { n: "Jira", d: "Agile Development Sprint Tracking Grid", u: "https://jira.atlassian.com" },
        { n: "Confluence", d: "Enterprise Shared Knowledge Archive", u: "https://confluence.atlassian.com" },
        { n: "InVision", d: "Interactive Interface Prototyping Board", u: "https://invisionapp.com" },
        { n: "Zeplin", d: "Design-to-Engineering Handoff Gateway", u: "https://zeplin.io" },
        { n: "Framer", d: "Production-Grade Interactive Web Designer", u: "https://framer.com" },
        { n: "Webflow", d: "Visual Semantic HTML Architecture Platform", u: "https://webflow.com" },
        { n: "Mailchimp", d: "Mass Marketing Broadcast Node", u: "https://mailchimp.com" },
        { n: "ConvertKit", d: "Creator Audience Growth Control System", u: "https://convertkit.com" },
        { n: "Substack", d: "Independent Publication Monitization Deck", u: "https://substack.com" },
        { n: "Medium", d: "Public Narrative Distribution Platform", u: "https://medium.com" },
        { n: "Ghost", d: "Modern Headless Content Architecture", u: "https://ghost.org" },
        { n: "WordPress", d: "Global Content Management Infrastructure", u: "https://wordpress.com" },
        { n: "Squarespace", d: "Curated Static Web Composer", u: "https://squarespace.com" },
        { n: "Wix", d: "Visual Absolute Layout Constructor", u: "https://wix.com" },
        { n: "Shopify", d: "Global Merchant Operations Infrastructure", u: "https://shopify.com" },
        { n: "Gumroad", d: "Digital Asset Distribution Gateway", u: "https://gumroad.com" },
        { n: "Stripe Dashboard", d: "Financial Transaction Operations Terminal", u: "https://dashboard.stripe.com" },
        { n: "PayPal Balance", d: "Cross-Border Liquidity Transfer Matrix", u: "https://paypal.com" },
        { n: "Wise", d: "Multi-Currency Treasury Exchange Router", u: "https://wise.com" },
        { n: "Revolut", d: "Digital Banking Operations Engine", u: "https://revolut.com" },
        { n: "Mint", d: "Personal Capital Allocator Analyzer", u: "https://mint.intuit.com" }
    ],
    coding: [
        { n: "NebulaX", d: "Primary Cloud Development IDE Workspace", u: "https://aagastyaverma6-sys.github.io/NebulaX" },
        { n: "ketchapp", d: "Personal Repository Lifecycle Framework", u: "https://github.com/aagastyaverma6-sys/ketchapp" },
        { n: "Google Colab", d: "Cloud Jupyter Runtime Infrastructure", u: "https://colab.research.google.com" },
        { n: "GitHub", d: "Global Version Control System Matrix", u: "https://github.com" },
        { n: "Vercel", d: "Serverless Jamstack Deployment Framework", u: "https://vercel.com" },
        { n: "StackOverflow", d: "Engineering Collective Troubleshooting Index", u: "https://stackoverflow.com" },
        { n: "Replit", d: "Instant Collaborative Polyglot Sandbox", u: "https://replit.com" },
        { n: "CodePen", d: "Isolated UI Layout Laboratory", u: "https://codepen.io" },
        { n: "Postman", d: "API Endpoint Testing Environment", u: "https://postman.com" },
        { n: "Netlify", d: "Static Edge Distribution Topology", u: "https://netlify.com" },
        { n: "NPM Registry", d: "Node Package Dependency Distribution", u: "https://npmjs.com" },
        { n: "MDN Web Docs", d: "Definitive Web Standard Documentation", u: "https://developer.mozilla.org" },
        { n: "LeetCode", d: "Algorithmic Logic Evaluation Framework", u: "https://leetcode.com" },
        { n: "Firebase", d: "Realtime Document Datastore Suite", u: "https://firebase.google.com" },
        { n: "Supabase", d: "Open-Source Relational Postgres Framework", u: "https://supabase.com" },
        { n: "Docker Hub", d: "Containerized Image Distribution Registry", u: "https://hub.docker.com" },
        { n: "Ray.so", d: "High-Fidelity Code Presentation Canvas", u: "https://ray.so" },
        { n: "JSON Crack", d: "Graph-Based Nested Data Map Visualizer", u: "https://jsoncrack.com" },
        { n: "HackerRank", d: "Algorithmic Competency Verification Grid", u: "https://hackerrank.com" },
        { n: "GitLab", d: "Enterprise DevSecOps Lifecycle Pipeline", u: "https://gitlab.com" },
        { n: "Codecademy", d: "Interactive Software Literacy Track", u: "https://codecademy.com" },
        { n: "FreeCodeCamp", d: "Open-Source Software Engineering Academy", u: "https://freecodecamp.org" },
        { n: "GitHub Gists", d: "Atomic Code Snippet Distribution Protocol", u: "https://gist.github.com" },
        { n: "Bitbucket", d: "Atlassian Integrated Code Hosting Deck", u: "https://bitbucket.org" },
        { n: "AWS Console", d: "Cloud Compute Hyperscale Architecture", u: "https://aws.amazon.com" },
        { n: "Google Cloud", d: "Hyperscale Linux Container Infrastructure", u: "https://console.cloud.google.com" },
        { n: "Azure Portal", d: "Enterprise Cloud Node Control Station", u: "https://portal.azure.com" },
        { n: "DigitalOcean", d: "Virtual Linux Droplet Compute Provisioner", u: "https://digitalocean.com" },
        { n: "Heroku", d: "Managed Container Ecosystem Application Deck", u: "https://heroku.com" },
        { n: "Render", d: "Modern Managed Application Infrastructure", u: "https://render.com" },
        { n: "Fly.io", d: "Global Edge Micro-VM Container Mesh", u: "https://fly.io" },
        { n: "Railway", d: "Zero-Config Application Infrastructure Deck", u: "https://railway.app" },
        { n: "Linode", d: "High-Performance Cloud Linux Core Drop", u: "https://linode.com" },
        { n: "MongoDB Atlas", d: "Cloud Document BSON Storage Matrix", u: "https://mongodb.com/atlas" },
        { n: "PlanetScale", d: "Serverless MySQL Relational Data Mesh", u: "https://planetscale.com" },
        { n: "Neon Postgres", d: "Serverless Compute-Separated PostgreSQL Node", u: "https://neon.tech" },
        { n: "Upstash", d: "Serverless Low-Latency Redis Micro-Mesh", u: "https://upstash.com" },
        { n: "CodeSandbox", d: "Instant Remote Micro-Container IDE", u: "https://codesandbox.io" },
        { n: "StackBlitz", d: "WebContainers Browser Booting Architecture", u: "https://stackblitz.com" },
        { n: "Glitch", d: "Rapid Node.js Prototype Production Frame", u: "https://glitch.com" },
        { n: "CanIUse", d: "Cross-Browser CSS/JS Feature Compatibility", u: "https://caniuse.com" },
        { n: "Bundlephobia", d: "NPM Package Bundle Weight Analytics", u: "https://bundlephobia.com" },
        { n: "CodeWars", d: "Gamified Algorithmic Instruction Matrix", u: "https://codewars.com" },
        { n: "Project Euler", d: "Advanced Computational Mathematical Challenges", u: "https://projecteuler.net" },
        { n: "GeeksforGeeks", d: "Computer Science Structural Theory Database", u: "https://geeksforgeeks.org" },
        { n: "W3Schools", d: "Foundational Syntax Reference Manual", u: "https://w3schools.com" },
        { n: "DevDocs", d: "Unified Consolidated Offline API Documentation", u: "https://devdocs.io" },
        { n: "RegexVis", d: "Visual Regular Expression Flow Grapher", u: "https://regexvis.com" },
        { n: "Transform Tools", d: "Polyglot Data Structure Schema Transpiler", u: "https://transform.tools" },
        { n: "JWT.io", d: "JSON Web Token Cryptographic Decoder", u: "https://jwt.io" },
        { n: "Sentry", d: "Realtime Real-User Application Error Monitor", u: "https://sentry.io" },
        { n: "LogRocket", d: "Session Replay Application Diagnostic Panel", u: "https://logrocket.com" },
        { n: "Datadog", d: "Hyperscale Application Performance Monitoring", u: "https://datadoghq.com" },
        { n: "New Relic", d: "Full-Stack Telemetry Observability Suite", u: "https://newrelic.com" },
        { n: "SonarCloud", d: "Automated Code Quality static analyzer", u: "https://sonarcloud.io" },
        { n: "Travis CI", d: "Legacy Continuous Integration Pipeline", u: "https://travis-ci.com" },
        { n: "CircleCI", d: "Automated Distributed Validation Workflows", u: "https://circleci.com" },
        { n: "GitHub Actions", d: "Native Repository Workflow Event Triggers", u: "https://github.com/features/actions" },
        { n: "Algolia", d: "Instant Document Index Search API Engine", u: "https://algolia.com" },
        { n: "Elastic Cloud", d: "Distributed Text Search Indexing Matrix", u: "https://elastic.co" },
        { n: "Auth0", d: "Universal Identity Authentication Gateway", u: "https://auth0.com" },
        { n: "Clerk", d: "Modern React-Native User Authentication Engine", u: "https://clerk.com" },
        { n: "Kaggle", d: "Data Science Model Computation Grid", u: "https://kaggle.com" },
        { n: "Jupyterorg", d: "Interactive Literary Computing Systems", u: "https://jupyter.org" },
        { n: "Anaconda", d: "Data Science Package Ecosystem Suite", u: "https://anaconda.com" },
        { n: "PyPI", d: "Python Package Software Distribution Repository", u: "https://pypi.org" },
        { n: "Docker Store", d: "Enterprise Container Topology Base Layouts", u: "https://hub.docker.com/search" },
        { n: "Kubernetes Io", d: "Orchestration Microservices Control Manual", u: "https://kubernetes.io" },
        { n: "Prometheus", d: "Time-Series Metric Monitoring Data Engine", u: "https://prometheus.io" },
        { n: "Grafana Dash", d: "Analytical Time-Series Metric Panel Matrix", u: "https://grafana.com" }
    ],
    research: [
        { n: "Google Search", d: "Global Text Information Index Routing", u: "https://google.com" },
        { n: "Google Scholar", d: "Peer-Reviewed Literary Citation Search", u: "https://scholar.google.com" },
        { n: "Perplexity AI", d: "Conversational Contextual Synthesis Engine", u: "https://perplexity.ai" },
        { n: "Wolfram Alpha", d: "Algorithmic Mathematical Computation Matrix", u: "https://wolframalpha.com" },
        { n: "ArXiv", d: "Open-Access Quantitative Scientific Manuscripts", u: "https://arxiv.org" },
        { n: "Wikipedia", d: "Universal Consensus Knowledge Database", u: "https://wikipedia.org" },
        { n: "YouTube Edu", d: "Visual Asynchronous Instruction Index", u: "https://youtube.com" },
        { n: "Sci-Hub", d: "Global Academic Document Liberation Gateway", u: "https://sci-hub.se" },
        { n: "LibGen", d: "Universal Text Digitization Library Archiver", u: "https://libgen.is" },
        { n: "ResearchGate", d: "Scientific Collaborator Profile Network", u: "https://researchgate.net" },
        { n: "Britannica", d: "Curated Fact Verification Encyclopaedia", u: "https://britannica.com" },
        { n: "Khan Academy", d: "Universal Instructional Concept Modules", u: "https://khanacademy.org" },
        { n: "Coursera", d: "Structured Institutional Syllabus Programs", u: "https://coursera.org" },
        { n: "Udemy", d: "On-Demand Practical Skill Tutorial Array", u: "https://udemy.com" },
        { n: "TED Ideas", d: "Global Conceptual Narrative Presentations", u: "https://ted.com" },
        { n: "NCERT Books", d: "National Scholastic Curriculums Repository", u: "https://ncert.nic.in" },
        { n: "Internet Archive", d: "Global Digital Artifact Preservation Registry", u: "https://archive.org" },
        { n: "DeepL Translate", d: "Neural Network Linguistic Translation Node", u: "https://deepl.com" },
        { n: "Reddit", d: "Niche Decentralized Domain Forums Network", u: "https://reddit.com" },
        { n: "Stanford Enc", d: "Peer-Reviewed Analytical Philosophy Register", u: "https://plato.stanford.edu" },
        { n: "PubMed Central", d: "Biomedical Genomic Literature Database", u: "https://ncbi.nlm.nih.gov/pmc" },
        { n: "IEEE Xplore", d: "Applied Engineering Technology Journal Array", u: "https://ieeexplore.ieee.org" },
        { n: "ScienceDirect", d: "Hyperscale Physical Science Document Ledger", u: "https://sciencedirect.com" },
        { n: "SpringerLink", d: "Theoretical Scientific Research Document Deck", u: "https://link.springer.com" },
        { n: "JSTOR Archive", d: "Historical Humanities Document Library", u: "https://jstor.org" },
        { n: "Nature Journal", d: "High-Impact Multi-Disciplinary Science Portal", u: "https://nature.com" },
        { n: "MIT OpenCourse", d: "Independent Advanced Academic Courseware Repo", u: "https://ocw.mit.edu" },
        { n: "edX Platform", d: "Institutional Specialization Curriculums Grid", u: "https://edx.org" },
        { n: "Harvard Docs", d: "Institutional Research Project Repositories", u: "https://dash.harvard.edu" },
        { n: "Quora Engine", d: "Crowdsourced Informational Query Network", u: "https://quora.com" },
        { n: "StackExchange", d: "Unified Niche Topic Question Matrices", u: "https://stackexchange.com" },
        { n: "Zotero Web", d: "Distributed Source Metadata Management Deck", u: "https://zotero.org" },
        { n: "Mendeley Mirror", d: "Analytical Citation Reference Management Deck", u: "https://mendeley.com" },
        { n: "EndNote Web", d: "Enterprise Manuscript Citation Compiler", u: "https://endnote.com" },
        { n: "Semantic Scholar", d: "AI-Powered Scientific Literature Grapher", u: "https://semanticscholar.org" },
        { n: "Base Search", d: "Bielefeld Multi-Disciplinary Academic Resource Index", u: "https://base-search.net" },
        { n: "CORE Papers", d: "Global Open Access Research Aggregator", u: "https://core.ac.uk" },
        { n: "DOAJ Registry", d: "Directory of Open Access Peer Journals", u: "https://doaj.org" },
        { n: "SSRN Network", d: "Social Science Research Pre-Print Server", u: "https://ssrn.com" },
        { n: "PLOS ONE", d: "Open-Access Peer Reviewed Scientific Journal", u: "https://journals.plos.org" },
        { n: "BioRxiv Engine", d: "Biological Experimental Pre-Print Server", u: "https://biorxiv.org" },
        { n: "MedRxiv Engine", d: "Clinical Medical Science Pre-Print Server", u: "https://medrxiv.org" },
        { n: "ChemRxiv Engine", d: "Chemical Molecular Research Pre-Print Server", u: "https://chemrxiv.org" },
        { n: "ERIC Database", d: "Department of Education Information Index", u: "https://eric.ed.gov" },
        { n: "PsycNET", d: "American Psychological Literature Database", u: "https://psycnet.apa.org" },
        { n: "Gutenberg Project", d: "Public Domain Literary Digitization Catalog", u: "https://gutenberg.org" },
        { n: "Open Library", d: "Universal Collaborative Digital Book Registry", u: "https://openlibrary.org" },
        { n: "Google Books", d: "Hyperscale Text Document Scan Catalog", u: "https://books.google.com" },
        { n: "WorldCat Grid", d: "Global Consolidated Library Inventory Network", u: "https://worldcat.org" },
        { n: "Scribd Library", d: "Digital Document Subscription Hosting Board", u: "https://scribd.com" },
        { n: "Academia.edu", d: "Independent Academic Document Sharing Node", u: "https://academia.edu" },
        { n: "OurWorldInData", d: "Empirical Global Long-Term Trend Metrics", u: "https://ourworldindata.org" },
        { n: "Pew Research", d: "Demographic and Societal Data Metrics", u: "https://pewresearch.org" },
        { n: "Statista Console", d: "Market Consumer Data Insight Matrix", u: "https://statista.com" },
        { n: "Data.gov Hub", d: "United States Open Government Datastore", u: "https://data.gov" },
        { n: "UK Data Archive", d: "United Kingdom Statistical Data Center", u: "https://data.gov.uk" },
        { n: "UN Data Portal", d: "United Nations Consolidated Global Datastore", u: "https://data.un.org" },
        { n: "World Bank Data", d: "Global Economic Development Indicators Mesh", u: "https://data.worldbank.org" },
        { n: "IMF Data Portal", d: "Macroeconomic International Financial Ledger", u: "https://data.imf.org" },
        { n: "OECD iLibrary", d: "Socio-Economic Development Policy Analysis", u: "https://oecd-ilibrary.org" },
        { n: "Eurostat Data", d: "European Union Integrated Statistical Engine", u: "https://ec.europa.eu/eurostat" },
        { n: "GitHub Explore", d: "Trending Open-Source Technical Innovations", u: "https://github.com/explore" },
        { n: "Hacker News", d: "Y-Combinator Computer Science Narrative Feed", u: "https://news.ycombinator.com" },
        { n: "TechCrunch Node", d: "High-Growth Technology Startup Chronological Feed", u: "https://techcrunch.com" },
        { n: "Wired Deep", d: "Long-Form Technology Culture Commentary", u: "https://wired.com" },
        { n: "MIT Tech Review", d: "Emerging Applied Engineering Field Analysis", u: "https://technologyreview.com" },
        { n: "Ars Technica", d: "Comprehensive Specialized Computing Narrative Array", u: "https://arstechnica.com" },
        { n: "SpaceX API Info", d: "Aerospace Launch Telemetry Documentation", u: "https://api.spacexdata.com" },
        { n: "NASA Data Hub", d: "Astrophysical Planetary Observation Repositories", u: "https://data.nasa.gov" },
        { n: "USGS EarthExplorer", d: "Geospatial Satellitic Earth Observation Data", u: "https://earthexplorer.usgs.gov" }
    ],
    ai: [
        { n: "LMSYS Arena", d: "Empirical LLM Elo Blind Benchmarking Matrix", u: "https://lmarena.ai" },
        { n: "Plug and AI", d: "Instant Interactive Multi-Model Playground", u: "https://plai.chat/" },
        { n: "Google Gemini", d: "Native Multimodal Advanced Inference Core", u: "https://gemini.google.com" },
        { n: "OpenAI ChatGPT", d: "Flagship Frontier Autoregressive Model Deck", u: "https://chat.openai.com" },
        { n: "Anthropic Claude", d: "High-Context Long-Form Textual Logic Core", u: "https://claude.ai" },
        { n: "Hugging Face", d: "Open Weights Neural Architecture Registry", u: "https://huggingface.co" },
        { n: "Suno AI", d: "Generative Polyphonic Audio Waveform Composer", u: "https://suno.com" },
        { n: "Midjourney", d: "High-Fidelity Text-to-Image Synthesis Portal", u: "https://midjourney.com" },
        { n: "Leonardo AI", d: "Production Diffusion Image Iteration Panel", u: "https://leonardo.ai" },
        { n: "Poe Aggregator", d: "Unified Multi-Agent API Orchestration Panel", u: "https://poe.com" },
        { n: "ElevenLabs", d: "Neural Acoustic Voice Synthesis Engine", u: "https://elevenlabs.io" },
        { n: "RunwayML", d: "Neural Video Flow Composition Laboratory", u: "https://runwayml.com" },
        { n: "Luma AI Labs", d: "Volumetric 3D Neural Radiance Field Engine", u: "https://lumalabs.ai" },
        { n: "Mistral Platform", d: "High-Efficiency European Open Weights Core", u: "https://mistral.ai" },
        { n: "DeepSeek Engine", d: "Advanced Mathematical Mathematical Logic Core", u: "https://deepseek.com" },
        { n: "Phind Engine", d: "Context-Aware Coding Synthesis Search Engine", u: "https://phind.com" },
        { n: "Blackbox AI", d: "Realtime Syntax Interception Copilot Engine", u: "https://blackbox.ai" },
        { n: "Civitai Portal", d: "Stable Diffusion Custom Model Weight Matrix", u: "https://civitai.com" },
        { n: "Gamma App", d: "Automated Presentation Outline Component Composer", u: "https://gamma.app" },
        { n: "Jasper AI", d: "High-Throughput Enterprise Copywriting Engine", u: "https://jasper.ai" },
        { n: "Copy.ai", d: "Automated GTM Semantic Generation Sandbox", u: "https://copy.ai" },
        { n: "Writesonic", d: "SEO-Optimized Long-Form Article Synthesizer", u: "https://writesonic.com" },
        { n: "Scale AI Panel", d: "Enterprise Neural Data Annotation Console", u: "https://scale.com" },
        { n: "Replicate Matrix", d: "Serverless Cloud Neural Weight Hosting Node", u: "https://replicate.com" },
        { n: "Anyscale Runtime", d: "Distributed Ray Model Training Compute Grid", u: "https://anyscale.com" },
        { n: "Groq Console", d: "LPU Ultra-Low-Latency Inference Terminal", u: "https://console.groq.com" },
        { n: "OpenRouter API", d: "Universal LLM Endpoint Multi-Routing Gateway", u: "https://openrouter.ai" },
        { n: "LangChain Hub", d: "Composable LLM Chaining Logic Architecture", u: "https://smith.langchain.com" },
        { n: "LlamaIndex Hub", d: "Data-Incentivized RAG Context Connector Hub", u: "https://llamahub.ai" },
        { n: "Pinecone Console", d: "Hyperscale Vector Index Vector Database", u: "https://pinecone.io" },
        { n: "Weaviate Cloud", d: "Open-Source Decentralized Vector Storage Mesh", u: "https://weaviate.io" },
        { n: "Milvus Console", d: "Enterprise High-Density Vector Search Deck", u: "https://milvus.io" },
        { n: "Chroma Engine", d: "Lightweight Embedded AI Embedding Datastore", u: "https://trychroma.com" },
        { n: "Qdrant Cloud", d: "Rust-Native High-Performance Vector Database", u: "https://qdrant.tech" },
        { n: "ElevenLabs Voice", d: "Acoustic Audio Cloning Isolation Chamber", u: "https://elevenlabs.io/voice-cloning" },
        { n: "PlayHT Engine", d: "Realtime Conversational Speech Waveform Generator", u: "https://play.ht" },
        { n: "Murf AI", d: "Studio-Grade Voiceover Production Console", u: "https://murf.ai" },
        { n: "Synthesia Video", d: "Neural Digital Avatar Video Render Panel", u: "https://synthesia.io" },
        { n: "HeyGen Avatar", d: "High-Fidelity AI Video Presenter Studio", u: "https://heygen.com" },
        { n: "D-ID Studio", d: "Static Face Realtime Animation Engine", u: "https://d-id.com" },
        { n: "Pika Labs", d: "Generative Micro-Clip Temporal Motion Engine", u: "https://pika.art" },
        { n: "Kaiber AI", d: "Audio-Reactive Generative Animation Grid", u: "https://kaiber.ai" },
        { n: "Stable Diffusion", d: "Stability AI Image Generation Framework", u: "https://stability.ai" },
        { n: "DALL-E 3 Lab", d: "OpenAI Contextual Image Generator Console", u: "https://labs.openai.com" },
        { n: "Clipdrop Utility", d: "Neural Raster Manipulation Tool Deck", u: "https://clipdrop.co" },
        { n: "Vocal Remover", d: "Acoustic Source Separation Splitting Engine", u: "https://vocalremover.org" },
        { n: "Descript Editor", d: "Text-Based Multi-Track Audio Waveform Editor", u: "https://descript.com" },
        { n: "Otter AI", d: "Realtime Multi-Speaker Meeting Transcription", u: "https://otter.ai" },
        { n: "Whisper Web", d: "In-Browser Local High-Accuracy Audio Transcriber", u: "https://whisper-web.pages.dev" },
        { n: "Fireflies AI", d: "Automated Enterprise Audio Scrapbook Bot", u: "https://fireflies.ai" },
        { n: "Abridge Med", d: "Clinical Medical Semantic Summary Matrix", u: "https://abridge.com" },
        { n: "Harvey AI", d: "Enterprise Legal Document Analytics Core", u: "https://harvey.ai" },
        { n: "Ironclad AI", d: "Automated Digital Contract Verification Engine", u: "https://ironcladapp.com" },
        { n: "DoNotPay Bot", d: "Automated Consumer Micro-Legal Redirection Deck", u: "https://donotpay.com" },
        { n: "GitHub Copilot", d: "Automated IDE Code Completion Controller", u: "https://github.com/features/copilot" },
        { n: "Tabnine Portal", d: "Context-Aware Private Code Completion Engine", u: "https://tabnine.com" },
        { n: "Cursor IDE Sync", d: "AI-Native Integrated Development Sandbox", u: "https://cursor.sh" },
        { n: "Cody AI Engine", d: "Sourcegraph Local Repository Code Copilot", u: "https://about.sourcegraph.com/cody" },
        { n: "Mutable AI", d: "Production-Grade Automated Technical Refactorer", u: "https://mutable.ai" },
        { n: "Codeium Arena", d: "Free High-Throughput Developer Copilot Suite", u: "https://codeium.com" },
        { n: "Braid Tech", d: "Collaborative Engineering Management Copilot", u: "https://braid.tech" },
        { n: "Adcreative AI", d: "Automated Conversion Banner Generation Node", u: "https://adcreative.ai" },
        { n: "Beautiful.ai", d: "Structural Smart Presentation Layout Engine", u: "https://beautiful.ai" },
        { n: "Tome App", d: "Generative Storytelling Presentation Architect", u: "https://tome.app" },
        { n: "Mendable AI", d: "Technical Documentation Conversational Ingestor", u: "https://mendable.ai" },
        { n: "Inworld AI", d: "Dynamic Virtual Agent Behavioral Matrix", u: "https://inworld.ai" },
        { n: "Character.ai", d: "Neural Persona Dialog Simulation Layer", u: "https://character.ai" },
        { n: "Replika Matrix", d: "Isolated Empathetic Conversational Agent Node", u: "https://replika.ai" },
        { n: "NovelAI Engine", d: "Assisted Literary Prose Generation Engine", u: "https://novelai.net" },
        { n: "AI Dungeon", d: "Infinite Autoregressive Text Adventure Matrix", u: "https://aidungeon.com" }
    ],
    utilities: [
        { n: "Pi7 Toolkit", d: "Atomic Image PDF Compression Transpiler", u: "https://pi7.org" },
        { n: "Excalidraw", d: "Infinite Vector Sketchpad Wireframing Board", u: "https://excalidraw.com" },
        { n: "Coolors", d: "Algorithmic Chromatic Palette Vector Engine", u: "https://coolors.co" },
        { n: "Photopea", d: "Advanced Web-Based Raster Layer Editor", u: "https://photopea.com" },
        { n: "TinyWow", d: "Serverless File Conversion Macro Interface", u: "https://tinywow.com" },
        { n: "Monkeytype", d: "High-Density Kinetic WPM Diagnostics Panel", u: "https://monkeytype.com" },
        { n: "TypeQuicker", d: "Precision Typing Synchronization Engine Console", u: "https://typequicker.com" },
        { n: "Isomars", d: "Precision Mathematical Drafting Utility Node", u: "https://isomars.com" },
        { n: "Regex101", d: "Deterministic Token-Based Pattern Analyzer", u: "https://regex101.com" },
        { n: "CyberChef", d: "Universal Hex Base64 Data Manipulation Tool", u: "https://gchq.github.io/CyberChef/" },
        { n: "JSONLint", d: "Strict Semantic JSON Specification Verifier", u: "https://jsonlint.com" },
        { n: "Carbon", d: "Source Code Aesthetic Presentation Vector Layout", u: "https://carbon.now.sh" },
        { n: "Draw.io", d: "Formal Logical Architecture Flowchart Canvas", u: "https://app.diagrams.net" },
        { n: "Remove.bg", d: "Neural Raster Boundary Segmenting Engine", u: "https://remove.bg" },
        { n: "GTmetrix", d: "Enterprise Web Performance Core Vital Metrics", u: "https://gtmetrix.com" },
        { n: "UrlEncoder", d: "Percent-Encoding Parameter Web Translator", u: "https://urlencoder.org" },
        { n: "Base64 Dec", d: "Raw Binary Base64 Stream Interception Tool", u: "https://base64decode.org" },
        { n: "DiffChecker", d: "Asynchronous Textual Variance Calculation Engine", u: "https://diffchecker.com" },
        { n: "Crontab Guru", d: "Cron Expression Schedular Temporal Interproter", u: "https://crontab.guru" },
        { n: "Cloudflare DNS", d: "Global Low-Latency Core Domain Engine Resolver", u: "https://dash.cloudflare.com" },
        { n: "Speedtest Net", d: "Network Throughput Telemetry Monitor", u: "https://speedtest.net" },
        { n: "Fast.com", d: "Netflix-Powered Downstream Bitrate Meter", u: "https://fast.com" },
        { n: "WhatIsMyIP", d: "Public WAN Addressing Routing Telemetry", u: "https://whatismyip.com" },
        { n: "DNSChecker Matrix", d: "Global DNS Records Propagation Inspection Grid", u: "https://dnschecker.org" },
        { n: "MXToolbox Console", d: "Enterprise Mail Flow Domain Diagnostic Hub", u: "https://mxtoolbox.com" },
        { n: "Pingdom Monitor", d: "Synthetic Web Endpoint Latency Tracker", u: "https://pingdom.com" },
        { n: "BuiltWith Tool", d: "Target Domain Technical Architecture Fingerprinter", u: "https://builtwith.com" },
        { n: "Wappalyzer Node", d: "Active Framework Composition Scanner Engine", u: "https://wappalyzer.com" },
        { n: "VirusTotal Scan", d: "Multi-Engine Cryptographic File Hash Scanner", u: "https://virustotal.com" },
        { n: "UrlScan.io Engine", d: "Automated Sandbox Target Navigation Recorder", u: "https://urlscan.io" },
        { n: "Shields.io Hub", d: "Dynamic SVG Metadata Metric Badge Generator", u: "https://shields.io" },
        { n: "Unsplash API", d: "Open High-Fidelity Photography Repository Matrix", u: "https://unsplash.com" },
        { n: "Pexels Images", d: "Unrestricted Media Asset Stock Directory", u: "https://pexels.com" },
        { n: "Pixabay Asset", d: "Free Creative Asset Vector File Array", u: "https://pixabay.com" },
        { n: "Flaticon Grid", d: "Hyperscale Vector Glyph Graphic Inventory", u: "https://flaticon.com" },
        { n: "FontAwesome Hub", d: "Scalable Vector UI Icon Typography Kit", u: "https://fontawesome.com" },
        { n: "Google Fonts", d: "Universal Open-Source Web Typography Library", u: "https://fonts.google.com" },
        { n: "DaFont Archive", d: "Public Domain Display Typography Matrix", u: "https://dafont.com" },
        { n: "1001Fonts Kit", d: "Independent Commercial Font Catalog Array", u: "https://1001fonts.com" },
        { n: "FontSquirrel Pro", d: "Curated Webfont Compilation Package Manager", u: "https://fontsquirrel.com" },
        { n: "ILovePDF Console", d: "Consolidated Document Manipulation Layout Tool", u: "https://ilovepdf.com" },
        { n: "Smallpdf Utility", d: "Browser-Native PDF Structural Editor Mesh", u: "https://smallpdf.com" },
        { n: "PDF2Go Editor", d: "Serverless Portable Document File Converter", u: "https://pdf2go.com" },
        { n: "CloudConvert Hub", d: "Universal Multi-Format Binary Transpiler Engine", u: "https://cloudconvert.com" },
        { n: "OnlineConvert Pro", d: "Cross-Extension Structural Media Converter", u: "https://online-convert.com" },
        { n: "Convertio Engine", d: "Distributed Multi-Format File Conversion Engine", u: "https://convertio.co" },
        { n: "Ezgif Toolkit", d: "Animated Raster Compression Sequencing Deck", u: "https://ezgif.com" },
        { n: "Imgur Host", d: "Public Image Raster Stream Repository", u: "https://imgur.com" },
        { n: "Postimages Node", d: "Permanent Forum BBCode Image Direct Linker", u: "https://postimages.org" },
        { n: "Pastebin Repo", d: "Raw Monospaced Text Document Intermediary Storage", u: "https://pastebin.com" },
        { n: "ControlShare Text", d: "Temporary Encrypted Code Container Ledger", u: "https://controlc.com" },
        { n: "Privnote Engine", d: "Self-Destructing Encrypted Text Envelope Token", u: "https://privnote.com" },
        { n: "TempMail Gateway", d: "Disposable Ephemeral Inbound Mail Interface", u: "https://temp-mail.org" },
        { n: "10MinuteMail", d: "Strict 600 Second Lifecycle Inbound Mail Token", u: "https://10minutemail.com" },
        { n: "Guerrilla Mail", d: "Persistent Disposable Address Mail Interface", u: "https://guerrillamail.com" },
        { n: "ProxySite Web", d: "Encrypted Single-Hop HTTP Session Tunnel", u: "https://proxysite.com" },
        { n: "HideMyAss Proxy", d: "Anonymized Browser Endpoint Navigation Relay", u: "https://hidemyass.com/proxy" },
        { n: "KProxy Engine", d: "Distributed Single-Node Web Request Masker", u: "https://kproxy.com" },
        { n: "CroxyProxy Grid", d: "Advanced HTML5 Video Transmitting Web Relay", u: "https://croxyproxy.com" },
        { n: "Wayback Machine", d: "Historical Domain Layout State Snapshot Index", u: "https://archive.org/web" },
        { n: "Archive.is Node", d: "Instant Web Page Content Copy Execution Node", u: "https://archive.is" },
        { n: "Bitly Shortener", d: "Custom Domain URL Redirection Key Manager", u: "https://bitly.com" },
        { n: "TinyURL Engine", d: "Legacy Short URL Alias Redirection Router", u: "https://tinyurl.com" },
        { n: "IsItDownRightNow", d: "External Synthetic Target Server Status Verification", u: "https://isitdownrightnow.com" },
        { n: "DownDetector Panel", d: "Crowdsourced Telemetry Incident Mapping Console", u: "https://downdetector.com" },
        { n: "TimeAndDate Core", d: "Global Isochronous Timezones Synchronization Network", u: "https://timeanddate.com" },
        { n: "WorldClock Grid", d: "Parallel Temporal Zone Coordinate Tracker", u: "https://24timezones.com" },
        { n: "CalculatorEdge", d: "Multi-Disciplinary Quantitative Engineering Calculators", u: "https://calculatoredge.com" },
        { n: "Desmos Grapher", d: "Interactive Analytical Vector Cartesian Grapher", u: "https://desmos.com/calculator" },
        { n: "Mathway Solver", d: "Step-by-Step Algebraic Equation Logic Processor", u: "https://mathway.com" }
    ],
    media: [
        { n: "Yuzu Emulator", d: "Nintendo Switch Virtual Environment Simulator", u: "https://yuzu-emu.org/" },
        { n: "Beyblade X DB", d: "Mechanical Layer Gear Specifications Matrix", u: "https://beyblade.fandom.com/wiki/Beyblade_X" },
        { n: "Harry Potter Spells", d: "Magical Phenomenological Spell Lore Database", u: "https://harrypotter.fandom.com/" },
        { n: "Crunchyroll", d: "High-Bitrate Animation Content Delivery Pipeline", u: "https://crunchyroll.com" },
        { n: "Netflix", d: "On-Demand Cinematographic Stream Architecture", u: "https://netflix.com" },
        { n: "Twitch", d: "Live Low-Latency Multiplex Video Stream Grid", u: "https://twitch.tv" },
        { n: "ArtStation", d: "High-Fidelity Digital Illustration Showcase Matrix", u: "https://artstation.com" },
        { n: "Vimeo", d: "High-Bitrate Cineast Creative Portfolio Platform", u: "https://vimeo.com" },
        { n: "SoundCloud", d: "Independent Acoustic Waveform Publishing Network", u: "https://soundcloud.com" },
        { n: "MyAnimeList", d: "Structured Media Cataloging Metric Index", u: "https://myanimelist.net" },
        { n: "Letterboxd", d: "Social Cinematographic Log Commentary Index", u: "https://letterboxd.com" },
        { n: "Goodreads", d: "Global Bibliographic Catalog Review Datastore", u: "https://goodreads.com" },
        { n: "Shazam Identification", d: "Acoustic Fingerprint Signal Matching Engine", u: "https://shazam.com" },
        { n: "Behance", d: "Adobe Creative Production Asset Layout Grid", u: "https://behance.net" },
        { n: "Bandcamp", d: "Direct-to-Fan Lossless Audio Transaction Engine", u: "https://bandcamp.com" },
        { n: "Audible Audio", d: "Long-Form Spoken Narrative Media Player", u: "https://audible.com" },
        { n: "Mixcloud Stream", d: "Long-Form Complex Acoustic Dj Set Stream", u: "https://mixcloud.com" },
        { n: "Steam Web Hub", d: "Digital Entertainment Entitlement Console Hub", u: "https://store.steampowered.com" },
        { n: "Epic Games Panel", d: "Unreal Engine Game License Library", u: "https://epicgames.com" },
        { n: "GOG Galaxy Hub", d: "DRM-Free Classical Entertainment Preservation Hub", u: "https://gog.com" },
        { n: "Itch.io Sandbox", d: "Independent Micro-Game Distribution Network", u: "https://itch.io" },
        { n: "Nexus Mods Matrix", d: "Community Open Game Asset Modification Repository", u: "https://nexusmods.com" },
        { n: "Gamepedia Fandom", d: "Unified Entertainment Mechanics Wiki Network", u: "https://fandom.com" },
        { n: "IGN Media Index", d: "Entertainment Software Critique News Matrix", u: "https://ign.com" },
        { n: "GameSpot Portal", d: "Interactive Media Release Tracking Grid", u: "https://gamespot.com" },
        { n: "Polygon Node", d: "Modern Digital Entertainment Culture Narrative", u: "https://polygon.com" },
        { n: "Kotaku Matrix", d: "Gamified Software Lifestyle Culture Log", u: "https://kotaku.com" },
        { n: "RockPaperShotgun", d: "Personal Computer Gaming Deep-Dive Narrative", u: "https://rockpapershotgun.com" },
        { n: "Eurogamer Panel", d: "European Interactive Entertainment Analysis Console", u: "https://eurogamer.net" },
        { n: "PCGamer Portal", d: "High-Performance Computing Gaming Chronicle", u: "https://pcgamer.com" },
        { n: "Metacritic Matrix", d: "Consensus Entertainment Metric Score Aggregator", u: "https://metacritic.com" },
        { n: "IMDb Movie Data", d: "Global Film Production Personnel Metadata Register", u: "https://imdb.com" },
        { n: "RottenTomatoes", d: "Cinematic critical Consensus Percentage Engine", u: "https://rottentomatoes.com" },
        { n: "TVTime Tracker", d: "Serial Episode Chronological Retention Log", u: "https://tvtime.com" },
        { n: "AniList Core", d: "Modern Interactive Animation Progress Tracking Mesh", u: "https://anilist.co" },
        { n: "AnimeNewsNetwork", d: "Global Animation Production Enterprise Chronicle", u: "https://animenewsnetwork.com" },
        { n: "MangaDex Hub", d: "Crowdsourced Open Literary Illustration Repository", u: "https://mangadex.org" },
        { n: "Webtoons Studio", d: "Vertical Scroll Digital Comic Media Grid", u: "https://webtoons.com" },
        { n: "DeviantArt Matrix", d: "Legacy Digital Illustration Asset Showcase", u: "https://deviantart.com" },
        { n: "Dribbble Shot", d: "Micro-Layout Interface Design Showroom Portfolio", u: "https://dribbble.com" },
        { n: "ArtStation Blogs", d: "Digital Art Production Workflow Analysis", u: "https://artstation.com/blogs" },
        { n: "Genius Lyrics", d: "Crowdsourced Lyric Poetry Hermeneutical Annotation", u: "https://genius.com" },
        { n: "Last.fm Scrobble", d: "Acoustic Consumption Auditing Metric Graph", u: "https://last.fm" },
        { n: "Pandora Radio", d: "Music Genome Project Algorithmic Radio Matrix", u: "https://pandora.com" },
        { n: "Deezer Matrix", d: "High-Fidelity Global FLAC Audio Stream Engine", u: "https://deezer.com" },
        { n: "Tidal HiFi", d: "Master Quality Authenticated Audio Stream Deck", u: "https://tidal.com" },
        { n: "Mixcloud Live", d: "Synchronous Club Music Live Broadcast Network", u: "https://mixcloud.com/live" },
        { n: "RadioGarden Mesh", d: "Geospatial Spherical Realtime Terrestrial Radio Link", u: "https://radio.garden" },
        { n: "TuneIn Radio", d: "Global Linear Broadcast Stream Aggregator", u: "https://tunein.com" },
        { n: "Podchaser Index", d: "Universal Podcast Audio Metadata Registry", u: "https://podchaser.com" },
        { n: "Stitcher Audio", d: "Spoken Word Serial Audio Syndication Deck", u: "https://stitcher.com" },
        { n: "PocketCasts Web", d: "Cross-Platform Podcast Lifecycle Subscriptions Node", u: "https://play.pocketcasts.com" },
        { n: "Overcast Audio", d: "Smart-Speed Acoustic Audio Compressor Panel", u: "https://overcast.fm" },
        { n: "Castbox Engine", d: "Distributed Spoken Word Audio Discovery Engine", u: "https://castbox.fm" },
        { n: "Vimeo Watch", d: "Curated Human Cinema Staff Picks Stream", u: "https://vimeo.com/watch" },
        { n: "DailyMotion Grid", d: "Alternative Global Video Distribution Grid", u: "https://dailymotion.com" },
        { n: "Twitch Esports", d: "Competitive Electronic Sports Tournament Broadcaster", u: "https://twitch.tv/directory/esports" },
        { n: "Steam Community", d: "Global Multiplayer Game Matchmaking Forum Mesh", u: "https://steamcommunity.com" },
        { n: "Gamasutra Tech", d: "Game Production Structural Engineering Insights", u: "https://gamasutra.com" },
        { n: "Rockstar Social", d: "Proprietary Sandbox Multiplayer Network Portal", u: "https://socialclub.rockstargames.com" },
        { n: "Minecraft Forge", d: "Voxel Sandbox Functional Engine Mod Modding Framework", u: "https://files.minecraftforge.net" },
        { n: "CurseForge Matrix", d: "Hyperscale Gamified Modification Package Manager", u: "https://curseforge.com" },
        { n: "ModDB Repository", d: "Legacy Game Engine Structural Modification Archive", u: "https://moddb.com" },
        { n: "Speedrun.com Grid", d: "Algorithmic Precision Game Completion Leaderboard", u: "https://speedrun.com" },
        { n: "HowLongToBeat", d: "Crowdsourced Playtime Duration Metric Index", u: "https://howlongtobeat.com" },
        { n: "BoardGameGeek", d: "Analog Tabletop Strategy Game Mechanic Database", u: "https://boardgamegeek.com" },
        { n: "Chess.com Arena", d: "Synchronous Realtime ELO Chess Execution Server", u: "https://chess.com" },
        { n: "Lichess Server", d: "Open-Source Zero-Ad Chess Computation Hub", u: "https://lichess.org" },
        { n: "Pokefans Wiki", d: "Pocket Monster Combat Statistics Strategy Hub", u: "https://pokefans.net" },
        { n: "Serebii Pokédex", d: "Definitive Handheld Video Game Monster Database", u: "https://serebii.net" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    if (!GROQ_API_KEY) {
        setTimeout(setupKey, 500);
    }

    const notesArea = document.getElementById('notes-area');
    const copilotDisplay = document.getElementById('copilot-display');
    const cmdInput = document.getElementById('cmd-input');
    
    notesArea.value = localStorage.getItem('nebula_notes') || "";
    copilotDisplay.innerText = localStorage.getItem('last_ai_response') || "Systems Active. Ready for commands.";
    
    notesArea.addEventListener('input', () => {
        localStorage.setItem('nebula_notes', notesArea.value);
    });

    document.addEventListener('keydown', handleGlobalHotkeys);
    cmdInput.addEventListener('input', handleCommandFilter);
    cmdInput.addEventListener('keydown', handleCommandNavigation);

    const lastTab = localStorage.getItem('lastTab') || 'home';
    loadSet(lastTab, document.getElementById(`nav-${lastTab}`));
    
    updateClock();
    setInterval(updateClock, 1000);
    initializeWeather();
});

function setupKey() {
    const key = prompt("NEBULA SYSTEM HALT:\n\nEnter your Groq API Key (gsk_...) to enable Atom AI features. This stays securely in your browser.");
    if (key && key.startsWith("gsk_")) {
        localStorage.setItem('atom_groq_key', key);
        GROQ_API_KEY = key;
        alert("Key Secured. Atom Copilot is now online.");
    }
}

function toggleSettings() {
    const choice = confirm("NEBULA HUB SETTINGS PANEL\n\n- Click OK to purge and clear your Groq API key configuration.\n- Click Cancel to leave systems unaltered.");
    if (choice) {
        localStorage.removeItem('atom_groq_key');
        localStorage.removeItem('nebula_notes');
        localStorage.removeItem('last_ai_response');
        localStorage.removeItem('lastTab');
        location.reload();
    }
}

function initializeWeather() {
    const weatherModule = document.getElementById('weather-module');
    const hours = new Date().getHours();
    let statusString = "28°C | DEL";
    if (hours > 18 || hours < 6) {
        statusString = "24°C • CLR";
    } else if (hours >= 12 && hours <= 16) {
        statusString = "34°C • SUN";
    }
    weatherModule.innerText = statusString;
}

function handleGlobalHotkeys(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
    }
    if (e.key === 'Escape') {
        closeCommandPalette();
    }
}

function toggleCommandPalette() {
    const modal = document.getElementById('command-modal');
    const input = document.getElementById('cmd-input');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        input.value = "";
        input.focus();
        generateCommandResults("");
    }
}

function closeCommandPalette() {
    document.getElementById('command-modal').classList.add('hidden');
}

function handleCommandFilter(e) {
    generateCommandResults(e.target.value.trim().toLowerCase());
}

function generateCommandResults(filterText) {
    const resultsUl = document.getElementById('cmd-results');
    resultsUl.innerHTML = "";
    activeCmdIndex = -1;
    let pool = [];

    Object.keys(apps).forEach(category => {
        apps[category].forEach(app => {
            if (!filterText || app.n.toLowerCase().includes(filterText) || app.d.toLowerCase().includes(filterText)) {
                pool.push({ app: app, cat: category });
            }
        });
    });

    const displayLimit = pool.slice(0, 40);
    displayLimit.forEach((item, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-url', item.app.u);
        li.innerHTML = `<span class="app-name">${item.app.n} <small style="color:var(--text-dim); font-weight:300; margin-left:8px;">${item.app.d}</small></span><span class="app-cat">${item.cat}</span>`;
        li.onclick = () => {
            window.open(item.app.u, '_blank');
            closeCommandPalette();
        };
        resultsUl.appendChild(li);
    });
}

function handleCommandNavigation(e) {
    const resultsUl = document.getElementById('cmd-results');
    const listItems = resultsUl.getElementsByTagName('li');
    if (!listItems.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeCmdIndex < listItems.length - 1) {
            if (activeCmdIndex >= 0) listItems[activeCmdIndex].classList.remove('selected');
            activeCmdIndex++;
            listItems[activeCmdIndex].classList.add('selected');
            listItems[activeCmdIndex].scrollIntoView({ block: 'nearest' });
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeCmdIndex > 0) {
            listItems[activeCmdIndex].classList.remove('selected');
            activeCmdIndex--;
            listItems[activeCmdIndex].classList.add('selected');
            listItems[activeCmdIndex].scrollIntoView({ block: 'nearest' });
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeCmdIndex >= 0 && listItems[activeCmdIndex]) {
            listItems[activeCmdIndex].click();
        } else if (listItems[0]) {
            listItems[0].click();
        }
    }
}

function handleOmni(e) {
    if (e.key === 'Enter') {
        const mode = document.getElementById('searchMode').value;
        const val = e.target.value.trim();
        if (!val) return;
        
        if (mode === 'google') {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(val)}`, '_blank');
        } else if (mode === 'youtube') {
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(val)}`, '_blank');
        } else if (mode === 'github') {
            window.open(`https://github.com/search?q=${encodeURIComponent(val)}`, '_blank');
        } else if (mode === 'atom') {
            askGroq(val);
        }
        e.target.value = '';
    }
}

async function askGroq(query) {
    if (!GROQ_API_KEY) { 
        setupKey(); 
        return; 
    }

    const display = document.getElementById('copilot-display');
    const status = document.getElementById('ai-status');
    
    display.innerHTML = '<span style="opacity:0.5; font-style:italic;">Atom Protocol Computing...</span>';
    status.style.color = "#fbbf24"; 

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${GROQ_API_KEY}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are Atom Copilot. Provide highly concise, accurate, and minimalist responses. Use markdown." }, 
                    { role: "user", content: query }
                ],
                temperature: 0.5
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const reply = data.choices[0].message.content;
        display.innerHTML = reply;
        localStorage.setItem('last_ai_response', reply);
        status.style.color = "#4ade80"; 
    } catch (err) {
        display.innerHTML = `<span style="color:#f87171">System Halt Exception: ${err.message}</span>`;
        status.style.color = "#f87171";
    }
}

function loadSet(key, el) {
    const grid = document.getElementById('appGrid');
    grid.innerHTML = '';
    
    document.querySelectorAll('.icon').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
    
    localStorage.setItem('lastTab', key);
    
    apps[key].forEach((a, i) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.animationDelay = `${i * 0.003}s`; 
        div.onclick = () => window.open(a.u, '_blank');
        div.innerHTML = `<h3>${a.n}</h3><p>${a.d}</p>`;
        grid.appendChild(div);
    });
}

function startTimer() {
    const btn = document.getElementById('btn-start');
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        btn.innerText = "Start";
        btn.style.background = "rgba(255, 255, 255, 0.04)";
    } else {
        btn.innerText = "Halt";
        btn.style.background = "var(--danger)";
        pomodoroInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerUI();
            } else {
                clearInterval(pomodoroInterval);
                pomodoroInterval = null;
                btn.innerText = "Start";
                btn.style.background = "rgba(255, 255, 255, 0.04)";
                alert("Focus interval achieved. Initialize reset protocol.");
                timerSeconds = 1500;
                updateTimerUI();
            }
        }, 1000);
    }
}

function resetTimer() {
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
    timerSeconds = 1500;
    updateTimerUI();
    const btn = document.getElementById('btn-start');
    btn.innerText = "Start";
    btn.style.background = "rgba(255, 255, 255, 0.04)";
}

function updateTimerUI() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('timer-val').innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], {
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false
    });
    document.getElementById('date').innerText = now.toLocaleDateString([], {
        weekday: 'long', 
        month: 'short', 
        day: 'numeric'
    }).toUpperCase();
}
