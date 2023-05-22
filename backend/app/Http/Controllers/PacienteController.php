<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Exception;


use App\Models\Paciente;
use App\Models\Consulta;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PacienteController extends Controller {

    public function index() {

        $patients = Paciente::all();

        if($patients->isEmpty()){
            return response()->json(['error' => 'nenhum paciente encontrado']);
        }
        
        return $patients;

    }

    public function create() {}

  
    public function store(Request $request) {

        $request->validate([
            'cpf' => 'required',
            'name' => 'required',
            'birthday' => 'required',
            'phone' => 'required',
            'image' => 'required|image|mimes:jpeg,jpg,png'
        ]);
    
        // Upload image
        if ($request->hasFile('image')) {

            $image = $request->file('image');
            $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
            $image->move('patients/', $filename);

        } else {
            return response()->json(['message' => 'falha no upload de imagem']);
        }
    
        $newPatient = Paciente::firstOrCreate([
            'cpf' => $request->cpf,
            'name' => $request->name,
            'birthday' => $request->birthday,
            'phone' => $request->phone,
            'image' => $filename
        ]);
    
        
        //Create first appointment
        $appointment = new Consulta();
        
        $appointment->condition = "Não atendido";
        $appointment->temperature = 0;
        $appointment->heart_rate = 0;
        $appointment->respiratory_rate = 0;
        $appointment->id_patient = $newPatient->id;
        $appointmentArr = $appointment->toArray();

        $firstAppointment = Consulta::firstOrCreate($appointmentArr);

    }
   
    public function show(int $id) {

        $patient = Paciente::where('id', $id)->get();

        if($patient->isEmpty()) {
            return response()->json(['error' => 'paciente não encontrado']);
        }

        return $patient;
        
    }

    public function edit(Paciente $paciente) {}

    public function update(Request $request, Paciente $paciente) {}

    public function destroy() {}

    public function patientsLastAppointments() {
        
  
        $patientsLastAppointment = DB::table('pacientes')

        ->join('consultas', 'pacientes.id', '=', 'consultas.id_patient')

        ->select('pacientes.*', 'consultas.*')

        ->join(DB::raw('(SELECT id_patient, MAX(created_at) as max_created_at FROM consultas GROUP BY id_patient) as latest_consultas'),
            function ($join) {
                $join->on('consultas.id_patient', '=', 'latest_consultas.id_patient')
                    ->on('consultas.created_at', '=', 'latest_consultas.max_created_at');
            })

        ->orderBy('pacientes.id', 'desc')->get();
    
        return $patientsLastAppointment;
    }
}
