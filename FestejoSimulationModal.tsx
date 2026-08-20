import React, { useState, useEffect } from 'react';
import {
  Flame,
  Award,
  ChevronRight,
  Sparkles,
  Coins,
  Shield,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  AnimalFestejoResult,
  Contract,
  FestejoSimulationSummary,
  GameState,
} from '../../types/game';
import { simulateFestejo } from '../../services/simulation';

interface FestejoSimulationModalProps {
  contractId: string;
  gameState: GameState;
  onFinishSimulation: (updatedState: GameState, summary: FestejoSimulationSummary) => void;
  onClose: () => void;
}

export const FestejoSimulationModal: React.FC<FestejoSimulationModalProps> = ({
  contractId,
  gameState,
  onFinishSimulation,
  onClose,
}) => {
  const contract = gameState.contracts.find((c) => c.id === contractId);

  const [simulationSummary, setSimulationSummary] = useState<FestejoSimulationSummary | null>(null);
  const [updatedStateTemp, setUpdatedStateTemp] = useState<GameState | null>(null);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!contract) return;
    try {
      const { updatedState, summary } = simulateFestejo(gameState, contractId);
      setSimulationSummary(summary);
      setUpdatedStateTemp(updatedState);
    } catch (err) {
      console.error('Error simulating festejo:', err);
    }
  }, [contractId, gameState]);

  if (!contract || !simulationSummary || !updatedStateTemp) {
    return null;
  }

  const currentAnimalResult = simulationSummary.animalResults[currentAnimalIndex];
  const isLastAnimal = currentAnimalIndex >= simulationSummary.animalResults.length - 1;

  const handleNextAnimal = () => {
    if (isLastAnimal) {
      // Completed all animals, trigger final state update
      onFinishSimulation(updatedStateTemp, simulationSummary);
    } else {
      setCurrentAnimalIndex(currentAnimalIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 max-w-lg w-full shadow-2xl space-y-4 max-h-[92vh] flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">
                CRÓNICA TAURINA EN DIRECTO
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                {contract.title}
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                {contract.plaza} ({contract.locality})
              </p>
            </div>

            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-stone-950 text-amber-400 border border-stone-800">
              Toro {currentAnimalIndex + 1} de {simulationSummary.animalResults.length}
            </span>
          </div>

          {/* Current Animal in the Ring */}
          {currentAnimalResult && (
            <div className="space-y-3">
              {/* Bull and Matador Card */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block">
                    EJEMPLAR #{currentAnimalResult.animalNumber}
                  </span>
                  <h4 className="text-base font-serif font-bold text-white">
                    {currentAnimalResult.animalName}
                  </h4>
                  <div className="text-xs text-stone-400">
                    Lidiado por: <strong className="text-stone-200">{currentAnimalResult.toreroName}</strong>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block">
                    Bravura mostrada
                  </span>
                  <span className="text-base font-mono font-bold text-rose-400">
                    {currentAnimalResult.bravuraShown}/100
                  </span>
                </div>
              </div>

              {/* Tercios Round Logs */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {currentAnimalResult.rounds.map((round, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-950/70 rounded-xl border border-stone-800/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-amber-400">
                      <span>{round.tercio}</span>
                      <span>Nota: {round.scoreDelta} pts</span>
                    </div>
                    <p className="text-stone-300 leading-relaxed text-xs">
                      {round.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trophies & Outcome Banner */}
              <div
                className={`p-3 rounded-xl border text-center ${
                  currentAnimalResult.isIndulto
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 animate-pulse'
                    : 'bg-stone-950 border-stone-800 text-stone-200'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-wider font-bold">
                  {currentAnimalResult.isIndulto ? '¡PERDÓN DE LA VIDA!' : 'VEREDICTO DE LA PLAZA'}
                </div>
                <div className="text-sm font-serif font-bold mt-0.5">
                  {currentAnimalResult.trophies}
                </div>
                <p className="text-xs text-stone-400 italic mt-1 font-serif">
                  "{currentAnimalResult.quote}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-3">
          <div className="text-xs font-mono text-stone-400">
            Honorarios acordados: <strong className="text-emerald-400 font-bold">€{simulationSummary.payoutEarned.toLocaleString('es-ES')}</strong>
          </div>

          <button
            onClick={handleNextAnimal}
            className="py-3 px-5 rounded-xl bg-gradient-to-r from-rose-800 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-xs font-mono shadow-md flex items-center gap-2 transition"
          >
            {isLastAnimal ? 'VER BALANCE FINAL' : 'SIGUIENTE TORO'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
