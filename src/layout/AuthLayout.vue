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
      v-if="currentAuthState == AuthState.SIGN_IN"
    >
      <FormGroup
        label="Username"
        v-model="username"
        :loading="loadingInProgress"
        @enter="signIn"
        ref="username"
        required
        autocomplete="username"
      ></FormGroup>

      <FormGroup
        label="Password"
        v-model="password"
        type="password"
        :loading="loadingInProgress"
        @enter="signIn"
        required
        ref="password"
        autocomplete="current-password"
      ></FormGroup>

      <div class="d-flex justify-content-between">
        <Button
          @click="setAuthState(AuthState.REGISTER)"
          :disabled="loadingInProgress"
        >
          Register
        </Button>

        <Button
          @click="setAuthState(AuthState.FORGOT_PASSWORD)"
          :disabled="loadingInProgress"
        >
          Forgot password?
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
      v-if="currentAuthState == AuthState.REGISTER"
    >
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
        autocomplete="new-password"
      ></FormGroup>

      <FormGroup
        label="Confirm password"
        v-model="newPasswordConfirm"
        type="password"
        :loading="loadingInProgress"
        @enter="register"
        :validate="() => newPasswordConfirm && newPasswordConfirm == newPassword"
        ref="newPasswordConfirm"
        autocomplete="new-password"
      ></FormGroup>

      <div class="d-flex justify-content-between">
        <Button
          @click="setAuthState(AuthState.SIGN_IN)"
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
    </div>

    <div
      class="auth-form"
      v-if="currentAuthState == AuthState.REGISTER_CONFIRM"
    >
      <FormGroup
        label="Username"
        v-model="newUsername"
        :loading="loadingInProgress"
        disabled
      ></FormGroup>

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
          @click="setAuthState(AuthState.SIGN_IN)"
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
    </div>
    
    <div 
      class="auth-form"
      v-if="currentAuthState == AuthState.FORGOT_PASSWORD"
    >
      <FormGroup
        label="Username"
        v-model="fpUsername"
        :loading="loadingInProgress"
        @enter="forgotPassword"
        ref="fpUsername"
        required
      ></FormGroup>

      <div class="d-flex justify-content-between">
        <Button
          @click="setAuthState(AuthState.SIGN_IN)"
          :disabled="loadingInProgress"
        >
          Sign In
        </Button>

        <Button
          primary
          :disabled="loadingInProgress"
          @click="forgotPassword"
        >
          Submit
        </Button>
      </div>
    </div>

    <div 
      class="auth-form"
      v-if="currentAuthState == AuthState.FORGOT_PASSWORD_CONFIRM"
    >
      <FormGroup
        label="Username"
        v-model="fpUsername"
        :loading="loadingInProgress"
        disabled
      ></FormGroup>

      <FormGroup
        label="Enter confirmation code from your email"
        v-model="fpConfirmationCode"
        :loading="loadingInProgress"
        @enter="forgotPasswordConfirm"
        ref="fpConfirmationCode"
        required
      ></FormGroup>

      <FormGroup
        label="New password"
        v-model="fpNewPassword"
        type="password"
        :loading="loadingInProgress"
        @enter="forgotPasswordConfirm"
        ref="fpNewPassword"
        minlength="8"
        autocomplete="new-password"
      ></FormGroup>

      <FormGroup
        label="Confirm new password"
        v-model="fpNewPasswordConfirm"
        type="password"
        :loading="loadingInProgress"
        @enter="forgotPasswordConfirm"
        :validate="() => fpNewPasswordConfirm && fpNewPasswordConfirm == fpNewPassword"
        ref="fpNewPasswordConfirm"
        autocomplete="new-password"
      ></FormGroup>

      <div class="d-flex justify-content-between">
        <Button
          @click="setAuthState(AuthState.SIGN_IN)"
          :disabled="loadingInProgress"
        >
          Sign In
        </Button>

        <Button
          primary
          :disabled="loadingInProgress"
          @click="forgotPasswordConfirm"
        >
          Confirm
        </Button>
      </div>
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
  resendConfirmationCode,
  forgotPassword,
  forgotPasswordConfirm
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
      fpUsername: null,
      fpConfirmationCode: null,
      fpNewPassword: null,
      fpNewPasswordConfirm: null,
      loadingInProgress: false,
      errorMessage: null,
      AuthState: {
        SIGN_IN: 'sign_in',
        REGISTER: 'register',
        REGISTER_CONFIRM: 'register_confirm',
        FORGOT_PASSWORD: 'forgot_password',
        FORGOT_PASSWORD_CONFIRM: 'forgot_password_confirm'
      },
      currentAuthState: null
    }
  },
  mounted() {
    this.currentAuthState = this.AuthState.SIGN_IN;
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

        if (error.code == 'PasswordResetRequiredException') {
          this.errorMessage = 'Your password has been reset, so you need a new one. Click "Forgot password"';
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
        this.setAuthState(this.AuthState.REGISTER_CONFIRM, true);
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
    async forgotPassword() {
      if (!(await this.validateForgotPasswordForm())) {
        return;
      }

      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await forgotPassword(this.fpUsername);
        this.loadingInProgress = false;
        this.setAuthState(this.AuthState.FORGOT_PASSWORD_CONFIRM, true);
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;

        if (error.code == 'LimitExceededException') {
          this.errorMessage = 'You like changing passwords, don\'t ya? Please, try again later';
        }
      }
    },
    async forgotPasswordConfirm() {
      if (!(await this.validateForgotPasswordConfirmForm())) {
        return;
      }

      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await forgotPasswordConfirm(this.fpUsername, this.fpConfirmationCode, this.fpNewPassword);
        await signIn(this.fpUsername, this.fpNewPassword);
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
    async validateForgotPasswordForm() {
      return await this.$refs.fpUsername.isValid();
    },
    async validateForgotPasswordConfirmForm() {
      const isConfirmationCodeValid = await this.$refs.fpConfirmationCode.isValid();
      const isNewPasswordValid = await this.$refs.fpNewPassword.isValid();
      const isNewPasswordConfirmValid = await this.$refs.fpNewPasswordConfirm.isValid();

      return isConfirmationCodeValid && isNewPasswordValid && isNewPasswordConfirmValid;
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
      this.fpUsername = null;
      this.fpConfirmationCode = null;
      this.fpNewPassword = null;
      this.fpNewPasswordConfirm = null;

      this.$refs.username?.resetValidation();
      this.$refs.password?.resetValidation();
      this.$refs.newUsername?.resetValidation();
      this.$refs.email?.resetValidation();
      this.$refs.newPassword?.resetValidation();
      this.$refs.newPasswordConfirm?.resetValidation();
      this.$refs.confirmationCode?.resetValidation();
    },
    setAuthState(state = this.AuthState.SIGN_IN, skipClearFields = false) {
      if (!skipClearFields) {
        this.clearAllFields();
      }

      this.currentAuthState = state;
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
</style>
