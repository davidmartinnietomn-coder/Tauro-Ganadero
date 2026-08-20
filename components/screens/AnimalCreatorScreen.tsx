import React, { useState } from 'react';
import {
  ArrowLeft,
  Dices,
  Sparkles,
  Coins,
  Shield,
  Clock,
  Crown,
  Heart,
  TrendingUp,
  AlertTriangle,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  Animal,
  AnimalSex,
  GeneticsData,
  HornData,
  MorphologyData,
} from '../../types/game';
import {
  COAT_CATALOG,
  HORN_DIRECTIONS,
  HORN_LENGTHS,
  HORN_SYMMETRIES,
  HORN_THICKNESSES,
  MARKINGS_CATALOG,
  MALE_NAMES,
  FEMALE_NAMES,
} from '../../data/cattleTraits';
import { calculateAnimalValue, calculateQuality } from '../../services/generator';
import { AnimalVisual, HornFrontalDiagram } from '../common/AnimalVisual';
import { buildAnimalGeminiPrompt } from '../../services/animalPromptBuilder';

interface AnimalCreatorScreenProps {
  onBack: () => void;
  onSaveAnimal: (animal: Animal, cost: number) => void;
  currentFunds: number;
  currentCapacity: number;
  currentHerdCount: number;
  currentDay: number;
  existingAnimals?: Animal[];
}

type CreationMode = 'adulto' | 'novillo' | 'anojo' | 'cria';
type CreatorTab = 'aspecto' | 'cornamenta' | 'morfologia' | 'genetica' | 'linaje';

export const AnimalCreatorScreen: React.FC<AnimalCreatorScreenProps> = ({
  onBack,
  onSaveAnimal,
  currentFunds,
  currentCapacity,
  currentHerdCount,
  currentDay,
  existingAnimals = [],
}) => {
  // Mode selection: Adulto (4 years) vs Novillo (3 years) vs Añojo (1 year) vs Cría (0 years)
  const [creationMode, setCreationMode] = useState<CreationMode>('adulto');

  const [sex, setSex] = useState<AnimalSex>('toro');
  const [name, setName] = useState('Bravucón');
  const [activeTab, setActiveTab] = useState<CreatorTab>('aspecto');
  const [coat, setCoat] = useState('Negro Zaíno');
  const [coatCategoryFilter, setCoatCategoryFilter] = useState<string>('todos');
  const [selectedMarkings, setSelectedMarkings] = useState<string[]>(['Careto']);

  // Parent selection for Cría mode (optional herd breeding)
  const [selectedSireId, setSelectedSireId] = useState<string>('');
  const [selectedDamId, setSelectedDamId] = useState<string>('');

  // Horns
  const [horn, setHorn] = useState<HornData>({
    direction: 'Corniveleto',
    symmetry: 'Simétrica',
    length: 'Media',
    thickness: 'Medio',
    state: 'Íntegro',
  });

  // Morphology
  const [morphology, setMorphology] = useState<MorphologyData>({
    height: 65,
    length: 65,
    corpulence: 70,
    chest: 68,
    morrillo: 75,
    head: 60,
  });

  // Genetics points pool
  const [availablePoints, setAvailablePoints] = useState(12);
  const [genetics, setGenetics] = useState<GeneticsData>({
    bravura: 78,
    fuerza: 72,
    resistencia: 70,
    velocidad: 68,
    movilidad: 70,
    nobleza: 75,
    fijeza: 72,
    temperamento: 65,
    fertilidad: 80,
    potencial: 85,
  });

  const [isSemental, setIsSemental] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic age and pricing based on creation mode
  const ageYears =
    creationMode === 'adulto' ? 4 : creationMode === 'novillo' ? 3 : creationMode === 'anojo' ? 1 : 0;

  const creationCost =
    creationMode === 'adulto'
      ? 25000
      : creationMode === 'novillo'
      ? 18000
      : creationMode === 'anojo'
      ? 10000
      : 5000;

  // Available sires and dams for lineage selection
  const availableSires = existingAnimals.filter(
    (a) => a.sex === 'toro' && (a.isSemental || a.ageYears >= 3)
  );
  const availableDams = existingAnimals.filter(
    (a) => a.sex === 'vaca' && a.ageYears >= 2
  );

  const handleApplyParentGenetics = (sireId: string, damId: string) => {
    const sire = existingAnimals.find((a) => a.id === sireId);
    const dam = existingAnimals.find((a) => a.id === damId);

    if (sire && dam) {
      // Blend coat: 50% chance of sire's or dam's coat
      setCoat(Math.random() > 0.5 ? sire.coat : dam.coat);

      // Blend markings
      const combinedMarks = Array.from(new Set([...sire.markings, ...dam.markings]));
      setSelectedMarkings(combinedMarks.slice(0, 2));

      // Inherit horn direction
      setHorn({
        ...horn,
        direction: Math.random() > 0.5 ? sire.horn.direction : dam.horn.direction,
      });

      // Inherit genetics (average + mutation)
      const blend = (g1: number, g2: number) =>
        Math.min(99, Math.max(35, Math.round((g1 + g2) / 2 + (Math.random() * 6 - 3))));

      setGenetics({
        bravura: blend(sire.genetics.bravura, dam.genetics.bravura),
        fuerza: blend(sire.genetics.fuerza, dam.genetics.fuerza),
        resistencia: blend(sire.genetics.resistencia, dam.genetics.resistencia),
        velocidad: blend(sire.genetics.velocidad, dam.genetics.velocidad),
        movilidad: blend(sire.genetics.movilidad, dam.genetics.movilidad),
        nobleza: blend(sire.genetics.nobleza, dam.genetics.nobleza),
        fijeza: blend(sire.genetics.fijeza, dam.genetics.fijeza),
        temperamento: blend(sire.genetics.temperamento, dam.genetics.temperamento),
        fertilidad: blend(sire.genetics.fertilidad, dam.genetics.fertilidad),
        potencial: Math.min(99, Math.round((sire.genetics.potencial + dam.genetics.potencial) / 2 + 4)),
      });
    }
  };

  const handleRandomizeName = () => {
    const pool = sex === 'toro' ? MALE_NAMES : FEMALE_NAMES;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setName(random);
  };

  const handleToggleMarking = (markName: string) => {
    if (selectedMarkings.includes(markName)) {
      setSelectedMarkings(selectedMarkings.filter((m) => m !== markName));
    } else {
      if (selectedMarkings.length < 3) {
        setSelectedMarkings([...selectedMarkings, markName]);
      }
    }
  };

  const handleAdjustGene = (geneKey: keyof GeneticsData, delta: number) => {
    if (delta > 0 && availablePoints <= 0) return;
    const currentVal = genetics[geneKey];
    if (delta < 0 && currentVal <= 40) return;
    if (delta > 0 && currentVal >= 99) return;

    setGenetics({
      ...genetics,
      [geneKey]: currentVal + delta,
    });
    setAvailablePoints(availablePoints - delta);
  };

  const quality = calculateQuality(genetics, morphology);
  const marketValue = calculateAnimalValue(quality, ageYears, sex, isSemental);

  const handleConfirmCreation = () => {
    if (!name.trim()) {
      setErrorMessage('Por favor, escribe un nombre para el animal.');
      return;
    }
    if (currentFunds < creationCost) {
      setErrorMessage(
        `Fondos insuficientes. Necesitas €${creationCost.toLocaleString(
          'es-ES'
        )}, pero dispones de €${currentFunds.toLocaleString('es-ES')}.`
      );
      return;
    }
    if (currentHerdCount >= currentCapacity) {
      setErrorMessage(
        `Capacidad máxima alcanzada (${currentHerdCount}/${currentCapacity}). Mejora los pastos o corrales en Mi Finca.`
      );
      return;
    }

    const number = Math.floor(Math.random() * 899) + 101;
    const sireObj = existingAnimals.find((a) => a.id === selectedSireId);
    const damObj = existingAnimals.find((a) => a.id === selectedDamId);

    const newAnimal: Animal = {
      id: `animal-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: name.trim(),
      number,
      sex,
      birthDay: currentDay - ageYears * 365,
      birthDate:
        creationMode === 'adulto'
          ? `Año ${2024 - ageYears}`
          : `Día ${currentDay}`,
      ageYears,
      ageMonths: 0,
      coat,
      markings: selectedMarkings,
      horn,
      morphology,
      genetics,
      quality,
      value: creationMode === 'adulto' ? marketValue : 5000,
      status: isSemental && sex === 'toro' ? 'semental' : 'disponible',
      fatherId: sireObj?.id,
      fatherName: sireObj?.name,
      motherId: damObj?.id,
      motherName: damObj?.name,
      offspringIds: [],
      history: [
        {
          id: `h-custom-${Date.now()}`,
          day: currentDay,
          date: `Día ${currentDay}`,
          title:
            creationMode === 'adulto'
              ? 'Adquisición de Toro Adulto'
              : 'Nacimiento de Cría en la Ganadería',
          description:
            creationMode === 'adulto'
              ? `Toro cuatreño (€25.000) incorporado a la vacada, listo para lidia o semental.`
              : `Cría fundada (€5.000). Genética fijada desde el nacimiento.`,
          type: creationMode === 'adulto' ? 'compra' : 'nacimiento',
        },
      ],
      weightKg:
        creationMode === 'adulto'
          ? sex === 'toro'
            ? 480 + Math.round(morphology.corpulence * 1.2)
            : 380 + Math.round(morphology.corpulence * 0.8)
          : creationMode === 'novillo'
          ? sex === 'toro'
            ? 390 + Math.round(morphology.corpulence * 1.0)
            : 320 + Math.round(morphology.corpulence * 0.7)
          : creationMode === 'anojo'
          ? sex === 'toro'
            ? 210 + Math.round(morphology.corpulence * 0.6)
            : 180 + Math.round(morphology.corpulence * 0.5)
          : sex === 'toro'
          ? 55 + Math.round(morphology.corpulence * 0.3)
          : 45 + Math.round(morphology.corpulence * 0.3),
      festejosCount: 0,
      isSemental: creationMode === 'adulto' && isSemental && sex === 'toro',
      imagePrompt: buildAnimalGeminiPrompt({
        sex,
        ageYears,
        coat,
        markings: selectedMarkings,
        horn,
        morphology,
        name: name.trim() || 'Bravo',
      }),
    };

    onSaveAnimal(newAnimal, creationCost);
  };

  const currentLivePrompt = buildAnimalGeminiPrompt({
    sex,
    ageYears,
    coat,
    markings: selectedMarkings,
    horn,
    morphology,
    name: name.trim() || 'Bravo',
  });

  const tabs: { id: CreatorTab; label: string }[] = [
    { id: 'aspecto', label: 'ASPECTO' },
    { id: 'cornamenta', label: 'CORNAMENTA' },
    { id: 'morfologia', label: 'MORFOLOGÍA' },
    { id: 'genetica', label: 'GENÉTICA' },
    ...(creationMode === 'cria' && availableSires.length > 0 && availableDams.length > 0
      ? [{ id: 'linaje' as CreatorTab, label: 'LINAJE' }]
      : []),
  ];

  const getStageTitle = () => {
    if (sex === 'vaca') {
      if (creationMode === 'adulto') return 'Vaca de Vientre (4 años)';
      if (creationMode === 'novillo') return 'Novilla / Utrera (3 años)';
      if (creationMode === 'anojo') return 'Añojita / Erala (1 año)';
      return 'Cría Hembra / Becerro (0 años)';
    }
    if (creationMode === 'adulto') return 'Toro Cuatreño Adulto (4 años)';
    if (creationMode === 'novillo') return 'Novillo Utrero (3 años)';
    if (creationMode === 'anojo') return 'Añojo / Choto (1 año)';
    return 'Cría / Becerro (0 años)';
  };

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition flex items-center gap-1 text-xs font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="text-center">
          <h2 className="text-sm font-serif font-bold text-white">
            Registro y Creación de Reses
          </h2>
          <span className="text-[10px] text-stone-400 font-mono">
            {getStageTitle()}
          </span>
        </div>

        <button
          onClick={handleConfirmCreation}
          className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-xs font-bold text-white transition uppercase tracking-wider font-mono shadow"
        >
          CREAR (€{creationCost.toLocaleString('es-ES')})
        </button>
      </div>

      {/* 4 STAGES SELECTION GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Stage 1: Adulto */}
        <button
          type="button"
          onClick={() => {
            setCreationMode('adulto');
            setErrorMessage(null);
          }}
          className={`p-3 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
            creationMode === 'adulto'
              ? 'bg-stone-900 border-amber-500/80 ring-2 ring-amber-500/40 shadow-xl'
              : 'bg-stone-950 border-stone-800 hover:border-stone-700 opacity-75 hover:opacity-100'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="p-1 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/60">
                <Crown className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[11px] font-bold text-amber-400">
                €25.000
              </span>
            </div>
            <h3 className="text-xs font-serif font-bold text-stone-100">
              {sex === 'vaca' ? 'Vaca Vientre' : 'Toro Adulto'}
            </h3>
            <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">
              4 años. Trapío pleno.
            </p>
          </div>
          <div className="mt-2 pt-1 border-t border-stone-800/80 text-[9px] text-amber-300 font-mono">
            {sex === 'vaca' ? 'Reproductora' : 'Apto lidia'}
          </div>
        </button>

        {/* Stage 2: Novillo / Utrero */}
        <button
          type="button"
          onClick={() => {
            setCreationMode('novillo');
            setErrorMessage(null);
          }}
          className={`p-3 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
            creationMode === 'novillo'
              ? 'bg-stone-900 border-emerald-500/80 ring-2 ring-emerald-500/40 shadow-xl'
              : 'bg-stone-950 border-stone-800 hover:border-stone-700 opacity-75 hover:opacity-100'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="p-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[11px] font-bold text-emerald-400">
                €18.000
              </span>
            </div>
            <h3 className="text-xs font-serif font-bold text-stone-100">
              {sex === 'vaca' ? 'Novilla' : 'Novillo Utrero'}
            </h3>
            <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">
              3 años. Gran vigor.
            </p>
          </div>
          <div className="mt-2 pt-1 border-t border-stone-800/80 text-[9px] text-emerald-300 font-mono">
            Novillada / Tienta
          </div>
        </button>

        {/* Stage 3: Añojo / Choto */}
        <button
          type="button"
          onClick={() => {
            setCreationMode('anojo');
            setErrorMessage(null);
          }}
          className={`p-3 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
            creationMode === 'anojo'
              ? 'bg-stone-900 border-sky-500/80 ring-2 ring-sky-500/40 shadow-xl'
              : 'bg-stone-950 border-stone-800 hover:border-stone-700 opacity-75 hover:opacity-100'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="p-1 rounded-lg bg-sky-950/80 text-sky-400 border border-sky-800/60">
                <Clock className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[11px] font-bold text-sky-400">
                €10.000
              </span>
            </div>
            <h3 className="text-xs font-serif font-bold text-stone-100">
              {sex === 'vaca' ? 'Añojita' : 'Añojo / Choto'}
            </h3>
            <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">
              1 año. Silueta ágil.
            </p>
          </div>
          <div className="mt-2 pt-1 border-t border-stone-800/80 text-[9px] text-sky-300 font-mono">
            En crecimiento
          </div>
        </button>

        {/* Stage 4: Cría / Becerro */}
        <button
          type="button"
          onClick={() => {
            setCreationMode('cria');
            setErrorMessage(null);
          }}
          className={`p-3 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
            creationMode === 'cria'
              ? 'bg-stone-900 border-rose-500/80 ring-2 ring-rose-500/40 shadow-xl'
              : 'bg-stone-950 border-stone-800 hover:border-stone-700 opacity-75 hover:opacity-100'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="p-1 rounded-lg bg-rose-950/80 text-rose-400 border border-rose-800/60">
                <Heart className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-[11px] font-bold text-rose-400">
                €5.000
              </span>
            </div>
            <h3 className="text-xs font-serif font-bold text-stone-100">
              {sex === 'vaca' ? 'Cría Hembra' : 'Cría / Becerro'}
            </h3>
            <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">
              0 años. Dehesa cuna.
            </p>
          </div>
          <div className="mt-2 pt-1 border-t border-stone-800/80 text-[9px] text-rose-300 font-mono">
            Bajo coste inicial
          </div>
        </button>
      </div>

      {/* Visual Live Representation Hero Box with Realistic Photo & Diagram */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-stone-950">
        <AnimalVisual
          sex={sex}
          coat={coat}
          markings={selectedMarkings}
          horn={horn}
          morphology={morphology}
          quality={quality}
          ageYears={ageYears}
          size="hero"
          showToggle={true}
          defaultMode="realistic"
        />

        {/* Quality and Age Badges */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <div className="bg-black/80 backdrop-blur border border-stone-700 px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs font-mono font-bold text-stone-200">
              {ageYears === 0 ? 'CRÍA (0 AÑOS)' : `${ageYears} AÑOS`}
            </span>
          </div>

          <div className="bg-black/80 backdrop-blur border border-stone-700 px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-300">
              CALIDAD {quality}/100
            </span>
          </div>
        </div>

        {/* Sex Selector Toggle - Placed right below Realista / Esquema toggle */}
        <div className="absolute top-[46px] right-3 z-20 flex items-center bg-stone-900/90 backdrop-blur border border-stone-700/80 rounded-lg p-0.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setSex('toro');
              handleRandomizeName();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition ${
              sex === 'toro'
                ? 'bg-rose-700 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            TORO
          </button>
          <button
            type="button"
            onClick={() => {
              setSex('vaca');
              handleRandomizeName();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition ${
              sex === 'vaca'
                ? 'bg-rose-700 text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            VACA
          </button>
        </div>
      </div>

      {/* Cría Growth Lifecycle Infographic */}
      {creationMode === 'cria' && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-rose-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Evolución y Maduración del Ejemplar
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              €8/día mantenimiento
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center font-sans">
            <div className="bg-stone-950 border border-rose-800/60 p-2 rounded-xl">
              <div className="text-[9px] text-rose-400 font-mono font-bold">0 AÑOS</div>
              <div className="text-[11px] font-serif font-bold text-white mt-0.5">Becerro</div>
              <div className="text-[9px] text-stone-400 mt-0.5">€5.000</div>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-2 rounded-xl">
              <div className="text-[9px] text-amber-400 font-mono font-bold">1 AÑO</div>
              <div className="text-[11px] font-serif font-bold text-stone-300 mt-0.5">Añojo/Choto</div>
              <div className="text-[9px] text-stone-400 mt-0.5">€9.500</div>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-2 rounded-xl">
              <div className="text-[9px] text-emerald-400 font-mono font-bold">2-3 AÑOS</div>
              <div className="text-[11px] font-serif font-bold text-stone-300 mt-0.5">Novillo</div>
              <div className="text-[9px] text-stone-400 mt-0.5">€16.000</div>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-2 rounded-xl">
              <div className="text-[9px] text-amber-500 font-mono font-bold">4+ AÑOS</div>
              <div className="text-[11px] font-serif font-bold text-stone-300 mt-0.5">Toro Adulto</div>
              <div className="text-[9px] text-amber-400 mt-0.5">€25.000+</div>
            </div>
          </div>
          <p className="text-[10px] text-stone-400 leading-tight italic">
            La cría mantendrá intactos sus rasgos de pelaje y encornadura, que se desarrollarán con mayor trapío conforme avances los días en el simulador.
          </p>
        </div>
      )}

      {/* Identificación del Animal Input Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
        <label className="block text-xs font-serif font-bold text-stone-200">
          {creationMode === 'cria' ? 'Nombre manual de la cría' : 'Nombre del Ejemplar'}
        </label>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              creationMode === 'cria'
                ? 'Escribe el nombre manual de la cría (ej: Bravucón, Candelaria II...)'
                : 'Escribe el nombre del animal...'
            }
            className="flex-1 px-4 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-rose-500 transition"
          />

          <button
            type="button"
            onClick={handleRandomizeName}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 border border-stone-700 transition"
            title="Generar nombre aleatorio"
          >
            <Dices className="w-5 h-5" />
          </button>
        </div>

        {/* Quick suggestions if mother or father is selected */}
        {creationMode === 'cria' && (selectedDamId || selectedSireId) && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-stone-400 font-mono">Sugerencias reata:</span>
            {(() => {
              const dam = existingAnimals.find((a) => a.id === selectedDamId);
              const sire = existingAnimals.find((a) => a.id === selectedSireId);
              const sugs: string[] = [];
              if (dam) {
                sugs.push(dam.name);
                sugs.push(`${dam.name} II`);
                if (dam.name.endsWith('a')) {
                  sugs.push(dam.name.slice(0, -1) + 'o');
                  sugs.push(dam.name.slice(0, -1) + 'ero');
                }
              }
              if (sire) {
                sugs.push(`${sire.name} Jr`);
              }
              return Array.from(new Set(sugs)).slice(0, 4).map((sug) => (
                <button
                  type="button"
                  key={sug}
                  onClick={() => setName(sug)}
                  className={`text-[10px] px-2 py-0.5 rounded transition ${
                    name === sug
                      ? 'bg-rose-900/80 text-rose-200 border border-rose-600 font-bold'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {sug}
                </button>
              ));
            })()}
          </div>
        )}

        {creationMode === 'adulto' && sex === 'toro' && (
          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isSemental}
              onChange={(e) => setIsSemental(e.target.checked)}
              className="w-4 h-4 rounded bg-stone-950 border-stone-700 text-rose-600 focus:ring-rose-500"
            />
            <span>Asignar directamente como Semental Oficial de la Ganadería</span>
          </label>
        )}
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="bg-rose-950/80 border border-rose-800 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-800 gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 text-xs font-bold font-mono tracking-wider transition rounded-t-xl border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-rose-500 text-white bg-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Aspecto (Pelaje y Accidentales) */}
      {activeTab === 'aspecto' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
                Pelajes Tradicionales de Casta Brava
              </h3>
              <span className="text-[10px] font-mono text-amber-400">
                Seleccionado: <strong>{coat}</strong>
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5 pb-1">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'Negros', label: 'Negros' },
                { id: 'Colorados y Castaños', label: 'Colorados / Castaños' },
                { id: 'Cárdenos y Grises', label: 'Cárdenos / Grises' },
                { id: 'Jaboneros y Claros', label: 'Jaboneros / Claros' },
                { id: 'Pintos y Manchados', label: 'Berrendos / Pintos' },
              ].map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCoatCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    coatCategoryFilter === cat.id
                      ? 'bg-rose-800 text-white font-bold shadow-sm'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COAT_CATALOG.filter(
                (c) => coatCategoryFilter === 'todos' || c.category === coatCategoryFilter
              ).map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCoat(c.name)}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    coat === c.name
                      ? 'bg-rose-950/70 border-rose-600 shadow ring-1 ring-rose-500/50'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {c.hexSecondary ? (
                    <div className="w-5 h-5 rounded-full border border-stone-600 flex-shrink-0 shadow overflow-hidden relative">
                      <div className="absolute inset-0 w-1/2" style={{ backgroundColor: c.hexPrimary }} />
                      <div className="absolute inset-0 left-1/2 w-1/2" style={{ backgroundColor: c.hexSecondary }} />
                    </div>
                  ) : (
                    <span
                      className="w-5 h-5 rounded-full border border-stone-600 flex-shrink-0 shadow"
                      style={{ backgroundColor: c.hexPrimary }}
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-200 truncate">{c.name}</div>
                    <div className="text-[10px] text-stone-400 truncate">{c.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accidentales */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
                Accidentales y Particularidades
              </h3>
              <span className="text-[11px] text-stone-400 font-mono">
                {selectedMarkings.length}/3 seleccionados
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {MARKINGS_CATALOG.map((mark) => {
                const isSelected = selectedMarkings.includes(mark.name);
                return (
                  <button
                    type="button"
                    key={mark.id}
                    onClick={() => handleToggleMarking(mark.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                      isSelected
                        ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {mark.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cornamenta */}
      {activeTab === 'cornamenta' && (
        <div className="space-y-4">
          {/* Live Interactive Horn Anatomy Radar */}
          <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2 flex items-center justify-center p-2 bg-black/50 rounded-xl border border-stone-800/80">
              <HornFrontalDiagram horn={horn} sex={sex} ageYears={ageYears} className="w-48 h-36" showLabels={false} />
            </div>
            <div className="w-full sm:w-1/2 space-y-1.5 text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                  Visor Anatómico en Vivo
                </span>
              </div>
              <h4 className="text-sm font-serif font-bold text-stone-100">
                {horn.direction} {horn.symmetry !== 'Simétrica' ? `(${horn.symmetry})` : ''}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {HORN_DIRECTIONS.find((d) => d.name === horn.direction)?.desc || 'Encornadura clásica de casta brava.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-stone-300 font-mono">
                  Grosor: {horn.thickness}
                </span>
                <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-stone-300 font-mono">
                  Longitud: {horn.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-stone-300 font-mono">
                  DIRECCIÓN DE LOS PITONES (ENCORNADURA)
                </label>
                <span className="text-[10px] text-amber-400 font-mono">
                  {horn.direction}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {HORN_DIRECTIONS.map((h) => (
                  <button
                    type="button"
                    key={h.id}
                    onClick={() => setHorn({ ...horn, direction: h.name })}
                    className={`p-2.5 rounded-xl text-left border text-xs transition relative overflow-hidden ${
                      horn.direction === h.name
                        ? 'bg-rose-950/70 border-rose-600 text-rose-200 font-bold shadow-md ring-1 ring-rose-500/50'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs">{h.name}</span>
                      {horn.direction === h.name && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400 font-normal mt-1 leading-tight">
                      {h.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 font-mono mb-2">
                SIMETRÍA DE LA TESTUZ
              </label>
              <div className="grid grid-cols-3 gap-2">
                {HORN_SYMMETRIES.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setHorn({ ...horn, symmetry: s.name })}
                    className={`p-2 rounded-xl text-center border text-xs transition ${
                      horn.symmetry === s.name
                        ? 'bg-rose-950/70 border-rose-600 text-rose-200 font-bold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 font-mono mb-2">
                GROSOR Y MAZORCA (ASTIGORDO / ASTIFINO)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {HORN_THICKNESSES.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setHorn({ ...horn, thickness: t.name })}
                    className={`p-2 rounded-xl text-center border text-xs transition ${
                      horn.thickness === t.name
                        ? 'bg-rose-950/70 border-rose-600 text-rose-200 font-bold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Morfología */}
      {activeTab === 'morfologia' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
            Dimensiones y Proporciones Físicas
          </h3>

          {[
            { key: 'corpulence' as const, label: 'Corpulencia y Caja' },
            { key: 'chest' as const, label: 'Pecho y Esternón' },
            { key: 'morrillo' as const, label: 'Morrillo (Musculatura Cervical)' },
            { key: 'height' as const, label: 'Alzada / Altura a la Cruz' },
            { key: 'length' as const, label: 'Longitud del Tronco' },
            { key: 'head' as const, label: 'Cabeza y Testuz' },
          ].map((slider) => (
            <div key={slider.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-medium">{slider.label}</span>
                <span className="text-amber-400 font-mono font-bold">
                  {morphology[slider.key]}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                value={morphology[slider.key]}
                onChange={(e) =>
                  setMorphology({
                    ...morphology,
                    [slider.key]: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-rose-500 bg-stone-950 rounded-lg h-2"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Genética */}
      {activeTab === 'genetica' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
            <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
              Atributos de Casta y Bravura
            </h3>
            <div className="flex items-center gap-1.5 bg-rose-950/80 px-2.5 py-1 rounded-lg border border-rose-800/50">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-mono font-bold text-rose-300">
                {availablePoints} Puntos disponibles
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'bravura' as const, label: 'Bravura en la Suerte de Varas' },
              { key: 'nobleza' as const, label: 'Nobleza y Humillación' },
              { key: 'fuerza' as const, label: 'Fuerza Muscular y Empuje' },
              { key: 'resistencia' as const, label: 'Resistencia en la Lidia' },
              { key: 'movilidad' as const, label: 'Movilidad y Galope' },
              { key: 'fijeza' as const, label: 'Fijeza en el Engaño' },
              { key: 'temperamento' as const, label: 'Temperamento y Casta' },
            ].map((gene) => {
              const val = genetics[gene.key];
              return (
                <div key={gene.key} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-stone-300 font-medium flex-1 truncate">
                    {gene.label}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdjustGene(gene.key, -1)}
                      className="w-7 h-7 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 font-bold flex items-center justify-center transition"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-white">
                      {val}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdjustGene(gene.key, 1)}
                      disabled={availablePoints <= 0}
                      className="w-7 h-7 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-amber-400 font-bold flex items-center justify-center transition disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Linaje de Padres (Optional for Cría) */}
      {activeTab === 'linaje' && creationMode === 'cria' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            Selección de Progenitores de la Ganadería
          </h3>
          <p className="text-[11px] text-stone-400">
            Al seleccionar un padre y una madre de tus pastos, la cría heredará una mezcla directa de sus pelajes, encornaduras y estadísticas genéticas.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 font-mono mb-1.5">
                PADRE (SEMENTAL):
              </label>
              <select
                value={selectedSireId}
                onChange={(e) => {
                  setSelectedSireId(e.target.value);
                  if (e.target.value && selectedDamId) {
                    handleApplyParentGenetics(e.target.value, selectedDamId);
                  }
                }}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 font-serif"
              >
                <option value="">-- Sin padre directo --</option>
                {availableSires.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (#{s.number}) - Brav: {s.genetics.bravura}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 font-mono mb-1.5">
                MADRE (VACA):
              </label>
              <select
                value={selectedDamId}
                onChange={(e) => {
                  setSelectedDamId(e.target.value);
                  if (selectedSireId && e.target.value) {
                    handleApplyParentGenetics(selectedSireId, e.target.value);
                  }
                }}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 font-serif"
              >
                <option value="">-- Sin madre directa --</option>
                {availableDams.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} (#{d.number}) - Brav: {d.genetics.bravura}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Bottom Action Card */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-stone-400 uppercase font-mono block">
            Coste de Fundación / Compra:
          </span>
          <span className="text-lg font-mono font-bold text-amber-400">
            €{creationCost.toLocaleString('es-ES')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleConfirmCreation}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-xs tracking-wider shadow-lg flex items-center gap-2 transition active:scale-[0.98]"
        >
          CONFIRMAR {creationMode === 'adulto' ? 'COMPRA' : 'CRÍA'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
