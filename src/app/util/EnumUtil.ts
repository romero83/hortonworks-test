export class EnumUtil {

  static getNamesAndValues<T extends number>(e: any) {
    return this.getNames(e).map(n => ({name: n, value: e[n] as string}));
  }

  static getNames(e: any): string[] {
    return Object.keys(e).filter(k => typeof e[k] === 'number');
  }

  static getValues<T extends number>(e: any): T[] {
    return Object.keys(e)
      .map(k => e[k])
      .filter(v => typeof v === 'number');
  }

}
