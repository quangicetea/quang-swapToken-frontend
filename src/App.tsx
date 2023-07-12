import { WagmiConfig } from "wagmi";
import View from "./components/View";
import { wagmiConfig } from "./constants/wagmiConfigs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <View />
      <ToastContainer />
    </WagmiConfig>
  );
}

export default App;
