# 🐾 UrPuppy - Project Setup Guide

## 🛠 Prerequisites

- PHP 8.0+
- Composer installed
- SQLite installed
- Stripe account

## 🚀 Installation

### 1. Database Setup

Create the SQLite database file:

```bash
touch database/database.sqlite
```

### 2. Instal Composer Dependencies

``` 
composer install
```

### 3. Install Laravel Octane

```
php artisan octane:install
#Choose roadrunner
```

ADD env OCTANE_SERVER=roadrunner


### 4. Setup Stripe

https://docs.stripe.com/stripe-cli``

```
stripe listen --forward-to http://localhost:8000/stripe/webhook 
# Hostname and port should be your laravel app url
```

### 5. Setup ENV

```
cp .env.example .env
```

### 6. Application Setup

```
php artisan migrate:fresh --seed
php artisan storage:link
```

### 7. Run Laravel

```
composer run dev
```
