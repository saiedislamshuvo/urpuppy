# 🐾 UrPuppy - Project Setup Guide

## 🛠 Prerequisites

- PHP 8.0+
- Composer installed
- SQLite installed
- Stripe account
- Redis (Optional) # This is needed for counting views

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

### 3. Setup ENV

```
cp .env.example .env

# CHECK all the required env variables
```

### 4. Install Laravel Octane

```
php artisan octane:install
#Choose roadrunner
```

ADD env OCTANE_SERVER=roadrunner


### 5. Setup Stripe


https://docs.stripe.com/stripe-cli``

```
stripe listen --forward-to http://localhost:8000/stripe/webhook 
# Hostname and port should be your laravel app url
# Optional, This is needed for webhooks from stripe
```


### 6. Install node modules

```
npm i
```


### 7. Application Setup

```
php artisan world:install && php artisan migrate:fresh --seed && php artisan storage:link
```

### 8. Run Laravel

```
composer run dev
```
