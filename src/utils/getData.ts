import { Active, Over } from "@dnd-kit/core";

export function getData(prop: Active | Over | null) {
  return prop?.data?.current ?? {};
}
