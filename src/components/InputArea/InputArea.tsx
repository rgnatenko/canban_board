/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
// #region Imports
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../utils/hooks/hooks';
import { addRepoLink, init, updateIssues } from '../../features/issuesSlice';
import normalizeUrl from '../../utils/helpers/normalizeUrl';
import parseDataFromStorage from '../../utils/helpers/parseDataFromStorage';
import Issues from '../../types/Issues';
// #endregion

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();

  const [repoLink, setRepoLink] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const repoLinkInStorage = localStorage.getItem('repoLink');

    if (repoLinkInStorage) {
      setRepoLink(repoLinkInStorage);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const loadIssues = () => {
    setIsWriting(false);

    try {
      const { fullLink } = normalizeUrl(repoLink);

      if (!fullLink) {
        return;
      }

      localStorage.setItem('repoLink', repoLink);

      dispatch(addRepoLink(repoLink));

      const issuesFromStorage
        = parseDataFromStorage<Issues, boolean>(repoLink, false);

      if (issuesFromStorage) {
        dispatch(updateIssues({
          issues: issuesFromStorage.newIssues,
          columnName: 'newIssues',
        }));

        dispatch(updateIssues({
          issues: issuesFromStorage.inProgressIssues,
          columnName: 'inProgressIssues',
        }));

        dispatch(updateIssues({
          issues: issuesFromStorage.closedIssues,
          columnName: 'closedIssues',
        }));

        return;
      }

      dispatch(init(fullLink));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isWriting) {
      loadIssues();
    }
  }, [repoLink]);

  return (
    <Container className="mx-auto mt-5">
      <Row>
        <Col xs={10}>
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Enter repo URL"
            className="border border-dark rounded-0"
            value={repoLink}
            onChange={(e) => {
              setRepoLink(e.target.value.trim());
              setIsWriting(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                loadIssues();
              }
            }}
          />
        </Col>
        <Col>
          <Button
            className="w-100 h-100 border
            border-dark rounded-0 btn btn-light"
            onClick={loadIssues}
          >
            Load
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default InputArea;
