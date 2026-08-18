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
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
