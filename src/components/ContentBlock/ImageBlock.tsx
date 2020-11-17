import React, { FunctionComponent } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { ContentImage } from '../../store/nodes/types';

/**
 * @property {ContentImage} content
 */
interface ImageBlockProps {
  content: ContentImage
}

/**
 * Component that renders a ContentImage object
 * @param {ImageBlockProps} props
 * @return {JSX.Element}
 * @constructor
 */
const ImageBlock: FunctionComponent<ImageBlockProps> = (props: ImageBlockProps) => {
  const {content:{url, type}} = props;
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <img className={classes.image} src={url} alt={type}/>
      </div>);
};

const useStyles = makeStyles(() => (
    {
      root: {},
      image: {width: "100%"}
    }));

export default ImageBlock;
