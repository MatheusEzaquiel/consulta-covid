<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

       
        $response->header('Acess-Control-Allow-Origin', "*")
        ->header('Acess-Control-Allow-Methods', "PUT, POST, DELETE, GET, OPTIONS")
        ->header('Acess-Control-Allow-Headers', "Accept, Authorization, Content-Type");

        return $next($request);
    }
}
