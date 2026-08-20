export type AnimalSex = 'toro' | 'vaca';

export type AnimalStatus =
  | 'disponible'
  | 'reservado'
  | 'gestando'
  | 'retirado'
  | 'indultado'
  | 'semental'
  | 'vendido'
  | 'festejado';

export interface HornData {
  direction: string; // corniveleto, cornigacho, corniabierto, corniapretado, cornivuelto, corniavuelto, brocho, capacho, cubeto, cornalón
  symmetry: string; // simétrica, bizco derecho, bizco izquierdo
  length: string; // corta, media, larga
  thickness: string; // astifino, medio, astigordo
  state: string; // íntegro, astillado, escobillado, mogón, despitonado
}

export interface MorphologyData {
  height: number; // 0-100
  length: number; // 0-100
  corpulence: number; // 0-100
  chest: number; // 0-100
  morrillo: number; // 0-100
  head: number; // 0-100
}

export interface GeneticsData {
  bravura: number; // 0-100
  fuerza: number; // 0-100
  resistencia: number; // 0-100
  velocidad: number; // 0-100
  movilidad: number; // 0-100
  nobleza: number; // 0-100
  fijeza: number; // 0-100
  temperamento: number; // 0-100
  fertilidad: number; // 0-100
  potencial: number; // 0-100
}

export interface AnimalHistoryEntry {
  id: string;
  day: number;
  date: string;
  title: string;
  description: string;
  type: 'nacimiento' | 'festejo' | 'indulto' | 'reproduccion' | 'mejora' | 'venta' | 'estado' | 'compra';
}

export interface Animal {
  id: string;
  name: string;
  number: number;
  sex: AnimalSex;
  birthDay: number;
  birthDate: string;
  ageYears: number;
  ageMonths: number;
  coat: string;
  markings: string[];
  horn: HornData;
  morphology: MorphologyData;
  genetics: GeneticsData;
  quality: number; // 0-100
  value: number; // in euros
  status: AnimalStatus;
  fatherId?: string;
  fatherName?: string;
  motherId?: string;
  motherName?: string;
  offspringIds: string[];
  history: AnimalHistoryEntry[];
  weightKg: number;
  festejosCount: number;
  lastFestejoResult?: string;
  isIndultado?: boolean;
  isSemental?: boolean;
  // Gemini AI Visual Generation Identity
  imageUrl?: string;
  imagePrompt?: string;
  imageGeneratedAt?: string;
  imageStatus?: 'generated' | 'fallback' | 'generating';
}

export interface BreedingPair {
  id: string;
  sireId: string;
  sireName: string;
  damId: string;
  damName: string;
  startDay: number;
  startDate: string;
  dueDay: number;
  dueDate: string;
  successChance: number;
  expectedGenetics: Partial<GeneticsData>;
  status: 'activa' | 'nacido' | 'fallida';
  customOffspringName?: string;
}

export interface Facility {
  id: 'pastos' | 'corrales' | 'reproduccion' | 'veterinaria';
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  capacity: number;
  maxCapacity: number;
  condition: 'Óptimo' | 'Bueno' | 'Regular' | 'Requiere Mantenimiento';
  integrity: number; // 0-100%
  upgradeCost: number;
  upgradeDays: number;
  daysRemainingForUpgrade: number;
  isUpgrading: boolean;
  upgradeProgress: number; // 0-100%
}

export type EventCategory =
  | 'popular'
  | 'novillada'
  | 'plaza_3'
  | 'plaza_2'
  | 'plaza_1'
  | 'primera_categoria';

export interface Torero {
  id: string;
  name: string;
  nickname?: string;
  category: 'Novillero' | 'Matador' | 'Figura' | 'Estrella' | 'Leyenda';
  skill: number; // 0-100
  popularity: number; // 0-100
}

export interface Contract {
  id: string;
  title: string;
  plaza: string;
  locality: string;
  province: string;
  category: EventCategory;
  type: string;
  requiredType: 'toro' | 'novillo' | 'vaquilla';
  requiredCount: number;
  minWeightKg?: number;
  minBravura?: number;
  minAgeYears?: number;
  maxAgeYears?: number;
  specialReq?: string;
  payout: number;
  prestigeReward: number;
  reputationReward: number;
  scheduledDay: number;
  scheduledDate: string;
  daysLeft: number;
  status: 'disponible' | 'aceptado' | 'rechazado' | 'completado' | 'expirado';
  assignedAnimalIds: string[];
  toreros: Torero[];
}

export interface SimulationRoundLog {
  tercio: 'Salida y Capote' | 'Tercio de Varas' | 'Banderillas' | 'Faena de Muleta' | 'Desenlace';
  description: string;
  scoreDelta: number;
}

export interface AnimalFestejoResult {
  animalId: string;
  animalName: string;
  animalNumber: number;
  score: number; // 0-100
  performance: 'Decepcionante' | 'Discreta' | 'Buena' | 'Destacada' | 'Extraordinaria' | 'Histórica (Indulto)';
  trophies: string; // 'Silencio', 'Ovación', '1 Oreja', '2 Orejas', '2 Orejas y Rabo', 'Indulto y Vuelta al Ruedo'
  isIndulto: boolean;
  toreroName: string;
  bravuraShown: number;
  rounds: SimulationRoundLog[];
  quote: string;
}

export interface FestejoSimulationSummary {
  contractId: string;
  contractTitle: string;
  plaza: string;
  locality: string;
  date: string;
  day: number;
  payoutEarned: number;
  prestigeEarned: number;
  reputationEarned: number;
  animalResults: AnimalFestejoResult[];
  hasIndulto: boolean;
  indultedAnimal?: Animal;
  overallRating: 'Desastre' | 'Regular' | 'Triunfo Notable' | 'Gran Triunfo' | 'Tarde Histórica';
  notes: string;
}

export interface Transaction {
  id: string;
  date: string;
  day: number;
  concept: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: 'festejo' | 'venta' | 'alimentacion' | 'mantenimiento' | 'instalaciones' | 'veterinario' | 'reproduccion';
  balanceAfter: number;
}

export interface GameNotification {
  id: string;
  date: string;
  day: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'indulto' | 'birth' | 'event';
  read: boolean;
  targetTab?: 'dashboard' | 'inventory' | 'events' | 'genetics' | 'management';
  targetId?: string;
}

export interface RanchData {
  id: string;
  name: string;
  foundedDate: string;
  foundedDay: number;
  prestige: number; // 0 - 1000+
  reputation: number; // 0 - 100
  level: number; // 1 to 10
  rankTitle: string; // 'Pequeña Ganadería', 'Ganadería Local', 'Ganadería Consolidada', 'Ganadería Prestigiosa', 'Ganadería Histórica'
  funds: number;
  totalCapacity: number;
}

export interface GameStats {
  totalFestejos: number;
  totalIndultos: number;
  totalNacimientos: number;
  totalIngresos: number;
  totalGastos: number;
  totalPrestigioGanado: number;
  topAnimalName?: string;
  topAnimalBravura?: number;
}

export interface GameState {
  ranch: RanchData;
  game: {
    currentDay: number;
    currentDate: string;
    season: 'Primavera' | 'Verano' | 'Otoño' | 'Invierno';
    year: number;
    month: number;
  };
  animals: Animal[];
  breeding: BreedingPair[];
  facilities: Facility[];
  contracts: Contract[]; // Accepted / in progress
  opportunities: Contract[]; // Pending acceptance
  historyEvents: Contract[]; // Finished festejos
  notifications: GameNotification[];
  transactions: Transaction[];
  recentLocations: string[];
  recentPlazas: string[];
  stats: GameStats;
}
