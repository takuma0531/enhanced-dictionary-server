export class RandomNumberGenerator {
  public static generateNumbers(lengthOfOutput: number, range: number) {
    let outputArr: number[] = [];

    for (let i = 0; i < lengthOfOutput; i++) {
      const rand = Math.random() * range;
      if (!this.isDupulicated(outputArr, rand)) outputArr.push(rand);
    }
    return outputArr;
  }

  public static isDupulicated(arr: number[], el: number) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == el) return true;
    }
    return false;
  }
}
