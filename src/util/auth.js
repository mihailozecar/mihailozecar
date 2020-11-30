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

async function signOut() {
  await Auth.signOut();
  EventBus.$emit('auth', { state: 'signout' });
}

export {
  getUser,
  signIn,
  signOut
}
