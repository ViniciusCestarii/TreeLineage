import type { Node } from "@xyflow/svelte";

export const genderArray = [
  {value:"M", label: "Male"},
  {value:"F", label: "Female"},
  {value:"O", label: "Other"}
] as const

export interface FamilyNodeType extends Node {
  data: {
    name: string
    gender: typeof genderArray[number]["value"]
    birthDate?: string
  }
}

export type FamilyNodeDataType = FamilyNodeType["data"]