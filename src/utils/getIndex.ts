export function getIndex(index: number | undefined) {
  if (typeof index === "number") {
    return index < 0 ? -1 : index;
  }

  return -1;
}
