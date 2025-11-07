# Registration Flow Optimization - Implementation Plan

## Current Status Analysis

### ✅ Already Working:
1. Role selection in registration (buyer/seller/breeder)
2. Email verification display in profile screen
3. User table has location columns
4. Google Maps integration exists

### ❌ Needs Fixing:
1. Buyer role logic (both flags should be false) - **FIXED**
2. Profile completion enforcement before listings
3. Plan subscription enforcement before listings
4. Map provider selection (hardcoded Google Maps)
5. Puppy listing management (needs new controller)
6. Location in puppy form

---

## Implementation Tasks

### Phase 1: Registration & Role Logic ✅
- [x] Fix buyer role to set both is_seller and is_breeder to false
- [ ] Verify role selection flow works correctly

### Phase 2: Profile Completion Enforcement
- [ ] Add middleware/check to enforce profile completion
- [ ] Update profile completion logic
- [ ] Add redirects when trying to list without profile completion
- [ ] Update profile screen to show completion status

### Phase 3: Plan Subscription Enforcement
- [ ] Add middleware/check to enforce plan subscription for sellers/breeders
- [ ] Update plan checks in listing routes
- [ ] Add redirects to plan pages when needed
- [ ] Update validation based on plan limits

### Phase 4: Puppy Listing Management
- [ ] Create PuppyListingController
- [ ] Create new routes for puppy listing
- [ ] Move puppy create form to separate page
- [ ] Create PuppyListingForm component
- [ ] Update validation based on subscription

### Phase 5: Map Integration
- [ ] Add MAP_PROVIDER env variable
- [ ] Create MapProvider service/helper
- [ ] Update MapInput component to support both Google Maps and OpenStreetMap
- [ ] Update geocode API endpoints to support both providers
- [ ] Add location fields to puppy form

### Phase 6: Location in Forms
- [ ] Keep location in seller/breeder forms (user table has columns)
- [ ] Add location to puppy create form
- [ ] Default to user location, allow override

---

## Detailed Implementation Steps

### Step 1: Fix Registration Flow
**File: `app/Http/Controllers/Auth/RegisteredUserController.php`**
- ✅ Ensure buyer sets both flags to false
- Update redirect logic after registration

### Step 2: Profile Completion Enforcement
**Files to Update:**
- `app/Http/Middleware/EnsureProfileCompleted.php` (new)
- `app/Http/Controllers/SellerController.php`
- `app/Http/Controllers/ProfileController.php`
- Routes file

**Logic:**
- Check `profile_completed` flag
- If false, redirect to profile completion
- Show completion status in profile screen

### Step 3: Plan Enforcement
**Files to Update:**
- `app/Http/Middleware/EnsureHasPlan.php` (new)
- `app/Http/Controllers/SellerController.php`
- Routes file

**Logic:**
- For sellers/breeders, check if they have active plan
- If no plan, redirect to plans page
- Enforce listing limits based on plan

### Step 4: Create PuppyListingController
**New Files:**
- `app/Http/Controllers/PuppyListingController.php`
- `resources/js/Pages/PuppyListing/Create.tsx`
- `resources/js/Pages/PuppyListing/Edit.tsx`
- `resources/js/Components/Forms/PuppyListingForm.tsx`

**Routes:**
- GET `/puppies/create` - Show create form
- POST `/puppies` - Store new puppy
- GET `/puppies/{id}/edit` - Show edit form
- PUT `/puppies/{id}` - Update puppy
- DELETE `/puppies/{id}` - Delete puppy

### Step 5: Map Provider Support
**Files to Update:**
- `.env.example` - Add MAP_PROVIDER
- `config/services.php` - Add map provider config
- `resources/js/Components/MapInput.tsx` - Support both providers
- `routes/api.php` - Update geocode endpoints

**Map Providers:**
- Google Maps (existing)
- OpenStreetMap (new - using Leaflet or similar)

### Step 6: Location in Puppy Form
**Files to Update:**
- `resources/js/Components/Forms/PuppyListingForm.tsx`
- `app/Http/Requests/PuppyListingRequest.php` (new)
- `app/Models/Puppy.php` - Add location columns if needed
- Migration for puppy location fields

---

## Database Changes Needed

### Puppies Table
- Add location columns (if not exists):
  - `location_city` (string, nullable)
  - `location_state` (string, nullable)
  - `location_zip_code` (string, nullable)
  - `location_address` (text, nullable)
  - `location_lat` (decimal, nullable)
  - `location_lng` (decimal, nullable)

---

## Environment Variables

Add to `.env`:
```
MAP_PROVIDER=google  # or 'openstreetmap'
GOOGLE_MAPS_KEY=your_key_here
```

---

## Route Changes

### New Routes:
```php
// Puppy Listing Routes
Route::get('/puppies/create', [PuppyListingController::class, 'create'])
    ->middleware(['auth', 'verified', 'profile.completed', 'has.plan'])
    ->name('puppies.create');
Route::post('/puppies', [PuppyListingController::class, 'store'])
    ->middleware(['auth', 'verified', 'profile.completed', 'has.plan'])
    ->name('puppies.store');
Route::get('/puppies/{id}/edit', [PuppyListingController::class, 'edit'])
    ->middleware(['auth', 'verified', 'profile.completed', 'has.plan'])
    ->name('puppies.edit');
Route::put('/puppies/{id}', [PuppyListingController::class, 'update'])
    ->middleware(['auth', 'verified', 'profile.completed', 'has.plan'])
    ->name('puppies.update');
Route::delete('/puppies/{id}', [PuppyListingController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('puppies.destroy');
```

### Middleware:
- `profile.completed` - Check if profile is completed
- `has.plan` - Check if user has active plan (for sellers/breeders)

---

## Next Steps

1. Create middleware for profile completion
2. Create middleware for plan enforcement
3. Create PuppyListingController
4. Update map component
5. Add location to puppy form
6. Update routes
7. Test the flow


