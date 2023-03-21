import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"

import { AppContainer } from "./components/AppContainer"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<AppContainer />} />
      </Routes>
    </Container>
  )
}

export default App
