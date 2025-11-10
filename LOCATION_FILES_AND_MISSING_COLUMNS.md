# Location Information Files & Missing Columns Report

## 📁 Files That Use Location Information

### Backend Controllers (PHP)

1. **`app/Http/Controllers/BreederController.php`**
   - **Lines:** 50, 64, 90-110, 147-193
   - **Uses:**
     - `company_lat`, `company_lng` ⚠️ (MISSING from migrations)
     - `company_address`, `company_city`, `company_street`
     - `company_state`, `company_short_state`, `company_zip_code`
     - `company_state_id`
     - `location_lat`, `location_lng`, `location_address`, `location_city`, `location_street`, `location_state`, `location_short_state`, `location_zip_code` (form fields)
     - `gmap_payload` (backward compatibility)
     - `lat`, `lng`, `gmap_address`, `city`, `state`, `zip_code` (fallback)

2. **`app/Http/Controllers/SellerController.php`**
   - **Lines:** 58-67, 122-172
   - **Uses:**
     - `lat`, `lng`, `gmap_address`, `city`, `street`, `state`, `short_state`, `zip_code`, `state_id`
     - `location_lat`, `location_lng`, `location_address`, `location_city`, `location_street`, `location_state`, `location_short_state`, `location_zip_code` (form fields)
     - `gmap_payload` (backward compatibility)

3. **`app/Http/Controllers/PuppyListingController.php`**
   - **Lines:** 35-44, 70-79, 203-238
   - **Uses:**
     - `lat`, `lng`, `gmap_address`, `city`, `street`, `state`, `short_state`, `zip_code`, `state_id`
     - `location_*` form fields for puppies

4. **`app/Http/Controllers/PuppyListingController.php`** (for puppies table)
   - Uses location fields for individual puppy locations

### Backend Requests (PHP)

5. **`app/Http/Requests/BreederRegistrationRequest.php`**
   - **Lines:** 27, 56-63, 79
   - **Validates:**
     - `location_lat`, `location_lng`, `location_address`, `location_city`, `location_street`, `location_state`, `location_short_state`, `location_zip_code`
     - `gmap_payload` (backward compatibility)

6. **`app/Http/Requests/SellerRegistrationRequest.php`**
   - **Lines:** 35, 44-51, 54
   - **Validates:**
     - `location_lat`, `location_lng`, `location_address`, `location_city`, `location_street`, `location_state`, `location_short_state`, `location_zip_code`
     - `zip_code`
     - `gmap_payload` (backward compatibility)

7. **`app/Http/Requests/PuppyListingRequest.php`**
   - **Lines:** 43-50
   - **Validates:** `location_*` fields for puppies

8. **`app/Http/Requests/ProfileUpdateRequest.php`**
   - **Line:** 31
   - **Validates:** `gmap_payload`

### Frontend Components (TypeScript/React)

9. **`resources/js/Components/Forms/BreederRegistrationForm.tsx`**
   - **Lines:** 26-40, 47, 60-75, 83-94, 218-308
   - **Uses:**
     - `company_lat`, `company_lng` ⚠️ (accessed via `(user as any)`)
     - `company_address`, `company_city`, `company_street`, `company_state`, `company_short_state`, `company_zip_code`
     - `location_*` form fields
     - `initialLocation` from `defaultLocation` prop

10. **`resources/js/Components/Forms/SellerRegistrationForm.tsx`**
    - **Lines:** 89-103, 108-128, 159-171, 267-357
    - **Uses:**
      - `lat`, `lng`, `gmap_address`, `city`, `street`, `state`, `short_state`, `zip_code`
      - `location_*` form fields
      - `initialLocation` from `defaultLocation` prop

11. **`resources/js/Pages/Profile/Partials/AccountSettings/UserProfile.tsx`**
    - **Lines:** 20, 26-28, 52-57, 63, 75, 147-150
    - **Uses:**
      - `company_address`, `company_city`, `company_state`, `company_zip_code`
      - `gmap_address`
      - `gmap_payload`

### Map Components (TypeScript/React)

12. **`resources/js/Components/Map/GoogleMapInput.tsx`**
    - **Lines:** 12-13, 27-28, 36, 40, 59-61, 89-91, 135, 144-145, 157, 160-162, 176, 195-196, 224-225, 233-234, 269-270, 350, 353-355, 371
    - **Uses:** `lat`, `lng` for map coordinates

13. **`resources/js/Components/Map/MapboxMapInput.tsx`**
    - **Lines:** 18-19, 33-34, 42, 45, 76-78, 95-97, 143-144, 157-158, 174, 194-195, 221-222, 237-238, 286, 305
    - **Uses:** `lat`, `lng` for map coordinates

14. **`resources/js/Components/Map/OpenStreetMapInput.tsx`**
    - **Lines:** 17-18, 32-33, 41, 44, 75-77, 92, 117-118, 131-132, 151-152, 173-174, 200-201, 216-217, 260, 276
    - **Uses:** `lat`, `lng` for map coordinates

15. **`resources/js/Components/Map/MapInput.tsx`** (wrapper component)
    - Uses location data structure

### Models (PHP)

16. **`app/Models/User.php`**
    - **Lines:** 55-56, 60, 66, 70, 72-75, 86-95
    - **Fillable fields:**
      - `state_id`, `city_id`, `zip_code`, `city`, `company_state_id`, `company_city_id`, `company_city`, `company_zip_code`
      - `lat`, `lng`, `state`, `short_state`, `street`, `company_street`, `company_state`, `company_short_state`
      - `gmap_address`, `gmap_id`
      - `company_address` (in fillable)
      - ⚠️ **MISSING:** `company_lat`, `company_lng` (NOT in fillable array)
    - **Relationships:**
      - `state()` - belongsTo State
      - `company_state()` - belongsTo State (via company_state_id)
    - **Accessors:**
      - `getAddressAttribute()` - uses `city`, `short_state`, `state`, `gmap_address`
      - `getShortAddressAttribute()` - uses `short_state`, `city`, `company_short_state`, `company_city`

---

## ❌ Missing Columns from Migrations

### Critical Missing Columns

1. **`company_lat`** ⚠️ **CRITICAL**
   - **Used in:** `BreederController.php` (lines 96, 153, 192)
   - **Used in:** `BreederRegistrationForm.tsx` (line 29)
   - **Status:** Used in code but **NOT in any migration**
   - **Type:** Should be `decimal(10, 8)` (same as `lat`)
   - **Impact:** Will cause database errors when trying to save breeder location

2. **`company_lng`** ⚠️ **CRITICAL**
   - **Used in:** `BreederController.php` (lines 99, 154, 193)
   - **Used in:** `BreederRegistrationForm.tsx` (line 30)
   - **Status:** Used in code but **NOT in any migration**
   - **Type:** Should be `decimal(11, 8)` (same as `lng`)
   - **Impact:** Will cause database errors when trying to save breeder location

### Missing from Fillable Array (but exist in migrations)

3. **`company_lat`** - Not in `$fillable` array in `User.php`
4. **`company_lng`** - Not in `$fillable` array in `User.php`

---

## ✅ Existing Columns in Migrations

### Personal/Seller Location (All Exist)
- ✅ `state_id` - Migration: `2024_10_11_020845_add_state_field_in_users_table.php`
- ✅ `city_id` - Migration: `2024_10_11_020845_add_state_field_in_users_table.php`
- ✅ `zip_code` - Migration: `2024_10_11_020845_add_state_field_in_users_table.php`
- ✅ `city` - Migration: `2025_01_31_160706_add_field_to_users_table.php`
- ✅ `lat` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ✅ `lng` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ✅ `state` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ✅ `short_state` - Migration: `2025_02_19_003311_add_short_state_field_in_users.php`
- ✅ `street` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ✅ `gmap_address` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ✅ `gmap_id` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`

### Company/Breeder Location (Most Exist)
- ✅ `company_address` - Migration: `2024_11_27_193312_company_details_in_users.php`
- ✅ `company_city` - Migration: `2025_01_10_025759_add_company_breeder_fields_in_users_table.php`
- ✅ `company_city_id` - Migration: `2025_01_10_025759_add_company_breeder_fields_in_users_table.php`
- ✅ `company_state` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ✅ `company_short_state` - Migration: `2025_02_19_003311_add_short_state_field_in_users.php`
- ✅ `company_state_id` - Migration: `2025_01_10_025759_add_company_breeder_fields_in_users_table.php` (modified in `2025_02_04_101936_change_company_state_id_in_users.php`)
- ✅ `company_zip_code` - Migration: `2025_01_10_025759_add_company_breeder_fields_in_users_table.php`
- ✅ `company_street` - Migration: `2025_02_19_003310_add_gmaps_field_in_users.php`
- ❌ `company_lat` - **MISSING** - No migration found
- ❌ `company_lng` - **MISSING** - No migration found

---

## 🔧 Required Fixes

### 1. Create Migration for Missing Columns

```php
// database/migrations/YYYY_MM_DD_HHMMSS_add_company_lat_lng_to_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('company_lat', 10, 8)->nullable()->after('company_street');
            $table->decimal('company_lng', 11, 8)->nullable()->after('company_lat');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['company_lat', 'company_lng']);
        });
    }
};
```

### 2. Update User Model Fillable Array

Add to `app/Models/User.php` in the `$fillable` array:

```php
'company_lat',
'company_lng',
```

---

## 📊 Summary

- **Total files using location:** 16 files
- **Missing columns:** 2 (`company_lat`, `company_lng`)
- **Files affected by missing columns:** 2 (BreederController.php, BreederRegistrationForm.tsx)
- **Criticality:** HIGH - Will cause database errors when saving breeder registrations

