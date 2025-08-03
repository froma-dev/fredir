import Blits from '@lightningjs/blits';
import colors from '../../utils/colors';

const zapToOffset = 20;
export default Blits.Component('Zap', {
  template: `
    <Element
      :w="$w"
      :h="60"
      :color="$backgroundColor"
      :effects="[{type: 'radius', props: {radius: 8}}]"
    >
      <Text
        placement="{x: 'center', y: 'middle'}"
        @loaded="$onZapToTextLoaded"
        :content="$zapTo"
        size="$textSize"
        color="$fontColor"
      />
    </Element>
  `,
  props: ['zapTo'],
  state() {
    return {
      backgroundColor: colors.gray[900],
      fontColor: colors.gray[400],
      textSize: '54',
    };
  },
  methods: {
    onZapToTextLoaded(ev) {
      const textWidth = ev.w;
      this.w = textWidth + zapToOffset;
      this.backgroundColor = colors.gray[900];
    },
  },
  input: {
    any(event) {
      console.log('-------', event);
    },
  },
});
