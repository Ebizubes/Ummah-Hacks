export const siteConfig = {
  eventName: 'UmmahHacks',
  date: 'March 15-16, 2024',
  location: 'Toronto, Canada',
  applicationLink: '#apply',
  discordLink: 'https://discord.gg/ummahhacks',
  email: 'hello@ummahhacks.com',
  socials: {
    twitter: 'https://twitter.com/ummahhacks',
    instagram: 'https://instagram.com/ummahhacks',
    linkedin: 'https://linkedin.com/company/ummahhacks',
  },
  stats: {
    hackers: '100-200',
    duration: '36 hours',
    prizes: 'To be announced soon',
  },
  tracks: [
    {
      id: 'civic-tech',
      name: 'Civic Tech',
      icon: 'Building2',
      description: 'Build solutions that improve civic engagement and government services.',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      icon: 'Heart',
      description: 'Create tools to improve healthcare access and wellness in our communities.',
    },
    {
      id: 'climate',
      name: 'Climate & Environment',
      icon: 'Leaf',
      description: 'Develop innovations to address climate change and environmental challenges.',
    },
    {
      id: 'fintech',
      name: 'FinTech',
      icon: 'Wallet',
      description: 'Build ethical financial solutions that serve underserved communities.',
    },
    {
      id: 'ai-good',
      name: 'AI for Good',
      icon: 'Brain',
      description: 'Leverage AI to solve real-world problems and create positive impact.',
      beginnerFriendly: true,
    },
    {
      id: 'education',
      name: 'Education',
      icon: 'GraduationCap',
      description: 'Create learning tools and platforms that make education more accessible.',
    },
  ],
  schedule: {
    day1: [
      { time: '9:00 AM', event: 'Registration & Breakfast' },
      { time: '10:00 AM', event: 'Opening Ceremony & Keynote' },
      { time: '11:00 AM', event: 'Hacking Begins!' },
      { time: '12:30 PM', event: 'Dhuhr Prayer Break' },
      { time: '1:00 PM', event: 'Lunch' },
      { time: '2:00 PM', event: 'Workshop: Building with AI' },
      { time: '4:00 PM', event: 'Workshop: Design Thinking' },
      { time: '6:00 PM', event: 'Asr Prayer Break' },
      { time: '7:00 PM', event: 'Dinner' },
      { time: '8:00 PM', event: 'Mentor Office Hours' },
      { time: '10:00 PM', event: 'Isha Prayer Break' },
      { time: '11:00 PM', event: 'Midnight Snacks' },
    ],
    day2: [
      { time: '12:00 AM', event: 'Late Night Coding' },
      { time: '6:00 AM', event: 'Fajr Prayer Break' },
      { time: '7:00 AM', event: 'Breakfast' },
      { time: '9:00 AM', event: 'Workshop: Pitching Your Idea' },
      { time: '11:00 AM', event: 'Hacking Ends - Submission Deadline' },
      { time: '12:00 PM', event: 'Dhuhr Prayer Break' },
      { time: '1:00 PM', event: 'Lunch & Judging Begins' },
      { time: '3:00 PM', event: 'Finalist Presentations' },
      { time: '5:00 PM', event: 'Asr Prayer Break' },
      { time: '6:00 PM', event: 'Awards Ceremony & Closing' },
      { time: '7:00 PM', event: 'Networking & Dinner' },
    ],
  },
  hackathonTracks: [
    {
      id: 'social-impact',
      title: 'Social Impact',
      purpose: 'Global and local impact, social good, and community development.',
      challenge: 'Develop tech solutions that address real-world issues within the Muslim Ummah, bridging the gap between global needs (refugee aid, disaster relief, justice for suffering countries) and local community challenges (mosque engagement, food insecurity).',
      icon: 'Heart',
    },
    {
      id: 'halal-fintech',
      title: 'Halal FinTech & Ethical Economy',
      purpose: 'Halal finance, ethical investing, and Islam-compliant business tools.',
      challenge: 'Create FinTech solutions that make Islamic finance principles (such as avoidance of Riba, transparency, and ethical investment) more accessible, efficient, and innovative for modern users and businesses.',
      icon: 'Wallet',
    },
    {
      id: 'open-innovation',
      title: 'Open Innovation',
      purpose: undefined,
      challenge: 'Teams must fully conceptualize, design, and create the blueprint and pitch for an innovative solution without writing a single line of code. This emphasizes Design Thinking, User Experience (UX/UI), Market Research, and Business Strategy.',
      icon: 'Lightbulb',
    },
  ],
  faq: [
    {
      question: 'Who can participate?',
      answer: 'UmmahHacks is open to all students and professionals interested in building solutions for community impact. No prior experience required!',
    },
    {
      question: 'What is the team size?',
      answer: 'Teams can have 2-4 members. You can register as a team or find teammates at the event.',
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No, UmmahHacks is completely free to attend. Food, drinks, and swag are all included!',
    },
    {
      question: 'Will food be provided?',
      answer: 'Yes! We provide all meals, snacks, and beverages throughout the event. Dietary accommodations including halal and vegetarian options are available.',
    },
    {
      question: 'Is there a prayer space?',
      answer: 'Yes, we have a dedicated quiet space available for prayers and reflection throughout the event.',
    },
    {
      question: 'What should I bring?',
      answer: 'Bring your laptop, charger, and any other tools you need to code. We\'ll provide the rest!',
    },
    {
      question: 'Do I need to have an idea before the event?',
      answer: 'Not at all! You can come with an idea or brainstorm with your team at the hackathon.',
    },
    {
      question: 'What is the code of conduct?',
      answer: 'UmmahHacks is committed to providing a safe, inclusive, and respectful environment for all participants. Please review our Code of Conduct for details.',
    },
    {
      question: 'Can I work on a project I started before?',
      answer: 'No, all projects must be started during the hackathon. However, you can use libraries, frameworks, and APIs that existed before the event.',
    },
    {
      question: 'How will projects be judged?',
      answer: 'Projects will be evaluated based on innovation, technical execution, impact potential, and presentation quality.',
    },
  ],
  sponsors: [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'InnovateLab', logo: '🔬' },
    { name: 'StartupHub', logo: '🚀' },
    { name: 'CodeForGood', logo: '💻' },
    { name: 'FutureVentures', logo: '🌟' },
  ],
}

