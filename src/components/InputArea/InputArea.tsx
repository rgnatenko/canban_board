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
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import {
  addRepoLink,
  init,
  setErrorMessage,
  setLoading,
  updateIssues,
} from '../../features/issuesSlice';
import normalizeUrl from '../../utils/helpers/normalizeUrl';
import parseDataFromStorage from '../../utils/helpers/parseDataFromStorage';
import Issues from '../../types/Issues';
import validateGitHubAPI from '../../utils/helpers/validateGithubApiUrl';
// #endregion

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.issues);

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

    if (repoLink) {
      const { fullLink } = normalizeUrl(repoLink);

      dispatch(setLoading(true));

      validateGitHubAPI(fullLink)
        .then(result => {
          localStorage.setItem('repoLink', repoLink);

          if (result) {
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

              dispatch(setLoading(false));
              dispatch(setErrorMessage(''));

              return;
            }

            dispatch(init(fullLink));
          } else {
            const example = 'https://github.com/organization/repository';
            const errorMessage = `Invalid link,
            please try again, here's example, how your link should look: ${example}`;

            dispatch(setLoading(false));
            dispatch(setErrorMessage(errorMessage));
          }
        });
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
            className={classNames('border rounded-0 mb-3', {
              'border-danger': error,
              'border-dark': !error,
            })}
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

      {error && (
        <p className="text-danger">
          {error}
        </p>
      )}
    </Container>
  );
};

export default InputArea;
