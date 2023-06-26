let blocks = [2, 6, 8, 5];

function computeMaxJump(blocks) {
  let maxDistance = 0;

  for (let i = 0; i < blocks.length - 1; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[j] >= blocks[i]) {
        let distance = j - i;
        if (distance > maxDistance) {
          maxDistance = distance;
        }
      }
    }
  }
  return maxDistance;
}

