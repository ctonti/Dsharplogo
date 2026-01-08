interface ControlPanelProps {
  isPerspective: boolean;
  setIsPerspective: (v: boolean) => void;
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  isLightOn: boolean;
  setIsLightOn: (v: boolean) => void;
  isOutline: boolean;
  setIsOutline: (v: boolean) => void;
  radius: number;
  setRadius: (v: number) => void;
  barLength: number;
  setBarLength: (v: number) => void;
  verticalTilt: number;
  setVerticalTilt: (v: number) => void;
  primaryColor: string;
  setPrimaryColor: (v: string) => void;
  backgroundColor: string;
  setBackgroundColor: (v: string) => void;
}

export default function ControlPanel({
  isPerspective,
  setIsPerspective,
  isDark,
  setIsDark,
  isLightOn,
  setIsLightOn,
  isOutline,
  setIsOutline,
  radius,
  setRadius,
  barLength,
  setBarLength,
  verticalTilt,
  setVerticalTilt,
  primaryColor,
  setPrimaryColor,
  backgroundColor,
  setBackgroundColor,
}: ControlPanelProps) {
  const buttonBase = `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2`;

  const getButtonStyle = (isActive: boolean) => {
    if (isDark) {
      return isActive
        ? 'bg-blue-600 border-blue-400 text-white'
        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700';
    }
    return isActive
      ? 'bg-blue-600 border-blue-700 text-white'
      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100';
  };

  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const sliderTrack = isDark ? 'bg-gray-700' : 'bg-gray-300';

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-4 p-4 rounded-2xl shadow-xl backdrop-blur-sm max-w-xl ${
        isDark ? 'bg-gray-900/90 border border-gray-700' : 'bg-white/90 border border-gray-200'
      }`}
    >
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setIsPerspective(!isPerspective)}
          className={`${buttonBase} ${getButtonStyle(isPerspective)}`}
        >
          {isPerspective ? 'Prospettiva' : 'Assonometria'}
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className={`${buttonBase} ${getButtonStyle(isDark)}`}
        >
          {isDark ? 'Dark' : 'Light'}
        </button>

        <button
          onClick={() => setIsLightOn(!isLightOn)}
          className={`${buttonBase} ${getButtonStyle(isLightOn)}`}
        >
          {isLightOn ? 'Luce On' : 'Luce Off'}
        </button>

        <button
          onClick={() => setIsOutline(!isOutline)}
          className={`${buttonBase} ${getButtonStyle(isOutline)}`}
        >
          {isOutline ? 'Outline' : 'Solid'}
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg border-2 border-gray-300/50">
          <label className={`text-xs font-medium ${labelClass}`}>Colore</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-2 border-gray-300"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg border-2 border-gray-300/50">
          <label className={`text-xs font-medium ${labelClass}`}>Sfondo</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-2 border-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 border-t border-gray-500/30">
        <div className="flex items-center gap-3">
          <label className={`text-sm font-medium w-20 ${labelClass}`}>Raggio</label>
          <input
            type="range"
            min="4"
            max="40"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
          />
          <span className={`text-sm w-8 text-right ${labelClass}`}>{radius}</span>
        </div>

        <div className="flex items-center gap-3">
          <label className={`text-sm font-medium w-20 ${labelClass}`}>Lunghezza</label>
          <input
            type="range"
            min="80"
            max="300"
            value={barLength}
            onChange={(e) => setBarLength(Number(e.target.value))}
            className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
          />
          <span className={`text-sm w-8 text-right ${labelClass}`}>{barLength}</span>
        </div>

        <div className="flex items-center gap-3">
          <label className={`text-sm font-medium w-24 ${labelClass}`}>Inclinazione</label>
          <input
            type="range"
            min="-45"
            max="45"
            value={verticalTilt}
            onChange={(e) => setVerticalTilt(Number(e.target.value))}
            className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
          />
          <span className={`text-sm w-10 text-right ${labelClass}`}>{verticalTilt}°</span>
        </div>
      </div>
    </div>
  );
}
