import SubwayLogo from "@/assets/subway-logo.jpg"
import IlabCICTLogo from "@/assets/ilabcict-logo.png"
import ChioraLogo from "@/assets/chiora-logo.png"
import LinewiseLogo from "@/assets/linewise-logo.png"
import ResiteLogo from "@/assets/resite-logo.svg"

import SmartSubway from "@/assets/smart-subway-mockup.png"
import IlabCICT from "@/assets/ilabcict-mockup.png"
import Chiora from "@/assets/chiora-mockup.png"
import Linewise from "@/assets/linewise-mockup.png"
import Resite from "@/assets/resite-mockup.png"

import SmartSubwayOrderLine from "@/assets/smart-subway/pos-order-line.png"
import SmartSubwayDashboard from "@/assets/smart-subway/admin-dashboard.png"
import SmartSubwayOrderDetails from "@/assets/smart-subway/order-details.png"
import SmartSubwayMenu from "@/assets/smart-subway/menu-management.png"
import SmartSubwayTransactions from "@/assets/smart-subway/transactions.png"

import IlabCICTDashboard from "@/assets/ilabcict/dashboard.png"
import IlabCICTTickets from "@/assets/ilabcict/manage-ticket.png"
import IlabCICTLaboratories from "@/assets/ilabcict/manage-laboratory.png"
import IlabCICTWeeklyReports from "@/assets/ilabcict/weekly-reports.png"
import IlabCICTRepairLogs from "@/assets/ilabcict/repair-logs.png"

import ChioraActiveWorkout from "@/assets/chiora/active-workout.png"
import ChioraPillars from "@/assets/chiora/product-pillars.png"
import ChioraLocalFirst from "@/assets/chiora/local-first.png"

import LinewiseCallDetail from "@/assets/linewise/04-call-detail.png"
import LinewiseRedaction from "@/assets/linewise/05-redacted-transcript-and-coaching-note.png"
import LinewiseScorecard from "@/assets/linewise/06-scorecard-editor.png"
import LinewiseDashboard from "@/assets/linewise/08-agent-dashboard.png"
import LinewiseUpload from "@/assets/linewise/01-upload-and-queue.png"

import ResiteEditor from "@/assets/resite/editor.png"
import ResiteTemplates from "@/assets/resite/templates.png"
import ResiteTemplateShowcase from "@/assets/resite/template-showcase.png"
import ResiteAIStudio from "@/assets/resite/ai-studio.png"

export type ProjectLink = {
    label: string;
    href: string;
};

export type ProjectScreenshot = {
    image: string;
    caption: string;
    width: number;
    height: number;
};

export type ProjectDetails = {
    summary: string;
    // Team projects say "we" in section headings; solo projects say "I".
    isTeamProject?: boolean;
    links: ProjectLink[];
    facts: { label: string; value: string }[];
    stack: string[];
    problem: string[];
    overview: string;
    features: { title: string; description: string }[];
    challenges: { title: string; description: string }[];
    outcome?: string[];
    screenshots: ProjectScreenshot[];
};

export type Project = {
    slug: string;
    logo: string;
    title: string;
    year: number;
    image: string;
    category: string;
    tags: string[];
    href: string;
    badge?: string;
    // Projects with details get their own page; the rest link to `href`.
    details?: ProjectDetails;
};

// Add new projects to the end of this list; they are displayed newest first.
export const projects: Project[] = [
    {
        slug: "smart-subway", logo: SubwayLogo, title: "Smart Subway", year: 2025, image: SmartSubway,
        category: "Food & Beverage", tags: ["POS System", "Dashboard", "Order Management"], href: "https://smart-subway-system.vercel.app/",
        details: {
            summary: "A point of sale and order management system for a Subway-style restaurant.",
            links: [
                { label: "Live site", href: "https://smart-subway-system.vercel.app/" },
            ],
            facts: [
                { label: "TYPE", value: "Restaurant POS · Web app" },
                { label: "TIMELINE", value: "Dec 2025 – Oct 2026" },
                { label: "USERS", value: "Counter staff and store admins" },
            ],
            stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Node.js", "Express", "MongoDB", "Cloudinary"],
            problem: [
                "A busy fast-food counter has three jobs happening at once: staff taking orders, the kitchen working out what to make next, and the owner trying to understand how the day is going. When those live on paper slips and memory, orders get missed and nobody sees the numbers until closing.",
            ],
            overview: "Smart Subway puts the whole flow in one place. Staff build orders on a POS screen, every order moves through a shared Wait list, In kitchen and Served board, and admins get a dashboard of the day's sales, best sellers and peak hours.",
            features: [
                { title: "Fast order line", description: "Browse the menu by category, adjust quantities, pick Dine in or Take away, and pay by cash, card or scan." },
                { title: "Order status board", description: "Every order moves from Wait list to In kitchen to Served, with the assigned staff and payment summary on each card." },
                { title: "Sales dashboard", description: "Today's sales, orders, open orders and gross sales, plus best sellers, payment methods and peak hours." },
                { title: "Menu management", description: "Add products with photos, set prices, and switch items on or off for what staff can sell today." },
                { title: "Accounts and roles", description: "Separate staff and admin views, with accounts managed by the admin." },
            ],
            challenges: [
                { title: "One order, two views", description: "Staff place orders from the POS while admins move them through the kitchen. Each change invalidates the shared queries, so both sides see the same order state without a manual refresh." },
                { title: "Secure sign-in", description: "JWT access tokens with a refresh token kept in an httpOnly cookie, role-based routes for staff and admins, and a rate limiter on the login endpoint." },
                { title: "Knowing what to cut", description: "I built inventory tracking, then removed it to keep the core order flow simple and solid. The POS and dashboard got better for it." },
            ],
            screenshots: [
                { image: SmartSubwayOrderLine, caption: "Order line: the live order queue, the menu, and the current order with payment summary.", width: 2000, height: 1125 },
                { image: SmartSubwayDashboard, caption: "Admin dashboard with today's sales, order status and sales overview.", width: 2000, height: 1125 },
                { image: SmartSubwayOrderDetails, caption: "Order details sheet with items, payment summary and status controls.", width: 2000, height: 1125 },
                { image: SmartSubwayMenu, caption: "Menu management with availability toggles.", width: 2000, height: 1125 },
                { image: SmartSubwayTransactions, caption: "Transactions: the sales ledger with payment mix and receipt details.", width: 2000, height: 1125 },
            ],
        },
    },
    {
        slug: "ilabcict", logo: IlabCICTLogo, title: "IlabCICT", year: 2026, image: IlabCICT,
        category: "Laboratory Management", tags: ["Ticket Management", "Laboratory Monitoring", "Technical Support"], href: "https://i-lab-cict-web.vercel.app/",
        details: {
            summary: "Laboratory maintenance and technical support for BulSU CICT.",
            isTeamProject: true,
            links: [
                { label: "Live site", href: "https://i-lab-cict-web.vercel.app/" },
                { label: "GitHub", href: "https://github.com/concurrentilabcict/iLabCICT-Web" },
            ],
            facts: [
                { label: "FOR", value: "Bulacan State University CICT" },
                { label: "TIMELINE", value: "May – Oct 2026" },
                { label: "USERS", value: "Faculty, technicians and admins" },
            ],
            stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "WebSockets", "Recharts", "ZXing", "ExcelJS"],
            problem: [
                "The college runs several computer laboratories, and when a PC breaks the report has to reach a technician, the repair has to be tracked, and someone has to write it all up in a weekly report. Done by message and by hand, requests get lost, the same issue is reported twice, and there's no clear history of what was fixed.",
            ],
            overview: "iLabCICT gives each role its own workflow. Faculty report an issue with the room and computer already attached, technicians work through a live ticket board, and admins see the whole operation with users, labs, audit logs and reports.",
            features: [
                { title: "Issue reports with context", description: "Faculty pick the lab and computer, describe the problem and attach an image, or scan the computer's QR code to fill it in." },
                { title: "Live ticket board", description: "Technicians are assigned tickets, filter by status, and move them from open to ongoing to resolved." },
                { title: "Repair history", description: "Repair logs keep the ticket, notes, technician, computer, room and completion date in one record." },
                { title: "Weekly reports", description: "Written maintenance summaries with total logs and a repair log breakdown, exported to PDF." },
                { title: "Lab assets", description: "Computers and rooms with QR code export and Excel import and export." },
                { title: "Troubleshooting assistant", description: "A chatbot that suggests troubleshooting steps for display, network and performance issues." },
            ],
            challenges: [
                { title: "Keeping everyone in sync", description: "Tickets, rooms, notifications and audit logs update over WebSocket events, so a status change shows up for faculty, technicians and admins right away." },
                { title: "Catching duplicate reports", description: "Before a ticket is submitted, it's compared against open tickets with token, fuzzy and phrase matching plus a vocabulary of common PC issues, and the reporter is warned about likely duplicates." },
                { title: "Three roles, one system", description: "Faculty, technicians and admins each get their own pages and permissions while sharing the same tickets, rooms and computers underneath." },
            ],
            screenshots: [
                { image: IlabCICTDashboard, caption: "Admin dashboard: open tickets, ongoing repairs, ticket trends and laboratory status.", width: 2000, height: 1250 },
                { image: IlabCICTTickets, caption: "Ticket management with status, type and date filters.", width: 2000, height: 1250 },
                { image: IlabCICTLaboratories, caption: "Laboratories by floor, with computers, active issues, custodian and assigned technician.", width: 2000, height: 1250 },
                { image: IlabCICTWeeklyReports, caption: "Technician weekly and monthly reports.", width: 2000, height: 1250 },
                { image: IlabCICTRepairLogs, caption: "Repair logs for every resolved ticket.", width: 2000, height: 1250 },
            ],
        },
    },
    {
        slug: "chiora", logo: ChioraLogo, title: "Chiora", year: 2026, image: Chiora,
        category: "Health & Fitness", tags: ["Workout Tracking", "Progress Tracking", "Live Activities"], href: "https://chiora-web.vercel.app/",
        details: {
            summary: "A workout tracker for logging training fast and seeing progress clearly.",
            links: [
                { label: "Website", href: "https://chiora-web.vercel.app/" },
            ],
            facts: [
                { label: "PLATFORM", value: "iOS · React Native and Expo" },
                { label: "TIMELINE", value: "Aug – Oct 2026" },
                { label: "TYPE", value: "Personal project" },
            ],
            stack: ["React Native", "Expo", "TypeScript", "Expo Router", "NativeWind", "Reanimated", "SQLite", "Supabase", "Swift"],
            problem: [
                "Logging a workout should take seconds between sets, but most fitness apps bury that behind accounts, feeds and dashboards. I wanted something that gets out of the way during training and still shows real progress over weeks.",
            ],
            overview: "Chiora focuses on the set in front of you: weight, reps, your previous performance and a rest timer, all within reach. Training plans, history and progress build up quietly around it, and everything works offline without an account.",
            features: [
                { title: "Focused workout logging", description: "Log weight and reps with your previous performance beside each set, plus exercise notes and a workout summary." },
                { title: "Rest timer everywhere", description: "The rest timer runs in the app, in a Live Activity and in the Dynamic Island." },
                { title: "Training structure", description: "Routines, a reusable exercise library, and a weekly plan with routine rotation." },
                { title: "Progress", description: "Strength progression, estimated max lift, training volume, body weight trends and same-pose progress photo comparison." },
                { title: "Home Screen widgets", description: "Small and medium widgets show the active workout, rest timer or next training day." },
            ],
            challenges: [
                { title: "Local-first data", description: "Everything reads and writes an on-device SQLite database with versioned, data-preserving migrations. Cloud backup through Supabase is optional and never sits in the way of a workout." },
                { title: "A timer that stays accurate", description: "The rest timer, notifications and the native Swift Live Activity all share one stored deadline, so they agree with each other without updating JavaScript every second." },
                { title: "Native feel", description: "Native iOS tabs, sheets and controls with SF Symbols where they're supported, and working fallbacks on Android." },
            ],
            screenshots: [
                { image: ChioraActiveWorkout, caption: "An active workout with the rest timer and logged sets.", width: 2000, height: 1246 },
                { image: ChioraPillars, caption: "Workout logging, progress, training structure and local-first data.", width: 2000, height: 941 },
                { image: ChioraLocalFirst, caption: "Train locally, back up when ready, and restore when needed.", width: 2000, height: 508 },
            ],
        },
    },
    {
        slug: "linewise", logo: LinewiseLogo, title: "Linewise", year: 2026, image: Linewise,
        category: "Call Center QA", tags: ["Local AI", "Call Scoring", "Privacy Protection"], href: "https://github.com/Polstuds27/Linewise",
        badge: "6th · Hackathon",
        details: {
            summary: "Local-AI quality checks for call center calls.",
            isTeamProject: true,
            links: [
                { label: "GitHub", href: "https://github.com/Polstuds27/Linewise" },
                { label: "Demo video", href: "https://github.com/Polstuds27/Linewise/blob/main/docs/linewise-demo.mp4" },
                { label: "LinkedIn post", href: "https://lnkd.in/p/gXKWvggd" },
            ],
            facts: [
                { label: "TEAM", value: "Team Busseng · 4 people" },
                { label: "TIMELINE", value: "2 days · Oct 9–10, 2026" },
                { label: "EVENT", value: "AppBuildersPH Hackathon 2026 · Local AI track" },
            ],
            stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Transformers.js", "Ollama", "whisper.cpp", "Node.js", "SQLite"],
            problem: [
                "In call centers, every call is supposed to be checked: did the agent verify the caller's identity, follow the script, say the required disclosures, and actually solve the problem? QA analysts do this by listening to recordings one by one and filling in a scorecard. That is slow, so only a small sample of calls is ever reviewed and coaching comes days late.",
                "Recordings are also full of sensitive customer data. Sending them to a cloud AI creates privacy risk under the Data Privacy Act and can break client data rules.",
            ],
            overview: "Linewise does the whole check on the analyst's own laptop. Upload a recording and it transcribes the call, hides customer details, scores it against the QA rubric, and flags the moments that need coaching. The audio never leaves the machine.",
            features: [
                { title: "Transcript with speakers", description: "Every line is tagged Agent or Customer and timed to the audio." },
                { title: "Automatic redaction", description: "Card numbers, emails, phone numbers, account IDs, names and addresses are hidden." },
                { title: "Rule-by-rule scoring", description: "Each rule gets a Pass, Fail or N/A with the quoted line as evidence, and the call is scored out of 100." },
                { title: "Click-to-review flags", description: "Jump to the exact moment in the audio, confirm or dismiss it, and export a redacted PDF." },
                { title: "Team tools", description: "A scorecard editor, a per-agent dashboard, coaching notes, and phone uploads over the office Wi-Fi." },
            ],
            challenges: [
                { title: "Making a small model reliable", description: "A 3B model on a laptop can't be trusted to grade a call outright. Each rule is split into yes/no questions asked only over the lines that can answer them, then code turns the answers into the verdict and rejects any quote that isn't in the transcript." },
                { title: "Fully offline", description: "Speech-to-text, speaker separation, redaction, scoring and the PDF export all run locally. After setup, the app keeps working with the internet blocked." },
                { title: "Fast enough to demo", description: "About 7 to 8 seconds per call on an M4 Pro, from pressing Transcribe & score to a scored result." },
            ],
            outcome: [
                "6th place out of 1,200+ developers and 400+ teams in the Local AI track.",
                "126 of 126 scoring checks and 33 of 33 redaction checks passed on our scripted test calls.",
            ],
            screenshots: [
                { image: LinewiseCallDetail, caption: "Call detail: score, waveform player, transcript and a verdict for every rule.", width: 2000, height: 1093 },
                { image: LinewiseRedaction, caption: "Redacted transcript, PDF export and a coaching note from the local model.", width: 2000, height: 1093 },
                { image: LinewiseScorecard, caption: "Scorecard editor with weights, rule types and critical marks.", width: 2000, height: 1093 },
                { image: LinewiseDashboard, caption: "Agent dashboard with average scores and most-missed rules.", width: 2000, height: 1093 },
                { image: LinewiseUpload, caption: "Upload and queue: recordings are transcribed and scored in turn.", width: 2000, height: 1093 },
            ],
        },
    },
    {
        slug: "resite", logo: ResiteLogo, title: "Resite", year: 2026, image: Resite,
        category: "Portfolio Builder", tags: ["Resume Parsing", "AI Design", "Site Editor"], href: "https://resite-portfolio.vercel.app/",
        details: {
            summary: "Turns a resume into a portfolio website.",
            links: [
                { label: "Live site", href: "https://resite-portfolio.vercel.app/" },
            ],
            facts: [
                { label: "TYPE", value: "Personal project · Free to use" },
                { label: "TIMELINE", value: "Oct 2026" },
                { label: "USERS", value: "Job seekers with a resume" },
            ],
            stack: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS", "shadcn/ui", "Supabase", "Groq", "Zod", "Vercel"],
            problem: [
                "Almost everyone looking for work already has a resume, but far fewer have a portfolio site. Making one means designing and building a website, which is a blank page most people never get past.",
            ],
            overview: "Resite starts from the document you already wrote. Upload a PDF, check what was read, pick a template or let the AI studio suggest three looks, fine-tune it in the editor, and publish it at your own address.",
            features: [
                { title: "Upload and parse", description: "The PDF is read in the browser, structured by AI, and shown back so you can check it before anything is published." },
                { title: "Templates with your details", description: "Every template is previewed with your own resume, not placeholder text." },
                { title: "AI design studio", description: "Suggests three designs from your resume, built from Resite's own layouts, fonts and colours." },
                { title: "Editor", description: "Live preview with inline editing, reorder and hide sections, colours and fonts, autosave and undo." },
                { title: "Publish and keep it", description: "Your site at /username with share previews, an optional custom domain, and a download as plain HTML and CSS." },
            ],
            challenges: [
                { title: "AI that designs, not codes", description: "The AI studio returns design specs instead of code, picked from Resite's own building blocks, and checks each palette is easy to read. Every result stays on-brand and safe to render." },
                { title: "One renderer everywhere", description: "Portfolio markup is written in one place, so the editor preview, the published site and the downloaded HTML all look the same." },
                { title: "Free to run", description: "Everything runs on free tiers. AI calls happen only inside Supabase Edge Functions, and parsed resumes are validated with Zod before they're saved." },
            ],
            screenshots: [
                { image: ResiteEditor, caption: "The editor: live preview on the left, content, sections and style on the right.", width: 2000, height: 1250 },
                { image: ResiteTemplates, caption: "Picking a template, each one shown with your own details.", width: 2000, height: 1250 },
                { image: ResiteTemplateShowcase, caption: "Templates on the landing page, shown with invented sample resumes.", width: 2000, height: 1648 },
                { image: ResiteAIStudio, caption: "The AI studio suggests three designs from your resume.", width: 2000, height: 1345 },
            ],
        },
    },
];

export const projectsNewestFirst = [...projects].reverse();

export function getProjectPath(project: Project) {
    return `/projects/${project.slug}`;
}

// The project after this one in display order, wrapping around to the first.
export function getNextProject(project: Project) {
    const index = projectsNewestFirst.findIndex((item) => item.slug === project.slug);

    return projectsNewestFirst[(index + 1) % projectsNewestFirst.length];
}
