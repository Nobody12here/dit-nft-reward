import { ConfigProvider, theme } from 'antd';
import {Home} from './pages/home/index';
import { Web3Provider } from './config';

function App() {

  return (
    <Web3Provider>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#3b82f6',
            borderRadius: 12,
          },
        }}
      >
        <Home/>
      </ConfigProvider>
    </Web3Provider>

  );
}

export default App;