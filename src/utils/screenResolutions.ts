export const ScreenResolutions = {
    HD: {
        width: 1280,
        height: 720,
        itemSizes: {
          small: { width: 200, height: 120 },
          medium: { width: 300, height: 180 },
          large: { width: 400, height: 240 }
        }
      },
      FULL_HD: {
        width: 1920,
        height: 1080,
        itemSizes: {
          small: { width: 300, height: 180 },
          medium: { width: 450, height: 270 },
          large: { width: 600, height: 360 }
        }
      }
};

export const HD = ScreenResolutions.HD;
export const FULL_HD = ScreenResolutions.FULL_HD;
export type ScreenResolution = keyof typeof ScreenResolutions;