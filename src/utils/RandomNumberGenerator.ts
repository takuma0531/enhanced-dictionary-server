export class RandomNumberGenerator {
  public static generateNumbers(lengthOfOutput: number, range: number) {
    let outputArr: number[] = [];

    for (let i = 0; i < lengthOfOutput; i++) {
      let rand = Math.floor(Math.random() * range);

      while (this.isDupulicated(outputArr, rand)) {
        rand = Math.floor(Math.random() * range);
      }
      outputArr.push(rand);
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
