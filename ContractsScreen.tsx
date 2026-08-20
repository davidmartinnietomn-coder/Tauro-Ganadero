import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  MapPin,
  Shield,
  Coins,
  Flame,
  CheckCircle2,
  XCircle,
  Play,
  Users,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { Animal, Contract, GameState } from '../../types/game';
import { AnimalVisual } from '../common/AnimalVisual';

interface ContractsScreenProps {
  gameState: GameState;
  onAcceptContract: (contractId: string, assignedAnimalIds: string[]) => void;
  onRejectContract: (contractId: string) => void;
  onSimulateContract: (contractId: string) => void;
  onSelectAnimal: (animal: Animal) => void;
}

type EventTab = 'oportunidades' | 'proximos' | 'historial';

export const ContractsScreen: React.FC<ContractsScreenProps> = ({
  gameState,
  onAcceptContract,
  onRejectContract,
  onSimulateContract,
  onSelectAnimal,
}) => {
  const [activeTab, setActiveTab] = useState<EventTab>('oportunidades');
  const [contractToAssign, setContractToAssign] = useState<Contract | null>(null);
  const [selectedAnimalIds, setSelectedAnimalIds] = useState<string[]>([]);
  const [assignmentError, setAssignmentError] = useState<string | null>(null);

  const { opportunities, contracts, historyEvents, animals, game } = gameState;

  // Filter animals eligible for this contract
  const getEligibleAnimalsForContract = (contract: Contract) => {
    return animals.filter((a) => {
      if (a.status !== 'disponible') return false;
      if (contract.requiredType === 'toro' && (a.sex !== 'toro' || a.ageYears < 4)) return false;
      if (contract.requiredType === 'novillo' && (a.sex !== 'toro' || a.ageYears < 2 || a.ageYears > 3)) return false;
      if (contract.requiredType === 'vaquilla' && (a.sex !== 'vaca' || a.ageYears < 2)) return false;
      if (contract.minWeightKg && a.weightKg < contract.minWeightKg) return false;
      if (contract.minBravura && a.genetics.bravura < contract.minBravura) return false;
      return true;
    });
  };

  const handleStartAcceptFlow = (contract: Contract) => {
    setContractToAssign(contract);
    setSelectedAnimalIds([]);
    setAssignmentError(null);
  };

  const handleToggleAnimalSelection = (animalId: string) => {
    if (!contractToAssign) return;
    if (selectedAnimalIds.includes(animalId)) {
      setSelectedAnimalIds(selectedAnimalIds.filter((id) => id !== animalId));
    } else {
      if (selectedAnimalIds.length < contractToAssign.requiredCount) {
        setSelectedAnimalIds([...selectedAnimalIds, animalId]);
      }
    }
  };

  const handleConfirmAssignment = () => {
    if (!contractToAssign) return;
    if (selectedAnimalIds.length < contractToAssign.requiredCount) {
      setAssignmentError(
        `Debes seleccionar exactamente ${contractToAssign.requiredCount} animales (${selectedAnimalIds.length} seleccionados).`
      );
      return;
    }

    onAcceptContract(contractToAssign.id, selectedAnimalIds);
    setContractToAssign(null);
    setSelectedAnimalIds([]);
    setActiveTab('proximos');
  };

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto">
      {/* Top Header matching Screen 11 */}
      <div className="px-1">
        <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
          Contratos y Eventos
        </h2>
        <p className="text-xs text-stone-400 font-mono">
          Propuestas de ayuntamientos, ferias populares y grandes plazas
        </p>
      </div>

      {/* Tabs matching Screen 11 */}
      <div className="flex border-b border-stone-800 text-xs font-mono font-bold">
        <button
          onClick={() => setActiveTab('oportunidades')}
          className={`flex-1 py-3 text-center transition border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'oportunidades'
              ? 'border-rose-600 text-rose-400'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>OPORTUNIDADES</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-300">
            {opportunities.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('proximos')}
          className={`flex-1 py-3 text-center transition border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'proximos'
              ? 'border-rose-600 text-rose-400'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>PRÓXIMOS</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-900 text-rose-200">
            {contracts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('historial')}
          className={`flex-1 py-3 text-center transition border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'historial'
              ? 'border-rose-600 text-rose-400'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <span>HISTORIAL</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-300">
            {historyEvents.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Oportunidades (Matching Screen 11) */}
      {activeTab === 'oportunidades' && (
        <div className="space-y-3">
          {opportunities.length === 0 ? (
            <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-2xl p-8 text-center space-y-2">
              <Calendar className="w-8 h-8 text-stone-500 mx-auto" />
              <h3 className="text-sm font-serif font-bold text-white">
                Sin ofertas activas de momento
              </h3>
              <p className="text-xs text-stone-400">
                Pasa el tiempo en el Dashboard para que empresarios y ayuntamientos envíen nuevas propuestas.
              </p>
            </div>
          ) : (
            opportunities.map((opp) => {
              const eligibleCount = getEligibleAnimalsForContract(opp).length;
              const hasEnoughAnimals = eligibleCount >= opp.requiredCount;

              return (
                <div
                  key={opp.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-3 relative overflow-hidden"
                >
                  {/* Category icon banner */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-rose-400 font-mono">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{opp.locality}, {opp.province}</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-white mt-0.5">
                        {opp.title}
                      </h3>
                      <p className="text-[11px] text-stone-400 font-mono">
                        {opp.plaza}
                      </p>
                    </div>

                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700 flex-shrink-0">
                      {opp.daysLeft}d restantes
                    </span>
                  </div>

                  {/* Requirements Grid (Matching Screen 11) */}
                  <div className="grid grid-cols-2 gap-2 bg-stone-950 p-2.5 rounded-xl border border-stone-800/80 text-xs font-mono">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block">
                        ANIMALES REQ.
                      </span>
                      <span className="font-bold text-stone-200">
                        {opp.requiredCount} {opp.requiredType}s
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block">
                        PESO / BRAVURA
                      </span>
                      <span className="font-bold text-stone-200">
                        {opp.minWeightKg ? `${opp.minWeightKg} kg` : 'Libre'}
                      </span>
                    </div>
                  </div>

                  {/* Rewards Row (Matching Screen 11) */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-stone-400 block">
                        PAGO
                      </span>
                      <span className="text-lg font-mono font-bold text-amber-400">
                        €{opp.payout.toLocaleString('es-ES')}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-stone-400 block">
                        PRESTIGIO
                      </span>
                      <span className="text-sm font-mono font-bold text-rose-400">
                        ★ +{opp.prestigeReward}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Rechazar / Aceptar (Matching Screen 11) */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800/80">
                    <button
                      onClick={() => onRejectContract(opp.id)}
                      className="py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs font-mono font-bold border border-stone-800 transition uppercase"
                    >
                      RECHAZAR
                    </button>

                    <button
                      onClick={() => handleStartAcceptFlow(opp)}
                      disabled={!hasEnoughAnimals}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-800 to-red-700 hover:from-rose-700 hover:to-red-600 disabled:opacity-35 text-white text-xs font-mono font-bold shadow transition uppercase"
                    >
                      {hasEnoughAnimals ? 'ACEPTAR' : `Faltan reses (${eligibleCount}/${opp.requiredCount})`}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Próximos (Scheduled Festivities) */}
      {activeTab === 'proximos' && (
        <div className="space-y-3">
          {contracts.length === 0 ? (
            <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-2xl p-8 text-center space-y-2">
              <Calendar className="w-8 h-8 text-stone-500 mx-auto" />
              <h3 className="text-sm font-serif font-bold text-white">
                No tienes festejos programados
              </h3>
              <p className="text-xs text-stone-400">
                Acepta oportunidades en la pestaña contigua para organizar el encierro.
              </p>
            </div>
          ) : (
            contracts.map((c) => {
              const daysUntil = c.scheduledDay - game.currentDay;
              const isReadyToday = daysUntil <= 0;

              return (
                <div
                  key={c.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-rose-400 font-mono">
                        {c.plaza} ({c.locality})
                      </span>
                      <h3 className="text-base font-serif font-bold text-white mt-0.5">
                        {c.title}
                      </h3>
                    </div>

                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                        isReadyToday
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-stone-800 text-amber-400 border border-stone-700'
                      }`}
                    >
                      {isReadyToday ? '¡LIDIA HOY!' : `En ${daysUntil} días`}
                    </span>
                  </div>

                  {/* Toreros terna & Cartel */}
                  {c.toreros && c.toreros.length > 0 && (
                    <div className="bg-stone-950 p-3 rounded-xl border border-stone-800/80 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">
                        TERNA DE MATADORES
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {c.toreros.map((t) => (
                          <div
                            key={t.id}
                            className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-stone-200"
                          >
                            <span className="font-bold">{t.name}</span>{' '}
                            <span className="text-[10px] text-amber-400 font-mono">({t.category})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assigned Animals Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-stone-400 block">
                      RESES RESERVADAS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.assignedAnimalIds.map((id) => {
                        const animal = animals.find((a) => a.id === id);
                        if (!animal) return null;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => onSelectAnimal(animal)}
                            className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-200 transition flex items-center gap-1.5"
                          >
                            <span>#{animal.number} {animal.name}</span>
                            <span className="text-amber-400 font-bold">({animal.quality})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Simulate Festejo CTA Button */}
                  <button
                    onClick={() => onSimulateContract(c.id)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-xs font-mono tracking-wide shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    SIMULAR FESTEJO EN DIRECTO
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 3: Historial */}
      {activeTab === 'historial' && (
        <div className="space-y-3">
          {historyEvents.length === 0 ? (
            <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-2xl p-8 text-center space-y-2">
              <Award className="w-8 h-8 text-stone-500 mx-auto" />
              <h3 className="text-sm font-serif font-bold text-white">
                Aún no has participado en festejos
              </h3>
              <p className="text-xs text-stone-400">
                Las crónicas y resultados de tus corridas y encierros quedarán archivados aquí.
              </p>
            </div>
          ) : (
            historyEvents.map((h) => (
              <div
                key={h.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">{h.locality} • {h.plaza}</span>
                  <span className="text-emerald-400 font-mono font-bold text-xs">
                    +€{h.payout.toLocaleString('es-ES')}
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-white">
                  {h.title}
                </h4>
                <div className="flex items-center gap-3 text-xs font-mono text-stone-400 pt-1">
                  <span>Prestigio ganado: <strong className="text-amber-400">+{h.prestigeReward} pts</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Animal Selection & Reservation Modal */}
      {contractToAssign && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 max-w-md w-full shadow-2xl max-h-[90vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
                <div>
                  <h3 className="text-base font-serif font-bold text-white">
                    Apartar Lote de Reses
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    {contractToAssign.title} ({contractToAssign.locality})
                  </p>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs text-amber-400 font-bold">
                    {selectedAnimalIds.length} / {contractToAssign.requiredCount}
                  </span>
                  <span className="text-[10px] text-stone-500 block">elegidos</span>
                </div>
              </div>

              {assignmentError && (
                <div className="p-2.5 bg-rose-950/80 border border-rose-700 rounded-xl text-rose-200 text-xs mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{assignmentError}</span>
                </div>
              )}

              <p className="text-xs text-stone-300 mb-3">
                Selecciona <strong>{contractToAssign.requiredCount} {contractToAssign.requiredType}s</strong> que cumplan los requisitos de trapío y peso para este festejo:
              </p>

              {/* Eligible cattle list */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {getEligibleAnimalsForContract(contractToAssign).map((animal) => {
                  const isSelected = selectedAnimalIds.includes(animal.id);
                  return (
                    <div
                      key={animal.id}
                      onClick={() => handleToggleAnimalSelection(animal.id)}
                      className={`cursor-pointer p-2.5 rounded-xl border transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-rose-950/70 border-rose-600 text-white'
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-rose-600 rounded"
                        />
                        <div>
                          <div className="text-xs font-serif font-bold">
                            #{animal.number} {animal.name}
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {animal.coat} • {animal.weightKg} kg • Cal. {animal.quality} • Brav. {animal.genetics.bravura}
                          </div>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-amber-400 font-bold">
                        €{animal.value.toLocaleString('es-ES')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-stone-800 mt-3">
              <button
                type="button"
                onClick={() => setContractToAssign(null)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAssignment}
                disabled={selectedAnimalIds.length !== contractToAssign.requiredCount}
                className="flex-1 py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-600 disabled:opacity-40 text-white text-xs font-bold shadow"
              >
                Confirmar y Reservar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
