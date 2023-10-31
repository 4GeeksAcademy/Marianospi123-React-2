import React, { Component } from 'react';

class SecondsCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  renderCards() {
    const { seconds } = this.state;
    // Convierte el número de segundos en un arreglo de dígitos
    const digitArray = Array.from(String(seconds), Number);
    // Calcula cuántas cartas vacías se necesitan
    const emptyCardCount = 6 - digitArray.length;
    
    // Llena el arreglo de cartas con los dígitos y cartas vacías
    const cards = [];
    for (let i = 0; i < emptyCardCount; i++) {
      cards.push(<div key={i} className="card">0</div>);
    }
    digitArray.forEach((digit, index) => {
      cards.push(<div key={index} className="card">{digit}</div>);
    });

    return cards;
  }

  render() {
    return (
      <div>
        <div className="card-container">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export default SecondsCounter;