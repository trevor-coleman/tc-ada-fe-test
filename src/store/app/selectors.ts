import { useTypedSelector } from '../index';

/**
 * Returns the current searchString
 * @return {string}
 */
export const useSearchTerm = ()=>useTypedSelector(state => state.app.search.searchString)
