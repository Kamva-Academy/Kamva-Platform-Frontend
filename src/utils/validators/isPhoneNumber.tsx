const isPhoneNumber = (phoneNumber: string) => {
  var regex = new RegExp('09\\d{9}$');
  if (regex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};

export default isPhoneNumber;