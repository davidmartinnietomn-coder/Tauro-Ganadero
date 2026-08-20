import {
  Animal,
  AnimalSex,
  BreedingPair,
  Contract,
  Facility,
  GameState,
  GeneticsData,
  HornData,
  MorphologyData,
} from '../types/game';
import {
  COAT_CATALOG,
  HORN_DIRECTIONS,
  HORN_LENGTHS,
  HORN_STATES,
  HORN_SYMMETRIES,
  HORN_THICKNESSES,
  MARKINGS_CATALOG,
  MALE_NAMES,
  FEMALE_NAMES,
} from '../data/cattleTraits';
import { SPANISH_TOWNS, MAJOR_PLAZAS } from '../data/spanishTowns';
import { generateToreroTerna } from '../data/toreros';
import { buildAnimalGeminiPrompt } from './animalPromptBuilder';

export function calculateQuality(genetics: GeneticsData, morphology: MorphologyData): number {
  const geneticScore =
    genetics.bravura * 0.25 +
    genetics.fuerza * 0.15 +
    genetics.resistencia * 0.15 +
    genetics.nobleza * 0.15 +
    genetics.movilidad * 0.1 +
    genetics.fijeza * 0.1 +
    genetics.temperamento * 0.05 +
    genetics.velocidad * 0.05;

  const morphScore =
    morphology.corpulence * 0.3 +
    morphology.chest * 0.25 +
    morphology.morrillo * 0.25 +
    morphology.height * 0.2;

  const total = Math.round(geneticScore * 0.75 + morphScore * 0.25);
  return Math.min(99, Math.max(20, total));
}

export function calculateAnimalValue(quality: number, ageYears: number, sex: AnimalSex, isIndultado = false): number {
  let base = 2500 + quality * 120;
  if (sex === 'toro') {
    if (ageYears >= 4 && ageYears <= 5) base *= 1.4; // peak corrida age
    else if (ageYears >= 2 && ageYears < 4) base *= 1.1; // novillo
    else if (ageYears > 6) base *= 0.7;
  } else {
    base *= 1.2; // reproductive value of cows
  }
  if (isIndultado) {
    base *= 3.5; // indultado stud bull has colossal market value
  }
  return Math.round(base / 100) * 100;
}

export function generateAnimal(params: {
  sex?: AnimalSex;
  name?: string;
  ageYears?: number;
  ageMonths?: number;
  coat?: string;
  fatherId?: string;
  fatherName?: string;
  motherId?: string;
  motherName?: string;
  minQuality?: number;
  maxQuality?: number;
  targetBravura?: number;
  isSemental?: boolean;
}): Animal {
  const sex: AnimalSex = params.sex || (Math.random() > 0.5 ? 'toro' : 'vaca');
  const namePool = sex === 'toro' ? MALE_NAMES : FEMALE_NAMES;
  const name = params.name || namePool[Math.floor(Math.random() * namePool.length)];
  const number = Math.floor(Math.random() * 899) + 101; // e.g. 101-999

  const ageYears = params.ageYears !== undefined ? params.ageYears : (Math.floor(Math.random() * 4) + 2);
  const ageMonths = params.ageMonths !== undefined ? params.ageMonths : Math.floor(Math.random() * 12);

  // Pick Coat
  let coat = params.coat;
  if (!coat) {
    const roll = Math.random();
    if (roll < 0.5) coat = 'Negro';
    else if (roll < 0.65) coat = 'Colorado';
    else if (roll < 0.78) coat = 'Cárdeno';
    else if (roll < 0.88) coat = 'Castaño';
    else if (roll < 0.95) coat = 'Jabonero';
    else {
      const rareCoats = [
        'Negro Zaíno',
        'Azabache',
        'Mulato',
        'Colorado Melocotón',
        'Colorado Avinagrado',
        'Colorado Encendido',
        'Retinto',
        'Tostado',
        'Salinero',
        'Ensabanado',
        'Berrendo en Negro',
        'Berrendo en Colorado',
        'Cárdeno Claro',
        'Jabonero',
      ];
      coat = rareCoats[Math.floor(Math.random() * rareCoats.length)];
    }
  }

  // Pick Markings (0 to 3)
  const markings: string[] = [];
  const markRoll = Math.random();
  if (markRoll > 0.4) {
    const count = markRoll > 0.85 ? 2 : 1;
    const shuffled = [...MARKINGS_CATALOG].sort(() => 0.5 - Math.random());
    for (let i = 0; i < count; i++) {
      markings.push(shuffled[i].name);
    }
  }

  // Horns
  const horn: HornData = {
    direction: HORN_DIRECTIONS[Math.floor(Math.random() * HORN_DIRECTIONS.length)].name,
    symmetry: Math.random() > 0.85 ? (Math.random() > 0.5 ? 'Bizco del Derecho' : 'Bizco del Izquierdo') : 'Simétrica',
    length: HORN_LENGTHS[Math.floor(Math.random() * HORN_LENGTHS.length)].name,
    thickness: HORN_THICKNESSES[Math.floor(Math.random() * HORN_THICKNESSES.length)].name,
    state: Math.random() > 0.9 ? 'Astillado' : 'Íntegro',
  };

  // Morphology
  const baseMorph = 50 + Math.floor(Math.random() * 30);
  const morphology: MorphologyData = {
    height: Math.min(95, Math.max(30, baseMorph + Math.floor((Math.random() - 0.5) * 20))),
    length: Math.min(95, Math.max(30, baseMorph + Math.floor((Math.random() - 0.5) * 20))),
    corpulence: Math.min(98, Math.max(35, baseMorph + Math.floor((Math.random() - 0.5) * 25))),
    chest: Math.min(95, Math.max(30, baseMorph + Math.floor((Math.random() - 0.5) * 20))),
    morrillo: sex === 'toro' ? Math.min(98, Math.max(40, baseMorph + Math.floor(Math.random() * 20))) : Math.min(60, Math.max(20, baseMorph - 20)),
    head: Math.min(95, Math.max(35, baseMorph + Math.floor((Math.random() - 0.5) * 15))),
  };

  // Genetics
  const minG = params.minQuality || 50;
  const maxG = params.maxQuality || 85;
  const genVal = () => Math.floor(Math.random() * (maxG - minG + 1)) + minG;

  const bravuraBase = params.targetBravura || genVal();
  const genetics: GeneticsData = {
    bravura: Math.min(99, Math.max(25, bravuraBase + Math.floor((Math.random() - 0.5) * 10))),
    fuerza: Math.min(99, Math.max(25, genVal())),
    resistencia: Math.min(99, Math.max(25, genVal())),
    velocidad: Math.min(99, Math.max(25, genVal())),
    movilidad: Math.min(99, Math.max(25, genVal())),
    nobleza: Math.min(99, Math.max(25, genVal())),
    fijeza: Math.min(99, Math.max(25, genVal())),
    temperamento: Math.min(99, Math.max(25, genVal())),
    fertilidad: Math.min(99, Math.max(40, genVal() + 10)),
    potencial: Math.min(99, Math.max(30, genVal() + 5)),
  };

  const quality = calculateQuality(genetics, morphology);
  const value = calculateAnimalValue(quality, ageYears, sex);

  // Weight calculation based on exact zootechnical standards:
  // 0 years (Becerro): 45 - 120 kg
  // 1 year (Añojo): 170 - 250 kg
  // 2 years (Eral): 270 - 360 kg
  // 3 years (Novillo/Utrero): 370 - 460 kg
  // 4+ years (Toro Cuatreño/Quinqueño): 480 - 600+ kg
  let weightKg = 480;
  if (ageYears === 0) {
    weightKg = 45 + Math.round((ageMonths * 7) + (morphology.corpulence * 0.4) + (Math.random() * 8));
  } else if (ageYears === 1) {
    weightKg = 175 + Math.round((ageMonths * 6) + (morphology.corpulence * 0.6) + (Math.random() * 12));
  } else if (ageYears === 2) {
    weightKg = 275 + Math.round((ageMonths * 6) + (morphology.corpulence * 0.8) + (Math.random() * 15));
  } else if (ageYears === 3) {
    weightKg = 375 + Math.round((ageMonths * 5) + (morphology.corpulence * 1.0) + (Math.random() * 18));
  } else {
    weightKg = 475 + Math.round((Math.min(ageYears - 4, 3) * 15) + (morphology.corpulence * 1.2) + (morphology.chest * 0.4) + (Math.random() * 20));
  }
  if (sex === 'vaca') {
    weightKg = Math.round(weightKg * 0.76);
  }

  const id = `bull-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    id,
    name,
    number,
    sex,
    birthDay: 1 - (ageYears * 365 + ageMonths * 30),
    birthDate: `Año ${2024 - ageYears}`,
    ageYears,
    ageMonths,
    coat,
    markings,
    horn,
    morphology,
    genetics,
    quality,
    value,
    status: params.isSemental ? 'semental' : 'disponible',
    fatherId: params.fatherId,
    fatherName: params.fatherName,
    motherId: params.motherId,
    motherName: params.motherName,
    offspringIds: [],
    history: [
      {
        id: `h-${Date.now()}-1`,
        day: 1,
        date: 'Fundación',
        title: 'Ingreso en Ganadería',
        description: `Animal registrado en el libro genealógico inicial de la vacada.`,
        type: 'nacimiento',
      },
    ],
    weightKg,
    festejosCount: 0,
    isSemental: params.isSemental,
    imagePrompt: buildAnimalGeminiPrompt({
      sex,
      ageYears,
      coat,
      markings,
      horn,
      morphology,
      name,
    }),
  };
}

export function generateInitialHerd(): Animal[] {
  const animals: Animal[] = [];

  // 1 Bull / Semental
  animals.push(
    generateAnimal({
      sex: 'toro',
      name: 'Valiente',
      ageYears: 4,
      ageMonths: 2,
      coat: 'Cárdeno',
      minQuality: 68,
      maxQuality: 88,
      targetBravura: 82,
      isSemental: true,
    })
  );

  // 1 Strong Corrida Bull
  animals.push(
    generateAnimal({
      sex: 'toro',
      name: 'Fuego Negro',
      ageYears: 4,
      ageMonths: 5,
      coat: 'Negro Zaíno',
      minQuality: 65,
      maxQuality: 85,
      targetBravura: 80,
    })
  );

  // 1 Novillo
  animals.push(
    generateAnimal({
      sex: 'toro',
      name: 'Relámpago',
      ageYears: 2,
      ageMonths: 4,
      coat: 'Colorado',
      minQuality: 60,
      maxQuality: 78,
    })
  );

  // 2 Breeding Cows
  animals.push(
    generateAnimal({
      sex: 'vaca',
      name: 'Mariposa',
      ageYears: 5,
      ageMonths: 1,
      coat: 'Cárdeno',
      minQuality: 70,
      maxQuality: 86,
    })
  );

  animals.push(
    generateAnimal({
      sex: 'vaca',
      name: 'Campanera',
      ageYears: 3,
      ageMonths: 8,
      coat: 'Jabonero',
      minQuality: 62,
      maxQuality: 80,
    })
  );

  // 1 Young Calf / Añojo
  animals.push(
    generateAnimal({
      sex: 'vaca',
      name: 'Bulería',
      ageYears: 1,
      ageMonths: 1,
      coat: 'Negro',
      minQuality: 58,
      maxQuality: 75,
    })
  );

  return animals;
}

export function generateInitialFacilities(): Facility[] {
  return [
    {
      id: 'pastos',
      name: 'Pastos del Sur',
      description: 'Zonas de pasto y dehesa natural. Sostiene la nutrición principal y salud del ganado.',
      level: 1,
      maxLevel: 5,
      capacity: 15,
      maxCapacity: 60,
      condition: 'Óptimo',
      integrity: 100,
      upgradeCost: 15000,
      upgradeDays: 14,
      daysRemainingForUpgrade: 0,
      isUpgrading: false,
      upgradeProgress: 0,
    },
    {
      id: 'corrales',
      name: 'Corrales Principales',
      description: 'Cercados seguros para apartar, embarcar y dar cuidados veterinarios al ganado.',
      level: 1,
      maxLevel: 5,
      capacity: 10,
      maxCapacity: 40,
      condition: 'Óptimo',
      integrity: 95,
      upgradeCost: 12000,
      upgradeDays: 10,
      daysRemainingForUpgrade: 0,
      isUpgrading: false,
      upgradeProgress: 0,
    },
    {
      id: 'reproduccion',
      name: 'Zona de Reproducción y Parideras',
      description: 'Cercados especiales de cubrición y parideras tranquilas para vacas y sementales.',
      level: 1,
      maxLevel: 5,
      capacity: 4,
      maxCapacity: 16,
      condition: 'Óptimo',
      integrity: 90,
      upgradeCost: 18000,
      upgradeDays: 18,
      daysRemainingForUpgrade: 0,
      isUpgrading: false,
      upgradeProgress: 0,
    },
    {
      id: 'veterinaria',
      name: 'Pabellón Veterinario y Báscula',
      description: 'Control sanitario, pesaje oficial y prevención de lesiones del ganado.',
      level: 1,
      maxLevel: 5,
      capacity: 8,
      maxCapacity: 30,
      condition: 'Óptimo',
      integrity: 100,
      upgradeCost: 20000,
      upgradeDays: 15,
      daysRemainingForUpgrade: 0,
      isUpgrading: false,
      upgradeProgress: 0,
    },
  ];
}

export function generateOpportunity(
  ranchPrestige: number,
  ranchReputation: number,
  currentDay: number,
  recentLocations: string[] = []
): Contract {
  // Chance of Major Plaza vs Town depends on prestige and reputation
  const majorPlazaEligible = MAJOR_PLAZAS.filter(
    (p) => ranchPrestige >= p.minPrestige && !recentLocations.includes(p.name)
  );

  const shouldRollMajor = majorPlazaEligible.length > 0 && Math.random() < Math.min(0.65, (ranchPrestige / 150) + 0.1);

  if (shouldRollMajor && majorPlazaEligible.length > 0) {
    const plaza = majorPlazaEligible[Math.floor(Math.random() * majorPlazaEligible.length)];
    const reqCount = plaza.category === 'primera_categoria' ? 6 : (Math.random() > 0.5 ? 6 : 4);
    const minWeight = plaza.category === 'primera_categoria' ? 520 : 490;
    const minBravura = plaza.category === 'primera_categoria' ? 75 : 65;

    const payout = Math.round(plaza.basePayout * (0.9 + Math.random() * 0.3) / 500) * 500;
    const prestigeReward = Math.round(plaza.basePrestige * (0.9 + Math.random() * 0.2));
    const reputationReward = Math.round(prestigeReward * 0.8);

    const types = ['Corrida de Toros', 'Feria del Toro', 'Corrida Concurso'];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
      id: `opp-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      title: `${type} en ${plaza.locality}`,
      plaza: plaza.name,
      locality: plaza.locality,
      province: plaza.province,
      category: plaza.category,
      type,
      requiredType: 'toro',
      requiredCount: reqCount,
      minWeightKg: minWeight,
      minBravura,
      minAgeYears: 4,
      maxAgeYears: 6,
      specialReq: `Toros cuatreños o cinqueños con trapío y peso mínimo de ${minWeight} kg.`,
      payout,
      prestigeReward,
      reputationReward,
      scheduledDay: currentDay + 7 + Math.floor(Math.random() * 20),
      scheduledDate: `Día ${currentDay + 10}`,
      daysLeft: 12,
      status: 'disponible',
      assignedAnimalIds: [],
      toreros: generateToreroTerna(reqCount >= 6 ? 3 : 2, 70 + Math.min(25, ranchPrestige * 0.3)),
    };
  }

  // Otherwise generate Spanish town festival
  const availableTowns = SPANISH_TOWNS.filter((t) => !recentLocations.includes(t.name));
  const townPool = availableTowns.length > 0 ? availableTowns : SPANISH_TOWNS;
  const town = townPool[Math.floor(Math.random() * townPool.length)];

  let reqType: 'toro' | 'novillo' | 'vaquilla' = 'toro';
  let title = '';
  let category: Contract['category'] = 'popular';
  let requiredCount = 2;
  let minWeightKg: number | undefined;
  let minBravura: number | undefined;
  let minAge: number | undefined;
  let maxAge: number | undefined;

  const rollType = Math.random();
  if (rollType < 0.35) {
    reqType = 'vaquilla';
    title = `Vaquillas y Suelta Popular`;
    requiredCount = Math.random() > 0.5 ? 2 : 4;
    category = 'popular';
    minAge = 2;
    maxAge = 6;
  } else if (rollType < 0.65) {
    reqType = 'novillo';
    title = `Novillada de Promoción`;
    category = 'novillada';
    requiredCount = Math.random() > 0.5 ? 4 : 2;
    minWeightKg = 380;
    minBravura = 50;
    minAge = 2;
    maxAge = 3;
  } else {
    reqType = 'toro';
    title = `Encierro Tradicional y Festejo`;
    category = 'popular';
    requiredCount = Math.random() > 0.5 ? 4 : 2;
    minWeightKg = 450;
    minBravura = 55;
    minAge = 4;
    maxAge = 6;
  }

  const multiplier = 1 + (ranchPrestige / 100) * 0.5;
  const payout = Math.round((town.basePayout * multiplier * (0.85 + Math.random() * 0.3)) / 100) * 100;
  const prestigeReward = Math.max(2, Math.round(town.basePrestige * (0.8 + Math.random() * 0.4)));
  const reputationReward = Math.max(1, Math.round(prestigeReward * 0.7));

  return {
    id: `opp-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    title: `${title} de ${town.name}`,
    plaza: `Plaza Mayor / Recinto de ${town.name}`,
    locality: town.name,
    province: town.province,
    category,
    type: title,
    requiredType: reqType,
    requiredCount,
    minWeightKg,
    minBravura,
    minAgeYears: minAge,
    maxAgeYears: maxAge,
    specialReq: minWeightKg ? `Peso mínimo de ${minWeightKg} kg.` : `Animales de buena movilidad.`,
    payout,
    prestigeReward,
    reputationReward,
    scheduledDay: currentDay + 4 + Math.floor(Math.random() * 14),
    scheduledDate: `Día ${currentDay + 6}`,
    daysLeft: 8,
    status: 'disponible',
    assignedAnimalIds: [],
    toreros: generateToreroTerna(2, 45 + Math.min(30, ranchPrestige * 0.2)),
  };
}

export function generateOffspring(
  sire: Animal,
  dam: Animal,
  currentDay: number,
  customName?: string
): Animal {
  const sex: AnimalSex = Math.random() > 0.5 ? 'toro' : 'vaca';
  const namePool = sex === 'toro' ? MALE_NAMES : FEMALE_NAMES;
  const name = customName?.trim() || namePool[Math.floor(Math.random() * namePool.length)];
  const number = Math.floor(Math.random() * 899) + 101;

  // Inherit coat (50% sire, 40% dam, 10% mutation/recessive)
  let coat = Math.random() > 0.5 ? sire.coat : dam.coat;
  if (Math.random() < 0.12) {
    const rareCoats = ['Jabonero', 'Salinero', 'Azabache', 'Ensabanado', 'Berrendo en Negro'];
    coat = rareCoats[Math.floor(Math.random() * rareCoats.length)];
  }

  // Inherit markings (pool from parents + chance of new)
  const markingsSet = new Set<string>();
  if (Math.random() < 0.6 && sire.markings.length > 0) {
    markingsSet.add(sire.markings[Math.floor(Math.random() * sire.markings.length)]);
  }
  if (Math.random() < 0.6 && dam.markings.length > 0) {
    markingsSet.add(dam.markings[Math.floor(Math.random() * dam.markings.length)]);
  }
  if (markingsSet.size === 0 && Math.random() < 0.3) {
    markingsSet.add(MARKINGS_CATALOG[Math.floor(Math.random() * MARKINGS_CATALOG.length)].name);
  }

  // Inherit horn characteristics
  const horn: HornData = {
    direction: Math.random() > 0.5 ? sire.horn.direction : dam.horn.direction,
    symmetry: Math.random() > 0.9 ? 'Bizco del Derecho' : 'Simétrica',
    length: Math.random() > 0.5 ? sire.horn.length : dam.horn.length,
    thickness: Math.random() > 0.5 ? sire.horn.thickness : dam.horn.thickness,
    state: 'Íntegro',
  };

  // Genetics inheritance with blend and controlled mutation (-6 to +8)
  const inheritGene = (gSire: number, gDam: number) => {
    const avg = (gSire + gDam) / 2;
    const variance = (Math.random() * 14) - 6; // -6 to +8
    return Math.min(99, Math.max(30, Math.round(avg + variance)));
  };

  const genetics: GeneticsData = {
    bravura: inheritGene(sire.genetics.bravura, dam.genetics.bravura),
    fuerza: inheritGene(sire.genetics.fuerza, dam.genetics.fuerza),
    resistencia: inheritGene(sire.genetics.resistencia, dam.genetics.resistencia),
    velocidad: inheritGene(sire.genetics.velocidad, dam.genetics.velocidad),
    movilidad: inheritGene(sire.genetics.movilidad, dam.genetics.movilidad),
    nobleza: inheritGene(sire.genetics.nobleza, dam.genetics.nobleza),
    fijeza: inheritGene(sire.genetics.fijeza, dam.genetics.fijeza),
    temperamento: inheritGene(sire.genetics.temperamento, dam.genetics.temperamento),
    fertilidad: inheritGene(sire.genetics.fertilidad, dam.genetics.fertilidad),
    potencial: inheritGene(sire.genetics.potencial, dam.genetics.potencial),
  };

  const morphology: MorphologyData = {
    height: Math.round((sire.morphology.height + dam.morphology.height) / 2 + (Math.random() * 10 - 5)),
    length: Math.round((sire.morphology.length + dam.morphology.length) / 2 + (Math.random() * 10 - 5)),
    corpulence: Math.round((sire.morphology.corpulence + dam.morphology.corpulence) / 2 + (Math.random() * 10 - 5)),
    chest: Math.round((sire.morphology.chest + dam.morphology.chest) / 2 + (Math.random() * 10 - 5)),
    morrillo: sex === 'toro' ? Math.round((sire.morphology.morrillo + 50) / 2 + (Math.random() * 8)) : 35,
    head: Math.round((sire.morphology.head + dam.morphology.head) / 2 + (Math.random() * 8 - 4)),
  };

  const quality = calculateQuality(genetics, morphology);
  const value = calculateAnimalValue(quality, 0, sex);

  const id = `calf-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    id,
    name,
    number,
    sex,
    birthDay: currentDay,
    birthDate: `Día ${currentDay}`,
    ageYears: 0,
    ageMonths: 1,
    coat,
    markings: Array.from(markingsSet),
    horn,
    morphology,
    genetics,
    quality,
    value,
    status: 'disponible',
    fatherId: sire.id,
    fatherName: sire.name,
    motherId: dam.id,
    motherName: dam.name,
    offspringIds: [],
    history: [
      {
        id: `h-${Date.now()}-birth`,
        day: currentDay,
        date: `Día ${currentDay}`,
        title: 'Nacimiento en la Ganadería',
        description: `Cría nacida del cruce entre el semental ${sire.name} (#${sire.number}) y la vaca ${dam.name} (#${dam.number}).`,
        type: 'nacimiento',
      },
    ],
    weightKg: sex === 'toro' ? 55 : 45,
    festejosCount: 0,
  };
}

export function createNewGameState(ranchName: string, province = 'Salamanca'): GameState {
  const initialHerd = generateInitialHerd();
  const initialFacilities = generateInitialFacilities();

  const opp1 = generateOpportunity(15, 20, 1, []);
  const opp2 = generateOpportunity(15, 20, 1, [opp1.locality]);
  const opp3 = generateOpportunity(15, 20, 1, [opp1.locality, opp2.locality]);

  const initialFunds = 125400;

  return {
    ranch: {
      id: `ranch-${Date.now()}`,
      name: ranchName.trim(),
      foundedDate: '2024',
      foundedDay: 1,
      prestige: 15,
      reputation: 25,
      level: 1,
      rankTitle: 'Pequeña Ganadería',
      funds: initialFunds,
      totalCapacity: 37,
    },
    game: {
      currentDay: 1,
      currentDate: '15 de Marzo, 2024',
      season: 'Primavera',
      year: 2024,
      month: 3,
    },
    animals: initialHerd,
    breeding: [],
    facilities: initialFacilities,
    contracts: [],
    opportunities: [opp1, opp2, opp3],
    historyEvents: [],
    notifications: [
      {
        id: `notif-${Date.now()}-1`,
        date: '15 Mar 2024',
        day: 1,
        title: '¡Fundación de la Ganadería!',
        message: `Has fundado con éxito la ${ranchName.trim()}. Tienes 6 reses iniciales en tus pastos. ¡Que empiece la leyenda!`,
        type: 'success',
        read: false,
        targetTab: 'inventory',
      },
      {
        id: `notif-${Date.now()}-2`,
        date: '15 Mar 2024',
        day: 1,
        title: 'Oportunidades de festejos disponibles',
        message: 'Ayuntamientos y empresarios han enviado sus primeras propuestas de contratos.',
        type: 'info',
        read: false,
        targetTab: 'events',
      },
    ],
    transactions: [
      {
        id: `tx-${Date.now()}-1`,
        date: '15 Mar 2024',
        day: 1,
        concept: 'Fondos iniciales de constitución',
        amount: initialFunds,
        type: 'ingreso',
        category: 'reproduccion',
        balanceAfter: initialFunds,
      },
    ],
    recentLocations: [opp1.locality, opp2.locality, opp3.locality],
    recentPlazas: [],
    stats: {
      totalFestejos: 0,
      totalIndultos: 0,
      totalNacimientos: 0,
      totalIngresos: initialFunds,
      totalGastos: 0,
      totalPrestigioGanado: 15,
      topAnimalName: initialHerd[0].name,
      topAnimalBravura: initialHerd[0].genetics.bravura,
    },
  };
}

export const generateInitialGameState = createNewGameState;

