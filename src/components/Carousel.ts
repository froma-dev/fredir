import Blits from "@lightningjs/blits";
import CarouselItem from "./CarouselItem";
import colors from "../utils/colors";

const w = 600;

export default Blits.Component("Carousel", {
  components: {
    CarouselItem,
  },
  template: `
    <Element>
      <Element :alpha.transition="{value: $itemOffset < 240 ? 1 : 0, duration: 200}">
        <Text content="$title" x="60" />
        <Element y="50" x="60" h="2" w="$$appState.w" color="colors.primary[300]" />
      </Element>

      <Element y="100" :x.transition="$rowOffset">
        <CarouselItem
          :for="(item, index) in $items"
          :x.transition="{value: $itemOffset + $index * 430, delay: 50 * ($index%4), duration: 500}"
          title="$item.title"
          url="$item.url"
          id="$item.id"
          index="$item.index"
          :ref="'item'+$item.index"
          key="$item.id"
        />
      </Element>
    </Element>
  `,
  props: ["title", "items"],
  state() {
    return {
      focused: 0,
      rowOffset: 60,
      itemOffset: 240,
    };
  },
  hooks: {
    ready() {
      this.itemOffset = 0;
    },
    focus() {
      this.$trigger("focused");
    },
  },
  watch: {
    focused(value: number) {
      const focusItem = this.$select(`item${value}`);
      console.log('---->',focusItem, value)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus();
        if (value < 1) {
          this.rowOffset = 60;
        } else if (value > this.items.length - 2) {
          this.rowOffset = 60 - (this.items.length - 2) * 430 + 430;
        } else {
          this.rowOffset = 60 - value * 430 + 430;
        }
      }
    },
  },
  input: {
    left() {
      console.log("left");
      if (this.focused > 0) {
        this.focused--;
      } else {
        this.focused = this.items.length - 1;
      }
    },
    right() {
      console.log("right");
      if (this.focused < this.items.length - 1) {
        this.focused++;
      } else {
        this.focused = 0;
      }
    },
  },
});
