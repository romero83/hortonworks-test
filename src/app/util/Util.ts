export class Util {

  static isBlank(str: string | number): boolean {
    return !str || str === '';
  }

  static deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

}
