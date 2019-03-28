import { inject, observer } from 'mobx-react';
import React, { ReactText } from 'react';
import ReactList from 'react-list';
import { match } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  Row,
} from 'reactstrap';
import { HiringStore } from '../stores/hiringStore';

interface Identifiable {
  threadId: string;
}

interface IndexProps {
  hiringStore: HiringStore;
  match: match<Identifiable>;
}

const TECHNOLOGIES = [
  'Java Script',
  'React',
  'HTML',
  'PHP',
  'Ruby',
  'Python',
  'Java',
  '.Net',
  'Scala',
  'C',
  'Mobile',
  'Test',
  'DevOps',
  'UX UI',
  'PM',
  'Game',
];

const SENIORITY = ['Junior', 'Mid', 'Regular', 'Senior', 'Architect', 'Lead'];

@inject('hiringStore')
@observer
class Hiring extends React.Component<IndexProps> {
  public componentDidMount(): void {
    const {
      match: {
        params: { threadId },
      },
      hiringStore,
    } = this.props;
    hiringStore.loadThread(threadId);
  }

  public render(): React.ReactNode {
    const {
      hiringStore: { jobs },
    } = this.props;

    if (!jobs) {
      return null;
    }
    return (
      <Row>
        <Col
          md={{ size: 4 }}
          sm="0"
          xs="0"
          style={{
            position: 'fixed',
            left: '0',
            top: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 40px 0 20px',
            height: '100%',
          }}
          className="d-none d-md-flex"
        >
          {this.renderFilters()}
        </Col>
        <Col
          xs={{ size: 12 }}
          className="d-md-none"
          style={{
            marginBottom: '30px',
          }}
        >
          {this.renderFilters()}
        </Col>
        <Col md={{ offset: 4, size: 8 }}>
          <ReactList itemRenderer={this.renderItem} length={jobs.length} />
        </Col>
      </Row>
    );
  }

  private renderItem = (index: number, key: ReactText) => {
    const {
      hiringStore: { jobs },
    } = this.props;
    if (!jobs) {
      return <></>;
    }
    const job = jobs[index];
    return (
      <Jumbotron key={key} className="overflow-hidden">
        <h4>{job.headLine}</h4>
        <hr />
        <small>
          {job.tags.map((tag, i) => (
            <span key={`${tag}_${i}`}> #{tag} </span>
          ))}
        </small>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: job.text }} />
      </Jumbotron>
    );
  };

  private renderFilters = () => {
    const {
      hiringStore: { setFilter, resetFilter, filter },
    } = this.props;
    return (
      <Card style={{ width: '100%' }}>
        <CardHeader>Filter</CardHeader>
        <CardBody>
          <FormGroup>
            <Label htmlFor="search">Search</Label>
            <Input
              type="text"
              id="search"
              value={filter.search}
              onChange={e => setFilter('search', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="technologies">Technologies</Label>
            <Input
              type="select"
              name="technologies"
              id="technologies"
              value={filter.technologies}
              onChange={e => setFilter('technologies', e.target.value)}
            >
              <option value="null" />
              {TECHNOLOGIES.map(technology => (
                <option value={technology} key={technology}>
                  {technology}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="seniority">Seniority</Label>
            <Input
              type="select"
              name="seniority"
              id="seniority"
              value={filter.seniority}
              onChange={e => setFilter('seniority', e.target.value)}
            >
              <option value="null" />
              {SENIORITY.map(seniority => (
                <option value={seniority} key={seniority}>
                  {seniority}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup check={true}>
            <Label check={true}>
              <Input
                type="checkbox"
                onClick={() =>
                  !!filter.remote ? setFilter('remote', '') : setFilter('remote', 'remote')
                }
                onChange={() => null}
                checked={!!filter.remote}
              />
              Remote
            </Label>
          </FormGroup>

          <Button onClick={resetFilter} block={true} className="mt-4">
            Reset
          </Button>
        </CardBody>
      </Card>
    );
  };
}

export default Hiring;
