import React, { useState } from "react";
import { RiTokenSwapLine } from "react-icons/ri";
import PulseLoader  from "react-spinners/PulseLoader";
import Confetti from "react-confetti";

import useConfetti from "../../hooks/useConfetti";
import { swapCoin } from "../../services/swapCoin";
import CoinCard from "../CoinCard/CoinCard";
import "./coinSwapForm.css";

// List of coins with icon, title, and price
const coins = [
  { id: "btc", icon: "🪙", title: "Bitcoin", price: 40000 },
  { id: "eth", icon: "💎", title: "Ethereum", price: 2000 },
  { id: "usdt", icon: "💵", title: "Tether", price: 1 },
  { id: "bnb", icon: "🔥", title: "Binance Coin", price: 300 },
  { id: "ada", icon: "🌟", title: "Cardano", price: 0.3 },
  { id: "sol", icon: "🌞", title: "Solana", price: 20 },
];

const CoinSwapForm = () => {
  const [sourceCoin, setSourceCoin] = useState(coins[0]);
  const [destinationCoin, setDestinationCoin] = useState(coins[1]);
  const [sourceAmount, setSourceAmount] = useState(0);
  const [destinationAmount, setDestinationAmount] = useState(0);

  const [swappingStatus, setSwappingStatus] = useState('idle') // idle, loading, success, failed
  // const { numberOfPieces, startConfetti } = useConfetti();

  // Handle source amount input
  const handleSourceAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      
      const amount = parseFloat(e.target.value) || 0;
      setSourceAmount(amount);

      const destinationValue =
        (amount * sourceCoin.price) / destinationCoin.price;
      setDestinationAmount(destinationValue);
    }
  };

  // Swap the source and destination coins
  const handleSwap = async () => {
    try {
      // Recalculate amounts
      setSwappingStatus('loading')
      const isSuccess = await swapCoin()

      if (isSuccess) {
        // reset the form
        setSourceCoin(coins[0])
        setDestinationCoin(coins[1])
        setSourceAmount(0);
        setDestinationAmount(0);

        setSwappingStatus('success')
      }
   
    } catch (error) {
      console.error('swap error: ', error)
      setSwappingStatus('failed')
    } 

    setTimeout(() => setSwappingStatus('idle'), 5000)
  };

  const handleCoinSelect = (type, id) => {
    const selectedCoin = coins.find(item => item.id === id)
    if (type === "source") {
      setSourceCoin(selectedCoin);
    } else {
      setDestinationCoin(selectedCoin);
    }
  };

  return (
    <div className="coin-swap-form">
      {/* Left Side - Coin List */}
      <div className="right-panel">
        <h2>Available Coins</h2>
        <div className="coin-list">
        {coins.map(coin => (
          <CoinCard key={coin.id} icon={coin.icon} title={coin.title} id={coin.id} onCoinSelect={handleCoinSelect} />
        ))}
        </div>
      </div>

      {/* Right Side - Swap Form */}
      <div className="left-panel">
        <div className="swap-container">
          <div className="swap-section source">
            <h3>Source</h3>
            <div className="swap-input">
              <input
                type="text"
                value={sourceAmount}
                onChange={handleSourceAmountChange}
                placeholder="Enter amount"
              />
              <div className="coin-display">
                {sourceCoin.icon} {sourceCoin.title}
              </div>
            </div>
          </div>
          <button className="swap-button" onClick={handleSwap} disabled={swappingStatus === 'loading'}>
            { swappingStatus === 'loading' ? <PulseLoader
              color="white"
              size={7}
            /> : <RiTokenSwapLine /> }
            <span>Swap</span>
          </button>
          {swappingStatus === 'success' && <Confetti numberOfPieces={200} />}
          <div className="swap-section destination">
            <h3>Destination</h3>
            <div className="swap-input">
              <input
                type="text"
                value={destinationAmount.toFixed(6)}
                disabled
              />
              <div className="coin-display">
                {destinationCoin.icon} {destinationCoin.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinSwapForm;
