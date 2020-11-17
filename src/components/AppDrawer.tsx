import React, { FunctionComponent } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Search from './Search';
import NodeList from './NodeList/NodeList';
import Drawer from '@material-ui/core/Drawer';

interface DrawerProps {
  width?: number
}


const defaultWidth = 300;

//COMPONENT
const AppDrawer: FunctionComponent<DrawerProps> = (props: DrawerProps) => {
  const classes = useStyles(props);
  return (
      <Drawer variant={"permanent"}>
        <div className={classes.search}>
          <Search />
        </div>
        <div className={classes.nodeList}>
          <NodeList />
        </div>
      </Drawer>);
};

const useStyles = makeStyles(() => (
    {
      root: {},
      search: {
        width: ({width}:DrawerProps)=>width ?? defaultWidth,
        height: 64,
      },
      nodeList: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: ({width}: DrawerProps) => width ?? defaultWidth,
      },
    }));

export default AppDrawer;
