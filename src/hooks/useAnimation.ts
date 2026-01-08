import { useState, useRef, useCallback } from 'react';
import { animations, easeInOutCubic, lerp, lerpColor, AnimationKeyframe } from '../lib/animations';
import { playAnimationSound } from '../lib/audioEngine';

interface AnimationState {
  rotation: { x: number; y: number; z: number };
  radius: number;
  barLength: number;
  color: string;
}

interface UseAnimationProps {
  baseRotation: { x: number; y: number; z: number };
  baseRadius: number;
  baseBarLength: number;
  baseColor: string;
  soundEnabled: boolean;
}

interface UseAnimationReturn {
  currentAnimation: string | null;
  animationState: AnimationState | null;
  playAnimation: (id: string) => void;
}

export function useAnimation({
  baseRotation,
  baseRadius,
  baseBarLength,
  baseColor,
  soundEnabled,
}: UseAnimationProps): UseAnimationReturn {
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
  const [animationState, setAnimationState] = useState<AnimationState | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const initialStateRef = useRef<AnimationState | null>(null);

  const interpolateKeyframes = useCallback(
    (keyframes: AnimationKeyframe[], progress: number, initial: AnimationState): AnimationState => {
      let prevKeyframe: AnimationKeyframe = keyframes[0];
      let nextKeyframe: AnimationKeyframe = keyframes[keyframes.length - 1];

      for (let i = 0; i < keyframes.length - 1; i++) {
        if (progress >= keyframes[i].time && progress <= keyframes[i + 1].time) {
          prevKeyframe = keyframes[i];
          nextKeyframe = keyframes[i + 1];
          break;
        }
      }

      const segmentProgress =
        prevKeyframe.time === nextKeyframe.time
          ? 1
          : (progress - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);

      const easedProgress = easeInOutCubic(segmentProgress);

      const getPrevValue = (
        key: keyof AnimationKeyframe,
        defaultVal: number | { x: number; y: number; z?: number } | string
      ) => {
        for (let i = keyframes.indexOf(prevKeyframe); i >= 0; i--) {
          if (keyframes[i][key] !== undefined) {
            return keyframes[i][key];
          }
        }
        return defaultVal;
      };

      const getNextValue = (
        key: keyof AnimationKeyframe,
        defaultVal: number | { x: number; y: number; z?: number } | string
      ) => {
        for (let i = keyframes.indexOf(nextKeyframe); i < keyframes.length; i++) {
          if (keyframes[i][key] !== undefined) {
            return keyframes[i][key];
          }
        }
        return defaultVal;
      };

      const prevRotation = getPrevValue('rotation', { x: 0, y: 0, z: 0 }) as { x: number; y: number; z?: number };
      const nextRotation = getNextValue('rotation', { x: 0, y: 0, z: 0 }) as { x: number; y: number; z?: number };

      const prevRadiusMult = getPrevValue('radius', 1) as number;
      const nextRadiusMult = getNextValue('radius', 1) as number;

      const prevLengthMult = getPrevValue('barLength', 1) as number;
      const nextLengthMult = getNextValue('barLength', 1) as number;

      const prevColor = getPrevValue('color', initial.color) as string;
      const nextColor = getNextValue('color', initial.color) as string;

      return {
        rotation: {
          x: initial.rotation.x + lerp(prevRotation.x, nextRotation.x, easedProgress),
          y: initial.rotation.y + lerp(prevRotation.y, nextRotation.y, easedProgress),
          z: initial.rotation.z + lerp(prevRotation.z || 0, nextRotation.z || 0, easedProgress),
        },
        radius: initial.radius * lerp(prevRadiusMult, nextRadiusMult, easedProgress),
        barLength: initial.barLength * lerp(prevLengthMult, nextLengthMult, easedProgress),
        color: lerpColor(prevColor, nextColor, easedProgress),
      };
    },
    []
  );

  const playAnimation = useCallback(
    (id: string) => {
      const animation = animations.find((a) => a.id === id);
      if (!animation) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const initial: AnimationState = {
        rotation: { ...baseRotation },
        radius: baseRadius,
        barLength: baseBarLength,
        color: baseColor,
      };

      initialStateRef.current = initial;
      startTimeRef.current = performance.now();
      setCurrentAnimation(id);

      if (soundEnabled) {
        playAnimationSound(animation);
      }

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / animation.duration, 1);

        if (progress < 1) {
          const state = interpolateKeyframes(
            animation.keyframes,
            progress,
            initialStateRef.current!
          );
          setAnimationState(state);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setAnimationState(null);
          setCurrentAnimation(null);
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [baseRotation, baseRadius, baseBarLength, baseColor, soundEnabled, interpolateKeyframes]
  );

  return {
    currentAnimation,
    animationState,
    playAnimation,
  };
}
