/* eslint-disable max-len */
import { Spinner, Container } from 'react-bootstrap';
import './App.scss';
import { useAppSelector } from './utils/hooks/hooks';
import InputArea from './components/InputArea/InputArea';
import CanbanTable from './components/CanbanTable/CanbanTable';

const App: React.FC = () => {
  const { newIssues, loading } = useAppSelector(state => state.issues);
  const issuesAreLoaded = newIssues.length > 0 && !loading;

  return (
    <div className="App">
      <InputArea />

      {loading && (
        <Container
          className="d-inline-flex justify-content-center w-100 mt-5"
        >
          <Spinner />
        </Container>
      )}

      {issuesAreLoaded && (
        <CanbanTable />
      )}
    </div>
  );
};

export default App;
