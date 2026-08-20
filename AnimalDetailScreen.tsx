import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Calendar,
  GitFork,
  Coins,
  Crown,
  Shield,
  Clock,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Camera,
  Activity,
  Compass,
  FileText,
  Flame,
  Scale,
  Zap,
} from 'lucide-react';
import { Animal, GameState } from '../../types/game';
import { AnimalVisual, HornFrontalDiagram } from '../common/AnimalVisual';
import { generateAnimalImage } from '../../services/imageGeneration';

interface AnimalDetailScreenProps {
  animal: Animal;
  gameState: GameState;
  onBack: () => void;
  onOpenBreeding: (animal: Animal) => void;
  onOpenGenealogy: (animal: Animal) => void;
  onAssignToFestejo: (animal: Animal) => void;
  onSellAnimal: (animal: Animal) => void;
  onMakeSemental: (animal: Animal) => void;
  onUpdateAnimalImage?: (animalId: string, imageUrl: string, prompt: string) => void;
}

type DetailTab = 'morfologia' | 'genetica' | 'linaje' | 'historial';

export const AnimalDetailScreen: React.FC<AnimalDetailScreenProps> = ({
  animal,
  gameState,
  onBack,
  onOpenBreeding,
  onOpenGenealogy,
  onAssignToFestejo,
  onSellAnimal,
  onMakeSemental,
  onUpdateAnimalImage,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('morfologia');
  const [showSellModal, setShowSellModal] = useState(false);
  const [showSementalModal, setShowSementalModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Guarismo (year digit burned into rib)
  const birthYear = gameState.currentYear - animal.ageYears;
  const guarismo = Math.abs(birthYear) % 10;

  // Category determination
  const getCategoryLabel = () => {
    if (animal.sex === 'vaca') {
      if (animal.ageYears === 0) return 'Becerro hembra';
      if (animal.ageYears === 1) return 'Añojita / Erala';
      return 'Vaca de Vientre';
    }
    if (animal.isSemental) return 'Semental Oficial';
    if (animal.isIndultado) return 'Toro Indultado';
    if (animal.ageYears === 0) return 'Becerro de Cuna';
    if (animal.ageYears === 1) return 'Añojo / Choto';
    if (animal.ageYears === 2) return 'Eral de Lidia';
    if (animal.ageYears === 3) return 'Novillo Utrero';
    return 'Toro Cuatreño';
  };

  const handleUpdatePhoto = async () => {
    setIsGenerating(true);
    setFeedbackMessage(null);
    try {
      const result = await generateAnimalImage(animal, true);
      if (onUpdateAnimalImage) {
        onUpdateAnimalImage(animal.id, result.imageUrl, result.prompt);
      }
      setFeedbackMessage('Retrato de campo actualizado con éxito.');
      setShowPhotoModal(false);
    } catch {
      setFeedbackMessage('Se ha mantenido la estampa fidedigna de la dehesa.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  const isEligibleForBreeding =
    animal.status === 'disponible' || animal.isSemental || (animal.sex === 'vaca' && animal.ageYears >= 2);

  const canBeSemental =
    animal.sex === 'toro' &&
    !animal.isSemental &&
    (animal.isIndultado || animal.quality >= 70 || animal.genetics.bravura >= 80);

  const canBeAssignedToFestejo =
    animal.status === 'disponible' && animal.sex === 'toro' && animal.ageYears >= 2;

  return (
    <div className="space-y-4 pb-28 max-w-xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition flex items-center gap-1.5 text-xs font-mono font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          VOLVER AL LIBRO DE CAMPO
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-800 px-2 py-1 rounded-lg">
            CROTAL #{animal.number.toString().padStart(4, '0')}
          </span>
        </div>
      </div>

      {/* Main Identity Passport Card (Identidad Visual Única) */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 shadow-2xl">
        {/* Top Passport Ribbon */}
        <div className="bg-gradient-to-r from-rose-950 via-stone-900 to-amber-950 px-4 py-2 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-amber-200">
              {gameState.ganaderiaName || 'Ganadería Brava'} • Libro Oficial
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
              Divisa: Grana y Oro
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/60">
              G-{guarismo}
            </span>
          </div>
        </div>

        {/* Hero Photo Section (Clean, without messy text overlapping the animal) */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-950 overflow-hidden">
          <AnimalVisual animal={animal} size="hero" className="w-full h-full" />

          {/* Clean Floating Status Badges (Well Spaced) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-stone-700 text-white text-[11px] font-serif font-bold flex items-center gap-1.5 shadow-md">
              {animal.isSemental && <Crown className="w-3 h-3 text-amber-400" />}
              {animal.isIndultado && <Award className="w-3 h-3 text-rose-400" />}
              {getCategoryLabel()}
            </span>
            {animal.status === 'reservado' && (
              <span className="px-2 py-1 rounded-lg bg-amber-950/90 border border-amber-600/60 text-amber-200 text-[10px] font-mono font-bold shadow-md">
                Reservado
              </span>
            )}
          </div>

          {/* Quick Photo Refresh Action Button */}
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={() => setShowPhotoModal(true)}
              className="p-2 rounded-xl bg-black/75 hover:bg-stone-900 border border-stone-700 text-stone-300 hover:text-amber-400 transition backdrop-blur-md shadow-lg flex items-center gap-1 text-[10px] font-mono font-semibold"
              title="Actualizar retrato fidedigno"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Retrato</span>
            </button>
          </div>
        </div>

        {/* Clean Identification Info Header (Positioned clearly underneath the photo) */}
        <div className="p-4 bg-stone-900/90 border-t border-stone-800 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                  Nº {animal.number.toString().padStart(4, '0')}
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  Guarismo {guarismo}
                </span>
                <span className="text-[11px] text-stone-400">•</span>
                <span className="text-[11px] font-mono text-stone-300 capitalize">
                  {animal.sex}
                </span>
              </div>
              <h1 className="text-2xl font-serif font-black text-white mt-1 tracking-tight">
                {animal.name}
              </h1>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-stone-400 block tracking-wider">
                Valoración Tasada
              </span>
              <span className="text-xl font-mono font-black text-amber-400">
                €{animal.value.toLocaleString('es-ES')}
              </span>
            </div>
          </div>

          {/* Summary Badges Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-sans">
            <div className="bg-stone-950/80 border border-stone-800 p-2 rounded-xl">
              <span className="text-[9px] uppercase font-mono text-stone-400 block">
                Edad Oficial
              </span>
              <span className="text-xs font-bold text-white mt-0.5 block">
                {animal.ageYears} {animal.ageYears === 1 ? 'año' : 'años'} {animal.ageMonths > 0 ? `y ${animal.ageMonths}m` : ''}
              </span>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-2 rounded-xl">
              <span className="text-[9px] uppercase font-mono text-stone-400 block">
                Capa Principal
              </span>
              <span className="text-xs font-bold text-stone-200 mt-0.5 block truncate">
                {animal.coat}
              </span>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-2 rounded-xl">
              <span className="text-[9px] uppercase font-mono text-stone-400 block">
                Encornadura
              </span>
              <span className="text-xs font-bold text-amber-300 mt-0.5 block truncate">
                {animal.horn.direction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {feedbackMessage && (
        <div className="bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Organized Navigation Tabs */}
      <div className="flex border-b border-stone-800 gap-1 overflow-x-auto pb-1">
        {[
          { id: 'morfologia' as const, label: 'TRAPÍO & MORFOLOGÍA', icon: Scale },
          { id: 'genetica' as const, label: 'BRAVURA & CASTA', icon: Flame },
          { id: 'genealogia' as const, label: 'LINAJE & REATA', icon: GitFork },
          { id: 'historial' as const, label: 'HISTORIAL', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-bold font-mono tracking-wider transition rounded-t-xl border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-200 bg-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: TRAPÍO & MORFOLOGÍA */}
      {activeTab === 'morfologia' && (
        <div className="space-y-3">
          {/* Card: Encornadura & Astas */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
              <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                Estudio de la Encornadura
              </h3>
              <span className="text-[10px] font-mono text-stone-400">
                Puntal y Mazorca
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-950/80 p-3 rounded-xl border border-stone-800/80">
              <div className="w-full sm:w-36 flex items-center justify-center bg-black/60 rounded-lg p-1.5 border border-stone-800">
                <HornFrontalDiagram horn={animal.horn} sex={animal.sex} ageYears={animal.ageYears} className="w-32 h-24" showLabels={false} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 flex-1 w-full">
                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800/80">
                  <span className="text-[9px] uppercase font-mono text-stone-400 block">
                    Disposición
                  </span>
                  <span className="text-xs font-bold text-white mt-0.5 block">
                    {animal.horn.direction}
                  </span>
                </div>

                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800/80">
                  <span className="text-[9px] uppercase font-mono text-stone-400 block">
                    Simetría
                  </span>
                  <span className="text-xs font-bold text-stone-200 mt-0.5 block">
                    {animal.horn.symmetry}
                  </span>
                </div>

                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800/80">
                  <span className="text-[9px] uppercase font-mono text-stone-400 block">
                    Grosor Mazorca
                  </span>
                  <span className="text-xs font-bold text-stone-200 mt-0.5 block">
                    {animal.horn.thickness}
                  </span>
                </div>

                <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800/80">
                  <span className="text-[9px] uppercase font-mono text-stone-400 block">
                    Longitud Pitón
                  </span>
                  <span className="text-xs font-bold text-stone-200 mt-0.5 block">
                    {animal.horn.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Pelaje & Accidentales */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
              <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-stone-400" />
                Pelaje y Particularidades
              </h3>
              <span className="text-[10px] font-mono text-amber-400">
                {animal.coat}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-stone-300 leading-relaxed">
                Ejemplar con capa característica <strong>{animal.coat}</strong> propia del encaste de la ganadería, con gran brillo y uniformidad en el lomo.
              </div>

              {animal.markings && animal.markings.length > 0 ? (
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone-400 block mb-1.5">
                    Accidentales y Manchas Registradas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {animal.markings.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 font-mono"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-stone-400 italic">
                  Sin accidentales añadidos (capa uniforme limpia).
                </div>
              )}
            </div>
          </div>

          {/* Card: Medidas y Conformación Corporal */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
              <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Conformación y Peso
              </h3>
              <span className="text-xs font-mono font-bold text-amber-400">
                Peso: {animal.weightKg} kg
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 text-center">
                <span className="text-[9px] uppercase font-mono text-stone-400 block">
                  Morrillo
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  {animal.morphology.morrillo}/100
                </span>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 text-center">
                <span className="text-[9px] uppercase font-mono text-stone-400 block">
                  Pecho y Caja
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  {animal.morphology.chest}/100
                </span>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 text-center">
                <span className="text-[9px] uppercase font-mono text-stone-400 block">
                  Corpulencia
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  {animal.morphology.corpulence}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BRAVURA & CASTA */}
      {activeTab === 'genetica' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
            <div>
              <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                Índice Zootécnico de Lidia
              </h3>
              <span className="text-[10px] text-stone-400">
                Ponderación de bravura, empuje y fijeza
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-mono font-bold text-amber-400">
                {animal.quality}/100
              </span>
              <span className="text-[9px] font-mono text-stone-400 block">
                Trapío Global
              </span>
            </div>
          </div>

          {/* Genetic Bars */}
          <div className="space-y-3 pt-1">
            {[
              {
                label: 'Bravura en el Caballo',
                val: animal.genetics.bravura,
                desc: 'Prontitud y empuje bajo el peto empujando con los riñones.',
                color: 'bg-rose-600',
              },
              {
                label: 'Nobleza y Humillación',
                val: animal.genetics.nobleza,
                desc: 'Colocación de cara y entrega en el engaño sin derrotes secos.',
                color: 'bg-amber-500',
              },
              {
                label: 'Fuerza Muscular',
                val: animal.genetics.fuerza,
                desc: 'Potencia de remate en tablas y aguante en el tercio final.',
                color: 'bg-stone-400',
              },
              {
                label: 'Resistencia en la Lidia',
                val: animal.genetics.resistencia,
                desc: 'Fondo de casta para llegar con fuelle a la suerte suprema.',
                color: 'bg-stone-400',
              },
              {
                label: 'Movilidad y Galope',
                val: animal.genetics.movilidad,
                desc: 'Salida alegre de toriles y repetición incansable de embestidas.',
                color: 'bg-emerald-500',
              },
              {
                label: 'Fijeza en la Muleta',
                val: animal.genetics.fijeza,
                desc: 'Atención exclusiva al engaño sin mirar a los tendidos.',
                color: 'bg-indigo-400',
              },
            ].map((item) => (
              <div key={item.label} className="bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                <div className="flex justify-between items-center text-xs font-mono text-stone-200 mb-1">
                  <span className="font-bold">{item.label}</span>
                  <span className="font-bold text-amber-300">{item.val}/100</span>
                </div>
                <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.val}%` }}
                  />
                </div>
                <p className="text-[10px] text-stone-400 font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LINAJE & REATA */}
      {activeTab === 'linaje' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
            <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <GitFork className="w-4 h-4 text-amber-400" />
              Carta Genealógica de la Reata
            </h3>
            <span className="text-[10px] font-mono text-stone-400">
              Generación {animal.generation || 1}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Father / Sire */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-[9px] uppercase font-mono text-amber-400 font-bold block mb-1">
                PADRE / SEMENTAL
              </span>
              <div className="text-sm font-serif font-bold text-white">
                {animal.sireId ? `Semental #${animal.sireId.slice(0, 6)}` : 'Semental Fundacional'}
              </div>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Línea de Casta Brava
              </span>
            </div>

            {/* Mother / Dam */}
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="text-[9px] uppercase font-mono text-rose-400 font-bold block mb-1">
                MADRE / VACA
              </span>
              <div className="text-sm font-serif font-bold text-white">
                {animal.damId ? `Vaca #${animal.damId.slice(0, 6)}` : 'Vaca de Vientre Matriz'}
              </div>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Reata de la Casa
              </span>
            </div>
          </div>

          {/* Offspring Info */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
              Descendencia Registrada en la Ganadería:
            </span>
            <div className="text-xs text-stone-200">
              {animal.offspringIds && animal.offspringIds.length > 0 ? (
                <span>
                  <strong>{animal.offspringIds.length}</strong> crías y descendientes directos registrados en el libro ganadero.
                </span>
              ) : (
                <span className="text-stone-400 italic">
                  No cuenta aún con hijos registrados en los libros de cubrición.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HISTORIAL */}
      {activeTab === 'historial' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
            <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Diario de Faenas y Acontecimientos
            </h3>
            <span className="text-[10px] font-mono text-stone-400">
              {animal.history?.length || 0} Registros
            </span>
          </div>

          <div className="space-y-2">
            {animal.history && animal.history.length > 0 ? (
              animal.history.map((h) => (
                <div
                  key={h.id}
                  className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-100">{h.title}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{h.date}</span>
                    </div>
                    <p className="text-stone-400 text-[11px] leading-relaxed">{h.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-stone-400 italic text-center py-4">
                No hay acontecimientos extraordinarios registrados todavía.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Action Bar (Fixed, Well-Organized, Never Overlapping) */}
      <div className="space-y-2 pt-2">
        {/* Button 1: Reproducir */}
        <button
          onClick={() => onOpenBreeding(animal)}
          disabled={!isEligibleForBreeding}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 disabled:opacity-40 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition"
        >
          <Heart className="w-4 h-4 fill-white" />
          REPRODUCIR EN LA DEHESA
        </button>

        {/* Button 2: Asignar a Festejo */}
        {animal.sex === 'toro' && (
          <button
            onClick={() => onAssignToFestejo(animal)}
            disabled={!canBeAssignedToFestejo}
            className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 disabled:opacity-40 text-stone-100 font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition"
          >
            <Calendar className="w-4 h-4 text-stone-400" />
            ASIGNAR A FESTEJO O PLAZA
          </button>
        )}

        {/* Button 3: Ver Genealogía Completa */}
        <button
          onClick={() => onOpenGenealogy(animal)}
          className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition"
        >
          <GitFork className="w-4 h-4 text-amber-500" />
          VER ÁRBOL GENEALÓGICO COMPLETO
        </button>

        {/* Button 4: Convertir en Semental (if eligible) */}
        {canBeSemental && (
          <button
            onClick={() => setShowSementalModal(true)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition"
          >
            <Crown className="w-4 h-4" />
            CONVERTIR EN SEMENTAL OFICIAL
          </button>
        )}

        {/* Button 5: Vender Ejemplar */}
        <button
          onClick={() => setShowSellModal(true)}
          disabled={animal.status === 'reservado'}
          className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-stone-900 text-stone-400 hover:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <Coins className="w-3.5 h-3.5" />
          VENDER EJEMPLAR POR €{animal.value.toLocaleString('es-ES')}
        </button>
      </div>

      {/* Photo Update Modal (Clean, no mentions of prompts or internal AI jargon) */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-white">
              Retrato Oficial de Campo
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              ¿Deseas tomar un nuevo retrato fotográfico fidedigno de <strong>{animal.name}</strong> (#{animal.number}) respetando su pelaje <strong>{animal.coat}</strong> y encornadura <strong>{animal.horn.direction}</strong>?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdatePhoto}
                disabled={isGenerating}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Fotografiando...
                  </>
                ) : (
                  'Tomar Retrato'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sale Confirmation Modal */}
      {showSellModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-white">
              Venta de Ejemplar
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              ¿Deseas vender a <strong>{animal.name}</strong> (#{animal.number}) por el valor de mercado tasado de{' '}
              <strong className="text-amber-400 font-mono">€{animal.value.toLocaleString('es-ES')}</strong>?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSellModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowSellModal(false);
                  onSellAnimal(animal);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold"
              >
                Confirmar Venta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert to Stud Modal */}
      {showSementalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-white">
              Convertir en Semental
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Al convertir a <strong>{animal.name}</strong> en semental oficial, quedará reservado exclusivamente para la cubrición y transmisión de sangre en la dehesa.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSementalModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowSementalModal(false);
                  onMakeSemental(animal);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold"
              >
                Nombrar Semental
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
