export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export type NeedCategory = 'food' | 'shelter' | 'medical' | 'education' | 'water' | 'sanitation' | 'clothing' | 'mental_health';
export type VolunteerSkill = 'medical' | 'teaching' | 'logistics' | 'counseling' | 'construction' | 'cooking' | 'driving' | 'translation';

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  area: string;
  district: string;
}

export interface Need {
  id: string;
  category: NeedCategory;
  description: string;
  urgency: UrgencyLevel;
  urgencyScore: number;
  affectedCount: number;
  location: Location;
  reportedAt: string;
  reportedBy: string;
  status: TaskStatus;
  tags: string[];
}

export interface Task {
  id: string;
  needId: string;
  title: string;
  description: string;
  status: TaskStatus;
  urgency: UrgencyLevel;
  requiredSkills: VolunteerSkill[];
  assignedVolunteer?: Volunteer;
  location: Location;
  timeWindow: { start: string; end: string };
  estimatedDuration: number;
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface Volunteer {
  id: string;
  name: string;
  avatar?: string;
  skills: VolunteerSkill[];
  location: Location;
  rating: number;
  completedTasks: number;
  availability: { start: string; end: string }[];
  matchScore?: number;
  status: 'available' | 'busy' | 'offline';
}

export interface Report {
  id: string;
  sourceType: 'ocr' | 'form' | 'api' | 'manual';
  rawContent: string;
  processedData: Partial<Need>;
  confidenceScore: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedBy?: string;
}

export interface MetricSnapshot {
  label: string;
  value: number;
  change: number;
  unit?: string;
}

export interface AnalyticsDataPoint {
  date: string;
  needs: number;
  resolved: number;
  volunteers: number;
  responseTime: number;
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
}
