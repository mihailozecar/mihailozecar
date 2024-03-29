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
  emits: ['click'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssClasses() {
      const classes = [];

      if (this.primary) {
        classes.push('btn-primary');
      } else if (this.danger) {
        classes.push('btn-danger');
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
    border-radius: 5px;
    padding: .5rem;
    font-size: 1em;
    outline: none;
    box-shadow: var(--default-box-shadow);
  }

  .btn.disabled {
    cursor: not-allowed;
  }

  .btn:active:not(.disabled) { 
    transform: var(--btn-press-transform); 
    box-shadow: var(--btn-press-box-shadow);
  }

  .btn-default {
    background: var(--default-background-light);
  }

  .btn-primary {
    background: var(--purple-accent-color);
    box-shadow: 3px 2px 10px 0px rgba(101, 31, 255, 0.1);
    color: white;
  }

  .btn-danger {
    background: var(--error-color);
    box-shadow: 3px 2px 10px 0px rgba(101, 31, 255, 0.1);
    color: white;
  }

  @media (prefers-color-scheme: dark) {
    .btn-default {
      color: white;
    }

    .btn-primary {
      background: var(--purple-accent-color);
    }
  }
</style>
