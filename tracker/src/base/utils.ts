
function isUndefined(value): value is undefined {
  return value === undefined
}

function isString(value): value is string {
  return typeof value == 'string'
}

const BaseTag = <const>{
  async: '[object AsyncFunction]',
  func: '[object Function]',
  gen: '[object GeneratorFunction]',
  proxy: '[object Proxy]',
  null: '[object Null]',
  undefined: '[object Undefined]'
}

function isFunction(value): value is Function {

  const tag = Object.prototype.toString.call(value)

  return tag === BaseTag.async || tag === BaseTag.func
}

export { isUndefined, isFunction, isString }
