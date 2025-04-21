const carModels: Record<string, string[]> = {
    Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
    Ford: ['Mustang', 'F-150', 'Explorer', 'Focus'],
    Chevy: ['Camaro', 'Silverado', 'Impala', 'Malibu'],
    BMW: ['X5', '3 Series', '5 Series', 'X3'],
    Audi: ['A4', 'A6', 'Q5', 'Q7'],
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Prius'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
    Nissan: ['Altima', 'Sentra', 'Rogue', 'Leaf'],
    Kia: ['Soul', 'Sorento', 'Optima', 'Sportage'],
    Mazda: ['CX-5', 'Mazda3', 'Mazda6', 'CX-3'],
    Mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE'],
    Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Jetta'],
    Porsche: ['911 Carrera', 'Cayenne', 'Panamera', 'Boxster'],
    Ferrari: ['488 GTB', 'Portofino', 'Roma', 'F8 Spider'],
    Lamborghini: ['Huracan', 'Aventador', 'Urus'],
    Dodge: ['Charger', 'Challenger', 'Durango'],
    Subaru: ['Impreza', 'Outback', 'Forester'],
    Volvo: ['XC90', 'S60', 'XC60'],
    Jaguar: ['F-Pace', 'XE', 'XF'],
    'Land Rover': ['Range Rover Sport', 'Discovery Sport', 'Defender'],
  };
  

  export function randomCar() {
    const makes = Object.keys(carModels);
    const make = makes[Math.floor(Math.random() * makes.length)];
    
    const models = carModels[make];
    const model = models[Math.floor(Math.random() * models.length)];
  
    const name = `${make} ${model}`;
  
    const color = `#${Math.floor(Math.random() * 0xFFFFFF)
      .toString(16)
      .padStart(6, '0')}`;
  
    return {
      id: Date.now() + Math.random(),
      name,
      color,
    };
  }
  