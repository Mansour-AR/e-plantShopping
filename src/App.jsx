// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function LandingPage() {
  const history = useHistory();

  const handleGetStartedClick = () => {
    history.push('/product-list');
  };

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <div className="landing_content">
          <h1>Welcome To Paradise Nursery</h1>
          <div className="divider"></div>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
        <div className="aboutus_container">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          {/* Landing page */}
          <Route exact path="/" component={LandingPage} />

          {/* Product listing page */}
          <Route path="/product-list" component={ProductList} />

          {/* Cart page - pass the continue shopping function as a prop */}
          <Route
            path="/cart"
            render={() => (
              <CartItem onContinueShopping={() => window.location.href = '/product-list'} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
