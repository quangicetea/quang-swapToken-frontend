import { WagmiConfig } from "wagmi";
import View from "./components/View";
import { config } from "./constants/wagmiConfigs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <WagmiConfig config={config}>
      <View />
      <ToastContainer />
    </WagmiConfig>
  );
}

export default App;
