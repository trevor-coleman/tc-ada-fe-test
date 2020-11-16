import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Chip  from '@material-ui/core/Chip';
import { Avatar } from '@material-ui/core';
import {
  useVariable, useFetchVariablesRequest,
} from '../../store/variables/selectors';
import { fetchVariables } from '../../store/variables/thunks';
import { ApiRequestStatus } from '../../store/types';
import useTheme from '@material-ui/core/styles/useTheme';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface VariablePillProps {
  id:string,
  default:string,
}

//COMPONENT
const VariablePill: FunctionComponent<VariablePillProps> = (props: VariablePillProps) => {
  const {id, default:defaultName} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const variable = useVariable(id);
  const request = useFetchVariablesRequest();

  useEffect(()=>{
    if (!variable && request.status == ApiRequestStatus.Idle) {
      dispatch(fetchVariables())
    }},[id]
  )



  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
      <span className={classes.root}>
        <Chip
            size={"small"}
            clickable={true}
            avatar={<Avatar className={classes.chipAvatar}>Aa</Avatar>}
            label={variable?.name ?? defaultName}
            className={classes.chip}
            //TODO: Handle this click
            onDelete={handleDelete}
            deleteIcon={<ArrowDropDownIcon/>}
        />
         </span>);
};

const useStyles = makeStyles((theme: Theme) => (
    {
      root: {},
      chip: {
        backgroundColor:theme.palette.success.light,
        "&:hover": {
          backgroundColor: theme.palette.success.main,
        },
        "&:focus": {
          backgroundColor: theme.palette.success.main,
        }
      },
      chipAvatar: {
        backgroundColor: theme.palette.success.light,
        fontWeight: 900,
        color: "#000",
      },
      variableIcon: {
        display:"inline",
        height:"1rem",
        width:"1rem",
        backgroundColor: theme.palette.success.light,
        fontWeight: 900,
        color: "#000",
      },
      variable: {
        display: "inline-block",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        height:"1.5rem",
        borderRadius: "1rem",
        paddingLeft:"0.5rem",
        paddingRight:"0.5rem",
        backgroundColor: theme.palette.success.light,

      }
    }));

export default VariablePill;
