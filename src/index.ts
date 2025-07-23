import Blits from '@lightningjs/blits'
import App from './App'
import config from './config'
import { appState } from '@lightningjs/blits/plugins'
import { ScreenResolutions } from './utils/screenResolutions'

const {w = 1920, h = 1080} = config
const screenRes = w < ScreenResolutions.HD.width ? ScreenResolutions.HD : ScreenResolutions.FULL_HD
console.log(w, h, screenRes)
Blits.Plugin(appState, {
    w,h,
    screenRes
})
Blits.Launch(App, 'app', config)
