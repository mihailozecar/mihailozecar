<template>
  <div class="auth-layout">
    <div 
      class="site-name site-name-purple text-center"
      @click="goHome"
    >
      mihailozecar.com
    </div>

    <div 
      class="auth-form sign-in-form"
      v-if="!isRegistration"
    >
      <FormGroup
        label="Username"
        v-model="username"
        :loading="loadingInProgress"
        @enter="signIn"
        ref="username"
        required
      ></FormGroup>

      <FormGroup
        label="Password"
        v-model="password"
        type="password"
        :loading="loadingInProgress"
        @enter="signIn"
        required
        ref="password"
      ></FormGroup>

      <div class="d-flex justify-content-between">
        <Button
          @click="toggleAuthState"
          :disabled="loadingInProgress"
        >
          Register
        </Button>

        <Button
          primary
          :disabled="loadingInProgress"
          @click="signIn"
        >
          Sign In
        </Button>
      </div>
    </div>

    <div 
      class="auth-form registration-form"
      v-else
    >
      <template v-if="!enterConfirmationCode">
        <FormGroup
          label="Username"
          v-model="newUsername"
          :loading="loadingInProgress"
          ref="newUsername"
          @enter="register"
          required
        ></FormGroup>

        <FormGroup
          label="Email"
          type="email"
          v-model="email"
          :loading="loadingInProgress"
          ref="email"
          @enter="register"
          required
        ></FormGroup>

        <FormGroup
          label="Password"
          v-model="newPassword"
          type="password"
          :loading="loadingInProgress"
          @enter="register"
          ref="newPassword"
          minlength="8"
        ></FormGroup>

        <FormGroup
          label="Confirm password"
          v-model="newPasswordConfirm"
          type="password"
          :loading="loadingInProgress"
          @enter="register"
          :validate="() => newPasswordConfirm && newPasswordConfirm == newPassword"
          ref="newPasswordConfirm"
        ></FormGroup>

        <div class="d-flex justify-content-between">
          <Button
            @click="toggleAuthState"
            :disabled="loadingInProgress"
          >
            Sign In
          </Button>

          <Button
            primary
            :disabled="loadingInProgress"
            @click="register"
          >
            Register
          </Button>
        </div>
      </template>

      <template v-else>
        <FormGroup
          label="Enter confirmation code from your email"
          v-model="confirmationCode"
          :loading="loadingInProgress"
          @enter="submitConfirmationCode"
          ref="confirmationCode"
          required
        ></FormGroup>

        <div class="d-flex justify-content-between">
          <Button
            @click="toggleAuthState"
            :disabled="loadingInProgress"
          >
            Sign In
          </Button>

          <Button
            @click="resendConfirmationCode"
            :disabled="loadingInProgress"
          >
            Resend code
          </Button>

          <Button
            primary
            :disabled="loadingInProgress"
            @click="submitConfirmationCode"
          >
            Confirm
          </Button>
        </div>
      </template>
    </div>

    <div 
      class="alert text-center"
    >
      <span class="loading-message" v-if="loadingInProgress">
        Please, wait...
      </span>

      <span class="error-message">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
import FormGroup from '@/components/FormGroup.vue'
import Button from '@/components/Button.vue'

import {
  signIn,
  register,
  confirmRegistration,
  resendConfirmationCode
} from '@/util/auth.js'

export default {
  name: 'AuthLayout',
  components: {
    FormGroup,
    Button
  },
  data() {
    return {
      username: null,
      password: null,
      newUsername: null,
      newPassword: null,
      newPasswordConfirm: null,
      email: null,
      confirmationCode: null,
      loadingInProgress: false,
      isRegistration: false,
      enterConfirmationCode: false,
      errorMessage: null
    }
  },
  methods: {
    async signIn() {
      if (!(await this.validateSignInForm())) {
        return;
      }

      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await signIn(this.username, this.password);
        this.loadingInProgress = false;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;

        if (error.code == 'UserNotFoundException' || error.code == 'NotAuthorizedException') {
          this.errorMessage = 'Wrong username and/or password';
        }
      }
    },
    async register() {
      if (!(await this.validateRegistrationForm())) {
        return;
      }

      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await register(this.newUsername, this.newPassword, this.email);
        this.loadingInProgress = false;
        this.enterConfirmationCode = true;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;

        if (error.code == 'UsernameExistsException') {
          this.errorMessage = 'User already exists';
        }
      }
    },
    async submitConfirmationCode() {
      if (!(await this.validateConfirmationForm())) {
        return;
      }

      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await confirmRegistration(this.newUsername, this.confirmationCode);
        await signIn(this.newUsername, this.newPassword);
        this.loadingInProgress = false;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;

        if (error.code == 'CodeMismatchException') {
          this.errorMessage = 'Wrong confirmation code';
        }
      }
    },
    async resendConfirmationCode() {
      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await resendConfirmationCode(this.newUsername);
        this.confirmationCode = null;
        this.loadingInProgress = false;
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;

        if (error.code == 'CodeMismatchException') {
          this.errorMessage = 'Wrong confirmation code';
        }
      }
    },
    async validateSignInForm() {
      const isUsernameValid = await this.$refs.username.isValid();
      const isPasswordValid = await this.$refs.password.isValid();

      return isUsernameValid && isPasswordValid;
    },
    async validateRegistrationForm() {
      const isUsernameValid = await this.$refs.newUsername.isValid();
      const isEmailValid = await this.$refs.email.isValid();
      const isPasswordValid = await this.$refs.newPassword.isValid();
      const isPasswordConfirmationValid = await this.$refs.newPasswordConfirm.isValid();

      return isUsernameValid && isPasswordValid && isPasswordConfirmationValid && isEmailValid;
    },
    async validateConfirmationForm() {
      return await this.$refs.confirmationCode.isValid();
    },
    goHome() {
      this.$router.push({ name: 'home' });
    },
    clearAllFields() {
      this.username = null;
      this.password = null;
      this.newUsername = null;
      this.newPassword = null;
      this.newPasswordConfirm = null;
      this.email = null;
      this.confirmationCode = null;
      this.errorMessage = null;

      this.$refs.username?.resetValidation();
      this.$refs.password?.resetValidation();
      this.$refs.newUsername?.resetValidation();
      this.$refs.email?.resetValidation();
      this.$refs.newPassword?.resetValidation();
      this.$refs.newPasswordConfirm?.resetValidation();
      this.$refs.confirmationCode?.resetValidation();
    },
    toggleAuthState() {
      this.clearAllFields();
      this.isRegistration = !this.isRegistration;
      this.enterConfirmationCode = false;
    }
  }
}
</script>

<style scoped>
  .auth-form {
    max-width: 400px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }

  .loading-message {
    color: #ffe082;
  }

  .error-message {
    color: var(--error-color);
  }
</style>
