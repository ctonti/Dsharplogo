/*
  # Add background_color column to presets table

  1. Changes
    - Add `background_color` column to `presets` table
      - Type: text
      - Default value: '#ffffff' (white)
      - Not null constraint with default
  
  2. Notes
    - Uses IF NOT EXISTS pattern to safely add column
    - Sets default white background for existing presets
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'background_color'
  ) THEN
    ALTER TABLE presets ADD COLUMN background_color text NOT NULL DEFAULT '#ffffff';
  END IF;
END $$;