import { AnimationDefinition } from './animations';

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playAnimationSound(animation: AnimationDefinition): void {
  const ctx = getAudioContext();
  const { sound } = animation;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const playNote = (startTime: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = sound.waveform || 'sine';
    oscillator.frequency.setValueAtTime(sound.frequency || 440, startTime);

    if (sound.frequencyEnd) {
      oscillator.frequency.exponentialRampToValueAtTime(
        sound.frequencyEnd,
        startTime + sound.attack + sound.decay
      );
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, startTime);
    filter.Q.setValueAtTime(1, startTime);

    const totalDuration = sound.attack + sound.decay + sound.sustain + sound.release;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(sound.volume, startTime + sound.attack);
    gainNode.gain.linearRampToValueAtTime(
      sound.volume * 0.7,
      startTime + sound.attack + sound.decay
    );
    gainNode.gain.setValueAtTime(
      sound.volume * 0.7,
      startTime + sound.attack + sound.decay + sound.sustain
    );
    gainNode.gain.linearRampToValueAtTime(0, startTime + totalDuration);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + totalDuration + 0.1);
  };

  const now = ctx.currentTime;

  if (sound.pattern && sound.pattern.length > 0) {
    sound.pattern.forEach((delay) => {
      playNote(now + delay / 1000);
    });
  } else {
    playNote(now);
  }
}
