import { browser } from "$app/environment";
import { viewport } from "./state.svelte";
import type { FamilyNodeType } from "./types";

export const getWindowWidth = () => browser ? window.innerWidth : 0;
export const getWindowHeight = () => browser ? window.innerHeight : 0;

export const generateId = () => Math.random().toString(36).slice(2, 9);

export const generateNodeFamily = (node?: Partial<FamilyNodeType>): FamilyNodeType => {
  const windowWidth = getWindowWidth()
  const windowHeight = getWindowHeight()

  const zoomIndex = 1 / viewport.zoom;
  return {
    id: generateId(),
    type: "family",
    data: {
      gender: "U",
      name: "",
    },
    position: {
      x: -viewport.x * zoomIndex + windowWidth / 2 * zoomIndex - 89,
      y: -viewport.y * zoomIndex + windowHeight / 2 * zoomIndex - 90,
    },
    ...node,
  }
} 

export function saveToLocalStorage(key: string, value: unknown) {
  if (browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  const savedData = browser ? localStorage.getItem(key) : undefined;
  return savedData ? JSON.parse(savedData) : fallback;
}