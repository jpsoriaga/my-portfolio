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

import LinewiseCallDetail from "@/assets/linewise/04-call-detail.png"
import LinewiseRedaction from "@/assets/linewise/05-redacted-transcript-and-coaching-note.png"
import LinewiseScorecard from "@/assets/linewise/06-scorecard-editor.png"
import LinewiseDashboard from "@/assets/linewise/08-agent-dashboard.png"
import LinewiseUpload from "@/assets/linewise/01-upload-and-queue.png"

export type ProjectLink = {
    label: string;
    href: string;
};

export type ProjectDetails = {
    summary: string;
    links: ProjectLink[];
    facts: { label: string; value: string }[];
    stack: string[];
    problem: string[];
    overview: string;
    features: { title: string; description: string }[];
    challenges: { title: string; description: string }[];
    outcome?: string[];
    screenshots: { image: string; caption: string }[];
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
    },
    {
        slug: "ilabcict", logo: IlabCICTLogo, title: "IlabCICT", year: 2026, image: IlabCICT,
        category: "Laboratory Management", tags: ["Ticket Management", "Laboratory Monitoring", "Technical Support"], href: "https://i-lab-cict-web.vercel.app/",
    },
    {
        slug: "chiora", logo: ChioraLogo, title: "Chiora", year: 2026, image: Chiora,
        category: "Health & Fitness", tags: ["Workout Tracking", "Progress Tracking", "Live Activities"], href: "https://chiora-web.vercel.app/",
    },
    {
        slug: "linewise", logo: LinewiseLogo, title: "Linewise", year: 2026, image: Linewise,
        category: "Call Center QA", tags: ["Local AI", "Call Scoring", "Privacy Protection"], href: "https://github.com/Polstuds27/Linewise",
        badge: "6th · Hackathon",
        details: {
            summary: "Local-AI quality checks for call center calls.",
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
                { image: LinewiseCallDetail, caption: "Call detail: score, waveform player, transcript and a verdict for every rule." },
                { image: LinewiseRedaction, caption: "Redacted transcript, PDF export and a coaching note from the local model." },
                { image: LinewiseScorecard, caption: "Scorecard editor with weights, rule types and critical marks." },
                { image: LinewiseDashboard, caption: "Agent dashboard with average scores and most-missed rules." },
                { image: LinewiseUpload, caption: "Upload and queue: recordings are transcribed and scored in turn." },
            ],
        },
    },
    {
        slug: "resite", logo: ResiteLogo, title: "Resite", year: 2026, image: Resite,
        category: "Portfolio Builder", tags: ["Resume Parsing", "AI Design", "Site Editor"], href: "https://resite-portfolio.vercel.app/",
    },
];

export const projectsNewestFirst = [...projects].reverse();

export function getProjectPath(project: Project) {
    return `/projects/${project.slug}`;
}
