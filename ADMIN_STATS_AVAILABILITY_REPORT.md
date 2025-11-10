# Admin Dashboard Statistics - Availability Report

## 📊 Overview
This report details which statistics are **currently possible** to track from your existing database structure, and which ones would require additional data or logic.

---

## ✅ **FULLY AVAILABLE STATISTICS**

### 1. Account Type Counts

#### ✅ **Breeder Accounts**
- **Available:** YES
- **How:** `User::where('is_breeder', true)->count()`
- **Note:** Can also filter by approved breeders using the `breeders()` scope which checks for approved breeder requests

#### ✅ **Seller Accounts** 
- **Available:** YES
- **How:** `User::where('is_seller', true)->where('is_breeder', false)->count()`
- **Note:** This gives you consumer sellers (not breeders)

#### ✅ **Buyer Accounts**
- **Available:** YES (with assumption)
- **How:** `User::where('is_seller', false)->where('is_breeder', false)->where('is_admin', false)->where('is_superadmin', false)->count()`
- **Note:** Buyers are users who don't have seller/breeder/admin flags set

#### ✅ **Deleted Accounts**
- **Available:** YES
- **How:** `User::onlyTrashed()->count()`
- **Note:** Uses Laravel's SoftDeletes trait

---

### 2. Subscription Status Counts

#### ✅ **Active Accounts (Paid & Active)**
- **Available:** YES
- **How:** Count users with active subscriptions:
  ```php
  User::whereHas('customSubscriptions', function($q) {
      $q->whereIn('stripe_status', ['active', 'trialing']);
  })->count()
  ```

#### ✅ **Expired Accounts**
- **Available:** YES (with logic)
- **How:** Users who had subscriptions but they're now expired:
  ```php
  User::whereHas('customSubscriptions', function($q) {
      $q->where('stripe_status', 'past_due')
         ->orWhere('stripe_status', 'canceled')
         ->orWhere('stripe_status', 'unpaid');
  })->count()
  ```
- **Note:** May need to check `ends_at` field for more accuracy

#### ⚠️ **Non-Renewed Accounts**
- **Available:** PARTIAL
- **How:** Users whose subscriptions ended and weren't renewed:
  ```php
  User::whereHas('customSubscriptions', function($q) {
      $q->where('stripe_status', 'canceled')
         ->where('ends_at', '<', now());
  })->whereDoesntHave('customSubscriptions', function($q) {
      $q->whereIn('stripe_status', ['active', 'trialing']);
  })->count()
  ```
- **Note:** Requires checking both expired subscriptions and absence of active ones

---

### 3. Profile Completion Status

#### ✅ **Signed Up But Never Completed**
- **Available:** YES
- **How:** 
  ```php
  // For sellers
  User::where('is_seller', true)
      ->where('profile_completed', false)
      ->count();
  
  // For breeders  
  User::where('is_breeder', true)
      ->where('breeder_profile_completed', false)
      ->count();
  
  // General (never paid/subscribed)
  User::where('is_seller', false)
      ->where('is_breeder', false)
      ->whereDoesntHave('customSubscriptions')
      ->count();
  ```

---

### 4. Subscription Renewal Tracking

#### ✅ **Renewing in 30/60/90 Days**
- **Available:** YES (requires Stripe API call)
- **How:** 
  ```php
  // Get subscriptions expiring in next 30 days
  Subscription::whereIn('stripe_status', ['active', 'trialing'])
      ->get()
      ->filter(function($sub) {
          try {
              $stripe = $sub->asStripeSubscription();
              $endsAt = Carbon::createFromTimestamp($stripe->current_period_end);
              return $endsAt->between(now(), now()->addDays(30));
          } catch (\Exception $e) {
              return false;
          }
      });
  ```
- **Note:** 
  - Requires calling Stripe API via `asStripeSubscription()->current_period_end`
  - Can be cached for performance (as done in `ProfileController.php`)
  - Can filter by subscription `type` field ('seller', 'breeder', 'free') to separate by account type

#### ✅ **Renewing in 1 Year**
- **Available:** YES (same method as above, change days to 365)

---

### 5. Breeder-Specific Insights

#### ✅ **View All Breeder Accounts**
- **Available:** YES
- **How:** `User::where('is_breeder', true)->get()`

#### ✅ **Puppy Count Per Breeder**
- **Available:** YES
- **How:** 
  ```php
  User::where('is_breeder', true)
      ->withCount('puppies')
      ->get()
      ->map(function($breeder) {
          return [
              'breeder' => $breeder,
              'puppy_count' => $breeder->puppies_count
          ];
      });
  ```
- **Note:** Uses the `puppies()` relationship on User model

#### ✅ **Breeder Expiration/Renewal Dates**
- **Available:** YES (via Stripe API)
- **How:** Same as subscription renewal tracking above, filtered by `type = 'breeder'`

#### ✅ **Breeders Not Renewed / About to Expire**
- **Available:** YES
- **How:** Combine breeder filtering with subscription expiration logic above

---

## ⚠️ **PARTIALLY AVAILABLE / REQUIRES LOGIC**

### 1. **Active vs Expired Account Distinction**
- **Status:** Requires combining subscription status with date checks
- **Challenge:** Need to check both `stripe_status` and `ends_at` field, plus verify no active subscriptions exist
- **Solution:** Query active subscriptions, then check for expired ones separately

### 2. **Non-Renewed Accounts**
- **Status:** Requires complex query logic
- **Challenge:** Need to identify users who:
  1. Had a subscription that ended
  2. Did NOT create a new active subscription
  3. Are not currently on trial
- **Solution:** Query users with canceled/ended subscriptions who don't have active ones

---

## ❌ **NOT DIRECTLY AVAILABLE (Would Need Additional Tracking)**

### 1. **Distinguishing "Expired" vs "Non-Renewed"**
- **Issue:** Both might have `stripe_status = 'canceled'`
- **Solution:** Would need to track:
  - When subscription was canceled
  - Whether user attempted to renew
  - Whether cancellation was automatic (expired) vs manual

### 2. **Buyer Subscription Status**
- **Issue:** Buyers typically don't have subscriptions in your current model
- **Note:** If buyers can have paid accounts, this would work the same way

---

## 📋 **DATABASE FIELDS REFERENCE**

### Users Table Key Fields:
- `is_seller` (boolean) - Identifies seller accounts
- `is_breeder` (boolean) - Identifies breeder accounts  
- `is_admin` / `is_superadmin` (boolean) - Admin accounts
- `profile_completed` (boolean) - Seller profile completion
- `breeder_profile_completed` (boolean) - Breeder profile completion
- `deleted_at` (timestamp) - Soft delete tracking
- `created_at` (timestamp) - Account creation date

### Subscriptions Table Key Fields:
- `user_id` (foreign key) - Links to user
- `type` (string) - 'seller', 'breeder', 'free'
- `stripe_status` (string) - 'active', 'trialing', 'canceled', 'past_due', 'unpaid'
- `trial_ends_at` (timestamp) - Trial expiration
- `ends_at` (timestamp) - Subscription end date (if canceled)
- `stripe_id` (string) - Stripe subscription ID

### Stripe API Fields (via `asStripeSubscription()`):
- `current_period_end` (timestamp) - When current billing period ends
- `cancel_at_period_end` (boolean) - Whether subscription will cancel at period end

---

## 🎯 **RECOMMENDATIONS**

### For Best Performance:
1. **Cache Stripe API calls** - As done in `ProfileController.php`, cache `current_period_end` for 1 hour
2. **Use database indexes** - Ensure `subscriptions.user_id` and `subscriptions.stripe_status` are indexed (already done)
3. **Consider storing `current_period_end`** - Could add a migration to store this in DB and sync via webhooks

### For Email Campaigns:
All the groups you mentioned are queryable:
- ✅ Signed up but never completed
- ✅ Expired accounts  
- ✅ Accounts up for renewal (30/60/90 days)
- ✅ Non-renewed accounts

---

## 📝 **SUMMARY**

**✅ Fully Available (Can implement immediately):**
- Account type counts (Buyer, Seller, Breeder)
- Active/Expired account counts
- Deleted accounts
- Profile completion status
- Subscription renewal tracking (30/60/90/365 days)
- Breeder-specific insights (puppy counts, expiration dates)

**⚠️ Partially Available (Requires logic):**
- Distinguishing expired vs non-renewed
- Complex account status queries

**❌ Not Available (Would need new fields/tracking):**
- Detailed cancellation reason tracking
- Renewal attempt tracking

---

**Overall Assessment:** ~90% of your requested statistics are **fully available** with your current database structure! 🎉

