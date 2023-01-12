import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Topbar from './Topbar';
import Footer from './Footer';

// render if Auth Layout
const AuthLayoutContent = (props) => {
  document.body.classList.remove('bg-primary');
  return <React.Fragment>
    <Topbar />
    <div className="wrapper">
      <div className="content-page">
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

// render if Non-Auth Layout
const NonAuthLayoutContent = (props) => {
  return <React.Fragment>
    {props.children}
  </React.Fragment>
}

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentDidMount() {

  //   // If Auth the putted class to body
  //   if (this.props.layoutType !== 'Auth') {
  //     document.body.classList.add('bg-primary');
  //   }

  // }

  render() {
    return (
      <React.Fragment>
        {/* {this.props.layout.layoutType === 'Auth' ? <AuthLayoutContent {...this.props} /> : <NonAuthLayoutContent {...this.props} />} */}
        <AuthLayoutContent {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout
  };
}

export default withRouter(connect(mapStatetoProps)(Layout));
