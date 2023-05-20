<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => bcrypt('12345678'),
            'phone' => fake()->e164PhoneNumber(),
            'date_of_birth' => fake()->date($format = 'Y-m-d', $max = 'now'),
            'gender' => fake()->boolean(),
            'role' => 2,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(
            fn (array $attributes) => [
            'email_verified_at' => null,
            ]
        );
    }
}
