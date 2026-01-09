export interface AnimationKeyframe {
  time: number;
  rotation?: { x: number; y: number; z?: number };
  radius?: number;
  barLength?: number;
  color?: string;
  offsetY?: number;
}

export interface AnimationDefinition {
  id: string;
  name: string;
  icon: string;
  duration: number;
  keyframes: AnimationKeyframe[];
  easing?: 'cubic' | 'quart' | 'sine' | 'linear';
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
    duration: 5000,
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
    duration: 5000,
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
    duration: 5000,
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
    duration: 5000,
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
    duration: 5000,
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
    duration: 5000,
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
    duration: 5000,
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
    duration: 1500,
    easing: 'linear',
    keyframes: [
      { time: 0, rotation: { x: 0, y: 0, z: 0 }, offsetY: 0, radius: 12 },
      { time: 0.05, rotation: { x: 25.7, y: 0, z: 0 }, offsetY: 0, radius: 12.11 },
      { time: 0.1, rotation: { x: 51.4, y: 0, z: 0 }, offsetY: 0, radius: 12.22 },
      { time: 0.15, rotation: { x: 77.1, y: 0, z: 0 }, offsetY: 0, radius: 12.33 },
      { time: 0.2, rotation: { x: 102.9, y: 0, z: 0 }, offsetY: 0, radius: 12.44 },
      { time: 0.25, rotation: { x: 128.6, y: 0, z: 0 }, offsetY: 0, radius: 12.56 },
      { time: 0.3, rotation: { x: 154.3, y: 0, z: 0 }, offsetY: 0, radius: 12.67 },
      { time: 0.35, rotation: { x: 180, y: 0, z: 0 }, offsetY: 0, radius: 12.78 },
      { time: 0.4, rotation: { x: 205.7, y: 0, z: 0 }, offsetY: 0, radius: 12.89 },
      { time: 0.45, rotation: { x: 231.4, y: 0, z: 0 }, offsetY: 0, radius: 13 },
      { time: 0.5, rotation: { x: 257.1, y: 0, z: 0 }, offsetY: 0, radius: 13.2 },
      { time: 0.55, rotation: { x: 282.9, y: 0, z: 0 }, offsetY: 0, radius: 13.4 },
      { time: 0.6, rotation: { x: 308.6, y: 0, z: 0 }, offsetY: 0, radius: 13.6 },
      { time: 0.65, rotation: { x: 334.3, y: 0, z: 0 }, offsetY: 0, radius: 13.8 },
      { time: 0.7, rotation: { x: 360, y: 0, z: 0 }, offsetY: 0, radius: 14 },
      { time: 0.8, rotation: { x: 360, y: 0, z: 90 }, offsetY: -70, radius: 14 },
      { time: 0.85, rotation: { x: 360, y: 0, z: 180 }, offsetY: -80, radius: 13.4 },
      { time: 0.95, rotation: { x: 360, y: 0, z: 270 }, offsetY: -10, radius: 12.5 },
      { time: 1.0, rotation: { x: 360, y: 0, z: 360 }, offsetY: 0, radius: 12 },
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
    duration: 5000,
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
  {
    id: 'blink',
    name: 'Blink',
    icon: '|',
    duration: 5000,
    keyframes: [
      { time: 0 },
      { time: 0.25, barLength: 0.1, radius: 0.2, color: '#64748b' },
      { time: 0.5 },
      { time: 0.75, barLength: 0.1, radius: 0.2, color: '#64748b' },
      { time: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 800,
      waveform: 'square',
      attack: 0.01,
      decay: 0.05,
      sustain: 0.05,
      release: 0.05,
      volume: 0.1,
      pattern: [0, 500, 1000, 1500],
    },
  },
  {
    id: 'rotate360',
    name: 'Rotate 360',
    icon: '↻',
    duration: 5000,
    keyframes: [
      { time: 0, rotation: { x: 0, y: 0 } },
      { time: 0.25, rotation: { x: 90, y: 0 } },
      { time: 0.5, rotation: { x: 180, y: 0 } },
      { time: 0.75, rotation: { x: 270, y: 0 } },
      { time: 1.0, rotation: { x: 360, y: 0 } },
    ],
    sound: {
      type: 'oscillator',
      frequency: 400,
      frequencyEnd: 600,
      waveform: 'sine',
      attack: 0.1,
      decay: 0.3,
      sustain: 0.5,
      release: 0.4,
      volume: 0.25,
    },
  },
  {
    id: 'rotate360accel',
    name: 'Accelerating Spin',
    icon: '⚡',
    duration: 4000,
    easing: 'cubic',
    keyframes: [
      { time: 0, rotation: { x: 0, y: 0 }, offsetY: 0 },
      { time: 0.3, rotation: { x: 90, y: 0 }, offsetY: -15 },
      { time: 0.5, rotation: { x: 180, y: 0 }, offsetY: -30 },
      { time: 0.65, rotation: { x: 270, y: 0 }, offsetY: -35 },
      { time: 0.75, rotation: { x: 360, y: 0 }, offsetY: -25 },
      { time: 0.82, rotation: { x: 405, y: 0 }, offsetY: -15 },
      { time: 0.88, rotation: { x: 450, y: 0 }, offsetY: -8 },
      { time: 0.93, rotation: { x: 495, y: 0 }, offsetY: -3 },
      { time: 0.97, rotation: { x: 540, y: 0 }, offsetY: -1 },
      { time: 1.0, rotation: { x: 540, y: 0 }, offsetY: 0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 350,
      frequencyEnd: 850,
      waveform: 'sine',
      attack: 0.05,
      decay: 0.2,
      sustain: 0.6,
      release: 0.3,
      volume: 0.28,
    },
  },
  {
    id: 'rotate360xy',
    name: 'Rotate XY',
    icon: '⟲',
    duration: 5000,
    keyframes: [
      { time: 0, rotation: { x: 0, y: 0 } },
      { time: 0.25, rotation: { x: 90, y: 90 } },
      { time: 0.5, rotation: { x: 180, y: 180 } },
      { time: 0.75, rotation: { x: 270, y: 270 } },
      { time: 1.0, rotation: { x: 360, y: 360 } },
    ],
    sound: {
      type: 'oscillator',
      frequency: 300,
      frequencyEnd: 700,
      waveform: 'sine',
      attack: 0.1,
      decay: 0.3,
      sustain: 0.5,
      release: 0.4,
      volume: 0.25,
    },
  },
  {
    id: 'upload',
    name: 'Material Upload',
    icon: '📤',
    duration: 2000,
    easing: 'cubic',
    keyframes: [
      { time: 0, rotation: { x: 0, y: 0, z: 0 }, offsetY: 60, color: '#94a3b8', radius: 0.8 },
      { time: 0.15, rotation: { x: -10, y: 45, z: 0 }, offsetY: 40, color: '#64748b', radius: 0.85 },
      { time: 0.3, rotation: { x: -15, y: 90, z: 0 }, offsetY: 20, color: '#475569', radius: 0.9 },
      { time: 0.45, rotation: { x: -20, y: 135, z: 0 }, offsetY: 0, color: '#3b82f6', radius: 0.95 },
      { time: 0.6, rotation: { x: -25, y: 180, z: 0 }, offsetY: -20, color: '#06b6d4', radius: 1.0 },
      { time: 0.7, rotation: { x: -20, y: 225, z: 0 }, offsetY: -35, color: '#14b8a6', radius: 1.05 },
      { time: 0.8, rotation: { x: -15, y: 270, z: 0 }, offsetY: -50, color: '#10b981', radius: 1.1 },
      { time: 0.85, rotation: { x: -10, y: 315, z: 0 }, offsetY: -55, color: '#22c55e', radius: 1.15 },
      { time: 0.9, rotation: { x: -5, y: 360, z: 0 }, offsetY: -60, color: '#22c55e', radius: 1.2 },
      { time: 0.95, rotation: { x: 0, y: 360, z: 15 }, offsetY: -50, color: '#16a34a', radius: 1.1 },
      { time: 1.0, rotation: { x: 0, y: 360, z: 0 }, offsetY: -45, color: '#15803d', radius: 1.0 },
    ],
    sound: {
      type: 'oscillator',
      frequency: 300,
      frequencyEnd: 650,
      waveform: 'sine',
      attack: 0.08,
      decay: 0.15,
      sustain: 0.4,
      release: 0.35,
      volume: 0.32,
      pattern: [0, 100, 200],
    },
  },
];

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function easeLinear(t: number): number {
  return t;
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
