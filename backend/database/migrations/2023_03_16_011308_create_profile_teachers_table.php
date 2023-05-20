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
            'profile_teachers',
            function (Blueprint $table) {
                $table->bigIncrements('teacher_id');
                $table->integer('status')->default(0);
                $table->string('at_school', 255)->default(null);
                $table->text('description')->default(null);
                $table->unsignedBigInteger('user_id');
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
        Schema::dropIfExists('profile_teachers');
    }
};
