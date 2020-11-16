import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useSearchString } from '../store/app/selectors';
import { setSearchString } from '../store/app';

interface SearchProps {
}

//COMPONENT
const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchString = useSearchString();

  const handleChange = (s:string)=>{
    dispatch(setSearchString(s))
  }

  return (
      <div className={classes.search}>
        <TextField size={"small"}
                   className={classes.searchField}
                   variant={'outlined'}
                   placeholder={"Search"}
                   value={searchString}
                   onChange={(e) => handleChange(e.target.value)}
                   InputProps={{
                     startAdornment:
                         <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                   }} />
      </div>
      );
};

const useStyles = makeStyles((theme: Theme) => (
    {
      search: {
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#c9c9c9",
        width: "100%",
      },
      searchField: {
        backgroundColor: "#fff",
        borderRadius: 4,
      },
    }));

export default Search;
