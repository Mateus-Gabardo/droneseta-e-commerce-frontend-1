import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HealthPage from '../pages/health';
import store from '../store';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <div>Hello world!</div>,
//   },
//   {
//     path: '/health',
//     element: <HealthPage />,
//   },
// ]);

function RouterSwitch() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<div>Hello World!</div>} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </Provider>
  );
}

export default RouterSwitch;
