export const links = {
  email: 'swastikdutt@gmail.com',
  github: 'https://github.com/Swastikkkkk',
  linkedin: 'https://www.linkedin.com/in/swastik-dutt-150b61280/',
  x: 'https://x.com/SwastikDutt',
}

export const highlights = [
  { k: 'Next', title: 'JPMorgan Chase', sub: 'Incoming Software Development Engineer' },
  { k: 'Won', title: 'Smart India Hackathon 2025', sub: 'Winner out of 68,000+ teams' },
  { k: 'Won', title: 'Google Codeclash 2.0', sub: 'First place with Lerno.ai' },
]

export const projects = [
  {
    name: 'SketchRacer',
    kind: 'Browser game',
    year: '2026',
    img: '/work/sketchracer.jpg',
    desc: 'An open-world driving game that runs in the browser. Draw any track with your finger and race it, or drive real F1 circuits at full scale.',
    engineering:
      'Three.js world with car physics, missions, a stunt park and a radio that writes its own music in the browser. A drawn loop is checked (closes up, no self-crossing, no corner too tight), then built into a real track with checkpoints and lap timing. Multiplayer rooms run on Cloudflare Durable Objects, up to 8 drivers, with a phone as the controller.',
    stack: ['Three.js', 'JavaScript', 'Cloudflare Workers', 'Supabase'],
    live: 'https://www.sketchracer.com',
    code: 'https://github.com/Swastikkkkk/swastikk-drive',
  },
  {
    name: 'PrepNinja',
    kind: 'AI platform',
    year: '2026',
    img: '/work/prepninja.jpg',
    desc: 'Proctored AI mock interviews, coding rounds with a sandboxed code runner, and an ATS resume check, in one place.',
    engineering:
      'Gemini writes role-specific questions. Video answers are transcribed with Deepgram and scored on five axes. Coding problems keep only the test cases that Gemini’s own solution passes in a Judge0 sandbox. A per-topic skill score drives a weekly study plan, benchmarked against BKT and DKT on ASSISTments.',
    stack: ['React', 'Node', 'Gemini', 'Deepgram', 'Judge0'],
    live: 'https://prepninja-tawny.vercel.app',
    code: 'https://github.com/Swastikkkkk/PrepNinja',
  },
  {
    name: 'ChatSnitch',
    kind: 'Chrome extension',
    year: '2026',
    img: '/work/chatsnitch.jpg',
    desc: 'Shows which of your Chrome extensions can read your ChatGPT, Claude and Gemini chats. One permission, no network access.',
    engineering:
      'A Manifest V3 extension with a single permission. It reads every installed extension’s host permissions and permission warnings, which catch content-script access the API leaves out, then ranks how risky each one is for AI chat sites. Nothing ever leaves the browser.',
    stack: ['Manifest V3', 'JavaScript', 'Node test runner'],
    live: 'https://chatsnitch.vercel.app',
    code: 'https://github.com/Swastikkkkk/chatsnitch',
  },
  {
    name: 'JalNetra',
    kind: 'Disaster response',
    year: '2026',
    img: '/work/jalnetra.jpg',
    desc: 'Flood early warning for Indian rivers. Predicts which villages the water reaches and calls the village head in Hindi, after a person approves.',
    engineering:
      'EventBridge runs a Lambda every 3 hours that checks 681 river points against GloFAS forecasts. When a river rises it works out which of 291 villages are hit and when. Bedrock drafts the advisory, a human approves it, and a Hindi voice call goes out. RDS keeps the call ledger; CloudFront and WAF sit in front.',
    stack: ['AWS Lambda', 'Bedrock', 'RDS', 'React', 'TypeScript'],
    live: 'https://d1oi8xa605dsj6.cloudfront.net',
    code: 'https://github.com/Swastikkkkk/jalnetra',
  },
  {
    name: 'Lerno.ai',
    kind: 'Ed-tech',
    year: '2025',
    award: 'First place, Google Codeclash 2.0',
    img: '/work/lerno.jpg',
    desc: 'Type a concept and get a short animated explainer back, with a chat tutor next to the video for follow-up questions.',
    engineering:
      'Claude plans the lesson as a storyboard, then writes narration and a deliberately simple Manim scene for each frame so it renders reliably. FastAPI renders the scenes to video and uploads them to Firebase Storage. Gemini powers the side chat.',
    stack: ['React', 'FastAPI', 'Claude', 'Manim', 'Firebase'],
    live: 'https://lerno-peach.vercel.app',
    code: 'https://github.com/Swastikkkkk/lerno',
  },
  {
    name: 'District Mesh',
    kind: 'iOS',
    year: '2026',
    art: 'mesh',
    desc: 'Offline mesh for iPhone. Messages, live location, SOS and voice or video calls hop from phone to phone with no internet and no server.',
    engineering:
      'Phones find each other over Bluetooth and peer-to-peer Wi-Fi with MultipeerConnectivity. Every packet carries a TTL and is re-broadcast to neighbours, with a seen-packet cache to drop loops, so messages reach people far outside the sender’s range. Messages sent with nobody nearby are stored and forwarded when a peer shows up.',
    stack: ['Swift', 'SwiftUI', 'MultipeerConnectivity', 'Live Activities'],
    code: 'https://github.com/Swastikkkkk/District_Mesh',
  },
]

export const more = [
  { name: 'AmExpert', desc: 'Card-servicing AI agent over voice, WhatsApp, SMS and email.', href: 'https://github.com/Swastikkkkk/amexpert' },
  { name: 'agentdrift', desc: 'Merges clashing AGENTS.md, CLAUDE.md and .cursorrules into one.', href: 'https://agentdrift.vercel.app' },
  { name: 'DisasterAR', desc: 'Offline AR evacuation that routes around hazards.', href: 'https://github.com/Swastikkkkk/disasterevac' },
  { name: 'brag-ext', desc: 'Turns any GitHub repo into a short promo video.', href: 'https://github.com/Swastikkkkk/brag-ext' },
]

export const experience = [
  { org: 'JPMorgan Chase', role: 'Software Development Engineer', when: 'Incoming', note: 'Joining full time after graduation.' },
  { org: 'JPMorgan Chase', role: 'Software Development Intern, iOS Payments', when: '2026', note: 'Moved Storyboard and UIKit payment flows in the Chase app to SwiftUI with MVVM.' },
  { org: 'KPMG', role: 'Academic Intern, Housing Ministry analytics', when: '2025', note: 'React dashboard and Node pipelines that cut manual reporting by over 40%.' },
  { org: 'NetNivaran', role: 'Web Development Intern', when: '2024', note: 'Mobile-first rebuild with 60% faster load times.' },
]

export const wins = [
  { what: 'Smart India Hackathon 2025', result: 'Winner', note: '68,000+ teams' },
  { what: 'Google Codeclash 2.0', result: 'First place', note: 'With Lerno.ai, 1,000+ teams' },
  { what: 'ZS Campus Beats 2026', result: 'Second runner-up', note: 'AI Builders track' },
  { what: 'IIC 2.0', result: 'Runner-up', note: 'National hackathon' },
]
