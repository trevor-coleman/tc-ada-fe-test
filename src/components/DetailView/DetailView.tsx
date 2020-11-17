import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelectedNode } from '../../store/nodes/selectors';
import ContentBlock from '../ContentBlock';
import Grid from '@material-ui/core/Grid';
import LoadingScreen from './LoadingScreen';

interface DetailViewProps {
}

/**
 * Component that renders the selected node as a vertical column of ContentBlocks.
 * @param {DetailViewProps} props
 * @return {JSX.Element}
 * @constructor
 */
const DetailView: FunctionComponent<DetailViewProps> = (props: DetailViewProps) => {
  const {} = props;
  const classes = useStyles();

  const {content} = useSelectedNode();

  return (
      <div className={classes.root}>
        <Grid container direction={'column'} spacing={2} alignContent={'center'}>
          {content
           ? content.map((item, index) => {
                return (
                    <Grid item xs={8} key={"content-" + item.type + index} className={classes.contentBlock}>
                      <ContentBlock content={item} />
                    </Grid>);
              })
           : <LoadingScreen/>}
        </Grid>
      </div>);
};

const useStyles = makeStyles(() => (
    {
      root: {
      },
      contentBlock: {
      }
    }));

export default DetailView;
