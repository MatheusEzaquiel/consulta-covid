<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            'image' => 'required'
        ]);
     

        $novoPaciente = Paciente::create($request->all());

        return $novoPaciente;
    }
   
    public function show(Paciente $paciente, int $id) {

        $paciente = $paciente::where('id', $id)->get();
        return $paciente;
        
    }

    public function edit(Paciente $paciente) {}

    public function update(Request $request, Paciente $paciente) {}

    public function destroy(Paciente $paciente) {}

    public function pacientesConsultas() {
        
        $pacientes = DB::table('pacientes')
        ->join('consultas', 'pacientes.id', '=', 'consultas.id_patient')
        ->select('pacientes.*', 'consultas.*')
        ->get();

    
        return $pacientes;
    }
}
