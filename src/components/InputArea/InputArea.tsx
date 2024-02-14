import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useState } from 'react';
import { useAppDispatch } from '../../utils/hooks';
import { init } from '../../features/issuesSlice';
import normalizeUrl from '../../utils/normalizeUrl';

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const [repoLink, setRepoLink] = useState('');

  const loadIssues = () => {
    const linkToSet = normalizeUrl(repoLink);

    dispatch(init(linkToSet));
  };

  return (
    <Container className="mx-auto mt-5">
      <Row>
        <Col xs={10}>
          <Form.Control
            type="text"
            placeholder="Enter repo URL"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                loadIssues();
              }
            }}
          />
        </Col>
        <Col>
          <Button
            className="w-100 h-100"
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
