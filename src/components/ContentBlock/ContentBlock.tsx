import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DbNodeContent } from '../../store/nodes';
import ImageBlock from './ImageBlock';
import TextBlock from './TextBlock';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

interface ContentBlockProps {
  content: DbNodeContent
}

//COMPONENT
const ContentBlock: FunctionComponent<ContentBlockProps> = (props: ContentBlockProps) => {
  const {content} = props;
  const classes = useStyles();
  const dispatch = useDispatch();

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
      <Paper className={classes.root}>
        <Box p={2}>
          <div className={classes.contentType}>
            <Typography variant={'h6'}>{content.type}</Typography>
          </div>
        <div>
          <Block/>
        </div>
        </Box>
      </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
      contentType: {
        display: 'flex',
        justifyContent: 'center'
      }
    }));

export default ContentBlock;
