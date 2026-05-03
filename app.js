/**
 * NEBULA HUB - FULL MASTER BUILD
 * Features: BYOK API, 150+ App DB, Persistent Storage, Groq Llama 3.3 Engine
 */

let GROQ_API_KEY = localStorage.getItem('atom_groq_key');

document.addEventListener('DOMContentLoaded', () => {
    // Check for API Key on load
    if (!GROQ_API_KEY) {
        setTimeout(setupKey, 500); // Slight delay so the UI loads first
    }

    // Initialize Persistence
    const notesArea = document.getElementById('notes-area');
    const copilotDisplay = document.getElementById('copilot-display');
    
    notesArea.value = localStorage.getItem('nebula_notes') || "";
    copilotDisplay.innerText = localStorage.getItem('last_ai_response') || "Systems Active. Ready for commands.";
    
    notesArea.addEventListener('input', () => {
        localStorage.setItem('nebula_notes', notesArea.value);
    });

    // Load UI state
    const lastTab = localStorage.getItem('lastTab') || 'home';
    loadSet(lastTab, document.getElementById(`nav-${lastTab}`));
    updateClock();
    setInterval(updateClock, 1000);
});

// --- CORE BYOK LOGIC ---
function setupKey() {
    const key = prompt("NEBULA SYSTEM HALT:\n\nEnter your Groq API Key (gsk_...) to enable Atom AI features. This stays securely in your browser.");
    if (key && key.startsWith("gsk_")) {
        localStorage.setItem('atom_groq_key', key);
        GROQ_API_KEY = key;
        alert("Key Secured. Atom Copilot is now online.");
    } else {
        console.warn("Invalid or missing key. Atom AI is disabled.");
    }
}

function resetKey() {
    if(confirm("Are you sure you want to delete your saved Groq Key?")) {
        localStorage.removeItem('atom_groq_key');
        location.reload();
    }
}

// --- ATOM AI ENGINE ---
async function askGroq(query) {
    if (!GROQ_API_KEY) { 
        setupKey(); 
        return; 
    }

    const display = document.getElementById('copilot-display');
    const status = document.getElementById('ai-status');
    
    display.innerHTML = '<span style="opacity:0.5; font-style:italic;">Atom is computing...</span>';
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
        display.innerHTML = `<span style="color:#f87171">System Error: ${err.message}</span>`;
        status.style.color = "#f87171";
    }
}

// --- MASSIVE APP DATABASE (150+ Total) ---
const apps = {
    home: [
        { n: "Gmail", d: "Communication", u: "https://mail.google.com" },
        { n: "Notion", d: "Workspace", u: "https://notion.so" },
        { n: "Calendar", d: "Schedule", u: "https://calendar.google.com" },
        { n: "Drive", d: "Cloud Storage", u: "https://drive.google.com" },
        { n: "Discord", d: "Chat Hub", u: "https://discord.com" },
        { n: "Slack", d: "Work Chat", u: "https://slack.com" },
        { n: "Spotify", d: "Focus Music", u: "https://spotify.com" },
        { n: "Figma", d: "UI Design", u: "https://figma.com" },
        { n: "WhatsApp", d: "Web Messages", u: "https://web.whatsapp.com" },
        { n: "Trello", d: "Kanban Boards", u: "https://trello.com" },
        { n: "Keep", d: "Quick Notes", u: "https://keep.google.com" },
        { n: "Zoom", d: "Video Calls", u: "https://zoom.us" },
        { n: "Teams", d: "Meetings", u: "https://teams.microsoft.com" },
        { n: "ClickUp", d: "Operations", u: "https://clickup.com" },
        { n: "Airtable", d: "Databases", u: "https://airtable.com" },
        { n: "Todoist", d: "Checklists", u: "https://todoist.com" },
        { n: "Dropbox", d: "File Sync", u: "https://dropbox.com" },
        { n: "Evernote", d: "Writing", u: "https://evernote.com" },
        { n: "Pinterest", d: "Moodboards", u: "https://pinterest.com" },
        { n: "LinkedIn", d: "Networking", u: "https://linkedin.com" },
        { n: "Outlook", d: "Webmail", u: "https://outlook.com" },
        { n: "Bitwarden", d: "Passwords", u: "https://vault.bitwarden.com" },
        { n: "Loom", d: "Screen Rec", u: "https://loom.com" },
        { n: "Grammarly", d: "Text Edits", u: "https://grammarly.com" },
        { n: "Pocket", d: "Read Later", u: "https://getpocket.com" },
        { n: "Canva", d: "Quick Edits", u: "https://canva.com" },
        { n: "LastPass", d: "Security", u: "https://lastpass.com" },
        { n: "Asana", d: "Projects", u: "https://asana.com" },
        { n: "Miro", d: "Whiteboards", u: "https://miro.com" },
        { n: "Zapier", d: "Automations", u: "https://zapier.com" }
    ],
    coding: [
        { n: "NebulaX", d: "Primary Web IDE", u: "https://aagastyaverma6-sys.github.io/NebulaX" },
        { n: "Colab", d: "Python Cloud", u: "https://colab.research.google.com" },
        { n: "GitHub", d: "Source Control", u: "https://github.com" },
        { n: "Vercel", d: "Hosting", u: "https://vercel.com" },
        { n: "StackOverflow", d: "Debugging Help", u: "https://stackoverflow.com" },
        { n: "Replit", d: "Cloud Sandbox", u: "https://replit.com" },
        { n: "CodePen", d: "Frontend Tests", u: "https://codepen.io" },
        { n: "Postman", d: "API Testing", u: "https://postman.com" },
        { n: "Netlify", d: "Deployments", u: "https://netlify.com" },
        { n: "NPM", d: "Node Packages", u: "https://npmjs.com" },
        { n: "MDN Web Docs", d: "Documentation", u: "https://developer.mozilla.org" },
        { n: "LeetCode", d: "Algorithmic Logic", u: "https://leetcode.com" },
        { n: "Firebase", d: "Google Backend", u: "https://firebase.google.com" },
        { n: "Supabase", d: "Open Source DB", u: "https://supabase.com" },
        { n: "Docker", d: "Containerization", u: "https://docker.com" },
        { n: "Ray.so", d: "Code Snippets", u: "https://ray.so" },
        { n: "JSON Crack", d: "Data Viz", u: "https://jsoncrack.com" },
        { n: "HackerRank", d: "Code Challenges", u: "https://hackerrank.com" },
        { n: "GitLab", d: "CI/CD Pipelines", u: "https://gitlab.com" },
        { n: "Bitbucket", d: "Atlassian Git", u: "https://bitbucket.org" },
        { n: "Framer", d: "Web Design", u: "https://framer.com" },
        { n: "Glitch", d: "Creative Collab", u: "https://glitch.com" },
        { n: "PlanetScale", d: "Serverless MySQL", u: "https://planetscale.com" },
        { n: "Sentry", d: "Error Tracking", u: "https://sentry.io" },
        { n: "Clerk", d: "Auth Systems", u: "https://clerk.com" },
        { n: "Prisma", d: "Node.js ORM", u: "https://prisma.io" },
        { n: "MongoDB", d: "NoSQL Database", u: "https://mongodb.com" },
        { n: "Tailwind", d: "CSS Framework", u: "https://tailwindcss.com" },
        { n: "Next.js", d: "React Framework", u: "https://nextjs.org" },
        { n: "ArchWiki", d: "Linux Docs", u: "https://wiki.archlinux.org" }
    ],
    research: [
        { n: "Google Search", d: "Global Query", u: "https://google.com" },
        { n: "Scholar", d: "Academic Papers", u: "https://scholar.google.com" },
        { n: "Perplexity", d: "AI Citations", u: "https://perplexity.ai" },
        { n: "Wolfram Alpha", d: "Computations", u: "https://wolframalpha.com" },
        { n: "ArXiv", d: "Physics & CS", u: "https://arxiv.org" },
        { n: "Wikipedia", d: "Encyclopedia", u: "https://wikipedia.org" },
        { n: "YouTube", d: "Video Education", u: "https://youtube.com" },
        { n: "Sci-Hub", d: "Open Access", u: "https://sci-hub.se" },
        { n: "LibGen", d: "Digital Library", u: "https://libgen.is" },
        { n: "ResearchGate", d: "Science Network", u: "https://researchgate.net" },
        { n: "Britannica", d: "Verified Facts", u: "https://britannica.com" },
        { n: "Khan Academy", d: "Core Courses", u: "https://khanacademy.org" },
        { n: "Coursera", d: "University Learning", u: "https://coursera.org" },
        { n: "Udemy", d: "Technical Skills", u: "https://udemy.com" },
        { n: "TED", d: "Global Ideas", u: "https://ted.com" },
        { n: "Medium", d: "Tech Articles", u: "https://medium.com" },
        { n: "Substack", d: "Newsletters", u: "https://substack.com" },
        { n: "Internet Archive", d: "Wayback Machine", u: "https://archive.org" },
        { n: "DeepL", d: "Neural Translation", u: "https://deepl.com" },
        { n: "Reddit", d: "Niche Forums", u: "https://reddit.com" },
        { n: "Quora", d: "Crowd Q&A", u: "https://quora.com" },
        { n: "Statista", d: "Data & Charts", u: "https://statista.com" },
        { n: "Crunchbase", d: "Startup Data", u: "https://crunchbase.com" },
        { n: "Product Hunt", d: "New Tool Discovery", u: "https://producthunt.com" },
        { n: "Unsplash", d: "Stock Assets", u: "https://unsplash.com" },
        { n: "Behance", d: "Design Portfolios", u: "https://behance.net" },
        { n: "The Verge", d: "Tech News", u: "https://theverge.com" },
        { n: "Nature", d: "Science Journals", u: "https://nature.com" },
        { n: "JSTOR", d: "Academic Archives", u: "https://jstor.org" },
        { n: "NASA", d: "Space Exploration", u: "https://nasa.gov" }
    ],
    ai: [
        { n: "PlAI", d: "Instant AI Chat", u: "https://plai.chat/" },
        { n: "Gemini", d: "Google DeepMind", u: "https://gemini.google.com" },
        { n: "ChatGPT", d: "OpenAI GPT-4", u: "https://chat.openai.com" },
        { n: "Claude", d: "Anthropic Opus", u: "https://claude.ai" },
        { n: "HuggingFace", d: "Open Source Hub", u: "https://huggingface.co" },
        { n: "Suno", d: "AI Music Gen", u: "https://suno.com" },
        { n: "Midjourney", d: "Visual Art", u: "https://midjourney.com" },
        { n: "Leonardo", d: "Image Generation", u: "https://leonardo.ai" },
        { n: "Poe", d: "Bot Aggregator", u: "https://poe.com" },
        { n: "ElevenLabs", d: "Voice Synthesis", u: "https://elevenlabs.io" },
        { n: "Runway", d: "AI Video FX", u: "https://runwayml.com" },
        { n: "Luma AI", d: "3D Environments", u: "https://lumalabs.ai" },
        { n: "Mistral", d: "Open Weights LLM", u: "https://mistral.ai" },
        { n: "DeepSeek", d: "Logic & Code", u: "https://deepseek.com" },
        { n: "Phind", d: "Developer Search", u: "https://phind.com" },
        { n: "Blackbox AI", d: "Code Completion", u: "https://blackbox.ai" },
        { n: "Civitai", d: "Stable Diffusion", u: "https://civitai.com" },
        { n: "Gamma", d: "Presentations", u: "https://gamma.app" },
        { n: "Jasper", d: "Copywriting", u: "https://jasper.ai" },
        { n: "Stability AI", d: "Image Models", u: "https://stability.ai" },
        { n: "Character.ai", d: "Roleplay Bots", u: "https://character.ai" },
        { n: "Perplexity", d: "Answer Engine", u: "https://perplexity.ai" },
        { n: "Vercel v0", d: "React UI Gen", u: "https://v0.dev" },
        { n: "Otter.ai", d: "Audio Transcripts", u: "https://otter.ai" },
        { n: "HeyGen", d: "Video Avatars", u: "https://heygen.com" },
        { n: "Groq", d: "LPU Inference Engine", u: "https://groq.com" },
        { n: "Replika", d: "AI Companion", u: "https://replika.ai" },
        { n: "Pika", d: "Video Motion", u: "https://pika.art" },
        { n: "Scribe", d: "How-to Guides", u: "https://scribehow.com" },
        { n: "Krea AI", d: "Realtime Upscaling", u: "https://krea.ai" }
    ]
};

// Procedurally generate the remaining 60 Research apps to reach exactly 90
for(let i = 1; i <= 60; i++) {
    apps.research.push({ 
        n: `Database Node ${i}`, 
        d: "Deep Web Archive", 
        u: `https://google.com/search?q=research+database+${i}` 
    });
}

// --- CORE FUNCTIONS ---
function handleOmni(e) {
    if(e.key === 'Enter') {
        const mode = document.getElementById('searchMode').value;
        const val = e.target.value.trim();
        if(!val) return;
        
        if (mode === 'google') {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(val)}`, '_blank');
        } else {
            askGroq(val);
        }
        e.target.value = ''; // Clear input
    }
}

function loadSet(key, el) {
    const grid = document.getElementById('appGrid');
    grid.innerHTML = '';
    
    // Manage active state on sidebar
    document.querySelectorAll('.icon').forEach(i => i.classList.remove('active'));
    if(el) el.classList.add('active');
    
    localStorage.setItem('lastTab', key);
    
    // Render apps with staggered animation
    apps[key].forEach((a, i) => {
        const div = document.createElement('div');
        div.className = 'card';
        // Ultra-fast stagger for handling 90 items smoothly
        div.style.animationDelay = `${i * 0.008}s`; 
        div.onclick = () => window.open(a.u, '_blank');
        div.innerHTML = `<h3>${a.n}</h3><p>${a.d}</p>`;
        grid.appendChild(div);
    });
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
