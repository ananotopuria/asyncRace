const carModels: Record<string, string[]> = {
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
  Ford: ['Mustang', 'F-150', 'Explorer', 'Focus'],
}

export function randomCar() {
  const makes = Object.keys(carModels)
  const make = makes[Math.floor(Math.random() * makes.length)]
  const models = carModels[make]!
  const model = models[Math.floor(Math.random() * models.length)]
  const name = `${make} ${model}`
  const color =
    '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
  return { name, color }
}
