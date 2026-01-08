/*
  # Add shadow fields to presets table

  1. Changes
    - Add `shadow_enabled` column to `presets` table
      - Type: boolean
      - Default value: false
    - Add `shadow_blur` column to `presets` table
      - Type: integer (blur radius in pixels)
      - Default value: 20
    - Add `shadow_color` column to `presets` table
      - Type: text (hex color with alpha)
      - Default value: '#00000080' (semi-transparent black)
    - Add `shadow_offset_x` column to `presets` table
      - Type: integer (horizontal offset in pixels)
      - Default value: 10
    - Add `shadow_offset_y` column to `presets` table
      - Type: integer (vertical offset in pixels)
      - Default value: 10
  
  2. Notes
    - Uses IF NOT EXISTS pattern to safely add columns
    - All columns have sensible defaults for existing presets
    - Shadow is disabled by default to maintain current appearance
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'shadow_enabled'
  ) THEN
    ALTER TABLE presets ADD COLUMN shadow_enabled boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'shadow_blur'
  ) THEN
    ALTER TABLE presets ADD COLUMN shadow_blur integer NOT NULL DEFAULT 20;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'shadow_color'
  ) THEN
    ALTER TABLE presets ADD COLUMN shadow_color text NOT NULL DEFAULT '#00000080';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'shadow_offset_x'
  ) THEN
    ALTER TABLE presets ADD COLUMN shadow_offset_x integer NOT NULL DEFAULT 10;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'shadow_offset_y'
  ) THEN
    ALTER TABLE presets ADD COLUMN shadow_offset_y integer NOT NULL DEFAULT 10;
  END IF;
END $$;