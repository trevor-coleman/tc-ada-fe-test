import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ContentText } from '../../store/nodes';

interface TextBlockProps {
  content: ContentText
}

//COMPONENT
const TextBlock: FunctionComponent<TextBlockProps> = (props: TextBlockProps) => {
  const {content:{body}} = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
      <div className={classes.root}>
        {body} </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default TextBlock;
