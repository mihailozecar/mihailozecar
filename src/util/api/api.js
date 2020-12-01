import { getUser } from '@/util/auth.js'

const ApiList = {
  DCC_API: process.env.VUE_APP_DCC_API
}

async function getAuthToken() {
  const currentUser = await getUser();
  const token = currentUser.signInUserSession.idToken.jwtToken;

  return token;
}

async function $post(params = {}, config = {}) {
  if (!ApiList[config.API]) {
    throw { error: 'API missing' };
  }

  let url = ApiList[config.API];

  if (config.path) {
    url += config.path;
  }

  const authToken = await getAuthToken();

  const result = await fetch(url, {
    method: 'POST',
    headers: {
      ContentType: 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(params)
  });

  return result;
}

export default {
  $post
}
