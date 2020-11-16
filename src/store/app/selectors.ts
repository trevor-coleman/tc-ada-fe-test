import { useTypedSelector } from '../index';

export const useSearchString = ()=>useTypedSelector(state => state.app.search.searchString)
