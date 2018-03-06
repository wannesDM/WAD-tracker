import React, { Component } from "react";
import fetch from 'isomorphic-fetch'
import logo from './logo.svg';
//import './styles.css'

class CryptoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      symbol: props.symbol,
      logo: props.logo,
      amount: props.amount,
      price: null,
      lastPrice: null,
    }

    this.getPrice = this.getPrice.bind(this);
  }
  componentWillMount() {
    this.getPrice();
  }
  componentDidMount() {
    setInterval(this.getPrice, 10000);
  }

  getPrice() {
    console.log('getting new price')
    const { symbol } = this.state

        //fetching the price from cryptocompare
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
      .then(r => r.json())
      .then(json => {
        this.setState((prevState) => ({
          price: json.USD, 
          lastPrice: prevState.price !== json.USD ? prevState.price : prevState.lastPrice
        }))
      })
  }

  priceChange(lastPrice, price) {
    const diff = lastPrice - price
    const change = diff / lastPrice
    const percent = (change * 1000)
    return (change === -Infinity ? 0 : percent).toFixed(2);
  }

  render() {
    const { name, symbol, price, logo, lastPrice, amount } = this.state
    const gainloss = lastPrice > price
      ? 'gain'
      : 'loss'
    const sum = (lastPrice * amount).toFixed(2);
   
    return (
    <div className='items-container'>
        <div className={`cryptoCard white ${gainloss}`}>
            <div className='top'>
            <div className='name'>
            <img className='icon' src={`${logo}`} width="20px" height="20px" alt="" />
                <div className='cryptoName-container'>
                <span>{name}</span>
                <div className='symbol'>
                    {symbol} (${sum})
                </div>
                 </div>
            </div>

            </div>
            <div className='right'>
                <div className={`price`}>
                ${price}
                </div>
                <div className='percentage-container'>
                <div className={`percentage ${gainloss}`}>
                    {this.priceChange(lastPrice, price)}%
                </div>
            </div>
            </div>
        </div>
    </div>
    )
  }
}

export default CryptoItem
