import Blits from '@lightningjs/blits';
import colors from '../../utils/colors';

const zapToOffset = 20;
export const DEFAULT_ZAP_TO_LENGTH = 4;
export const DEFAULT_ZAP_TIMEOUT_MS = 2500;
export const ZAP_TO_NOT_FOUND_TEXT = 'Not Found'
export default Blits.Component('Zap', {
  template: `
    <Layout
      :w="$w"
      :h="60"
      :color="$backgroundColor"
      :effects="[{type: 'radius', props: {radius: 8}}]"
      align-items="center"
      padding="16"
      placement="center"
    >
      <Text
        @loaded="$onZapToTextLoaded"
        :content="$zapTo"
        size="$textSize"
        color="$fontColor"
      />
    </Layout>
  `,
  props: ['zapTo'],
  state() {
    return {
      w: 0,
      backgroundColor: colors.accent[700],
      fontColor: colors.gray[50],
      textSize: '54',
    };
  },
  hooks: {
    ready() {
      this.w = 200;
    },
  },
  methods: {
    onZapToTextLoaded(ev: { w: number }) {
      const textWidth = ev.w;
      this.w = textWidth + zapToOffset;
    },
  },
});
