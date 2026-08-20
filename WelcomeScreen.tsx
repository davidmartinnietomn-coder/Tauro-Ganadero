import React, { useState } from 'react';
import { Shield, Sparkles, Play, PlusCircle, AlertTriangle, ArrowRight, HelpCircle, MapPin } from 'lucide-react';
import { GameState } from '../../types/game';
import appLogo from '../../assets/images/tauro_logo_1787170185470.jpg';

interface WelcomeScreenProps {
  savedGame?: GameState | null;
  hasSaveData?: boolean;
  onStartNewGame?: (ranchName: string, province: string) => void;
  onCreateNewGame?: (ranchName: string, province: string) => void;
  onContinueGame?: () => void;
  onContinue?: () => void;
  initialCreating?: boolean;
}

const PROVINCES = [
  { name: 'Salamanca', region: 'Castilla y León', desc: 'Cuna del Campo Charro y dehesas legendarias' },
  { name: 'Madrid', region: 'Comunidad de Madrid', desc: 'Sierra de Guadarrama y ferias de gran afición' },
  { name: 'Sevilla', region: 'Andalucía', desc: 'Marismas del Guadalquivir y casta brava' },
  { name: 'Navarra', region: 'Navarra', desc: 'Ribera navarra, casta navarra y encierros de leyenda' },
  { name: 'Cádiz', region: 'Andalucía', desc: 'Campiña gaditana y orígenes históricos del toro' },
  { name: 'Toledo', region: 'Castilla-La Mancha', desc: 'Meseta toledana y gran tradición novillera' },
  { name: 'Cáceres', region: 'Extremadura', desc: 'Dehesas extremeñas de encinas centenarias' },
  { name: 'Jaén', region: 'Andalucía', desc: 'Sierra Morena y olivares bravos' },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  savedGame,
  hasSaveData,
  onStartNewGame,
  onCreateNewGame,
  onContinueGame,
  onContinue,
  initialCreating = false,
}) => {
  const [isCreating, setIsCreating] = useState(initialCreating);
  const [ranchName, setRanchName] = useState('Ganadería de Herencia');
  const [selectedProvince, setSelectedProvince] = useState('Salamanca');
  const [error, setError] = useState<string | null>(null);
  const [showOverwriteConfirm, setShowOverwriteConfirm] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const hasSave = Boolean(savedGame || hasSaveData);

  const handleContinue = () => {
    if (onContinueGame) {
      onContinueGame();
    } else if (onContinue) {
      onContinue();
    }
  };

  const handleStartNewFlow = () => {
    if (hasSave) {
      setShowOverwriteConfirm(true);
    } else {
      setIsCreating(true);
    }
  };

  const handleConfirmOverwrite = () => {
    setShowOverwriteConfirm(false);
    setIsCreating(true);
  };

  const executeCreate = () => {
    const trimmed = ranchName.trim();
    if (!trimmed) {
      setError('El nombre de la ganadería no puede estar vacío.');
      return;
    }
    if (trimmed.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return;
    }
    if (trimmed.length > 45) {
      setError('El nombre no puede exceder los 45 caracteres.');
      return;
    }

    setError(null);

    // Call callback safely
    if (onStartNewGame) {
      onStartNewGame(trimmed, selectedProvince);
    } else if (onCreateNewGame) {
      onCreateNewGame(trimmed, selectedProvince);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCreate();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background rustic ranch ambiance & subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-950 to-black z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-rose-950/20 blur-3xl rounded-full pointer-events-none" />

      {/* Decorative top pattern */}
      <div className="relative z-10 pt-8 pb-4 px-6 text-center max-w-md mx-auto w-full">
        {/* Brand Crest */}
        <div className="inline-block w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-2xl shadow-amber-950/80 mb-3 bg-stone-900 ring-4 ring-amber-900/30">
          <img
            src={appLogo}
            alt="Tauro Ganadería"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-stone-100 font-serif mb-1">
          TAURO GANADERÍA
        </h1>
        <p className="text-xs uppercase tracking-widest text-amber-500/90 font-mono">
          Gestiona • Cría • Selecciona • Compite
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-4 sm:px-6 max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-2">
        {!isCreating ? (
          <div className="space-y-4">
            {savedGame && (
              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">
                    Partida Guardada
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    Día {savedGame.game.currentDay}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  {savedGame.ranch.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1 text-stone-300">
                    <Shield className="w-3.5 h-3.5 text-amber-500" />
                    {savedGame.ranch.rankTitle}
                  </span>
                  <span>•</span>
                  <span>{savedGame.animals.length} reses</span>
                  <span>•</span>
                  <span className="text-amber-400 font-mono">€{savedGame.ranch.funds.toLocaleString('es-ES')}</span>
                </div>
              </div>
            )}

            {/* Buttons */}
            {hasSave && (
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-emerald-900/50 flex items-center justify-center gap-2.5 transition active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white" />
                CONTINUAR PARTIDA
              </button>
            )}

            <button
              type="button"
              onClick={handleStartNewFlow}
              className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-rose-900/50 flex items-center justify-center gap-2.5 transition active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              NUEVA PARTIDA
            </button>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-stone-900/70 hover:bg-stone-800 text-stone-300 font-medium text-xs border border-stone-800 flex items-center justify-center gap-2 transition"
            >
              <HelpCircle className="w-4 h-4 text-stone-400" />
              GUÍA & REGLAS DEL JUEGO
            </button>
          </div>
        ) : (
          /* Form: Crear Ganadería (Screen 1 & 2) */
          <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur space-y-4">
            <div className="flex items-center gap-2 text-rose-500">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Fundar Nueva Ganadería
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 font-serif">
                  Nombre del Hierro / Ganadería:
                </label>
                <input
                  type="text"
                  value={ranchName}
                  onChange={(e) => {
                    setRanchName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Ej: Ganadería Los Manantiales"
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition text-sm"
                  autoFocus
                />
                {error && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    {error}
                  </p>
                )}
              </div>

              {/* Suggestions chips */}
              <div className="space-y-1">
                <span className="text-[10px] text-stone-400 font-mono">Sugerencias tradicionales:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Ganadería de Herencia', 'Fuente Serena', 'Dehesa de San Marcos', 'Toros del Rincón', 'Los Manantiales'].map(
                    (sug) => (
                      <button
                        type="button"
                        key={sug}
                        onClick={() => {
                          setRanchName(sug);
                          if (error) setError(null);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                      >
                        {sug}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Province Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-medium text-stone-300 font-serif flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Provincia y Finca de Origen:
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-rose-500 font-serif"
                >
                  {PROVINCES.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name} ({p.region})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-stone-400 italic">
                  {PROVINCES.find((p) => p.name === selectedProvince)?.desc}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={executeCreate}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-800 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  CREAR GANADERÍA
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs transition"
                >
                  Cancelar y Volver
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Overwrite Confirmation Dialog */}
      {showOverwriteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-500 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              ¿Iniciar nueva ganadería?
            </h3>
            <p className="text-xs text-stone-300 mb-5 leading-relaxed">
              Ya tienes una partida guardada. Iniciar una nueva partida creará una nueva vacada desde el Día 1.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOverwriteConfirm(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition"
              >
                Conservar actual
              </button>
              <button
                type="button"
                onClick={handleConfirmOverwrite}
                className="flex-1 py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition"
              >
                Sobrescribir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-bold text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              Guía de Tauro Ganadería
            </h3>
            <div className="text-xs text-stone-300 space-y-3 leading-relaxed">
              <p>
                <strong>1. Cría & Genética:</strong> Cruza sementales y vacas de vientre para transmitir bravura, fuerza y nobleza. El pelaje y las cornamentas se heredan genéticamente.
              </p>
              <p>
                <strong>2. Festejos & Economía:</strong> Acepta contratos en pueblos y plazas. Asigna los animales que cumplan edad y peso. Simula el festejo en directo para ganar dinero y prestigio.
              </p>
              <p>
                <strong>3. El Indulto:</strong> Si un toro demuestra una bravura excepcional en varas y muleta ante una plaza relevante, puede ganar el indulto: el perdón de la vida y su regreso como semental estrella.
              </p>
              <p>
                <strong>4. Finca & Progreso:</strong> Aumenta la capacidad de tus pastos y corrales para albergar más cabezas de ganado y alcanzar el rango de Ganadería Histórica.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Footer credits */}
      <footer className="relative z-10 py-4 px-6 text-center text-[10px] text-stone-400 font-mono">
        Tauro Ganadería © 2024 • Simulación y Libro Genealógico de Reses Bravas
      </footer>
    </div>
  );
};
