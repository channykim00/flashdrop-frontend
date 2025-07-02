import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:uniqueUrl"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
