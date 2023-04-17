import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HealthPage from '../pages/health';
import Layout from '../shared/components/Layout';
import store from '../store';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';

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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Provider>
  );
}

export default RouterSwitch;
