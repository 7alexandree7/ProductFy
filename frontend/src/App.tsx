import { Route, Routes } from "react-router"
import NavBar from "./components/NavBar/NavBar"
import HomePage from "./pages/HomePage/HomePage"
import ProductPage from "./pages/ProductPage/ProductPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import CreatePage from "./pages/CreatePage/CreatePage"
import EditProductPage from "./pages/EditProductPage/EditProductPage"


function App() {

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
