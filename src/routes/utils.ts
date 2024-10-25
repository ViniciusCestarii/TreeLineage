import { browser } from "$app/environment";
import { viewport } from "./state.svelte";
import type { FamilyNodeType } from "./types";

export const generateNodeFamily = (node?: Partial<FamilyNodeType>): FamilyNodeType => {
  console.log(viewport.x, viewport.y)
  return {
    id: Math.random().toString(36).slice(2, 9),
    type: "family",
    data: {
      gender: "M",
      name: "",
    },
    position: {
      x: -viewport.x +90,
      y: -viewport.y +44
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