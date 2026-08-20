import imgCria from '../assets/images/cria_becerro_1787169081743.jpg';
import imgChoto from '../assets/images/choto_eral_1787169097633.jpg';
import imgNovillo from '../assets/images/novillo_utrero_1787169110614.jpg';
import imgNegro from '../assets/images/toro_negro_zaino_1787168521945.jpg';
import imgCardeno from '../assets/images/toro_cardeno_1787168536000.jpg';
import imgCastano from '../assets/images/toro_castano_1787168546790.jpg';
import imgJabonero from '../assets/images/toro_jabonero_1787168557696.jpg';
import imgVaca from '../assets/images/vaca_brava_1787168569000.jpg';

// Specialized Horn Types Images
import imgCorniveleto from '../assets/images/toro_negro_veleto_proporcionado_1787212405502.jpg';
import imgCornigacho from '../assets/images/toro_cornigacho_1787169782410.jpg';
import imgCorniabierto from '../assets/images/toro_corniabierto_1787169793826.jpg';
import imgBrocho from '../assets/images/toro_brocho_1787169804493.jpg';
import imgDelantero from '../assets/images/toro_delantero_1787169815488.jpg';
import imgBizco from '../assets/images/toro_bizco_1787169825980.jpg';

// Newly added PDF Encornaduras reference images
import imgCapacho from '../assets/images/toro_negro_capacho_1787214135640.jpg';
import imgCubeto from '../assets/images/toro_negro_cubeto_1787214154304.jpg';
import imgCornalon from '../assets/images/toro_negro_cornalon_1787214175898.jpg';
import imgCorniapretado from '../assets/images/toro_negro_corniapretado_1787214197180.jpg';
import imgCardenoCornivuelto from '../assets/images/toro_cardeno_cornivuelto_1787214214199.jpg';
import imgBizcoDerecho from '../assets/images/toro_bizco_derecho_1787214234249.jpg';
import imgBizcoIzquierdo from '../assets/images/toro_bizco_izquierdo_1787214257066.jpg';
import imgColoradoCapacho from '../assets/images/toro_colorado_capacho_1787214278580.jpg';
import imgColoradoCornalon from '../assets/images/toro_colorado_cornalon_1787214297330.jpg';

// PDF Pelajes Negros & Colorados Specialized Images
import imgNegroMulato from '../assets/images/toro_negro_mulato_1787214852055.jpg';
import imgNegroAzabache from '../assets/images/toro_negro_azabache_1787214864024.jpg';
import imgColoradoMelocoton from '../assets/images/toro_colorado_melocoton_1787214877394.jpg';
import imgColoradoAvinagrado from '../assets/images/toro_colorado_avinagrado_1787214888636.jpg';
import imgColoradoEncendido from '../assets/images/toro_colorado_encendido_1787214905962.jpg';
import imgNegroMulatoGacho from '../assets/images/toro_negro_mulato_gacho_1787214921584.jpg';
import imgColoradoMelocotonCubeto from '../assets/images/toro_colorado_melocoton_cubeto_1787214935140.jpg';
import imgColoradoAvinagradoCornivuelto from '../assets/images/toro_colorado_avinagrado_cornivuelto_1787214950511.jpg';

// Specialized Coat Types Images
import imgColoradoRetinto from '../assets/images/toro_colorado_retinto_1787170634540.jpg';
import imgCardenoClaro from '../assets/images/toro_cardeno_claro_1787170648024.jpg';
import imgJaboneroCrema from '../assets/images/toro_jabonero_crema_1787170671706.jpg';
import imgBerrendoColorado from '../assets/images/toro_berrendo_colorado_1787170685670.jpg';
import imgBerrendoNegro from '../assets/images/toro_berrendo_negro_1787170698162.jpg';
import imgEnsabanado from '../assets/images/toro_ensabanado_blanco_1787170712684.jpg';

// Specialized Coat + Horn Types Images
import imgColoradoCorniveleto from '../assets/images/toro_colorado_veleto_proporcionado_1787212425760.jpg';
import imgColoradoCornigacho from '../assets/images/toro_colorado_cornigacho_1787172540641.jpg';
import imgColoradoCorniabierto from '../assets/images/toro_colorado_corniabierto_1787172554211.jpg';
import imgColoradoBrocho from '../assets/images/toro_colorado_brocho_1787172567204.jpg';
import imgColoradoBizco from '../assets/images/toro_colorado_bizco_1787172579151.jpg';
import imgCardenoCorniveleto from '../assets/images/toro_cardeno_veleto_proporcionado_1787212440012.jpg';
import imgCardenoCornigacho from '../assets/images/toro_cardeno_cornigacho_1787172592267.jpg';
import imgJaboneroCorniveleto from '../assets/images/toro_jabonero_veleto_proporcionado_1787212457540.jpg';
import imgJaboneroCornigacho from '../assets/images/toro_jabonero_cornigacho_1787172609984.jpg';
import imgEnsabanadoCorniveleto from '../assets/images/toro_ensabanado_veleto_proporcionado_1787212470754.jpg';
import imgBerrendoCorniveleto from '../assets/images/toro_berrendo_veleto_proporcionado_1787212483811.jpg';
import imgJaboneroCorniabierto from '../assets/images/toro_jabonero_corniabierto_1787215557863.jpg';
import imgCardenoCorniabierto from '../assets/images/toro_cardeno_corniabierto_1787216329949.jpg';

export interface BullRealisticImage {
  url: string;
  label: string;
  stageTitle: string;
  description: string;
  tag: string;
}

export const REALISTIC_BULL_IMAGES = {
  cria: {
    url: imgCria,
    label: 'Cría / Becerro (0 años)',
    stageTitle: 'Becerro Lactante / Destetado (0 Años)',
    description: 'Cría recién nacida con brotes incipientes de pitones y genética fijada desde el nacimiento.',
    tag: 'Cría de Dehesa • 0 Años',
  },
  choto: {
    url: imgChoto,
    label: 'Añojo / Choto (1 año)',
    stageTitle: 'Añojo / Choto (1 Año)',
    description: 'Ejemplar de un año con pitones despuntando hacia arriba y figura ágil en crecimiento.',
    tag: 'Añojo • 1 Año',
  },
  novillo: {
    url: imgNovillo,
    label: 'Novillo / Utrero (2-3 años)',
    stageTitle: 'Novillo / Utrero (2-3 Años)',
    description: 'Novillo armado con encornadura desarrollada y musculatura en plena definición.',
    tag: 'Novillo / Utrero • 2-3 Años',
  },

  // NEGROS POR CORNAMENTA (PDF REFERENCIAS COMPLETAS)
  negro_mulato: {
    url: imgNegroMulato,
    label: 'Toro Negro Mulato (4+ años)',
    stageTitle: 'Negro Mulato • Corniabierto',
    description: 'Pelaje negro pardusco mate con tonalidades café tostado y pitones abiertos.',
    tag: 'Toro • Negro Mulato',
  },
  negro_mulato_gacho: {
    url: imgNegroMulatoGacho,
    label: 'Toro Negro Mulato Cornigacho (4+ años)',
    stageTitle: 'Negro Mulato • Cornigacho',
    description: 'Pelaje negro mate tostado con pitones caídos por debajo de la testuz.',
    tag: 'Toro Mulato • Cornigacho',
  },
  negro_azabache: {
    url: imgNegroAzabache,
    label: 'Toro Negro Azabache (4+ años)',
    stageTitle: 'Negro Azabache • Corniveleto',
    description: 'Negro lustroso acharolado de brillante estampa al sol con pitones veletos rectos.',
    tag: 'Toro • Negro Azabache',
  },
  corniveleto: {
    url: imgCorniveleto,
    label: 'Toro Negro Corniveleto (4+ años)',
    stageTitle: 'Negro Zaíno • Corniveleto',
    description: 'Pitones altos y apuntando directamente hacia el cielo como veletas, con gran respeto y trapío.',
    tag: 'Toro Negro • Corniveleto',
  },
  cornigacho: {
    url: imgCornigacho,
    label: 'Toro Negro Cornigacho (4+ años)',
    stageTitle: 'Negro Zaíno • Cornigacho',
    description: 'Pitones que caen notablemente hacia abajo por debajo de la línea de la testuz.',
    tag: 'Toro Negro • Cornigacho',
  },
  corniabierto: {
    url: imgCorniabierto,
    label: 'Toro Negro Corniabierto / Playero (4+ años)',
    stageTitle: 'Negro Zaíno • Corniabierto',
    description: 'Pitones con amplia apertura horizontal hacia los lados, gran envergadura de cuna.',
    tag: 'Toro Negro • Corniabierto',
  },
  corniapretado: {
    url: imgCorniapretado,
    label: 'Toro Negro Corniapretado (4+ años)',
    stageTitle: 'Negro Zaíno • Corniapretado',
    description: 'Pitones de cuna estrecha, creciendo muy juntos y dirigidos rectos hacia arriba.',
    tag: 'Toro Negro • Corniapretado',
  },
  brocho: {
    url: imgBrocho,
    label: 'Toro Negro Brocho (4+ años)',
    stageTitle: 'Negro Zaíno • Brocho',
    description: 'Pitones curvados hacia el centro casi cerrándose en forma de broche.',
    tag: 'Toro Negro • Brocho',
  },
  capacho: {
    url: imgCapacho,
    label: 'Toro Negro Capacho (4+ años)',
    stageTitle: 'Negro Zaíno • Capacho',
    description: 'Pitones abiertos que caen hacia abajo y adelante formando una pala o cesto.',
    tag: 'Toro Negro • Capacho',
  },
  cubeto: {
    url: imgCubeto,
    label: 'Toro Negro Cubeto (4+ años)',
    stageTitle: 'Negro Zaíno • Cubeto',
    description: 'Pitones curvados hacia adentro con puntas muy convergentes que casi se tocan.',
    tag: 'Toro Negro • Cubeto',
  },
  cornalon: {
    url: imgCornalon,
    label: 'Toro Negro Cornalón (4+ años)',
    stageTitle: 'Negro Zaíno • Cornalón',
    description: 'Cornamenta desmesurada de enorme envergadura, longitud y desarrollo imponente.',
    tag: 'Toro Negro • Cornalón',
  },
  cornivuelto: {
    url: imgDelantero,
    label: 'Toro Negro Cornivuelto / Corniavuelto (4+ años)',
    stageTitle: 'Negro Zaíno • Cornivuelto',
    description: 'Pitones dirigidos hacia adelante y curvados hacia arriba y atrás en las puntas.',
    tag: 'Toro Negro • Cornivuelto',
  },
  cornidelantero: {
    url: imgDelantero,
    label: 'Toro Negro Cornidelantero (4+ años)',
    stageTitle: 'Negro Zaíno • Cornidelantero',
    description: 'Pitones dirigidos frontalmente hacia adelante en actitud de embestida agresiva.',
    tag: 'Toro Negro • Cornidelantero',
  },
  bizco_derecho: {
    url: imgBizcoDerecho,
    label: 'Toro Negro Bizco del Derecho (4+ años)',
    stageTitle: 'Negro Zaíno • Bizco Derecho',
    description: 'Asimetría marcada con el pitón derecho caído o más bajo que el izquierdo.',
    tag: 'Toro Negro • Bizco Derecho',
  },
  bizco_izquierdo: {
    url: imgBizcoIzquierdo,
    label: 'Toro Negro Bizco del Izquierdo (4+ años)',
    stageTitle: 'Negro Zaíno • Bizco Izquierdo',
    description: 'Asimetría marcada con el pitón izquierdo caído o más bajo que el derecho.',
    tag: 'Toro Negro • Bizco Izquierdo',
  },
  bizco: {
    url: imgBizco,
    label: 'Toro Negro Bizco (Asimétrico)',
    stageTitle: 'Negro Zaíno • Bizco Asimétrico',
    description: 'Pitones con asimetría marcada: un pitón recto y el otro caído o ladeado.',
    tag: 'Toro Negro • Bizco',
  },
  negro: {
    url: imgNegro,
    label: 'Toro Bravo Negro Zaíno (4+ años)',
    stageTitle: 'Cuatreño / Cinqueño Adulto (4+ Años)',
    description: 'Toro adulto rematado, corniveleto astifino con morrillo prominente y gran trapío.',
    tag: 'Toro Adulto • Negro Zaíno',
  },

  // COLORADOS POR CORNAMENTA
  colorado_melocoton: {
    url: imgColoradoMelocoton,
    label: 'Toro Colorado Melocotón Brocho (4+ años)',
    stageTitle: 'Colorado Melocotón • Brocho',
    description: 'Pelaje suave acaramelado melocotón con pitones curvados en broche hacia el interior.',
    tag: 'Toro • Colorado Melocotón',
  },
  colorado_melocoton_cubeto: {
    url: imgColoradoMelocotonCubeto,
    label: 'Toro Colorado Melocotón Cubeto (4+ años)',
    stageTitle: 'Colorado Melocotón • Cubeto',
    description: 'Pelaje melocotón claro con pitones convergentes que rodean la frente en arco cerrado.',
    tag: 'Toro Melocotón • Cubeto',
  },
  colorado_avinagrado: {
    url: imgColoradoAvinagrado,
    label: 'Toro Colorado Avinagrado Corniapretado (4+ años)',
    stageTitle: 'Colorado Avinagrado • Corniapretado',
    description: 'Tonalidad rojiza oscura agria y vinoso con pitones de cuna estrecha dirigidos hacia arriba.',
    tag: 'Toro • Colorado Avinagrado',
  },
  colorado_avinagrado_cornivuelto: {
    url: imgColoradoAvinagradoCornivuelto,
    label: 'Toro Colorado Avinagrado Cornivuelto (4+ años)',
    stageTitle: 'Colorado Avinagrado • Cornivuelto',
    description: 'Tonalidad vinosa con pitones proyectados hacia adelante con puntas vueltas hacia arriba y atrás.',
    tag: 'Toro Avinagrado • Cornivuelto',
  },
  colorado_encendido: {
    url: imgColoradoEncendido,
    label: 'Toro Colorado Encendido Cornalón (4+ años)',
    stageTitle: 'Colorado Encendido • Cornalón',
    description: 'Pelaje rojo fuego bermejo de gran viveza con cornamenta de desarrollo imponente.',
    tag: 'Toro • Colorado Encendido',
  },
  colorado_veleto: {
    url: imgColoradoCorniveleto,
    label: 'Toro Colorado Corniveleto (4+ años)',
    stageTitle: 'Colorado Retinto • Corniveleto',
    description: 'Pelaje rojo encendido brillante con pitones erguidos hacia arriba como veletas.',
    tag: 'Toro Colorado • Corniveleto',
  },
  colorado_gacho: {
    url: imgColoradoCornigacho,
    label: 'Toro Colorado Cornigacho (4+ años)',
    stageTitle: 'Colorado Retinto • Cornigacho',
    description: 'Pelaje colorado fuego con pitones caídos hacia abajo con gran seriedad.',
    tag: 'Toro Colorado • Cornigacho',
  },
  colorado_abierto: {
    url: imgColoradoCorniabierto,
    label: 'Toro Colorado Corniabierto (4+ años)',
    stageTitle: 'Colorado Retinto • Corniabierto',
    description: 'Pelaje colorado brillante con pitones abiertos ampliamente en cuna.',
    tag: 'Toro Colorado • Corniabierto',
  },
  colorado_brocho: {
    url: imgColoradoBrocho,
    label: 'Toro Colorado Brocho (4+ años)',
    stageTitle: 'Colorado Retinto • Brocho',
    description: 'Pelaje colorado caoba con pitones cerrados en curva hacia el centro.',
    tag: 'Toro Colorado • Brocho',
  },
  colorado_capacho: {
    url: imgColoradoCapacho,
    label: 'Toro Colorado Capacho (4+ años)',
    stageTitle: 'Colorado Retinto • Capacho',
    description: 'Pelaje colorado con pitones abiertos curvados hacia abajo y adelante en cesto.',
    tag: 'Toro Colorado • Capacho',
  },
  colorado_cornalon: {
    url: imgColoradoCornalon,
    label: 'Toro Colorado Cornalón (4+ años)',
    stageTitle: 'Colorado Retinto • Cornalón',
    description: 'Pelaje colorado con cornamenta de gran longitud, envergadura y apertura descomunal.',
    tag: 'Toro Colorado • Cornalón',
  },
  colorado_bizco: {
    url: imgColoradoBizco,
    label: 'Toro Colorado Bizco (4+ años)',
    stageTitle: 'Colorado Retinto • Bizco Asimétrico',
    description: 'Pelaje colorado con un pitón recto y otro caído con marcada asimetría.',
    tag: 'Toro Colorado • Bizco',
  },
  colorado_retinto: {
    url: imgColoradoRetinto,
    label: 'Toro Colorado Retinto (4+ años)',
    stageTitle: 'Colorado Retinto • Dehesa',
    description: 'Pelaje colorado oscuro tostado con gran fondo y seriedad de pitones.',
    tag: 'Toro Colorado • Retinto',
  },
  castano: {
    url: imgCastano,
    label: 'Toro Castaño (4+ años)',
    stageTitle: 'Castaño Oscuro • Dehesa',
    description: 'Pelaje castaño con tonalidades café y encornadura seria y armónica.',
    tag: 'Toro Castaño • Dehesa',
  },

  // CÁRDENOS POR CORNAMENTA
  cardeno_veleto: {
    url: imgCardenoCorniveleto,
    label: 'Toro Cárdeno Corniveleto (4+ años)',
    stageTitle: 'Cárdeno Pizarra • Corniveleto',
    description: 'Pelaje cárdeno salpicado con pitones altos y afilados apuntando verticalmente al cielo como veletas.',
    tag: 'Toro Cárdeno • Corniveleto',
  },
  cardeno_claro: {
    url: imgCardenoClaro,
    label: 'Toro Cárdeno Claro (4+ años)',
    stageTitle: 'Cárdeno Claro • Dehesa',
    description: 'Pelaje cárdeno claro con predominancia de pelos blancos sobre fondo ceniciento.',
    tag: 'Toro Cárdeno • Claro',
  },
  cardeno: {
    url: imgCardenoCorniveleto,
    label: 'Toro Cárdeno Salpicado (4+ años)',
    stageTitle: 'Cárdeno Pizarra • Corniveleto',
    description: 'Mezcla íntima de pelos blancos y negros cenicientos con gran estampa y encornadura veleta.',
    tag: 'Toro Cárdeno • Salpicado',
  },
  cardeno_gacho: {
    url: imgCardenoCornigacho,
    label: 'Toro Cárdeno Cornigacho (4+ años)',
    stageTitle: 'Cárdeno Pizarra • Cornigacho',
    description: 'Pelaje gris pizarra cárdeno con pitones caídos hacia abajo.',
    tag: 'Toro Cárdeno • Cornigacho',
  },
  cardeno_abierto: {
    url: imgCardenoCorniabierto,
    label: 'Toro Cárdeno Corniabierto (4+ años)',
    stageTitle: 'Cárdeno Pizarra • Corniabierto',
    description: 'Pelaje cárdeno salpicado con pitones ampliamente abiertos hacia los costados.',
    tag: 'Toro Cárdeno • Corniabierto',
  },
  cardeno_cornivuelto: {
    url: imgCardenoCornivuelto,
    label: 'Toro Cárdeno Cornivuelto (4+ años)',
    stageTitle: 'Cárdeno Pizarra • Cornivuelto',
    description: 'Pelaje gris pizarra con pitones dirigidos hacia adelante y curvados hacia arriba y atrás.',
    tag: 'Toro Cárdeno • Cornivuelto',
  },

  // JABONEROS POR CORNAMENTA
  jabonero_veleto: {
    url: imgJaboneroCorniveleto,
    label: 'Toro Jabonero Corniveleto (4+ años)',
    stageTitle: 'Jabonero Crema • Corniveleto',
    description: 'Tonalidad crema café-con-leche clara con pitones erguidos apuntando al cielo como veletas.',
    tag: 'Toro Jabonero • Corniveleto',
  },
  jabonero_crema: {
    url: imgJaboneroCrema,
    label: 'Toro Jabonero Crema (4+ años)',
    stageTitle: 'Jabonero Crema • Dehesa',
    description: 'Tonalidad crema pajizo limpia con pitones bien dirigidos y mirada alerta.',
    tag: 'Toro Jabonero • Crema',
  },
  jabonero: {
    url: imgJaboneroCorniveleto,
    label: 'Toro Jabonero / Albahío (4+ años)',
    stageTitle: 'Jabonero Crema • Corniveleto',
    description: 'Tonalidad crema café-con-leche clara muy cotizada con pitones altos y pezuñas oscuras.',
    tag: 'Toro Jabonero • Crema',
  },
  jabonero_gacho: {
    url: imgJaboneroCornigacho,
    label: 'Toro Jabonero Cornigacho (4+ años)',
    stageTitle: 'Jabonero Crema • Cornigacho',
    description: 'Pelaje crema pajizo con pitones caídos por debajo de la testuz.',
    tag: 'Toro Jabonero • Cornigacho',
  },
  jabonero_abierto: {
    url: imgJaboneroCorniabierto,
    label: 'Toro Jabonero Corniabierto (4+ años)',
    stageTitle: 'Jabonero Crema • Corniabierto',
    description: 'Pelaje crema pajizo con pitones abiertos de gran amplitud hacia los lados.',
    tag: 'Toro Jabonero • Corniabierto',
  },

  // OTROS PELAJES ESPECÍFICOS
  ensabanado_veleto: {
    url: imgEnsabanadoCorniveleto,
    label: 'Toro Bravo Ensabanado Corniveleto (4+ años)',
    stageTitle: 'Pelaje Ensabanado • Corniveleto',
    description: 'Pelaje blanco puro con pitones altos orientados verticalmente al cielo.',
    tag: 'Toro Ensabanado • Corniveleto',
  },
  ensabanado: {
    url: imgEnsabanado,
    label: 'Toro Bravo Ensabanado Puro (4+ años)',
    stageTitle: 'Pelaje Ensabanado Blanco',
    description: 'Pelaje blanco inmaculado integral de gran rareza y pureza genealógica.',
    tag: 'Toro Adulto • Ensabanado',
  },
  berrendo_veleto: {
    url: imgBerrendoCorniveleto,
    label: 'Toro Bravo Berrendo Corniveleto (4+ años)',
    stageTitle: 'Pelaje Berrendo • Corniveleto',
    description: 'Capa manchada berrenda con pitones altos y erguidos como veletas.',
    tag: 'Toro Berrendo • Corniveleto',
  },
  berrendo_colorado: {
    url: imgBerrendoColorado,
    label: 'Toro Bravo Berrendo en Colorado (4+ años)',
    stageTitle: 'Pelaje Berrendo en Colorado',
    description: 'Cuerpo blanco con grandes manchas coloradas vivas y pitones veletos.',
    tag: 'Toro Adulto • Berrendo en Colorado',
  },
  berrendo_negro: {
    url: imgBerrendoNegro,
    label: 'Toro Bravo Berrendo en Negro (4+ años)',
    stageTitle: 'Pelaje Berrendo en Negro',
    description: 'Capa blanca de base con remiendos y manchas negras y encornadura veleta.',
    tag: 'Toro Adulto • Berrendo en Negro',
  },
  vaca: {
    url: imgVaca,
    label: 'Vaca Brava de Vientre',
    stageTitle: 'Vaca de Vientre Reproductora',
    description: 'Vaca reproductora alerta con pitones afilados en encinar salmantino.',
    tag: 'Vaca de Vientre • Dehesa',
  },
};

/**
 * Returns the best-matching realistic image for an animal based on age, sex, coat, and exact horns.
 * CRITICAL: Keeps each coat family strictly within images of that same coat for toros, vacas, and becerros.
 */
export function getRealisticBullImage(
  coatName: string,
  sex: string = 'toro',
  ageYears: number = 4,
  hornDirection: string = 'Corniveleto',
  hornSymmetry: string = 'Simétrica'
): BullRealisticImage {
  const normalizedCoat = (coatName || '').toLowerCase();
  const symLower = (hornSymmetry || '').toLowerCase();
  const dirLower = (hornDirection || '').toLowerCase();

  const isColoradoFamily =
    normalizedCoat.includes('colorado') ||
    normalizedCoat.includes('melocoton') ||
    normalizedCoat.includes('melocotón') ||
    normalizedCoat.includes('avinagrado') ||
    normalizedCoat.includes('encendido') ||
    normalizedCoat.includes('retinto') ||
    normalizedCoat.includes('castaño') ||
    normalizedCoat.includes('castano') ||
    normalizedCoat.includes('tostado') ||
    normalizedCoat.includes('salinero') ||
    normalizedCoat.includes('sardo');

  const isCardenoFamily =
    normalizedCoat.includes('cárdeno') ||
    normalizedCoat.includes('cardeno') ||
    normalizedCoat.includes('salpicado') ||
    normalizedCoat.includes('entrepelado') ||
    normalizedCoat.includes('ratonero');

  const isJaboneroFamily =
    normalizedCoat.includes('jabonero') ||
    normalizedCoat.includes('albahío') ||
    normalizedCoat.includes('albahio') ||
    normalizedCoat.includes('barroso');

  const isBerrendoFamily = normalizedCoat.includes('berrendo');
  const isEnsabanadoFamily = normalizedCoat.includes('ensabanado') || normalizedCoat.includes('blanco');

  // --- VACAS REPRODUCTORAS (CON SOPORTE COMPLETO DE CAPA) ---
  if (sex === 'vaca') {
    if (ageYears === 0) {
      if (isColoradoFamily) {
        return {
          url: imgCria,
          label: 'Becerro Hembra Colorada (0 años)',
          stageTitle: 'Becerro Hembra • Pelaje Colorado',
          description: 'Cría hembra colorada recién nacida con excelente tipología y fondo de casta.',
          tag: 'Becerro Hembra • Colorada',
        };
      }
      return REALISTIC_BULL_IMAGES.cria;
    }
    if (ageYears === 1) {
      return REALISTIC_BULL_IMAGES.choto;
    }
    // NOTA: solo existe una fotografía real de vaca en los assets (imgVaca).
    // Antes, estas ramas devolvían fotos de TOROS de cada pelaje con una etiqueta
    // femenina — de ahí que aparecieran machos en pelajes de vaca. Hasta que haya
    // fotos femeninas reales por pelaje, todas las vacas usan la misma foto de vaca,
    // conservando el texto correcto para cada pelaje.
    if (isColoradoFamily) {
      return {
        url: imgVaca,
        label: 'Vaca Brava Colorada / Castaña',
        stageTitle: 'Vaca de Vientre Colorada',
        description: 'Vaca brava reproductora de capa colorada castaña, fina de cabos y mirada viva en la dehesa.',
        tag: 'Vaca de Vientre • Colorada',
      };
    }
    if (isCardenoFamily) {
      return {
        url: imgVaca,
        label: 'Vaca Brava Cárdena',
        stageTitle: 'Vaca de Vientre Cárdena',
        description: 'Vaca de vientre cárdena salpicada en encinar con estampa típica de encaste Santa Coloma.',
        tag: 'Vaca de Vientre • Cárdena',
      };
    }
    if (isJaboneroFamily) {
      return {
        url: imgVaca,
        label: 'Vaca Brava Jabonera',
        stageTitle: 'Vaca de Vientre Jabonera',
        description: 'Vaca reproductora de pelaje crema pajizo jabonero de gran fondo y expresión.',
        tag: 'Vaca de Vientre • Jabonera',
      };
    }
    if (isBerrendoFamily) {
      return {
        url: imgVaca,
        label: 'Vaca Brava Berrenda',
        stageTitle: 'Vaca de Vientre Berrenda',
        description: 'Vaca de vientre berrenda con remiendos bien definidos y nobleza.',
        tag: 'Vaca de Vientre • Berrenda',
      };
    }
    if (isEnsabanadoFamily) {
      return {
        url: imgVaca,
        label: 'Vaca Brava Ensabanada',
        stageTitle: 'Vaca de Vientre Ensabanada',
        description: 'Vaca de vientre blanca inmaculada ensabanada de pureza excepcional.',
        tag: 'Vaca de Vientre • Ensabanada',
      };
    }
    return REALISTIC_BULL_IMAGES.vaca;
  }

  // --- CRÍAS Y BECERROS MACHOS (0 AÑOS) ---
  if (ageYears === 0) {
    const criaDesc = (p: string) =>
      `Becerro lactante/destetado de pelaje ${p} con brotes incipientes de pitones en la testuz y genética de casta brava.`;

    if (isColoradoFamily) {
      return {
        url: imgCria,
        label: 'Becerro Colorado (0 años)',
        stageTitle: 'Becerro Colorado Lactante (0 Años)',
        description: criaDesc('colorado'),
        tag: 'Becerro • 0 Años • Colorado',
      };
    }
    if (isCardenoFamily) {
      return {
        url: imgCria,
        label: 'Becerro Cárdeno (0 años)',
        stageTitle: 'Becerro Cárdeno (0 Años)',
        description: criaDesc('cárdeno entrepelado'),
        tag: 'Becerro • 0 Años • Cárdeno',
      };
    }
    if (isJaboneroFamily) {
      return {
        url: imgCria,
        label: 'Becerro Jabonero (0 años)',
        stageTitle: 'Becerro Jabonero (0 Años)',
        description: criaDesc('jabonero crema'),
        tag: 'Becerro • 0 Años • Jabonero',
      };
    }
    if (isBerrendoFamily) {
      return {
        url: imgCria,
        label: 'Becerro Berrendo (0 años)',
        stageTitle: 'Becerro Berrendo (0 Años)',
        description: criaDesc('berrendo manchado'),
        tag: 'Becerro • 0 Años • Berrendo',
      };
    }
    if (isEnsabanadoFamily) {
      return {
        url: imgCria,
        label: 'Becerro Ensabanado (0 años)',
        stageTitle: 'Becerro Ensabanado (0 Años)',
        description: criaDesc('ensabanado blanco'),
        tag: 'Becerro • 0 Años • Ensabanado',
      };
    }
    return REALISTIC_BULL_IMAGES.cria;
  }

  // --- AÑOJOS / CHOTOS (1 AÑO) ---
  if (ageYears === 1) {
    const anojoDesc = (p: string) =>
      `Añojo de 1 año con pelaje ${p}, pitones despuntando hacia arriba en mazorcas finas y figura ágil en pleno crecimiento en el cerrado.`;

    if (isColoradoFamily) {
      return {
        url: imgColoradoRetinto,
        label: 'Añojo Colorado (1 año)',
        stageTitle: 'Añojo • Colorado (1 Año)',
        description: anojoDesc('colorado'),
        tag: 'Añojo • 1 Año • Colorado',
      };
    }
    if (isCardenoFamily) {
      return {
        url: imgCardenoClaro,
        label: 'Añojo Cárdeno (1 año)',
        stageTitle: 'Añojo • Cárdeno (1 Año)',
        description: anojoDesc('cárdeno'),
        tag: 'Añojo • 1 Año • Cárdeno',
      };
    }
    if (isJaboneroFamily) {
      return {
        url: imgJaboneroCrema,
        label: 'Añojo Jabonero (1 año)',
        stageTitle: 'Añojo • Jabonero (1 Año)',
        description: anojoDesc('jabonero'),
        tag: 'Añojo • 1 Año • Jabonero',
      };
    }
    if (isBerrendoFamily) {
      return {
        url: normalizedCoat.includes('colorado') ? imgBerrendoColorado : imgBerrendoNegro,
        label: 'Añojo Berrendo (1 año)',
        stageTitle: 'Añojo • Berrendo (1 Año)',
        description: anojoDesc('berrendo'),
        tag: 'Añojo • 1 Año • Berrendo',
      };
    }
    if (isEnsabanadoFamily) {
      return {
        url: imgEnsabanado,
        label: 'Añojo Ensabanado (1 año)',
        stageTitle: 'Añojo • Ensabanado (1 Año)',
        description: anojoDesc('ensabanado'),
        tag: 'Añojo • 1 Año • Ensabanado',
      };
    }
    return REALISTIC_BULL_IMAGES.choto;
  }

  // --- ERALES (2 AÑOS) Y NOVILLOS / UTREROS (3 AÑOS) ---
  // Silueta más ágil, estilizada y proporcionada que los toros cuatreños adultos de 500kg+
  if (ageYears === 2 || ageYears === 3) {
    const isEral = ageYears === 2;
    const stageName = isEral ? 'Eral (2 años)' : 'Novillo / Utrero (3 años)';
    const tagPrefix = isEral ? 'Eral • 2 Años' : 'Novillo Utrero • 3 Años';
    const novilloDesc = (pelaje: string) =>
      `${isEral ? 'Eral' : 'Novillo utrero'} ${pelaje} de silueta ágil y compacta, grupa estilizada y caja proporcionada, sin el morrillo abultado del toro cuatreño pero con casta y trapío juvenil en el campo.`;

    if (isColoradoFamily) {
      const colUrl = normalizedCoat.includes('retinto')
        ? imgColoradoRetinto
        : normalizedCoat.includes('melocoton') || normalizedCoat.includes('melocotón')
        ? imgColoradoMelocoton
        : normalizedCoat.includes('avinagrado')
        ? imgColoradoAvinagrado
        : normalizedCoat.includes('castaño') || normalizedCoat.includes('castano')
        ? imgCastano
        : imgColoradoCorniveleto;

      return {
        url: colUrl,
        label: `${stageName} Colorado / Castaño`,
        stageTitle: `${isEral ? 'Eral' : 'Novillo Utrero'} • ${normalizedCoat || 'Colorado'}`,
        description: novilloDesc('colorado'),
        tag: `${tagPrefix} • Colorado`,
      };
    }

    if (isCardenoFamily) {
      return {
        url: normalizedCoat.includes('claro') ? imgCardenoClaro : imgCardenoCorniveleto,
        label: `${stageName} Cárdeno`,
        stageTitle: `${isEral ? 'Eral' : 'Novillo Utrero'} • Cárdeno`,
        description: novilloDesc('cárdeno entrepelado'),
        tag: `${tagPrefix} • Cárdeno`,
      };
    }

    if (isJaboneroFamily) {
      return {
        url: imgJaboneroCrema,
        label: `${stageName} Jabonero`,
        stageTitle: `${isEral ? 'Eral' : 'Novillo Utrero'} • Jabonero`,
        description: novilloDesc('jabonero pajizo'),
        tag: `${tagPrefix} • Jabonero`,
      };
    }

    if (isBerrendoFamily) {
      return {
        url: normalizedCoat.includes('colorado') ? imgBerrendoColorado : imgBerrendoNegro,
        label: `${stageName} Berrendo`,
        stageTitle: `${isEral ? 'Eral' : 'Novillo Utrero'} • Berrendo`,
        description: novilloDesc('berrendo'),
        tag: `${tagPrefix} • Berrendo`,
      };
    }

    if (isEnsabanadoFamily) {
      return {
        url: imgEnsabanado,
        label: `${stageName} Ensabanado`,
        stageTitle: `${isEral ? 'Eral' : 'Novillo Utrero'} • Ensabanado`,
        description: novilloDesc('ensabanado blanco'),
        tag: `${tagPrefix} • Ensabanado`,
      };
    }

    // Default Negro / Zaíno / Mulato Novillo
    return {
      url: isEral ? imgChoto : imgNovillo,
      label: `${stageName} Negro Zaíno`,
      stageTitle: `${isEral ? 'Eral' : 'Novillo Utrero'} • Negro Zaíno`,
      description: novilloDesc('negro zaino'),
      tag: `${tagPrefix} • Negro Zaíno`,
    };
  }

  // --- 1. COLORADOS, CASTAÑOS Y DERIVADOS (FOTOGRAFÍAS REALES DE COLORADOS) ---
  if (isColoradoFamily) {
    // Specific Colorados from PDF (Melocotón, Avinagrado, Encendido)
    if (normalizedCoat.includes('melocoton') || normalizedCoat.includes('melocotón')) {
      if (dirLower.includes('cubeto') || dirLower.includes('brocho') || dirLower.includes('apretado')) {
        return REALISTIC_BULL_IMAGES.colorado_melocoton_cubeto;
      }
      return REALISTIC_BULL_IMAGES.colorado_melocoton;
    }
    if (normalizedCoat.includes('avinagrado')) {
      if (dirLower.includes('vuelto') || dirLower.includes('corniavuelto') || dirLower.includes('delantero')) {
        return REALISTIC_BULL_IMAGES.colorado_avinagrado_cornivuelto;
      }
      return REALISTIC_BULL_IMAGES.colorado_avinagrado;
    }
    if (normalizedCoat.includes('encendido')) {
      if (dirLower.includes('gacho') || dirLower.includes('capacho')) {
        return REALISTIC_BULL_IMAGES.colorado_gacho;
      }
      if (dirLower.includes('abierto') || dirLower.includes('playero')) {
        return REALISTIC_BULL_IMAGES.colorado_abierto;
      }
      return REALISTIC_BULL_IMAGES.colorado_encendido;
    }

    // Horns for Colorado / Castaño family
    if (symLower.includes('bizco') || symLower.includes('derecho') || symLower.includes('izquierdo')) {
      return REALISTIC_BULL_IMAGES.colorado_bizco;
    }
    if (dirLower.includes('capacho') || dirLower.includes('acapachado')) {
      return REALISTIC_BULL_IMAGES.colorado_capacho;
    }
    if (dirLower.includes('cornalon') || dirLower.includes('cornalón') || dirLower.includes('alon')) {
      return REALISTIC_BULL_IMAGES.colorado_cornalon;
    }
    if (dirLower.includes('gacho')) {
      return REALISTIC_BULL_IMAGES.colorado_gacho;
    }
    if (dirLower.includes('abierto') || dirLower.includes('playero') || dirLower.includes('alirredondo')) {
      return REALISTIC_BULL_IMAGES.colorado_abierto;
    }
    if (dirLower.includes('brocho')) {
      return REALISTIC_BULL_IMAGES.colorado_brocho;
    }
    if (dirLower.includes('cubeto')) {
      return REALISTIC_BULL_IMAGES.colorado_melocoton_cubeto;
    }
    if (dirLower.includes('apretado')) {
      return REALISTIC_BULL_IMAGES.colorado_avinagrado;
    }
    if (dirLower.includes('vuelto') || dirLower.includes('corniavuelto') || dirLower.includes('delantero')) {
      return REALISTIC_BULL_IMAGES.colorado_avinagrado_cornivuelto;
    }
    if (dirLower.includes('veleto')) {
      return REALISTIC_BULL_IMAGES.colorado_veleto;
    }
    if (normalizedCoat.includes('castaño') || normalizedCoat.includes('castano') || normalizedCoat.includes('tostado')) {
      return REALISTIC_BULL_IMAGES.castano;
    }
    if (normalizedCoat.includes('retinto')) {
      return REALISTIC_BULL_IMAGES.colorado_retinto;
    }
    return REALISTIC_BULL_IMAGES.colorado_veleto;
  }

  // --- 2. CÁRDENOS Y GRISES (FOTOGRAFÍAS REALES DE CÁRDENOS) ---
  if (isCardenoFamily) {
    if (symLower.includes('bizco') || symLower.includes('derecho') || symLower.includes('izquierdo')) {
      return {
        url: imgCardenoCornigacho,
        label: 'Toro Cárdeno Bizco (4+ años)',
        stageTitle: 'Cárdeno Pizarra • Bizco Asimétrico',
        description: 'Pelaje cárdeno salpicado con asimetría en la encornadura y pitón caído.',
        tag: 'Toro Cárdeno • Bizco',
      };
    }
    if (dirLower.includes('gacho') || dirLower.includes('capacho')) {
      return REALISTIC_BULL_IMAGES.cardeno_gacho;
    }
    if (dirLower.includes('abierto') || dirLower.includes('playero') || dirLower.includes('cornalon') || dirLower.includes('cornalón')) {
      return REALISTIC_BULL_IMAGES.cardeno_abierto;
    }
    if (
      dirLower.includes('vuelto') ||
      dirLower.includes('corniavuelto') ||
      dirLower.includes('delantero') ||
      dirLower.includes('brocho') ||
      dirLower.includes('cubeto') ||
      dirLower.includes('apretado')
    ) {
      return REALISTIC_BULL_IMAGES.cardeno_cornivuelto;
    }
    if (dirLower.includes('veleto')) {
      return REALISTIC_BULL_IMAGES.cardeno_veleto;
    }
    if (normalizedCoat.includes('claro')) {
      return REALISTIC_BULL_IMAGES.cardeno_claro;
    }
    return REALISTIC_BULL_IMAGES.cardeno_veleto;
  }

  // --- 3. JABONEROS, ALBAHÍOS Y CLAROS (FOTOGRAFÍAS REALES DE JABONEROS) ---
  if (isJaboneroFamily) {
    if (symLower.includes('bizco') || symLower.includes('derecho') || symLower.includes('izquierdo')) {
      return {
        url: imgJaboneroCornigacho,
        label: 'Toro Jabonero Bizco (4+ años)',
        stageTitle: 'Jabonero Crema • Bizco Asimétrico',
        description: 'Pelaje crema pajizo con encornadura asimétrica con un pitón más bajo.',
        tag: 'Toro Jabonero • Bizco',
      };
    }
    if (dirLower.includes('abierto') || dirLower.includes('playero') || dirLower.includes('cornalon') || dirLower.includes('cornalón')) {
      return REALISTIC_BULL_IMAGES.jabonero_abierto;
    }
    if (dirLower.includes('gacho') || dirLower.includes('capacho')) {
      return REALISTIC_BULL_IMAGES.jabonero_gacho;
    }
    if (
      dirLower.includes('brocho') ||
      dirLower.includes('cubeto') ||
      dirLower.includes('apretado') ||
      dirLower.includes('vuelto') ||
      dirLower.includes('delantero')
    ) {
      return REALISTIC_BULL_IMAGES.jabonero_crema;
    }
    if (dirLower.includes('veleto')) {
      return REALISTIC_BULL_IMAGES.jabonero_veleto;
    }
    if (normalizedCoat.includes('crema')) {
      return REALISTIC_BULL_IMAGES.jabonero_crema;
    }
    return REALISTIC_BULL_IMAGES.jabonero_veleto;
  }

  // --- 4. PINTOS, MANCHADOS Y ENSABANADOS (BERRENDOS Y ENSABANADOS) ---
  if (isBerrendoFamily) {
    if (normalizedCoat.includes('colorado') || normalizedCoat.includes('castaño') || normalizedCoat.includes('castano')) {
      return REALISTIC_BULL_IMAGES.berrendo_colorado;
    }
    if (dirLower.includes('veleto')) {
      return REALISTIC_BULL_IMAGES.berrendo_veleto;
    }
    if (dirLower.includes('abierto') || dirLower.includes('playero') || dirLower.includes('cornalon') || dirLower.includes('cornalón')) {
      return {
        url: imgBerrendoColorado,
        label: 'Toro Berrendo Corniabierto (4+ años)',
        stageTitle: 'Berrendo • Corniabierto',
        description: 'Pelaje berrendo con pitones de amplia cuna y gran apertura.',
        tag: 'Toro Berrendo • Corniabierto',
      };
    }
    if (dirLower.includes('gacho') || dirLower.includes('capacho')) {
      return {
        url: imgBerrendoNegro,
        label: 'Toro Berrendo en Negro Cornigacho (4+ años)',
        stageTitle: 'Berrendo en Negro • Cornigacho',
        description: 'Pelaje manchado berrendo con pitones caídos por debajo de la testuz.',
        tag: 'Toro Berrendo • Cornigacho',
      };
    }
    return REALISTIC_BULL_IMAGES.berrendo_negro;
  }

  if (isEnsabanadoFamily) {
    if (dirLower.includes('veleto')) {
      return REALISTIC_BULL_IMAGES.ensabanado_veleto;
    }
    if (dirLower.includes('abierto') || dirLower.includes('cornalon') || dirLower.includes('playero')) {
      return {
        url: imgEnsabanadoCorniveleto,
        label: 'Toro Ensabanado Corniabierto (4+ años)',
        stageTitle: 'Ensabanado Blanco • Corniabierto',
        description: 'Pelaje blanco inmaculado con cornamenta de gran envergadura lateral.',
        tag: 'Toro Ensabanado • Abierto',
      };
    }
    if (dirLower.includes('gacho') || dirLower.includes('capacho') || dirLower.includes('brocho')) {
      return {
        url: imgEnsabanado,
        label: 'Toro Ensabanado Cornigacho / Brocho (4+ años)',
        stageTitle: 'Ensabanado Blanco • Cornigacho',
        description: 'Pelaje blanco de pureza absoluta con pitones caídos en broche.',
        tag: 'Toro Ensabanado • Gacho',
      };
    }
    return REALISTIC_BULL_IMAGES.ensabanado;
  }

  // --- 5. NEGROS, ZAÍNOS, MULATOS Y AZABACHES (TODAS LAS CORNAMENTAS DETALLADAS) ---
  // Asimetrías de pitones
  if (symLower.includes('derecho')) {
    return REALISTIC_BULL_IMAGES.bizco_derecho;
  }
  if (symLower.includes('izquierdo')) {
    return REALISTIC_BULL_IMAGES.bizco_izquierdo;
  }
  if (symLower.includes('bizco')) {
    return REALISTIC_BULL_IMAGES.bizco;
  }

  // Encornaduras para Negros
  if (dirLower.includes('capacho')) {
    return REALISTIC_BULL_IMAGES.capacho;
  }
  if (dirLower.includes('cubeto')) {
    return REALISTIC_BULL_IMAGES.cubeto;
  }
  if (dirLower.includes('cornalon') || dirLower.includes('cornalón') || dirLower.includes('alon')) {
    return REALISTIC_BULL_IMAGES.cornalon;
  }
  if (dirLower.includes('apretado')) {
    return REALISTIC_BULL_IMAGES.corniapretado;
  }
  if (dirLower.includes('delantero')) {
    return REALISTIC_BULL_IMAGES.cornidelantero;
  }
  if (dirLower.includes('gacho')) {
    if (normalizedCoat.includes('mulato')) {
      return REALISTIC_BULL_IMAGES.negro_mulato_gacho;
    }
    return REALISTIC_BULL_IMAGES.cornigacho;
  }
  if (dirLower.includes('abierto') || dirLower.includes('playero') || dirLower.includes('alirredondo')) {
    return REALISTIC_BULL_IMAGES.corniabierto;
  }
  if (dirLower.includes('brocho')) {
    return REALISTIC_BULL_IMAGES.brocho;
  }
  if (dirLower.includes('vuelto') || dirLower.includes('corniavuelto')) {
    return REALISTIC_BULL_IMAGES.cornivuelto;
  }
  if (dirLower.includes('veleto')) {
    if (normalizedCoat.includes('azabache')) {
      return REALISTIC_BULL_IMAGES.negro_azabache;
    }
    return REALISTIC_BULL_IMAGES.corniveleto;
  }

  // Sub-pelajes negros específicos
  if (normalizedCoat.includes('mulato')) {
    return REALISTIC_BULL_IMAGES.negro_mulato;
  }
  if (normalizedCoat.includes('azabache')) {
    return REALISTIC_BULL_IMAGES.negro_azabache;
  }

  // Si tiene 2 o 3 años y no coincide con un tipo específico, mostrar novillo de dehesa
  if (ageYears >= 2 && ageYears < 4) {
    return REALISTIC_BULL_IMAGES.novillo;
  }

  // Default: Negro Zaíno Corniveleto
  return REALISTIC_BULL_IMAGES.corniveleto;
}
