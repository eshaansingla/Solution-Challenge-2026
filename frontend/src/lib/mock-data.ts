import type { Need, Task, Volunteer, Report, AnalyticsDataPoint, KanbanColumn } from '@/types';

export const mockNeeds: Need[] = [
  {
    id: 'n1',
    category: 'food',
    description: 'Severe food shortage in refugee settlement camp. Over 200 families without rations for 3+ days.',
    urgency: 'critical',
    urgencyScore: 94,
    affectedCount: 847,
    location: { id: 'l1', name: 'Sector 7 Camp', lat: 28.6139, lng: 77.2090, area: 'North Delhi', district: 'Delhi' },
    reportedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    reportedBy: 'Field Officer Priya S.',
    status: 'open',
    tags: ['urgent', 'children', 'elderly'],
  },
  {
    id: 'n2',
    category: 'medical',
    description: 'Dengue outbreak. 45 confirmed cases, medical supplies depleted at local clinic.',
    urgency: 'critical',
    urgencyScore: 91,
    affectedCount: 312,
    location: { id: 'l2', name: 'Raghubir Nagar', lat: 28.6692, lng: 77.1222, area: 'West Delhi', district: 'Delhi' },
    reportedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    reportedBy: 'Dr. Amit Kumar',
    status: 'assigned',
    tags: ['outbreak', 'medical supplies'],
  },
  {
    id: 'n3',
    category: 'shelter',
    description: 'Flash flood displaced 30 families. Temporary shelter needed urgently.',
    urgency: 'high',
    urgencyScore: 76,
    affectedCount: 142,
    location: { id: 'l3', name: 'Yamuna Floodplain', lat: 28.5921, lng: 77.2540, area: 'East Delhi', district: 'Delhi' },
    reportedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    reportedBy: 'Relief Coord. Team B',
    status: 'in_progress',
    tags: ['flood', 'displacement'],
  },
  {
    id: 'n4',
    category: 'water',
    description: 'Water contamination detected in 3 borewells. 500+ households affected.',
    urgency: 'high',
    urgencyScore: 72,
    affectedCount: 2100,
    location: { id: 'l4', name: 'Mustafabad', lat: 28.7041, lng: 77.2733, area: 'Northeast Delhi', district: 'Delhi' },
    reportedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    reportedBy: 'Municipal Inspector',
    status: 'open',
    tags: ['contamination', 'water safety'],
  },
  {
    id: 'n5',
    category: 'education',
    description: 'School serving 400 children operating without teachers for 2 weeks due to illness.',
    urgency: 'medium',
    urgencyScore: 54,
    affectedCount: 400,
    location: { id: 'l5', name: 'Trilokpuri Block 20', lat: 28.6130, lng: 77.3100, area: 'East Delhi', district: 'Delhi' },
    reportedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    reportedBy: 'School Principal',
    status: 'open',
    tags: ['education', 'children'],
  },
  {
    id: 'n6',
    category: 'mental_health',
    description: 'Post-disaster trauma counseling required for flood-affected families.',
    urgency: 'medium',
    urgencyScore: 48,
    affectedCount: 89,
    location: { id: 'l3', name: 'Yamuna Floodplain', lat: 28.5921, lng: 77.2540, area: 'East Delhi', district: 'Delhi' },
    reportedAt: new Date(Date.now() - 36 * 3600000).toISOString(),
    reportedBy: 'NGO Coordinator',
    status: 'open',
    tags: ['mental health', 'counseling'],
  },
];

export const mockVolunteers: Volunteer[] = [
  {
    id: 'v1',
    name: 'Riya Sharma',
    avatar: undefined,
    skills: ['medical', 'counseling'],
    location: { id: 'l1', name: 'Karol Bagh', lat: 28.6519, lng: 77.1909, area: 'Central Delhi', district: 'Delhi' },
    rating: 4.9,
    completedTasks: 47,
    availability: [{ start: '09:00', end: '18:00' }],
    matchScore: 96,
    status: 'available',
  },
  {
    id: 'v2',
    name: 'Arjun Mehta',
    avatar: undefined,
    skills: ['logistics', 'driving', 'construction'],
    location: { id: 'l2', name: 'Dwarka', lat: 28.5921, lng: 77.0460, area: 'West Delhi', district: 'Delhi' },
    rating: 4.7,
    completedTasks: 23,
    availability: [{ start: '08:00', end: '20:00' }],
    matchScore: 88,
    status: 'available',
  },
  {
    id: 'v3',
    name: 'Neha Patel',
    avatar: undefined,
    skills: ['teaching', 'translation', 'counseling'],
    location: { id: 'l5', name: 'Laxmi Nagar', lat: 28.6275, lng: 77.2780, area: 'East Delhi', district: 'Delhi' },
    rating: 4.8,
    completedTasks: 31,
    availability: [{ start: '10:00', end: '16:00' }],
    matchScore: 82,
    status: 'busy',
  },
  {
    id: 'v4',
    name: 'Karan Singh',
    avatar: undefined,
    skills: ['cooking', 'logistics'],
    location: { id: 'l4', name: 'Rohini', lat: 28.7450, lng: 77.0773, area: 'North Delhi', district: 'Delhi' },
    rating: 4.5,
    completedTasks: 15,
    availability: [{ start: '06:00', end: '14:00' }],
    matchScore: 74,
    status: 'available',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    needId: 'n1',
    title: 'Emergency Food Distribution — Sector 7',
    description: 'Coordinate and execute food distribution for 847 affected individuals across Sector 7 Camp.',
    status: 'open',
    urgency: 'critical',
    requiredSkills: ['logistics', 'cooking', 'driving'],
    location: mockNeeds[0].location,
    timeWindow: { start: '2026-04-14T08:00:00', end: '2026-04-14T14:00:00' },
    estimatedDuration: 360,
    checklist: [
      { id: 'c1', label: 'Confirm food supply quantity at depot', completed: false },
      { id: 'c2', label: 'Coordinate with 3 distribution points', completed: false },
      { id: 'c3', label: 'Register beneficiaries at entry', completed: false },
      { id: 'c4', label: 'Document distribution completion', completed: false },
    ],
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600000).toISOString(),
  },
  {
    id: 't2',
    needId: 'n2',
    title: 'Medical Supply Deployment — Raghubir Nagar',
    description: 'Deliver and administer dengue treatment supplies. Setup testing camp.',
    status: 'assigned',
    urgency: 'critical',
    requiredSkills: ['medical', 'logistics'],
    assignedVolunteer: mockVolunteers[0],
    location: mockNeeds[1].location,
    timeWindow: { start: '2026-04-13T09:00:00', end: '2026-04-13T17:00:00' },
    estimatedDuration: 480,
    checklist: [
      { id: 'c5', label: 'Collect supplies from central warehouse', completed: true },
      { id: 'c6', label: 'Setup testing station', completed: true },
      { id: 'c7', label: 'Register and test all 312 individuals', completed: false },
      { id: 'c8', label: 'Distribute medication per protocol', completed: false },
      { id: 'c9', label: 'File incident report', completed: false },
    ],
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: 't3',
    needId: 'n3',
    title: 'Temporary Shelter Setup — Flood Zone',
    description: 'Erect temporary shelters for 30 displaced families.',
    status: 'in_progress',
    urgency: 'high',
    requiredSkills: ['construction', 'logistics'],
    assignedVolunteer: mockVolunteers[1],
    location: mockNeeds[2].location,
    timeWindow: { start: '2026-04-13T07:00:00', end: '2026-04-13T19:00:00' },
    estimatedDuration: 720,
    checklist: [
      { id: 'c10', label: 'Site assessment completed', completed: true },
      { id: 'c11', label: 'Materials delivered on site', completed: true },
      { id: 'c12', label: 'Frame structures erected (15/30)', completed: false },
      { id: 'c13', label: 'Tarpaulins installed', completed: false },
      { id: 'c14', label: 'Families relocated', completed: false },
    ],
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 't4',
    needId: 'n4',
    title: 'Water Quality Testing — Mustafabad',
    description: 'Test all 3 contaminated borewells and distribute water purification tablets.',
    status: 'open',
    urgency: 'high',
    requiredSkills: ['medical', 'logistics'],
    location: mockNeeds[3].location,
    timeWindow: { start: '2026-04-14T07:00:00', end: '2026-04-14T15:00:00' },
    estimatedDuration: 480,
    checklist: [
      { id: 'c15', label: 'Collect water samples from 3 sites', completed: false },
      { id: 'c16', label: 'On-site rapid testing', completed: false },
      { id: 'c17', label: 'Distribute purification tablets', completed: false },
      { id: 'c18', label: 'Advisory notices posted in area', completed: false },
    ],
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
  },
  {
    id: 't5',
    needId: 'n5',
    title: 'Emergency Teaching — Trilokpuri Block 20',
    description: 'Volunteer teachers needed for classes 6–10.',
    status: 'completed',
    urgency: 'medium',
    requiredSkills: ['teaching'],
    assignedVolunteer: mockVolunteers[2],
    location: mockNeeds[4].location,
    timeWindow: { start: '2026-04-12T09:00:00', end: '2026-04-12T15:00:00' },
    estimatedDuration: 360,
    checklist: [
      { id: 'c19', label: 'Coordinate with school administration', completed: true },
      { id: 'c20', label: 'Prepare lesson materials', completed: true },
      { id: 'c21', label: 'Conduct sessions for 400 students', completed: true },
      { id: 'c22', label: 'File attendance records', completed: true },
    ],
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
];

export const mockKanbanColumns: KanbanColumn[] = [
  { id: 'open', title: 'Open', tasks: mockTasks.filter(t => t.status === 'open'), color: '#4f6ef7' },
  { id: 'assigned', title: 'Assigned', tasks: mockTasks.filter(t => t.status === 'assigned'), color: '#f59e0b' },
  { id: 'in_progress', title: 'In Progress', tasks: mockTasks.filter(t => t.status === 'in_progress'), color: '#7c3aed' },
  { id: 'completed', title: 'Completed', tasks: mockTasks.filter(t => t.status === 'completed'), color: '#10b981' },
];

export const mockAnalytics: AnalyticsDataPoint[] = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  const base = 20 + Math.floor(Math.random() * 30);
  return {
    date: date.toISOString().split('T')[0],
    needs: base,
    resolved: Math.floor(base * (0.5 + Math.random() * 0.4)),
    volunteers: 40 + Math.floor(Math.random() * 30),
    responseTime: 45 + Math.floor(Math.random() * 90),
  };
});

export const mockReports: Report[] = [
  {
    id: 'r1',
    sourceType: 'ocr',
    rawContent: `Date: 12/04/26
Location: Sector 7 Camp, North Delhi
Issue: Food shortage - families without food 3 days
Number affected: approx 850 families
Severity: URGENT - children and elderly at risk
Reported by: Field Officer Priya Sharma`,
    processedData: {
      category: 'food',
      description: 'Food shortage in Sector 7 Camp. Approximately 850 families without food for 3 days.',
      urgency: 'critical',
      affectedCount: 847,
    },
    confidenceScore: 0.91,
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: 'r2',
    sourceType: 'ocr',
    rawContent: `Field Report - 13 Apr 2026
Area: Mustafabad NE Delhi
Problem: Water borewell contamination - 3 sources
People: 500 households = 2000+ people
Type: waterborne illness risk
Action needed: Testing + distribution ORS`,
    processedData: {
      category: 'water',
      description: 'Water borewell contamination in Mustafabad. 500+ households at risk.',
      urgency: 'high',
      affectedCount: 2100,
    },
    confidenceScore: 0.87,
    status: 'approved',
    createdAt: new Date(Date.now() - 13 * 3600000).toISOString(),
    reviewedBy: 'Admin Rahul K.',
  },
  {
    id: 'r3',
    sourceType: 'ocr',
    rawContent: `Report from: Yamuna Flood Zone
Date: 13-04-2026
Families displaced: 30 family (approx 142 persns)
Need: Shelter temporry / tarpaulns / blankets
Medical: minor injuries treatd
Status: Urgnt`,
    processedData: {
      category: 'shelter',
      description: 'Flood displacement requiring temporary shelter for 30 families.',
      urgency: 'high',
      affectedCount: 142,
    },
    confidenceScore: 0.74,
    status: 'pending',
    createdAt: new Date(Date.now() - 9 * 3600000).toISOString(),
  },
];
