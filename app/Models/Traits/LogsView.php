<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Redis;

trait LogsView
{
    public function logView($id = null)
    {
        Redis::pfadd(sprintf('%s.%s.views', $this->getTable(), $id ?? $this->getKey()), [request()->ip()]);
    }

    public function getViewCount()
    {
        return Redis::pfcount(sprintf('%s.%s.views', $this->getTable(), $this->getKey()));

    }
}
