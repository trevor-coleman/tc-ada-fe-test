import { useTypedSelector } from '../index';

export const useVariable = (id: string) => useTypedSelector(state => state.variables.variables[id])
export const useFetchVariablesRequest = ()=>useTypedSelector(state => state.variables.fetchVariablesRequest)
