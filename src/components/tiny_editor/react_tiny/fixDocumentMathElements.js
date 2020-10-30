import mathTextToSvg from '../additional_plugins/mathTextToSvg';

export default function fixDocumentMathElements(doc) {
  const tinyMathEls = doc.getElementsByClassName('tiny-math');
  for (let i = 0; i < tinyMathEls.length; i++) {
    tinyMathEls[i].innerHTML = mathTextToSvg(
      tinyMathEls[i].dataset.latex
    ).innerHTML;
  }
}
