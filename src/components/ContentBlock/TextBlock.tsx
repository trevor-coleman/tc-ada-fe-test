import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ContentText } from '../../store/nodes';
import VariablePill from './VariablePill';

interface TextBlockProps {
  content: ContentText
}

//COMPONENT
const TextBlock: FunctionComponent<TextBlockProps> = (props: TextBlockProps) => {
  const {content:{segments}} = props;
  const classes = useStyles();
  return (
      <div className={classes.root}>
        {segments ? segments.map((item, index)=>(
            item.element == "text"
            ? <span key={`text-${item.value?.substr(0,5)}-`}>{item.value}</span>
            : item.element == "variable" ?
              <VariablePill key={`text-var-${index}-${item.id}`} id={item.id} default={item.default ?? "unknown"}/> : "")) : "No segments"}
      </div>

  );
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default TextBlock;
