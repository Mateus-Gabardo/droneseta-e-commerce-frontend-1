import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HealthPage from '../pages/health';
import Layout from '../shared/components/Layout';
import store from '../store';

function RouterSwitch() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>Hello World!</div>
            </Layout>
          }
        />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </Provider>
  );
}

export default RouterSwitch;
