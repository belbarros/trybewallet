import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <WalletForm />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
