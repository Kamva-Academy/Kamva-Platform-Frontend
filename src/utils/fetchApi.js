const checkErrorsStatusCode = (response) => {
  if (response.status >= 500) {
    throw new Error('SERVER_ERROR');
  }
  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (response.status === 401) {
    throw new Error('TOKEN_EXPIRED');
  }
};

const fetchApi = async (url, fetchOptions) => {
  const response = await fetch(url, fetchOptions);
  checkErrorsStatusCode(response);
  const json_response = await response.json();
  if (!response.ok) {
    if (json_response.error) {
      throw new Error(json_response.error);
    } else if (json_response.non_field_errors) {
      throw new Error(json_response.non_field_errors[0]);
    } else if (json_response.another_field) {
      throw new Error(json_response.another_field[0]);
    } else if (json_response.detail) {
      throw new Error(json_response.detail);
    } else if (Object.keys(json_response).length > 0) {
      const firstKey = Object.keys(json_response)[0];
      throw new Error(firstKey + ': ' + json_response[firstKey]);
    } else {
      throw new Error(response.text);
    }
  }
  return json_response;
};

export default fetchApi;
