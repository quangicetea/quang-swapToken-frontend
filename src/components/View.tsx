import { useAccount } from 'wagmi';
import { LoggedIn } from './LoggedIn';
import { NotLoggedIn } from './NotLoggedIn';

export default function View() {
  const { isConnected } = useAccount();
  return isConnected ? <LoggedIn /> : <NotLoggedIn />;
}
