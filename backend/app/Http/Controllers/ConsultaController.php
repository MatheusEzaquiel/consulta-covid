<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use Illuminate\Http\Request;

class ConsultaController extends Controller {

    public function index() {

        return Consulta::all();

    }

    public function create() {}

    public function store(Request $request) {

        $request->validate([
            'condition' => 'required',
            'temperature' => 'required',
            'heart_rate' => 'required',
            'respiratory_rate' => 'required',
            'id_patient' => 'required'
        ]);

        //condition calc
        $qtySymptoms = $request->condition;
        $qtySymptomsPercent = ($qtySymptoms / 14) * 100;
 
        if( ($qtySymptomsPercent > 0) && ($qtySymptomsPercent <= 39.9)){
 
            $condition = "Sintomas insuficientes";
 
        }elseif( ($qtySymptomsPercent > 40) && ($qtySymptomsPercent <= 59.9) ){
 
            $condition = "Potencial infectado";
 
        }else if( ($qtySymptomsPercent > 60) && ($qtySymptomsPercent <= 100) ){ 
 
            $condition = "Possível infectado";
 
        }else{
            $condition = "Não atendido";
        }
        
        $request['condition'] = $condition;

        $newAppointment = Consulta::firstOrCreate($request->all());
        return $newAppointment;

    }

    public function show(int $id) {

        $appointments = Consulta::find($id);

        return $appointments;

    }

    public function showAppointByPacient(int $idPacient) {

        $appointments = Consulta::where('id_patient', $idPacient)->get();

        return $appointments;

    }

    public function edit() {}

    public function update(Request $request, int $id) {
        
        $appointment = Consulta::find($id);

        $request->validate([
            'condition' => 'required',
            'temperature' => 'required',
            'heart_rate' => 'required',
            'respiratory_rate' => 'required',
            'id_patient' => 'required'
        ]);

        //condition calc
        $qtySymptoms = $request->condition;
        $qtySymptomsPercent = ($qtySymptoms / 14) * 100;

        if( ($qtySymptomsPercent > 0) && ($qtySymptomsPercent <= 39.9)){

            $condition = "Sintomas insuficientes";

        }elseif( ($qtySymptomsPercent > 40) && ($qtySymptomsPercent <= 59.9) ){

            $condition = "Potencial infectado";

        }else if( ($qtySymptomsPercent > 60) && ($qtySymptomsPercent <= 100) ){ 

            $condition = "Possível infectado";

        }else{
            $condition = "Não atendido";
        }
                
        $appointment->condition = $condition;
        $appointment->temperature = $request->temperature;
        $appointment->heart_rate = $request->heart_rate;
        $appointment->respiratory_rate = $request->respiratory_rate;
        $appointment->id_patient = $request->id_patient;

        $appointment->save();

        return $appointment;
    }

    public function destroy() {}

}
