import { Torero } from '../types/game';

const FIRST_NAMES = [
  'Antonio', 'Francisco', 'Manuel', 'José', 'Curro', 'Ángel', 'Rafael', 'Julián',
  'Enrique', 'Miguel Ángel', 'Alejandro', 'Jesús', 'Gonzalo', 'Diego', 'Emilio',
  'Sebastián', 'Pablo', 'Ignacio', 'Borja', 'Vicente', 'Daniel', 'Marcos'
];

const LAST_NAMES = [
  'Romero', 'Ordóñez', 'Silveti', 'Arruza', 'Camino', 'Robles', 'Ojeda', 'Castillo',
  'Ponce', 'Valverde', 'Aguilar', 'Garrido', 'Morante', 'Manzanares', 'Perera',
  'Talavante', 'Fandiño', 'López', 'Sánchez', 'Martínez', 'Navarro', 'Benítez'
];

const NICKNAMES = [
  'El Cordobés', 'El Litri', 'El Viti', 'Antoñete', 'El Niño de la Capea', 'Espartaco',
  'Jesulín', 'El Juli', 'El Fandi', 'Cayetano', 'El Fundi', 'El Sorro', 'El Califa',
  'El Melli', 'El Gallo', 'El Chicuelo', 'El Tato', 'El Barquero', 'El Pincel'
];

export function generateTorero(minSkill = 40, maxSkill = 95): Torero {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const useNickname = Math.random() > 0.4;
  const nickname = useNickname ? NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)] : undefined;

  const skill = Math.floor(Math.random() * (maxSkill - minSkill + 1)) + minSkill;
  const popularity = Math.floor(skill * 0.9 + Math.random() * 15);

  let category: Torero['category'] = 'Matador';
  if (skill < 55) category = 'Novillero';
  else if (skill >= 55 && skill < 75) category = 'Matador';
  else if (skill >= 75 && skill < 88) category = 'Figura';
  else if (skill >= 88 && skill < 94) category = 'Estrella';
  else category = 'Leyenda';

  return {
    id: `torero-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name: `${first} ${last}`,
    nickname,
    category,
    skill,
    popularity: Math.min(100, popularity),
  };
}

export function generateToreroTerna(count = 3, avgSkill = 60): Torero[] {
  const list: Torero[] = [];
  for (let i = 0; i < count; i++) {
    const spread = Math.floor((Math.random() - 0.5) * 20);
    const targetSkill = Math.max(30, Math.min(98, avgSkill + spread));
    list.push(generateTorero(Math.max(25, targetSkill - 10), Math.min(99, targetSkill + 10)));
  }
  return list;
}
