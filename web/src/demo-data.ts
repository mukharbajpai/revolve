import type { WebDemoState } from './types';

export const initialWebDemo: WebDemoState = {
  clients: [
    {
      id: 'aarav', name: 'Aarav Mehta', initials: 'AM', age: 32, phone: '+91 98765 43210',
      goal: 'Return to running', history: 'Right anterior knee pain following a rapid increase in weekly running volume. Recreational 10 km runner.',
      assessment: 'Reduced right single-leg control, pain 6/10 on stairs at baseline, limited ankle dorsiflexion.',
      stage: 'Rehabilitation', assignedProfessional: 'Dr. Maya Rao', nextAppointment: '29 Oct · 10:30', membership: 'Active', completion: 72,
      pain: 2, mobility: 81, strength: 68,
      physioRecommendation: 'Improve knee stability and continue controlled loading.',
      trainerRecommendation: 'Begin controlled lower-body strength training after clearance.',
      restrictions: 'Avoid running for 2 weeks. Keep impact work paused until review.',
      nextMilestone: 'Pain-free 5 km walk',
      updates: [
        { id: 'u1', date: '20 Oct 2026', author: 'Dr. Maya Rao · Physiotherapist', summary: 'Mobility improved. Continue controlled loading and review after two pain-stable sessions.' },
        { id: 'u2', date: '12 Oct 2026', author: 'Kabir Singh · Trainer', summary: 'Strength work adjusted to maintain control through the full range.' },
      ],
    },
    {
      id: 'zoya', name: 'Zoya Khan', initials: 'ZK', age: 28, phone: '+91 98901 10222', goal: 'Return to tennis',
      history: 'Left ankle sprain eight weeks ago.', assessment: 'Good mobility; lateral confidence remains limited.', stage: 'Functional Training',
      assignedProfessional: 'Kabir Singh', nextAppointment: '29 Oct · 14:00', membership: 'Active', completion: 64, pain: 1, mobility: 88, strength: 71,
      physioRecommendation: 'Progress lateral loading under control.', trainerRecommendation: 'Introduce low-amplitude direction changes.', restrictions: 'Avoid maximal-speed cutting.', nextMilestone: 'Controlled court drill',
      updates: [{ id: 'u3', date: '24 Oct 2026', author: 'Kabir Singh · Trainer', summary: 'Completed first lateral strength session without symptom increase.' }],
    },
    {
      id: 'rohan', name: 'Rohan Iyer', initials: 'RI', age: 41, phone: '+91 98112 20031', goal: 'Move without back pain',
      history: 'Recurring mechanical lower-back pain.', assessment: 'Low load tolerance after prolonged sitting.', stage: 'Physiotherapy',
      assignedProfessional: 'Dr. Maya Rao', nextAppointment: '29 Oct · 16:30', membership: 'Trial', completion: 28, pain: 5, mobility: 56, strength: 48,
      physioRecommendation: 'Restore comfortable spinal movement and walking tolerance.', trainerRecommendation: 'Pending rehabilitation clearance.', restrictions: 'No loaded spinal flexion.', nextMilestone: '30-minute comfortable walk', updates: [],
    },
    {
      id: 'diya', name: 'Diya Nair', initials: 'DN', age: 35, phone: '+91 98451 73420', goal: 'Build resilient strength',
      history: 'Previous shoulder impingement, now resolved.', assessment: 'Cleared for unrestricted progressive training.', stage: 'Performance',
      assignedProfessional: 'Nisha Verma', nextAppointment: '30 Oct · 08:30', membership: 'Active', completion: 91, pain: 0, mobility: 93, strength: 87,
      physioRecommendation: 'No current clinical restrictions.', trainerRecommendation: 'Progress overhead strength and work capacity.', restrictions: 'None.', nextMilestone: 'Strict press bodyweight target', updates: [],
    },
    {
      id: 'vikram', name: 'Vikram Shah', initials: 'VS', age: 58, phone: '+91 99873 29010', goal: 'Return to weekend hikes',
      history: 'Post-operative meniscal repair.', assessment: 'Steady swelling reduction with improving knee range.', stage: 'Rehabilitation',
      assignedProfessional: 'Dr. Leena Bose', nextAppointment: '2 Nov · 11:00', membership: 'Paused', completion: 46, pain: 3, mobility: 69, strength: 53,
      physioRecommendation: 'Continue range and progressive closed-chain loading.', trainerRecommendation: 'Awaiting handover.', restrictions: 'No deep loaded knee flexion.', nextMilestone: 'Climb two flights pain-free', updates: [],
    },
  ],
  appointments: [
    { id: 'a1', clientId: 'aarav', client: 'Aarav Mehta', type: 'Rehabilitation', professional: 'Dr. Maya Rao', date: '2026-10-29', day: 'Thu 29', time: '10:30', duration: 45, status: 'Confirmed' },
    { id: 'a2', clientId: 'zoya', client: 'Zoya Khan', type: 'Functional training', professional: 'Kabir Singh', date: '2026-10-29', day: 'Thu 29', time: '14:00', duration: 55, status: 'Confirmed' },
    { id: 'a3', clientId: 'rohan', client: 'Rohan Iyer', type: 'Physiotherapy', professional: 'Dr. Maya Rao', date: '2026-10-29', day: 'Thu 29', time: '16:30', duration: 50, status: 'Confirmed' },
    { id: 'a4', clientId: 'diya', client: 'Diya Nair', type: 'Performance training', professional: 'Nisha Verma', date: '2026-10-30', day: 'Fri 30', time: '08:30', duration: 60, status: 'Confirmed' },
    { id: 'a5', clientId: 'aarav', client: 'Aarav Mehta', type: 'Progress review', professional: 'Dr. Maya Rao', date: '2026-11-02', day: 'Mon 2', time: '11:30', duration: 30, status: 'Confirmed' },
  ],
  handovers: [
    { id: 'h1', clientId: 'zoya', client: 'Zoya Khan', from: 'Dr. Leena Bose', to: 'Kabir Singh', sentAt: '26 Oct · 16:20', summary: 'Ready to begin controlled lateral strength and low-amplitude change-of-direction work.', restrictions: 'Avoid maximal-speed cutting for two weeks.', status: 'Awaiting acknowledgement' },
    { id: 'h2', clientId: 'diya', client: 'Diya Nair', from: 'Dr. Maya Rao', to: 'Nisha Verma', sentAt: '18 Oct · 12:05', summary: 'Clinical goals complete; continue performance programming.', restrictions: 'None.', status: 'Acknowledged', acknowledgedAt: '18 Oct · 13:40' },
  ],
};
