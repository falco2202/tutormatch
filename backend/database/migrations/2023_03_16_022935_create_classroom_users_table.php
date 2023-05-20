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
            'classroom_users',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->text('comment')->default(null);
                $table->float('star')->default(null);
                $table->dateTime('date_comment')->default(null);
                $table->integer('status')->default(0);
                $table->unsignedBigInteger('user_id');
                $table->foreign('user_id')->references('id')->on('users')->constrained()->cascadeOnDelete();
                $table->unsignedBigInteger('classroom_id');
                $table->foreign('classroom_id')->references('id')->on('classrooms')->constrained()->cascadeOnDelete();
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
        Schema::dropIfExists('classroom_users');
    }
};
