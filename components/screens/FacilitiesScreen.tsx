import React from 'react';
import {
  Landmark,
  Hammer,
  Shield,
  CheckCircle2,
  AlertCircle,
  Coins,
  ArrowUpCircle,
  Sparkles,
} from 'lucide-react';
import { Facility, GameState } from '../../types/game';

interface FacilitiesScreenProps {
  gameState: GameState;
  onUpgradeFacility: (facilityId: Facility['id']) => void;
}

export const FacilitiesScreen: React.FC<FacilitiesScreenProps> = ({
  gameState,
  onUpgradeFacility,
}) => {
  const { ranch, facilities } = gameState;

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto">
      {/* Top Banner Matching Screen 7 */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 text-center shadow-md space-y-1">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-950 text-rose-400 mb-1">
          <Landmark className="w-4 h-4" />
        </div>
        <h2 className="text-xl font-serif font-bold text-white tracking-tight">
          {ranch.rankTitle}
        </h2>
        <p className="text-xs font-mono text-amber-400">
          Nivel de Prestigio {ranch.level} • {ranch.prestige} Puntos Acumulados
        </p>
      </div>

      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-100">
            Mi Finca & Instalaciones
          </h3>
          <p className="text-xs text-stone-400">
            Gestiona y amplía la infraestructura de la dehesa.
          </p>
        </div>

        <div className="text-right font-mono text-xs text-stone-300">
          <span className="text-stone-400">Capacidad Total: </span>
          <strong className="text-amber-400">{ranch.totalCapacity} cabezas</strong>
        </div>
      </div>

      {/* Facilities Cards List (Matching Screen 7) */}
      <div className="space-y-3">
        {facilities.map((fac) => {
          const canAfford = ranch.funds >= fac.upgradeCost;
          const isMaxLevel = fac.level >= fac.maxLevel;

          return (
            <div
              key={fac.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-rose-400">
                    <Hammer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-white">
                      {fac.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-1">
                      {fac.description}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-400 border border-stone-700 flex-shrink-0">
                  LVL {fac.level}
                </span>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-stone-950 p-2.5 rounded-xl border border-stone-800/80">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">
                    CAPACIDAD
                  </span>
                  <span className="text-stone-200 font-bold">
                    {fac.capacity} / {fac.maxCapacity} Cb
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">
                    ESTADO
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {fac.condition}
                  </span>
                </div>
              </div>

              {/* In Progress Bar */}
              {fac.isUpgrading && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-mono text-amber-400">
                    <span>Obras en curso...</span>
                    <span>{fac.daysRemainingForUpgrade} días restantes ({fac.upgradeProgress}%)</span>
                  </div>
                  <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-300 animate-pulse"
                      style={{ width: `${fac.upgradeProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upgrade CTA Button */}
              <div>
                {isMaxLevel ? (
                  <div className="py-2 px-4 rounded-xl bg-stone-950 text-center text-xs font-mono text-stone-500">
                    NIVEL MÁXIMO ALCANZADO
                  </div>
                ) : fac.isUpgrading ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-800/60 text-stone-400 text-xs font-mono font-bold cursor-not-allowed text-center"
                  >
                    MEJORANDO EN PROGRESO...
                  </button>
                ) : (
                  <button
                    onClick={() => onUpgradeFacility(fac.id)}
                    disabled={!canAfford}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-100 font-mono font-bold text-xs border border-stone-700 hover:border-rose-600 flex items-center justify-center gap-2 transition"
                  >
                    <ArrowUpCircle className="w-4 h-4 text-amber-400" />
                    MEJORAR POR €{fac.upgradeCost.toLocaleString('es-ES')} ({fac.upgradeDays}d)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
