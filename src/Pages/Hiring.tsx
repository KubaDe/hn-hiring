import React, { ReactText } from 'react';
import ReactList from 'react-list';
import { inject, observer } from 'mobx-react';
import {
  Row,
  Col,
  Jumbotron,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,

} from 'reactstrap';
import { match } from 'react-router-dom';
import { HiringStore } from '../stores/hiringStore';


interface Identifiable {threadId: string;}

interface IndexProps {
  hiringStore: HiringStore,
  match: match<Identifiable>
}

@inject('hiringStore')
@observer
class Hiring extends React.Component<IndexProps> {
  componentDidMount(): void {
    const {
      match: { params: { threadId } },
      hiringStore,
    } = this.props;
    hiringStore.loadThread(threadId);
  }

  renderItem = (index: number, key: ReactText) => {
    const {
      hiringStore: { jobs },
    } = this.props;
    if (!jobs) {
      return <></>;
    }
    const job = jobs[index];
    return (
      <Jumbotron key={key}>
        <h4>{job.headLine}</h4>
        <hr/>
        <small>
          {job.tags.map(tag => <span> #{tag} </span>)}
        </small>
        <hr/>
        <div dangerouslySetInnerHTML={{ __html: job.text }}/>
      </Jumbotron>
    );
  };

  renderFilters = () => {
    const {
      hiringStore: {
        jobs,
        setFilter,
        filter,
      },
    } = this.props;
    return (
      <Card style={{ width: '100%' }}>
        <CardHeader>Filter</CardHeader>
        <CardBody>
          <FormGroup>
            <Label htmlFor="search">Search</Label>
            <Input type="text"
                   id="search"
                   value={filter.search}
                   onChange={(e) => setFilter('search', e.target.value)}/>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onClick={() => !!filter.remote
                  ? setFilter('remote', '')
                  : setFilter('remote', 'remote')}
                checked={!!filter.remote}/>
              Remote
            </Label>
          </FormGroup>
        </CardBody>
      </Card>
    );
  };

  render(): React.ReactNode {
    const {
      hiringStore: {
        jobs,
      },
    } = this.props;

    if (!jobs) {
      return null;
    }
    return (
      <Row>
        <Col
          md={{ size: 4 }} sm="0" xs="0"
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
          className="d-none d-md-flex">
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
          <ReactList
            itemRenderer={this.renderItem}
            length={jobs.length}
          />
        </Col>
      </Row>
    );
  }
}

export default Hiring;
