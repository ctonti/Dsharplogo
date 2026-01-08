export interface AnimationKeyframe {
  time: number;
  rotation?: { x: number; y: number };
  radius?: number;
  barLength?: number;
  color?: string;
}

export interface AnimationDefinition {
  id: string;
  name: string;
  icon: string;
  duration: number;
  keyframes: AnimationKeyframe[];
  sound: {
    type: 'oscillator' | 'noise';
    frequency?: number;
    frequencyEnd?: number;
    waveform?: OscillatorType;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    volume: number;
    pattern?: number[];
  };
}

export const animations: AnimationDefinition[] = [
  {
    id: 'pulse',
    name: 'Pulse',
    icon: '💓',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.15, radius: 1.3, barLength: 1.05, rotation: { x: -5, y: 8 } },
      { time: 0.25, radius: 0.95, barLength: 0.98, rotation: { x: 3, y: -5 } },
      { time: 0.4, radius: 1.2, barLength: 1.03, rotation: { x: -4, y: 6 } },
      { time: 0.55, radius: 0.9, barLength: 0.97, rotation: { x: 2, y: -3 } },
      { time: 0.7, radius: 1.0, barLength: 1.0, rotation: { x: -1, y: 2 } },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 80,
      frequencyEnd: 60,
      waveform: 'sine',
      attack: 0.05,
      decay: 0.1,
      sustain: 0.3,
      release: 0.3,
      volume: 0.4,
      pattern: [0, 200],
    },
  },
  {
    id: 'spin',
    name: 'Spin',
    icon: '🔄',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.25, rotation: { x: 0, y: 180 } },
      { time: 0.5, rotation: { x: 0, y: 360 } },
      { time: 0.75, rotation: { x: 0, y: 540 } },
      { time: 1.0, rotation: { x: 0, y: 720 } },
    ],
    sound: {
      type: 'oscillator',
      frequency: 200,
      frequencyEnd: 800,
      waveform: 'sawtooth',
      attack: 0.1,
      decay: 0.5,
      sustain: 0.3,
      release: 0.5,
      volume: 0.2,
    },
  },
  {
    id: 'think',
    name: 'Think',
    icon: '🤔',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.2, rotation: { x: -10, y: -20 } },
      { time: 0.4, rotation: { x: 10, y: 15 } },
      { time: 0.6, rotation: { x: -5, y: -25 } },
      { time: 0.8, rotation: { x: 5, y: 10 } },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 300,
      frequencyEnd: 400,
      waveform: 'triangle',
      attack: 0.3,
      decay: 0.4,
      sustain: 0.5,
      release: 0.5,
      volume: 0.15,
    },
  },
  {
    id: 'wow',
    name: 'Wow',
    icon: '😮',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.2, radius: 0.6, barLength: 0.7, rotation: { x: 10, y: -15 } },
      { time: 0.4, radius: 1.5, barLength: 1.3, color: '#ef4444', rotation: { x: -12, y: 20 } },
      { time: 0.6, radius: 1.8, barLength: 1.4, color: '#f97316', rotation: { x: 8, y: -10 } },
      { time: 0.8, radius: 1.2, barLength: 1.1, color: '#eab308', rotation: { x: -5, y: 5 } },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 200,
      frequencyEnd: 600,
      waveform: 'sine',
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.4,
      volume: 0.35,
    },
  },
  {
    id: 'yes',
    name: 'Yes',
    icon: '✓',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.15, rotation: { x: 25, y: 0 } },
      { time: 0.3, rotation: { x: -15, y: 0 } },
      { time: 0.45, rotation: { x: 20, y: 0 } },
      { time: 0.6, rotation: { x: -10, y: 0 } },
      { time: 0.75, rotation: { x: 10, y: 0 } },
      { time: 0.9, rotation: { x: -5, y: 0 } },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 400,
      frequencyEnd: 600,
      waveform: 'sine',
      attack: 0.05,
      decay: 0.1,
      sustain: 0.2,
      release: 0.2,
      volume: 0.3,
      pattern: [0, 150, 300],
    },
  },
  {
    id: 'no',
    name: 'No',
    icon: '✗',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.1, rotation: { x: 0, y: -30 } },
      { time: 0.25, rotation: { x: 0, y: 30 } },
      { time: 0.4, rotation: { x: 0, y: -25 } },
      { time: 0.55, rotation: { x: 0, y: 25 } },
      { time: 0.7, rotation: { x: 0, y: -15 } },
      { time: 0.85, rotation: { x: 0, y: 10 } },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 300,
      frequencyEnd: 150,
      waveform: 'square',
      attack: 0.02,
      decay: 0.1,
      sustain: 0.1,
      release: 0.2,
      volume: 0.2,
      pattern: [0, 200],
    },
  },
  {
    id: 'wait',
    name: 'Wait',
    icon: '⏳',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.25, rotation: { x: 0, y: 90 }, radius: 0.9 },
      { time: 0.5, rotation: { x: 0, y: 180 }, radius: 1.0 },
      { time: 0.75, rotation: { x: 0, y: 270 }, radius: 0.9 },
      { time: 1.0, rotation: { x: 0, y: 360 } },
    ],
    sound: {
      type: 'oscillator',
      frequency: 440,
      waveform: 'sine',
      attack: 0.01,
      decay: 0.05,
      sustain: 0.1,
      release: 0.1,
      volume: 0.15,
      pattern: [0, 500, 1000, 1500],
    },
  },
  {
    id: 'success',
    name: 'Success',
    icon: '🎉',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.15, radius: 1.2, barLength: 1.1, color: '#22c55e' },
      { time: 0.3, radius: 1.4, barLength: 1.2, rotation: { x: -10, y: 20 } },
      { time: 0.5, radius: 1.3, barLength: 1.15, color: '#4ade80' },
      { time: 0.7, radius: 1.15, barLength: 1.05, rotation: { x: 5, y: -10 } },
      { time: 0.85, radius: 1.05, barLength: 1.02 },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 523,
      frequencyEnd: 784,
      waveform: 'sine',
      attack: 0.05,
      decay: 0.1,
      sustain: 0.4,
      release: 0.3,
      volume: 0.35,
      pattern: [0, 150, 300],
    },
  },
  {
    id: 'error',
    name: 'Error',
    icon: '⚠',
    duration: 2000,
    keyframes: [
      { time: 0 },
      { time: 0.1, rotation: { x: 0, y: -15 }, color: '#ef4444' },
      { time: 0.2, rotation: { x: 0, y: 15 }, color: '#dc2626' },
      { time: 0.3, rotation: { x: 0, y: -12 }, color: '#ef4444' },
      { time: 0.4, rotation: { x: 0, y: 12 }, color: '#dc2626' },
      { time: 0.5, rotation: { x: 0, y: -8 }, color: '#ef4444' },
      { time: 0.6, rotation: { x: 0, y: 8 } },
      { time: 0.75, rotation: { x: 0, y: -4 } },
      { time: 0.9, rotation: { x: 0, y: 2 } },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 200,
      frequencyEnd: 100,
      waveform: 'sawtooth',
      attack: 0.01,
      decay: 0.1,
      sustain: 0.2,
      release: 0.3,
      volume: 0.3,
      pattern: [0, 300],
    },
  },
];

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpColor(colorA: string, colorB: string, t: number): string {
  const parseHex = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const a = parseHex(colorA);
  const b = parseHex(colorB);

  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));

  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}
