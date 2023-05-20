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
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign('notifications_classroom_id_foreign');
        });
        Schema::table('notification_users', function (Blueprint $table) {
            $table->dropForeign('notification_users_notification_id_foreign');
            $table->dropForeign('notification_users_user_id_foreign');
        });
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('notification_users');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
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
};
