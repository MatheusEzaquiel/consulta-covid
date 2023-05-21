<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Models\Consulta;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PacienteController extends Controller {

    public function index() {
        return Paciente::all();
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
    
        // Upload da imagem
        if ($request->hasFile('image')) {

            $image = $request->file('image');
            $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
            $image->move('patients/', $filename);

        } else {
            return response()->json([
                'status' => 'falha no envio da imagem',
                'message' => 'Nenhuma imagem foi enviada.'
            ]);
        }
    
        // Criar o registro do paciente
        $newPatient = Paciente::firstOrCreate([
            'cpf' => $request->cpf,
            'name' => $request->name,
            'birthday' => $request->birthday,
            'phone' => $request->phone,
            'image' => $filename
        ]);
    
        if ($newPatient) {
            $response["status"] = "sucesso";
            $response["message"] = "Paciente criado com sucesso!";
        } else {
            $response["status"] = "falha";
            $response["message"] = "Falha ao criar paciente.";
        }
        
        //Criar a primeira consulta
        $appointment = new Consulta();
        
        $appointment->condition = "Não atendido";
        $appointment->temperature = 0;
        $appointment->heart_rate = 0;
        $appointment->respiratory_rate = 0;
        $appointment->id_patient = $newPatient->id;
        $appointmentArr = $appointment->toArray();

        $firstAppointment = Consulta::firstOrCreate($appointmentArr);


        return response()->json($response);
    }
   
    public function show(int $id) {

        $paciente = Paciente::where('id', $id)->get();
        return $paciente;
        
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
