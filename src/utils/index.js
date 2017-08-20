const hiddenProperty = (() => {
  let names = [
    'hidden',
    'webkitHidden',
    'mozHidden',
    'msHidden',
  ];
  names = names.filter((e) => (e in document));
  return names.length > 0 ? names[0] : false;
})();

export const visibilityChangeEvent = (() => {
  if (!hiddenProperty) {
    return false;
  }
  return hiddenProperty.replace(/hidden/i, 'visibilitychange');
})();

export function isClear(matrix) { // 是否达到消除状态
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

export function isOver(matrix) { // 游戏是否结束, 第一行落下方块为依据
  return matrix.get(0).some(n => !!n);
}

export const isFocus = () => {
  if (!hiddenProperty) {
    return true;
  }
  return !document[hiddenProperty];
};

export function want(next, matrix) {
  const xy = next.xy;
  const shape = next.shape;
  const horizontal = shape.get(0).size;
  return shape.every((m, k1) => (
    m.every((n, k2) => {
      if (xy[1] < 0) { // left
        return false;
      }
      if (xy[1] + horizontal > 10) { // right
        return false;
      }
      if (xy[0] + k1 < 0) { // top
        return true;
      }
      if (xy[0] + k1 >= 20) { // bottom
        return false;
      }
      if (n) {
        if (matrix.get(xy[0] + k1).get(xy[1] + k2)) {
          return false;
        }
        return true;
      }
      return true;
    })
  ));
}