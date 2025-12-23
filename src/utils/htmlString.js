import parse from 'html-react-parser';

export default function parseHtml(htmlString) {
  return parse(htmlString);
}
