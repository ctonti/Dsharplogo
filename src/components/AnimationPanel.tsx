import { Play, Volume2, VolumeX } from 'lucide-react';
import { animations } from '../lib/animations';

interface AnimationPanelProps {
  isDark: boolean;
  currentAnimation: string | null;
  onPlayAnimation: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function AnimationPanel({
  isDark,
  currentAnimation,
  onPlayAnimation,
  soundEnabled,
  onToggleSound,
}: AnimationPanelProps) {
  const bgClass = isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <div
      className={`fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-4 rounded-2xl shadow-xl backdrop-blur-sm border ${bgClass}`}
      style={{ maxHeight: '80vh' }}
    >
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-gray-500/30">
        <h3 className={`text-sm font-semibold ${textClass}`}>Animazioni</h3>
        <button
          onClick={onToggleSound}
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
          title={soundEnabled ? 'Disattiva suono' : 'Attiva suono'}
        >
          {soundEnabled ? (
            <Volume2 size={16} className={subtextClass} />
          ) : (
            <VolumeX size={16} className={subtextClass} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto">
        {animations.map((anim) => {
          const isPlaying = currentAnimation === anim.id;

          return (
            <button
              key={anim.id}
              onClick={() => !isPlaying && onPlayAnimation(anim.id)}
              disabled={isPlaying}
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 ${
                isPlaying
                  ? isDark
                    ? 'bg-blue-600/30 border-blue-500'
                    : 'bg-blue-100 border-blue-400'
                  : isDark
                  ? 'hover:bg-gray-800 border-transparent'
                  : 'hover:bg-gray-100 border-transparent'
              } border`}
            >
              <span className="text-lg w-6 text-center">{anim.icon}</span>
              <span className={`text-sm font-medium flex-1 text-left ${textClass}`}>
                {anim.name}
              </span>
              {isPlaying ? (
                <div className="flex gap-0.5">
                  <span
                    className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              ) : (
                <Play
                  size={14}
                  className={`${subtextClass} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className={`text-xs text-center pt-2 border-t border-gray-500/30 ${subtextClass}`}>
        Durata: 2 secondi
      </div>
    </div>
  );
}
