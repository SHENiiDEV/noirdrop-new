<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Demo Merchant',
            'email' => 'demo@noirdrop.com',
            'password' => bcrypt('password'),
            'tokens_balance' => 10,
        ]);

        \App\Models\Generation::create([
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
