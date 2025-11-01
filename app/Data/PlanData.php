<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PlanData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $price,
        public string $money_formatted,
        public ?string $savings_label,
        public int $trial_days,
        public string $interval,
        public string $type,
        public string $is_highlight,
        public string $plan_days,
        public ?string $logo,
        public int $interval_count,
        /** @var \App\Data\PlanDetail[] */
        public ?DataCollection $details,
        /** @var string[] */
        public array $features,

        public ?string $badge_color,
        public ?string $badge_title,
    ) {}
}
