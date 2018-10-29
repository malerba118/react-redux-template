export const makeEnum = (array) => {
    if (!array instanceof Array) {
      throw new Error('First argument must be an array!')
    }
    let enumObj = {}
    array.forEach((type) => {
      enumObj[type] = type
    })
    enumObj = Object.freeze(enumObj)
    return new Proxy(enumObj, {
      get: function(target, prop, receiver) {
          if (target[prop] === undefined) {
            throw new Error(`Type ${prop} does not exist!`)
          } else {
            return Reflect.get(...arguments);
          }
        }
    })
}

export const timeout = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
