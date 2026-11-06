export const links = {
  email: 'swastikdutt@gmail.com',
  github: 'https://github.com/Swastikkkkk',
  linkedin: 'https://www.linkedin.com/in/swastik-dutt-150b61280/',
  x: 'https://x.com/SwastikDutt',
}

// Add `img: '/moments/xyz.jpg'` to any stat to show a photo behind it.
export const stats = [
  { value: 13, label: 'Hackathon wins', sub: 'SIH 2025, Google CodeClash 2.0, ZS Campus Beats' },
  { value: 6, label: 'Products live', sub: 'iOS, web, AI and a Chrome extension' },
  { value: 3, label: 'Internships', sub: 'JPMorgan Chase, KPMG, NetNivaran' },
  { value: 9.24, decimals: 2, label: 'CGPA', sub: 'CS at Manipal University Jaipur' },
]

export const projects = [
  {
    name: 'NoBars',
    kind: 'iOS',
    year: '2026',
    built: { label: 'Zomato × Eternal Hackathon', note: 'Started at the hackathon, kept building after' },
    motif: 'mesh',
    img: '/work/nobars.jpg',
    desc: 'Offline mesh for iPhone. Messages, live location, SOS and voice or video calls hop from phone to phone with no internet and no server.',
    engineering:
      'Phones find each other over Bluetooth and peer-to-peer Wi-Fi with MultipeerConnectivity. Every packet carries a TTL and is re-broadcast to neighbours, with a seen-packet cache to drop loops, so messages reach people far outside the sender’s range. Messages sent with nobody nearby are stored and forwarded when a peer shows up.',
    stack: ['Swift', 'SwiftUI', 'MultipeerConnectivity', 'Live Activities'],
    live: 'https://swastikkkkk.github.io/NoBars/',
    code: 'https://github.com/Swastikkkkk/NoBars',
  },
  {
    name: 'ExplAInr',
    kind: 'Ed-tech',
    year: '2025',
    built: { label: 'CodeClash 2.0 at Google Office, Gurugram', note: 'First place, 1,000+ teams', href: 'https://unstop.com/hackathons/codeclash-20-guru-gobind-singh-indraprastha-university-ggsipu-delhi-1492599' },
    motif: 'wave',
    img: '/work/lerno.jpg',
    desc: 'Type a concept and get a short animated explainer back, with a chat tutor next to the video for follow-up questions.',
    engineering:
      'An LLM plans the lesson as a storyboard, then writes narration and a deliberately simple Manim scene for each frame so it renders reliably. It runs on a free, keyless model by default, so no paid API is needed. FastAPI renders the scenes to video and uploads them to Firebase Storage.',
    stack: ['React', 'FastAPI', 'Manim', 'Pollinations', 'Firebase'],
    live: 'https://lerno-peach.vercel.app',
    code: 'https://github.com/Swastikkkkk/lerno',
  },
  {
    name: 'PrepNinja',
    kind: 'AI platform',
    year: '2026',
    built: { label: 'IIC 2.0 National Hackathon' },
    motif: 'score',
    img: '/work/prepninja.jpg',
    desc: 'Proctored AI mock interviews, coding rounds with a sandboxed code runner, and an ATS resume check, in one place.',
    engineering:
      'NVIDIA Nemotron writes role-specific questions, transcribes video answers and scores them on five axes. Coding problems keep only the test cases that the model’s own solution passes in a Judge0 sandbox. A per-topic skill score drives a weekly study plan, benchmarked against BKT and DKT on ASSISTments.',
    stack: ['React', 'Node', 'NVIDIA Nemotron', 'Judge0'],
    live: 'https://prepninja-tawny.vercel.app',
    code: 'https://github.com/Swastikkkkk/PrepNinja',
  },
  {
    name: 'SketchRacer',
    kind: 'Browser game',
    year: '2026',
    built: { label: 'Side project', note: 'Raced daily with friends' },
    motif: 'track',
    img: '/work/sketchracer.jpg',
    desc: 'An open-world driving game that runs in the browser. Draw any track with your finger and race it, or drive real F1 circuits at full scale.',
    engineering:
      'Three.js world with car physics, missions, a stunt park and a radio that writes its own music in the browser. A drawn loop is checked (closes up, no self-crossing, no corner too tight), then built into a real track with checkpoints and lap timing. Multiplayer rooms run on Cloudflare Durable Objects, up to 8 drivers, with a phone as the controller.',
    stack: ['Three.js', 'JavaScript', 'Cloudflare Workers', 'Supabase'],
    live: 'https://www.sketchracer.com',
    code: 'https://github.com/Swastikkkkk/swastikk-drive',
  },
  {
    name: 'JalNetra',
    kind: 'Disaster response',
    year: '2026',
    built: { label: 'Environmental Hacks by WeMakeDevs × AWS', href: 'https://www.wemakedevs.org/aws/env' },
    motif: 'river',
    img: '/work/jalnetra.jpg',
    desc: 'Flood early warning for Indian rivers. Predicts which villages the water reaches and calls the village head in Hindi, after a person approves.',
    engineering:
      'EventBridge runs a Lambda every 3 hours that checks 681 river points against GloFAS forecasts. When a river rises it works out which of 291 villages are hit and when. Bedrock drafts the advisory, a human approves it, and a Hindi voice call goes out. RDS keeps the call ledger; CloudFront and WAF sit in front.',
    stack: ['AWS Lambda', 'Bedrock', 'RDS', 'React', 'TypeScript'],
    live: 'https://jalnetra-lilac.vercel.app',
    code: 'https://github.com/Swastikkkkk/jalnetra',
  },
  {
    name: 'ChatSnitch',
    kind: 'Chrome extension',
    year: '2026',
    built: { label: 'Build-in-public series' },
    motif: 'scan',
    img: '/work/chatsnitch.jpg',
    desc: 'Shows which of your Chrome extensions can read your ChatGPT, Claude and Gemini chats. One permission, no network access.',
    engineering:
      'A Manifest V3 extension with a single permission. It reads every installed extension’s host permissions and permission warnings, which catch content-script access the API leaves out, then ranks how risky each one is for AI chat sites. Nothing ever leaves the browser.',
    stack: ['Manifest V3', 'JavaScript', 'Node test runner'],
    live: 'https://chatsnitch.vercel.app',
    code: 'https://github.com/Swastikkkkk/chatsnitch',
  },
]

export const more = [
  { name: 'DisasterAR', desc: 'Offline AR evacuation that routes around hazards.', href: 'https://github.com/Swastikkkkk/disasterevac' },
  { name: 'Guardian', desc: 'Safe-route engine that scores streets from map, weather and camera data.', href: 'https://github.com/Swastikkkkk/guardian-backend' },
]

export const journey = [  { year: '2023–2027', title: 'Manipal University Jaipur', detail: 'Computer Science · B.Tech · CGPA 9+', type: 'university' },
  { year: 'Summer 2024', title: 'NetNivaran', detail: 'Web Development Intern', type: 'work' },
  { year: 'Summer 2025', title: 'KPMG', detail: 'Academic Intern · Analytics', type: 'work' },
  { year: 'Summer 2026', title: 'JPMorgan Chase', detail: 'Software Development Intern · iOS Payments', type: 'work' },
  { year: 'Jan 2027', title: 'JPMorgan Chase', detail: 'Incoming Software Development Engineer', type: 'future' },
]
export const experience = [
  { org: 'JPMorgan Chase', role: 'Software Development Engineer', when: 'Incoming', note: 'Joining full time after graduation.' },
  { org: 'JPMorgan Chase', role: 'Software Development Intern, iOS Payments', when: '2026', note: 'Moved Storyboard and UIKit payment flows in the Chase app to SwiftUI with MVVM.' },
  { org: 'KPMG', role: 'Academic Intern, Housing Ministry analytics', when: '2025', note: 'React dashboard and Node pipelines that cut manual reporting by over 40%.' },
  { org: 'NetNivaran', role: 'Web Development Intern', when: '2024', note: 'Mobile-first rebuild with 60% faster load times.' },
]

export const winsCount = 13

export const wins = [
  {
    year: '2025',
    what: 'Smart India Hackathon',
    built: 'WaveWatch',
    note: 'A live civic hazard map for citizens and city teams. Came out on top of 68,000+ teams nationwide.',
  },
  {
    year: '2025',
    what: 'Google Codeclash 2.0',
    built: 'ExplAInr',
    note: 'Turns any concept into a narrated, animated lesson. First place at Google Gurugram, ahead of 1,000+ teams.',
  },
  {
    year: '2026',
    what: 'ZS Campus Beats',
    built: 'AI Builders track',
    note: 'Second runner-up, one of three podium spots.',
  },
  {
    year: '2025',
    what: 'IIC 2.0',
    built: 'InternSetu',
    note: 'Matching students to internships. Runner-up at the national round.',
  },
]
