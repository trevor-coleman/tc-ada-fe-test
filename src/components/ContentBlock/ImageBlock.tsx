import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ContentImage } from '../../store/nodes/types';


interface ImageBlockProps {
  content: ContentImage
}

//COMPONENT
const ImageBlock: FunctionComponent<ImageBlockProps> = (props: ImageBlockProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
      <div className={classes.root}>
        ImageBlock </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default ImageBlock;
