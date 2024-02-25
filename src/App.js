import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Cart, Category, Home, PageNotFound } from './pages/index';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PaymentPage from './pages/PaymentPage/Payment';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/category/:id' element={<Category/>}/>
            <Route path='*' element={<PageNotFound/>}/>
            <Route path='/payments'element={<PaymentPage/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
