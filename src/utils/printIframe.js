export default function print({ frame, config = {} }) {
  frame.removeHeaderAndFooter();
  frame.print(config);
}
