import React, { useState } from 'react';
import { Camera, Layers, Shield, Sparkles, Eye } from 'lucide-react';
import { Animal, AnimalSex, HornData, MorphologyData } from '../../types/game';
import { COAT_CATALOG } from '../../data/cattleTraits';
import { getRealisticBullImage } from '../../utils/bullImages';

/**
 * Frontal SVG Horn Diagram Visualizer
 * Accurately represents the frontal view of the head, testuz, and horns
 * based on direction, symmetry, length, and thickness.
 */
export const HornFrontalDiagram: React.FC<{
  horn?: HornData;
  sex?: AnimalSex;
  ageYears?: number;
  className?: string;
  showLabels?: boolean;
}> = ({
  horn = {
    direction: 'Corniveleto',
    symmetry: 'Simétrica',
    length: 'Media',
    thickness: 'Medio',
    state: 'Íntegro',
  },
  sex = 'toro',
  ageYears = 4,
  className = '',
  showLabels = true,
}) => {
  const isCow = sex === 'vaca';
  const isCalf = ageYears === 0;
  const isYearling = ageYears === 1;
  const isEral = ageYears === 2;
  const isNovillo = ageYears === 3;

  const hornDir = (horn?.direction || 'Corniveleto').toLowerCase();
  const hornSym = (horn?.symmetry || 'Simétrica').toLowerCase();
  const hornLen = (horn?.length || 'Media').toLowerCase();
  const hornThick = (horn?.thickness || 'Medio').toLowerCase();

  const lenMul = isCalf
    ? 0.22
    : isYearling
    ? 0.45
    : isEral
    ? 0.68
    : isNovillo
    ? 0.82
    : isCow
    ? 0.85
    : hornLen === 'larga'
    ? 1.3
    : hornLen === 'corta'
    ? 0.75
    : 1.0;

  const strokeW = isCalf
    ? 1.8
    : isYearling
    ? 2.6
    : isEral
    ? 3.4
    : isNovillo
    ? 4.2
    : isCow
    ? 3.5
    : hornThick.includes('gordo')
    ? 6.5
    : hornThick.includes('fino')
    ? 3.8
    : 5.2;

  // Frontal Horn Bezier Curves [Left Horn, Right Horn]
  let leftHorn = 'M 42 42 Q 28 20 22 8';
  let rightHorn = 'M 58 42 Q 72 20 78 8';

  if (isCalf) {
    leftHorn = 'M 42 43 Q 39 39 37 36';
    rightHorn = 'M 58 43 Q 61 39 63 36';
  } else if (isYearling) {
    leftHorn = 'M 42 42 Q 35 28 32 18';
    rightHorn = 'M 58 42 Q 65 28 68 18';
  } else if (isCow) {
    leftHorn = `M 42 42 Q ${26 - 4 * lenMul} ${22 - 6 * lenMul} ${20 - 6 * lenMul} ${10 - 8 * lenMul}`;
    rightHorn = `M 58 42 Q ${74 + 4 * lenMul} ${22 - 6 * lenMul} ${80 + 6 * lenMul} ${10 - 8 * lenMul}`;
  } else {
    if (hornDir.includes('veleto')) {
      leftHorn = `M 42 42 Q ${34 - 4 * lenMul} ${18 - 14 * lenMul} ${28 - 6 * lenMul} ${6 - 12 * lenMul}`;
      rightHorn = `M 58 42 Q ${66 + 4 * lenMul} ${18 - 14 * lenMul} ${72 + 6 * lenMul} ${6 - 12 * lenMul}`;
    } else if (hornDir.includes('gacho')) {
      leftHorn = `M 42 42 Q ${22 - 4 * lenMul} 45 ${12 - 6 * lenMul} ${58 + 8 * lenMul}`;
      rightHorn = `M 58 42 Q ${78 + 4 * lenMul} 45 ${88 + 6 * lenMul} ${58 + 8 * lenMul}`;
    } else if (hornDir.includes('abierto') || hornDir.includes('playero') || hornDir.includes('alirredondo')) {
      leftHorn = `M 42 42 Q ${18 - 10 * lenMul} 30 ${6 - 12 * lenMul} ${22 - 4 * lenMul}`;
      rightHorn = `M 58 42 Q ${82 + 10 * lenMul} 30 ${94 + 12 * lenMul} ${22 - 4 * lenMul}`;
    } else if (hornDir.includes('brocho')) {
      leftHorn = `M 42 42 Q ${22 - 4 * lenMul} 20 ${44} ${10 - 4 * lenMul}`;
      rightHorn = `M 58 42 Q ${78 + 4 * lenMul} 20 ${56} ${10 - 4 * lenMul}`;
    } else if (hornDir.includes('capacho') || hornDir.includes('acapachado')) {
      leftHorn = `M 42 42 Q ${18 - 6 * lenMul} 24 ${24 - 4 * lenMul} ${6 - 6 * lenMul}`;
      rightHorn = `M 58 42 Q ${82 + 6 * lenMul} 24 ${76 + 4 * lenMul} ${6 - 6 * lenMul}`;
    } else if (hornDir.includes('cubeto')) {
      leftHorn = 'M 42 42 Q 32 30 40 22';
      rightHorn = 'M 58 42 Q 68 30 60 22';
    } else if (hornDir.includes('apretado')) {
      leftHorn = `M 42 42 Q ${28 - 4 * lenMul} 22 ${38 - 2 * lenMul} ${12 - 6 * lenMul}`;
      rightHorn = `M 58 42 Q ${72 + 4 * lenMul} 22 ${62 + 2 * lenMul} ${12 - 6 * lenMul}`;
    } else if (hornDir.includes('vuelto') || hornDir.includes('delantero') || hornDir.includes('corniavuelto')) {
      leftHorn = `M 42 42 Q ${24 - 6 * lenMul} 26 ${14 - 8 * lenMul} ${34 + 2 * lenMul}`;
      rightHorn = `M 58 42 Q ${76 + 6 * lenMul} 26 ${86 + 8 * lenMul} ${34 + 2 * lenMul}`;
    } else if (hornDir.includes('cornalon') || hornDir.includes('cornalón') || hornDir.includes('alon')) {
      leftHorn = `M 42 42 Q 14 12 4 -2`;
      rightHorn = `M 58 42 Q 86 12 96 -2`;
    } else {
      leftHorn = `M 42 42 Q ${26 - 4 * lenMul} ${22 - 8 * lenMul} ${18 - 6 * lenMul} ${16 - 8 * lenMul}`;
      rightHorn = `M 58 42 Q ${74 + 4 * lenMul} ${22 - 8 * lenMul} ${82 + 6 * lenMul} ${16 - 8 * lenMul}`;
    }

    if (hornSym.includes('derecho')) {
      rightHorn = 'M 58 42 Q 78 44 88 56';
    } else if (hornSym.includes('izquierdo')) {
      leftHorn = 'M 42 42 Q 22 44 12 56';
    }
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="frontalHornGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="40%" stopColor="#a8a29e" />
            <stop offset="85%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>
          <linearGradient id="frontalHeadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>
        </defs>

        <ellipse cx="28" cy="46" rx="9" ry="4" transform="rotate(-15 28 46)" fill="#1c1917" stroke="#44403c" strokeWidth="0.8" />
        <ellipse cx="72" cy="46" rx="9" ry="4" transform="rotate(15 72 46)" fill="#1c1917" stroke="#44403c" strokeWidth="0.8" />

        <path
          d="M 36 40 Q 50 37 64 40 L 60 66 Q 50 72 40 66 Z"
          fill="url(#frontalHeadGrad)"
          stroke="#57534e"
          strokeWidth="1.2"
        />

        <ellipse cx="50" cy="65" rx="9" ry="5" fill="#18181b" stroke="#292524" strokeWidth="0.8" />
        <circle cx="46" cy="66" r="1.2" fill="#000000" />
        <circle cx="54" cy="66" r="1.2" fill="#000000" />

        <circle cx="40" cy="50" r="2.2" fill="#09090b" stroke="#78716c" strokeWidth="0.6" />
        <circle cx="60" cy="50" r="2.2" fill="#09090b" stroke="#78716c" strokeWidth="0.6" />
        <circle cx="39.5" cy="49.5" r="0.7" fill="#ffffff" />
        <circle cx="59.5" cy="49.5" r="0.7" fill="#ffffff" />

        <ellipse cx="42" cy="42" rx={strokeW / 2 + 1} ry={strokeW / 2} fill="#1c1917" stroke="#78716c" strokeWidth="0.8" />
        <ellipse cx="58" cy="42" rx={strokeW / 2 + 1} ry={strokeW / 2} fill="#1c1917" stroke="#78716c" strokeWidth="0.8" />

        <path
          d={leftHorn}
          fill="none"
          stroke="url(#frontalHornGrad)"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />

        <path
          d={rightHorn}
          fill="none"
          stroke="url(#frontalHornGrad)"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
      </svg>

      {showLabels && (
        <div className="text-center mt-1">
          <div className="text-xs font-serif font-bold text-amber-300">
            {horn.direction} {horn.symmetry !== 'Simétrica' ? `(${horn.symmetry})` : ''}
          </div>
          <div className="text-[10px] text-stone-400 font-mono">
            {horn.thickness} • Longitud {horn.length}
          </div>
        </div>
      )}
    </div>
  );
};

interface AnimalVisualProps {
  animal?: Animal;
  sex?: AnimalSex;
  coat?: string;
  markings?: string[];
  horn?: HornData;
  morphology?: MorphologyData;
  quality?: number;
  ageYears?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showToggle?: boolean;
  defaultMode?: 'realistic' | 'diagram';
}

export const AnimalVisual: React.FC<AnimalVisualProps> = ({
  animal,
  sex = animal?.sex || 'toro',
  coat = animal?.coat || 'Negro Zaíno',
  markings = animal?.markings || [],
  horn = animal?.horn || {
    direction: 'Corniveleto',
    symmetry: 'Simétrica',
    length: 'Media',
    thickness: 'Medio',
    state: 'Íntegro',
  },
  morphology = animal?.morphology || {
    height: 60,
    length: 60,
    corpulence: 65,
    chest: 60,
    morrillo: 65,
    head: 55,
  },
  ageYears = animal?.ageYears ?? 4,
  className = '',
  size = 'md',
  showToggle = false,
  defaultMode = 'realistic',
}) => {
  const [viewMode, setViewMode] = useState<'realistic' | 'diagram'>(defaultMode);
  const [showHornOverlay, setShowHornOverlay] = useState<boolean>(false);

  // Base photographic asset for the breed archetype, exact horn structure, and age
  const realisticImg = getRealisticBullImage(
    coat,
    sex,
    ageYears,
    horn?.direction || 'Corniveleto',
    horn?.symmetry || 'Simétrica'
  );

  // Active image URL: uses persistent generated image if available, else exact realistic matched image
  const activeImageUrl = animal?.imageUrl || realisticImg.url;
  const isAiGenerated = animal?.imageStatus === 'generated' || (animal?.imageUrl && animal.imageUrl.startsWith('data:'));

  // Coat definition from traits catalog
  const coatDef =
    COAT_CATALOG.find((c) => c.name.toLowerCase() === coat.toLowerCase()) ||
    COAT_CATALOG.find((c) => coat.toLowerCase().includes(c.id.replace('_', ' '))) ||
    COAT_CATALOG[0];

  const primaryColor = coatDef.hexPrimary || '#18181b';
  const secondaryColor = coatDef.hexSecondary || primaryColor;

  const isCow = sex === 'vaca';
  const isCalf = ageYears === 0;
  const isYearling = ageYears === 1;
  const isEral = ageYears === 2;
  const isNovillo = ageYears === 3;
  const isAdult = ageYears >= 4;

  const coatLower = coat.toLowerCase();
  const isBerrendo = coatDef.id.startsWith('berrendo') || coatLower.includes('berrendo');
  const isJabonero =
    coatDef.id.startsWith('jabonero') ||
    coatLower.includes('jabonero') ||
    coatLower.includes('albahío') ||
    coatLower.includes('albahio') ||
    coatLower.includes('ensabanado');
  const isColorado =
    coatLower.includes('colorado') ||
    coatLower.includes('retinto') ||
    coatLower.includes('castaño') ||
    coatLower.includes('castano') ||
    coatLower.includes('tostado') ||
    coatLower.includes('salinero');
  const isCardeno =
    coatLower.includes('cárdeno') ||
    coatLower.includes('cardeno') ||
    coatLower.includes('entrepelado') ||
    coatLower.includes('ratonero');

  // Markings detection
  const hasCareto = markings.some((m) => m.toLowerCase().includes('careto'));
  const hasLucero = markings.some(
    (m) => m.toLowerCase().includes('lucero') || m.toLowerCase().includes('estrellado')
  );
  const hasBragado = markings.some(
    (m) =>
      m.toLowerCase().includes('bragado') ||
      m.toLowerCase().includes('meano') ||
      m.toLowerCase().includes('burraco')
  );
  const hasListon = markings.some((m) => m.toLowerCase().includes('liston'));
  const hasGargantillo = markings.some((m) => m.toLowerCase().includes('gargantillo'));
  const hasBurraco = markings.some(
    (m) => m.toLowerCase().includes('burraco') || m.toLowerCase().includes('salpicado')
  );

  // --- PRECISE HORN GEOMETRY & MATH ---
  const hornDir = (horn?.direction || 'Corniveleto').toLowerCase();
  const hornSym = (horn?.symmetry || 'Simétrica').toLowerCase();
  const hornLen = (horn?.length || 'Media').toLowerCase();
  const hornThick = (horn?.thickness || 'Medio').toLowerCase();

  // Scale factor based on age, sex and length
  const lengthMultiplier = isCalf
    ? 0.18
    : isYearling
    ? 0.42
    : isEral
    ? 0.68
    : isNovillo
    ? 0.82
    : hornLen === 'larga'
    ? 1.25
    : hornLen === 'corta'
    ? 0.8
    : 1.0;

  // Base Horn Paths [left, right]
  let leftHornSvg = 'M 48 36 Q 36 12 30 4';
  let rightHornSvg = 'M 64 36 Q 76 12 82 4';

  if (isCalf) {
    // Tiny budding horn buttons on calves
    leftHornSvg = 'M 48 38 Q 45 35 43 33';
    rightHornSvg = 'M 62 38 Q 65 35 67 33';
  } else if (isYearling) {
    // Straight young spike horns pointing up on yearlings (añojos)
    leftHornSvg = 'M 48 36 Q 42 24 38 18';
    rightHornSvg = 'M 64 36 Q 70 24 74 18';
  } else if (isCow) {
    // Elegant sharp feminine horns
    leftHornSvg = `M 48 36 Q ${36 - 4 * lengthMultiplier} ${20 - 6 * lengthMultiplier} ${32 - 6 * lengthMultiplier} ${10 - 8 * lengthMultiplier}`;
    rightHornSvg = `M 64 36 Q ${76 + 4 * lengthMultiplier} ${20 - 6 * lengthMultiplier} ${80 + 6 * lengthMultiplier} ${10 - 8 * lengthMultiplier}`;
  } else {
    // Detailed Horn Directions for males
    if (hornDir.includes('veleto')) {
      // Corniveleto: High vertical pointing to the sky
      leftHornSvg = `M 48 36 Q ${40 - 6 * lengthMultiplier} ${20 - 14 * lengthMultiplier} ${34 - 8 * lengthMultiplier} ${12 - 12 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${72 + 6 * lengthMultiplier} ${20 - 14 * lengthMultiplier} ${78 + 8 * lengthMultiplier} ${12 - 12 * lengthMultiplier}`;
    } else if (hornDir.includes('gacho')) {
      // Cornigacho: Curved downwards below eye level
      leftHornSvg = `M 48 36 Q ${32 - 4 * lengthMultiplier} 38 ${22 - 6 * lengthMultiplier} ${48 + 8 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${80 + 4 * lengthMultiplier} 38 ${90 + 6 * lengthMultiplier} ${48 + 8 * lengthMultiplier}`;
    } else if (hornDir.includes('abierto') || hornDir.includes('playero') || hornDir.includes('alirredondo')) {
      // Corniabierto / Playero: Wide spread outwards
      leftHornSvg = `M 48 36 Q ${24 - 10 * lengthMultiplier} 24 ${10 - 12 * lengthMultiplier} ${18 - 4 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${88 + 10 * lengthMultiplier} 24 ${102 + 12 * lengthMultiplier} ${18 - 4 * lengthMultiplier}`;
    } else if (hornDir.includes('apretado')) {
      // Corniapretado: Inward curving towards the center
      leftHornSvg = `M 48 36 Q ${34 - 4 * lengthMultiplier} 18 ${44 - 2 * lengthMultiplier} ${10 - 6 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${78 + 4 * lengthMultiplier} 18 ${68 + 2 * lengthMultiplier} ${10 - 6 * lengthMultiplier}`;
    } else if (hornDir.includes('brocho')) {
      // Brocho: Tips almost touching each other in a brooch shape
      leftHornSvg = `M 48 36 Q ${32 - 4 * lengthMultiplier} 16 ${46} ${6 - 4 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${80 + 4 * lengthMultiplier} 16 ${66} ${6 - 4 * lengthMultiplier}`;
    } else if (hornDir.includes('capacho') || hornDir.includes('acapachado')) {
      // Capacho: Wide cradle arch with rising tips
      leftHornSvg = `M 48 36 Q ${26 - 6 * lengthMultiplier} 18 ${30 - 4 * lengthMultiplier} ${4 - 6 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${86 + 6 * lengthMultiplier} 18 ${82 + 4 * lengthMultiplier} ${4 - 6 * lengthMultiplier}`;
    } else if (hornDir.includes('vuelto') || hornDir.includes('delantero') || hornDir.includes('corniavuelto')) {
      // Cornidelantero / Cornivuelto: Points thrusting forward
      leftHornSvg = `M 48 36 Q ${28 - 6 * lengthMultiplier} 22 ${16 - 8 * lengthMultiplier} ${28 + 2 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${84 + 6 * lengthMultiplier} 22 ${96 + 8 * lengthMultiplier} ${28 + 2 * lengthMultiplier}`;
    } else if (hornDir.includes('cubeto')) {
      // Cubeto: Wrapping the forehead tightly
      leftHornSvg = `M 48 36 Q 38 28 46 20`;
      rightHornSvg = `M 64 36 Q 74 28 66 20`;
    } else if (hornDir.includes('alon') || hornDir.includes('alón') || hornDir.includes('cornalon')) {
      // Cornalón: Massive long horns
      leftHornSvg = `M 48 36 Q 24 8 14 -4`;
      rightHornSvg = `M 64 36 Q 88 8 98 -4`;
    } else {
      // Standard balanced curvature
      leftHornSvg = `M 48 36 Q ${34 - 4 * lengthMultiplier} ${18 - 8 * lengthMultiplier} ${24 - 6 * lengthMultiplier} ${16 - 8 * lengthMultiplier}`;
      rightHornSvg = `M 64 36 Q ${78 + 4 * lengthMultiplier} ${18 - 8 * lengthMultiplier} ${88 + 6 * lengthMultiplier} ${16 - 8 * lengthMultiplier}`;
    }

    // Apply Bizco Asymmetry
    if (hornSym.includes('derecho')) {
      // Right horn drops down or twists
      rightHornSvg = `M 64 36 Q 82 36 92 46`;
    } else if (hornSym.includes('izquierdo')) {
      // Left horn drops down or twists
      leftHornSvg = `M 48 36 Q 30 36 20 46`;
    }
  }

  // Horn thickness calculation for diagram mode
  const strokeWidth = isCalf
    ? 1.2
    : isYearling
    ? 1.8
    : isCow
    ? 2.6
    : isEral
    ? 2.8
    : isNovillo
    ? 3.4
    : hornThick.includes('gordo')
    ? 5.2
    : hornThick.includes('fino')
    ? 2.8
    : 4.2;

  // Scale transform container for proportional animal size across developmental stages
  // Becerro is ~46% of adult size, Añojo ~60%, Eral ~74%, Novillo ~85%, Adult ~100%
  const stageScale = isCalf ? 0.46 : isYearling ? 0.60 : isEral ? 0.74 : isNovillo ? 0.85 : 1.0;
  const stageOrigin = '80px 70px';

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-48 h-48',
    hero: 'w-full h-56 md:h-72',
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-black ${sizeClasses[size]} ${className} group`}
    >
      {viewMode === 'realistic' ? (
        /* Realistic Photographic Rendering from authentic livestock photography assets */
        <div className="relative w-full h-full">
          <img
            src={activeImageUrl}
            alt={realisticImg.label}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/10 pointer-events-none" />

          {/* Optional Anatomical Horn Silhouette Calco Overlay */}
          {showHornOverlay && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all">
              <svg
                viewBox="0 0 160 120"
                className="w-full h-full p-2 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`overlayHornGrad-${animal?.id || 'gen'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="65%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                <g style={{ transform: `scale(${stageScale})`, transformOrigin: '80px 70px' }}>
                  <path
                    d="M 38 40 L 56 46 L 56 68 L 32 62 Z"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    opacity="0.6"
                  />
                  <path
                    d={leftHornSvg}
                    fill="none"
                    stroke={`url(#overlayHornGrad-${animal?.id || 'gen'})`}
                    strokeWidth={strokeWidth * 1.3}
                    strokeLinecap="round"
                  />
                  <path
                    d={rightHornSvg}
                    fill="none"
                    stroke={`url(#overlayHornGrad-${animal?.id || 'gen'})`}
                    strokeWidth={strokeWidth * 1.3}
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
          )}
        </div>
      ) : (
        /* Dynamic SVG Anatomical Diagram (100% Geometry Responsive) */
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:16px_16px]" />
          <svg
            viewBox="0 0 160 120"
            className="w-full h-full p-2 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id={`coatGrad-${animal?.id || 'gen'}`} cx="40%" cy="30%" r="70%">
                <stop
                  offset="0%"
                  stopColor={isBerrendo ? '#ececed' : primaryColor}
                  stopOpacity="1"
                />
                <stop offset="60%" stopColor={primaryColor} stopOpacity="1" />
                <stop offset="100%" stopColor="#0c0a09" stopOpacity="0.95" />
              </radialGradient>
              <linearGradient
                id={`hornGrad-${animal?.id || 'gen'}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="65%" stopColor="#d6d3d1" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>

            {/* Scaled Animal Anatomical Group for Proportional Age Progression */}
            <g
              style={{
                transform: `scale(${stageScale})`,
                transformOrigin: '80px 70px',
                transition: 'transform 0.4s ease-out',
              }}
            >
              {/* Tail */}
              <path
                d="M 132 58 Q 146 72 142 95 Q 140 102 144 105"
                fill="none"
                stroke={primaryColor}
                strokeWidth={isCalf ? '2.5' : '3.5'}
                strokeLinecap="round"
              />
              <ellipse cx="144" cy="106" rx={isCalf ? '2.5' : '4'} ry={isCalf ? '4' : '7'} fill={primaryColor} />

              {/* Hind Legs */}
              <path
                d="M 120 62 L 126 108 L 120 112 L 114 75"
                fill="#121214"
                stroke="#09090b"
                strokeWidth={isCalf ? '1.0' : '1.5'}
              />
              <path
                d="M 108 65 L 115 110 L 109 114 L 102 78"
                fill={primaryColor}
                stroke="#18181b"
                strokeWidth={isCalf ? '1.0' : '1.5'}
              />

              {/* Front Legs */}
              <path
                d="M 62 65 L 60 110 L 54 113 L 52 75"
                fill="#121214"
                stroke="#09090b"
                strokeWidth={isCalf ? '1.0' : '1.5'}
              />
              <path
                d="M 48 68 L 46 112 L 39 115 L 40 76"
                fill={primaryColor}
                stroke="#18181b"
                strokeWidth={isCalf ? '1.0' : '1.5'}
              />

              {/* Main Torso & Belly */}
              <path
                d={
                  isCalf
                    ? 'M 58 54 C 68 50 92 50 118 56 C 124 60 122 74 114 80 C 95 82 72 82 56 78 Z'
                    : isCow
                    ? 'M 54 48 C 65 44 95 44 124 52 C 132 58 130 78 118 84 C 95 86 70 86 52 82 Z'
                    : 'M 48 42 C 60 38 98 42 126 50 C 134 56 132 78 120 86 C 95 90 68 90 44 82 Z'
                }
                fill={`url(#coatGrad-${animal?.id || 'gen'})`}
              />

              {/* Berrendo patches */}
              {isBerrendo && (
                <>
                  <ellipse cx="88" cy="58" rx="14" ry="9" fill={secondaryColor} />
                  <ellipse cx="116" cy="66" rx="10" ry="12" fill={secondaryColor} />
                </>
              )}

              {/* Burraco / Salpicado droplets */}
              {hasBurraco && (
                <>
                  <circle cx="75" cy="72" r="3" fill="#ffffff" opacity="0.9" />
                  <circle cx="85" cy="76" r="2.5" fill="#ffffff" opacity="0.85" />
                  <circle cx="98" cy="70" r="3.5" fill="#ffffff" opacity="0.9" />
                </>
              )}

              {/* Bragado markings */}
              {hasBragado && (
                <path
                  d="M 85 82 Q 105 88 120 84 Q 105 80 85 82 Z"
                  fill="#e7e5e4"
                  opacity="0.9"
                />
              )}

              {/* Listón */}
              {hasListon && (
                <path
                  d="M 52 42 Q 90 40 125 50"
                  fill="none"
                  stroke="#e7e5e4"
                  strokeWidth="2.5"
                  opacity="0.85"
                />
              )}

              {/* Morrillo (adult bulls & older novillos only - absent on cows, calves and yearlings) */}
              {!isCow && !isCalf && !isYearling && (
                <ellipse
                  cx="50"
                  cy="39"
                  rx={isEral ? 6 : isNovillo ? 9 : 13}
                  ry={isEral ? 4 : isNovillo ? 6 : 9}
                  fill={`url(#coatGrad-${animal?.id || 'gen'})`}
                  stroke="#1c1917"
                  strokeWidth="0.8"
                />
              )}

              {/* Gargantillo collar */}
              {hasGargantillo && (
                <path
                  d="M 44 48 Q 50 62 44 68"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              )}

              {/* Head */}
              <path
                d="M 38 40 L 56 46 L 56 68 L 32 62 Z"
                fill={`url(#coatGrad-${animal?.id || 'gen'})`}
              />
              <path
                d="M 28 34 L 54 36 L 46 64 L 24 52 Z"
                fill={`url(#coatGrad-${animal?.id || 'gen'})`}
              />

              {/* Careto / Lucero */}
              {hasCareto ? (
                <path
                  d="M 32 38 L 44 40 L 38 52 L 28 48 Z"
                  fill="#f5f5f4"
                  opacity="0.95"
                />
              ) : hasLucero ? (
                <circle cx="36" cy="40" r="3" fill="#f5f5f4" opacity="0.95" />
              ) : null}

              {/* Snout */}
              <ellipse
                cx="24"
                cy="54"
                rx="5"
                ry="4"
                fill={isJabonero ? '#9a7b56' : '#1c1917'}
              />
              <circle cx="23" cy="54" r="1" fill="#09090b" />

              {/* Eye */}
              <circle cx="36" cy="42" r="2.2" fill="#09090b" />
              <circle cx="36.5" cy="41.5" r="0.7" fill="#ffffff" />

              {/* Precise Horns (Left and Right) */}
              <path
                d={leftHornSvg}
                fill="none"
                stroke={`url(#hornGrad-${animal?.id || 'gen'})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              <path
                d={rightHornSvg}
                fill="none"
                stroke={`url(#hornGrad-${animal?.id || 'gen'})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              {/* Ear */}
              <ellipse
                cx="48"
                cy="40"
                rx={isCalf ? 3 : 4}
                ry={isCalf ? 2 : 2.5}
                transform="rotate(-20 48 40)"
                fill={primaryColor}
              />
            </g>
          </svg>
        </div>
      )}

      {/* Switcher & Tool Controls */}
      {(showToggle || size === 'hero') && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {viewMode === 'realistic' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowHornOverlay(!showHornOverlay);
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold font-mono transition border ${
                showHornOverlay
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow font-extrabold'
                  : 'bg-stone-900/90 text-stone-300 border-stone-700 hover:text-white backdrop-blur'
              }`}
              title="Superponer trazo anatómico de los pitones"
            >
              <Eye className="w-3 h-3" />
              {showHornOverlay ? 'TRAZO ACTIVO' : 'TRAZO PITONES'}
            </button>
          )}

          <div className="flex items-center bg-stone-900/90 backdrop-blur border border-stone-700/80 rounded-lg p-0.5 shadow-lg">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('realistic');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition ${
                viewMode === 'realistic'
                  ? 'bg-rose-700 text-white shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Ver fotografía realista del toro"
            >
              <Camera className="w-3 h-3" />
              FOTO
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('diagram');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition ${
                viewMode === 'diagram'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Ver esquema morfológico SVG"
            >
              <Layers className="w-3 h-3" />
              ESQUEMA
            </button>
          </div>
        </div>
      )}

      {/* Zootechnical Coat and Horn Indicator for Hero/Large views */}
      {(size === 'hero' || size === 'lg') && (
        <div className="absolute bottom-3 left-3 z-10 bg-black/85 backdrop-blur border border-stone-700/80 px-2.5 py-1.5 rounded-xl shadow flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <div>
            <div className="text-[10px] font-mono font-bold text-stone-100 uppercase tracking-wider">
              {coat} • {horn?.direction || 'Corniveleto'}
            </div>
            {horn?.symmetry && horn.symmetry !== 'Simétrica' && (
              <div className="text-[9px] text-amber-300 font-mono">
                {horn.symmetry} ({horn.thickness || 'Grosor medio'})
              </div>
            )}
          </div>
        </div>
      )}

      {/* Badges / Overlay Tags */}
      {animal?.isIndultado && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
          <span>★ INDULTADO</span>
        </div>
      )}
      {animal?.isSemental && !animal?.isIndultado && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
          <span>SEMENTAL</span>
        </div>
      )}
      {animal?.number && (
        <div className="absolute bottom-2 right-2 z-10 bg-black/80 text-stone-200 font-mono text-[10px] px-2 py-0.5 rounded border border-stone-700">
          #{animal.number.toString().padStart(4, '0')}
        </div>
      )}
    </div>
  );
};
