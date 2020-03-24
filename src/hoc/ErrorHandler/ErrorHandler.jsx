import React from 'react';
import Modal from '../../components/UI/Modal/modal';
import Aux from '../Auxe/Aux';

const errorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((configReq) => {
        this.setState({ error: null });
        return configReq;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error });
        },
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorCloseHandler = () => {
      this.setState({ error: null });
    };
    render() {
      const { error } = this.state;
      return (
        <Aux>
          <Modal show={error} cancelPurchase={this.errorCloseHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default errorHandler;
