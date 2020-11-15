import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NodeList from './NodeList/NodeList';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import { Typography, InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import DetailView from './DetailView/DetailView';

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
        {/*<Drawer className={classes.drawer} variant={"permanent"}>*/}
        {/*  <div className={classes.search}>*/}
        {/*    <TextField size={"small"} className={classes.searchField} variant={'outlined'}*/}
        {/*               placeholder={"Search"}*/}
        {/*               value={searchString}*/}
        {/*               onChange={(e)=>setSearchString(e.target.value)}*/}
        {/*               InputProps={{*/}
        {/*                 startAdornment:*/}
        {/*                     <InputAdornment position="start"><SearchIcon/></InputAdornment>,*/}
        {/*               }}/>*/}
        {/*  </div>*/}
        {/*  <div className={classes.nodeList}>*/}

        {/*  </div>*/}
        {/*</Drawer>*/}
        <Container className={classes.container}>
          <NodeList />
          {/*<DetailView/>*/}
        </Container>

      </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      search: {
        height: 64,
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: "#c9c9c9",
        width: drawerWidth,
      },
      searchField: {
        backgroundColor: "#fff",
        borderRadius: 4,
      },
      nodeList: {
        maxWidth: drawerWidth,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      },
      container: {
        marginLeft: drawerWidth,
      },
      drawer: {
        width: drawerWidth,
      }
    }));

export default Home;
