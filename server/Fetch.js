const fetchGet = async (payloadData: any) => {
  const response = await fetch(payloadData.url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  });
  return response.arrayBuffer();
};
const fetchPatch = async (payloadData: any) => {
  const response = await fetch(payloadData.url, {
    method: 'PATCH',
    body: payloadData.body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  });
  return response.json();
};
const fetchPost = async (payloadData: any) => {
  const response = await fetch(payloadData.url, {
    method: 'POST',
    body: payloadData.body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  });
  return response.json();
};
const fetchJSON = async (payloadData: any) => {
  const response = await fetch(payloadData.url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payloadData.accessToken}`,
    },
  });
  return response.json();
};

const fetchCall = async (payloadData: any) => {
  switch (payloadData.method) {
    case 'get':
      return fetchGet(payloadData);
    case 'patch':
      return fetchPatch(payloadData);
    case 'getJson':
      return fetchJSON(payloadData);
    case 'post':
      return fetchPost(payloadData);
    default:
      return null;
  }
};

export default fetchCall;
