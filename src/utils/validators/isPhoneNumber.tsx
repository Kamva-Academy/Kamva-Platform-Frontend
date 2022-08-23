const isPhoneNumber = (phoneNumber: string) => {
  var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
  if (regex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};

export default isPhoneNumber;