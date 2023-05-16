import { Container } from "react-bootstrap";
import { NavbarIndex } from "../shared/components/Navbar";

import { Outlet } from "react-router-dom";

import { HealthDataPacientProvider } from "../shared/contexts/HealtDataPacient";
import { PacientDataContextProvider } from "../shared/contexts/PacientData";


export const App = () => {

  return (

    <div className="App">

     
      
        <NavbarIndex title="Consulta Covid" optionsList={["Início"]} linksList={["/"]}/>
        <Container>
          <PacientDataContextProvider>

            <HealthDataPacientProvider>
              <Outlet/>
            </HealthDataPacientProvider>
            
          </PacientDataContextProvider>
        </Container>

      
      
       
    </div>

  );
  
}