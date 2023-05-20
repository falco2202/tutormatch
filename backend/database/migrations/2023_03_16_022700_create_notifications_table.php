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
            'notifications',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->text('content');
                $table->dateTime('time_notification')->default(now());
                $table->string('title', 50);
                $table->boolean('status')->default(false);
                $table->unsignedBigInteger('classroom_id');
                $table->foreign('classroom_id')->references('id')->on('classrooms')->constrained()->cascadeOnDelete();
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
        Schema::dropIfExists('notification_users');
        Schema::dropIfExists('notifications');
    }
};
