export interface TownLocation {
  name: string;
  province: string;
  region: string;
  tradition: string;
  tier: 'pueblo_pequeño' | 'pueblo_medio' | 'villa_taurina';
  basePayout: number;
  basePrestige: number;
}

export interface MajorPlaza {
  name: string;
  locality: string;
  province: string;
  category: 'primera_categoria' | 'plaza_1' | 'plaza_2' | 'plaza_3';
  minPrestige: number;
  minReputation: number;
  basePayout: number;
  basePrestige: number;
  fameFactor: number;
}

export const SPANISH_TOWNS: TownLocation[] = [
  // Navarra / Norte
  { name: 'Tudela', province: 'Navarra', region: 'Navarra', tradition: 'Feria Popular', tier: 'villa_taurina', basePayout: 5500, basePrestige: 6 },
  { name: 'Tafalla', province: 'Navarra', region: 'Navarra', tradition: 'Encierro', tier: 'villa_taurina', basePayout: 4800, basePrestige: 5 },
  { name: 'Lodosa', province: 'Navarra', region: 'Navarra', tradition: 'Encierro', tier: 'pueblo_medio', basePayout: 3200, basePrestige: 3 },
  { name: 'San Adrián', province: 'Navarra', region: 'Navarra', tradition: 'Vaquillas', tier: 'pueblo_pequeño', basePayout: 2100, basePrestige: 2 },
  { name: 'Arguedas', province: 'Navarra', region: 'Navarra', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 1800, basePrestige: 2 },

  // Castilla y León
  { name: 'Cuéllar', province: 'Segovia', region: 'Castilla y León', tradition: 'Encierro', tier: 'villa_taurina', basePayout: 6200, basePrestige: 7 },
  { name: 'Medina del Campo', province: 'Valladolid', region: 'Castilla y León', tradition: 'Encierro', tier: 'villa_taurina', basePayout: 5800, basePrestige: 6 },
  { name: 'Ciudad Rodrigo', province: 'Salamanca', region: 'Castilla y León', tradition: 'Carnaval del Toro', tier: 'villa_taurina', basePayout: 7500, basePrestige: 8 },
  { name: 'Íscar', province: 'Valladolid', region: 'Castilla y León', tradition: 'Novillada', tier: 'pueblo_medio', basePayout: 4200, basePrestige: 4 },
  { name: 'Guijuelo', province: 'Salamanca', region: 'Castilla y León', tradition: 'Feria Popular', tier: 'pueblo_medio', basePayout: 4600, basePrestige: 5 },
  { name: 'Toro', province: 'Zamora', region: 'Castilla y León', tradition: 'Feria Popular', tier: 'pueblo_medio', basePayout: 3900, basePrestige: 4 },
  { name: 'Fuenteguinaldo', province: 'Salamanca', region: 'Castilla y León', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 2400, basePrestige: 3 },
  { name: 'Sepúlveda', province: 'Segovia', region: 'Castilla y León', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 2200, basePrestige: 2 },
  { name: 'Alba de Tormes', province: 'Salamanca', region: 'Castilla y León', tradition: 'Novillada', tier: 'pueblo_medio', basePayout: 3800, basePrestige: 4 },

  // Castilla-La Mancha
  { name: 'Brihuega', province: 'Guadalajara', region: 'Castilla-La Mancha', tradition: 'Encierro', tier: 'villa_taurina', basePayout: 6500, basePrestige: 7 },
  { name: 'Almodóvar del Campo', province: 'Ciudad Real', region: 'Castilla-La Mancha', tradition: 'Encierro', tier: 'villa_taurina', basePayout: 5100, basePrestige: 5 },
  { name: 'Villaseca de la Sagra', province: 'Toledo', region: 'Castilla-La Mancha', tradition: 'Alfarero de Oro', tier: 'villa_taurina', basePayout: 8000, basePrestige: 9 },
  { name: 'Cifuentes', province: 'Guadalajara', region: 'Castilla-La Mancha', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 2300, basePrestige: 2 },
  { name: 'Mora', province: 'Toledo', region: 'Castilla-La Mancha', tradition: 'Feria Popular', tier: 'pueblo_medio', basePayout: 3500, basePrestige: 3 },
  { name: 'La Solana', province: 'Ciudad Real', region: 'Castilla-La Mancha', tradition: 'Vaquillas', tier: 'pueblo_pequeño', basePayout: 2000, basePrestige: 2 },
  { name: 'Trillo', province: 'Guadalajara', region: 'Castilla-La Mancha', tradition: 'Vaquillas', tier: 'pueblo_pequeño', basePayout: 1900, basePrestige: 2 },

  // Madrid
  { name: 'San Sebastián de los Reyes', province: 'Madrid', region: 'Madrid', tradition: 'Encierro', tier: 'villa_taurina', basePayout: 7200, basePrestige: 7 },
  { name: 'Arganda del Rey', province: 'Madrid', region: 'Madrid', tradition: 'Novillada', tier: 'villa_taurina', basePayout: 6800, basePrestige: 7 },
  { name: 'Colmenar Viejo', province: 'Madrid', region: 'Madrid', tradition: 'Feria de los Remedios', tier: 'villa_taurina', basePayout: 7000, basePrestige: 7 },
  { name: 'Moralzarzal', province: 'Madrid', region: 'Madrid', tradition: 'Novillada', tier: 'pueblo_medio', basePayout: 4300, basePrestige: 4 },
  { name: 'Chinchón', province: 'Madrid', region: 'Madrid', tradition: 'Festival Taurino', tier: 'villa_taurina', basePayout: 5400, basePrestige: 5 },
  { name: 'Navacerrada', province: 'Madrid', region: 'Madrid', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 2500, basePrestige: 3 },

  // Andalucía
  { name: 'Ronda', province: 'Málaga', region: 'Andalucía', tradition: 'Corrida Goyesca', tier: 'villa_taurina', basePayout: 9000, basePrestige: 10 },
  { name: 'Antequera', province: 'Málaga', region: 'Andalucía', tradition: 'Feria de Agosto', tier: 'villa_taurina', basePayout: 6000, basePrestige: 6 },
  { name: 'Utrera', province: 'Sevilla', region: 'Andalucía', tradition: 'Feria Popular', tier: 'villa_taurina', basePayout: 5500, basePrestige: 6 },
  { name: 'Andújar', province: 'Jaén', region: 'Andalucía', tradition: 'Feria Popular', tier: 'pueblo_medio', basePayout: 4100, basePrestige: 4 },
  { name: 'Baeza', province: 'Jaén', region: 'Andalucía', tradition: 'Feria Popular', tier: 'pueblo_medio', basePayout: 3800, basePrestige: 4 },
  { name: 'Villaluenga del Rosario', province: 'Cádiz', region: 'Andalucía', tradition: 'Vaquillas', tier: 'pueblo_pequeño', basePayout: 2600, basePrestige: 3 },
  { name: 'Olvera', province: 'Cádiz', region: 'Andalucía', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 2200, basePrestige: 2 },

  // Valencia & Aragón
  { name: 'Segorbe', province: 'Castellón', region: 'Comunidad Valenciana', tradition: 'Entrada de Toros y Caballos', tier: 'villa_taurina', basePayout: 6900, basePrestige: 7 },
  { name: 'Burriana', province: 'Castellón', region: 'Comunidad Valenciana', tradition: 'Bous al Carrer', tier: 'pueblo_medio', basePayout: 4500, basePrestige: 4 },
  { name: 'Onda', province: 'Castellón', region: 'Comunidad Valenciana', tradition: 'Fira d Onda', tier: 'pueblo_medio', basePayout: 4200, basePrestige: 4 },
  { name: 'Tarazona', province: 'Zaragoza', region: 'Aragón', tradition: 'Feria Popular', tier: 'pueblo_medio', basePayout: 3900, basePrestige: 4 },
  { name: 'Calamocha', province: 'Teruel', region: 'Aragón', tradition: 'Vaquillas', tier: 'pueblo_pequeño', basePayout: 1800, basePrestige: 2 },

  // Extremadura
  { name: 'Coria', province: 'Cáceres', region: 'Extremadura', tradition: 'Fiestas de San Juan', tier: 'villa_taurina', basePayout: 6600, basePrestige: 7 },
  { name: 'Zafra', province: 'Badajoz', region: 'Extremadura', tradition: 'Feria de San Miguel', tier: 'villa_taurina', basePayout: 6100, basePrestige: 6 },
  { name: 'Olivenza', province: 'Badajoz', region: 'Extremadura', tradition: 'Feria del Toro', tier: 'villa_taurina', basePayout: 8500, basePrestige: 9 },
  { name: 'Moraleja', province: 'Cáceres', region: 'Extremadura', tradition: 'Encierro', tier: 'pueblo_pequeño', basePayout: 2300, basePrestige: 2 },
];

export const MAJOR_PLAZAS: MajorPlaza[] = [
  {
    name: 'Plaza de Toros de Las Ventas',
    locality: 'Madrid',
    province: 'Madrid',
    category: 'primera_categoria',
    minPrestige: 75,
    minReputation: 65,
    basePayout: 48000,
    basePrestige: 30,
    fameFactor: 1.5,
  },
  {
    name: 'Real Maestranza de Caballería',
    locality: 'Sevilla',
    province: 'Sevilla',
    category: 'primera_categoria',
    minPrestige: 70,
    minReputation: 60,
    basePayout: 44000,
    basePrestige: 28,
    fameFactor: 1.45,
  },
  {
    name: 'Plaza de Toros Monumental de Pamplona',
    locality: 'Pamplona',
    province: 'Navarra',
    category: 'primera_categoria',
    minPrestige: 65,
    minReputation: 55,
    basePayout: 46000,
    basePrestige: 26,
    fameFactor: 1.4,
  },
  {
    name: 'Plaza de Toros de Vista Alegre',
    locality: 'Bilbao',
    province: 'Bizkaia',
    category: 'primera_categoria',
    minPrestige: 60,
    minReputation: 50,
    basePayout: 40000,
    basePrestige: 24,
    fameFactor: 1.35,
  },
  {
    name: 'Plaza de Toros de Valencia',
    locality: 'Valencia',
    province: 'Valencia',
    category: 'primera_categoria',
    minPrestige: 55,
    minReputation: 45,
    basePayout: 36000,
    basePrestige: 22,
    fameFactor: 1.3,
  },
  {
    name: 'Plaza de Toros de La Misericordia',
    locality: 'Zaragoza',
    province: 'Zaragoza',
    category: 'primera_categoria',
    minPrestige: 50,
    minReputation: 40,
    basePayout: 32000,
    basePrestige: 20,
    fameFactor: 1.25,
  },
  {
    name: 'Plaza de Toros de La Malagueta',
    locality: 'Málaga',
    province: 'Málaga',
    category: 'plaza_1',
    minPrestige: 40,
    minReputation: 35,
    basePayout: 26000,
    basePrestige: 18,
    fameFactor: 1.2,
  },
  {
    name: 'Plaza de Toros de Los Califas',
    locality: 'Córdoba',
    province: 'Córdoba',
    category: 'plaza_1',
    minPrestige: 38,
    minReputation: 32,
    basePayout: 24000,
    basePrestige: 16,
    fameFactor: 1.15,
  },
  {
    name: 'Plaza de Toros de Albacete',
    locality: 'Albacete',
    province: 'Albacete',
    category: 'plaza_2',
    minPrestige: 25,
    minReputation: 25,
    basePayout: 18000,
    basePrestige: 14,
    fameFactor: 1.1,
  },
  {
    name: 'Plaza de Toros de La Glorieta',
    locality: 'Salamanca',
    province: 'Salamanca',
    category: 'plaza_2',
    minPrestige: 28,
    minReputation: 28,
    basePayout: 20000,
    basePrestige: 15,
    fameFactor: 1.12,
  },
  {
    name: 'Arènes de Nîmes',
    locality: 'Nîmes',
    province: 'Gard (Francia)',
    category: 'plaza_1',
    minPrestige: 55,
    minReputation: 50,
    basePayout: 35000,
    basePrestige: 22,
    fameFactor: 1.3,
  },
  {
    name: 'Arènes d Arles',
    locality: 'Arles',
    province: 'Bouches-du-Rhône (Francia)',
    category: 'plaza_2',
    minPrestige: 35,
    minReputation: 35,
    basePayout: 22000,
    basePrestige: 16,
    fameFactor: 1.18,
  },
  {
    name: 'Plaza de Toros de Cuenca',
    locality: 'Cuenca',
    province: 'Cuenca',
    category: 'plaza_2',
    minPrestige: 22,
    minReputation: 20,
    basePayout: 15000,
    basePrestige: 12,
    fameFactor: 1.05,
  },
  {
    name: 'Plaza de Toros de Zamora',
    locality: 'Zamora',
    province: 'Zamora',
    category: 'plaza_3',
    minPrestige: 12,
    minReputation: 10,
    basePayout: 11000,
    basePrestige: 9,
    fameFactor: 1.0,
  },
];
