<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ConsultaController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/pacientes', [PacienteController::class, 'index'])->name('paciente.index');
Route::get('/pacientes-consultas', [PacienteController::class, 'patientsLastAppointments'])->name('paciente.consulta');
Route::get('/paciente/{id}', [PacienteController::class, 'show'])->name('paciente.show');
Route::post('/paciente', [PacienteController::class, 'store'])->name('paciente.store');

Route::get('/consultas', [ConsultaController::class, 'index'])->name('consulta.index');
Route::get('/consulta/{id}', [ConsultaController::class, 'show'])->name('consulta.show');
Route::get('/consultas-paciente/{id}', [ConsultaController::class, 'showAppointByPacient'])->name('consulta.paciente');
Route::post('/consulta', [ConsultaController::class, 'store'])->name('consulta.store');
Route::put('/consulta/{id}', [ConsultaController::class, 'update'])->name('consulta.update');


