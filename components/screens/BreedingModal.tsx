import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  Shield,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Tag,
  Dices,
} from 'lucide-react';
import { Animal, BreedingPair, GameState } from '../../types/game';
import { AnimalVisual } from '../common/AnimalVisual';

interface BreedingModalProps {
  initialAnimal?: Animal;
  gameState: GameState;
  onConfirmBreeding: (sire: Animal, dam: Animal, customCalfName?: string) => void;
  onClose: () => void;
}

export const BreedingModal: React.FC<BreedingModalProps> = ({
  initialAnimal,
  gameState,
  onConfirmBreeding,
  onClose,
}) => {
  const { animals, game, facilities } = gameState;

  // Eligible Sires (Toro, age >= 2, disponible or semental)
  const availableSires = animals.filter(
    (a) => a.sex === 'toro' && a.ageYears >= 2 && (a.status === 'disponible' || a.isSemental)
  );

  // Eligible Dams (Vaca, age >= 2, disponible)
  const availableDams = animals.filter(
    (a) => a.sex === 'vaca' && a.ageYears >= 2 && a.status === 'disponible'
  );

  const [selectedSireId, setSelectedSireId] = useState<string>(
    initialAnimal?.sex === 'toro'
      ? initialAnimal.id
      : availableSires.find((s) => s.isSemental)?.id || availableSires[0]?.id || ''
  );

  const [selectedDamId, setSelectedDamId] = useState<string>(
    initialAnimal?.sex === 'vaca' ? initialAnimal.id : availableDams[0]?.id || ''
  );

  const [customCalfName, setCustomCalfName] = useState<string>('');

  const selectedSire = animals.find((a) => a.id === selectedSireId);
  const selectedDam = animals.find((a) => a.id === selectedDamId);

  // Suggested traditional names based on parents
  const getLineageSuggestions = () => {
    const list: string[] = [];
    if (selectedDam) {
      list.push(selectedDam.name);
      list.push(`${selectedDam.name} II`);
      if (selectedDam.name.endsWith('a')) {
        list.push(selectedDam.name.slice(0, -1) + 'o');
        list.push(selectedDam.name.slice(0, -1) + 'ero');
      }
    }
    if (selectedSire) {
      list.push(`Hijo de ${selectedSire.name}`);
      list.push(`${selectedSire.name} Jr`);
    }
    list.push('Bravucón', 'Castaño', 'Hechicero', 'Clavelito', 'Rompedor');
    return Array.from(new Set(list)).slice(0, 5);
  };

  // Genetic forecast
  const avgBravura =
    selectedSire && selectedDam
      ? Math.round((selectedSire.genetics.bravura + selectedDam.genetics.bravura) / 2)
      : 70;
  const avgNobleza =
    selectedSire && selectedDam
      ? Math.round((selectedSire.genetics.nobleza + selectedDam.genetics.nobleza) / 2)
      : 70;
  const avgFuerza =
    selectedSire && selectedDam
      ? Math.round((selectedSire.genetics.fuerza + selectedDam.genetics.fuerza) / 2)
      : 70;

  const reproFacility = facilities.find((f) => f.id === 'reproduccion');
  const maxActivePairs = reproFacility?.capacity || 4;
  const currentActivePairs = gameState.breeding.length;

  const handleConfirm = () => {
    if (!selectedSire || !selectedDam) return;
    onConfirmBreeding(selectedSire, selectedDam, customCalfName.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-serif font-bold text-white">
              Cruce & Reproducción
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-400">
            Parideras: {currentActivePairs}/{maxActivePairs} activas
          </span>
        </div>

        {availableSires.length === 0 || availableDams.length === 0 ? (
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-center space-y-2">
            <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
            <h4 className="text-xs font-bold text-white">
              No hay reproductores disponibles
            </h4>
            <p className="text-[11px] text-stone-400">
              Necesitas al menos un toro/semental y una vaca de vientre mayor de 2 años en estado disponible.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Sire and Dam Selectors */}
            <div className="grid grid-cols-2 gap-3">
              {/* Sire Selection */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                  PADRE (SEMENTAL)
                </span>
                <select
                  value={selectedSireId}
                  onChange={(e) => setSelectedSireId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs rounded-lg p-2 focus:outline-none focus:border-rose-500"
                >
                  {availableSires.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (#{s.number}) - Brav. {s.genetics.bravura}
                    </option>
                  ))}
                </select>

                {selectedSire && (
                  <div className="text-[11px] text-stone-400 font-mono space-y-0.5 pt-1">
                    <div>Pelaje: <strong className="text-stone-200">{selectedSire.coat}</strong></div>
                    <div>Calidad: <strong className="text-amber-400">{selectedSire.quality}/100</strong></div>
                  </div>
                )}
              </div>

              {/* Dam Selection */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                  MADRE (VACA DE VIENTRE)
                </span>
                <select
                  value={selectedDamId}
                  onChange={(e) => setSelectedDamId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-xs rounded-lg p-2 focus:outline-none focus:border-rose-500"
                >
                  {availableDams.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} (#{d.number}) - Cal. {d.quality}
                    </option>
                  ))}
                </select>

                {selectedDam && (
                  <div className="text-[11px] text-stone-400 font-mono space-y-0.5 pt-1">
                    <div>Pelaje: <strong className="text-stone-200">{selectedDam.coat}</strong></div>
                    <div>Calidad: <strong className="text-amber-400">{selectedDam.quality}/100</strong></div>
                  </div>
                )}
              </div>
            </div>

            {/* Manual Name for the Calf */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-stone-200 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-rose-400" />
                  Nombre manual para la cría (opcional):
                </label>
                {customCalfName && (
                  <button
                    type="button"
                    onClick={() => setCustomCalfName('')}
                    className="text-[10px] text-stone-400 hover:text-stone-200"
                  >
                    Borrar
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCalfName}
                  onChange={(e) => setCustomCalfName(e.target.value)}
                  placeholder={
                    selectedDam
                      ? `Ej: ${selectedDam.name} II, Bravucón, Centella...`
                      : 'Escribe un nombre personalizado...'
                  }
                  className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-rose-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const sugs = getLineageSuggestions();
                    const randomChoice = sugs[Math.floor(Math.random() * sugs.length)];
                    setCustomCalfName(randomChoice);
                  }}
                  className="px-2.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs flex items-center gap-1 transition"
                  title="Sugerir nombre por reata/linaje"
                >
                  <Dices className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Aleatorio</span>
                </button>
              </div>

              {/* Suggestions chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] text-stone-400 font-mono">Reata & sugerencias:</span>
                {getLineageSuggestions().map((sug) => (
                  <button
                    type="button"
                    key={sug}
                    onClick={() => setCustomCalfName(sug)}
                    className={`text-[10px] px-2 py-0.5 rounded transition ${
                      customCalfName === sug
                        ? 'bg-rose-900/80 text-rose-200 border border-rose-600 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Genetic Forecast Preview */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Estimación de Transmisión Genética
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-stone-900 p-2 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Bravura est.</span>
                  <span className="font-bold text-rose-400">{avgBravura}</span>
                </div>
                <div className="bg-stone-900 p-2 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Nobleza est.</span>
                  <span className="font-bold text-amber-400">{avgNobleza}</span>
                </div>
                <div className="bg-stone-900 p-2 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Fuerza est.</span>
                  <span className="font-bold text-stone-200">{avgFuerza}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 italic">
                Duración de la gestación: <strong>270 días</strong> (~9 meses). La cría nacerá automáticamente al avanzar el tiempo con el nombre asignado.
              </p>
            </div>
          </div>
        )}

        {/* Modal Buttons */}
        <div className="flex gap-2 pt-2 border-t border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedSire || !selectedDam || currentActivePairs >= maxActivePairs}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-800 to-red-700 hover:from-rose-700 hover:to-red-600 disabled:opacity-40 text-white text-xs font-bold shadow"
          >
            Confirmar Cubrición
          </button>
        </div>
      </div>
    </div>
  );
};

