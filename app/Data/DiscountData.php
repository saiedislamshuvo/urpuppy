<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class DiscountData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $code,
        public string $start_date,
        public ?string $end_date,
        public int $trial_days,
        public string $account_type,
        public string $targeted_emails,
    ) {}
}
