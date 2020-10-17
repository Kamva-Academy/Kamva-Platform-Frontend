import to_svg from '../additional_plugins/textToSvg';

const fixMath = (doc) => {
  const tinyMathEls = doc.getElementsByClassName('tiny-math');
  for (let i = 0; i < tinyMathEls.length; i++) {
    tinyMathEls[i].innerHTML = to_svg(tinyMathEls[i].dataset.latex).innerHTML;
  }
};

export default fixMath;
