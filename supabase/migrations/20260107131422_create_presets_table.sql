/*
  # Create presets table

  1. New Tables
    - `presets`
      - `id` (uuid, primary key) - Unique identifier for each preset
      - `name` (text) - Name of the preset
      - `hash_length` (integer) - Length of the hash
      - `vertical_spacing` (integer) - Vertical spacing between bars
      - `horizontal_spacing` (integer) - Horizontal spacing between bars
      - `bar_thickness` (integer) - Thickness of the bars
      - `bar_depth` (integer) - Depth of the bars
      - `rotation_x` (integer) - X-axis rotation
      - `rotation_y` (integer) - Y-axis rotation
      - `rotation_z` (integer) - Z-axis rotation
      - `vertical_tilt` (integer) - Tilt angle for vertical bars
      - `is_outline` (boolean) - Whether to show outline mode
      - `outline_thickness` (integer) - Thickness of the outline
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `presets` table
    - Add policy for anyone to read presets (public access)
    - Add policy for anyone to create presets (public access)
    - Add policy for anyone to update presets (public access)
    - Add policy for anyone to delete presets (public access)
    
  Note: This is a simple public preset system. For production with user auth,
  you would add a `user_id` column and restrict access accordingly.
*/

CREATE TABLE IF NOT EXISTS presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  hash_length integer NOT NULL DEFAULT 8,
  vertical_spacing integer NOT NULL DEFAULT 20,
  horizontal_spacing integer NOT NULL DEFAULT 20,
  bar_thickness integer NOT NULL DEFAULT 10,
  bar_depth integer NOT NULL DEFAULT 10,
  rotation_x integer NOT NULL DEFAULT -30,
  rotation_y integer NOT NULL DEFAULT 45,
  rotation_z integer NOT NULL DEFAULT 0,
  vertical_tilt integer NOT NULL DEFAULT 0,
  is_outline boolean NOT NULL DEFAULT false,
  outline_thickness integer NOT NULL DEFAULT 2,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read presets"
  ON presets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create presets"
  ON presets FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update presets"
  ON presets FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete presets"
  ON presets FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS presets_created_at_idx ON presets(created_at DESC);