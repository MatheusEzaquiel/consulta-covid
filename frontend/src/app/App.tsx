import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavbarIndex } from "../shared/components/Navbar";



export const App = () => {
  return (
    <div className="App">

      <NavbarIndex
        title="Consulta Covid"
        optionsList={["Início"]}
        linksList={["/"]}
      />

      <Container>
        <Outlet/>
      </Container>
      
       
    </div>
  );
}