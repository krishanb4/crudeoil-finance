import React from "react";
import {
  Banner,
  Feature,
  Showcase,
  Testimonials,
  Technology,
  Pricing,
  Contact,
} from "dan-components";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div style={{ padding: 100, textAlign: "center", fontSize: 27 }}>
        <Link to="/app">Launch App</Link>
      </div>
    );
  }
}

export default HomePage;
