import React, { ReactText } from 'react';
import ReactList from 'react-list';
import { inject, observer } from 'mobx-react';
import { Row, Col, Jumbotron } from 'reactstrap';
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
    console.log(threadId);
    hiringStore.loadThread(threadId);
  }

  renderItem = (index: number, key: ReactText) => {
    const {
      hiringStore: { thread },
    } = this.props;
    if (!thread) {
      return <></>;
    }

    const child = thread.children[index];

    return (
      <Jumbotron key={key}>
        <div dangerouslySetInnerHTML={{ __html: child.text }}/>
      </Jumbotron>
    );
  };

  render(): React.ReactNode {
    const {
      hiringStore: { thread },
    } = this.props;
    if (!thread) {
      return null;
    }
    return (
      <Row>
        <Col xs={{ offset: 2, size: 8 }}>
          <ReactList
            itemRenderer={this.renderItem}
            length={thread.children.length}
            // type='uniform'
          />
        </Col>
      </Row>
    );
  }
}

export default Hiring;
