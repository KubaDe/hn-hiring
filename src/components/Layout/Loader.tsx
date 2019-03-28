import { inject, observer } from 'mobx-react';
import React from 'react';
import { Spinner } from 'reactstrap';
import { CommonStore } from '../../stores/commonStore';

interface IndexProps {
  commonStore: CommonStore;
}

const styles: object = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 9,
};

@inject('commonStore')
@observer
class Loader extends React.Component<IndexProps> {
  public static defaultProps = { commonStore: {} };

  public render() {
    const {
      commonStore: { showGlobalLoader },
    } = this.props;
    if (!showGlobalLoader) {
      return <></>;
    }
    return (
      <div style={styles}>
        <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
      </div>
    );
  }
}

export default Loader;
