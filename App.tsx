import React, { useState, useEffect, useCallback } from 'react';
import {
  Animal,
  BreedingPair,
  Contract,
  Facility,
  FestejoSimulationSummary,
  GameState,
  SimulationRoundLog,
} from './types/game';
import {
  loadGameFromStorage,
  saveGameToStorage,
  createNewGame,
  hasSavedGame,
  deleteSavedGame,
} from './services/storage';
import { advanceTime, advanceDaysAndSimulate } from './services/simulation';
import { Header } from './components/common/Header';
import { BottomNav, NavigationTab } from './components/common/BottomNav';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { AnimalCreatorScreen } from './components/screens/AnimalCreatorScreen';
import { AnimalDetailScreen } from './components/screens/AnimalDetailScreen';
import { IndultoModal } from './components/screens/IndultoModal';
import { GenealogyScreen } from './components/screens/GenealogyScreen';
import { FacilitiesScreen } from './components/screens/FacilitiesScreen';
import { FinancesScreen } from './components/screens/FinancesScreen';
import { ContractsScreen } from './components/screens/ContractsScreen';
import { FestejoSimulationModal } from './components/screens/FestejoSimulationModal';
import { BreedingModal } from './components/screens/BreedingModal';
import { TimePassageModal } from './components/screens/TimePassageModal';

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [startInCreationMode, setStartInCreationMode] = useState<boolean>(false);

  // Subview / Modal States
  const [isCreatingAnimal, setIsCreatingAnimal] = useState(false);
  const [selectedAnimalForDetail, setSelectedAnimalForDetail] = useState<Animal | null>(null);
  const [indultoAnimal, setIndultoAnimal] = useState<Animal | null>(null);
  const [activeSimulationContractId, setActiveSimulationContractId] = useState<string | null>(null);
  const [isBreedingModalOpen, setIsBreedingModalOpen] = useState(false);
  const [breedingInitialAnimal, setBreedingInitialAnimal] = useState<Animal | undefined>(undefined);
  const [isTimePassageModalOpen, setIsTimePassageModalOpen] = useState(false);

  // Time Advance notification toast
  const [timeAdvancementToast, setTimeAdvancementToast] = useState<{
    days: number;
    log: SimulationRoundLog;
  } | null>(null);

  // Initial Load from localStorage
  useEffect(() => {
    const saved = loadGameFromStorage();
    if (saved) {
      setGameState(saved);
    }
  }, []);

  // Auto-Save whenever GameState changes
  useEffect(() => {
    if (gameState) {
      saveGameToStorage(gameState);
    }
  }, [gameState]);

  // Handler: Start New Game
  const handleStartNewGame = (ranchName: string, province: string = 'Salamanca') => {
    const newGame = createNewGame(ranchName, province);
    setGameState(newGame);
    setStartInCreationMode(false);
    setActiveTab('dashboard');
  };

  // Handler: Reset Game to Zero (from Header logo action)
  const handleResetGameToZero = () => {
    deleteSavedGame();
    setGameState(null);
    setStartInCreationMode(true);
    setSelectedAnimalForDetail(null);
    setIsCreatingAnimal(false);
    setActiveSimulationContractId(null);
    setIndultoAnimal(null);
    setIsBreedingModalOpen(false);
    setIsTimePassageModalOpen(false);
  };

  // Handler: Continue Existing Game
  const handleContinueGame = () => {
    const saved = loadGameFromStorage();
    if (saved) {
      setGameState(saved);
      setActiveTab('dashboard');
    }
  };

  // Handler: Advance Time (e.g. +7, +30, +90 days)
  const handleAdvanceTime = useCallback((daysToAdvance: number) => {
    if (!gameState) return;
    const { nextState, log } = advanceDaysAndSimulate(gameState, daysToAdvance);
    setGameState(nextState);
    setTimeAdvancementToast({ days: daysToAdvance, log });

    // Auto-dismiss toast after 6 seconds
    setTimeout(() => {
      setTimeAdvancementToast(null);
    }, 6000);
  }, [gameState]);

  // Handler: Upgrade Facility
  const handleUpgradeFacility = (facilityId: Facility['id']) => {
    if (!gameState) return;
    const fac = gameState.facilities.find((f) => f.id === facilityId);
    if (!fac || fac.isUpgrading || fac.level >= fac.maxLevel) return;
    if (gameState.ranch.funds < fac.upgradeCost) return;

    const newFunds = gameState.ranch.funds - fac.upgradeCost;
    const updatedFacilities = gameState.facilities.map((f) => {
      if (f.id === facilityId) {
        return {
          ...f,
          isUpgrading: true,
          upgradeProgress: 0,
          daysRemainingForUpgrade: f.upgradeDays,
        };
      }
      return f;
    });

    const newTransaction = {
      id: `tx-fac-${Date.now()}`,
      day: gameState.game.currentDay,
      date: `Día ${gameState.game.currentDay}`,
      concept: `Obras de mejora: ${fac.name}`,
      amount: fac.upgradeCost,
      type: 'gasto' as const,
      balanceAfter: newFunds,
    };

    setGameState({
      ...gameState,
      ranch: {
        ...gameState.ranch,
        funds: newFunds,
      },
      stats: {
        ...gameState.stats,
        totalGastos: gameState.stats.totalGastos + fac.upgradeCost,
      },
      facilities: updatedFacilities,
      transactions: [newTransaction, ...gameState.transactions],
    });
  };

  // Handler: Save newly created animal
  const handleSaveCreatedAnimal = (newAnimal: Animal, cost: number) => {
    if (!gameState) return;
    const newFunds = gameState.ranch.funds - cost;

    const newTransaction = {
      id: `tx-create-${Date.now()}`,
      day: gameState.game.currentDay,
      date: `Día ${gameState.game.currentDay}`,
      concept: `Registro genealógico y crianza: #${newAnimal.number} ${newAnimal.name}`,
      amount: cost,
      type: 'gasto' as const,
      balanceAfter: newFunds,
    };

    setGameState({
      ...gameState,
      ranch: {
        ...gameState.ranch,
        funds: newFunds,
      },
      stats: {
        ...gameState.stats,
        totalGastos: gameState.stats.totalGastos + cost,
      },
      animals: [newAnimal, ...gameState.animals],
      transactions: [newTransaction, ...gameState.transactions],
    });

    setIsCreatingAnimal(false);
    setSelectedAnimalForDetail(newAnimal);
  };

  // Handler: Accept opportunity and assign animals
  const handleAcceptContract = (contractId: string, assignedAnimalIds: string[]) => {
    if (!gameState) return;
    const opp = gameState.opportunities.find((o) => o.id === contractId);
    if (!opp) return;

    // Move opportunity to contracts and mark animals as reservado
    const updatedAnimals = gameState.animals.map((a) => {
      if (assignedAnimalIds.includes(a.id)) {
        return {
          ...a,
          status: 'reservado' as const,
        };
      }
      return a;
    });

    const newContract: Contract = {
      ...opp,
      assignedAnimalIds,
      scheduledDay: gameState.game.currentDay + opp.daysLeft,
    };

    setGameState({
      ...gameState,
      opportunities: gameState.opportunities.filter((o) => o.id !== contractId),
      contracts: [...gameState.contracts, newContract],
      animals: updatedAnimals,
    });
  };

  // Handler: Reject opportunity
  const handleRejectContract = (contractId: string) => {
    if (!gameState) return;
    setGameState({
      ...gameState,
      opportunities: gameState.opportunities.filter((o) => o.id !== contractId),
    });
  };

  // Handler: Confirm Breeding pair
  const handleConfirmBreeding = (sire: Animal, dam: Animal, customCalfName?: string) => {
    if (!gameState) return;

    const newBreedingPair: BreedingPair = {
      id: `breeding-${Date.now()}`,
      sireId: sire.id,
      sireName: sire.name,
      damId: dam.id,
      damName: dam.name,
      startDay: gameState.game.currentDay,
      startDate: gameState.game.currentDate,
      dueDay: gameState.game.currentDay + 270, // ~9 months gestation
      dueDate: `Día ${gameState.game.currentDay + 270}`,
      successChance: 0.95,
      expectedGenetics: {
        bravura: Math.round((sire.genetics.bravura + dam.genetics.bravura) / 2),
        nobleza: Math.round((sire.genetics.nobleza + dam.genetics.nobleza) / 2),
        fuerza: Math.round((sire.genetics.fuerza + dam.genetics.fuerza) / 2),
      },
      status: 'activa',
      customOffspringName: customCalfName?.trim() || undefined,
    };

    // Update dam status to gestante
    const updatedAnimals = gameState.animals.map((a) => {
      if (a.id === dam.id) {
        return {
          ...a,
          status: 'gestante' as const,
        };
      }
      return a;
    });

    setGameState({
      ...gameState,
      animals: updatedAnimals,
      breeding: [...gameState.breeding, newBreedingPair],
    });

    setIsBreedingModalOpen(false);
  };

  // Handler: Finish festejo simulation
  const handleFinishSimulation = (
    updatedState: GameState,
    summary: FestejoSimulationSummary
  ) => {
    setGameState(updatedState);
    setActiveSimulationContractId(null);

    // If an indulto occurred, open the Indulto celebration screen!
    if (summary.hasIndulto && summary.indultedAnimal) {
      setIndultoAnimal(summary.indultedAnimal);
    }
  };

  // Handler: Make animal a Semental
  const handleMakeSemental = (animal: Animal) => {
    if (!gameState) return;
    const updatedAnimals = gameState.animals.map((a) => {
      if (a.id === animal.id) {
        return {
          ...a,
          isSemental: true,
          status: 'semental' as const,
          history: [
            ...a.history,
            {
              id: `h-sem-${Date.now()}`,
              day: gameState.game.currentDay,
              date: `Día ${gameState.game.currentDay}`,
              title: 'Nombrado Semental Oficial',
              description: 'Destinado al cuadro reproductor de la ganadería.',
              type: 'trofeo' as const,
            },
          ],
        };
      }
      return a;
    });

    const updated = {
      ...gameState,
      animals: updatedAnimals,
    };

    setGameState(updated);
    if (selectedAnimalForDetail?.id === animal.id) {
      setSelectedAnimalForDetail(updatedAnimals.find((a) => a.id === animal.id) || null);
    }
  };

  // Handler: Sell Animal
  const handleSellAnimal = (animal: Animal) => {
    if (!gameState) return;
    const newFunds = gameState.ranch.funds + animal.value;

    const updatedAnimals = gameState.animals.map((a) => {
      if (a.id === animal.id) {
        return {
          ...a,
          status: 'vendido' as const,
        };
      }
      return a;
    });

    const newTransaction = {
      id: `tx-sell-${Date.now()}`,
      day: gameState.game.currentDay,
      date: `Día ${gameState.game.currentDay}`,
      concept: `Venta de ejemplar: #${animal.number} ${animal.name}`,
      amount: animal.value,
      type: 'ingreso' as const,
      balanceAfter: newFunds,
    };

    setGameState({
      ...gameState,
      ranch: {
        ...gameState.ranch,
        funds: newFunds,
      },
      stats: {
        ...gameState.stats,
        totalIngresos: gameState.stats.totalIngresos + animal.value,
      },
      animals: updatedAnimals,
      transactions: [newTransaction, ...gameState.transactions],
    });

    setSelectedAnimalForDetail(null);
  };

  // Handler: Update animal image from Gemini generation
  const handleUpdateAnimalImage = (animalId: string, imageUrl: string, prompt: string) => {
    if (!gameState) return;
    const isAi = imageUrl.startsWith('data:');
    const updatedAnimals = gameState.animals.map((a) => {
      if (a.id === animalId) {
        return {
          ...a,
          imageUrl,
          imagePrompt: prompt,
          imageStatus: isAi ? ('generated' as const) : ('fallback' as const),
          imageGeneratedAt: new Date().toISOString(),
        };
      }
      return a;
    });

    setGameState({
      ...gameState,
      animals: updatedAnimals,
    });

    if (selectedAnimalForDetail?.id === animalId) {
      const found = updatedAnimals.find((a) => a.id === animalId);
      if (found) setSelectedAnimalForDetail(found);
    }
  };

  // View: Welcome / New Game
  if (!gameState) {
    return (
      <WelcomeScreen
        savedGame={loadGameFromStorage()}
        onStartNewGame={handleStartNewGame}
        onCreateNewGame={handleStartNewGame}
        onContinueGame={handleContinueGame}
        onContinue={handleContinueGame}
        hasSaveData={hasSavedGame()}
        initialCreating={startInCreationMode}
      />
    );
  }

  const activeAnimalsCount = gameState.animals.filter((a) => a.status !== 'vendido').length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col antialiased selection:bg-rose-900 selection:text-white">
      {/* Top Fixed Header */}
      <Header
        gameState={gameState}
        onOpenTimePassage={() => setIsTimePassageModalOpen(true)}
        onResetGameToZero={handleResetGameToZero}
      />

      {/* Main Content Area */}
      <main
        className="flex-1 max-w-2xl w-full mx-auto px-3.5 pt-4"
        style={{
          paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Time Advance Notification Toast */}
        {timeAdvancementToast && (
          <div className="mb-4 bg-stone-900 border border-amber-600/40 rounded-2xl p-4 shadow-xl flex items-start justify-between gap-3 animate-fade-in">
            <div className="space-y-1 text-xs">
              <div className="font-serif font-bold text-amber-400">
                Avance de {timeAdvancementToast.days} días completado
              </div>
              <p className="text-stone-300 font-mono text-[11px]">
                {timeAdvancementToast.log.summary}
              </p>
              {timeAdvancementToast.log.newCalvesCount > 0 && (
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                  +{timeAdvancementToast.log.newCalvesCount} nacimientos en dehesa
                </span>
              )}
            </div>
            <button
              onClick={() => setTimeAdvancementToast(null)}
              className="text-stone-400 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dynamic Screen Switching */}
        {isCreatingAnimal ? (
          <AnimalCreatorScreen
            onBack={() => setIsCreatingAnimal(false)}
            onSaveAnimal={handleSaveCreatedAnimal}
            currentFunds={gameState.ranch.funds}
            currentCapacity={gameState.ranch.totalCapacity}
            currentHerdCount={activeAnimalsCount}
            currentDay={gameState.game.currentDay}
            existingAnimals={gameState.animals}
          />
        ) : selectedAnimalForDetail ? (
          <AnimalDetailScreen
            animal={selectedAnimalForDetail}
            gameState={gameState}
            onBack={() => setSelectedAnimalForDetail(null)}
            onOpenBreeding={(a) => {
              setBreedingInitialAnimal(a);
              setIsBreedingModalOpen(true);
            }}
            onOpenGenealogy={(a) => {
              setSelectedAnimalForDetail(null);
              setActiveTab('genealogy');
            }}
            onAssignToFestejo={(a) => {
              setSelectedAnimalForDetail(null);
              setActiveTab('contracts');
            }}
            onSellAnimal={handleSellAnimal}
            onMakeSemental={handleMakeSemental}
            onUpdateAnimalImage={handleUpdateAnimalImage}
          />
        ) : activeTab === 'dashboard' ? (
          <DashboardScreen
            gameState={gameState}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenTimePassage={() => setIsTimePassageModalOpen(true)}
            onAdvanceTime={handleAdvanceTime}
            onSelectContract={(contract) => {
              setActiveTab('contracts');
            }}
            onSelectAnimalById={(animalId) => {
              const target = gameState.animals.find((a) => a.id === animalId);
              if (target) setSelectedAnimalForDetail(target);
            }}
          />
        ) : activeTab === 'inventory' ? (
          <InventoryScreen
            gameState={gameState}
            onSelectAnimal={(animal) => setSelectedAnimalForDetail(animal)}
            onOpenCreator={() => setIsCreatingAnimal(true)}
          />
        ) : activeTab === 'contracts' ? (
          <ContractsScreen
            gameState={gameState}
            onAcceptContract={handleAcceptContract}
            onRejectContract={handleRejectContract}
            onSimulateContract={(contractId) => setActiveSimulationContractId(contractId)}
            onSelectAnimal={(animal) => setSelectedAnimalForDetail(animal)}
          />
        ) : activeTab === 'facilities' ? (
          <FacilitiesScreen
            gameState={gameState}
            onUpgradeFacility={handleUpgradeFacility}
          />
        ) : activeTab === 'genealogy' ? (
          <GenealogyScreen
            gameState={gameState}
            onSelectAnimal={(animal) => setSelectedAnimalForDetail(animal)}
          />
        ) : activeTab === 'finances' ? (
          <FinancesScreen gameState={gameState} />
        ) : null}
      </main>

      {/* Time Passage Simulator Modal */}
      {isTimePassageModalOpen && (
        <TimePassageModal
          isOpen={isTimePassageModalOpen}
          onClose={() => setIsTimePassageModalOpen(false)}
          gameState={gameState}
          onAdvanceDays={handleAdvanceTime}
        />
      )}

      {/* Breeding Modal */}
      {isBreedingModalOpen && (
        <BreedingModal
          initialAnimal={breedingInitialAnimal}
          gameState={gameState}
          onConfirmBreeding={handleConfirmBreeding}
          onClose={() => {
            setIsBreedingModalOpen(false);
            setBreedingInitialAnimal(undefined);
          }}
        />
      )}

      {/* Live Festejo Simulation Modal */}
      {activeSimulationContractId && (
        <FestejoSimulationModal
          contractId={activeSimulationContractId}
          gameState={gameState}
          onFinishSimulation={handleFinishSimulation}
          onClose={() => setActiveSimulationContractId(null)}
        />
      )}

      {/* Indulto Celebration Screen */}
      {indultoAnimal && (
        <IndultoModal
          animal={indultoAnimal}
          gameState={gameState}
          onConvertToSemental={() => {
            handleMakeSemental(indultoAnimal);
            setIndultoAnimal(null);
          }}
          onClose={() => setIndultoAnimal(null)}
        />
      )}

      {/* Bottom Navigation Dock (Always visible when in game) */}
      {!isCreatingAnimal && !selectedAnimalForDetail && !indultoAnimal && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedAnimalForDetail(null);
            setIsCreatingAnimal(false);
          }}
          pendingContractsCount={gameState.opportunities.length}
        />
      )}
    </div>
  );
}
