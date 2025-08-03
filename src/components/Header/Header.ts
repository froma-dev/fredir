import Blits from '@lightningjs/blits';
import colors from '../../utils/colors';

export default Blits.Component('Header', {
  template: `
    <Element
      w="$width"
      h="120"
      color="$backgroundColor"
    >
      <Element src="$brand" w="90" h="90" x="30" y="12" />
      <Text placement="{x: 'center', y: 'middle'}" content="$title" size="40" color="$fontColor" />
    </Element>
  `,
  props: ['title', 'brand'],
  state() {
    return {
      backgroundColor: colors.gray[800],
      fontColor: colors.gray[50],
      width: this.$appState.w,
    };
  },
});
