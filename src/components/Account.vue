<template>
  <div class="account">
    <div class="account-form d-flex flex-wrap">
      <div class="flex-1 px-2 account-form-half">
        <FormGroup
          label="Username"
          :value="user.username"
          disabled
        ></FormGroup>

        <FormGroup
          label="Email"
          :value="user.attributes? user.attributes.email : ''"
          disabled
        ></FormGroup>
      </div>

      <div class="flex-1 px-2 account-form-half">
        <template 
          v-if="!isForgotPasswordConfirm"
        >
          <div class="text-center">
            <Button
              danger
              @click="forgotPassword"
            >
              Reset password
            </Button>
          </div>

          <div 
            class="text-center loading-message mt-2" 
            v-if="loadingInProgress"
          >
            Please, wait...
          </div>

          <div 
            class="text-center mt-2" 
            v-else
          >
            You'll receive an email with the confirmation code, which will need to be entered in the next step.
          </div>
        </template>

        <template
          v-else
        >
          <FormGroup
            label="Enter confirmation code from your email"
            v-model="confirmationCode"
            required
            ref="confirmationCode"
          ></FormGroup>

          <FormGroup
            label="New password"
            v-model="newPassword"
            type="password"
            :loading="loadingInProgress"
            @enter="forgotPasswordConfirm"
            ref="newPassword"
            minlength="8"
          ></FormGroup>

          <FormGroup
            label="Confirm new password"
            v-model="newPasswordConfirm"
            type="password"
            :loading="loadingInProgress"
            @enter="forgotPasswordConfirm"
            :validate="() => newPasswordConfirm && newPasswordConfirm == newPassword"
            ref="newPasswordConfirm"
          ></FormGroup>

          <div class="d-flex justify-content-between">
            <Button
              @click="isForgotPasswordConfirm = false"
            >
              Cancel
            </Button>

            <Button
              primary
              @click="forgotPasswordConfirm"
            >
              Save new password
            </Button>
          </div>

          <div 
            class="alert text-center"
          >
            <span class="loading-message" v-if="loadingInProgress">
              Please, wait...
            </span>

            <span class="success-message">
              {{ successMessage }}
            </span>

            <span class="error-message">
              {{ errorMessage }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import FormGroup from '@/components/FormGroup.vue'
import Button from '@/components/Button.vue'

import {
  getUser,
  forgotPassword,
  forgotPasswordConfirm
} from '@/util/auth.js'

export default {
  name: 'Account',
  components: {
    FormGroup,
    Button
  },
  data() {
    return {
      user: {},
      confirmationCode: null,
      newPassword: null,
      newPasswordConfirm: null,
      loadingInProgress: false,
      isForgotPasswordConfirm: false,
      successMessage: null,
      errorMessage: null
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const user = await getUser();
      this.user = user;
    },
    async forgotPassword() {
      if (this.loadingInProgress) {
        return;
      }

      this.loadingInProgress = true;
      this.errorMessage = null;

      try {
        await forgotPassword(this.user.username);
        this.loadingInProgress = false;
        this.isForgotPasswordConfirm = true;
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
      this.successMessage = null;

      try {
        await forgotPasswordConfirm(this.user.username, this.confirmationCode, this.newPassword);
        this.loadingInProgress = false;
        this.successMessage = 'Password successfully changed!';

        this.confirmationCode = null;
        this.newPassword = null;
        this.newPasswordConfirm = null;

        setTimeout(() => {
          this.isForgotPasswordConfirm = false;
        }, 2000);
      } catch (error) {
        console.error(error);
        this.loadingInProgress = false;

        if (error.code == 'CodeMismatchException') {
          this.errorMessage = 'Wrong confirmation code';
        }
      }
    },
    async validateForgotPasswordConfirmForm() {
      const isConfirmationCodeValid = await this.$refs.confirmationCode.isValid();
      const isNewPasswordValid = await this.$refs.newPassword.isValid();
      const isNewPasswordConfirmValid = await this.$refs.newPasswordConfirm.isValid();

      return isConfirmationCodeValid && isNewPasswordValid && isNewPasswordConfirmValid;
    }
  }
}
</script>

<style scoped>
  .account-form {
    max-width: 800px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }

  .account-form-half {
    max-width: 400px;
  }
</style>
