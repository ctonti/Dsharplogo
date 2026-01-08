/*
  # Add gradient_target field to presets table

  1. Changes
    - Add `gradient_target` column to `presets` table
      - Type: text
      - Default: 'all'
      - Description: Specifies which element of the object should have the gradient applied
      - Possible values: 'all', 'front', 'back', 'sides', 'top', 'bottom', 'background'
  
  2. Notes
    - Default value is 'all' to maintain backward compatibility with existing presets
    - The field allows users to selectively apply gradients to specific faces or the background
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presets' AND column_name = 'gradient_target'
  ) THEN
    ALTER TABLE presets ADD COLUMN gradient_target text DEFAULT 'all';
  END IF;
END $$;