export default function spawnGenerator(north, south, east, west, count, zone) {
  const randomize = (numOne, numTwo) => Phaser.Math.RND.between(numOne, numTwo);

  for (let i = 0; i < count; i++) {
    let x = randomize(west, east);
    let y = randomize(north, south);
    // parameters are x, y, width, height
    zone.create(x, y, 20, 20);
  }
}
