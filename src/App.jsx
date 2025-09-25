import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Form from "./pages/Form";
import NewForm from "./pages/NewForm";

function App() {
  return (<BrowserRouter>
      <Routes>
        <Route path="/forms" element={<Form/>}></Route>
        <Route path="/new-forms" element={<NewForm/>}></Route>
      </Routes>
  </BrowserRouter>
)}

export default App;
