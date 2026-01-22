import { useState } from 'react';
import { ChevronUp, ChevronDown, Video, StopCircle } from 'lucide-react';
import ColorPicker from './ColorPicker';
import { useScreenRecording } from '../hooks/useScreenRecording';

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
  gradientEnabled: boolean;
  setGradientEnabled: (v: boolean) => void;
  gradientType: string;
  setGradientType: (v: string) => void;
  gradientColor1: string;
  setGradientColor1: (v: string) => void;
  gradientColor2: string;
  setGradientColor2: (v: string) => void;
  gradientAngle: number;
  setGradientAngle: (v: number) => void;
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
  gradientEnabled,
  setGradientEnabled,
  gradientType,
  setGradientType,
  gradientColor1,
  setGradientColor1,
  gradientColor2,
  setGradientColor2,
  gradientAngle,
  setGradientAngle,
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { isRecording, startRecording, stopRecording } = useScreenRecording();

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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col rounded-2xl shadow-xl backdrop-blur-sm max-w-xl transition-all duration-300 ${
        isDark ? 'bg-gray-900/90 border border-gray-700' : 'bg-white/90 border border-gray-200'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-t-2xl font-medium text-sm transition-colors ${
          isDark
            ? 'text-gray-200 hover:bg-gray-800/50'
            : 'text-gray-700 hover:bg-gray-100/50'
        } ${!isOpen ? 'rounded-b-2xl' : ''}`}
      >
        <span>Impostazioni</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 p-4 pt-2">
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

        <button
          onClick={() => setGradientEnabled(!gradientEnabled)}
          className={`${buttonBase} ${getButtonStyle(gradientEnabled)}`}
        >
          {gradientEnabled ? 'Gradient On' : 'Gradient Off'}
        </button>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`${buttonBase} ${
            isRecording
              ? isDark
                ? 'bg-red-600 border-red-400 text-white animate-pulse'
                : 'bg-red-600 border-red-700 text-white animate-pulse'
              : getButtonStyle(false)
          } flex items-center gap-2`}
        >
          {isRecording ? (
            <>
              <StopCircle size={16} />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <Video size={16} />
              <span>Record</span>
            </>
          )}
        </button>

        {!gradientEnabled && (
          <ColorPicker
            value={primaryColor}
            onChange={setPrimaryColor}
            label="Colore"
            isDark={isDark}
          />
        )}

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

        {gradientEnabled && (
          <>
            <ColorPicker
              value={gradientColor1}
              onChange={setGradientColor1}
              label="Gradient 1"
              isDark={isDark}
            />
            <ColorPicker
              value={gradientColor2}
              onChange={setGradientColor2}
              label="Gradient 2"
              isDark={isDark}
            />
          </>
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

        {gradientEnabled && (
          <>
            <div className="flex items-center gap-3">
              <label className={`text-sm font-medium w-24 ${labelClass}`}>Tipo</label>
              <select
                value={gradientType}
                onChange={(e) => setGradientType(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                  isDark
                    ? 'bg-gray-700 text-white border border-gray-600'
                    : 'bg-white text-gray-900 border border-gray-300'
                }`}
              >
                <option value="linear">Lineare</option>
                <option value="radial">Radiale</option>
              </select>
            </div>

            {gradientType === 'linear' && (
              <div className="flex items-center gap-3">
                <label className={`text-sm font-medium w-24 ${labelClass}`}>Angolo</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradientAngle}
                  onChange={(e) => setGradientAngle(Number(e.target.value))}
                  className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${sliderTrack}`}
                />
                <span className={`text-sm w-10 text-right ${labelClass}`}>{gradientAngle}°</span>
              </div>
            )}
          </>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}
