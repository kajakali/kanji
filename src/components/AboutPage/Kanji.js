import React, { Component } from 'react';
import { connect } from 'react-redux';


class Kanji extends Component {
    componentDidMount() {
        fetch("https://kanjiapi.dev/v1/grade/1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )}
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