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

        $novaConsulta = Consulta::create($request->all());
        return $novaConsulta;

    }

    public function show(Consulta $consulta) {}

    public function edit(Consulta $consulta) {}

    public function update(Request $request, Consulta $consulta) {}

    public function destroy(Consulta $consulta) {}
}
