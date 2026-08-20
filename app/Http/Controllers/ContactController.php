<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the Contact Us page with dynamic company credentials.
     */
    public function index(): Response
    {
        return Inertia::render('Contact', [
            'companyName' => env('COMPANY_NAME', 'HARTDELL LIMITED'),
            'companyNumber' => env('COMPANY_NUMBER', '16021824'),
            'companyAddress' => env('COMPANY_ADDRESS', 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF'),
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@noirdrop.co.uk'),
        ]);
    }

    /**
     * Handle incoming support ticket submissions.
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:5000',
        ]);

        $recipientEmail = env('MAIL_FROM_ADDRESS', 'support@noirdrop.co.uk');

        try {
            Mail::to($recipientEmail)->send(new ContactMessageMail($validated));
        } catch (\Throwable $e) {
            Log::warning('Contact message mail dispatch failed: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Your support ticket has been submitted successfully! Our B2B executive support team will respond shortly.');
    }
}
