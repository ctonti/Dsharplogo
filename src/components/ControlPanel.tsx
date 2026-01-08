import ColorPicker from './ColorPicker';

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
  opacity: number;
  setOpacity: (v: number) => void;
  strokeEnabled: boolean;
  setStrokeEnabled: (v: boolean) => void;
  strokeThickness: number;
  setStrokeThickness: (v: number) => void;
  strokeColor: string;
  setStrokeColor: (v: string) => void;
  shadowEnabled: boolean;
  setShadowEnabled: (v: boolean) => void;
  shadowBlur: number;
  setShadowBlur: (v: number) => void;
  shadowColor: string;
  setShadowColor: (v: string) => void;
  shadowOffsetX: number;
  setShadowOffsetX: (v: number) => void;
  shadowOffsetY: number;
  setShadowOffsetY: (v: number) => void;
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
  opacity,
  setOpacity,
  strokeEnabled,
  setStrokeEnabled,
  strokeThickness,
  setStrokeThickness,
  strokeColor,
  setStrokeColor,
  shadowEnabled,
  setShadowEnabled,
  shadowBlur,
  setShadowBlur,
  shadowColor,
  setShadowColor,
  shadowOffsetX,
  setShadowOffsetX,
  shadowOffsetY,
  setShadowOffsetY,
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

        <button
          onClick={() => setStrokeEnabled(!strokeEnabled)}
          className={`${buttonBase} ${getButtonStyle(strokeEnabled)}`}
        >
          {strokeEnabled ? 'Stroke On' : 'Stroke Off'}
        </button>

        <button
          onClick={() => setShadowEnabled(!shadowEnabled)}
          className={`${buttonBase} ${getButtonStyle(shadowEnabled)}`}
        >
          {shadowEnabled ? 'Ombra On' : 'Ombra Off'}
        </button>

        <ColorPicker
          value={primaryColor}
          onChange={setPrimaryColor}
          label="Colore"
          isDark={isDark}
        />

        <ColorPicker
          value={backgroundColor}
          onChange={setBackgroundColor}
          label="Sfondo"
          isDark={isDark}
        />

        {strokeEnabled && (
          <ColorPicker
            value={strokeColor}
            onChange={setStrokeColor}
            label="Stroke"
            isDark={isDark}
          />
        )}

        {shadowEnabled && (
          <ColorPicker
            value={shadowColor}
            onChange={setShadowColor}
            label="Ombra"
            isDark={isDark}
          />
        )}
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

        <div className="flex items-center gap-3">
          <label className={`text-sm font-medium w-24 ${labelClass}`}>Opacità</label>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
          />
          <span className={`text-sm w-10 text-right ${labelClass}`}>{opacity}%</span>
        </div>

        {strokeEnabled && (
          <div className="flex items-center gap-3">
            <label className={`text-sm font-medium w-24 ${labelClass}`}>Spessore Stroke</label>
            <input
              type="range"
              min="1"
              max="10"
              value={strokeThickness}
              onChange={(e) => setStrokeThickness(Number(e.target.value))}
              className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
            />
            <span className={`text-sm w-10 text-right ${labelClass}`}>{strokeThickness}px</span>
          </div>
        )}

        {shadowEnabled && (
          <>
            <div className="flex items-center gap-3">
              <label className={`text-sm font-medium w-24 ${labelClass}`}>Sfocatura</label>
              <input
                type="range"
                min="0"
                max="50"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
              />
              <span className={`text-sm w-10 text-right ${labelClass}`}>{shadowBlur}px</span>
            </div>

            <div className="flex items-center gap-3">
              <label className={`text-sm font-medium w-24 ${labelClass}`}>Offset X</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowOffsetX}
                onChange={(e) => setShadowOffsetX(Number(e.target.value))}
                className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
              />
              <span className={`text-sm w-10 text-right ${labelClass}`}>{shadowOffsetX}px</span>
            </div>

            <div className="flex items-center gap-3">
              <label className={`text-sm font-medium w-24 ${labelClass}`}>Offset Y</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowOffsetY}
                onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
              />
              <span className={`text-sm w-10 text-right ${labelClass}`}>{shadowOffsetY}px</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
