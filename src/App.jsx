import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/Error/NotFound";
import Home from "@/pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:uniqueUrl"
          element={<Home />}
        />
        <Route
          path="/not-found"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
