import { Api } from '../ApiConfig';
import {ApiException} from '../ApiException'; 

export interface IPatient {
    id?: number;
    name: string;
    cpf: string;
    phone: string;
    image: File | null;
    birthday: string;
}

export interface IPatientAppointment {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    image: string;
    birthday: string;
    condition: string;
    temperature: number;
    heart_rate: number;
    respiratory_rate: number;
    id_patient: number;
}


const getAll = async (): Promise<IPatient[] | ApiException> => {

    try {

        const { data } = await Api().get('/pacientes');

        return data;

    }catch(error: any){
        return new ApiException(error.message || 'Erro ao consultar usuário');
    }
}

const getAllJoin = async (): Promise<IPatientAppointment[] | ApiException> => {

    try {

        const { data } = await Api().get('/pacientes-consultas');

        return data;

    }catch(error: any){
        return new ApiException(error.message || 'Erro ao consultar usuário');
    }
}

const getById = async (id: number): Promise<IPatient | ApiException> => {
    
    try {

        const { data } = await Api().get(`/paciente/${id}`);

        return data;

    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar determinado usuário');
    }
}

const create = async (dataToCreate: IPatient): Promise<IPatient | ApiException> => {

    try {

        const { data } = await Api().post('/paciente', dataToCreate,  {
            headers: { 'Content-type': 'multipart/form-data',}
        });
        return data;

    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao cadastrar usuário');
    }
}

const updateById = async (id: number, dataToUpdate: IPatient): Promise<undefined | ApiException> => {

    try {

        const { data } = await Api().put(`user/${id}`, dataToUpdate);
        return data;

    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar dados do usuário');
    }

}

const deleteById = async (id: number) => {

    try {

        await Api().delete(`user/${id}`);
        return undefined;

    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar dados do usuário');
    }


}

export const PatientsService = {

    getAll,
    getAllJoin,
    getById,
    create,
    updateById,
    deleteById

}