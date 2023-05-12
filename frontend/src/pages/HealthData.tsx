import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HealthData = () => {

    const temperaturaArr: string[] = ["Hipotermia", "Afebril", "Estado febril", "Febre", "Pirexia", "Hiperpirexia"];
    const freqCardiacaArr: string[] = ["Bradicárdico", "Normocárdico", "Taquicárdico"];
    const freqRespiratoriaArr: string[] = ["Bradipnéico", "Eupnéico", "Taquipnéico"];
    const estadoCor = ['success','warning','danger']


    const [temp, setTemp] = useState('');
    const [freqCardiaca, setFreqCardiaca] = useState('');
    const [freqRespiratoria, setFreqRespiratoria] = useState('');


    const tempAlert = (temp: string) => {

        let tempNum = Number(temp);

        if(tempNum == 0){
   
            return "";
        
        }else if (tempNum < 36.1) {
            let i: string = temperaturaArr[0];
            return i;

        }else if(tempNum >= 36.1 && tempNum <= 37.2) {
            let i: string = temperaturaArr[1]
            return i;

        }else if(tempNum >= 37.3 && tempNum <= 37.7) {
            let i: string = temperaturaArr[2]
            return i;

        }else if(tempNum >= 37.8 && tempNum <= 38.9) {
                let i: string = temperaturaArr[3]
                return i;
            
        }else if(tempNum >= 39 && tempNum <= 40) {
            let i: string = temperaturaArr[4]
            return i;
            
        }else if(tempNum > 40) {
            let i: string = temperaturaArr[5]
            return i;
        }
    }

    const freqCardAlert = (freqCard: string) => {

        let freqCardNum = Number(freqCard);

        if (freqCardNum > 0 && freqCardNum < 60) {
            let i: string = freqCardiacaArr[0];
            return i;

        }else if(freqCardNum >= 60 && freqCardNum <= 100) {
            let i: string = freqCardiacaArr[1]
            return i;

        }else if (freqCardNum > 100) {
            let i: string = freqCardiacaArr[2]
            return i;
        }
    }

    const freqRespirAlert = (freqRespiratoria: string) => {

        let freqRespNum = Number(freqRespiratoria);

        if (freqRespNum > 0 && freqRespNum < 14) {
            let i: string = freqRespiratoriaArr[0];
            return i;

        }else if(freqRespNum >= 15 && freqRespNum <= 20) {
            let i: string = freqRespiratoriaArr[1]
            return i;

        }else if (freqRespNum > 20) {
            let i: string = freqRespiratoriaArr[2]
            return i;
        }
    }

    
    
    

    return(

        <>
            <h2>Dados de saúde</h2>

            <p>Informe alguns dados de saúde do paciente para continuar a consulta</p>

            <Form>
    
                <Form.Group>
                    <Form.Label>Temperatura</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Exemplo: 35"
                        name="temperatura"
                        value={temp} onChange={(e) => {setTemp(e.target.value)}}
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Frequência cardíaca</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Exemplo: 80"
                        name="freqCardiaca"
                        value={freqCardiaca} onChange={(e)=>{setFreqCardiaca(e.target.value)}}
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Frequência respiratória</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Exemplo: 16"
                        name="freqRespiratoria"
                        value={freqRespiratoria} onChange={(e) => {setFreqRespiratoria(e.target.value)}}
                        />
                </Form.Group>

                <Link to="/sintomas">
                    <Button variant="primary">Avançar</Button>
                </Link>

                <Alert variant={estadoCor[0]}>
                    Temperatura: {tempAlert(temp)}
                </Alert>

                <Alert variant={estadoCor[1]}>
                    Frequência cardíaca: {freqCardAlert(freqCardiaca)}
                </Alert>
                  

                <Alert variant={estadoCor[2]}>
                    Frequência respiratória: {freqRespirAlert(freqRespiratoria)}
                </Alert>

             
            </Form>

        </>

    );
}