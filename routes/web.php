<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\BreederController;
use App\Http\Controllers\BreederListingController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PuppyController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SavedSearchController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UpgradeCheckoutController;
use App\Http\Controllers\UpgradePlanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\EncryptHistoryMiddleware;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about-us', [AboutController::class, 'index'])->name('about.index');
Route::get('/contact-us', [ContactController::class, 'index']);
Route::post('/contact-us', [ContactController::class, 'store']);
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'index']);
Route::get('/terms-of-use', [PrivacyPolicyController::class, 'terms']);

Route::get('/ui/{path?}', function ($path = null) { 
    $storybookPath = public_path(); 
    $filePath = $storybookPath.($path ? '/'.$path : '/index.html'); 
    if (! file_exists($filePath)) {
        abort(404);
    } 
    return response()->file($filePath); 
})->where('path', '.*');

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');
Route::post('/posts/{id}/comment', [PostController::class, 'comment'])->name('posts.comment');

Route::get('/all-puppies/{slug}', [SellerController::class, 'show'])->name('seller.show');
Route::get('/puppies', [PuppyController::class, 'index'])->name('puppies.index');
Route::get('/puppies/{slug}', [PuppyController::class, 'show'])->name('puppies.show');
Route::post('/report/{slug}', [ReportController::class, 'store']);

Route::get('/breeds', [BreedController::class, 'index'])->name('breeds.index');
Route::get('/breeds/{slug}', [BreedController::class, 'show'])->name('breeds.show');

Route::get('/breeders', [BreederController::class, 'index'])->name('breeders.index');
Route::get('/breeders/{slug}', [BreederController::class, 'show'])->name('breeders.show');

Route::get('/breeder-listings', [BreederListingController::class, 'index'])->name('breeder_listings.index');
Route::get('/breeder-listings/{slug}', [BreederListingController::class, 'show'])->name('breeder_listings.show');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::post('/{postId}/react/{reactionType}', [PostController::class, 'toggleReaction']);

    Route::get('/saved-search', [SavedSearchController::class, 'show']);
    Route::get('/saved-search/{id}', [SavedSearchController::class, 'destroy']);
    Route::post('/saved-search', [SavedSearchController::class, 'store']);

    Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
    Route::get('/plans/breeder', [PlanController::class, 'breeder'])->name('plans.breeder');
    Route::get('/upgrade', [UpgradePlanController::class, 'index']);

    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::delete('/subscriptions', [SubscriptionController::class, 'destroy'])->name('subscriptions.cancel');

    Route::get('/checkout', CheckoutController::class)->name('checkout.pay');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/subscription/success', [CheckoutController::class, 'success'])->name('subscription.success');
    Route::get('/checkout/{plan_id}', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout/complete', [CheckoutController::class, 'complete']);
    Route::get('/checkout/payment-methods', [CheckoutController::class, 'payment_methods'])->name('checkout.payment_methods');

    Route::get('/billing/confirm', [CheckoutController::class, 'confirm'])->name('billing.confirm');
    Route::get('/checkout/change/{plan_id}', [UpgradeCheckoutController::class, 'index'])->name('checkout.upgrade.index');

    Route::get('/billing', [BillingController::class, 'portal'])->name('billing');
    Route::post('/create-intent', [BillingController::class, 'createIntent']);
    Route::post('/complete-subscription', [BillingController::class, 'completeSubscription']);
    Route::post('/breeder/request/retry', [BillingController::class, 'breederRequestRetry']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('profile.destroy.avatar');
    
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::patch('/favorites/{puppy}', FavoriteController::class)->name('favorite.toggle');

    Route::get('/breeder-listings/create', [BreederListingController::class, 'create'])->name('breeder_listings.create');
    Route::post('/breeder-listings', [BreederListingController::class, 'store'])->name('breeder_listings.store');
    Route::put('/breeder-listings', [BreederListingController::class, 'update'])->name('breeder_listings.update');

    Route::get('/breeders/create', [BreederController::class, 'create'])->name('breeders.create');
    Route::post('/breeders', [BreederController::class, 'store'])->name('breeders.store');
    
    Route::get('/seller/create/{id?}', [SellerController::class, 'create'])->name('seller.create');
    Route::delete('/seller/delete/{id?}', [SellerController::class, 'destroy'])->name('seller.delete');
    Route::post('/seller/store', [SellerController::class, 'store'])->name('seller.store');
    Route::post('/seller/update/{id}', [SellerController::class, 'update'])->name('seller.update');

    Route::middleware('verified')->group(function () {
        Route::post('/comment/{seller}', [CommentController::class, 'store'])->name('comment.store');
    });

});

require __DIR__.'/auth.php';
