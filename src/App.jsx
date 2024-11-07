import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/login";
import { ReactQueryProvider } from "./providers/react-query-provider";
import Categories from "./pages/Home/Categories/categories";

function App() {
  return (
    <Router>
      <div >
      <ReactQueryProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        </ReactQueryProvider>

      </div>
    </Router>
  );
}

export default App;
