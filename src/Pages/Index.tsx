import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import { ThreadsListStore } from '../stores/threadsListStore';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';

interface IndexProps {
  threadsListStore: ThreadsListStore;
}

@inject('threadsListStore')
@observer
class Index extends React.Component<IndexProps> {
  componentDidMount() {
    const {
      threadsListStore,
    } = this.props;
    threadsListStore.initLoadList();
  }

  render(): React.ReactNode {
    const {
      threadsListStore: {
        threads,
      },
    } = this.props;
    return (
      <Row>
        <Col xs={{ offset: 3, size: 6 }}>
          <ListGroup>
            {threads.map(thread => (
                <ListGroupItem key={thread.title}>
                  <Link to={`hiring/${thread.objectID}`}>
                    {thread.title}
                  </Link>
                </ListGroupItem>
              ),
            )}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Index;
