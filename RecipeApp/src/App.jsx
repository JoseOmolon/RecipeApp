import { BrowserRouter as Router } from "react-router-dom";
import Hero from "./components/Hero/Hero"
import FoodSearch from './components/FoodSearch/FoodSearch'
import Navbar from "./components/Navbar/Navbar"
import MealSearch from "./components/MealSearch/MealSearch"
import Footer from "./components/Footer/Footer"

function App() {

  return (
    <Router>
      <Navbar />
        <div>
          <Hero id="home"/>
          <FoodSearch id="foodsearch"/>
          <MealSearch id="mealsearch"/>
        </div>
        <Footer />
    </Router> 
  )
}

export default App
