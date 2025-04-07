import { Project } from "@/components/vertical-sidebar";
import { create } from "zustand";

interface IProjectStore {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
}

export const useProjectStore = create<IProjectStore>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));
