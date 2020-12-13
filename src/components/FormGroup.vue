<template>
  <div 
    class="form-group"
    :class="cssClasses"
    @click="focus"
  >
    <fieldset>
      <legend>
        {{ label }}
      </legend>

      <input 
        class="form-group-input"
        ref="input"
        :type="type"
        :value="value"
        :disabled="disabled"
        @input="emitInput"
        @keyup="emitKeyup"
      >
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssClasses() {
      const classes = [];
      classes.push(this.type);

      if (this.disabled) {
        classes.push('disabled');
      }

      return classes.join(' ');
    }
  },
  methods: {
    emitInput(e) {
      this.$emit('input', e.target.value);
    },
    emitEnter(e) {
      this.$emit('enter', e);
    },
    emitKeyup(e) {
      this.$emit('keyup', e);

      if (e.which == 13) {
        this.emitEnter(e);
      }
    },
    focus() {
      if (this.disabled) {
        return;
      }

      this.$refs.input.focus();
    }
  }
}
</script>

<style scoped>
  .form-group {
    margin-bottom: 15px;
  }

  .form-group.disabled,
  .form-group.disabled .form-group-input {
    cursor: not-allowed;
  }

  .form-group fieldset {
    border-color: #311b92;
    color: #311b92;
  }
  
  .form-group .form-group-input {
    background: transparent;
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
  }

  @media (prefers-color-scheme: dark) {
    .form-group fieldset {
      border-color: #bc6ff1;
      color: #bc6ff1;
    }

    .form-group .form-group-input {
      color: white;
    }
  }
</style>
