import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
import './App.css'
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="App">
    <AuthProvider>
      <ToastContainer  style={{ top: '80px', right: '20px', position: 'fixed' }}/>
      <Router>
        <Header />
        
        <main >
        {/* style={{ minHeight: "calc(100vh - 120px)" }} */}
          <Routes>
          <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Router>
      <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
