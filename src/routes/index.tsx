import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HealthPage from '../pages/health';
import Layout from '../shared/components/Layout';
import store from '../store';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

import OrderPage from '../pages/order';
import AdminPage from '../pages/admin';

function RouterSwitch() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/order"
          element={
            <Layout>
              <OrderPage />
            </Layout>
          }
        />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </Provider>
  );
}

export default RouterSwitch;
