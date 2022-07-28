import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          TrybeWallet
        </div>
        <div>
          <WalletForm />
        </div>
      </div>
    );
  }
}

export default Wallet;
