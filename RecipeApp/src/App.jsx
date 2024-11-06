import Hero from "./components/Hero/Hero";
import FoodSearch from './components/FoodSearch/FoodSearch';
import Navbar from "./components/Navbar/Navbar";
import MealSearch from "./components/MealSearch/MealSearch";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div id="app">
      <Navbar />
      <div>
        <Hero id="home" />
        <FoodSearch id="foodsearch" />
        <MealSearch id="mealsearch" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
