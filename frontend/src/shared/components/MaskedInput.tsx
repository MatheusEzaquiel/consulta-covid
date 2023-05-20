import { ChangeEvent } from "react";
import  InputMask  from "react-input-mask";

interface ICpfMask {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    typeMask: string;
}


const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, '');


export const MaskedInput = ({value, onChange, typeMask}: ICpfMask) => {
    

    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        onChange({
            ...e,
            target: {
                ...e.target,
                value: onlyNumbers(e.target.value),
            }
        })
    }


    return(
        <>  
            <br></br>
            <InputMask required mask={typeMask} value={value} onChange={handleChange} placeholder={typeMask}/> 
            <br></br>
        </>
    );
}                   