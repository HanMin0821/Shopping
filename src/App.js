import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Shopping from"./Shopping"

function App() {
  return (
      <HashRouter>
      <div>
          <Routes>
              <Route path="/" element={<Navigate to="shopping" />} />
              <Route path="/shopping/*" element={<Shopping/>} />
          </Routes>
      </div>
      </HashRouter>
  );
}
export default App;
