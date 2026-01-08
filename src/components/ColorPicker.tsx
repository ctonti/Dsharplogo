import { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
  isDark: boolean;
}

const PRESET_COLORS = [
  '#ffffff', '#000000', '#f3f4f6', '#1f2937',
  '#ef4444', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4',
  '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
];

export default function ColorPicker({ value, onChange, label, isDark }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const bgClass = isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300';
  const hoverClass = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-colors ${bgClass} ${hoverClass}`}
      >
        <label className={`text-xs font-medium ${labelClass}`}>{label}</label>
        <div
          className="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center"
          style={{ backgroundColor: value }}
        >
          {!value || value === 'transparent' ? <Palette size={16} className="text-gray-500" /> : null}
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute bottom-full mb-2 left-0 p-3 rounded-lg shadow-xl border-2 z-20 ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
            }`}
            style={{ width: '200px' }}
          >
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onChange(color);
                    setIsOpen(false);
                  }}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    value === color
                      ? 'border-blue-500 ring-2 ring-blue-300'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-300">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#000000"
                className={`w-full px-2 py-1 text-xs rounded border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
