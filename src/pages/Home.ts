import Blits from '@lightningjs/blits';
import Carousel from '../components/Carousel';
import Loader from '../components/Loader';
import colors from '../utils/colors';
import Header from '../components/Header/Header';
import Grid from '../components/Grid/Grid';
import Zap from '../components/Zap/Zap';
import { fetchRedirections, type RedirectionItem } from '../services/redirs';

export default Blits.Component('Home', {
  components: {
    Loader,
    Carousel,
    Header,
    Grid,
    Zap,
  },
  template: `
    <Element :w="$$appState.w" :h="$$appState.h" color="$backgroundColor">
    <Header brand="assets/thunda.svg" title="fRedir - Smart Redirects" />
      <Element :y.transition="$y">
        <Loader :x="$$appState.w / 2" mount="{x: 0.5}" y="600" w="160" :alpha.transition="$loaderAlpha" />
          <!--<Carousel ref="carousel" :items="$items" title="Redirects" />-->
          <Grid ref="grid"
            :items="$items"
            :focusIndex="$gridFocusIndex"
            :alpha.transition="$textAlpha"
            columns="4"
            y="200"
            itemWidth="400"
            itemHeight="180"
            itemOffset="8"
            isContinuous="true"
          />
      </Element>
      <Zap
        :alpha.transition="{value: $zapTo.length > 0 ? 1 : 0, duration: 500}"
        :zapTo="$zapTo"
        placement="center"
        y="100"
      />
    </Element>`,
  state() {
    return {
      /**
       * Y-position of the entire page contents
       */
      y: 0 as number,
      /**
       * Alpha of the loader component, used to create a fade-in / fade-out transition
       */
      loaderAlpha: 0 as number,
      /**
       * Alpha of the text, used to create a fade-in transition
       */
      textAlpha: 0 as number,
      /**
       * Color passed into the loader component
       */
      color: '' as string,
      items: [] as RedirectionItem[],
      backgroundColor: colors.surface.dark,
      zapTimeoutId: null as number | null,
      zapTo: '' as string,
      gridFocusIndex: 0,
    };
  },
  hooks: {
    init() {},
    ready() {
      this.loaderAlpha = 1;

      this.$setTimeout(() => {
        this.y = -60;
        this.loaderAlpha = 0;
        this.textAlpha = 1;
      }, 500);

      this.$setTimeout(() => {
        this.y = -60;
        this.loaderAlpha = 0;
        this.textAlpha = 1;
      }, 500);

      this.loadItems().then(() => this.focusGrid());
    },
  },
  methods: {
    async loadItems() {
      const redirections = await fetchRedirections();

      this.items = redirections;
    },
    focusGrid() {
      const focusItem = this.$select('grid');
      if (focusItem && focusItem.$focus) focusItem.$focus();
    },
  },
  input: {
    any(ev) {
      // Check if the key is a digit (0-9)
      if (/^\d$/.test(ev.key)) {
        const zapToDigit = parseInt(ev.key, 10);

        if (this.zapTimeoutId) {
          this.$clearTimeout(this.zapTimeoutId);
        }

        this.zapTimeoutId = this.$setTimeout(() => {
          const zapToIndex = this.zapTo === '0' ? 0 : parseInt(this.zapTo) - 1;
          
          this.gridFocusIndex = zapToIndex;
          this.zapTimeoutId = null;
          this.zapTo = '';
          this.focusGrid();
        }, 4000);

        if (this.zapTo.length === 4) {
          this.zapTo = '';
        }

        this.zapTo += `${zapToDigit}`;
      }
    },
  },
});
