<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Role::create(['name' => 'super_admin', 'guard_name' => 'web']);
        Role::create(['name' => 'buyer', 'guard_name' => 'web']);
        Role::create(['name' => 'seller', 'guard_name' => 'web']);
        Role::create(['name' => 'author', 'guard_name' => 'web']);
        Role::create(['name' => 'breeder', 'guard_name' => 'web']);
    }
}
