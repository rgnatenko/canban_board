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
import {
  useAppDispatch,
} from '../../redux/reduxHooks/reduxHooks';
import { useIssues } from '../../redux/selectors';
import { addRepoLink, init } from '../../redux/features/issuesSlice';
import normalizeUrl from '../../helpers/normalizeUrl';
// #endregion

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useIssues();

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

  const load = () => {
    setIsWriting(false);

    if (repoLink) {
      const { fullLink } = normalizeUrl(repoLink);

      dispatch(addRepoLink(repoLink));
      dispatch(init(fullLink));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoLink(e.target.value.trim());
    setIsWriting(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      load();
    }
  };

  useEffect(() => {
    if (!isWriting) {
      load();
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
            className={classNames('border rounded-0', {
              'border-danger': error,
              'border-dark': !error,
            })}
            value={repoLink}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
          />
        </Col>
        <Col>
          <Button
            className="w-100 h-100 border
            border-dark rounded-0 btn btn-light"
            onClick={load}
          >
            Load
          </Button>
        </Col>
      </Row>

      {error && (
        <p className="text-danger  mt-3">
          {error}
        </p>
      )}
    </Container>
  );
};

export default InputArea;
