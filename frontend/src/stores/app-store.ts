'use client';

import { create } from 'zustand';
import type { Task, Need, Volunteer, Report, KanbanColumn } from '@/types';
import { mockKanbanColumns, mockNeeds, mockVolunteers, mockReports } from '@/lib/mock-data';

interface AppState {
  // Dashboard
  kanbanColumns: KanbanColumn[];
  needs: Need[];
  selectedNeed: Need | null;
  mapView: 'heatmap' | 'clusters' | 'points';

  // Volunteer
  tasks: Task[];
  activeTask: Task | null;
  volunteerView: 'feed' | 'active' | 'history';

  // Admin
  reports: Report[];
  selectedReport: Report | null;

  // Global
  sidebarOpen: boolean;
  loading: boolean;

  // Actions
  setKanbanColumns: (cols: KanbanColumn[]) => void;
  moveTask: (taskId: string, fromCol: string, toCol: string) => void;
  setSelectedNeed: (need: Need | null) => void;
  setMapView: (view: 'heatmap' | 'clusters' | 'points') => void;
  setActiveTask: (task: Task | null) => void;
  setVolunteerView: (view: 'feed' | 'active' | 'history') => void;
  acceptTask: (taskId: string) => void;
  declineTask: (taskId: string) => void;
  toggleChecklist: (taskId: string, itemId: string) => void;
  setSelectedReport: (report: Report | null) => void;
  approveReport: (reportId: string) => void;
  rejectReport: (reportId: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  kanbanColumns: mockKanbanColumns,
  needs: mockNeeds,
  selectedNeed: null,
  mapView: 'heatmap',

  tasks: mockKanbanColumns.flatMap(c => c.tasks),
  activeTask: mockKanbanColumns.find(c => c.id === 'in_progress')?.tasks[0] || null,
  volunteerView: 'feed',

  reports: mockReports,
  selectedReport: mockReports[0],

  sidebarOpen: true,
  loading: false,

  setKanbanColumns: (cols) => set({ kanbanColumns: cols }),

  moveTask: (taskId, fromCol, toCol) => {
    const { kanbanColumns } = get();
    const from = kanbanColumns.find(c => c.id === fromCol);
    const to = kanbanColumns.find(c => c.id === toCol);
    if (!from || !to) return;

    const task = from.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newTask = { ...task, status: toCol as Task['status'] };

    set({
      kanbanColumns: kanbanColumns.map(col => {
        if (col.id === fromCol) return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
        if (col.id === toCol) return { ...col, tasks: [...col.tasks, newTask] };
        return col;
      }),
    });
  },

  setSelectedNeed: (need) => set({ selectedNeed: need }),
  setMapView: (view) => set({ mapView: view }),

  setActiveTask: (task) => set({ activeTask: task }),
  setVolunteerView: (view) => set({ volunteerView: view }),

  acceptTask: (taskId) => {
    const { tasks } = get();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      set({ activeTask: { ...task, status: 'in_progress' }, volunteerView: 'active' });
    }
  },

  declineTask: (taskId) => {
    set(state => ({ tasks: state.tasks.filter(t => t.id !== taskId) }));
  },

  toggleChecklist: (taskId, itemId) => {
    set(state => {
      const task = state.activeTask;
      if (!task || task.id !== taskId) return state;
      return {
        activeTask: {
          ...task,
          checklist: task.checklist.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        },
      };
    });
  },

  setSelectedReport: (report) => set({ selectedReport: report }),

  approveReport: (reportId) => {
    set(state => ({
      reports: state.reports.map(r =>
        r.id === reportId ? { ...r, status: 'approved', reviewedBy: 'Admin' } : r
      ),
    }));
  },

  rejectReport: (reportId) => {
    set(state => ({
      reports: state.reports.map(r =>
        r.id === reportId ? { ...r, status: 'rejected', reviewedBy: 'Admin' } : r
      ),
    }));
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
