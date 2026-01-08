import { useEffect, useState } from 'react';
import ControlPanel from './ControlPanel';
import PresetList from './PresetList';
import AnimationPanel from './AnimationPanel';
import { Preset } from '../lib/supabase';
import { useAnimation } from '../hooks/useAnimation';

export default function Hash3D() {
  const [rotation, setRotation] = useState({ x: -25, y: 35 });
  const [targetRotation, setTargetRotation] = useState({ x: -25, y: 35 });

  const [isPerspective, setIsPerspective] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isLightOn, setIsLightOn] = useState(true);
  const [isOutline, setIsOutline] = useState(false);

  const [radius, setRadius] = useState(8);
  const [barLength, setBarLength] = useState(180);
  const [verticalTilt, setVerticalTilt] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#1e40af');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { currentAnimation, animationState, playAnimation } = useAnimation({
    baseRotation: rotation,
    baseRadius: radius,
    baseBarLength: barLength,
    baseColor: primaryColor,
    soundEnabled,
  });

  const activeRotation = animationState?.rotation || rotation;
  const activeRadius = animationState?.radius || radius;
  const activeBarLength = animationState?.barLength || barLength;
  const activeColor = animationState?.color || primaryColor;

  const s = 30;

  const loadPreset = (preset: Preset) => {
    setRadius(preset.bar_thickness / 2);
    setBarLength(preset.hash_length);
    setVerticalTilt(preset.vertical_tilt);
    setIsOutline(preset.is_outline);
    setIsPerspective(preset.is_perspective);
    setIsLightOn(preset.is_light_on);
    setPrimaryColor(preset.primary_color);
    setRotation({ x: preset.rotation_x, y: preset.rotation_y });
    setTargetRotation({ x: preset.rotation_x, y: preset.rotation_y });
  };

  const getCurrentSettings = () => ({
    name: '',
    hash_length: barLength,
    vertical_spacing: s,
    horizontal_spacing: s,
    bar_thickness: radius * 2,
    bar_depth: radius * 2,
    rotation_x: Math.round(rotation.x),
    rotation_y: Math.round(rotation.y),
    rotation_z: 0,
    vertical_tilt: verticalTilt,
    is_outline: isOutline,
    outline_thickness: 2,
    is_perspective: isPerspective,
    is_light_on: isLightOn,
    primary_color: primaryColor,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rectWidth = window.innerWidth * 0.6;
      const rectHeight = window.innerHeight * 0.6;

      const left = centerX - rectWidth / 2;
      const right = centerX + rectWidth / 2;
      const top = centerY - rectHeight / 2;
      const bottom = centerY + rectHeight / 2;

      if (e.clientX >= left && e.clientX <= right && e.clientY >= top && e.clientY <= bottom) {
        const mouseX = (e.clientX - left) / rectWidth;
        const mouseY = (e.clientY - top) / rectHeight;

        setTargetRotation({
          x: -mouseY * 360,
          y: mouseX * 360
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rectWidth = window.innerWidth * 0.6;
      const rectHeight = window.innerHeight * 0.6;

      const left = centerX - rectWidth / 2;
      const right = centerX + rectWidth / 2;
      const top = centerY - rectHeight / 2;
      const bottom = centerY + rectHeight / 2;

      if (e.clientX >= left && e.clientX <= right && e.clientY >= top && e.clientY <= bottom) {
        window.dispatchEvent(new CustomEvent('trigger-save-preset'));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setRotation(prev => ({
        x: prev.x + (targetRotation.x - prev.x) * 0.06,
        y: prev.y + (targetRotation.y - prev.y) * 0.06
      }));
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [targetRotation]);

  const t = activeRadius * 2;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 30, g: 64, b: 175 };
  };

  const adjustBrightness = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    const r = Math.min(255, Math.max(0, Math.round(rgb.r * (1 + percent / 100))));
    const g = Math.min(255, Math.max(0, Math.round(rgb.g * (1 + percent / 100))));
    const b = Math.min(255, Math.max(0, Math.round(rgb.b * (1 + percent / 100))));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const getColors = () => {
    if (!isLightOn) {
      const base = isDark ? adjustBrightness(activeColor, -30) : activeColor;
      return { front: base, back: base, side: base, top: base, bottom: base };
    }
    const lighter = adjustBrightness(activeColor, 30);
    const darker = adjustBrightness(activeColor, -20);
    const darkest = adjustBrightness(activeColor, -40);
    const lightest = adjustBrightness(activeColor, 50);

    if (isDark) {
      return {
        front: lighter,
        back: activeColor,
        side: darker,
        top: lightest,
        bottom: darkest
      };
    }
    return {
      front: activeColor,
      back: darker,
      side: darkest,
      top: lighter,
      bottom: '#0f172a'
    };
  };

  const colors = getColors();
  const borderColor = isDark ? adjustBrightness(activeColor, 80) : adjustBrightness(activeColor, -40);
  const outlineBorder = `2px solid ${borderColor}`;

  const createBox = (
    lengthX: number,
    lengthY: number,
    lengthZ: number,
    posX: number,
    posY: number,
    posZ: number,
    key: string,
    isVertical = false
  ) => {
    const hx = lengthX / 2;
    const hy = lengthY / 2;
    const hz = lengthZ / 2;

    const faceStyle = (color: string) =>
      isOutline
        ? { background: 'transparent', border: outlineBorder }
        : { background: color };

    const tiltTransform = isVertical ? `rotateX(${verticalTilt}deg)` : '';
    const baseTransform = `translate3d(${posX}px, ${posY}px, ${posZ}px) ${tiltTransform}`;

    return (
      <div
        key={key}
        className="absolute"
        style={{
          transformStyle: 'preserve-3d',
          transform: baseTransform,
          width: 0,
          height: 0,
        }}
      >
        <div
          className="absolute"
          style={{
            width: lengthX,
            height: lengthY,
            transform: `translate3d(${-hx}px, ${-hy}px, ${hz}px)`,
            ...faceStyle(colors.front),
          }}
        />
        <div
          className="absolute"
          style={{
            width: lengthX,
            height: lengthY,
            transform: `translate3d(${-hx}px, ${-hy}px, ${-hz}px)`,
            ...faceStyle(colors.back),
          }}
        />
        <div
          className="absolute"
          style={{
            width: lengthZ,
            height: lengthY,
            transform: `translate3d(${-hz}px, ${-hy}px, 0px) rotateY(90deg) translateZ(${-hx}px)`,
            ...faceStyle(colors.side),
          }}
        />
        <div
          className="absolute"
          style={{
            width: lengthZ,
            height: lengthY,
            transform: `translate3d(${-hz}px, ${-hy}px, 0px) rotateY(90deg) translateZ(${hx}px)`,
            ...faceStyle(colors.side),
          }}
        />
        <div
          className="absolute"
          style={{
            width: lengthX,
            height: lengthZ,
            transform: `translate3d(${-hx}px, ${-hz}px, 0px) rotateX(90deg) translateZ(${-hy}px)`,
            ...faceStyle(colors.top),
          }}
        />
        <div
          className="absolute"
          style={{
            width: lengthX,
            height: lengthZ,
            transform: `translate3d(${-hx}px, ${-hz}px, 0px) rotateX(90deg) translateZ(${hy}px)`,
            ...faceStyle(colors.bottom),
          }}
        />
      </div>
    );
  };

  const createOutlineBar = (
    axis: 'x' | 'y' | 'z',
    posX: number,
    posY: number,
    posZ: number,
    key: string
  ) => {
    const lines: JSX.Element[] = [];
    const ht = t / 2;
    const hl = activeBarLength / 2;

    const lineStyle = {
      background: borderColor,
      position: 'absolute' as const,
    };

    if (axis === 'x') {
      const corners = [
        { y: -ht, z: -ht },
        { y: -ht, z: ht },
        { y: ht, z: -ht },
        { y: ht, z: ht },
      ];
      corners.forEach((c, i) => {
        lines.push(
          <div
            key={`${key}-line-${i}`}
            style={{
              ...lineStyle,
              width: activeBarLength,
              height: 2,
              transform: `translate3d(${-hl}px, ${c.y}px, ${c.z}px)`,
            }}
          />
        );
      });
    } else if (axis === 'y') {
      const corners = [
        { x: -ht, z: -ht },
        { x: -ht, z: ht },
        { x: ht, z: -ht },
        { x: ht, z: ht },
      ];
      corners.forEach((c, i) => {
        lines.push(
          <div
            key={`${key}-line-${i}`}
            style={{
              ...lineStyle,
              width: 2,
              height: activeBarLength,
              transform: `translate3d(${c.x}px, ${-hl}px, ${c.z}px)`,
            }}
          />
        );
      });
    } else {
      const corners = [
        { x: -ht, y: -ht },
        { x: -ht, y: ht },
        { x: ht, y: -ht },
        { x: ht, y: ht },
      ];
      corners.forEach((c, i) => {
        lines.push(
          <div
            key={`${key}-line-${i}`}
            style={{
              ...lineStyle,
              width: 2,
              height: activeBarLength,
              transform: `translate3d(${c.x}px, ${-hl}px, 0px) rotateX(90deg)`,
              transformOrigin: 'top center',
            }}
          />
        );
      });
    }

    return (
      <div
        key={key}
        className="absolute"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate3d(${posX}px, ${posY}px, ${posZ}px)`,
          width: 0,
          height: 0,
        }}
      >
        {lines}
      </div>
    );
  };

  const bars: JSX.Element[] = [];
  const coords = [-s, s];

  if (isOutline) {
    coords.forEach((y, yi) => {
      coords.forEach((z, zi) => {
        bars.push(createOutlineBar('x', 0, y, z, `x-${yi}-${zi}`));
      });
    });
    coords.forEach((x, xi) => {
      coords.forEach((z, zi) => {
        bars.push(createOutlineBar('y', x, 0, z, `y-${xi}-${zi}`));
      });
    });
    coords.forEach((x, xi) => {
      coords.forEach((y, yi) => {
        bars.push(createOutlineBar('z', x, y, 0, `z-${xi}-${yi}`));
      });
    });
  } else {
    coords.forEach((y, yi) => {
      coords.forEach((z, zi) => {
        bars.push(createBox(activeBarLength, t, t, 0, y, z, `x-${yi}-${zi}`, false));
      });
    });
    coords.forEach((x, xi) => {
      coords.forEach((z, zi) => {
        bars.push(createBox(t, activeBarLength, t, x, 0, z, `y-${xi}-${zi}`, false));
      });
    });
    coords.forEach((x, xi) => {
      coords.forEach((y, yi) => {
        bars.push(createBox(t, t, activeBarLength, x, y, 0, `z-${xi}-${yi}`, true));
      });
    });
  }

  return (
    <div
      className={`w-full h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{
        perspective: isPerspective ? '800px' : 'none',
      }}
    >
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${activeRotation.x}deg) rotateY(${activeRotation.y}deg)`,
        }}
      >
        {bars}
      </div>

      <AnimationPanel
        isDark={isDark}
        currentAnimation={currentAnimation}
        onPlayAnimation={playAnimation}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      <ControlPanel
        isPerspective={isPerspective}
        setIsPerspective={setIsPerspective}
        isDark={isDark}
        setIsDark={setIsDark}
        isLightOn={isLightOn}
        setIsLightOn={setIsLightOn}
        isOutline={isOutline}
        setIsOutline={setIsOutline}
        radius={radius}
        setRadius={setRadius}
        barLength={barLength}
        setBarLength={setBarLength}
        verticalTilt={verticalTilt}
        setVerticalTilt={setVerticalTilt}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
      />

      <PresetList
        isDark={isDark}
        onLoadPreset={loadPreset}
        currentSettings={getCurrentSettings()}
      />
    </div>
  );
}
