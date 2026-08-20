import React from 'react';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Receipt,
  PiggyBank,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import { GameState } from '../../types/game';

interface FinancesScreenProps {
  gameState: GameState;
}

export const FinancesScreen: React.FC<FinancesScreenProps> = ({ gameState }) => {
  const { ranch, game, stats, transactions } = gameState;

  const totalIngresos = stats.totalIngresos;
  const totalGastos = stats.totalGastos;
  const beneficioNeto = Math.max(0, totalIngresos - totalGastos);
  const marginPercent = totalIngresos > 0 ? Math.round((beneficioNeto / totalIngresos) * 100) : 100;

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto">
      {/* Title matching Screen 9 */}
      <div className="px-1">
        <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
          Finanzas
        </h2>
        <p className="text-xs text-stone-400 font-mono">
          Ejercicio {game.year} • Estado de Cuentas y Liquidez
        </p>
      </div>

      {/* 4 Big Metric Cards Matching Screen 9 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Dinero Actual */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-400 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">
              DINERO ACTUAL
            </span>
            <PiggyBank className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white">
            €{ranch.funds.toLocaleString('es-ES')}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>Fondos disponibles</span>
          </div>
        </div>

        {/* Card 2: Ingresos */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-400 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">
              INGRESOS
            </span>
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
            €{totalIngresos.toLocaleString('es-ES')}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>Festejos & Ventas</span>
          </div>
        </div>

        {/* Card 3: Gastos */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-400 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">
              GASTOS
            </span>
            <Receipt className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400">
            €{totalGastos.toLocaleString('es-ES')}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-stone-400 font-mono mt-1">
            <ArrowDownRight className="w-3 h-3" />
            <span>Mantenimiento y Obras</span>
          </div>
        </div>

        {/* Card 4: Beneficios y Margen */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-400 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">
              BENEFICIOS
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
            €{beneficioNeto.toLocaleString('es-ES')}
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] font-mono">
            <span className="text-stone-400">MARGEN:</span>
            <span className="text-stone-200 font-bold">{marginPercent}%</span>
          </div>
          <div className="w-full h-1 bg-stone-950 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${marginPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Transaction History / Libro de Movimientos */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
          <h3 className="text-xs font-serif font-bold text-stone-200 uppercase tracking-wider">
            Libro Mayor de Transacciones
          </h3>
          <span className="text-[10px] font-mono text-stone-400">
            {transactions.length} asientos
          </span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3 bg-stone-950 rounded-xl border border-stone-800/80 flex items-center justify-between text-xs font-mono"
            >
              <div className="min-w-0 pr-2">
                <div className="font-sans font-bold text-stone-200 truncate">
                  {tx.concept}
                </div>
                <div className="text-[10px] text-stone-400">
                  {tx.date} • Saldo: €{tx.balanceAfter.toLocaleString('es-ES')}
                </div>
              </div>

              <div
                className={`font-bold flex-shrink-0 text-right ${
                  tx.type === 'ingreso' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {tx.type === 'ingreso' ? '+' : '-'}€{tx.amount.toLocaleString('es-ES')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
