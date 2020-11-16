import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NodeList from './NodeList/NodeList';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import DetailView from './DetailView/DetailView';
import Search from './Search';

interface HomeProps {
}

const drawerWidth = 300;

//COMPONENT
const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchString, setSearchString]= useState("");
  return (
      <div>
        <Drawer className={classes.drawer} variant={"permanent"}>
          <Search/>
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
      nodeList: {
        maxWidth: drawerWidth,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      },
      container: {
        paddingTop: theme.spacing(2),
        paddingLeft: drawerWidth,
        backgroundColor: "#d9d9d9",
        minHeight: "100vh"
      },
      drawer: {
        width: drawerWidth,
      }
    }));

export default Home;
