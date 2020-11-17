import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NodeList from './NodeList/NodeList';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import DetailView from './DetailView/DetailView';
import Search from './Search';

interface HomeProps {
}

const drawerWidth = 300;

/**
 * Component that displays the home screen.
 * @param {HomeProps} props
 * @return {JSX.Element}
 * @constructor
 */
const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm]= useState("");

  //TODO: Loading Screen
  //TODO: Loading failed screen
  //TODO: Make responsive (hide drawer -- add AppBar with hamburger menu icon)

  return (
      <div>
        <Drawer variant={"permanent"}>
          <div className={classes.search}>
          <Search/>
          </div>
          <div className={classes.nodeList}>
            <NodeList />
          </div>
        </Drawer>
        <Container className={classes.container}>
          <DetailView/>
        </Container>
      </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      search:{
        width: drawerWidth,
        height: 64,
      },
      nodeList: {
        maxWidth: drawerWidth,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: drawerWidth,
      },
      container: {
        paddingTop: theme.spacing(2),
        paddingLeft: drawerWidth,
        minHeight: "100vh"
      },
    }));

export default Home;
