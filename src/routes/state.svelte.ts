import { type Viewport } from "@xyflow/svelte";

export const viewport = $state<Viewport>({
  x: 0,
  y: 0,
  zoom: 1,
})