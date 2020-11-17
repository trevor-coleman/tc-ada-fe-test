import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import useDebounce from '../hooks/useDebounce';
import { searchNodes } from '../store/nodes/thunks';
import { resetVisibleNodes } from '../store/nodes/nodeSlice';
import { clearSearch } from '../store/app/appSlice';


/**
 * Component that displays a search bar with debounced input.
 * @return {JSX.Element}
 * @constructor
 */
const Search: FunctionComponent = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearch === "") {
      dispatch(resetVisibleNodes())
      dispatch(clearSearch())
    }
    else if (debouncedSearch) {
      console.log("Searching: ", debouncedSearch);
      //TODO: Pass this in as a prop to make the component reusable..
      dispatch(searchNodes(debouncedSearch));
    }
  },[debouncedSearch, dispatch]);

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
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey['700'],
        width: "100%",
      },
      searchField: {
        backgroundColor: "#fff",
        borderRadius: 4,
      },
    }));

export default Search;
