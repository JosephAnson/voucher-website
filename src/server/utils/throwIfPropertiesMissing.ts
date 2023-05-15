export function throwIfPropertiesMissing<T extends object>(object: T, properties: (keyof T)[]) {
  const missingProperties = properties.filter(property => !(property in object))
  if (missingProperties.length) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing properties: ${missingProperties.join(', ')}`,
    })
  }
}
