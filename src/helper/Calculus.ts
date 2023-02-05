export class Calculus {
  static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  static rad2deg(rad: number): number {
    return rad * (180 / Math.PI);
  }

  static fireRate2tearDelay(fireRate: number): number {
    return 30 / fireRate - 1;
  }

  static tearDelay2fireRate(tearDelay: number): number {
    return 30 / (tearDelay + 1);
  }
}
