<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use BezhanSalleh\FilamentShield\Support\Utils;
use Spatie\Permission\PermissionRegistrar;

class ShieldSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $rolesWithPermissions = '[{"name":"super_admin","guard_name":"web","permissions":["view_role","view_any_role","create_role","update_role","restore_role","restore_any_role","replicate_role","reorder_role","delete_role","delete_any_role","force_delete_role","force_delete_any_role","view_authentication::log","view_any_authentication::log","create_authentication::log","update_authentication::log","restore_authentication::log","restore_any_authentication::log","replicate_authentication::log","reorder_authentication::log","delete_authentication::log","delete_any_authentication::log","force_delete_authentication::log","force_delete_any_authentication::log","view_author","view_any_author","create_author","update_author","restore_author","restore_any_author","replicate_author","reorder_author","delete_author","delete_any_author","force_delete_author","force_delete_any_author","view_breed","view_any_breed","create_breed","update_breed","restore_breed","restore_any_breed","replicate_breed","reorder_breed","delete_breed","delete_any_breed","force_delete_breed","force_delete_any_breed","view_breeder::request","view_any_breeder::request","create_breeder::request","update_breeder::request","restore_breeder::request","restore_any_breeder::request","replicate_breeder::request","reorder_breeder::request","delete_breeder::request","delete_any_breeder::request","force_delete_breeder::request","force_delete_any_breeder::request","view_category","view_any_category","create_category","update_category","restore_category","restore_any_category","replicate_category","reorder_category","delete_category","delete_any_category","force_delete_category","force_delete_any_category","view_contact","view_any_contact","create_contact","update_contact","restore_contact","restore_any_contact","replicate_contact","reorder_contact","delete_contact","delete_any_contact","force_delete_contact","force_delete_any_contact","view_country","view_any_country","create_country","update_country","restore_country","restore_any_country","replicate_country","reorder_country","delete_country","delete_any_country","force_delete_country","force_delete_any_country","view_discount","view_any_discount","create_discount","update_discount","restore_discount","restore_any_discount","replicate_discount","reorder_discount","delete_discount","delete_any_discount","force_delete_discount","force_delete_any_discount","view_event","view_any_event","create_event","update_event","restore_event","restore_any_event","replicate_event","reorder_event","delete_event","delete_any_event","force_delete_event","force_delete_any_event","view_mail","view_any_mail","create_mail","update_mail","restore_mail","restore_any_mail","replicate_mail","reorder_mail","delete_mail","delete_any_mail","force_delete_mail","force_delete_any_mail","view_permission","view_any_permission","create_permission","update_permission","restore_permission","restore_any_permission","replicate_permission","reorder_permission","delete_permission","delete_any_permission","force_delete_permission","force_delete_any_permission","view_plan","view_any_plan","create_plan","update_plan","restore_plan","restore_any_plan","replicate_plan","reorder_plan","delete_plan","delete_any_plan","force_delete_plan","force_delete_any_plan","view_post","view_any_post","create_post","update_post","restore_post","restore_any_post","replicate_post","reorder_post","delete_post","delete_any_post","force_delete_post","force_delete_any_post","view_puppy","view_any_puppy","create_puppy","update_puppy","restore_puppy","restore_any_puppy","replicate_puppy","reorder_puppy","delete_puppy","delete_any_puppy","force_delete_puppy","force_delete_any_puppy","view_puppy::color","view_any_puppy::color","create_puppy::color","update_puppy::color","restore_puppy::color","restore_any_puppy::color","replicate_puppy::color","reorder_puppy::color","delete_puppy::color","delete_any_puppy::color","force_delete_puppy::color","force_delete_any_puppy::color","view_puppy::pattern","view_any_puppy::pattern","create_puppy::pattern","update_puppy::pattern","restore_puppy::pattern","restore_any_puppy::pattern","replicate_puppy::pattern","reorder_puppy::pattern","delete_puppy::pattern","delete_any_puppy::pattern","force_delete_puppy::pattern","force_delete_any_puppy::pattern","view_puppy::trait","view_any_puppy::trait","create_puppy::trait","update_puppy::trait","restore_puppy::trait","restore_any_puppy::trait","replicate_puppy::trait","reorder_puppy::trait","delete_puppy::trait","delete_any_puppy::trait","force_delete_puppy::trait","force_delete_any_puppy::trait","view_report","view_any_report","create_report","update_report","restore_report","restore_any_report","replicate_report","reorder_report","delete_report","delete_any_report","force_delete_report","force_delete_any_report","view_state","view_any_state","create_state","update_state","restore_state","restore_any_state","replicate_state","reorder_state","delete_state","delete_any_state","force_delete_state","force_delete_any_state","view_subscription","view_any_subscription","create_subscription","update_subscription","restore_subscription","restore_any_subscription","replicate_subscription","reorder_subscription","delete_subscription","delete_any_subscription","force_delete_subscription","force_delete_any_subscription","view_suppression","view_any_suppression","create_suppression","update_suppression","restore_suppression","restore_any_suppression","replicate_suppression","reorder_suppression","delete_suppression","delete_any_suppression","force_delete_suppression","force_delete_any_suppression","view_user","view_any_user","create_user","update_user","restore_user","restore_any_user","replicate_user","reorder_user","delete_user","delete_any_user","force_delete_user","force_delete_any_user","widget_LatestUsersWidget"]}]';
        $directPermissions = '[]';

        static::makeRolesWithPermissions($rolesWithPermissions);
        static::makeDirectPermissions($directPermissions);

        $this->command->info('Shield Seeding Completed.');
    }

    protected static function makeRolesWithPermissions(string $rolesWithPermissions): void
    {
        if (! blank($rolePlusPermissions = json_decode($rolesWithPermissions, true))) {
            /** @var Model $roleModel */
            $roleModel = Utils::getRoleModel();
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($rolePlusPermissions as $rolePlusPermission) {
                $role = $roleModel::firstOrCreate([
                    'name' => $rolePlusPermission['name'],
                    'guard_name' => $rolePlusPermission['guard_name'],
                ]);

                if (! blank($rolePlusPermission['permissions'])) {
                    $permissionModels = collect($rolePlusPermission['permissions'])
                        ->map(fn ($permission) => $permissionModel::firstOrCreate([
                            'name' => $permission,
                            'guard_name' => $rolePlusPermission['guard_name'],
                        ]))
                        ->all();

                    $role->syncPermissions($permissionModels);
                }
            }
        }
    }

    public static function makeDirectPermissions(string $directPermissions): void
    {
        if (! blank($permissions = json_decode($directPermissions, true))) {
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($permissions as $permission) {
                if ($permissionModel::whereName($permission)->doesntExist()) {
                    $permissionModel::create([
                        'name' => $permission['name'],
                        'guard_name' => $permission['guard_name'],
                    ]);
                }
            }
        }
    }
}
