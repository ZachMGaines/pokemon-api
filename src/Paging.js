import React, { Component } from 'react';


export default class Paging extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { page, onPrev, onNext } = this.props;

    return (
      <form className="Paging" onSubmit={this.handleSubmit}>

        <button className="prev"
          onClick={onPrev}
          disabled={page < 2}>Left</button>
        <span>Page {page}</span>
        <button className="next" onClick={onNext}>Right</button>
      </form>
    );
  }
}
