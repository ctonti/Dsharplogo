import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Trash2 } from 'lucide-react';
import { supabase, Preset } from '../lib/supabase';
import ColorPicker from './ColorPicker';

interface PresetListProps {
  isDark: boolean;
  onLoadPreset: (preset: Preset) => void;
  currentSettings: Omit<Preset, 'id' | 'created_at' | 'updated_at'>;
}

export default function PresetList({ isDark, onLoadPreset, currentSettings }: PresetListProps) {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPresets();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (e.code === 'ArrowLeft' && !isInputElement) {
        e.preventDefault();
        navigatePreset('prev');
      } else if (e.code === 'ArrowRight' && !isInputElement) {
        e.preventDefault();
        navigatePreset('next');
      }
    };

    const handleSaveEvent = () => {
      savePreset();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('trigger-save-preset', handleSaveEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('trigger-save-preset', handleSaveEvent);
    };
  }, [presets.length, currentIndex, currentSettings]);

  const loadPresets = async () => {
    const { data, error } = await supabase
      .from('presets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading presets:', error);
      return;
    }

    setPresets(data || []);
  };

  const savePreset = async () => {
    setLoading(true);

    const { data: existingPresets } = await supabase
      .from('presets')
      .select('name')
      .like('name', 'Preset %')
      .order('created_at', { ascending: false });

    let maxNumber = 0;
    if (existingPresets) {
      existingPresets.forEach(preset => {
        const match = preset.name.match(/^Preset (\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNumber) maxNumber = num;
        }
      });
    }

    const newName = `Preset ${maxNumber + 1}`;

    const { error } = await supabase
      .from('presets')
      .insert([{ ...currentSettings, name: newName }]);

    if (error) {
      console.error('Error saving preset:', error);
    } else {
      await loadPresets();
    }
    setLoading(false);
  };

  const deletePreset = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('presets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting preset:', error);
    } else {
      await loadPresets();
      if (currentIndex >= presets.length - 1) {
        setCurrentIndex(Math.max(0, presets.length - 2));
      }
    }
    setLoading(false);
  };

  const updatePresetBackgroundColor = async (id: string, backgroundColor: string) => {
    const { error } = await supabase
      .from('presets')
      .update({ background_color: backgroundColor })
      .eq('id', id);

    if (error) {
      console.error('Error updating preset background color:', error);
    } else {
      await loadPresets();
    }
  };

  const navigatePreset = (direction: 'prev' | 'next') => {
    if (presets.length === 0) return;

    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : presets.length - 1;
    } else {
      newIndex = currentIndex < presets.length - 1 ? currentIndex + 1 : 0;
    }
    setCurrentIndex(newIndex);
    onLoadPreset(presets[newIndex]);
  };

  const buttonBase = `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 flex items-center gap-2`;
  const getButtonStyle = (variant: 'primary' | 'danger' | 'secondary' = 'primary') => {
    if (isDark) {
      if (variant === 'danger') {
        return 'bg-red-600 border-red-500 text-white hover:bg-red-700';
      }
      if (variant === 'secondary') {
        return 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600';
      }
      return 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700';
    }
    if (variant === 'danger') {
      return 'bg-red-500 border-red-600 text-white hover:bg-red-600';
    }
    if (variant === 'secondary') {
      return 'bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300';
    }
    return 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700';
  };

  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const bgClass = isDark ? 'bg-gray-800' : 'bg-gray-100';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-300';

  return (
    <div
      className={`fixed top-6 right-6 flex flex-col gap-3 p-4 rounded-2xl shadow-xl backdrop-blur-sm ${
        isDark ? 'bg-gray-900/90 border border-gray-700' : 'bg-white/90 border border-gray-200'
      }`}
    >
      <div className="flex flex-col gap-1">
        <button
          onClick={savePreset}
          className={`${buttonBase} ${getButtonStyle()}`}
          disabled={loading}
        >
          <Save size={16} />
          Salva Preset
        </button>
        <div className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Click al centro
        </div>
      </div>

      {presets.length > 0 && (
        <>
          <div className={`h-px ${bgClass}`} />

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigatePreset('prev')}
              className={`p-2 rounded-lg ${getButtonStyle('secondary')}`}
              disabled={loading}
            >
              <ChevronLeft size={20} />
            </button>

            <div className={`flex-1 px-3 py-2 rounded-lg ${bgClass} text-center`}>
              <span className={`text-sm font-medium ${labelClass}`}>
                {presets[currentIndex]?.name || 'N/A'}
              </span>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-0.5`}>
                {currentIndex + 1} / {presets.length}
              </div>
            </div>

            <button
              onClick={() => navigatePreset('next')}
              className={`p-2 rounded-lg ${getButtonStyle('secondary')}`}
              disabled={loading}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {presets.map((preset, index) => (
              <div
                key={preset.id}
                className={`flex flex-col gap-2 p-2 rounded-lg ${
                  index === currentIndex
                    ? isDark
                      ? 'bg-blue-900/50 border-2 border-blue-600'
                      : 'bg-blue-100 border-2 border-blue-400'
                    : isDark
                    ? 'bg-gray-800 border-2 border-gray-700'
                    : 'bg-gray-100 border-2 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setCurrentIndex(index);
                      onLoadPreset(preset);
                    }}
                    className={`flex-1 text-left text-sm ${labelClass}`}
                    disabled={loading}
                  >
                    {preset.name}
                  </button>
                  <button
                    onClick={() => deletePreset(preset.id)}
                    className={`p-1.5 rounded ${getButtonStyle('danger')}`}
                    disabled={loading}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <ColorPicker
                    value={preset.background_color}
                    onChange={(color) => updatePresetBackgroundColor(preset.id, color)}
                    label="Sfondo"
                    isDark={isDark}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
