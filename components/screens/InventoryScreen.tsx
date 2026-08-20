import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  Shield,
  Heart,
  Award,
} from 'lucide-react';
import { Animal, GameState } from '../../types/game';
import { AnimalVisual } from '../common/AnimalVisual';

interface InventoryScreenProps {
  gameState: GameState;
  onSelectAnimal: (animal: Animal) => void;
  onOpenCreator: () => void;
}

type FilterCategory =
  | 'todos'
  | 'toros'
  | 'vacas'
  | 'crias'
  | 'novillos'
  | 'sementales'
  | 'indultados'
  | 'reservados'
  | 'disponibles';

type SortOption = 'calidad' | 'edad' | 'valor' | 'bravura' | 'nombre';

export const InventoryScreen: React.FC<InventoryScreenProps> = ({
  gameState,
  onSelectAnimal,
  onOpenCreator,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('todos');
  const [sortBy, setSortBy] = useState<SortOption>('calidad');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { animals, ranch } = gameState;
  const activeAnimals = useMemo(() => animals.filter((a) => a.status !== 'vendido'), [animals]);

  // Filter logic
  const filteredAnimals = useMemo(() => {
    return activeAnimals.filter((animal) => {
      // Category check
      if (categoryFilter === 'toros' && (animal.sex !== 'toro' || animal.ageYears < 2)) return false;
      if (categoryFilter === 'vacas' && (animal.sex !== 'vaca' || animal.ageYears < 2)) return false;
      if (categoryFilter === 'crias' && animal.ageYears >= 2) return false;
      if (categoryFilter === 'novillos' && (animal.sex !== 'toro' || animal.ageYears < 2 || animal.ageYears > 3)) return false;
      if (categoryFilter === 'sementales' && !animal.isSemental) return false;
      if (categoryFilter === 'indultados' && !animal.isIndultado) return false;
      if (categoryFilter === 'reservados' && animal.status !== 'reservado') return false;
      if (categoryFilter === 'disponibles' && animal.status !== 'disponible' && !animal.isSemental) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = animal.name.toLowerCase().includes(query);
        const matchesNumber = animal.number.toString().includes(query);
        const matchesCoat = animal.coat.toLowerCase().includes(query);
        const matchesStatus = animal.status.toLowerCase().includes(query);
        if (!matchesName && !matchesNumber && !matchesCoat && !matchesStatus) {
          return false;
        }
      }

      return true;
    });
  }, [activeAnimals, categoryFilter, searchTerm]);

  // Sort logic
  const sortedAnimals = useMemo(() => {
    return [...filteredAnimals].sort((a, b) => {
      if (sortBy === 'calidad') return b.quality - a.quality;
      if (sortBy === 'bravura') return b.genetics.bravura - a.genetics.bravura;
      if (sortBy === 'valor') return b.value - a.value;
      if (sortBy === 'edad') return (b.ageYears * 12 + b.ageMonths) - (a.ageYears * 12 + a.ageMonths);
      if (sortBy === 'nombre') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [filteredAnimals, sortBy]);

  const categories: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'todos', label: 'TODOS', count: activeAnimals.length },
    { id: 'toros', label: 'TOROS', count: activeAnimals.filter((a) => a.sex === 'toro' && a.ageYears >= 2).length },
    { id: 'vacas', label: 'VACAS', count: activeAnimals.filter((a) => a.sex === 'vaca' && a.ageYears >= 2).length },
    { id: 'crias', label: 'CRÍAS', count: activeAnimals.filter((a) => a.ageYears < 2).length },
    { id: 'sementales', label: 'SEMENTALES', count: activeAnimals.filter((a) => a.isSemental).length },
    { id: 'indultados', label: 'INDULTADOS', count: activeAnimals.filter((a) => a.isIndultado).length },
    { id: 'reservados', label: 'RESERVADOS', count: activeAnimals.filter((a) => a.status === 'reservado').length },
    { id: 'disponibles', label: 'DISPONIBLES', count: activeAnimals.filter((a) => a.status === 'disponible' || a.isSemental).length },
  ];

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Top Header & New Animal CTA */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-serif font-bold text-white tracking-tight">
            Inventario de Reses
          </h2>
          <p className="text-xs text-stone-400 font-mono">
            {activeAnimals.length} cabezas • Capacidad: {ranch.totalCapacity}
          </p>
        </div>

        <button
          onClick={onOpenCreator}
          className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-rose-800 to-red-700 hover:from-rose-700 hover:to-red-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition active:scale-95 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          CREAR ANIMAL
        </button>
      </div>

      {/* Search Bar & View Mode Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, nº, pelaje..."
            className="w-full pl-9 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-rose-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* List / Grid Toggle */}
        <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-0.5">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'list' ? 'bg-stone-800 text-rose-400' : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Vista en lista"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'grid' ? 'bg-stone-800 text-rose-400' : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Vista en cuadrícula"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] whitespace-nowrap transition flex items-center gap-1.5 ${
              categoryFilter === cat.id
                ? 'bg-rose-700 text-white font-bold shadow'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[9px] px-1 py-0.2 rounded-full ${
                categoryFilter === cat.id ? 'bg-rose-900 text-rose-200' : 'bg-stone-800 text-stone-400'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Sorting bar */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-mono text-[11px]">ORDENAR:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-rose-500"
          >
            <option value="calidad">Mayor Calidad</option>
            <option value="bravura">Mayor Bravura</option>
            <option value="valor">Mayor Valor (€)</option>
            <option value="edad">Edad</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
        </div>

        <span className="text-[11px] font-mono text-stone-400">
          {sortedAnimals.length} reses
        </span>
      </div>

      {/* Empty State */}
      {sortedAnimals.length === 0 && (
        <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-base font-serif font-bold text-white">
            No se encontraron reses
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            No hay animales que coincidan con los filtros seleccionados. Prueba a cambiar el término de búsqueda o crea un nuevo animal.
          </p>
          <button
            onClick={onOpenCreator}
            className="py-2 px-4 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs transition"
          >
            Crear nuevo animal
          </button>
        </div>
      )}

      {/* Cattle List / Grid */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {sortedAnimals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => onSelectAnimal(animal)}
              className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 rounded-2xl p-3.5 transition shadow-sm flex items-center gap-3.5"
            >
              {/* Dynamic Portrait */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative border border-stone-800 bg-stone-950">
                <AnimalVisual animal={animal} size="sm" className="w-full h-full" />
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-[11px] font-bold text-stone-400">
                      #{animal.number.toString().padStart(4, '0')}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-white truncate group-hover:text-rose-400 transition">
                      {animal.name}
                    </h3>
                  </div>

                  {/* Status Tag */}
                  {animal.isIndultado ? (
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      ★ INDULTADO
                    </span>
                  ) : animal.isSemental ? (
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-rose-900/40 text-rose-300 border border-rose-700/40">
                      SEMENTAL
                    </span>
                  ) : animal.status === 'reservado' ? (
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-700/40">
                      RESERVADO
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                      {animal.status}
                    </span>
                  )}
                </div>

                {/* Subtitle: Age & Coat */}
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                  <span className="font-semibold text-stone-300">
                    {animal.sex === 'toro'
                      ? animal.ageYears === 0
                        ? 'Cría (Becerro)'
                        : animal.ageYears === 1
                        ? 'Añojo / Choto'
                        : animal.ageYears < 4
                        ? 'Novillo / Utrero'
                        : 'Toro Adulto'
                      : animal.ageYears === 0
                      ? 'Cría (Becerra)'
                      : animal.ageYears === 1
                      ? 'Añeja'
                      : 'Vaca de Vientre'}
                  </span>
                  <span>•</span>
                  <span>
                    {animal.ageYears === 0
                      ? 'Recién nacido (0 años)'
                      : `${animal.ageYears} años ${animal.ageMonths > 0 ? `${animal.ageMonths}m` : ''}`}
                  </span>
                  <span>•</span>
                  <span className="text-stone-300 font-medium">{animal.coat}</span>
                </div>

                {/* Progress bars: Calidad & Bravura */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="flex justify-between text-stone-400 font-mono text-[10px] mb-0.5">
                      <span>Calidad</span>
                      <span className="text-amber-400 font-bold">{animal.quality}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${animal.quality}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-400 font-mono text-[10px] mb-0.5">
                      <span>Bravura</span>
                      <span className="text-rose-400 font-bold">{animal.genetics.bravura}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-600 rounded-full"
                        style={{ width: `${animal.genetics.bravura}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-2 gap-3">
          {sortedAnimals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => onSelectAnimal(animal)}
              className="group cursor-pointer bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 rounded-2xl overflow-hidden transition shadow-sm flex flex-col"
            >
              <div className="w-full h-32 bg-stone-950 relative border-b border-stone-800">
                <AnimalVisual animal={animal} size="sm" className="w-full h-full" />
                <span className="absolute top-2 left-2 bg-black/80 font-mono text-[10px] px-1.5 py-0.5 rounded text-stone-300 border border-stone-700">
                  #{animal.number}
                </span>
                {animal.isIndultado && (
                  <span className="absolute bottom-2 left-2 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    INDULTO
                  </span>
                )}
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-serif font-bold text-white truncate group-hover:text-rose-400 transition">
                    {animal.name}
                  </h3>
                  <p className="text-[11px] text-stone-400 truncate">
                    {animal.ageYears}a • {animal.coat}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-stone-400">Calidad:</span>
                  <span className="text-amber-400 font-bold">{animal.quality}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
