import {
  Animal,
  AnimalFestejoResult,
  BreedingPair,
  Contract,
  Facility,
  FestejoSimulationSummary,
  GameState,
  SimulationRoundLog,
  Transaction,
} from '../types/game';
import { calculateAnimalValue, generateOffspring, generateOpportunity } from './generator';

const SEASONS: ('Primavera' | 'Verano' | 'Otoño' | 'Invierno')[] = [
  'Invierno',
  'Primavera',
  'Primavera',
  'Primavera',
  'Verano',
  'Verano',
  'Verano',
  'Otoño',
  'Otoño',
  'Otoño',
  'Invierno',
  'Invierno',
];

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function updateRanchRank(prestige: number): { level: number; title: string } {
  if (prestige < 25) return { level: 1, title: 'Pequeña Ganadería' };
  if (prestige < 60) return { level: 2, title: 'Ganadería Local' };
  if (prestige < 120) return { level: 3, title: 'Ganadería Consolidada' };
  if (prestige < 250) return { level: 4, title: 'Ganadería Prestigiosa' };
  return { level: 5, title: 'Ganadería Histórica de Élite' };
}

export interface DayAdvancementResult {
  newState: GameState;
  logs: string[];
  births: Animal[];
  completedUpgrades: Facility[];
  expiredContracts: Contract[];
  scheduledFestejosToday: Contract[];
  financialDelta: number;
}

export function advanceTime(state: GameState, daysToAdvance: number): DayAdvancementResult {
  // Clone state deeply
  const newState: GameState = JSON.parse(JSON.stringify(state));
  const logs: string[] = [];
  const births: Animal[] = [];
  const completedUpgrades: Facility[] = [];
  const expiredContracts: Contract[] = [];

  let totalExpenses = 0;

  for (let d = 0; d < daysToAdvance; d++) {
    newState.game.currentDay += 1;
    const day = newState.game.currentDay;

    // Date computation
    const totalDayOffset = day - 1 + 74; // starts mid-March
    const dayOfYear = (totalDayOffset % 365) + 1;
    const yearNumber = 2024 + Math.floor(totalDayOffset / 365);
    const monthIndex = Math.min(11, Math.floor(dayOfYear / 30.5));
    const dayOfMonth = Math.max(1, Math.floor(dayOfYear % 30.5) || 1);

    newState.game.month = monthIndex + 1;
    newState.game.year = yearNumber;
    newState.game.season = SEASONS[monthIndex];
    newState.game.currentDate = `${dayOfMonth} de ${MONTH_NAMES[monthIndex]}, ${yearNumber}`;

    // 1. Daily Feeding & Maintenance Expense per animal
    const activeAnimals = newState.animals.filter((a) => a.status !== 'vendido' && a.status !== 'retirado');
    const dailyFeedingCost = activeAnimals.length * 8; // €8 per head per day
    const dailyRanchMaint = 40; // ranch general upkeep
    const dailyCost = dailyFeedingCost + dailyRanchMaint;
    totalExpenses += dailyCost;

    // 2. Animal Aging (every 30 days)
    if (day % 30 === 0) {
      newState.animals.forEach((animal) => {
        if (animal.status !== 'vendido') {
          const previousYears = animal.ageYears;
          animal.ageMonths += 1;
          if (animal.ageMonths >= 12) {
            animal.ageYears += Math.floor(animal.ageMonths / 12);
            animal.ageMonths = animal.ageMonths % 12;

            // Growth in weight and muscle for growing cattle
            if (animal.ageYears <= 4) {
              const weightGain = animal.sex === 'toro' 
                ? Math.round(90 + Math.random() * 30) 
                : Math.round(70 + Math.random() * 20);
              animal.weightKg = Math.min(620, animal.weightKg + weightGain);

              // Morrillo development on bulls
              if (animal.sex === 'toro') {
                animal.morphology.morrillo = Math.min(95, animal.morphology.morrillo + 8);
                animal.morphology.chest = Math.min(95, animal.morphology.chest + 5);
              }
            }

            // Revalue animal as it grows from calf to adult
            animal.value = calculateAnimalValue(
              animal.quality,
              animal.ageYears,
              animal.sex,
              animal.isSemental || animal.isIndultado
            );

            // Log milestone transitions
            if (previousYears === 0 && animal.ageYears === 1) {
              logs.push(`Evolución: La cría "${animal.name}" (#${animal.number}) ha cumplido 1 año y pasa a ser Añojo/Choto.`);
            } else if (previousYears < 2 && animal.ageYears >= 2) {
              logs.push(`Evolución: "${animal.name}" (#${animal.number}) alcanza los 2 años (Novillo) y ya es apto para festejos menores.`);
            } else if (previousYears < 4 && animal.ageYears >= 4 && animal.sex === 'toro') {
              logs.push(`¡Maduración! "${animal.name}" (#${animal.number}) ya es un Toro Cuatreño adulto (€${animal.value.toLocaleString('es-ES')}) listo para corridas de toros.`);
            }
          }
        }
      });
    }

    // 3. Gestations & Births (Breeding pairs take ~270 days for realistic gestation)
    const pendingBreeding = [...newState.breeding];
    for (let bIndex = pendingBreeding.length - 1; bIndex >= 0; bIndex--) {
      const pair = pendingBreeding[bIndex];
      if (pair.status === 'activa' && day >= pair.dueDay) {
        const sire = newState.animals.find((a) => a.id === pair.sireId);
        const dam = newState.animals.find((a) => a.id === pair.damId);

        if (sire && dam) {
          const calf = generateOffspring(sire, dam, day, pair.customOffspringName);
          newState.animals.push(calf);
          births.push(calf);

          // Update parents' offspring lists
          sire.offspringIds.push(calf.id);
          dam.offspringIds.push(calf.id);
          dam.status = 'disponible';

          pair.status = 'nacido';
          newState.stats.totalNacimientos += 1;

          logs.push(`¡Nacimiento! La vaca ${dam.name} (#${dam.number}) ha parido una hermosa cría (${calf.sex}) llamada "${calf.name}" (#${calf.number}).`);

          newState.notifications.unshift({
            id: `notif-birth-${Date.now()}-${calf.id}`,
            date: newState.game.currentDate,
            day,
            title: `¡Nuevo Nacimiento en la Finca!`,
            message: `Ha nacido ${calf.name} (#${calf.number}), cría de ${sire.name} y ${dam.name}. Pelaje: ${calf.coat}. Calidad: ${calf.quality}/100.`,
            type: 'birth',
            read: false,
            targetTab: 'inventory',
            targetId: calf.id,
          });
        }
      }
    }
    // Remove inactive breedings
    newState.breeding = newState.breeding.filter((b) => b.status === 'activa');

    // 4. Facility Upgrades progress
    newState.facilities.forEach((fac) => {
      if (fac.isUpgrading) {
        fac.daysRemainingForUpgrade -= 1;
        fac.upgradeProgress = Math.min(
          100,
          Math.round(((fac.upgradeDays - fac.daysRemainingForUpgrade) / fac.upgradeDays) * 100)
        );

        if (fac.daysRemainingForUpgrade <= 0) {
          fac.isUpgrading = false;
          fac.level += 1;
          fac.capacity += Math.round(fac.maxCapacity / fac.maxLevel);
          fac.condition = 'Óptimo';
          fac.integrity = 100;
          fac.upgradeCost = Math.round(fac.upgradeCost * 1.4);
          fac.upgradeDays = Math.round(fac.upgradeDays * 1.3);
          completedUpgrades.push(fac);

          logs.push(`¡Mejora completada! Las instalaciones de ${fac.name} han alcanzado el Nivel ${fac.level}.`);

          newState.notifications.unshift({
            id: `notif-fac-${Date.now()}-${fac.id}`,
            date: newState.game.currentDate,
            day,
            title: `Mejora Finalizada: ${fac.name}`,
            message: `Las obras han finalizado. Nueva capacidad ampliada a ${fac.capacity} animales.`,
            type: 'success',
            read: false,
            targetTab: 'management',
          });
        }
      }
    });

    // Update total ranch capacity
    const pastosFac = newState.facilities.find((f) => f.id === 'pastos');
    const corralesFac = newState.facilities.find((f) => f.id === 'corrales');
    newState.ranch.totalCapacity = (pastosFac?.capacity || 20) + (corralesFac?.capacity || 15);

    // 5. Contract day countdowns and expirations
    newState.opportunities.forEach((opp) => {
      opp.daysLeft -= 1;
    });

    const expired = newState.opportunities.filter((opp) => opp.daysLeft <= 0);
    expired.forEach((opp) => {
      expiredContracts.push(opp);
      logs.push(`La oportunidad de festejo "${opp.title}" ha expirado.`);
    });
    newState.opportunities = newState.opportunities.filter((opp) => opp.daysLeft > 0);

    // 6. Dynamic generation of new opportunities if low
    if (newState.opportunities.length < 4 && Math.random() < 0.45) {
      const newOpp = generateOpportunity(
        newState.ranch.prestige,
        newState.ranch.reputation,
        day,
        newState.recentLocations
      );
      newState.opportunities.push(newOpp);
      newState.recentLocations.push(newOpp.locality);
      if (newState.recentLocations.length > 8) {
        newState.recentLocations.shift();
      }
    }
  }

  // Deduct periodic maintenance & feeding
  if (totalExpenses > 0) {
    newState.ranch.funds = Math.max(0, newState.ranch.funds - totalExpenses);
    newState.stats.totalGastos += totalExpenses;

    const tx: Transaction = {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: newState.game.currentDate,
      day: newState.game.currentDay,
      concept: `Alimentación y mantenimiento (${daysToAdvance} días)`,
      amount: totalExpenses,
      type: 'gasto',
      category: 'alimentacion',
      balanceAfter: newState.ranch.funds,
    };
    newState.transactions.unshift(tx);
  }

  // Check rank updates
  const { level, title } = updateRanchRank(newState.ranch.prestige);
  if (level !== newState.ranch.level) {
    newState.ranch.level = level;
    newState.ranch.rankTitle = title;
    logs.push(`¡SUBIDA DE NIVEL! Tu ganadería ahora es de categoría: "${title}".`);
    newState.notifications.unshift({
      id: `notif-rank-${Date.now()}`,
      date: newState.game.currentDate,
      day: newState.game.currentDay,
      title: `¡Tu Ganadería sube a Nivel ${level}!`,
      message: `Has obtenido la categoría "${title}". Ahora tendrás acceso a carteles y plazas de mayor relevancia.`,
      type: 'success',
      read: false,
    });
  }

  // Check scheduled contracts that coincide with current day or are past due
  const scheduledFestejosToday = newState.contracts.filter(
    (c) => c.status === 'aceptado' && c.scheduledDay <= newState.game.currentDay
  );

  return {
    newState,
    logs,
    births,
    completedUpgrades,
    expiredContracts,
    scheduledFestejosToday,
    financialDelta: -totalExpenses,
  };
}

export function advanceDaysAndSimulate(
  state: GameState,
  daysToAdvance: number
): { nextState: GameState; log: SimulationRoundLog & { summary: string; newCalvesCount: number } } {
  const res = advanceTime(state, daysToAdvance);
  const summaryText = res.logs.length > 0
    ? res.logs.slice(0, 2).join(' ')
    : `Mantenimiento ordinario completado. Gastos de alimentación: €${Math.abs(res.financialDelta).toLocaleString('es-ES')}.`;

  return {
    nextState: res.newState,
    log: {
      tercio: 'Salida y Capote',
      description: summaryText,
      scoreDelta: 0,
      summary: summaryText,
      newCalvesCount: res.births.length,
    },
  };
}

export function simulateFestejo(
  state: GameState,
  contractId: string
): { updatedState: GameState; summary: FestejoSimulationSummary } {
  const updatedState: GameState = JSON.parse(JSON.stringify(state));
  const contractIndex = updatedState.contracts.findIndex((c) => c.id === contractId);
  if (contractIndex === -1) {
    throw new Error('Contrato no encontrado');
  }

  const contract = updatedState.contracts[contractIndex];
  const assignedAnimals = updatedState.animals.filter((a) => contract.assignedAnimalIds.includes(a.id));

  const animalResults: AnimalFestejoResult[] = [];
  let totalScore = 0;
  let hasIndulto = false;
  let indultedAnimal: Animal | undefined;

  assignedAnimals.forEach((animal, index) => {
    const torero = contract.toreros[index % contract.toreros.length] || {
      name: 'Diestro Titular',
      category: 'Matador',
      skill: 65,
      popularity: 60,
    };

    const g = animal.genetics;
    const m = animal.morphology;

    // Simulate rounds
    const rounds: SimulationRoundLog[] = [];

    // 1. Salida y Capote
    const capoteScore = Math.round(g.movilidad * 0.4 + g.velocidad * 0.3 + m.height * 0.3 + (Math.random() * 20 - 10));
    let capoteDesc = '';
    if (capoteScore >= 80) capoteDesc = `Sale con galope arrollador, humillando de salida y rematando en los burladeros con gran celo.`;
    else if (capoteScore >= 55) capoteDesc = `Sale atento a los engaños, fijeza correcta y embestida franca al capote.`;
    else capoteDesc = `Sale desentendido de las telas, buscando las tablas y distraído.`;
    rounds.push({ tercio: 'Salida y Capote', description: capoteDesc, scoreDelta: capoteScore });

    // 2. Tercio de Varas (Crucial test of true Bravura)
    const varasScore = Math.round(g.bravura * 0.5 + g.fuerza * 0.3 + g.fijeza * 0.2 + (Math.random() * 16 - 8));
    let varasDesc = '';
    if (varasScore >= 85) varasDesc = `¡Bravo al caballo! Se arranca de largo desde el centro del ruedo empujando con los riñones y recargando con fijeza ciega.`;
    else if (varasScore >= 60) varasDesc = `Acude al piquero con codicia, cumple en dos puyazos metiendo la cara con entrega.`;
    else varasDesc = `Mansea en varas, sale suelto del castigo buscando la querencia.`;
    rounds.push({ tercio: 'Tercio de Varas', description: varasDesc, scoreDelta: varasScore });

    // 3. Banderillas
    const banderillasScore = Math.round(g.movilidad * 0.5 + g.velocidad * 0.3 + g.temperamento * 0.2 + (Math.random() * 14 - 7));
    let banderillasDesc = '';
    if (banderillasScore >= 75) banderillasDesc = `Arreando en banderillas, prontitud y fijeza en los encuentros de los subalternos.`;
    else banderillasDesc = `Pasa con tranco regular, esperando a que le ganen el viaje.`;
    rounds.push({ tercio: 'Banderillas', description: banderillasDesc, scoreDelta: banderillasScore });

    // 4. Faena de Muleta
    const muletaScore = Math.round(
      g.nobleza * 0.35 + g.bravura * 0.3 + g.resistencia * 0.2 + (torero.skill * 0.15) + (Math.random() * 16 - 8)
    );
    let muletaDesc = '';
    if (muletaScore >= 85) muletaDesc = `Faena de ensueño: humilla hasta el suelo, repite incansable por ambos pitones con transmisión y profundidad extraordinaria.`;
    else if (muletaScore >= 60) muletaDesc = `Faena lucida y templada, con series ligadas y buen fondo de nobleza.`;
    else muletaDesc = `Toro descompuesto o soso que no permite el lucimiento continuado del diestro.`;
    rounds.push({ tercio: 'Faena de Muleta', description: muletaDesc, scoreDelta: muletaScore });

    // Calculate final performance score
    const animalFinalScore = Math.min(99, Math.max(20, Math.round(
      capoteScore * 0.2 + varasScore * 0.35 + banderillasScore * 0.1 + muletaScore * 0.35
    )));

    totalScore += animalFinalScore;

    // Check Indulto conditions (requires extreme bravura, high quality, competent torero, and rare probability roll)
    let isIndulto = false;
    const canIndult = (contract.category === 'primera_categoria' || contract.category === 'plaza_1' || contract.category === 'plaza_2' || contract.category === 'plaza_3');
    if (canIndult && g.bravura >= 84 && animalFinalScore >= 82 && torero.skill >= 60) {
      // 18% base probability if all high conditions are met
      const indultoRoll = Math.random();
      if (indultoRoll < 0.20 || g.bravura >= 94) {
        isIndulto = true;
        hasIndulto = true;
        indultedAnimal = animal;
      }
    }

    let performance: AnimalFestejoResult['performance'] = 'Buena';
    let trophies = 'Ovación';
    let quote = '';

    if (isIndulto) {
      performance = 'Histórica (Indulto)';
      trophies = '¡INDULTO! Vuelta al Ruedo y Perdón de la Vida';
      quote = `Un toro de bandera, bravo en el caballo e incansable en la muleta. El público unánime y la presidencia le conceden el indulto para transmitir su sangre.`;
      rounds.push({
        tercio: 'Desenlace',
        description: `¡Pañuelos blancos en toda la plaza! El clamor popular es ensordecedor: ¡INDULTO! El toro vuelve a los corrales por su propio pie para regresar a la dehesa.`,
        scoreDelta: 100,
      });
    } else if (animalFinalScore >= 85) {
      performance = 'Extraordinaria';
      trophies = '2 Orejas y Rabo / Vuelta al ruedo al toro';
      quote = `Animal de bravura excelsa ovacionado en el arrastre. Una tarde para el recuerdo.`;
      rounds.push({
        tercio: 'Desenlace',
        description: `Estocada en todo lo alto. Vuelta al ruedo al toro en el arrastre y máximos trofeos para el torero.`,
        scoreDelta: 90,
      });
    } else if (animalFinalScore >= 72) {
      performance = 'Destacada';
      trophies = '2 Orejas';
      quote = `Cumplió con nota muy alta, demostrando la casta y el trapío de la ganadería.`;
      rounds.push({
        tercio: 'Desenlace',
        description: `Gran estocada y dos orejas con fuerte petición de la afición.`,
        scoreDelta: 75,
      });
    } else if (animalFinalScore >= 55) {
      performance = 'Buena';
      trophies = '1 Oreja';
      quote = `Comportamiento digno y noble, cumpliendo con el encargo.`;
      rounds.push({
        tercio: 'Desenlace',
        description: `Faena aseada rematada con media estocada. Una oreja para el diestro.`,
        scoreDelta: 60,
      });
    } else if (animalFinalScore >= 40) {
      performance = 'Discreta';
      trophies = 'Ovación y Saludos';
      quote = `Animal que acusó falta de fijeza o fuerzas en los momentos clave.`;
      rounds.push({
        tercio: 'Desenlace',
        description: `Silencio y ovación de despedida desde el tercio.`,
        scoreDelta: 45,
      });
    } else {
      performance = 'Decepcionante';
      trophies = 'Pitos';
      quote = `Animal complicado o deslucido que no dio opciones al triunfo.`;
      rounds.push({
        tercio: 'Desenlace',
        description: `Despedida con pitos en el arrastre tras faena desangelada.`,
        scoreDelta: 25,
      });
    }

    // Update real animal record
    const targetAnimal = updatedState.animals.find((a) => a.id === animal.id);
    if (targetAnimal) {
      targetAnimal.festejosCount += 1;
      targetAnimal.lastFestejoResult = `${performance} en ${contract.plaza}`;

      if (isIndulto) {
        targetAnimal.status = 'indultado';
        targetAnimal.isIndultado = true;
        targetAnimal.value = Math.round(targetAnimal.value * 3.5);
        targetAnimal.history.unshift({
          id: `h-indulto-${Date.now()}`,
          day: updatedState.game.currentDay,
          date: updatedState.game.currentDate,
          title: `¡INDULTADO EN ${contract.plaza.toUpperCase()}!`,
          description: `Perdón de la vida por bravura descomunal en ${contract.title}. El toro regresa vivo al campo para convertirse en semental.`,
          type: 'indulto',
        });
      } else {
        targetAnimal.status = 'festejado';
        targetAnimal.history.unshift({
          id: `h-festejo-${Date.now()}-${targetAnimal.id}`,
          day: updatedState.game.currentDay,
          date: updatedState.game.currentDate,
          title: `Festejo en ${contract.locality}`,
          description: `Lidiado en ${contract.plaza} por ${torero.name}. Resultado: ${performance} (${trophies}).`,
          type: 'festejo',
        });
      }
    }

    animalResults.push({
      animalId: animal.id,
      animalName: animal.name,
      animalNumber: animal.number,
      score: animalFinalScore,
      performance,
      trophies,
      isIndulto,
      toreroName: torero.name,
      bravuraShown: g.bravura,
      rounds,
      quote,
    });
  });

  const avgScore = assignedAnimals.length > 0 ? Math.round(totalScore / assignedAnimals.length) : 50;

  // Multipliers based on average performance
  let scoreMult = 1.0;
  let overallRating: FestejoSimulationSummary['overallRating'] = 'Triunfo Notable';
  if (hasIndulto) {
    scoreMult = 1.6;
    overallRating = 'Tarde Histórica';
  } else if (avgScore >= 80) {
    scoreMult = 1.35;
    overallRating = 'Gran Triunfo';
  } else if (avgScore >= 60) {
    scoreMult = 1.05;
    overallRating = 'Triunfo Notable';
  } else if (avgScore >= 45) {
    scoreMult = 0.85;
    overallRating = 'Regular';
  } else {
    scoreMult = 0.6;
    overallRating = 'Desastre';
  }

  const payoutEarned = Math.round(contract.payout * (0.9 + scoreMult * 0.1));
  const prestigeEarned = Math.round(contract.prestigeReward * scoreMult) + (hasIndulto ? 25 : 0);
  const reputationEarned = Math.round(contract.reputationReward * scoreMult) + (hasIndulto ? 40 : 0);

  // Update GameState funds, prestige, reputation
  updatedState.ranch.funds += payoutEarned;
  updatedState.ranch.prestige += prestigeEarned;
  updatedState.ranch.reputation = Math.min(100, Math.max(5, updatedState.ranch.reputation + (avgScore >= 50 ? reputationEarned : -10)));

  updatedState.stats.totalFestejos += 1;
  updatedState.stats.totalIngresos += payoutEarned;
  updatedState.stats.totalPrestigioGanado += prestigeEarned;
  if (hasIndulto) {
    updatedState.stats.totalIndultos += 1;
  }

  // Record Transaction
  const tx: Transaction = {
    id: `tx-festejo-${Date.now()}`,
    date: updatedState.game.currentDate,
    day: updatedState.game.currentDay,
    concept: `Honorarios por ${contract.title} (${contract.locality})`,
    amount: payoutEarned,
    type: 'ingreso',
    category: 'festejo',
    balanceAfter: updatedState.ranch.funds,
  };
  updatedState.transactions.unshift(tx);

  // Move contract to completed
  contract.status = 'completado';
  updatedState.historyEvents.unshift(contract);
  updatedState.contracts.splice(contractIndex, 1);

  // Notification
  updatedState.notifications.unshift({
    id: `notif-festejo-res-${Date.now()}`,
    date: updatedState.game.currentDate,
    day: updatedState.game.currentDay,
    title: hasIndulto ? `¡INDULTO HISTÓRICO EN ${contract.locality.toUpperCase()}!` : `Festejo finalizado: ${contract.title}`,
    message: hasIndulto
      ? `¡El toro ${indultedAnimal?.name} ha sido indultado! Ganados +${payoutEarned.toLocaleString('es-ES')} € y +${prestigeEarned} de Prestigio.`
      : `Resultado: ${overallRating}. Beneficio: +${payoutEarned.toLocaleString('es-ES')} € | Prestigio: +${prestigeEarned}.`,
    type: hasIndulto ? 'indulto' : 'event',
    read: false,
    targetTab: 'events',
  });

  // Check rank after prestige gain
  const rank = updateRanchRank(updatedState.ranch.prestige);
  updatedState.ranch.level = rank.level;
  updatedState.ranch.rankTitle = rank.title;

  const summary: FestejoSimulationSummary = {
    contractId: contract.id,
    contractTitle: contract.title,
    plaza: contract.plaza,
    locality: contract.locality,
    date: updatedState.game.currentDate,
    day: updatedState.game.currentDay,
    payoutEarned,
    prestigeEarned,
    reputationEarned,
    animalResults,
    hasIndulto,
    indultedAnimal,
    overallRating,
    notes: hasIndulto
      ? `Una jornada inmortal para la historia de la tauromaquia y de la ganadería.`
      : `La afición y los críticos han valorado la seriedad del encierro presentado.`,
  };

  return { updatedState, summary };
}
