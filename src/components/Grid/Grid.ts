
import Blits from '@lightningjs/blits'
import Item from '../CarouselItem'

interface GridState {
  focused: number;
  baseColumns: number;
  gridColumns: number;
  _scrollY: number;
  _visibleRows: number;
}

interface GridProps {
  itemHeight: number;
  itemWidth: number;
  itemOffset: number;
  items: any[];
  columns?: number;
  looping?: boolean;
  refocusParent?: boolean;
  isContinuous?: boolean;
  focusIndex?: number;
}

export default Blits.Component('Grid', {
  components: {
    Item,
  },
  template: `
    <Element x="$x" h="$containerHeight" clip="true">
      <Element :y.transition="{value: -$scrollY, duration: 350}">
        <Item
          :for="(item, index) in $items"
            :x="($index % ($gridColumns)) * $totalWidth"
            :y="Math.floor($index / ($gridColumns)) * $totalHeight"
            :ref="'grid-item-'+$item.id"
            index="$index"
            item="$item"
            id="$item.id"
            width="$itemWidth"
            height="$itemHeight"
            offset="$itemOffset"
            key="$item.id"
        />
      </Element>
    </Element>
  `,
  props: [
    'itemHeight',
    'itemWidth',
    'itemOffset',
    'items',
    'columns',
    'looping',
    'refocusParent',
    'isContinuous',
    'focusIndex',
    'visibleRows'
  ] as unknown as PropObject,
  state(): GridState {
    return {
      focused: this.focusIndex || 0,
      baseColumns: 4,
      gridColumns: this.columns || this.baseColumns,
      _scrollY: 0,
      _visibleRows: this.visibleRows || 4,
    }
  },
  computed: {
    totalWidth(): number {
      return (this.itemWidth || 300) + (this.itemOffset || 0)
    },
    totalHeight(): number {
      return (this.itemHeight || 300) + (this.itemOffset || 0)
    },
    gridWidth(): number {
      return (this.totalWidth * this.gridColumns)
    },
    containerHeight(): number {
      return this.totalHeight * this._visibleRows
    },
    x() {
      return ((this.$$appState.w - this.gridWidth) / 2)
    },
    scrollY() {
      return this._scrollY
    },
  },
  hooks: {
    ready() {
      if (this.isContinuous && this.looping) {
        throw new Error('Grid behaviour with looping and isContinuous cannot be applied together.')
      }
    },
    focus() {
      this.$trigger('focused')
      this.scrollToFocusedItem()
    },
  },
  methods: {
    scrollToFocusedItem() {
      const columns = this.gridColumns;
      const focusedRow = Math.floor(this.focused / columns);
      const visibleRows = this._visibleRows;
      const currentFirstVisibleRow = Math.floor(this.scrollY / this.totalHeight);

      // Calculate if focused item is outside visible area
      if (focusedRow < currentFirstVisibleRow) {
        // Scroll up to show the focused item at the top
        this._scrollY = focusedRow * this.totalHeight;
      } else if (focusedRow >= currentFirstVisibleRow + visibleRows) {
        // Scroll down to show the focused item at the bottom
        this._scrollY = (focusedRow - visibleRows + 1) * this.totalHeight;
      }

      // Ensure we don't scroll past the content
      const maxScroll = Math.max(0, (Math.ceil(this.items.length / columns) - visibleRows) * this.totalHeight);
      this._scrollY = Math.min(maxScroll, Math.max(0, this._scrollY));
    },
  },
  watch: {
    focusIndex() {
      this.focused = this.focusIndex
      this.$trigger('focused')
    },
    focused(value: number) {
      const focusItem = this.$select(`grid-item-${this.items[value].id}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
        this.scrollToFocusedItem()
      }
    },
  },
  input: {
    up(e) {
      const columns = this.gridColumns
      const previousIndex = this.focused - columns

      if (previousIndex >= 0) {
        this.focused = previousIndex
      } else if (this.looping) {
        const lastRow = this.items.length - (this.items.length % columns)
        const lastRowColumn = lastRow + (this.focused % columns)
        this.focused = lastRowColumn < this.items.length ? lastRowColumn : lastRowColumn - columns
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    down(e) {
      const columns = this.gridColumns
      const nextIndex = this.focused + columns

      if (nextIndex < this.items.length) {
        this.focused = nextIndex
      } else if (this.looping) {
        this.focused = nextIndex % columns
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    left(e) {
      const columns = this.gridColumns
      const isNotFirstInRow = this.focused % columns > 0
      const isWithinBounds = this.focused + columns - 1 < this.items.length
      const isNotFirst = this.focused > 0

      if (isNotFirstInRow) {
        this.focused -= 1
      } else if (this.looping) {
        this.focused = isWithinBounds ? this.focused + columns - 1 : this.items.length - 1
      } else if(this.isContinuous) {
        this.focused = isNotFirst ? this.focused - 1 : this.items.length - 1
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    right(e) {
      const columns = this.gridColumns
      const isNotLastInRow = this.focused % columns < columns - 1
      const isNotLastItem = this.focused < this.items.length - 1

      if (isNotLastInRow && isNotLastItem) {
        this.focused += 1
      } else if (this.looping) {
        const index = this.focused - columns + 1
        this.focused = isNotLastItem ? index : Math.floor(this.focused / columns) * columns
      } else if(this.isContinuous) {
        this.focused = isNotLastItem ? this.focused + 1 : 0
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
