<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::table('classroom_users', function (Blueprint $table) {
            $table->text('comment')->nullable()->change();
            $table->double('star')->nullable()->change();
            $table->datetime('date_comment')->default('CURRENT_TIMESTAMP')->change();
            $table->unique(['classroom_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('classroom_users', function (Blueprint $table) {
            $table->dropForeign('classroom_users_user_id_foreign');
            $table->dropForeign('classroom_users_classroom_id_foreign');
            $table->dropUnique(['classroom_id', 'user_id']);
            $table->datetime('date_comment')->default(null)->change();
            $table->double('star')->nullable(false)->change();
            $table->text('comment')->nullable(false)->change();
            $table->foreign('user_id')->references('id')->on('users')->constrained()->cascadeOnDelete();
            $table->foreign('classroom_id')->references('id')->on('classrooms')->constrained()->cascadeOnDelete();
        });
    }
};
