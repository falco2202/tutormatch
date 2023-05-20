<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfileTeacher>
 */
class ProfileTeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'status' => 1,
            'at_school' => fake()->name(),
            'description' => fake()->name(),
            'user_id' => fake()->numberBetween(126, 222)
        ];
    }
}
