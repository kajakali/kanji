import React, { Component } from 'react';
import { connect } from 'react-redux';


class Kanji extends Component {
    componentDidMount() {
        this.props.dispatch( {type: 'FETCH_LEVEL_ONE_KANJI'} );
      }
    render(){
        return(
            <p>I am kanji</p>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
  });

export default connect(mapStateToProps)(Kanji);