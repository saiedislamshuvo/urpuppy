# Registration Flow & Database Structure Report

## Executive Summary
This report documents the current database structure for Users (Sellers/Breeders) and Puppies, along with the registration flow implementation and how subscription plans affect the registration process.

---

## 1. DATABASE STRUCTURE

### 1.1 USERS TABLE (Sellers & Breeders)

#### Base Columns (from create_users_table)
- `id` (bigint, primary key)
- `first_name` (string)
- `last_name` (string)
- `email` (string, unique)
- `slug` (string, nullable, unique)
- `email_verified_at` (timestamp, nullable)
- `password` (string, nullable)
- `has_federal_license` (boolean, default: false)
- `x_id` (string, nullable, unique) - Social login
- `remember_token` (string)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### Additional Columns (from migrations)

**Profile & Contact Information:**
- `phone` (string, nullable)
- `website` (string, nullable)
- `description` (text, nullable)
- `city` (string, nullable)
- `city_id` (string, nullable)
- `state` (string, nullable)
- `short_state` (string, nullable)
- `state_id` (foreignId, nullable)
- `zip_code` (string, nullable)
- `street` (string, nullable)
- `address` (string, nullable) - Computed/Appended
- `short_address` (string, nullable) - Computed/Appended
- `gmap_address` (string, nullable)
- `gmap_id` (string, nullable)
- `lat` (decimal, nullable)
- `lng` (decimal, nullable)

**Social Media:**
- `social_fb` (string, nullable)
- `social_ig` (string, nullable)
- `social_tiktok` (string, nullable)
- `social_x` (string, nullable)

**Role & Status:**
- `is_seller` (boolean, default: false)
- `is_breeder` (boolean, default: false)
- `is_admin` (boolean, default: false)
- `is_superadmin` (boolean, default: false)
- `profile_completed` (boolean, default: false)
- `breeder_profile_completed` (boolean, default: false)
- `enable_notification` (boolean, default: false)

**Company/Breeder Information:**
- `company_name` (string, nullable)
- `company_address` (string, nullable)
- `company_address_formatted` (string, nullable)
- `company_phone` (string, nullable)
- `company_email_address` (string, nullable)
- `company_about` (text, nullable)
- `company_city` (string, nullable)
- `company_city_id` (string, nullable)
- `company_state` (string, nullable)
- `company_state_id` (string, nullable)
- `company_short_state` (string, nullable)
- `company_zip_code` (string, nullable)
- `company_street` (string, nullable)
- `company_established_on` (date, nullable)
- `kennel_name` (string, nullable)
- `has_usda_registration` (boolean, default: false)

**Billing/Subscription:**
- `stripe_id` (string, nullable)
- `pm_type` (string, nullable)
- `pm_last_four` (string, nullable)
- `trial_ends_at` (timestamp, nullable)

**Other:**
- `type` (string, nullable)
- `love_reacter_id` (bigint, nullable)
- `deleted_at` (timestamp, nullable) - Soft deletes

**Computed/Appended Attributes:**
- `full_name` (computed from first_name + last_name)
- `avatar` (from media library)
- `gallery` (from media library)
- `video` (from media library)
- `member_since` (computed from created_at)
- `has_password` (computed)
- `is_subscribed` (computed)

---

### 1.2 PUPPIES TABLE

#### Base Columns (from create_puppies_table)
- `id` (bigint, primary key)
- `name` (string)
- `slug` (string, nullable)
- `gender` (string)
- `description` (text, nullable)
- `price` (integer)
- `birth_date` (dateTime)
- `is_ready_to_travel` (boolean) - **Note: May be deprecated**
- `user_id` (foreignId) - References users table
- `status` (string, default: 'published')
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### Additional Columns (from migrations)

**Health & Care Certificates:**
- `has_health_certificate` (boolean, default: false)
- `has_vaccine` (boolean, default: false)
- `has_vet_exam` (boolean, default: false)
- `has_travel_ready` (boolean, default: false)
- `has_delivery_included` (boolean, default: false)
- `has_certificate` (boolean, default: false)
- `certificate_type` (string, nullable) - Options: AKC, CKC, Other
- `certificate_document_url` (text, nullable)

**Display & Features:**
- `view_count` (integer, default: 0)
- `is_featured` (boolean, default: false)

**Computed/Appended Attributes:**
- `image` (from media library - first image)
- `images` (from media library - all images)
- `preview_images` (from media library - preview URLs)
- `video` (from media library)
- `thumbnails` (from media library)
- `patterns` (computed from puppy_patterns relationship)
- `age` (computed from birth_date)
- `formatted_price` (computed from price)
- `listed_on` (computed from created_at)
- `short_description` (computed from description)
- `is_favorited_by_current_user` (computed)
- `published_at` (computed from created_at)
- `certificate_document` (from media library - certificates collection)

**Relationships:**
- `breeds` (many-to-many via breed_puppy table)
- `puppy_colors` (many-to-many via color_puppy table)
- `puppy_patterns` (many-to-many via puppy_patterns_puppy table)
- `puppy_traits` (many-to-many via puppy_trait_puppy table)
- `siblings` (many-to-many via puppy_sibling table)
- `seller` (belongs to User)
- `media` (has many - Spatie Media Library)

---

### 1.3 PLANS TABLE

**Columns:**
- `id` (bigint, primary key)
- `name` (string)
- `stripe_plan_id` (string)
- `stripe_product_id` (string, nullable)
- `price` (integer) - in cents
- `order` (integer) - for sorting
- `order_column` (integer) - for sortable trait
- `type` (string) - 'free', 'premium'
- `interval` (string/json) - 'month', 'year'
- `interval_count` (integer, default: 1)
- `trial_days` (integer, default: 0)
- `active` (boolean, default: false)
- `listing_limit` (integer, nullable) - 0 = unlimited
- `image_per_listing` (integer, default: 5)
- `video_per_listing` (integer, default: 1)
- `is_breeder` (boolean, default: false)
- `is_featured` (boolean, default: false)
- `is_highlight` (boolean, default: false)
- `features` (json, nullable) - Array of feature objects
- `badge_title` (string, nullable)
- `badge_color` (string, nullable)
- `savings_label` (string, nullable)
- `is_synced` (boolean, default: false)
- `sync_error` (text, nullable)
- `last_synced_at` (timestamp, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Media:**
- `logo` (from media library)

---

## 2. CURRENT REGISTRATION FLOW

### 2.1 Seller Registration Flow (SellerController::create)

**Access Control:**
1. User must be logged in
2. User must have verified email
3. User must have `is_seller` OR `is_breeder` role

**Breeder-Specific Checks:**
- If user has 'breeder' role but no `breeder_plan`:
  - Check if breeder request is approved
  - Check if kennel_name exists
  - Redirect to plans or breeder registration if not met

**Plan-Based Checks:**
- If user has no premium_plan and puppy_count == 1:
  - Commented out: Redirect to plans page
  - Currently allows creation

**Form Data Provided:**
- `puppy_count` - Current number of puppies
- `puppy_edit` - Puppy data if editing (null if creating)
- `patterns` - Available pattern options
- `breeds` - Available breed options
- `colors` - Available color options
- `siblings` - Available sibling options

---

### 2.2 Puppy Creation Flow (SellerController::store)

**Validation:**
- Uses `SellerRegistrationRequest` validation
- Different rules based on:
  - `puppy_count` (first puppy vs subsequent)
  - User's plan (premium_plan or breeder_plan)
  - `profile_completed` status

**Profile Completion:**
- If `profile_completed == false`:
  - Requires: first_name, last_name, phone, location (gmap_payload)
  - Updates user profile with contact details and location
  - Sets `profile_completed = true`

**Plan-Based Restrictions:**
1. **Listing Limit Check:**
   - Checks: `puppy_count >= plan->listing_limit`
   - If limit reached and limit != 0: Error returned
   - If limit == 0: Unlimited listings

2. **Media Limits:**
   - Images: Limited by `plan->image_per_listing`
   - Videos: Limited by `plan->video_per_listing`
   - Applied in validation rules

**Current Issues:**
- Line 123-125: Plan requirement check is commented out
- Line 153-161: Plan requirement redirect is commented out
- Allows creation even without plan (after first puppy)

**Process:**
1. Validate request data
2. Update user profile if needed
3. Check listing limits
4. Create puppy record
5. Process relationships (breeds, colors, patterns, siblings)
6. Dispatch media processing jobs (images, videos, certificates)
7. Clear cache
8. Return success/error

---

### 2.3 Form Fields by Puppy Count

**First Puppy (puppy_count == 0):**
- **Contact Details Section:**
  - First Name (required)
  - Last Name (required)
  - Email (required)
  - Phone (required)
  - Website (optional)
  - Social Links (optional): Facebook, X, TikTok, Instagram
- **Location Details Section:**
  - Map Input (gmap_payload) - required if profile not completed

**All Puppies:**
- **Puppy Details:**
  - Puppy Name (required)
  - Puppy Price (required, numeric)
  - Gender (required: Male/Female)
  - Date of Birth (required)
  - Puppy Bio (required, min 40 chars)
  - Breeds (required, max 3)
  - Pattern/Coat (required, max 3)
  - Color (required, max 3)
  - Siblings Of (optional, max 10)
- **Why I Stand Out:**
  - Health Certificate (Yes/No)
  - Vaccinated (Yes/No)
  - Vet Exam (Yes/No)
  - Travel Ready (Yes/No)
  - Delivery Included (Yes/No)
  - Certificate (Yes/No) - NEW
- **Certificate Details (Optional):**
  - Certificate Type (dropdown: AKC, CKC, Other)
  - Upload Certificate Document (file upload)
- **Upload Details:**
  - Images (required, max based on plan)
  - Videos (optional, max based on plan)

---

## 3. SUBSCRIPTION PLAN IMPACT

### 3.1 Plan Types

**Free Plan:**
- `type`: 'free'
- `listing_limit`: 3
- `image_per_listing`: 3
- `video_per_listing`: 1
- `trial_days`: 3

**Premium Plans (Silver, Premium, Platinum):**
- `type`: 'premium'
- `listing_limit`: 3, 10, or 0 (unlimited)
- `image_per_listing`: 3, 5, or 10
- `video_per_listing`: 1
- `is_featured`: false (can be enabled)

**Breeder Plans:**
- `type`: 'premium'
- `is_breeder`: true
- `listing_limit`: Varies (often 0 for unlimited)
- Higher media limits

### 3.2 Current Plan Enforcement

**Working:**
- ✅ Listing limit check (line 135-138)
- ✅ Image/video limits in validation
- ✅ Breeder plan requirement check (line 81-91)

**Not Working / Commented Out:**
- ❌ Plan requirement after first puppy (line 123-125)
- ❌ Redirect to plans page after creation (line 153-161)
- ❌ Plan requirement for sellers with 1+ puppies

### 3.3 Plan-Based Features

**Listing Limits:**
- Free: 3 listings
- Silver: 3 listings
- Premium: 10 listings
- Platinum: Unlimited (0 = unlimited)

**Media Limits:**
- Free: 3 images, 1 video
- Silver: 3 images, 1 video
- Premium: 5 images, 1 video
- Platinum: 10 images, 1 video

**Featured Listings:**
- Controlled by `is_featured` on plan
- Currently all plans have `is_featured: false`

---

## 4. ISSUES & INCONSISTENCIES

### 4.1 Registration Flow Issues

1. **Plan Enforcement Incomplete:**
   - Plan requirement checks are commented out
   - Users can create unlimited puppies without plan (after first one)
   - No clear upgrade prompts

2. **Profile Completion Logic:**
   - Profile completion only checked on first puppy
   - No way to update profile later through registration form
   - Location required only if profile not completed

3. **Breeder vs Seller Logic:**
   - Breeders have stricter requirements (kennel_name, approval)
   - Sellers have looser requirements
   - Mixed logic in same controller

4. **Validation Inconsistencies:**
   - Different validation rules based on puppy_count
   - Plan-based validation only in some places
   - Media limits enforced in validation but not always clear

### 4.2 Database Issues

1. **Redundant Fields:**
   - `is_ready_to_travel` in puppies (may be deprecated)
   - Multiple address fields (street, address, gmap_address)
   - Company vs personal address fields overlap

2. **Missing Indexes:**
   - No indexes on frequently queried fields
   - `user_id` on puppies should be indexed
   - `status` on puppies should be indexed

3. **Data Integrity:**
   - No foreign key constraints on some relationships
   - Soft deletes on users but hard deletes on puppies

---

## 5. RECOMMENDATIONS FOR OPTIMIZATION

### 5.1 Registration Flow Optimization

**Phase 1: Plan-Based Registration Gates**
1. Implement clear plan requirement checks
2. Add upgrade prompts when limits reached
3. Show plan benefits during registration
4. Enforce plan requirements consistently

**Phase 2: Progressive Registration**
1. Separate profile completion from puppy creation
2. Allow profile updates independently
3. Show progress indicators
4. Save draft registrations

**Phase 3: Role-Based Flows**
1. Separate seller and breeder registration flows
2. Different validation rules per role
3. Role-specific form fields
4. Clear role selection at start

### 5.2 Database Optimization

**Indexes to Add:**
- `puppies.user_id`
- `puppies.status`
- `puppies.created_at`
- `users.is_seller`
- `users.is_breeder`
- `users.profile_completed`

**Fields to Review:**
- Remove deprecated `is_ready_to_travel`
- Consolidate address fields
- Add indexes for performance

### 5.3 Plan Enforcement Strategy

**Tier 1: Free Users**
- 1 free listing (profile completion required)
- Upgrade prompt after first listing
- Limited media (3 images, 1 video)

**Tier 2: Premium Users**
- Plan-based listing limits
- Plan-based media limits
- Featured listing option

**Tier 3: Breeder Users**
- Unlimited listings (if plan allows)
- Higher media limits
- Breeder-specific features

---

## 6. PROPOSED OPTIMIZATION PLAN

### Phase 1: Immediate Fixes (Week 1)
1. ✅ Uncomment and fix plan requirement checks
2. ✅ Add proper upgrade redirects
3. ✅ Fix listing limit enforcement
4. ✅ Add database indexes

### Phase 2: Flow Improvements (Week 2-3)
1. Separate profile completion flow
2. Add registration progress tracking
3. Implement draft saving
4. Add plan comparison during registration

### Phase 3: Advanced Features (Week 4+)
1. Role-based registration flows
2. Advanced plan features
3. Analytics and tracking
4. A/B testing for conversion

---

## 7. DATA FLOW DIAGRAM

```
User Registration Flow:
┌─────────────────┐
│  User Signs Up  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Email Verified? │──No──→ Verify Email
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Select Role?    │──Seller──→ Seller Flow
│ (Seller/Breeder)│──Breeder─→ Breeder Flow (requires approval)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Profile Complete?│──No──→ Complete Profile (first puppy)
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Has Plan?       │──No──→ Show Plans / Allow 1 Free Listing
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Check Limits    │──Limit Reached──→ Upgrade Prompt
└────────┬────────┘
         │ Within Limits
         ▼
┌─────────────────┐
│ Create Puppy    │
└─────────────────┘
```

---

## 8. SUMMARY

**Current State:**
- Database structure is comprehensive but has some redundancy
- Registration flow works but plan enforcement is incomplete
- Profile completion tied to first puppy creation
- Mixed seller/breeder logic in same controller

**Key Metrics:**
- Users table: ~50+ columns
- Puppies table: ~15+ columns
- Plans table: ~20+ columns
- Registration form: ~30+ fields (varies by puppy_count)

**Priority Actions:**
1. Fix plan enforcement
2. Separate profile completion
3. Add database indexes
4. Implement clear upgrade flows
5. Optimize registration UX

---

*Report Generated: 2025-11-06*
*Last Updated: Based on current codebase analysis*


