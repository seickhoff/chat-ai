import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"

import { Query } from "./Query"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Query />} />
      </Routes>
    </Container>
  )
}

export default App
