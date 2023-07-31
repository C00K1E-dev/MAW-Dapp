import React, { useEffect, useState } from 'react';
import { Web3Button, W3mQrCode } from '@web3modal/react';

function Web3ConnectButton() {
  return (
  <>
     <Web3Button icon="hide" label="Connect Wallet" balance="show" />
  </>
  );
}

export default Web3ConnectButton;