import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Preset {
  id: string;
  name: string;
  hash_length: number;
  vertical_spacing: number;
  horizontal_spacing: number;
  bar_thickness: number;
  bar_depth: number;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
  vertical_tilt: number;
  is_outline: boolean;
  outline_thickness: number;
  is_perspective: boolean;
  is_light_on: boolean;
  primary_color: string;
  created_at: string;
  updated_at: string;
}

export interface PresetSettings {
  name: string;
  hash_length: number;
  vertical_spacing: number;
  horizontal_spacing: number;
  bar_thickness: number;
  bar_depth: number;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
  vertical_tilt: number;
  is_outline: boolean;
  outline_thickness: number;
  is_perspective: boolean;
  is_light_on: boolean;
  primary_color: string;
}
