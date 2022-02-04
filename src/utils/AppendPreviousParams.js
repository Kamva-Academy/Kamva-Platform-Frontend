const appendPreviousParams = (url) => {
  const params = new URLSearchParams(window.location.search)
  let stringParams = '?';
  let isThereAnyParam = false;

  for (const param of params) {
    isThereAnyParam = true;
    stringParams += param[0] + '=' + param[1];
  }
  if (isThereAnyParam) {
    url += stringParams;

  }
  return url
}

export default appendPreviousParams;