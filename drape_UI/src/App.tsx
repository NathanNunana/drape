import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Register, Dashboard } from "./pages/admin";
import { Main } from "./pages/website";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./drape/store";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback="Loading....">
        <Router>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
