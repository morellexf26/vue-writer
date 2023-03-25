<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "VueWriter",
  props: {
    array: {
      type: Array,
      required: true,
    },
    typeSpeed: {
      type: Number,
      default: 200,
    },
    delay: {
      type: Number,
      default: 2000,
    },
    intervals: {
      type: Number,
      default: 500,
    },
    start: {
      type: Number,
      default: 0,
    },
    caret: {
      type: String,
      default: "cursor",
    },
    iterations: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      typeValue: "",
      count: 0,
      typeStatus: false,
      arrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    typewriter() {
      let loop = 0;
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
            return (this.typeStatus = false);
          }
        }

        this.typeStatus = false;
      }
    },
    onTyped(typedString) {
      this.$emit("typed", typedString);
    }
  },
  created() {
    setTimeout(this.typewriter, this.start);
  },
});
</script>

<template>
  <div class="is-typed">
    <slot />
    <span class="typed">{{ typeValue }}</span>
    <span :class="caret + ' ' + { typing: typeStatus }">&nbsp;</span>
  </div>
</template>
