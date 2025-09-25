import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages"
import NotFound from './pages'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
