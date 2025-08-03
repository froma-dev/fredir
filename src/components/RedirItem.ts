import Blits from '@lightningjs/blits';
import colors from '../utils/colors';

interface MarqueeProps {
  speed?: number; // pixels per second
  delay?: number; // milliseconds to wait before starting
  enabled?: boolean; // whether marquee is enabled
}

export default Blits.Component('RedirItem', {
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
        <Element w="360" h="84" y="115" x="16" clipping="true">
          <Text
            :content="$item.url"
            :color="$fontColor"
            :x="$textX + 5"
            y="0"
            maxwidth="1000"
            maxlines="3"
            size="28"
            @loaded="$onUrlLoaded"
          />
        </Element>
    </Element>
  </Element>
  `,
  props: ['item', 'index', 'id', 'width', 'height', 'offset', 'marqueeConfig'],
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
      focusBackgroundColor: colors.focus.primary,
      // Marquee configuration with defaults
      marquee: {
        speed: 80, // pixels per second
        delay: 1000, // 2 seconds before starting
        enabled: true,
        ...(this.marqueeConfig || {}), // Merge with provided config if any
      },
      textX: 0,
      textWidth: 0,
      isScrolling: false,
      scrollDirection: -1,
      scrollPosition: 0,
      containerWidth: 360, // Default maxwidth from the Text element
    };
  },
  methods: {
    onNumberTextLoaded({ w }: { w: number }) {
      this.numberWidth = w;
    },
    onTitleLoaded({ w }: { w: number }) {
      this.titleWidth = w;
    },
    onUrlLoaded({ w }: { w: number }) {
      this.textWidth = w;
    },
    startMarquee() {
      if (!this.marquee.enabled || this.textWidth <= this.containerWidth) {
        return;
      }

      if (this.marqueeTimeoutId) {
        this.$clearTimeout(this.marqueeTimeoutId);
      }

      // Initial delay before starting
      this.marqueeTimeoutId = this.$setTimeout(() => {
        this.isScrolling = true;
        this.animateMarquee();
      }, this.marquee.delay);
    },
    stopMarquee() {
      this.resetMarquee(true);
      this.isScrolling = false;
    },
    animateMarquee() {
      if (!this.isScrolling) return;

      const containerWidth = this.containerWidth;
      const textWidth = this.textWidth;
      const maxScroll = textWidth - containerWidth + this.offset;

      // Update scroll position based on speed and time
      const delta = this.marquee.speed / 60; // 60fps
      this.scrollPosition -= delta;

      // If we've scrolled past the end, reset to start
      if (this.scrollPosition < -maxScroll) {
        this.resetMarquee();
      } else {
        this.textX = this.scrollPosition;
        requestAnimationFrame(this.animateMarquee.bind(this));
      }
    },
    resetMarquee(shouldResetImmediately: boolean = false) {
      this.scrollPosition = 0;

      if (this.marqueeTimeoutId) {
        this.$clearTimeout(this.marqueeTimeoutId);
      }

      if (shouldResetImmediately) {
        this.textX = 0;
      } else {
        // Small delay before starting the next scroll
        this.marqueeTimeoutId = this.$setTimeout(() => {
          if (this.isScrolling) {
            requestAnimationFrame(this.animateMarquee.bind(this));
          }
        }, this.marquee.delay);
      }
    },
  },
  hooks: {
    ready() {
      // Initialize marquee when component is ready
    },
    focus() {
      // Restart marquee when focused
      if (this.marquee.enabled) {
        this.scrollPosition = 0;
        this.textX = 0;
        this.scrollDirection = -1;
        this.startMarquee();
      }
    },
    unfocus() {
      // Pause marquee when unfocused
      this.stopMarquee();
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
