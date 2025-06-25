<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\BreederController;
use App\Http\Controllers\BreederListingController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
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
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\EncryptHistoryMiddleware;
use Inertia\Inertia;
use Stripe\Stripe;

Route::group(['prefix' => 'posts'], function () {
    Route::get('/', [PostController::class, 'index'])->name('posts.index');
    Route::post('/{postId}/react/{reactionType}', [PostController::class, 'toggleReaction'])
        ->middleware('auth');
    Route::get('/{slug}', [PostController::class, 'show'])->name('posts.show');
    Route::post('/{id}/comment', [PostController::class, 'comment'])->name('posts.comment');

});


Route::post('/create-intent', function (Request $request) {
    try {
        // Retrieve the user and the selected plan
        $user = $request->user();
        $plan = Plan::findOrFail($request->plan_id);

        // Set up Stripe API key
        //
        Stripe::setApiKey(config('services.stripe.secret'));

        // Create a SetupIntent for the user
        $setupIntent = $user->createSetupIntent();

        // Respond with the client secret of the SetupIntent
        return response()->json([
            'client_secret' => $setupIntent->client_secret,
            'plan_id' => $request->plan_id,
        ]);
    } catch (\Exception $e) {
        // Handle exceptions and return an error response
        return response()->json([
            'error' => $e->getMessage(),
        ], 500);
    }
});

Route::post('/breeder/request/retry', function (Request $request) {
    $request->user()->breeder_requests()->latest()->first()->update(['status' => 'pending', 'message' => 'We are currently reviewing your application.']);

    return success('profile.edit', 'Your request has been resubmitted.');
});

/* Route::middleware(['role:seller'])->group(function () { */

/* }); */

Route::get('/saved-search/{id}', [SavedSearchController::class, 'destroy']);
Route::get('/saved-search', [SavedSearchController::class, 'show']);
Route::post('/saved-search', [SavedSearchController::class, 'store']);

Route::get('test', function () {
    dd('test');
});

Route::post('/complete-subscription', function (Request $request) {
    $user = $request->user();
    $paymentMethod = $request->payment_method; // Retrieve from the frontend
    $plan = Plan::findOrFail($request->plan_id);

    $user->updateDefaultPaymentMethod($paymentMethod);

    $user->newSubscription('standard', $plan->stripe_plan_id)
        ->create($paymentMethod);

    return response()->json(['success' => true]);
});

Route::post('/report/{slug}', [ReportController::class, 'store']);

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/ui/{path?}', function ($path = null) {
    $storybookPath = public_path();

    $filePath = $storybookPath.($path ? '/'.$path : '/index.html');

    if (! file_exists($filePath)) {
        abort(404);
    }

    return response()->file($filePath);
})->where('path', '.*');

Route::group(['prefix' => 'puppies'], function () {
    Route::get('/', [PuppyController::class, 'index'])->name('puppies.index');
    Route::get('/{slug}', [PuppyController::class, 'show'])->name('puppies.show');
});

Route::middleware('auth', 'verified')->group(function () {

    Route::get('/upgrade', [UpgradePlanController::class, 'index']);
    /* Route::get('/upgrade/{plan_id}', UpgradePlanController::class); */

    Route::group(['prefix' => 'plans'], function () {
        Route::get('/', [PlanController::class, 'index'])->name('plans.index');
        Route::get('/breeder', [PlanController::class, 'breeder'])->name('plans.breeder');
    });

});

Route::group(['prefix' => 'breeds'], function () {
    Route::get('/', [BreedController::class, 'index'])->name('breeds.index');
    Route::get('/{slug}', [BreedController::class, 'show'])->name('breeds.show');
});

Route::group(['prefix' => 'breeders'], function () {
    Route::post('/', [BreederController::class, 'store'])->name('breeders.store');
    /* Route::post('/{id?}', [BreederController::class, 'store'])->name('breeders.create'); */
    Route::get('/', [BreederController::class, 'index'])->name('breeders.index');
    Route::get('create', [BreederController::class, 'create'])->name('breeders.create')->middleware([EncryptHistoryMiddleware::class]);
    Route::get('/{slug}', [BreederController::class, 'show'])->name('breeders.show');
});

Route::group(['prefix' => 'favorites'], function () {

    Route::get('/', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::patch('{puppy}', FavoriteController::class)->name('favorite.toggle');

});

Route::group(['prefix' => 'subscriptions'], function () {

    Route::get('/', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::delete('/', [SubscriptionController::class, 'destroy'])->name('subscriptions.cancel');

});

Route::group(['middleware' => ['auth', 'verified']], function () {

    Route::post('/comment/{seller}', [CommentController::class, 'store'])->name('comment.store');

});

Route::get('/about-us', [AboutController::class, 'index'])->name('about.index');

Route::get('/billing/confirm', [CheckoutController::class, 'confirm'])->name('billing.confirm');
Route::get('/billing', function (Request $request) {

    return $request->user()->redirectToBillingPortal(route('profile.edit'));

})->middleware(['auth'])->name('billing');
/* Route::get('') */

Route::group(['prefix' => 'checkout', 'middleware' => ['auth', 'verified']], function () {
    Route::get('success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('{plan_id}', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::get('/', CheckoutController::class)->name('checkout.pay');
    Route::post('/complete', [CheckoutController::class, 'complete']);
    Route::get('/payment-methods', [CheckoutController::class, 'payment_methods'])->name('checkout.payment_methods');
    Route::get('subscription/success', [CheckoutController::class, 'success'])->name('subscription.success');

    Route::group(['prefix' => 'change'], function () {
        Route::get('{plan_id}', [UpgradeCheckoutController::class, 'index'])->name('checkout.upgrade.index');
        /* Route::get('create/{id?}', [SellerController::class, 'create'])->name('seller.create')->middleware([EncryptHistoryMiddleware::class]); */
        /* Route::delete('delete/{id?}', [SellerController::class, 'destroy'])->name('seller.delete')->middleware('auth'); */
        /* Route::post('store', [SellerController::class, 'store'])->name('seller.store')->middleware('auth'); */
        /* Route::post('update/{id}', [SellerController::class, 'update'])->name('seller.update')->middleware('auth'); */
    });

});

Route::get('/all-puppies/{slug}', [SellerController::class, 'show'])->name('seller.show');

Route::group(['prefix' => 'seller'], function () {
    Route::get('create/{id?}', [SellerController::class, 'create'])->name('seller.create')->middleware([EncryptHistoryMiddleware::class]);
    Route::delete('delete/{id?}', [SellerController::class, 'destroy'])->name('seller.delete')->middleware('auth');
    Route::post('store', [SellerController::class, 'store'])->name('seller.store')->middleware('auth');
    Route::post('update/{id}', [SellerController::class, 'update'])->name('seller.update')->middleware('auth');
});

Route::middleware(['auth', 'role:super_admin'])->group(function () {

    Route::get('filemanager', function () {
        return view('filemanager');
    });

});

Route::group(['prefix' => 'breeder-listings'], function () {
    Route::get('/', [BreederListingController::class, 'index'])->name('breeder_listings.index');

    Route::get('/create', [BreederListingController::class, 'create'])->name('breeder_listings.create');

    Route::post('/', [BreederListingController::class, 'store'])->name('breeder_listings.store');

    Route::put('/', [BreederListingController::class, 'update'])->name('breeder_listings.update');

    Route::get('/{slug}', [BreederListingController::class, 'show'])->name('breeder_listings.show');

});

Route::get('/contact-us', [ContactController::class, 'index']);
Route::post('/contact-us', [ContactController::class, 'store']);
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'index']);
Route::get('/terms-of-use', [PrivacyPolicyController::class, 'terms']);

Route::get('/dashboard', function () {
    return redirect()->to('/profile');
    /* return Inertia::render('Dashboard'); */
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('profile.destroy.avatar');
});

require __DIR__.'/auth.php';

/* Auth::routes(); */

/* Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home'); */
