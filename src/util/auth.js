import { Auth } from 'aws-amplify'
import { EventBus } from '@/util/event-bus.js'

async function getUser() {
  let currentUser = null;

  try {
    const authUser = await Auth.currentAuthenticatedUser();

    if (authUser) {
      currentUser = authUser;
    }

  } catch (error) {
    currentUser = null;
  }

  return currentUser;
}

async function signIn(username, password) {
  const user = await Auth.signIn(username, password);

  if (user) {
    EventBus.$emit('auth', { state: 'signin' });
  }
}

async function register(username, password, email) {
  const user = await Auth.signUp({ username, password, attributes: { email } });
  return user;
}

async function confirmRegistration(username, code) {
  await Auth.confirmSignUp(username, code);
}

async function resendConfirmationCode(username) {
  await Auth.resendSignUp(username);
}

async function signOut() {
  await Auth.signOut();
  EventBus.$emit('auth', { state: 'signout' });
}

export {
  getUser,
  signIn,
  signOut,
  register,
  confirmRegistration,
  resendConfirmationCode
}
