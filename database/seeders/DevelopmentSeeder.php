<?php

namespace Database\Seeders;

use App\Models\Breed;
use App\Models\Puppy;
use App\Models\State;
use App\Models\User;
use Exception;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class DevelopmentSeeder extends Seeder
{
    /*     Free Account */
    /* 3 days free */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */

    /* Standard Package */
    /* $24.99 per month */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */

    /* Premium Package */
    /* $69.99 Quarterly */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */
    /* Appear on feature listing */

    /* Breeder Special */
    /* $179.99 Annually */
    /* Unlimited post */
    /* Upload up to 10 listing */
    /* 5 images per listing */
    /* 1 video per listing */
    /* Appear on feature listing */

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $stateAbbreviations = [
            'Alabama' => 'AL',
            'Alaska' => 'AK',
            'American Samoa' => 'AS',
            'Arizona' => 'AZ',
            'Arkansas' => 'AR',
            'California' => 'CA',
            'Colorado' => 'CO',
            'Connecticut' => 'CT',
            'Delaware' => 'DE',
            'District of Columbia' => 'DC',
            'Florida' => 'FL',
            'Georgia' => 'GA',
            'Guam' => 'GU',
            'Hawaii' => 'HI',
            'Idaho' => 'ID',
            'Illinois' => 'IL',
            'Indiana' => 'IN',
            'Iowa' => 'IA',
            'Kansas' => 'KS',
            'Kentucky' => 'KY',
            'Louisiana' => 'LA',
            'Maine' => 'ME',
            'Maryland' => 'MD',
            'Massachusetts' => 'MA',
            'Michigan' => 'MI',
            'Minnesota' => 'MN',
            'Mississippi' => 'MS',
            'Missouri' => 'MO',
            'Montana' => 'MT',
            'Nebraska' => 'NE',
            'Nevada' => 'NV',
            'New Hampshire' => 'NH',
            'New Jersey' => 'NJ',
            'New Mexico' => 'NM',
            'New York' => 'NY',
            'North Carolina' => 'NC',
            'North Dakota' => 'ND',
            'Ohio' => 'OH',
            'Oklahoma' => 'OK',
            'Oregon' => 'OR',
            'Pennsylvania' => 'PA',
            'Puerto Rico' => 'PR',
            'Rhode Island' => 'RI',
            'South Carolina' => 'SC',
            'South Dakota' => 'SD',
            'Tennessee' => 'TN',
            'Texas' => 'TX',
            'Utah' => 'UT',
            'Vermont' => 'VT',
            'Virginia' => 'VA',
            'Washington' => 'WA',
            'West Virginia' => 'WV',
            'Wisconsin' => 'WI',
            'Wyoming' => 'WY',
        ];

        // Retrieve all states and update abbreviations
        State::all()->each(function ($state) use ($stateAbbreviations) {
            if (isset($stateAbbreviations[$state->name])) {
                $state->abbreviation = $stateAbbreviations[$state->name];
                $state->save();
            }
        });

        $this->call(MediaTableSeeder::class);
        $this->call(RoleSeeder::class);
        /* $this->call(BreedsTableSeeder::class); */
        $this->call(PlanSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(PuppyPatternsSeeder::class);
        $this->call(PuppyColorsSeeder::class);
        Artisan::call('media-library:clean');

        /* $this->call(CountryStateCityTableSeeder::class); */
        // Create admin user if not exists
        if (! User::where('email', 'admin@urpuppy.com')->exists()) {
            $user = User::factory()->create([
                'first_name' => 'Yinka',
                'last_name' => 'Admin',
                'email' => 'admin@urpuppy.com',
                'password' => bcrypt('urpuppy12346'),
            ]);

            $user->assignRole('super_admin');
        }

        $this->call(NavigationSeeder::class);
        $this->call(CustomPageSeeder::class);

        DB::statement('ALTER SEQUENCE media_id_seq RESTART WITH 1000');

        Breed::factory()->times(10)->create();
        /* Puppy */

        /* $users = collect(); */
        /* for ($i = 0; $i < 4; $i++) { */
        /*     $users->push(User::factory()->create([ */
        /*         'id' => rand(10000000, 99999999), */
        /*         'is_breeder' => true, */
        /*     ])); */
        /* } */

        /* dd($users); */
        $users = User::factory()->times(4)->create([
            'is_breeder' => true,
        ]);

        $users->each(function ($user) {
            Puppy::factory()->times(4)->create([
                'user_id' => $user->id,
            ]);
        });

        $this->call(WorldSeeder::class);

        // Use try-catch for BreedSeeder
        /* try { */
        /* Artisan::call('fetch:breeds'); */
        /* Artisan::call('add-slug'); */
        /* } catch (Exception $e) { */
        /*     report($e); */
        /* } */

    }

    private function getDogCollections(): array
    {
        return [
            'pomeranian' => $this->getPomeranianImages(),
            'golden retriever' => $this->getGoldenRetrieverImages(),
            'chow chow' => $this->getChaoImages(),
            'siberian husky' => $this->getHuskyImages(),
            'dalmatian' => $this->getDalmatianImages(),
            'bulldog' => $this->getBulldogImages(),
        ];
    }

    private function getRandomGender(array $genders): string
    {
        return $genders[array_rand($genders)];
    }

    private function getRandomNameByGender(string $gender): string
    {
        return $gender === 'male'
            ? $this->getRandomMaleName()
            : $this->getRandomFemaleName();
    }

    private function getPomeranianImages(): array
    {
        return [
            'https://plus.unsplash.com/premium_photo-1719177518229-79d47d45d49a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1687702563085-2f550461f24c?q=80&w=2368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1526579903323-327e1c2d0b27?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1717857017551-e58d39a3beec?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1578900194624-e52cd16da379?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1683212424755-9d08db98738c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1719177518277-9bf8126b277d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1536187422607-7d9bfde01640?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1717857017427-d77c6250c79f?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1558236588-e3bc00ea77fe?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1719177518916-db8bd664c035?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1636733008726-9c8b41059c86?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1683212402719-4403b2ea1b87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1590209354901-93ec5731b9ec?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1558236851-e043ba5ecd76?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1717857017406-12c9274ff741?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ];

    }

    private function getGoldenRetrieverImages(): array
    {
        return [
            'https://images.unsplash.com/photo-1592769255412-dbce67b8c064?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1661762996172-769883b668e1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1614339548353-d8e9e871ad43?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1708983589924-0addfb3946e6?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1661762997423-9cac9932f781?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1701587444289-d58fb531f168?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1675543873080-5c78c8ae4962?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1611003229186-80e40cd54966?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1555983312-96595d3737eb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1708983591009-3a8a332181d9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1708983590492-45d23eaf5534?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1708983589800-ac947e7f8a0e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        ];

        return [/* ... URLs ... */];
    }

    private function getChaoImages(): array
    {
        return [
            'https://images.unsplash.com/photo-1496303855555-5a009ec2487f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1667080799488-3fa8fe75cdd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1660508344047-d535438fc3fa?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1592819823592-cca15f3140d9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1690066787006-e10d8e7363f3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1589497091613-2b1d0c1ac9b4?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1560931204-7572b8c5cd8d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1637806487219-890a2ea1bcde?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1569263321605-c70cb08d1d68?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1456081445129-830eb8d4bfc6?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1532102210476-521a2bb3a4f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1568937473534-5e6e27531ac9?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        ];

        return [/* ... URLs ... */];
    }

    private function getHuskyImages(): array
    {
        return [
            'https://images.unsplash.com/photo-1682073177089-9526a4758455?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1682073177743-0f1c36d568fe?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1715213352213-2ecde1f4279a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1536239742832-f20229b8ae75?q=80&w=1574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1681882526882-c2da94c47783?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1675763079943-2285c5110d64?q=80&w=1589&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1661629426584-b0b4a51c93b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1571006473030-0036fa5e5ca2?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1543554618-7e19c5e393d9?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1543556153-5e59781a98dc?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1512544783971-fb9a0691eda5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1589460836891-ed5e69a574bd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1613503866018-d33e083d556a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1613503866018-d33e083d556a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1571454054380-1ba19b50a596?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1514730206490-dcb94a491ded?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1585161089674-10bef9c6c91d?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1574273443477-87bf272e5100?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1614005920677-ed9b298c3a28?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ];

        return [/* ... URLs ... */];
    }

    private function getDalmatianImages(): array
    {

        return [
            'https://images.unsplash.com/photo-1532022160153-7735cd049992?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1597079293564-90cd77f09299?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1663608554500-655826685484?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1562771968-460f99cf25e5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1562771968-a70d17a93823?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ];

        return [/* ... URLs ... */];
    }

    private function getBulldogImages(): array
    {
        return [
            'https://images.unsplash.com/photo-1623326658286-c644d242fe1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1521907236370-15adf2297445?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1456534231849-7d5fcd82d77b?q=80&w=1629&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1508807226959-28bb47d71ab0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1526634299478-8a7f03ae50dd?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1688091707034-7336cf0d6519?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1723843095320-c5eedd1b1ab5?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1725041428746-a61ef11ef5c6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1699592854133-25c24959d60f?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1500197945665-d4fe4e862e59?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1614633833026-0820552978b6?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1703136686959-d6e53e9fab46?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1703136678192-53fda2c5c602?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1521309569781-7bcd429eb2f6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1668127910231-1e24ce4f90cc?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1552404448-ac4574026ee7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1440484058382-90d25a76b879?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ];

        return [/* ... URLs ... */];
    }

    private function getRandomMaleName(): string
    {
        $names = [
            'Max',
            'Buddy',
            'Charlie',
            'Jack',
            'Cooper',
            'Rocky',
            'Toby',
            'Tucker',
            'Jake',
            'Bear',
            'Duke',
            'Teddy',
            'Oliver',
            'Riley',
            'Bailey',
            'Bentley',
            'Milo',
            'Buster',
            'Cody',
            'Dexter',
            'Winston',
            'Murphy',
            'Leo',
            'Lucky',
            'Oscar',
            'Louie',
            'Zeus',
            'Henry',
            'Sam',
            'Harley',
            'Baxter',
            'Gus',
            'Sammy',
            'Jackson',
            'Bruno',
            'Diesel',
            'Jax',
            'Gizmo',
            'Bandit',
            'Rusty',
            'Marley',
            'Jasper',
            'Brody',
            'Roscoe',
            'Hank',
            'Otis',
            'Bo',
            'Joey',
            'Beau',
            'Ollie',
            'Tank',
            'Shadow',
            'Peanut',
            'Hunter',
            'Scout',
            'Blue',
            'Rocco',
            'Simba',
            'Tyson',
            'Ziggy',
            'Boomer',
            'Romeo',
            'Apollo',
            'Ace',
            'Luke',
            'Rex',
            'Finn',
            'Chance',
            'Rudy',
            'Loki',
            'Moose',
            'George',
            'Samson',
            'Coco',
            'Benny',
            'Thor',
            'Rufus',
            'Prince',
            'Chester',
            'Brutus',
            'Scooter',
            'Chico',
            'Spike',
            'Gunner',
            'Sparky',
            'Mickey',
            'Kobe',
            'Chase',
            'Oreo',
            'Frankie',
            'Mac',
            'Benji',
            'Bubba',
            'Champ',
            'Brady',
            'Elvis',
            'Copper',
            'Cash',
            'Archie',
            'Walter',

        ];

        return $names[array_rand($names)];
    }

    private function getRandomFemaleName(): string
    {
        $names = [
            'Bella',
            'Lucy',
            'Daisy',
            'Molly',
            'Lola',
            'Sophie',
            'Sadie',
            'Maggie',
            'Chloe',
            'Bailey',
            'Roxy',
            'Zoey',
            'Lily',
            'Luna',
            'Coco',
            'Stella',
            'Gracie',
            'Abby',
            'Penny',
            'Zoe',
            'Ginger',
            'Ruby',
            'Rosie',
            'Lilly',
            'Ellie',
            'Mia',
            'Sasha',
            'Lulu',
            'Pepper',
            'Nala',
            'Lexi',
            'Lady',
            'Emma',
            'Riley',
            'Dixie',
            'Annie',
            'Maddie',
            'Piper',
            'Princess',
            'Izzy',
            'Maya',
            'Olive',
            'Cookie',
            'Roxie',
            'Angel',
            'Belle',
            'Layla',
            'Missy',
            'Cali',
            'Honey',
            'Millie',
            'Harley',
            'Marley',
            'Holly',
            'Kona',
            'Shelby',
            'Jasmine',
            'Ella',
            'Charlie',
            'Minnie',
            'Willow',
            'Phoebe',
            'Callie',
            'Scout',
            'Katie',
            'Dakota',
            'Sugar',
            'Sandy',
            'Josie',
            'Macy',
            'Trixie',
            'Winnie',
            'Peanut',
            'Mimi',
            'Hazel',
            'Mocha',
            'Cleo',
            'Hannah',
            'Athena',
            'Lacey',
            'Sassy',
            'Lucky',
            'Bonnie',
            'Allie',
            'Brandy',
            'Sydney',
            'Casey',
            'Gigi',
            'Baby',
            'Madison',
            'Heidi',
            'Sally',
            'Shadow',
            'Cocoa',
            'Pebbles',
            'Misty',
            'Nikki',
            'Lexie',
            'Grace',
            'Sierra',
        ];

        return $names[array_rand($names)];
    }
}
