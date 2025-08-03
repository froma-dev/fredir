import { type Settings } from '@lightningjs/blits';
import { HD, FULL_HD } from './utils/screenResolutions';

const defaultScreenResolution = FULL_HD;
const config: Settings = {
  w: defaultScreenResolution.width,
  h: defaultScreenResolution.height,
  debugLevel: 1,
  fonts: [
    {
      family: 'lato',
      type: 'msdf',
      file: 'fonts/Lato-Regular.ttf',
    },
    {
      family: 'raleway',
      type: 'msdf',
      file: 'fonts/Raleway-ExtraBold.ttf',
    },
    {
      family: 'opensans',
      type: 'web',
      file: 'fonts/OpenSans-Medium.ttf',
    },
  ],
};

export default config;
