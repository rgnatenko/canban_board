import { useAppSelector } from '../reduxHooks';

export const useIssues = () => useAppSelector(state => state.issues);
