import type { Node } from "@xyflow/svelte";

export interface FamilyNodeType extends Node {
  data: {
    name: string
    gender: "M" | "F" | "U"
    birthDate?: string
  }
}

export type FamilyNodeDataType = FamilyNodeType["data"]