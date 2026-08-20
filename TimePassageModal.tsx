import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Play,
  X,
  Sparkles,
  TrendingUp,
  Coins,
  Shield,
  Heart,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { GameState } from '../../types/game';

interface TimePassageModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  onAdvanceDays: (days: number) => void;
}

export const TimePassageModal: React.FC<TimePassageModalProps> = ({
  isOpen,
  onClose,
  gameState,
  onAdvanceDays,
}) => {
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  if (!isOpen) return null;

  const { game, ranch, animals, contracts, breeding } = gameState;

  const activeAnimalsCount = animals.filter((a) => a.status !== 'vendido').length;
  const estimatedDailyCost = activeAnimalsCount * 8 + 40;
  const estimatedTotalCost = estimatedDailyCost * selectedDays;

  // Check upcoming events in this time span
  const upcomingContracts = contracts.filter(
    (c) => c.status === 'aceptado' && c.scheduledDay <= game.currentDay + selectedDays
  );
  const upcomingBirths = breeding.filter(
    (b) => b.status === 'activa' && b.dueDay <= game.currentDay + selectedDays
  );

  const timeOptions = [
    {
      days: 7,
      label: '1 Semana',
      subtitle: '+7 días',
      desc: 'Avance rápido para revisiones semanales y pagos menores.',
      badge: 'Semanal',
    },
    {
      days: 15,
      label: '1 Quincena',
      subtitle: '+15 días',
      desc: 'Medio mes de actividad en la dehesa.',
      badge: 'Quincenal',
    },
    {
      days: 30,
      label: '1 Mes',
      subtitle: '+30 días',
      desc: 'Cumpleaños de reses, maduración y cobro mensual.',
      badge: 'Recomendado',
    },
    {
      days: 90,
      label: '1 Trimestre (Estación)',
      subtitle: '+90 días',
      desc: 'Cambio de estación meteorológica y evolución de camadas.',
      badge: 'Estacional',
    },
    {
      days: 180,
      label: 'Medio Año',
      subtitle: '+180 días',
      desc: 'Crecimiento visible de chotos a novillos y grandes eventos.',
      badge: 'Semestral',
    },
    {
      days: 365,
      label: '1 Año Completo',
      subtitle: '+365 días',
      desc: 'Crecimiento de 1 año entero: becerros a añojos, novillos a toros.',
      badge: 'Anual',
    },
  ];

  const handleConfirm = () => {
    setIsSimulating(true);
    setTimeout(() => {
      onAdvanceDays(selectedDays);
      setIsSimulating(false);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 shadow-inner">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-tight">
                Simulador del Paso del Tiempo
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                {game.currentDate} • Día {game.currentDay} ({game.season})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSimulating}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Options */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-mono font-bold text-stone-300 uppercase tracking-wider mb-2.5">
              Selecciona el periodo a simular:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {timeOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.days}
                  onClick={() => setSelectedDays(opt.days)}
                  className={`p-3 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
                    selectedDays === opt.days
                      ? 'bg-rose-950/70 border-rose-600 ring-2 ring-rose-500/40 shadow-lg'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        selectedDays === opt.days
                          ? 'bg-rose-600 text-white'
                          : 'bg-stone-900 text-stone-400'
                      }`}
                    >
                      {opt.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-stone-200">
                      {opt.subtitle}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-serif font-bold text-stone-100">
                      {opt.label}
                    </h4>
                    <p className="text-[10px] text-stone-400 line-clamp-2 mt-1 leading-tight">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Preview & Estimated Impact */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Impacto y Previsión para {selectedDays} días
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800/80">
                <span className="text-[10px] text-stone-400 font-mono block">
                  Coste Alimentación y Finca
                </span>
                <span className="text-sm font-mono font-bold text-rose-400 mt-0.5 block">
                  -€{estimatedTotalCost.toLocaleString('es-ES')}
                </span>
                <span className="text-[9px] text-stone-500">
                  €{estimatedDailyCost}/día ({activeAnimalsCount} reses)
                </span>
              </div>

              <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800/80">
                <span className="text-[10px] text-stone-400 font-mono block">
                  Fondos Disponibles
                </span>
                <span className="text-sm font-mono font-bold text-amber-400 mt-0.5 block">
                  €{ranch.funds.toLocaleString('es-ES')}
                </span>
                <span className="text-[9px] text-stone-500">
                  Balance estimado tras el periodo
                </span>
              </div>
            </div>

            {/* Upcoming alerts */}
            {upcomingContracts.length > 0 && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>{upcomingContracts.length} festejo(s)</strong> programados tendrán lugar en este periodo.
                </span>
              </div>
            )}

            {upcomingBirths.length > 0 && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs">
                <Heart className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                <span>
                  <strong>{upcomingBirths.length} parto(s)</strong> previstos en la vacada.
                </span>
              </div>
            )}

            <p className="text-[10px] text-stone-400 italic leading-tight">
              Durante este tiempo, las crías y novillos crecerán en peso y trapío, incrementando su valor de mercado.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSimulating}
            className="px-4 py-2.5 rounded-xl border border-stone-700 text-xs font-bold text-stone-300 hover:text-white hover:bg-stone-800 transition"
          >
            CANCELAR
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSimulating}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 disabled:opacity-50 text-white font-bold text-xs tracking-wider shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            {isSimulating ? 'SIMULANDO TIEMPO...' : `AVANZAR ${selectedDays} DÍAS`}
          </button>
        </div>
      </div>
    </div>
  );
};
