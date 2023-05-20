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
            'classrooms',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('class_name', 255);
                $table->integer('quantity')->default(1);
                $table->string('subject', 255);
                $table->float('tuition_fee');
                $table->float('time');
                $table->dateTime('date_start')->default(now());
                $table->dateTime('date_end')->default(null);
                $table->text('description');
                $table->unsignedBigInteger('teacher_id');
                $table->foreign('teacher_id')->references('teacher_id')->on('profile_teachers')->constrained()->cascadeOnDelete();
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
        Schema::dropIfExists('classrooms');
    }
};
