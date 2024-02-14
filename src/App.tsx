import { Spinner } from 'react-bootstrap';
import './App.scss';
import { useAppSelector } from './utils/hooks';
import CanbanTable from './components/CanbanTable/CanbanTable';
import InputArea from './components/InputArea/InputArea';

const App: React.FC = () => {
  const {
    newIssues,
    inProgressIssues,
    closedIssues,
    loading,
  }
    = useAppSelector(state => state.issues);

  return (
    <div className="App">
      <InputArea />

      {loading ? (
        <div
          className="d-inline-flex justify-content-center w-100 mt-5"
        >
          <Spinner />
        </div>
      ) : (
        <CanbanTable
          newIssues={newIssues}
          inProgressIssues={inProgressIssues}
          closedIssues={closedIssues}
        />
      )}
    </div>
  );
};

export default App;
