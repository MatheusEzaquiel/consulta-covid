<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model {   

    protected $table = 'consultas';

    protected $fillable = [
        'condition',
        'temperature',
        'heart_rate',
        'respiratory_rate',
        'id_patient'
    ];

    use HasFactory;
}
