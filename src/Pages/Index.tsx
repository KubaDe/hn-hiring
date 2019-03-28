import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { ThreadsListStore } from '../stores/threadsListStore';

interface IndexProps {
  threadsListStore: ThreadsListStore;
}

@inject('threadsListStore')
@observer
class Index extends React.Component<IndexProps> {
  public componentDidMount() {
    const { threadsListStore } = this.props;
    threadsListStore.initLoadList();
  }

  public render(): React.ReactNode {
    const {
      threadsListStore: { threads, isLoading },
    } = this.props;
    return (
      <Row>
        <Col xs={{ offset: 3, size: 6 }}>
          <ListGroup>
            {threads.map(thread => (
              <ListGroupItem key={thread.title}>
                <Link to={`hiring/${thread.objectID}`}>{thread.title}</Link>
              </ListGroupItem>
            ))}
          </ListGroup>
          <Col xs={{ offset: 3, size: 6 }} className="text-center mt-3">
            {isLoading && <Spinner style={{ width: '3rem', height: '3rem' }} />}
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Index;
