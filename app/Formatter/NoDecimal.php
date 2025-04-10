<?php

namespace App\Formatter;

use Money\Money;
use Money\MoneyFormatter;

class NoDecimal implements MoneyFormatter
{
    public function format(Money $money): string
    {
        return 'My Formatter';
    }
}
