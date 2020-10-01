export default () => {
  const Intl = JSON.parse(localStorage.getItem('reduxState')).Intl;
  return Intl ? Intl.locale : 'fa';
};
