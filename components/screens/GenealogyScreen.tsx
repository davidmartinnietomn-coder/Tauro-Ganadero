import React, { useState } from 'react';
import { GitFork, ArrowLeft, ChevronDown, Sparkles, Heart } from 'lucide-react';
import { Animal, GameState } from '../../types/game';
import { AnimalVisual } from '../common/AnimalVisual';

interface GenealogyScreenProps {
  initialAnimal?: Animal;
  gameState: GameState;
  onSelectAnimal: (animal: Animal) => void;
  onBack?: () => void;
}

export const GenealogyScreen: React.FC<GenealogyScreenProps> = ({
  initialAnimal,
  gameState,
  onSelectAnimal,
  onBack,
}) => {
  const { animals } = gameState;
  const activeHerd = animals.filter((a) => a.status !== 'vendido');

  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(
    initialAnimal?.id || activeHerd[0]?.id || ''
  );

  const currentAnimal = animals.find((a) => a.id === selectedAnimalId) || activeHerd[0];

  // Resolve Father & Mother
  const father = animals.find((a) => a.id === currentAnimal?.fatherId);
  const mother = animals.find((a) => a.id === currentAnimal?.motherId);

  // Resolve Grandparents
  const paternalGrandfather = father ? animals.find((a) => a.id === father.fatherId) : undefined;
  const paternalGrandmother = father ? animals.find((a) => a.id === father.motherId) : undefined;
  const maternalGrandfather = mother ? animals.find((a) => a.id === mother.fatherId) : undefined;
  const maternalGrandmother = mother ? animals.find((a) => a.id === mother.motherId) : undefined;

  // Resolve Offspring
  const offspring = animals.filter(
    (a) => a.fatherId === currentAnimal?.id || a.motherId === currentAnimal?.id
  );

  const renderMiniCard = (
    animalObj: Animal | undefined,
    roleLabel: string,
    fallbackName?: string
  ) => {
    if (!animalObj) {
      return (
        <div className="bg-stone-900/50 border border-dashed border-stone-800 rounded-xl p-2.5 text-center flex flex-col justify-center items-center min-h-[90px]">
          <span className="text-[9px] uppercase font-mono text-stone-500">{roleLabel}</span>
          <span className="text-xs text-stone-400 font-serif mt-1">
            {fallbackName || 'Línea Fundacional'}
          </span>
          <span className="text-[10px] text-stone-500 font-mono">Sin registrar</span>
        </div>
      );
    }

    return (
      <div
        onClick={() => setSelectedAnimalId(animalObj.id)}
        className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-rose-600/50 rounded-xl p-2.5 transition flex flex-col items-center text-center shadow-sm"
      >
        <span className="text-[9px] uppercase font-mono text-amber-500 font-semibold mb-1">
          {roleLabel}
        </span>
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 bg-stone-950 mb-1">
          <AnimalVisual animal={animalObj} size="sm" className="w-full h-full" />
        </div>
        <div className="text-xs font-serif font-bold text-white group-hover:text-rose-400 truncate max-w-[120px]">
          {animalObj.name}
        </div>
        <span className="text-[10px] text-stone-400 font-mono">
          #{animalObj.number} • Cal. {animalObj.quality}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto">
      {/* Header matching Screen 6 */}
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-serif font-bold text-white">
              Registro de Sangre
            </h2>
          </div>
        )}

        {/* Animal Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedAnimalId}
            onChange={(e) => setSelectedAnimalId(e.target.value)}
            className="bg-stone-900 border border-stone-700 text-stone-100 text-xs rounded-xl px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-rose-500 font-serif"
          >
            {activeHerd.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} (#{a.number}) - {a.sex === 'toro' ? 'Toro' : 'Vaca'}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-stone-400">
        Trazabilidad genética del libro genealógico. Haz clic en cualquier ancestro o descendiente para analizar su ficha.
      </p>

      {/* Main Focus Animal Card */}
      {currentAnimal && (
        <div className="bg-stone-900 border border-rose-800/60 rounded-2xl p-4 shadow-lg flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-700 bg-stone-950 flex-shrink-0">
            <AnimalVisual animal={currentAnimal} size="sm" className="w-full h-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400">
                #{currentAnimal.number.toString().padStart(4, '0')}
              </span>
              <h3 className="text-lg font-serif font-bold text-white truncate">
                {currentAnimal.name}
              </h3>
            </div>

            <p className="text-xs text-stone-300 mt-0.5">
              {currentAnimal.sex === 'toro' ? 'Toro' : 'Vaca'} • {currentAnimal.coat} • {currentAnimal.ageYears} años
            </p>

            <div className="mt-2 flex items-center gap-3 text-xs font-mono">
              <span className="text-stone-400">
                Bravura: <strong className="text-rose-400">{currentAnimal.genetics.bravura}</strong>
              </span>
              <span className="text-stone-400">
                Calidad: <strong className="text-amber-400">{currentAnimal.quality}</strong>
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectAnimal(currentAnimal)}
            className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition flex-shrink-0"
          >
            Ficha
          </button>
        </div>
      )}

      {/* Genealogical Tree Layout */}
      <div className="space-y-4 pt-2">
        {/* Tier 1: Grandparents */}
        <div>
          <span className="text-[10px] uppercase font-mono text-stone-400 tracking-wider block mb-2 text-center">
            ─── LÍNEA DE ABUELOS ───
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {renderMiniCard(paternalGrandfather, 'Abuelo Paterno')}
            {renderMiniCard(paternalGrandmother, 'Abuela Paterna')}
            {renderMiniCard(maternalGrandfather, 'Abuelo Materno')}
            {renderMiniCard(maternalGrandmother, 'Abuela Materna')}
          </div>
        </div>

        {/* Tree Connectors */}
        <div className="flex justify-around px-8 text-stone-600 font-mono text-xs">
          <span>↓</span>
          <span>↓</span>
        </div>

        {/* Tier 2: Parents */}
        <div>
          <span className="text-[10px] uppercase font-mono text-stone-400 tracking-wider block mb-2 text-center">
            ─── PROGENITORES DIRECTOS ───
          </span>
          <div className="grid grid-cols-2 gap-3">
            {renderMiniCard(father, 'Padre (Semental)', currentAnimal?.fatherName)}
            {renderMiniCard(mother, 'Madre (Vaca de Vientre)', currentAnimal?.motherName)}
          </div>
        </div>

        {/* Tree Connectors */}
        <div className="flex justify-center text-stone-600 font-mono text-xs">
          <span>↓</span>
        </div>

        {/* Tier 3: Offspring / Descendencia */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
              Descendencia Directa ({offspring.length} crías)
            </span>
            <span className="text-[11px] font-mono text-amber-400">
              Generación F1
            </span>
          </div>

          {offspring.length === 0 ? (
            <p className="text-xs text-stone-400 italic py-2 text-center">
              Este ejemplar aún no tiene descendencia registrada en la vacada.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {offspring.map((calf) => renderMiniCard(calf, calf.sex === 'toro' ? 'Hijo' : 'Hija'))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
