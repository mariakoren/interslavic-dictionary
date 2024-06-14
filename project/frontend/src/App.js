import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Personal from "./pages/Personal/Personal.js";
import ListOfWords from "./pages/ListOfWords/ListOfWords.js";
import Reviews from "./pages/Reviews/Reviews.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Personal/>}/>
        <Route path="/listofwords" element={<ListOfWords/>}/>
        <Route path="/reviews" element={<Reviews/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;