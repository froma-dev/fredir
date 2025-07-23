import Blits from '@lightningjs/blits'
import Carousel from '../components/Carousel'
import Loader from '../components/Loader'
import colors from '../utils/colors'
import Header from '../components/Header/Header'
import { fetchRedirections, type RedirectionItem } from '../services/redirs'

export default Blits.Component('Home', {
  components: {
    Loader,
    Carousel,
    Header,
  },
  template: `
    <Element :w="$$appState.w" :h="$$appState.h" color="$backgroundColor">
    <Header brand="assets/thunda.svg" title="fRedir - Smart Redirects" />
      <Element :y.transition="$y">
        <Loader :x="$$appState.w / 2" mount="{x: 0.5}" y="600" w="160" :alpha.transition="$loaderAlpha" />
        <Element y="200" :alpha.transition="$textAlpha">
          <Carousel ref="carousel" :items="$items" title="Redirects" />
        </Element>
      </Element>
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
      backgroundColor: colors.surface.dark
    }
  },
  hooks: {
    init() {

    },
    ready() {

      this.loaderAlpha = 1

      this.$setTimeout(() => {
        this.y = -60
        this.loaderAlpha = 0
        this.textAlpha = 1
      }, 500)

      this.$setTimeout(() => {
        this.y = -60
        this.loaderAlpha = 0
        this.textAlpha = 1
      }, 500)

      this.loadItems().then(() => {
        const focusItem = this.$select('carousel')

        if (focusItem && focusItem.$focus) focusItem.$focus();
      })

    },
  },
  methods: {
    async loadItems() {
      const redirections = await fetchRedirections();

      this.items = redirections
    }
  },
})
