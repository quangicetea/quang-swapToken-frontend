import { WagmiConfig } from "wagmi"
import View from "./components/View"
import { config } from "./constants/wagmiConfigs"

function App() {
  return (
    <WagmiConfig config={config}>
      <View />
    </WagmiConfig>
  )
}

export default App
