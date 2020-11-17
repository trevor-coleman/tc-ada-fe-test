import React, { FunctionComponent } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import VariablePill from './VariablePill';
import { ContentText } from '../../store/nodes/types';
import HighlightText from '../HighlightText';
import { useSearchTerm } from '../../store/app/selectors';

interface TextBlockProps {
  content: ContentText
}

/**
 * Component that renders a ContentText object. Will extract inline variables
 * and render them as chips, and will highlight text based on Search terms.
 *
 * @param {TextBlockProps} props
 * @return {JSX.Element}
 * @constructor
 */
const TextBlock: FunctionComponent<TextBlockProps> = (props: TextBlockProps) => {
  const {content:{segments}} = props;
  const classes = useStyles();
  const searchTerm=useSearchTerm();

  return (
      <div className={classes.root}>
        {!segments || segments.length==0 ?
            <div className={classes.noContent}>No Content</div>:""
        }
        {segments ? segments.map((item, index)=>(
            item.element == "text"
            ? <HighlightText key={`text-${item.value?.substr(0,5)}-`} body={item.value ?? ""} stringToHighlight={searchTerm}/>
            : item.element == "variable" ?
              <VariablePill key={`text-var-${index}-${item.id}`} id={item.id} default={item.default ?? "unknown"}/> : "")) : "No segments"}
      </div>

  );
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
      noContent: {
        textAlign: "center",
        width: "100%",
        color: "#c9c9c9"
      }
    }));

export default TextBlock;
