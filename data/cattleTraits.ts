export interface CoatOption {
  id: string;
  name: string;
  category: 'Negros' | 'Colorados y Castaños' | 'Cárdenos y Grises' | 'Jaboneros y Claros' | 'Pintos y Manchados';
  description: string;
  hexPrimary: string;
  hexSecondary?: string;
  rarity: 'comun' | 'poco_comun' | 'raro' | 'excepcional';
}

export const COAT_CATALOG: CoatOption[] = [
  // Negros
  { id: 'negro', name: 'Negro', category: 'Negros', description: 'Pelaje negro uniforme tradicional.', hexPrimary: '#1a1a1a', rarity: 'comun' },
  { id: 'negro_zaino', name: 'Negro Zaíno', category: 'Negros', description: 'Negro puro absoluto sin un solo pelo de otro color.', hexPrimary: '#0f0f11', rarity: 'poco_comun' },
  { id: 'azabache', name: 'Azabache', category: 'Negros', description: 'Negro con un lustre y brillo azulado muy vivo.', hexPrimary: '#141724', rarity: 'poco_comun' },
  { id: 'mulato', name: 'Mulato', category: 'Negros', description: 'Negro pardo o mate, color café tostado oscuro.', hexPrimary: '#2d2421', rarity: 'comun' },

  // Colorados y Castaños
  { id: 'colorado', name: 'Colorado', category: 'Colorados y Castaños', description: 'Rojo rojizo brillante en todo el cuerpo.', hexPrimary: '#8b2e1f', rarity: 'comun' },
  { id: 'colorado_melocoton', name: 'Colorado Melocotón', category: 'Colorados y Castaños', description: 'Colorado claro suave con tonalidades doradas y acarameladas.', hexPrimary: '#b85c37', rarity: 'poco_comun' },
  { id: 'colorado_avinagrado', name: 'Colorado Avinagrado', category: 'Colorados y Castaños', description: 'Colorado oscuro con tonalidades vinosas y rojizas agrias profundas.', hexPrimary: '#63251e', rarity: 'poco_comun' },
  { id: 'colorado_encendido', name: 'Colorado Encendido', category: 'Colorados y Castaños', description: 'Rojo fuego intenso y encendido muy vivo.', hexPrimary: '#a82c1b', rarity: 'poco_comun' },
  { id: 'castano', name: 'Castaño', category: 'Colorados y Castaños', description: 'Pardo rojizo como la castaña madura con cabos negros.', hexPrimary: '#663926', rarity: 'comun' },
  { id: 'retinto', name: 'Retinto', category: 'Colorados y Castaños', description: 'Colorado muy oscuro, casi quemado o aceitunado.', hexPrimary: '#4d2319', rarity: 'poco_comun' },
  { id: 'tostado', name: 'Tostado', category: 'Colorados y Castaños', description: 'Pardo muy oscuro con reflejos terrosos.', hexPrimary: '#382b24', rarity: 'comun' },

  // Cárdenos y Grises
  { id: 'cardeno', name: 'Cárdeno', category: 'Cárdenos y Grises', description: 'Mezcla íntima de pelos blancos y negros que dan tono gris pizarra.', hexPrimary: '#575c63', rarity: 'poco_comun' },
  { id: 'cardeno_claro', name: 'Cárdeno Claro', category: 'Cárdenos y Grises', description: 'Cárdeno con predominio de pelos blancos cenicientos.', hexPrimary: '#888e96', rarity: 'raro' },
  { id: 'cardeno_oscuro', name: 'Cárdeno Oscuro', category: 'Cárdenos y Grises', description: 'Cárdeno casi plomizo o azulado muy oscuro.', hexPrimary: '#3a3f47', rarity: 'poco_comun' },
  { id: 'entrepelado', name: 'Entrepelado', category: 'Cárdenos y Grises', description: 'Capa negra con pelos blancos diseminados ligeramente.', hexPrimary: '#292b30', rarity: 'poco_comun' },
  { id: 'salinero', name: 'Salinero', category: 'Cárdenos y Grises', description: 'Mezcla de pelos blancos y colorados en proporción.', hexPrimary: '#995a4d', rarity: 'raro' },

  // Jaboneros y Claros
  { id: 'jabonero', name: 'Jabonero', category: 'Jaboneros y Claros', description: 'Tono crema o café con leche claro muy cotizado.', hexPrimary: '#d8c49d', rarity: 'raro' },
  { id: 'jabonero_sucio', name: 'Jabonero Sucio', category: 'Jaboneros y Claros', description: 'Jabonero con tonalidades grisáceas en el lomo y cuello.', hexPrimary: '#bfa782', rarity: 'raro' },
  { id: 'albahio', name: 'Albahío', category: 'Jaboneros y Claros', description: 'Amarillo paja muy claro, casi pajizo crema.', hexPrimary: '#e8dcba', rarity: 'excepcional' },
  { id: 'ensabanado', name: 'Ensabanado', category: 'Jaboneros y Claros', description: 'Blanco total como una sábana, de gran pureza visual.', hexPrimary: '#e8e8e5', rarity: 'excepcional' },
  { id: 'barroso', name: 'Barroso', category: 'Jaboneros y Claros', description: 'Color tierra arcillosa amarillenta clara.', hexPrimary: '#b89f78', rarity: 'raro' },

  // Pintos y Manchados
  { id: 'berrendo_negro', name: 'Berrendo en Negro', category: 'Pintos y Manchados', description: 'Cuerpo blanco con grandes manchas negras bien definidas.', hexPrimary: '#d5d5d8', hexSecondary: '#1a1a1a', rarity: 'raro' },
  { id: 'berrendo_colorado', name: 'Berrendo en Colorado', category: 'Pintos y Manchados', description: 'Cuerpo blanco con manchas coloradas vivas.', hexPrimary: '#d5d5d8', hexSecondary: '#993322', rarity: 'raro' },
  { id: 'berrendo_cardeno', name: 'Berrendo en Cárdeno', category: 'Pintos y Manchados', description: 'Cuerpo blanco con manchas cárdenas salpicadas.', hexPrimary: '#d5d5d8', hexSecondary: '#5a626d', rarity: 'excepcional' },
  { id: 'sardo', name: 'Sardo', category: 'Pintos y Manchados', description: 'Mezcla de pelos blancos, negros y colorados juntos.', hexPrimary: '#6f5348', rarity: 'excepcional' },
  { id: 'ratonero', name: 'Ratonero', category: 'Pintos y Manchados', description: 'Grisáceo apagado tipo pelo de ratón con morro oscuro.', hexPrimary: '#6e6b66', rarity: 'raro' },
];

export interface MarkingOption {
  id: string;
  name: string;
  region: 'Cabeza' | 'Tronco' | 'Extremidades' | 'Vientre';
  description: string;
}

export const MARKINGS_CATALOG: MarkingOption[] = [
  // Cabeza
  { id: 'careto', name: 'Careto', region: 'Cabeza', description: 'Cara blanca destacando sobre capa oscura.' },
  { id: 'lucero', name: 'Lucero', region: 'Cabeza', description: 'Mancha blanca en forma de estrella o luna en la frente.' },
  { id: 'estrellado', name: 'Estrellado', region: 'Cabeza', description: 'Pequeño lucero irregular en la testuz.' },
  { id: 'caribello', name: 'Caribello', region: 'Cabeza', description: 'Pelos blancos salpicados por la cara sin mancha fija.' },
  { id: 'carinegro', name: 'Carinegro', region: 'Cabeza', description: 'Cara negra en un animal de capa más clara.' },
  { id: 'bociblanco', name: 'Bociblanco', region: 'Cabeza', description: 'Hocico bordeado de color blanco.' },
  { id: 'bocinegro', name: 'Bocinegro', region: 'Cabeza', description: 'Hocico rodeado de color negro intenso.' },
  { id: 'ojinegro', name: 'Ojinegro', region: 'Cabeza', description: 'Manchas negras alrededor de los ojos.' },
  { id: 'ojo_perdiz', name: 'Ojo de Perdiz', region: 'Cabeza', description: 'Círculo rojizo rodeando el ojo.' },
  { id: 'gargantillo', name: 'Gargantillo', region: 'Cabeza', description: 'Collar o mancha blanca alrededor del cuello.' },
  { id: 'capirote', name: 'Capirote', region: 'Cabeza', description: 'Cabeza y cuello de color distinto al resto del cuerpo.' },
  { id: 'facado', name: 'Facado', region: 'Cabeza', description: 'Línea blanca fina que parece un corte o tajazo en la cara.' },

  // Tronco
  { id: 'bragado', name: 'Bragado', region: 'Tronco', description: 'Mancha blanca en la entrepierna o vientre.' },
  { id: 'meano', name: 'Meano', region: 'Tronco', description: 'Mancha blanca en el prepucio o bragadas altas.' },
  { id: 'liston', name: 'Listón', region: 'Tronco', description: 'Franja de pelo de distinto color a lo largo del lomo.' },
  { id: 'chorreado', name: 'Chorreado', region: 'Tronco', description: 'Franjas verticales oscuras o claras como chorreones.' },
  { id: 'burraco', name: 'Burraco', region: 'Tronco', description: 'Manchas blancas irregulares en la parte inferior del cuerpo.' },
  { id: 'salpicado', name: 'Salpicado', region: 'Tronco', description: 'Pequeñas gotas o motas de color blanco salpicadas.' },
  { id: 'nevado', name: 'Nevado', region: 'Tronco', description: 'Pelos blancos que simulan una fina nevada sobre el lomo.' },
  { id: 'remendado', name: 'Remendado', region: 'Tronco', description: 'Manchas de color superpuestas como parches.' },

  // Extremidades y Cola
  { id: 'calcetero', name: 'Calcetero', region: 'Extremidades', description: 'Extremidades con calzado blanco alto.' },
  { id: 'botinero', name: 'Botinero', region: 'Extremidades', description: 'Pezuñas y cañas con coloración oscura como botas.' },
  { id: 'coliblanco', name: 'Coliblanco', region: 'Extremidades', description: 'Borlón de la cola de color blanco.' },
  { id: 'rabicano', name: 'Rabicano', region: 'Extremidades', description: 'Pelos blancos entremezclados en el maslo de la cola.' },
];

export const HORN_DIRECTIONS = [
  { id: 'corniveleto', name: 'Corniveleto', desc: 'Pitones rectos y erguidos apuntando hacia el cielo como veletas' },
  { id: 'cornigacho', name: 'Cornigacho', desc: 'Pitones notablemente caídos hacia abajo por debajo de la testuz' },
  { id: 'corniabierto', name: 'Corniabierto', desc: 'Pitones abiertos ampliamente hacia los lados con gran separación de cuna' },
  { id: 'corniapretado', name: 'Corniapretado', desc: 'Pitones de cuna estrecha, juntos y dirigidos hacia arriba' },
  { id: 'cornivuelto', name: 'Cornivuelto', desc: 'Pitones dirigidos hacia adelante y curvados hacia arriba y atrás' },
  { id: 'corniavuelto', name: 'Corniavuelto', desc: 'Pitones con marcada vuelta hacia adelante y hacia atrás en las puntas' },
  { id: 'brocho', name: 'Brocho', desc: 'Pitones cortos curvados hacia adentro cerrando en forma de broche' },
  { id: 'capacho', name: 'Capacho', desc: 'Pitones abiertos y curvados hacia abajo y adelante formando una pala o cesto' },
  { id: 'cubeto', name: 'Cubeto', desc: 'Pitones curvados hacia adentro con puntas muy convergentes que casi se tocan' },
  { id: 'cornalon', name: 'Cornalón', desc: 'Cornamenta de gran envergadura y longitud desmesurada' },
];

export const HORN_SYMMETRIES = [
  { id: 'simetrica', name: 'Simétrica', desc: 'Ambos pitones iguales en altura, curvatura y longitud' },
  { id: 'bizco_derecho', name: 'Bizco del Derecho', desc: 'Asimetría con el pitón derecho caído o más bajo que el izquierdo' },
  { id: 'bizco_izquierdo', name: 'Bizco del Izquierdo', desc: 'Asimetría con el pitón izquierdo caído o más bajo que el derecho' },
];

export const HORN_LENGTHS = [
  { id: 'corta', name: 'Corta' },
  { id: 'media', name: 'Media' },
  { id: 'larga', name: 'Larga' },
];

export const HORN_THICKNESSES = [
  { id: 'astifino', name: 'Astifino', desc: 'Puntas aguzadas y afiladas' },
  { id: 'medio', name: 'Medio', desc: 'Grosor estándar bien proporcionado' },
  { id: 'astigordo', name: 'Astigordo', desc: 'Mazorca y caña muy gruesa' },
];

export const HORN_STATES = [
  { id: 'integro', name: 'Íntegro', desc: 'Pitones intactos de fábrica' },
  { id: 'astillado', name: 'Astillado', desc: 'Leve astilla en la punta' },
  { id: 'escobillado', name: 'Escobillado', desc: 'Puntas desgastadas en escobilla' },
  { id: 'mogon', name: 'Mogón', desc: 'Punta roma por golpe en los corrales' },
  { id: 'despitonado', name: 'Despitonado', desc: 'Falta un pitón por remate fuerte' },
];

export const MALE_NAMES: string[] = [
  'Valiente', 'Fuego Negro', 'Espejito', 'Barbián', 'Cantinero', 'Maletilla', 'Campanero', 'Guerrero',
  'Jabonero', 'Zafiro', 'Gran Duque', 'Almirante', 'Bravucón', 'Capitán', 'Embajador', 'Centinela',
  'Huracán', 'Relámpago', 'Matajacas', 'Pajarito', 'Cuchillero', 'Batanero', 'Dormilón', 'Flamenco',
  'Navajito', 'Burlador', 'Peligroso', 'Pocaspulgas', 'Toreador', 'Gavilán', 'Mosquetero', 'Lidiador',
  'Cariñoso', 'Azafrán', 'Rompedor', 'Orgulloso', 'Soberano', 'Monarca', 'Traidor', 'Vengador',
  'Cobijero', 'Fandanguero', 'Macareno', 'Bandolero', 'Desalmado', 'Gitano', 'Temerario', 'Correcaminos',
  'Cazador', 'Arrogante', 'Pescador', 'Volador', 'Presumido', 'Clavelito', 'Ramillete', 'Trompetero',
  'Tragabuches', 'Curioso', 'Llavero', 'Diamante', 'Centella', 'Culebrito', 'Estudiante', 'Jerezano',
];

export const FEMALE_NAMES: string[] = [
  'Mariposa', 'Campanera', 'Baronesa', 'Centinela', 'Romera', 'Gitanilla', 'Hechicera', 'Bulería',
  'Amparito', 'Cariñosa', 'Perla Negra', 'Esmeralda', 'Paloma', 'Albahaca', 'Jardinera', 'Flor de Jara',
  'Madrileña', 'Sevillana', 'Cordobesa', 'Gaviota', 'Pastora', 'Triana', 'Serranilla', 'Macarena',
  'Zíngara', 'Cantaora', 'Esperanza', 'Princesa', 'Guapina', 'Trianera', 'Salinera', 'Milenaria',
  'Castañuela', 'Flor de Loto', 'Luz del Alba', 'Flamenca', 'Primorosa', 'Soñadora', 'Rociera', 'Caramela',
  'Bravía', 'Bandolera', 'Alborada', 'Navarra', 'Manzanilla', 'Pandereta', 'Chulapa', 'Duquesa',
];
