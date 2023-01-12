import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToggleRedux } from '../../store/actions';

class MenuItem extends Component {

    constructor(props) {
      super(props);
      this.MenuClick = this.MenuClick.bind(this);
    }

    MenuClick = (event) => {
      var width = window.innerWidth;
      if (width < 992) {
        this.props.ToggleRedux();
      }
    }

  render() {
    const item = this.props.item || {};
    return (
      <React.Fragment>
        <Link onClick={this.MenuClick} to={item.url}>
          {item.icon && <i className={item.icon}></i>}
          {item.label} 
        </Link>
      </React.Fragment>
    );
  }
}


const mapStatetoProps = state => { 
  const { is_large_state } = state.Layout;
  return { is_large_state };
}

export default withRouter(connect(mapStatetoProps, { ToggleRedux  })(MenuItem));

















