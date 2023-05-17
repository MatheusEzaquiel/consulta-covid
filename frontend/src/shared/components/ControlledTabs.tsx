import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { TabDataUser } from './TabDataUser';
import { TabDataAppointments } from './TabDataAppointments'

interface IIdProps{
  idPatient: number
  idAppointment: number;
}


export const ControlledTabs = ({idPatient, idAppointment}: IIdProps) => {
  const [key, setKey] = useState('appointment');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k ?? 'appointment')}
      className="mb-3">

      <Tab eventKey="appointment" title="Atendimento">
        <TabDataUser idPatient={idPatient} idAppointment={idAppointment}/>
      </Tab>

      <Tab eventKey="oldAppointments" title="Atendimentos anteriores">
        <TabDataAppointments/>
      </Tab>

    </Tabs>
  );
}