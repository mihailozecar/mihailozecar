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
    transform: scale(0.98); 
    box-shadow: 3px 2px 10px 0px rgba(0, 0, 0, 0.24); 
  }

  .btn-default {
    background: var(--default-background-light);
  }

  .btn-primary {
    background: #651fff;
    box-shadow: 3px 2px 10px 0px rgba(101, 31, 255, 0.1);
    color: white;
  }

  @media (prefers-color-scheme: dark) {
    .btn-default {
      color: white;
    }

    .btn-primary {
      background: #bc6ff1;
    }
  }
</style>
