<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'address' => fake()->name(),
            'lat' => fake()->numberBetween(5, 105),
            'long' => fake()->numberBetween(5, 105),
            'm_ward_id' => fake()->numberBetween(1, 27),
            'addressable_type' => "App\Models\User",
            'addressable_id' => fake()->numberBetween(50, 200),
        ];
    }
}
