<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model {
        
    protected $table = 'pacientes';

    protected $fillable = [
        'cpf',
        'name',
        'birthday',
        'phone',
        'image'
    ];

    public function consultas() {
        return $this->hasMany(Consulta::class, 'id_patient');
    }

    use HasFactory;
}
