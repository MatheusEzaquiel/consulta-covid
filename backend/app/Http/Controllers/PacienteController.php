<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;

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
   
    public function show(Paciente $paciente) {}

    public function edit(Paciente $paciente) {}

    public function update(Request $request, Paciente $paciente) {}

    public function destroy(Paciente $paciente) {}
}
