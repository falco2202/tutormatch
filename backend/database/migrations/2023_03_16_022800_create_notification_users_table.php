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
            'notification_users',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->dateTime('read_at')->default(null);
                $table->unsignedBigInteger('notification_id')->nullable();
                $table->foreign('notification_id')->references('id')->on('notifications')->constrained()->cascadeOnDelete();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->foreign('user_id')->references('id')->on('users')->constrained()->cascadeOnDelete();
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
    }
};
