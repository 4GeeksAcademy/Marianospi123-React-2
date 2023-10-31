import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const whiteIconStyle = {
  color: 'white',
};

class SecondsCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      intervalId: null,
    };
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  startInterval() {
    this.setState({
      intervalId: setInterval(() => {
        this.setState((prevState) => {
          const newSeconds = (prevState.seconds + 1) % 60;
          return {
            seconds: newSeconds,
          };
        });
      }, 1000),
    });
  }

  stopInterval() {
    clearInterval(this.state.intervalId);
  }

  resetCounter() {
    this.setState({ seconds: 0 });
  }

  renderCards() {
    const { seconds } = this.state;

    const digitArray = Array.from(String(seconds), Number);

    const emptyCardCount = 7 - digitArray.length;

    const cards = [];

    // Inserta el icono en la primera card
    cards.push(
      <div key="icon" className="card">
        <FontAwesomeIcon icon={faClock} style={whiteIconStyle} />
      </div>
    );

    // Rellena con ceros
    for (let i = 0; i < emptyCardCount; i++) {
      cards.push(<div key={i} className="card">0</div>);
    }

    // Inserta los dígitos del contador
    digitArray.forEach((digit, index) => {
      cards.push(<div key={index + emptyCardCount} className="card">{digit}</div>);
    });

    return cards;
  }

  render() {
    return (
      <div>
        <div className="card-container">
          {this.renderCards()}
        </div>
        <div className="control-buttons">
          <button onClick={this.startInterval}>Start</button>
          <button onClick={this.stopInterval}>Stop</button>
          <button onClick={this.resetCounter}>Reset</button>
        </div>
      </div>
    );
  }
}

export default SecondsCounter;
