import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ImageBlock from './ImageBlock';
import TextBlock from './TextBlock';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { DbNodeContent } from '../../store/nodes/types';

interface ContentBlockProps {
  content: DbNodeContent
}

//COMPONENT
const ContentBlock: FunctionComponent<ContentBlockProps> = (props: ContentBlockProps) => {
  const {content} = props;
  const classes = useStyles();


  let Block;
  switch (content.type) {
    case 'image':
      Block = () => <ImageBlock content={content} />;
      break;
    case 'text':
      Block = () => <TextBlock content={content} />;
      break;
    default:
      Block = () => <div>Unknown Content Type</div>;
      break;
  }

  return (
      <Paper>
        <Box className={classes.root}>
          <div className={classes.contentType}>
            <Typography variant={'h6'}>{content.type}</Typography>
          </div>
        <Box p={2} className={classes.content}>
          <Block/>
        </Box>
        </Box>
      </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {
        padding: theme.spacing(3),
        paddingTop: 0,
        backgroundColor: "#e2e2e2"
      },
      contentType: {
        display: 'flex',
        justifyContent: 'center'
      }, content: {
        backgroundColor: "#fff",
        border: "1px solid lightgrey",
      }
    }));

export default ContentBlock;
