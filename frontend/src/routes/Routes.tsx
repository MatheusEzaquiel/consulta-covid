import { createBrowserRouter } from 'react-router-dom';

import { App } from './../app/App';
import { Error404 } from './../pages/ErrorPages/Error404';
import { Home } from './../pages/Home';
import { Appointment } from './../pages/Appointment';
import { HealthData } from './../pages/HealthData';
import { Symptoms} from './../pages/Symptoms';

export const Routes = () => {

    
    const router = createBrowserRouter([

        {
            path: "/",
            element: <App/>,
            errorElement: <Error404/>,
            children: [

                {
                    path: "/",
                    element: <Home/>
                },

                {
                    path: "/atendimento/:idPatient",
                    element: <Appointment/>
                },

                {
                    path: "/dados-de-saude/:idPatient/:idAppointment?",
                    element: <HealthData/>
                },

                {
                    path: "/sintomas/:idPatient/:idAppointment?",
                    element: <Symptoms/>
                },

            ]
        }
       
    ]);

    return router;
}