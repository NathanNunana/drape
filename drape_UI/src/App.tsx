import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./drape/store";
import "./App.css";
import { Login, Register, ActivateAccount, Dashboard } from "./pages/admin";
import { Main } from "./pages/website";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback="Loading....">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/activate/:uidb64/:token" element={<ActivateAccount />} />
            <Route
              path="/dashboard/*"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
};

export default App;
