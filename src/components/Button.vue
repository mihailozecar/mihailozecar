<template>
  <button
    class="btn"
    :class="cssClasses"
    :disabled="disabled"
    @click="emitClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDefaultType() {
      let isDefault = true;

      if (this.primary) {
        isDefault = false;
      }

      return isDefault;
    },
    cssClasses() {
      const classes = [];

      if (!this.isDefaultType) {
        if (this.primary) {
          classes.push('btn-primary');
        }
      } else {
        classes.push('btn-default');
      }

      if (this.disabled) {
        classes.push('disabled');
      }

      return classes.join(' ');
    }
  },
  methods: {
    emitClick(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style scoped>
  .btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 3px;
    padding: .5rem;
    font-size: 1em;
    outline: none;
  }

  .btn.disabled {
    cursor: not-allowed;
  }

  .btn:active:not(.disabled) { 
    transform: scale(0.98); 
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 
  }

  .btn-default {
    border: 1px solid #333;
    background: #efefef;
  }

  .btn-primary {
    background: #651fff;
    color: white;
  }
</style>