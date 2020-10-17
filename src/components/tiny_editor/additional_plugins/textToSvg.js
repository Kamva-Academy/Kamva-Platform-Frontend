/* global MathJax */
const to_svg = (latex) => {
  let res = MathJax.tex2svg(latex, {
    em: 16,
    ex: 8,
    containerWidth: 579,
    display: true,
    scale: 1,
    lineWidth: 1000000,
  });
  res.innerHTML += '&nbsp;';
  return res;
};

export default to_svg;
