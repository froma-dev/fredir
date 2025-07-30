import Blits from "@lightningjs/blits";
import colors from "../utils/colors";

export default Blits.Component("CarouselItem", {
  template: `
  <Element
  w="$glowWidth"
  h="$glowHeight"
  :effects="[{type: 'radius', props: {radius: 8}}]"
  :color="$hasFocus ? $focusBackgroundColor : 'transparent'"
  >
    <Element
      w="$width"
      h="$height"
      placement="{x: 'center', y: 'middle'}"
      :color="$backgroundColor"
      :effects="[{type: 'radius', props: {radius: 6}}]"
    >
        <Element color="$headerColor" w="$width" h="80" :effects="[{type: 'radius', props: {radiusTop: 8}}]">
            <Layout padding="{x: 16, top: 5}" gap="10" w="$width" align-items="center" direction="horizontal">
                <Element h="80" :w="$numberWidth">
                  <Text
                    :content="$number"
                    :color="$numberColor"
                    @loaded="$onNumberTextLoaded"
                    placement="middle"
                    size="40"
                  />
                </Element>
                <Element h="80" :w="$titleWidth">
                  <Text
                    :content="$item.title"
                    :color="$titleFontColor"
                    @loaded="$onTitleLoaded"
                    placement="middle"
                    size="32"
                    maxwidth="325"
                    maxlines="1"
                  />
                </Element>
            </Layout>
        </Element>
        <Text
          :content="$item.url"
          :color="$fontColor"
          x="16" y="115"
          maxwidth="360"
          maxlines="3"
          size="28"
        />
    </Element>
  </Element>
  `,
  props: ["item", "index", "id", "width", "height", "offset"],
  state() {
    return {
      backgroundColor: colors.surface.elevated,
      fontColor: colors.gray[100],
      titleFontColor: colors.gray[50],
      numberColor: colors.primary[300],
      headerColor: colors.surface.light,
      number: this.index < 9 ? `0${this.index + 1}` : this.index + 1,
      numberWidth: 0,
      titleWidth: 0,
      glowWidth: this.width + this.offset,
      glowHeight: this.height + this.offset,
      focusBackgroundColor: colors.focus.primary
    };
  },
  methods: {
    onNumberTextLoaded ({w}: {w: number}) {
      this.numberWidth = w;
    },
    onTitleLoaded({w}: {w: number}) {
      this.titleWidth = w;
    }
  },
  hooks: {
    ready() {
    },
    focus() {
    },
    unfocus() {
    },
  },
  input: {
    enter() {
      window.location.href = this.item.url;
    },
    back() {
      // intercept
    },
  },
});
