import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelectedNode } from '../../store/nodes/selectors';
import { CircularProgress } from '@material-ui/core';

interface DetailViewProps {
}

//COMPONENT
const DetailView: FunctionComponent<DetailViewProps> = (props: DetailViewProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const {title, content, connections, id, requestStatus} = useSelectedNode();
  console.log(id);

  return (
      <div className={classes.root}>
        {title}
        {content ? content.map((item, index)=>{
          switch (item.type){
            case "text":
              return <div>{item.body}</div>;
            case "image":
              return <img src={item.url} />
          }
        } ) : <CircularProgress/>} </div>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
    }));

export default DetailView;
