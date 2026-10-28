export type JourneyStage = 'Physiotherapy' | 'Rehabilitation' | 'Functional Training' | 'Performance';

export type Service = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  duration: string;
  price: string;
  professional: string;
  professionalRole: string;
  includes: string[];
  forWhom: string;
};

export type Appointment = {
  id: string;
  serviceId: string;
  serviceName: string;
  professional: string;
  date: string;
  dateLabel: string;
  time: string;
  status: 'Confirmed' | 'Cancelled';
};

export type Activity = {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
};

export type CheckIn = {
  id: string;
  date: string;
  pain: number;
  mobility: number;
  strength: number;
  note: string;
};

export type CarePlanUpdate = {
  id: string;
  date: string;
  author: string;
  summary: string;
  isDemo?: boolean;
};

export type DemoState = {
  hasEntered: boolean;
  appointments: Appointment[];
  activities: Activity[];
  checkIns: CheckIn[];
  carePlan: {
    goal: string;
    currentStage: JourneyStage;
    physioRecommendation: string;
    trainerRecommendation: string;
    restrictions: string;
    nextMilestone: string;
    programmeCompletion: number;
    updates: CarePlanUpdate[];
    demoUpdateApplied: boolean;
  };
};

export const services: Service[] = [
  {
    id: 'physiotherapy', name: 'Physiotherapy', eyebrow: 'Assess & recover', duration: '50 min', price: 'From ₹1,500',
    description: 'Evidence-led assessment and treatment for pain, injury and movement limitations.',
    professional: 'Dr. Maya Rao', professionalRole: 'Lead physiotherapist',
    includes: ['Movement and pain assessment', 'Hands-on treatment where appropriate', 'A clear recovery plan'],
    forWhom: 'For recent injuries, persistent pain, post-surgery recovery and movement concerns.',
  },
  {
    id: 'rehabilitation', name: 'Rehabilitation', eyebrow: 'Rebuild capacity', duration: '45 min', price: 'Packages available',
    description: 'Progressive, supervised loading to rebuild movement quality, capacity and confidence.',
    professional: 'Dr. Maya Rao', professionalRole: 'Lead physiotherapist',
    includes: ['Guided exercise progression', 'Pain and mobility tracking', 'Readiness reviews'],
    forWhom: 'For clients moving from symptom control toward normal daily or sporting activity.',
  },
  {
    id: 'functional-training', name: 'Functional Training', eyebrow: 'Return to movement', duration: '55 min', price: 'From ₹1,200',
    description: 'Coach-led strength and movement sessions based on your clinical handover.',
    professional: 'Kabir Singh', professionalRole: 'Rehabilitation trainer',
    includes: ['Individual movement plan', 'Strength foundations', 'Physio-informed restrictions'],
    forWhom: 'For clients cleared to rebuild practical strength and return-to-sport foundations.',
  },
  {
    id: 'personal-training', name: 'Personal Training', eyebrow: 'Build strength', duration: '60 min', price: 'Membership add-on',
    description: 'One-to-one coaching for strength, conditioning and lasting performance habits.',
    professional: 'Kabir Singh', professionalRole: 'Performance trainer',
    includes: ['Tailored programming', 'Technique coaching', 'Progress reviews'],
    forWhom: 'For clients seeking focused coaching and an individual performance programme.',
  },
  {
    id: 'group-training', name: 'Group Training', eyebrow: 'Train together', duration: '50 min', price: 'Included in select plans',
    description: 'Small, coached sessions that balance challenge, movement quality and community.',
    professional: 'Nisha Verma', professionalRole: 'Strength coach',
    includes: ['Small groups', 'Scalable exercises', 'Coach feedback'],
    forWhom: 'For active clients who enjoy coached sessions in a supportive group.',
  },
  {
    id: 'assessments', name: 'Assessments', eyebrow: 'Know your baseline', duration: '40 min', price: 'From ₹950',
    description: 'Focused mobility, running or strength assessments with practical next steps.',
    professional: 'Revolve Care Team', professionalRole: 'Integrated assessment',
    includes: ['Baseline measures', 'Movement screening', 'Written recommendations'],
    forWhom: 'For anyone who wants clarity before beginning a training or recovery plan.',
  },
];

export const initialDemoState: DemoState = {
  hasEntered: false,
  appointments: [{
    id: 'appt-1', serviceId: 'rehabilitation', serviceName: 'Rehabilitation session',
    professional: 'Dr. Maya Rao', date: '2026-10-29', dateLabel: 'Thu, 29 Oct', time: '10:30 AM', status: 'Confirmed',
  }],
  activities: [
    { id: 'activity-1', title: 'Controlled step-downs', detail: '3 sets × 8 reps · today', completed: false },
    { id: 'activity-2', title: 'Knee mobility routine', detail: '10 minutes · today', completed: true },
    { id: 'activity-3', title: 'Easy paced walk', detail: '30 minutes · tomorrow', completed: false },
  ],
  checkIns: [
    { id: 'check-1', date: '20 Oct', pain: 3, mobility: 76, strength: 62, note: 'Stairs felt easier.' },
    { id: 'check-2', date: '13 Oct', pain: 4, mobility: 70, strength: 55, note: 'Some stiffness after walking.' },
  ],
  carePlan: {
    goal: 'Return to running', currentStage: 'Rehabilitation',
    physioRecommendation: 'Improve knee stability and continue controlled loading.',
    trainerRecommendation: 'Begin controlled lower-body strength training after clearance.',
    restrictions: 'Avoid running for 2 weeks. Keep impact work paused until review.',
    nextMilestone: 'Pain-free 5 km walk', programmeCompletion: 72,
    demoUpdateApplied: false,
    updates: [
      { id: 'update-1', date: '20 Oct 2026', author: 'Dr. Maya Rao · Physiotherapist', summary: 'Mobility improved. Continue controlled loading and review after two pain-stable sessions.' },
      { id: 'update-2', date: '12 Oct 2026', author: 'Kabir Singh · Trainer', summary: 'Strength work adjusted to maintain control through the full range.' },
    ],
  },
};

export const journeyStages: JourneyStage[] = ['Physiotherapy', 'Rehabilitation', 'Functional Training', 'Performance'];
