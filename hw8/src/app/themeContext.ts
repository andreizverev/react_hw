import {createContext} from "react";

export type Themes = "light" | "dark";
export const ThemeContext = createContext<Themes | null>(null);
