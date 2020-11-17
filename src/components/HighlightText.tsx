import React, { FunctionComponent } from 'react';
import { makeStyles} from '@material-ui/core/styles';



/**
 * @property {string} body
 */
interface SearchHighlightTextProps {
  body: string,
  stringToHighlight: string,
}

/**
 * Component that highlights a searchTerm in a string. Substrings are wrapped in <span> tags.
 * @param {SearchHighlightTextProps} props
 * @return {JSX.Element}
 * @constructor
 */
const HighlightText: FunctionComponent<SearchHighlightTextProps> = (props: SearchHighlightTextProps) => {

  //TODO: Take highlight style as prop to increase reusability.
  //TODO: Take wrapper component for highlight / regular as props.

  const {body, stringToHighlight} = props;
  const classes = useStyles(props);



  const regEx = new RegExp(`(${preg_quote(stringToHighlight)})`, "gi");

  let parts:string[];
  if (stringToHighlight !== "" && body.match(regEx)) {
    parts = body.split(regEx);
  } else {
    parts = [body]
  }



  return (
      <span>{parts.map((part, index)=> <span key={`${index}-${part.substring(0,4)}`} className={part.toUpperCase() === stringToHighlight.toUpperCase()
                                               ? classes.highlight
                                               : classes.regular}>{part}</span>)}</span>);
};

function preg_quote(str: string, delimiter?: string) {
  // Quote regular expression characters plus an optional character
  //
  // version: 1107.2516
  // discuss at: http://phpjs.org/functions/preg_quote
  // +   original by: booeyOH
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: preg_quote("$40");
  // *     returns 1: '\$40'
  // *     example 2: preg_quote("*RRRING* Hello?");
  // *     returns 2: '\*RRRING\* Hello\?'
  // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
  // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
  return (
      str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (
      delimiter ?? '') + '-]', 'g'), '\\$&');
}

const useStyles = makeStyles(() => (
    {
      highlight: {
        backgroundColor: "#ff0",
        fontWeight: "bold",
      },
      regular: {}
    }));

export default HighlightText;
