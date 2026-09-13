export type FeaturedEvent = {
  title: string;
  slug: string;
  image: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
};

// Showcase events make the landing page feel complete before an organizer has
// created enough events in the database. Each one also has a full detail page.
export const events: FeaturedEvent[] = [
  {
    title: "GitHub Connect Melbourne 2026",
    image: "/images/event-melbourne.jpg",
    slug: "github-connect-melbourne-2026",
    description: "A one-day gathering for developers building the next generation of software with open source and AI.",
    overview: "Meet local builders, hear product updates, and leave with practical ideas for shipping better work. Expect sharp talks, hands-on sessions, and plenty of time to meet your developer community.",
    venue: "The Glasshouse",
    location: "Melbourne, Australia",
    date: "2026-09-03T00:00:00.000Z",
    time: "08:30",
    mode: "In person",
    audience: "Developers, engineering leaders, and open-source maintainers",
    agenda: ["Registration and coffee", "Keynotes from the developer community", "Hands-on AI and automation workshops", "Community social and networking"],
    organizer: "DevEvent Community in partnership with local developer groups.",
    tags: ["Open source", "AI", "Community"],
  },
  {
    title: "GitHub Connect Auckland 2026",
    image: "/images/event2.png",
    slug: "github-connect-auckland-2026",
    description: "A focused developer day for the people turning ambitious ideas into reliable software.",
    overview: "Join the Auckland developer community for useful conversations on collaborative engineering, secure delivery, and AI-assisted workflows. Bring your questions and meet the people building alongside you.",
    venue: "Aotea Centre",
    location: "Auckland, New Zealand",
    date: "2026-09-08T00:00:00.000Z",
    time: "08:30",
    mode: "In person",
    audience: "Software engineers, students, and technology teams",
    agenda: ["Welcome and community breakfast", "Modern collaboration practices", "Developer productivity lightning talks", "Closing mixer"],
    organizer: "DevEvent Community Auckland.",
    tags: ["Engineering", "Productivity", "Networking"],
  },
  {
    title: "GitHub Universe 2026",
    image: "/images/event3.png",
    slug: "github-universe-2026",
    description: "Two high-energy days of ideas, tools, and inspiration for everyone who builds software.",
    overview: "Explore the future of developer experience with global speakers, real-world technical sessions, and a community built around shipping great software together.",
    venue: "Fort Mason Center",
    location: "Fort Mason Center, San Francisco & online",
    date: "2026-10-28T00:00:00.000Z",
    time: "09:00",
    mode: "Hybrid",
    audience: "Developers, maintainers, founders, and engineering teams",
    agenda: ["Opening keynote", "Platform and AI product sessions", "Community-led breakouts", "Expo, demos, and evening social"],
    organizer: "DevEvent Global Community.",
    tags: ["AI", "Dev tools", "Conference"],
  },
  {
    title: "DevFest 2026",
    image: "/images/event4.png",
    slug: "devfest-2026",
    description: "A worldwide celebration of developer communities, new technologies, and shared learning.",
    overview: "Find your local DevFest chapter for practical talks, workshops, and community connections. Every city has its own flavor, united by a love of building useful technology.",
    venue: "Local community venues",
    location: "Developer communities worldwide",
    date: "2026-11-07T00:00:00.000Z",
    time: "10:00",
    mode: "In person & online",
    audience: "Developers of every level and technology enthusiasts",
    agenda: ["Local keynote", "Technical tracks and codelabs", "Community showcase", "Open networking"],
    organizer: "DevEvent Community Network.",
    tags: ["Community", "Workshops", "Google technologies"],
  },
  {
    title: "Hacktoberfest 2026",
    image: "/images/event5.png",
    slug: "hacktoberfest-2026",
    description: "A month-long invitation to contribute, collaborate, and make your first—or next—open-source impact.",
    overview: "Take part from wherever you are. Discover welcoming projects, pair up at local sessions, and celebrate thoughtful contributions to the software the world relies on.",
    venue: "Online and community hubs",
    location: "In person & online worldwide",
    date: "2026-10-01T00:00:00.000Z",
    time: "09:00",
    mode: "Hybrid",
    audience: "First-time contributors, maintainers, and open-source teams",
    agenda: ["Getting started with open source", "Project discovery and mentorship", "Contribution sprint", "Community showcase"],
    organizer: "DevEvent Open Source Community.",
    tags: ["Open source", "Hackathon", "Mentorship"],
  },
  {
    title: "Devcon 8",
    image: "/images/event6.png",
    slug: "devcon-8",
    description: "A vibrant gathering for builders exploring the frontier of decentralized technology.",
    overview: "Connect with researchers, founders, and developers working on the next wave of the open internet. Learn from deep technical talks, discover emerging projects, and meet collaborators.",
    venue: "Jio World Convention Centre",
    location: "Mumbai, India",
    date: "2026-11-03T00:00:00.000Z",
    time: "09:00",
    mode: "In person",
    audience: "Blockchain developers, researchers, founders, and curious builders",
    agenda: ["Protocol research sessions", "Builder workshops", "Project demos", "Community celebration"],
    organizer: "DevEvent Web3 Community.",
    tags: ["Web3", "Research", "Builders"],
  },
];

export const getFeaturedEvent = (slug: string) =>
  events.find((event) => event.slug === slug);
