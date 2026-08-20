import React from 'react';
import {
  Calendar,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Flame,
  Clock,
  Play,
  TrendingUp,
} from 'lucide-react';
import { Contract, GameState } from '../../types/game';
import { ActiveTab } from '../common/BottomNav';

interface DashboardScreenProps {
  gameState: GameState;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenTimePassage: () => void;
  onAdvanceTime?: (days: number) => void;
  onSelectContract: (contract: Contract) => void;
  onSelectAnimalById: (animalId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  gameState,
  onNavigateTab,
  onOpenTimePassage,
  onAdvanceTime,
  onSelectContract,
  onSelectAnimalById,
}) => {
  const { ranch, game, animals, contracts, opportunities, notifications } = gameState;

  // Active scheduled festejos vs top available opportunity
  const nextScheduled = contracts.find((c) => c.status === 'aceptado');
  const topOpportunity = opportunities[0];

  const bullsCount = animals.filter(
    (a) => a.sex === 'toro' && a.ageYears >= 2 && a.status !== 'vendido'
  ).length;
  const cowsCount = animals.filter(
    (a) => a.sex === 'vaca' && a.ageYears >= 2 && a.status !== 'vendido'
  ).length;
  const calvesCount = animals.filter(
    (a) => a.ageYears < 2 && a.status !== 'vendido'
  ).length;
  const studCount = animals.filter(
    (a) => a.isSemental && a.status !== 'vendido'
  ).length;

  const totalCapacity = ranch.totalCapacity || 35;
  const activeAnimalsCount = animals.filter((a) => a.status !== 'vendido').length;

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* 1. Ranch Prestige & Season Banner Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-3 mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-500 font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{ranch.rankTitle}</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white tracking-tight">
              {ranch.name}
            </h2>
          </div>

          <div className="text-right">
            <div className="text-xs text-stone-400 font-mono">Prestigio</div>
            <div className="text-lg font-bold text-amber-400 font-mono">
              {ranch.prestige} <span className="text-xs text-stone-400">pts</span>
            </div>
          </div>
        </div>

        {/* Quick Season & Date bar with Quick Action */}
        <div className="flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-stone-300">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span>{game.currentDate}</span>
            <span className="text-stone-500">•</span>
            <span className="text-rose-400 font-medium">{game.season}</span>
          </div>
          <button
            onClick={onOpenTimePassage}
            className="font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold"
          >
            <Clock className="w-3.5 h-3.5" />
            Día {game.currentDay}
          </button>
        </div>
      </div>

      {/* 2. Featured Event / Next Scheduled Festejo or Top Opportunity Banner */}
      {nextScheduled ? (
        <div
          onClick={() => onSelectContract(nextScheduled)}
          className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950 via-stone-900 to-stone-950 border border-rose-800/50 p-4 shadow-lg hover:border-rose-600 transition"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-700/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-900/60 text-rose-300 text-[10px] font-mono font-bold tracking-wide border border-rose-700/40">
              <Flame className="w-3 h-3 text-rose-400" />
              EVENTO DESTACADO • PROGRAMADO
            </div>
            <div className="px-2 py-1 rounded bg-stone-900/90 text-amber-400 font-mono font-bold text-xs border border-stone-700">
              {nextScheduled.scheduledDay - game.currentDay <= 0
                ? '¡HOY!'
                : `En ${nextScheduled.scheduledDay - game.currentDay} días`}
            </div>
          </div>

          <h3 className="text-base font-serif font-bold text-white group-hover:text-rose-300 transition">
            {nextScheduled.title}
          </h3>
          <p className="text-xs text-stone-300 line-clamp-2 mt-1">
            {nextScheduled.plaza} • {nextScheduled.requiredCount}{' '}
            {nextScheduled.requiredType}s asignados.
          </p>

          <div className="mt-3 pt-3 border-t border-rose-950/60 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-mono font-bold">
              +€{nextScheduled.payout.toLocaleString('es-ES')}
            </span>
            <span className="text-rose-400 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
              Ver detalles y cartel <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      ) : topOpportunity ? (
        <div
          onClick={() => onSelectContract(topOpportunity)}
          className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-900/40 p-4 shadow-md hover:border-amber-700/60 transition"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-400 text-[10px] font-mono font-bold border border-amber-800/40">
              <Award className="w-3 h-3 text-amber-500" />
              CONTRATO DESTACADO
            </div>
            <span className="text-[11px] text-stone-400 font-mono">
              Expira en {topOpportunity.daysLeft}d
            </span>
          </div>

          <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition">
            {topOpportunity.title}
          </h3>
          <p className="text-xs text-stone-400 line-clamp-2 mt-1">
            {topOpportunity.specialReq ||
              `${topOpportunity.requiredCount} ${topOpportunity.requiredType}s solicitados.`}
          </p>

          <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-mono font-bold">
              €{topOpportunity.payout.toLocaleString('es-ES')}{' '}
              <span className="text-[10px] text-stone-400 font-sans">
                + {topOpportunity.prestigeReward} pts
              </span>
            </span>
            <span className="text-amber-400 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
              Revisar oferta <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      ) : null}

      {/* 3. Herd Summary Cards */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-stone-400" />
            Censo de la Ganadería
          </span>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-0.5 transition"
          >
            Ver catálogo ({activeAnimalsCount}/{totalCapacity})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div
            onClick={() => onNavigateTab('inventory')}
            className="cursor-pointer bg-stone-950/80 hover:bg-stone-950 p-2.5 rounded-xl border border-stone-800/80 transition"
          >
            <div className="text-lg font-bold text-white font-mono">{bullsCount}</div>
            <div className="text-[11px] text-stone-400">Toros</div>
          </div>

          <div
            onClick={() => onNavigateTab('inventory')}
            className="cursor-pointer bg-stone-950/80 hover:bg-stone-950 p-2.5 rounded-xl border border-stone-800/80 transition"
          >
            <div className="text-lg font-bold text-white font-mono">{cowsCount}</div>
            <div className="text-[11px] text-stone-400">Vacas</div>
          </div>

          <div
            onClick={() => onNavigateTab('inventory')}
            className="cursor-pointer bg-stone-950/80 hover:bg-stone-950 p-2.5 rounded-xl border border-stone-800/80 transition"
          >
            <div className="text-lg font-bold text-white font-mono">{calvesCount}</div>
            <div className="text-[11px] text-stone-400">Crías</div>
          </div>

          <div
            onClick={() => onNavigateTab('inventory')}
            className="cursor-pointer bg-stone-950/80 hover:bg-stone-950 p-2.5 rounded-xl border border-stone-800/80 transition"
          >
            <div className="text-lg font-bold text-amber-400 font-mono">{studCount}</div>
            <div className="text-[11px] text-amber-500 font-medium">Sementales</div>
          </div>
        </div>
      </div>

      {/* 4. Recent Activity & Notifications Feed */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            Actividad Reciente
          </span>
          <span className="text-[11px] text-stone-400 font-mono">Últimos avisos</span>
        </div>

        <div className="space-y-2">
          {notifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.targetTab) onNavigateTab(n.targetTab);
                if (n.targetId) onSelectAnimalById(n.targetId);
              }}
              className="group cursor-pointer bg-stone-950/60 hover:bg-stone-950 p-3 rounded-xl border border-stone-800/60 transition flex items-start gap-3"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  n.type === 'indulto'
                    ? 'bg-amber-400 animate-ping'
                    : n.type === 'birth'
                    ? 'bg-emerald-400'
                    : n.type === 'success'
                    ? 'bg-rose-500'
                    : 'bg-stone-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-stone-200 truncate group-hover:text-rose-400 transition">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono flex-shrink-0">
                    {n.date}
                  </span>
                </div>
                <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Quick Advance Pills + Main PASAR TIEMPO Primary Action Button */}
      <div className="pt-2 space-y-2 sticky bottom-16 z-20">
        <div className="flex items-center gap-1.5 justify-between bg-stone-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-800 shadow-xl">
          {[
            { days: 7, label: '+7d' },
            { days: 15, label: '+15d' },
            { days: 30, label: '+1 mes' },
            { days: 90, label: '+1 est.' },
          ].map((quick) => (
            <button
              key={quick.days}
              type="button"
              onClick={() => (onAdvanceTime ? onAdvanceTime(quick.days) : onOpenTimePassage())}
              className="flex-1 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 hover:text-white border border-stone-800 text-stone-300 text-xs font-mono font-bold transition active:scale-95 shadow-sm"
            >
              {quick.label}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenTimePassage}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-xl shadow-rose-950/60 border border-rose-600/40 flex items-center justify-center gap-3 transition"
        >
          <Play className="w-4 h-4 fill-white" />
          PASAR TIEMPO (SIMULAR DEHESA)
        </button>
      </div>
    </div>
  );
};
