<?php

namespace App\Rules;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\InvokableRule;

class AgeOlderEighteenRule implements InvokableRule
{
    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        $now = Carbon::now();
        $age = $now->diffInYears(Carbon::parse($value));
        if ($age < 18) {
            $fail('age_must_be_greater_than_or_equal_to_18');
        }
    }
}
