<?php

namespace Database\Seeders;

use App\Models\Generation;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database with demo/client user and exact 2 invoices (€2500, €1300).
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'client@noirdrop.co.uk'],
            [
                'name' => 'Alexander',
                'surname' => 'Wright',
                'password' => bcrypt('Password123!'),
                'phone_number' => '+44 20 7946 0958',
                'date_of_birth' => '1988-06-14',
                'street_address' => '221B Baker Street, Flat 4',
                'city' => 'London',
                'country' => 'United Kingdom',
                'postal_code' => 'NW1 6XE',
                'terms_accepted_at' => Carbon::now()->subDays(15),
                'tokens_balance' => 3800,
            ]
        );

        // Delete existing payments for clean slate
        Payment::where('user_id', $user->id)->delete();

        // 1. First Invoice: €2,500.00
        Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Pro Merchant Enterprise Suite (2,500 Drops)',
            'amount' => 2500.00,
            'currency' => 'EUR',
            'gateway_reference' => 'INV-2026-2500-HD89',
            'status' => 'paid',
            'tokens_added' => 2500,
            'tokens_balance_after' => 2500,
            'created_at' => Carbon::now()->subDays(14)->setTime(10, 15, 0),
            'updated_at' => Carbon::now()->subDays(14)->setTime(10, 15, 0),
        ]);

        // 2. Second Invoice: €1,300.00
        Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Growth Brand Package (1,300 Drops)',
            'amount' => 1300.00,
            'currency' => 'EUR',
            'gateway_reference' => 'INV-2026-1300-HD42',
            'status' => 'paid',
            'tokens_added' => 1300,
            'tokens_balance_after' => 3800,
            'created_at' => Carbon::now()->subDays(3)->setTime(14, 30, 0),
            'updated_at' => Carbon::now()->subDays(3)->setTime(14, 30, 0),
        ]);

        // Sample generation
        if (Generation::where('user_id', $user->id)->count() === 0) {
            Generation::create([
                'user_id' => $user->id,
                'input_prompt' => 'Daft Punk - Random Access Memories (180g Vinyl 2LP)',
                'seo_title' => 'Daft Punk: Random Access Memories (180g Audiophile Vinyl 2LP Edition)',
                'description' => '<p>Experience Daft Punk\'s iconic masterpiece <b>Random Access Memories</b> in crisp, analog warmth. Pressed on heavy 180-gram dual vinyl for supreme acoustic depth.</p><p>Featuring timeless classics like <i>"Get Lucky"</i> and <i>"Instant Crush"</i>, this gatefold release represents the pinnacle of modern disco engineering.</p><p>A must-have centerpiece for audiophiles and vinyl collectors worldwide.</p>',
                'features_json' => [
                    'Audiophile 180g Heavyweight Vinyl: Premium pressing for maximum acoustic fidelity.',
                    'Deluxe Gatefold Packaging: Includes full-color lyric booklet & protective inner sleeves.',
                    'Grammy-Winning Album: Featuring Pharrell Williams, Julian Casablancas, and Giorgio Moroder.',
                    'Instant Analog Warmth: Mastered directly for vinyl playback.'
                ],
                'social_copy' => "Spinning perfection tonight. 🎶 Daft Punk's Random Access Memories on 180g vinyl hits different. Pure analog warmth. 📀✨\n\nGet your 2LP gatefold edition now before it sells out! Link in bio. 📦🚀\n\n#DaftPunk #VinylCollection #NowSpinning #Audiophile #Noirdrop",
            ]);
        }
    }
}
