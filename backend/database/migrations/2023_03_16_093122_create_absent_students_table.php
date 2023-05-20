<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'absent_students',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('lesson_id')->unique();
                $table->foreign('lesson_id')->references('id')->on('lessons')->constrained()->cascadeOnDelete();
                $table->unsignedBigInteger('user_id')->unique();
                $table->foreign('user_id')->references('id')->on('users')->constrained()->cascadeOnDelete();
                $table->softDeletes();
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('absent_students');
    }
};
