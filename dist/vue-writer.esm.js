import { defineComponent, openBlock, createBlock, renderSlot, createVNode, toDisplayString } from 'vue';

var script = defineComponent({
  name: "VueWriter",
  props: {
    array: {
      type: Array,
      required: true
    },
    typeSpeed: {
      type: Number,
      "default": 200
    },
    delay: {
      type: Number,
      "default": 2000
    },
    intervals: {
      type: Number,
      "default": 500
    },
    start: {
      type: Number,
      "default": 0
    },
    caret: {
      type: String,
      "default": "cursor"
    },
    iterations: {
      type: Number,
      "default": 0
    }
  },
  data: function data() {
    return {
      typeValue: "",
      count: 0,
      typeStatus: false,
      arrayIndex: 0,
      charIndex: 0
    };
  },
  methods: {
    typewriter: function typewriter() {
      var loop = 0;

      if (this.charIndex < this.array[this.arrayIndex].length) {
        if (!this.typeStatus) {
          this.typeStatus = true;
        }

        this.typeValue += this.array[this.arrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typewriter, this.typeSpeed);
      } else {
        this.count += 1;
        this.onTyped(this.array[this.arrayIndex]);

        if (this.count === this.array.length) {
          loop += 1;

          if (loop === this.iterations) {
            return this.typeStatus = false;
          }
        }

        this.typeStatus = false;
      }
    },
    onTyped: function onTyped(typedString) {
      this.$emit("typed", typedString);
    }
  },
  created: function created() {
    setTimeout(this.typewriter, this.start);
  }
});

var _hoisted_1 = {
  "class": "is-typed"
};
var _hoisted_2 = {
  "class": "typed"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [renderSlot(_ctx.$slots, "default"), createVNode("span", _hoisted_2, toDisplayString(_ctx.typeValue), 1), createVNode("span", {
    "class": _ctx.caret + ' ' + {
      typing: _ctx.typeStatus
    }
  }, " ", 2)]);
}

script.render = render;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('VueWriter', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
