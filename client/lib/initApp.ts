import { useUserStore } from "@/store/useUserStore";
import axiosInit from "./axiosInit";
import axios from "axios";
import { useProjectStore } from "@/store/useProjectStore";

const initApp = async () => {
  axiosInit();

  const token = localStorage.getItem("access_token");
  if (!token) return;

  try {
    const { user } = (await axios.get("/api/auth/me")).data;
    useUserStore.getState().setUser(user);
    useProjectStore.getState().setSelectedProject(user?.projects[0]);
  } catch (err) {
    console.error("initApp error", err);
  }
};

export default initApp;
