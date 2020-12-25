export default function timeoutLoop(count, delay, cb) {
  for (var i = 0; i < count; i++) {
    (function (ind) {
      setTimeout(function () {
        cb(ind);
      }, delay * ind);
    })(i);
  }
}
