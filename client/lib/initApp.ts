import { useUserStore } from "@/store/useUserStore";
import axiosInit from "./axiosInit";
import axios from "axios";

const initApp = async () => {
  axiosInit();

  const token = localStorage.getItem("access_token");
  if (!token) return;

  try {
    const { user } = (await axios.get("/api/auth/me")).data;
    useUserStore.getState().setUser(user);
  } catch (err) {
    console.error("initApp error", err);
  }
};

export default initApp;
