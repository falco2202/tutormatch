<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ChatPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (
            Auth::user() &&  (Auth::user()->role == User::ROLES['ADMIN']
            || Auth::user()->role == User::ROLES['TEACHER'])
        ) {
            return $next($request);
        }
        return response()->apiError(__('messages.unauthorized'), __('messages.unauthorized'), Response::HTTP_FORBIDDEN);
    }
}
