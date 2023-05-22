import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import { FaTemperatureHigh, FaHeartbeat, FaMedkit } from "react-icons/fa";
import { TabDataUser } from "../shared/components/Tabs/TabDataUser";

import { Link, useParams } from "react-router-dom";

import { useState, useContext } from "react";
import { HealthDataPacientContext } from "../shared/contexts/HealtDataPacient";

export const HealthData = () => {

    const { idPatient, idAppointment } = useParams();

    const { healthData, changeHealthData} = useContext(HealthDataPacientContext);
    
    const temperaturaArr: string[] = ["Hipotermia", "Afebril", "Estado febril", "Febre", "Pirexia", "Hiperpirexia"];
    const freqCardiacaArr: string[] = ["Bradicárdico", "Normocárdico", "Taquicárdico"];
    const freqRespiratoriaArr: string[] = ["Bradipnéico", "Eupnéico", "Taquipnéico"];
    const estadoCor = ['success','warning','danger']


    const [temp, setTemp] = useState('');
    const [freqCardiaca, setFreqCardiaca] = useState('');
    const [freqRespiratoria, setFreqRespiratoria] = useState('');


    const tempAlert = (temp: number) => {

        if(temp === 0){
   
            return "";
        
        }else if (temp < 36.1) {
            let i: string = temperaturaArr[0];
            return i;

        }else if(temp >= 36.1 && temp <= 37.2) {
            let i: string = temperaturaArr[1]
            return i;

        }else if(temp >= 37.3 && temp <= 37.7) {
            let i: string = temperaturaArr[2]
            return i;

        }else if(temp >= 37.8 && temp <= 38.9) {
                let i: string = temperaturaArr[3]
                return i;
            
        }else if(temp >= 39 && temp <= 40) {
            let i: string = temperaturaArr[4]
            return i;
            
        }else if(temp > 40) {
            let i: string = temperaturaArr[5]
            return i;
        }
    }

    const freqCardAlert = (freqCard: number) => {

        if (freqCard > 0 && freqCard < 60) {
            let i: string = freqCardiacaArr[0];
            return i;

        }else if(freqCard >= 60 && freqCard <= 100) {
            let i: string = freqCardiacaArr[1]
            return i;

        }else if (freqCard > 100) {
            let i: string = freqCardiacaArr[2]
            return i;
        }
    }

    const freqRespirAlert = (freqRespiratoria: number) => {

        if (freqRespiratoria > 0 && freqRespiratoria < 14) {
            let i: string = freqRespiratoriaArr[0];
            return i;

        }else if(freqRespiratoria >= 15 && freqRespiratoria <= 20) {
            let i: string = freqRespiratoriaArr[1]
            return i;

        }else if (freqRespiratoria > 20) {
            let i: string = freqRespiratoriaArr[2]
            return i;
        }
    }

    

    return(

        <>

            <TabDataUser idPatient={Number(idPatient)}/>

            <h2 className="m-4">Dados de saúde</h2>

            <p>Informe alguns dados de saúde do paciente para continuar a consulta</p>

            <Container>
                <Row>

                    <Col>
                    <Form>
                        
                        <Form.Group>
                            <Form.Label> <FaTemperatureHigh/> Temperatura</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Exemplo: 35"
                                name="temperatura"
                                value={temp} onChange={(e) => {setTemp(e.target.value)}}
                                />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> <FaHeartbeat/> Frequência cardíaca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Exemplo: 80"
                                name="freqCardiaca"
                                value={freqCardiaca} onChange={(e)=>{setFreqCardiaca(e.target.value)}}
                                />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> <FaMedkit/> Frequência respiratória</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Exemplo: 16"
                                name="freqRespiratoria"
                                value={freqRespiratoria} onChange={(e) => {setFreqRespiratoria(e.target.value)}}
                                />
                        </Form.Group>
                        
                        
                        
                    
                    
                    </Form>
                    </Col>
                    <Col>
                        <Alert variant={estadoCor[0]}>
                                Temperatura: {tempAlert(Number(temp))}
                            </Alert>

                            <Alert variant={estadoCor[1]}>
                                Frequência cardíaca: {freqCardAlert(Number(freqCardiaca))}
                            </Alert>
                            
                            <Alert variant={estadoCor[2]}>
                                Frequência respiratória: {freqRespirAlert(Number(freqRespiratoria))}
                            </Alert>
                    </Col>
                </Row>

                
                { idAppointment ?  

                    ( <Link to={`/sintomas/${idPatient}/${idAppointment}`}>
                        <Row className="justify-content-center">
                            <Button variant="primary" className="m-5 center" size="lg" onClick={ () => changeHealthData({temperature: Number(temp), heartRate: Number(freqCardiaca), respiratoryRate: Number(freqRespiratoria)})}>
                                Avançar
                            </Button>
                        </Row>
                    </Link>) :

                    ( <Link to={`/sintomas/${idPatient}`}>
                        <Row className="justify-content-center">
                            <Button variant="primary" className="m-5 center" size="lg" onClick={ () => changeHealthData({temperature: Number(temp), heartRate: Number(freqCardiaca), respiratoryRate: Number(freqRespiratoria)})}>
                                Avançar
                            </Button>
                        </Row>
                    </Link>) }   

                          
            </Container>
        </>

    );
    
}