import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import HealthPage from '../pages/health';
import Layout from '../shared/components/Layout';
import store from '../store';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

import 'react-toastify/dist/ReactToastify.css';

function RouterSwitch() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
