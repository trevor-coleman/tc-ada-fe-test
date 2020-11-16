import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useSearchString } from '../store/app/selectors';
import { setSearchString } from '../store/app';
import useDebounce from '../hooks/useDebounce';

interface SearchProps {
}

//COMPONENT
const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
  const {} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearch) {
      console.log(debouncedSearch);
      dispatch(setSearchString(debouncedSearch));
    }
  },[debouncedSearch]);

  const handleChange = (s: string) => {
    setInputValue(s);
  };

  return (
      <div className={classes.search}>
        <TextField size={"small"}
                   className={classes.searchField}
                   variant={'outlined'}
                   placeholder={"Search"}
                   value={inputValue}
                   onChange={(e) => handleChange(e.target.value)}
                   InputProps={{
                     startAdornment:
                         <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                   }} />
      </div>);
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
