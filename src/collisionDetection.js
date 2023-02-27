export function detectCollision(ball, gameObject) {
  // detect paddle collisions
  const bottomOfBall = ball.position.y + ball.size;
  const topOfBall = ball.position.y;
  const topOfObject = gameObject.position.y;
  const leftOfObject = gameObject.position.x;
  const rightOfObject = gameObject.position.x + gameObject.width;
  const bottomOfObject = gameObject.position.y + gameObject.height;

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
