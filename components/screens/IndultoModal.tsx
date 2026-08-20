import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Crown, ArrowRight, Award } from 'lucide-react';
import { Animal, GameState } from '../../types/game';

interface IndultoModalProps {
  animal: Animal;
  gameState: GameState;
  onConvertToSemental: () => void;
  onClose: () => void;
}

export const IndultoModal: React.FC<IndultoModalProps> = ({
  animal,
  gameState,
  onConvertToSemental,
  onClose,
}) => {
  useEffect(() => {
    // Launch golden taurine celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#dc2626', '#fbbf24', '#ffffff'],
      });
    } catch {
      // ignore in SSR/test
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto flex flex-col justify-between p-4 sm:p-6 text-stone-100 font-sans">
      {/* Top Bar matching Screen 5 */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-amber-600/30 text-amber-400 flex items-center justify-center font-serif font-bold text-xs">
            TG
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-stone-100">
              {gameState.ranch.name}
            </div>
            <div className="text-[10px] text-stone-400 font-mono">
              FONDOS: €{gameState.ranch.funds.toLocaleString('es-ES')}
            </div>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-widest font-mono text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800/40">
          ACONTECIMIENTO HISTÓRICO
        </span>
      </div>

      {/* Main Center Stage (Matching Screen 5) */}
      <div className="max-w-md mx-auto w-full my-auto py-6 text-center space-y-5">
        {/* Golden Medallion */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-stone-950 shadow-[0_0_50px_rgba(245,158,11,0.4)] p-4 border-2 border-amber-300">
          <Award className="w-12 h-12 stroke-[2.2]" />
        </div>

        <div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600">
            ¡INDULTO!
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 font-serif italic max-w-xs mx-auto mt-2 leading-relaxed">
            El público exige la vida del animal ante una bravura excepcional.
          </p>
        </div>

        {/* Animal Details Card (Matching Screen 5) */}
        <div className="bg-stone-900 border border-amber-500/40 rounded-2xl p-5 text-left shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <span className="text-[11px] font-mono text-stone-400 block">
                Nº {animal.number.toString().padStart(3, '0')}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                {animal.name}
              </h3>
            </div>

            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block">
                IMPACTO EN REPUTACIÓN
              </span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                +50 pts
              </span>
            </div>

            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-400 block">
                VALOR GENÉTICO
              </span>
              <span className="text-lg font-mono font-bold text-amber-400">
                +200%
              </span>
            </div>
          </div>

          <div className="bg-stone-950/70 p-3.5 rounded-xl border border-stone-800/80 text-xs text-stone-300 italic font-serif leading-relaxed">
            "Un toro de bandera, bravo en el caballo e incansable en la muleta. Ha ganado el derecho a transmitir su casta."
          </div>
        </div>
      </div>

      {/* Action Buttons (Matching Screen 5) */}
      <div className="max-w-md mx-auto w-full space-y-2.5 pt-4 border-t border-stone-800">
        <button
          onClick={onConvertToSemental}
          className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-xs tracking-wider shadow-lg flex items-center justify-center gap-2 transition active:scale-98 uppercase font-mono"
        >
          <Crown className="w-4 h-4 text-amber-300" />
          CONVERTIR EN SEMENTAL
        </button>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition uppercase font-mono border border-stone-800"
        >
          REGRESAR A GANADERÍA
        </button>
      </div>
    </div>
  );
};
