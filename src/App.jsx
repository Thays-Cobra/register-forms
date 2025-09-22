import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Form from "./pages/Form";

function App() {
  return (<BrowserRouter>
      <Routes>
        <Route path="/forms" element={<Form/>}></Route>
      </Routes>
  </BrowserRouter>
)}

export default App;
