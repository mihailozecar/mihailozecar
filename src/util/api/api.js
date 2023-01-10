import { API } from 'aws-amplify'

const ApiList = {
  DCC_API: process.env.VUE_APP_DCC_API
}

async function $post(params = {}, config = {}) {
  if (!ApiList[config.API]) {
    throw { error: 'API missing' };
  }

  let path = '';

  if (config.path) {
    path = config.path;
  }

  const result = await API.post(ApiList[config.API], path, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: params
  });

  return result;
}

export {
  $post
}
