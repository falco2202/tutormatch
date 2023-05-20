<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Classroom>
 */
class ClassroomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'class_name' => "Toán lớp 3",
            'quantity' => "20",
            'subject' => "Toán ",
            'tuition_fee' => "500000",
            'time' => 2,
            'date_start' => "2023-02-02",
            'date_end' => "2023-05-03",
            'description' => fake()->name(),
            'teacher_id' => fake()->numberBetween(104, 203),
        ];
    }
}
