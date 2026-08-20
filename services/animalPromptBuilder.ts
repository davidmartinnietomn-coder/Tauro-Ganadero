import { AnimalSex, HornData, MorphologyData } from '../types/game';

/**
 * PELAJE TRANSLATION DICTIONARY
 */
export const COAT_PROMPT_MAP: Record<string, string> = {
  'negro zaíno': 'uniformly deep black coat with an almost completely solid black appearance and minimal visible variation',
  'negro zaino': 'uniformly deep black coat with an almost completely solid black appearance and minimal visible variation',
  'negro lustroso': 'jet black lustrous coat with shiny glossy highlights',
  'negro azabache': 'deep jet black coat with intense obsidian shine and bright lacquer luster',
  'azabache': 'deep jet black coat with intense obsidian shine and bright lacquer luster',
  'negro mulato': 'matte brownish-black coat with roasted dark coffee undertones',
  'mulato': 'matte brownish-black coat with roasted dark coffee undertones',
  'negro': 'solid deep black Spanish fighting bull coat',
  'colorado': 'rich reddish-brown coat with natural variation in tone',
  'colorado encendido': 'bright vibrant flame-reddish chestnut coat',
  'colorado melocotón': 'warm golden peach-toned reddish coat',
  'colorado melocoton': 'warm golden peach-toned reddish coat',
  'colorado avinagrado': 'deep sour reddish-brown coat with dark wine and purplish undertones',
  'avinagrado': 'deep sour reddish-brown coat with dark wine and purplish undertones',
  'colorado anteado': 'tawny light-reddish brown coat',
  'castaño': 'dark brown chestnut coat with slightly darker head and extremities',
  'castano': 'dark brown chestnut coat with slightly darker head and extremities',
  'castaño oscuro': 'deep rich mahogany dark chestnut coat',
  'castaño claro': 'warm golden chestnut brown coat',
  'retinto': 'dark reddish-brown to almost black coat, with darker neck, head and extremities',
  'cárdeno': 'grey coat formed by a fine mixture of black and white hairs, producing a mottled silvery grey appearance',
  'cardeno': 'grey coat formed by a fine mixture of black and white hairs, producing a mottled silvery grey appearance',
  'cárdeno claro': 'light silvery grey coat with predominant white hairs intermingled with fine black hairs',
  'cárdeno oscuro': 'deep dark slate charcoal grey coat with intermingled black and white hairs',
  'cárdeno salpicado': 'silvery cardeno coat with contrasting speckles and splashes',
  'ensabanado': 'predominantly clean white coat with very limited darker pigmentation on hooves and muzzle',
  'jabonero': 'light creamy or pale beige ivory coat',
  'jabonero claro': 'very pale creamy ivory white coat with darker points',
  'jabonero sucio': 'straw-colored yellowish beige coat with darker face and legs',
  'ratonero': 'greyish mouse-colored ash coat with darker neck and head pigmentation',
  'salinero': 'mixed coat combining reddish and white hairs in a roan blend',
  'sardo': 'mixed reddish, black and white coat producing a complex mottled speckled appearance',
  'berrendo en negro': 'white base coat with clearly defined large black patches',
  'berrendo en colorado': 'white base coat with clearly defined reddish-brown patches',
  'berrendo en cárdeno': 'white base coat with clearly defined greyish cardeno patches',
  'berrendo en castaño': 'white base coat with clearly defined chestnut patches',
  'berrendo': 'white base coat with clearly defined darker patches across the flanks',
  'albahío': 'very pale cream or yellowish-white straw coat',
  'albahio': 'very pale cream or yellowish-white straw coat',
  'barroso': 'muddy brown or grey-brown earthy coat',
  'tostado': 'very dark brown roasted-coffee coat with dark extremities',
  'melocotón': 'warm golden peach-toned coat',
  'melocoton': 'warm golden peach-toned coat',
};

/**
 * ACCIDENTALES (MARKINGS) TRANSLATION DICTIONARY
 */
export const MARKINGS_PROMPT_MAP: Record<string, string> = {
  careto: 'distinctive white marking covering the face, contrasting clearly against the surrounding coat',
  lucero: 'small clearly defined white diamond or round marking on the forehead',
  estrellado: 'larger irregular star-shaped white forehead marking',
  bociblanco: 'white coloration around the muzzle and lips',
  bocinegro: 'dark/black coloration around the muzzle contrasting with a lighter surrounding coat',
  bragado: 'white coloration extending across the underside of the abdomen',
  meano: 'small white marking around the genital and under-tail area',
  calcetero: 'white lower portions of the legs resembling white socks',
  botinero: 'distinctive darker black coloration around the lower legs and feet',
  listón: 'narrow white or lighter stripe running along the dorsal spine line',
  liston: 'narrow white or lighter stripe running along the dorsal spine line',
  chorreado: 'vertical dark streaking drip pattern running down across the flanks and ribs',
  burraco: 'irregular scattered white hairs and patches distributed through the darker coat',
  nevado: 'small scattered white hairs producing a snow-like speckled appearance',
  salpicado: 'irregular small patches or splashes of contrasting coloration across the body',
  gargantillo: 'white band wrapping around the lower neck like a collar',
  'ojo de perdiz': 'reddish or lighter ring encircling the eyes',
  lordo: 'yellowish or lighter belly and flank shading',
  albarrazado: 'speckled white spots across the body and flanks',
  girón: 'white patch on the lower flank near the groin',
  aldunudo: 'darker patches on the chest and shoulders',
  axiliblanco: 'white patches in the armpit areas behind the front legs',
  coliblanco: 'white tuft of hair at the end of the tail switch',
  corrido: 'continuous white line extending from abdomen to chest',
  apagado: 'muted low-contrast tone on the coat markings',
  capuchino: 'dark hooded coloration covering the head and upper neck',
  lomipardo: 'brownish-grey shading across the upper back and spine',
  ensillado: 'saddle-shaped lighter or darker patch across the back',
  rebozado: 'lighter muzzle and throat coloration',
};

/**
 * HORN DIRECTION TRANSLATION DICTIONARY
 */
export const HORN_DIRECTION_MAP: Record<string, string> = {
  corniveleto: 'authentic Corniveleto horns emerging outward from the base and curving vertically straight upward toward the sky like weather vanes (veletas)',
  cornigacho: 'authentic Cornigacho horns sloping steeply downward with the tips directed noticeably downward below the line of the head and ears',
  corniabierto: 'authentic Corniabierto horns extending widely outward to the sides with an expansive open separation between the palas',
  corniapretado: 'authentic Corniapretado horns with a narrow cradle, held tightly close together and pointing straight upward',
  cornivuelto: 'authentic Cornivuelto horns directed outward and forward then curving sharply upward and backward at the tips',
  corniavuelto: 'authentic Corniavuelto horns with a pronounced outward and forward thrust and tips curving upward and backward',
  brocho: 'authentic Brocho horns with compact inward configuration closing towards each other in an arched clasp/brooch shape',
  capacho: 'authentic Capacho horns emerging outward, curving downwards and slightly forwards forming a low wide open cradle basket shape',
  cubeto: 'authentic Cubeto horns curving deeply inward forming a closed arc towards each other with the sharp tips converging closely almost touching',
  cornalón: 'authentic Cornalón horns that are remarkably long, imposing, extending widely outward and curving upward with massive span',
  cornalon: 'authentic Cornalón horns that are remarkably long, imposing, extending widely outward and curving upward with massive span',
  cornidelantero: 'horns thrusting and directed straight horizontally forward in front of the head in an alert attack stance',
  playero: 'horns pointing very flat and widely outward to the sides',
  alirredondo: 'horns forming a wide rounded circular arch outwards',
  pando: 'horns curving gently forward and inward',
  tocado: 'one horn slightly deviating from the standard horizontal plane',
};

/**
 * HORN SYMMETRY TRANSLATION DICTIONARY
 */
export const HORN_SYMMETRY_MAP: Record<string, string> = {
  simétrica: 'both horns have approximately the same shape, length and symmetrical direction',
  simetrica: 'both horns have approximately the same shape, length and symmetrical direction',
  'bizco derecho': 'the right horn visibly differs in orientation from the left horn, visibly drooped or crooked downward asymmetrically',
  'bizco del derecho': 'the right horn visibly differs in orientation from the left horn, visibly drooped or crooked downward asymmetrically',
  'bizco izquierdo': 'the left horn visibly differs in orientation from the right horn, visibly drooped or crooked downward asymmetrically',
  'bizco del izquierdo': 'the left horn visibly differs in orientation from the right horn, visibly drooped or crooked downward asymmetrically',
  cornipaso: 'one horn pointing forward and one pointing upward',
};

/**
 * HORN LENGTH TRANSLATION DICTIONARY
 */
export const HORN_LENGTH_MAP: Record<string, string> = {
  corta: 'short horns',
  media: 'medium-length proportioned horns',
  larga: 'long extended prominent horns',
};

/**
 * HORN THICKNESS TRANSLATION DICTIONARY
 */
export const HORN_THICKNESS_MAP: Record<string, string> = {
  astifino: 'thin, elegant and relatively narrow sharp horns (astifino)',
  medio: 'medium-thickness solid horns',
  astigordo: 'thick, robust, heavy-calibered and substantial horns (astigordo)',
};

/**
 * HORN CONDITION TRANSLATION DICTIONARY
 */
export const HORN_CONDITION_MAP: Record<string, string> = {
  íntegro: 'both horns are complete, intact and undamaged with sharp black tips',
  integro: 'both horns are complete, intact and undamaged with sharp black tips',
  astillado: 'horn with visible small splintering damage at the tip',
  escobillado: 'horn tip with a rough frayed broom-like appearance from impact',
  mogón: 'one horn visibly blunted, rounded or shortened at the tip',
  mogon: 'one horn visibly blunted, rounded or shortened at the tip',
  despitonado: 'horn with visibly broken or chipped off tip',
};

/**
 * Build dynamic prompt strictly respecting user specifications
 */
export function buildAnimalGeminiPrompt(params: {
  sex: AnimalSex;
  ageYears: number;
  coat: string;
  markings?: string[];
  horn: HornData;
  morphology?: MorphologyData;
  name?: string;
}): string {
  const { sex, ageYears, coat, markings = [], horn, morphology, name } = params;

  // 1. Base Prompt
  const basePrompt = 'Create a realistic Spanish fighting bull for a management simulation game. This is a UNIQUE individual animal.';

  // 2. Sex Prompt
  const sexPrompt =
    sex === 'vaca'
      ? 'Sex: Female Spanish fighting cow (vaca brava de vientre)'
      : 'Sex: Male Spanish fighting bull (toro bravo de lidia)';

  // 3. Age & Physical Development Prompt
  let agePrompt = '';
  let physicalDevelopmentPrompt = '';

  if (ageYears === 0) {
    agePrompt = 'Age: 0 years old (Becerro / young calf)';
    physicalDevelopmentPrompt = 'Physical development: Young small Spanish fighting calf with immature proportions, smaller body mass, soft juvenile coat, undeveloped musculature and small budding horn points barely emerging on the forehead.';
  } else if (ageYears === 1) {
    agePrompt = 'Age: 1 year old (Añojo / choto)';
    physicalDevelopmentPrompt = 'Physical development: Agile young developing animal with lean juvenile frame, developing neck, and small sharp horns pointing upwards.';
  } else if (ageYears >= 2 && ageYears < 4) {
    agePrompt = `Age: ${ageYears} years old (Novillo / utrero)`;
    physicalDevelopmentPrompt = 'Physical development: Developing muscular body, growing morrillo hump on the neck, wide chest, strong limbs and well-developed horns with clear direction.';
  } else if (ageYears === 4) {
    agePrompt = 'Age: 4 years old (Toro cuatreño adult)';
    physicalDevelopmentPrompt = 'Physical development: Fully mature Spanish fighting bull with a powerful muscular body, broad deep chest, developed muscular neck with prominent morrillo hump, formidable trapío and mature sharp horns.';
  } else {
    agePrompt = `Age: ${ageYears} years old (Toro cinqueño veteran adult)`;
    physicalDevelopmentPrompt = 'Physical development: Imposing veteran adult fighting bull of immense power, heavy muscular mass, deep ribcage, prominent morrillo hump, thick neck and fully hardened formidable horns.';
  }

  // 4. Coat Prompt
  const coatKey = coat.toLowerCase().trim();
  const coatDesc = COAT_PROMPT_MAP[coatKey] || `natural ${coat} coat with authentic shading`;
  const coatPrompt = `Coat: ${coat} (${coatDesc})`;

  // 5. Markings (Accidentales) Prompt
  let markingsPrompt = 'Markings: None (clean solid coat)';
  if (markings && markings.length > 0) {
    const markingDescriptions = markings
      .map((m) => {
        const k = m.toLowerCase().trim();
        return `${m}: ${MARKINGS_PROMPT_MAP[k] || m}`;
      })
      .join('; ');
    markingsPrompt = `Markings: ${markingDescriptions}`;
  }

  // 6. Horn Configuration Prompt
  const hornDirKey = (horn?.direction || 'corniveleto').toLowerCase().trim();
  const hornSymKey = (horn?.symmetry || 'simétrica').toLowerCase().trim();
  const hornLenKey = (horn?.length || 'media').toLowerCase().trim();
  const hornThickKey = (horn?.thickness || 'medio').toLowerCase().trim();
  const hornCondKey = (horn?.state || 'íntegro').toLowerCase().trim();

  const dirDesc = HORN_DIRECTION_MAP[hornDirKey] || horn.direction;
  const symDesc = HORN_SYMMETRY_MAP[hornSymKey] || horn.symmetry;
  const lenDesc = HORN_LENGTH_MAP[hornLenKey] || horn.length;
  const thickDesc = HORN_THICKNESS_MAP[hornThickKey] || horn.thickness;
  const condDesc = HORN_CONDITION_MAP[hornCondKey] || horn.state;

  const hornPrompt = `Horn configuration: ${lenDesc}, ${thickDesc}, ${dirDesc}, ${symDesc}, ${condDesc}`;

  // 7. Body Morphology Prompt
  let morphologyPrompt = 'Body morphology: Balanced harmonious Spanish fighting bull morphology, athletic build, deep chest, firm legs and noble head.';
  if (morphology) {
    const corpulenceWord = morphology.corpulence > 70 ? 'heavy and massive' : morphology.corpulence < 40 ? 'lean and agile' : 'well-proportioned';
    const chestWord = morphology.chest > 70 ? 'very wide and deep chest' : 'standard strong chest';
    const morrilloWord = morphology.morrillo > 70 ? 'large prominent muscular morrillo hump' : 'well-defined morrillo';
    morphologyPrompt = `Body morphology: ${corpulenceWord} body, ${chestWord}, ${morrilloWord}, strong and alert stance.`;
  }

  // 8. Quality & Strict Output Guidance
  const guidancePrompt = `The animal must clearly and accurately display every selected characteristic.
The coat color and markings must be clearly visible.
The horn configuration must be anatomically coherent and clearly visible.
The animal must look like a real Spanish fighting bull (toro de lidia), not a generic domestic cattle breed.

Full body visible.
Front three-quarter view.
Both horns clearly visible.
Neutral standing pose in a Spanish dehesa pasture with distant holm oak trees.
Natural anatomy.
Realistic proportions.
High-detail realistic photography.
Natural warm golden lighting.
Clean background suitable for a management videogame.

Do not add characteristics that were not selected.
Do not change the selected coat.
Do not change the selected markings.
Do not change the selected horn configuration.
Do not create random additional horns or markings.`;

  // Combine into single dynamic prompt
  return [
    basePrompt,
    name ? `Animal Name: "${name}"` : '',
    sexPrompt,
    agePrompt,
    physicalDevelopmentPrompt,
    coatPrompt,
    markingsPrompt,
    hornPrompt,
    morphologyPrompt,
    guidancePrompt,
  ]
    .filter(Boolean)
    .join('\n\n');
}
