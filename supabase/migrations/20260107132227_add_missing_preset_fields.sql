/*
  # Add missing preset fields

  1. Changes
    - Add `is_perspective` (boolean) - Whether perspective mode is enabled
    - Add `is_light_on` (boolean) - Whether lighting effect is enabled
    - Add `primary_color` (text) - Hex color code for the primary color
  
  2. Notes
    - These fields are necessary to fully save and restore preset state
    - Default values match the application's initial state
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'is_perspective'
  ) THEN
    ALTER TABLE presets ADD COLUMN is_perspective boolean NOT NULL DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'is_light_on'
  ) THEN
    ALTER TABLE presets ADD COLUMN is_light_on boolean NOT NULL DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'primary_color'
  ) THEN
    ALTER TABLE presets ADD COLUMN primary_color text NOT NULL DEFAULT '#1e40af';
  END IF;
END $$;