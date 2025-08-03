// TV-optimized color palette - Dark, rich, and vibrant for big screens

type ColorShade = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

type ColorPalette = {
  primary: ColorShade;
  gray: ColorShade;
  success: ColorShade;
  warning: ColorShade;
  error: ColorShade;
  accent: ColorShade; // Replaced info with accent for better TV UI
  white: string;
  black: string;
  surface: {
    dark: string;
    light: string;
    elevated: string;
  };
  focus: {
    primary: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
  };
};

const colors: ColorPalette = {
  // Primary - Deep Purple with blue undertones
  primary: {
    50: '#F0E6FF',
    100: '#D9BFFF',
    200: '#BF95FF',
    300: '#A56BFF',
    400: '#8A42FF',
    500: '#6F1AFF', // Vibrant purple
    600: '#5B00E0',
    700: '#4600B3',
    800: '#320086',
    900: '#1D0059',
  },

  // Gray - Cool grays with blue undertones
  gray: {
    50: '#F5F7FA',
    100: '#E8ECF1',
    200: '#D1D9E3',
    300: '#B8C2CC',
    400: '#8E99A6',
    500: '#6B7680',
    600: '#4E5860',
    700: '#3A4249',
    800: '#262C33',
    900: '#12161C',
  },

  // Success - Emerald Green
  success: {
    50: '#E6FFF2',
    100: '#B3FFD9',
    200: '#80FFBF',
    300: '#4DFFA6',
    400: '#1AFF8C',
    500: '#00E673', // Vibrant emerald
    600: '#00B359',
    700: '#008040',
    800: '#004D26',
    900: '#001A0D',
  },

  // Warning - Amber Gold
  warning: {
    50: '#FFF9E6',
    100: '#FFEEB3',
    200: '#FFE380',
    300: '#FFD84D',
    400: '#FFCC1A',
    500: '#FFC000', // Rich amber
    600: '#CC9A00',
    700: '#997300',
    800: '#664D00',
    900: '#332600',
  },

  // Error - Ruby Red
  error: {
    50: '#FFE6EB',
    100: '#FFB3C2',
    200: '#FF8099',
    300: '#FF4D70',
    400: '#FF1A47',
    500: '#E6002E', // Deep ruby
    600: '#B80025',
    700: '#8A001C',
    800: '#5C0013',
    900: '#2E0009',
  },

  // Accent - Electric Blue (replaces info)
  accent: {
    50: '#E6F7FF',
    100: '#B3E6FF',
    200: '#80D4FF',
    300: '#4DC3FF',
    400: '#1AB1FF',
    500: '#00A0FF', // Electric blue
    600: '#0080CC',
    700: '#006099',
    800: '#004066',
    900: '#002033',
  },

  // Base colors
  white: '#FFFFFF',
  black: '#0A0A0A', // Slightly off-black for better contrast

  // Surface colors for TV UI
  surface: {
    dark: '#12161C', // Dark background
    light: '#1E232B', // Light background
    elevated: '#2A313A', // Elevated components
  },

  // Focus states - Bright and vibrant for TV visibility
  focus: {
    primary: '#B388FF', // Light purple glow
    success: '#69F0AE', // Mint green glow
    warning: '#FFD54F', // Golden glow
    error: '#FF8A80', // Coral glow
    accent: '#40C4FF', // Sky blue glow
  },
};

export default colors;
export type { ColorPalette };
