export function detectVerticalCollision(ball, gameObject) {
  const topOfObject = gameObject.position.y;
  const leftOfObject = gameObject.position.x;
  const rightOfObject = gameObject.position.x + gameObject.width;
  const bottomOfObject = gameObject.position.y + gameObject.height;
  const bottomOfBall = ball.position.y + ball.size;
  const topOfBall = ball.position.y;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftOfObject &&
    ball.position.x <= rightOfObject - ball.size
  ) {
    return true;
  } else {
    return false;
  }
}

export function detectHorizontalCollision(ball, gameObject) {
  const topOfObject = gameObject.position.y;
  const leftOfObject = gameObject.position.x;
  const rightOfObject = gameObject.position.x + gameObject.width;
  const bottomOfObject = gameObject.position.y + gameObject.height;
  const rightOfBall = ball.position.x + ball.size;
  const leftOfBall = ball.position.x;

  if (
    leftOfBall <= rightOfObject &&
    rightOfBall >= leftOfObject &&
    ball.position.y <= bottomOfObject &&
    ball.position.y >= topOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
