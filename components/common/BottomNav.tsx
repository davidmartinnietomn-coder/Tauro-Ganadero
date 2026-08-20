import React from 'react';
import { Home, Layers, Calendar, Landmark, GitFork, Receipt } from 'lucide-react';

export type NavigationTab =
  | 'dashboard'
  | 'inventory'
  | 'contracts'
  | 'facilities'
  | 'genealogy'
  | 'finances';

export type ActiveTab = NavigationTab;

interface BottomNavProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  pendingContractsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  pendingContractsCount = 0,
}) => {
  const tabs = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Resumen',
      icon: Home,
    },
    {
      id: 'inventory' as NavigationTab,
      label: 'Ganadería',
      icon: Layers,
    },
    {
      id: 'contracts' as NavigationTab,
      label: 'Eventos',
      icon: Calendar,
      badge: pendingContractsCount > 0 ? pendingContractsCount : undefined,
    },
    {
      id: 'genealogy' as NavigationTab,
      label: 'Sangre',
      icon: GitFork,
    },
    {
      id: 'facilities' as NavigationTab,
      label: 'Finca',
      icon: Landmark,
    },
    {
      id: 'finances' as NavigationTab,
      label: 'Finanzas',
      icon: Receipt,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800/90 pt-1.5 px-2 shadow-2xl"
      style={{
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 px-2 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-rose-500 font-bold'
                  : 'text-stone-400 hover:text-stone-200 active:bg-stone-900/60'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.4] scale-110' : 'stroke-[1.8]'}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 min-w-4 h-4 px-1 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight font-sans whitespace-nowrap leading-none">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-rose-500 mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
