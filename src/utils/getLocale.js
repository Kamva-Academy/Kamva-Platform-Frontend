export default () => {
  try {
    const Intl = JSON.parse(localStorage.getItem('reduxState')).Intl;
    return Intl ? Intl.locale : 'fa';
  } catch {
    return 'fa';
  }
};
