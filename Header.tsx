import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Shield,
  Coins,
  Sparkles,
  Menu,
  Clock,
  RotateCcw,
  AlertTriangle,
  ChevronDown,
  X,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import { GameState } from '../../types/game';
import appLogo from '../../assets/images/tauro_logo_1787170185470.jpg';

interface HeaderProps {
  gameState: GameState;
  onOpenNotifications?: () => void;
  onOpenMenu?: () => void;
  onOpenTimePassage?: () => void;
  onResetGameToZero?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gameState,
  onOpenNotifications,
  onOpenMenu,
  onOpenTimePassage,
  onResetGameToZero,
}) => {
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const [showConfirmResetModal, setShowConfirmResetModal] = useState(false);
  const logoMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = gameState.notifications.filter((n) => !n.read).length;

  // Close logo menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (logoMenuRef.current && !logoMenuRef.current.contains(event.target as Node)) {
        setIsLogoMenuOpen(false);
      }
    }
    if (isLogoMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLogoMenuOpen]);

  const handleSelectNewGame = () => {
    setIsLogoMenuOpen(false);
    setShowConfirmResetModal(true);
  };

  const handleConfirmReset = () => {
    setShowConfirmResetModal(false);
    if (onResetGameToZero) {
      onResetGameToZero();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 px-4 py-2.5 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Ranch Identity & Interactive Logo Dropdown */}
          <div className="flex items-center gap-2.5 min-w-0">
            {onOpenMenu && (
              <button
                onClick={onOpenMenu}
                className="p-1.5 -ml-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition md:hidden"
                title="Menú"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Logo Dropdown Container */}
            <div className="relative" ref={logoMenuRef}>
              <button
                type="button"
                onClick={() => setIsLogoMenuOpen(!isLogoMenuOpen)}
                className="group relative flex items-center focus:outline-none transition active:scale-95"
                title="Opciones de la Ganadería / Nueva Partida"
                aria-label="Abrir menú de ganadería"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-500/70 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.5)] shadow-md flex-shrink-0 bg-stone-950 transition">
                  <img
                    src={appLogo}
                    alt="Logo Tauro Ganadería"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-stone-950 rounded-full p-0.5 border border-stone-700 text-amber-400">
                  <ChevronDown className="w-2.5 h-2.5" />
                </div>
              </button>

              {/* Dropdown Popover */}
              {isLogoMenuOpen && (
                <div className="absolute left-0 mt-2.5 w-64 bg-stone-900/95 backdrop-blur-xl border border-stone-700/80 rounded-2xl shadow-2xl z-50 p-3 space-y-2.5 animate-in fade-in zoom-in-95 duration-150 font-sans">
                  {/* Ranch Mini Header */}
                  <div className="flex items-center gap-2.5 pb-2 border-b border-stone-800">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/60 flex-shrink-0">
                      <img
                        src={appLogo}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-serif font-bold text-white truncate">
                        {gameState.ranch.name}
                      </div>
                      <div className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                        <span>{gameState.ranch.province || 'Salamanca'}</span>
                        <span>•</span>
                        <span>Día {gameState.game.currentDay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={handleSelectNewGame}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-950/60 to-red-950/40 hover:from-rose-900/70 hover:to-red-900/50 border border-rose-800/40 text-left text-xs font-serif font-bold text-rose-200 transition group"
                    >
                      <RotateCcw className="w-4 h-4 text-rose-400 group-hover:rotate-[-45deg] transition flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-white text-xs">Nueva Partida</div>
                        <div className="text-[10px] text-rose-300/70 font-sans font-normal truncate">
                          Empezar de cero con nueva ganadería
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-stone-800 flex justify-between items-center text-[10px] text-stone-500 px-1">
                    <span>Tauro Ganadería v1.0</span>
                    <button
                      type="button"
                      onClick={() => setIsLogoMenuOpen(false)}
                      className="text-stone-400 hover:text-stone-200"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-semibold tracking-tight truncate text-stone-100 font-serif">
                {gameState.ranch.name}
              </h1>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="text-amber-400 font-medium flex items-center gap-0.5">
                  <Shield className="w-3 h-3 text-amber-500" />
                  Niv. {gameState.ranch.level}
                </span>
                <span>•</span>
                <span className="truncate">{gameState.ranch.rankTitle}</span>
              </div>
            </div>
          </div>

          {/* Right: Time, Funds, Notifications */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Quick Time Passage Button in Header */}
            {onOpenTimePassage && (
              <button
                onClick={onOpenTimePassage}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-300 hover:text-white text-xs font-mono font-bold transition shadow-sm"
                title="Avanzar tiempo en la ganadería"
              >
                <Clock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">DÍA {gameState.game.currentDay}</span>
                <span className="sm:hidden">D{gameState.game.currentDay}</span>
              </button>
            )}

            {/* Funds pill */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-stone-800 border border-stone-700/80 shadow-sm">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono font-bold text-xs sm:text-sm text-amber-300">
                €{gameState.ranch.funds.toLocaleString('es-ES')}
              </span>
            </div>

            {/* Notifications button with unread badge */}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="relative p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition"
                title="Notificaciones y avisos"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifs > 9 ? '9+' : unreadNotifs}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Warning Confirmation Modal for New Game */}
      {showConfirmResetModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-center relative">
            <button
              type="button"
              onClick={() => setShowConfirmResetModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-white">
                ¿Iniciar Nueva Partida desde Cero?
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                ¡Advertencia! Se borrarán todos los datos y progresos actuales de{' '}
                <strong className="text-amber-300">{gameState.ranch.name}</strong>{' '}
                (incluyendo todos tus toros, vacas, fondos, instalaciones y contratos).
              </p>
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400">
                Al confirmar, comenzarás una partida totalmente nueva eligiendo el nombre y la provincia de tu ganadería.
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmResetModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold font-sans transition"
              >
                Cancelar y seguir jugando
              </button>

              <button
                type="button"
                onClick={handleConfirmReset}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 hover:from-rose-600 hover:to-red-500 text-white text-xs font-bold font-sans shadow-lg shadow-rose-900/40 transition active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Sí, Empezar de Cero
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


