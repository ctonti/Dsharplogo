/*
  # Add gradient fields to presets table

  1. Changes
    - Add `gradient_enabled` column to `presets` table
      - Type: boolean
      - Default value: false
    - Add `gradient_type` column to `presets` table
      - Type: text ('linear' or 'radial')
      - Default value: 'linear'
    - Add `gradient_color1` column to `presets` table
      - Type: text (hex color)
      - Default value: '#3b82f6' (blue)
    - Add `gradient_color2` column to `presets` table
      - Type: text (hex color)
      - Default value: '#8b5cf6' (purple)
    - Add `gradient_angle` column to `presets` table
      - Type: integer (angle in degrees for linear gradient)
      - Default value: 90 (top to bottom)
  
  2. Notes
    - Uses IF NOT EXISTS pattern to safely add columns
    - All columns have sensible defaults for existing presets
    - Gradient is disabled by default to maintain current appearance
    - When gradient is enabled, it overrides the primary_color
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'gradient_enabled'
  ) THEN
    ALTER TABLE presets ADD COLUMN gradient_enabled boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'gradient_type'
  ) THEN
    ALTER TABLE presets ADD COLUMN gradient_type text NOT NULL DEFAULT 'linear';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'gradient_color1'
  ) THEN
    ALTER TABLE presets ADD COLUMN gradient_color1 text NOT NULL DEFAULT '#3b82f6';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'gradient_color2'
  ) THEN
    ALTER TABLE presets ADD COLUMN gradient_color2 text NOT NULL DEFAULT '#8b5cf6';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'gradient_angle'
  ) THEN
    ALTER TABLE presets ADD COLUMN gradient_angle integer NOT NULL DEFAULT 90;
  END IF;
END $$;