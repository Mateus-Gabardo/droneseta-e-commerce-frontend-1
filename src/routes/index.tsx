import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HealthPage from '../pages/health';
import Layout from '../shared/components/Layout';
import store from '../store';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

function RouterSwitch() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster toastOptions={{ duration: 5000, position: 'bottom-left' }} />
    </Provider>
  );
}

export default RouterSwitch;
