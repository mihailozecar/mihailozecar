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
        :value="modelValue"
        :disabled="disabledFinal"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="emitInput"
        @keyup="emitKeyup"
        @blur="emitBlur"
      >
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  emits: ['update:modelValue', 'keyup', 'blur', 'enter'],
  props: {
    modelValue: {
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
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Function,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    eager: {
      type: Boolean,
      default: false
    },
    minlength: {
      type: [String, Number],
      default: 0
    },
    maxlength: {
      type: [String, Number],
      default: 255
    },
    loading: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    }
  },
  computed: {
    cssClasses() {
      const classes = [];
      classes.push(this.type);

      if (this.disabled) {
        classes.push('disabled');
      }

      if (!this.valid) {
        classes.push('is-invalid');
      }

      if (this.loading) {
        classes.push('loading');
      }

      return classes.join(' ');
    },
    disabledFinal() {
      return this.disabled || this.loading;
    }
  },
  data() {
    return {
      valid: true
    };
  },
  mounted() {
    if (this.autofocus) {
      this.focus();
    }
  },
  methods: {
    async emitInput(e) {
      this.$emit('update:modelValue', e.target.value);
      
      if (this.eager) {
        await this.$nextTick();
        await this.validateFinal();
      }
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
    async emitBlur(e) {
      this.$emit('blur', e);

      if (!this.eager) {
        await this.$nextTick();
        await this.validateFinal();
      }
    },
    focus() {
      if (this.disabled) {
        return;
      }

      this.$refs.input.focus();
    },
    async validateFinal() {
      this.valid = true;
      
      if (this.validate != null) {
        this.valid = await this.validate();
      } else if (this.required) {
        this.valid = typeof this.modelValue == 'string' && this.modelValue.trim() != '';
      } else if (this.minlength != 0) {
        this.valid = typeof this.modelValue == 'string' && this.modelValue.trim().length >= parseInt(this.minlength);
      }

      return this.valid;
    },
    async isValid() {
      return await this.validateFinal();
    },
    resetValidation() {
      this.valid = true;
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

  .form-group.disabled fieldset {
    border-color: rgba(49, 27, 146, .3);
  }

  .form-group.is-invalid fieldset {
    border-color: var(--error-color);
    color: var(--error-color);
  }
  
  .form-group .form-group-input {
    background: transparent;
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
  }

  .form-group.loading fieldset {
    animation: var(--loading-animation);
  }

  @media (prefers-color-scheme: dark) {
    .form-group fieldset {
      border-color: var(--light-purple-accent-color);
      color: var(--light-purple-accent-color);
    }

    .form-group.disabled fieldset {
      border-color: var(--light-purple-accent-color-dim-shade);
    }

    .form-group .form-group-input {
      color: white;
    }
  }
</style>
