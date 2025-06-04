import { sidebarItems } from "@/constants/sidebar.constants";
import { atom } from "jotai";

export const pickedItem = atom<sidebarItems>(sidebarItems.HOME);
