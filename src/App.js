import React, { Component } from 'react';
import CryptoItem from './CryptoItem';
//import logoEth from './eth.png';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const coin1 = {
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '/btc.png',
      amount: '0.14'
    }
    const coin2 = {
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/eth.png',
      amount: '2'
    }
    console.log(coin1.image)

    return (
      <div class="page">
      <h1>Cryptocurrency tracker in ReactJs</h1>
      <CryptoItem
        name={coin1.name}
        symbol={coin1.symbol}
        logo={coin1.logo}
        amount={coin1.amount}
      />
       <CryptoItem
        name={coin2.name}
        symbol={coin2.symbol}
        logo={coin2.logo}
        amount={coin2.amount}
      />
    </div>
    );
  }
}

export default App;


