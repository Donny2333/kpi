export default class Uuid {
  constructor() {
    const s4 = _ => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }

    return {
      create: _ => {
        return (
          s4() + s4() + '-' +
          s4() + '-' +
          s4() + '-' +
          s4() + '-' +
          s4() + s4() + s4()
        )
      },
      simple: _ => {
        return Math.random().toFixed(5) * 100000
      }
    }
  }
}
