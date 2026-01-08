/*
  # Add opacity and stroke fields to presets table

  1. Changes
    - Add `opacity` column to `presets` table
      - Type: numeric (0 to 100)
      - Default value: 100 (fully opaque)
    - Add `stroke_enabled` column to `presets` table
      - Type: boolean
      - Default value: false
    - Add `stroke_thickness` column to `presets` table
      - Type: integer
      - Default value: 2
    - Add `stroke_color` column to `presets` table
      - Type: text (hex color)
      - Default value: '#000000' (black)
  
  2. Notes
    - Uses IF NOT EXISTS pattern to safely add columns
    - All columns have sensible defaults for existing presets
    - Opacity is stored as percentage (0-100) for easier user understanding
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'opacity'
  ) THEN
    ALTER TABLE presets ADD COLUMN opacity integer NOT NULL DEFAULT 100;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'stroke_enabled'
  ) THEN
    ALTER TABLE presets ADD COLUMN stroke_enabled boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'stroke_thickness'
  ) THEN
    ALTER TABLE presets ADD COLUMN stroke_thickness integer NOT NULL DEFAULT 2;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'stroke_color'
  ) THEN
    ALTER TABLE presets ADD COLUMN stroke_color text NOT NULL DEFAULT '#000000';
  END IF;
END $$;