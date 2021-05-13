const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.DCC_BUCKET;

const ActionMap = {
  'list': listAllProcessedObjects,
  'get_problem': getProblem
}

exports.handler = async (event) => {
  let response = null;

  try {
    const params = JSON.parse(event.body);
    const action = params.action;
    
    if (!action) {
      return createResponseBadRequest('action missing');
    }
  
    if (!ActionMap[action]) {
      return createResponseBadRequest('no such action');
    }

    const result = await ActionMap[action](params);
    response = createResponseOk(result);

  } catch (error) {
    throw new Error(error);
  }

  return response;
};

async function listAllProcessedObjects() {
  const s3Params = {
    Bucket: BUCKET_NAME,
    Prefix: 'processed/'
  };

  const s3ObjectList = await s3.listObjectsV2(s3Params).promise();
  const result = s3ObjectList.Contents;

  return result;
}

async function getProblem(params) {
  const Key = params.key;

  const s3Params = {
    Bucket: BUCKET_NAME,
    Key
  };

  const problemRaw = await s3.getObject(s3Params).promise();
  const problem = JSON.parse(problemRaw.Body.toString('utf-8'));

  return problem;
}

function getHeaders() {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  return headers;
}

function createResponseOk(data = null) {
  const response = {
    statusCode: 200,
    headers: getHeaders(),
    body: JSON.stringify({ data }),
  };

  return response;
}

// function createResponseInternalError(data = null) {
//   const response = {
//     statusCode: 500,
//     headers: getHeaders(),
//     body: JSON.stringify({ data }),
//   };

//   return response;
// }

function createResponseBadRequest(data = null) {
  const response = {
    statusCode: 400,
    headers: getHeaders(),
    body: JSON.stringify({ data }),
  };

  return response;
}
