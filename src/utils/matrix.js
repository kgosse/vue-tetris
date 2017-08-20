import {blockType} from '@/consts/matrix';

export function isClear(matrix) {
  const clearLines = [];
  matrix.forEach((m, k) => {
    if (m.every(n => !!n)) {
      clearLines.push(k);
    }
  });
  if (clearLines.length === 0) {
    return false;
  }
  return clearLines;
}

export function getNextType() {
  const len = blockType.length;
  return blockType[Math.floor(Math.random() * len)];
}