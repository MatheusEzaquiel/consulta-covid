import { Api } from '../ApiConfig';
import {ApiException} from '../ApiException'; 


export interface IAppointment {
    id?: number;
    condition: number;
    temperature: number;
    heart_rate: number;
    respiratory_rate: number;
    id_patient: number;
}


const updateById = async (id: number, dataToUpdate: IAppointment): Promise<undefined | ApiException> => {

    try {

        const { data } = await Api().put(`consulta/${id}`, dataToUpdate);
        return data;

    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar dados do usuário');
    }

}

export const AppointmentsService = {

    updateById,

}