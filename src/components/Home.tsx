import React, { FunctionComponent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DetailView from './DetailView/DetailView';
import AppDrawer from './AppDrawer';

const drawerWidth = 300;

/**
 * Component that displays the home screen.
 * @return {JSX.Element}
 * @constructor
 */
const Home: FunctionComponent = () => {

  const classes = useStyles();

  return (
      <div>
        <AppDrawer width={drawerWidth}/>
        <Container className={classes.container}>
          <DetailView/>
        </Container>
      </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      container: {
        paddingTop: theme.spacing(2),
        paddingLeft: drawerWidth,
        minHeight: "100vh"
      },
    }));

export default Home;
