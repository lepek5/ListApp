import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import List from "./pages/List";
import NewListPage from "./pages/NewListPage";

function App() {
  return (
    <div id="lista">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/new" element={<NewListPage />} />
          <Route path="/:id" element={<List />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
