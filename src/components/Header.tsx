import { Button } from 'antd';
import { useId } from 'react';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

export function Header() {
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-row gap-5">
      <p className="font-bold">Connected to {address}</p>
      <Button className="font-bold text-white bg-red-400" onClick={() => disconnect()}>
        Disconnect
      </Button>
      {chain && <p className="font-bold">Connected to {chain.name}</p>}
      {chains && (
        <div className="font-bold">
          Available chains:{' '}
          {chains.map((chain) => (
            <p key={useId()}>{chain.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}
