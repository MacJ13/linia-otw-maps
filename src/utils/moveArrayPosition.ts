// export function changeArrayPosition<T>(
//   index: number,
//   oldIndex: number,
//   arr: T[]
// ) {
//   const startId = arr[index];

//   const startArr = arr.slice(0, index);
//   const endArr = arr.slice(index + 1);

//   const restOfArr = [...startArr, ...endArr];

//   restOfArr.splice(oldIndex, 0, startId);

//   return restOfArr;
// }

import { arrayMove } from "@dnd-kit/sortable";

export function moveArrayPosition<T>(
  arr: T[],
  fromIndex: number,
  toIndex: number
) {
  return arrayMove(arr, fromIndex, toIndex);
}
