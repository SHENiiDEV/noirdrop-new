<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Forbidden countries list specified by compliance rules.
     */
    public const FORBIDDEN_COUNTRIES = [
        'Sudan',
        'Dem. Rep. of the Congo',
        'Democratic Republic of the Congo',
        'Congo (Kinshasa)',
        'Iran',
        'Mali',
        'Myanmar',
        'Myanmar (Burma)',
        'North Korea',
        'Korea, Democratic People\'s Republic of',
        'South Sudan',
        'Syria',
        'Syrian Arab Republic',
        'Yemen',
        'Afghanistan',
        'Belarus',
        'Central African Republic',
        'Cuba',
        'Haiti',
        'Iraq',
        'Russia',
        'Russian Federation',
        'Somalia',
        'Venezuela',
        'Zimbabwe',
    ];

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'forbiddenCountries' => self::FORBIDDEN_COUNTRIES,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|max:50',
            'date_of_birth' => 'required|date|before:today',
            'street_address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => ['required', 'string', Rule::notIn(self::FORBIDDEN_COUNTRIES)],
            'postal_code' => 'required|string|max:30',
            'terms' => 'accepted',
        ], [
            'country.not_in' => 'Registration is not available for the selected country due to regional compliance restrictions.',
            'terms.accepted' => 'You must agree to the Terms & Conditions and Privacy Policy to register.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'date_of_birth' => $request->date_of_birth,
            'street_address' => $request->street_address,
            'city' => $request->city,
            'country' => $request->country,
            'postal_code' => $request->postal_code,
            'terms_accepted_at' => now(),
            'tokens_balance' => 3800,
        ]);

        // Automatically provision 2 client B2B invoices (€2500 and €1300)
        \App\Models\Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Pro Merchant Enterprise Suite (2,500 Drops)',
            'amount' => 2500.00,
            'currency' => 'EUR',
            'gateway_reference' => 'INV-2026-2500-' . strtoupper(\Illuminate\Support\Str::random(4)),
            'status' => 'paid',
            'tokens_added' => 2500,
            'tokens_balance_after' => 2500,
            'created_at' => now()->subDays(14),
            'updated_at' => now()->subDays(14),
        ]);

        \App\Models\Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Growth Brand Package (1,300 Drops)',
            'amount' => 1300.00,
            'currency' => 'EUR',
            'gateway_reference' => 'INV-2026-1300-' . strtoupper(\Illuminate\Support\Str::random(4)),
            'status' => 'paid',
            'tokens_added' => 1300,
            'tokens_balance_after' => 3800,
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ]);

        event(new Registered($user));

        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeUserMail($user));
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('Welcome email dispatch failed: ' . $e->getMessage());
        }

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
