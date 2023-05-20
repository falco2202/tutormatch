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
        Schema::table('absent_students', function (Blueprint $table) {
            $table->dropForeign('absent_students_lesson_id_foreign');
            $table->dropForeign('absent_students_user_id_foreign');
            $table->dropUnique(['lesson_id']);
            $table->dropUnique(['user_id']);
            $table->unique(['lesson_id', 'user_id']);
            $table->foreign('user_id')->references('id')->on('users')->constrained()->cascadeOnDelete();
            $table->foreign('lesson_id')->references('id')->on('lessons')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('absent_students', function (Blueprint $table) {
            $table->dropForeign('absent_students_lesson_id_foreign');
            $table->dropForeign('absent_students_user_id_foreign');
            $table->dropUnique(['lesson_id', 'user_id']);
            $table->unique(['user_id']);
            $table->unique(['lesson_id']);
            $table->foreign('user_id')->references('id')->on('users')->constrained()->cascadeOnDelete();
            $table->foreign('lesson_id')->references('id')->on('lessons')->constrained()->cascadeOnDelete();
        });
    }
};
