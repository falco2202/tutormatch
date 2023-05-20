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
        Schema::table('classrooms', function (Blueprint $table) {
            $table->dropForeign('classrooms_teacher_id_foreign');
            $table->dropIndex('classrooms_teacher_id_foreign');
            $table->dateTime('date_end')->nullable(false)->change();
        });

        Schema::table('profile_teachers', function (Blueprint $table) {
            $table->dropPrimary('teacher_id');
            $table->unsignedInteger('teacher_id')->change();
            $table->dropColumn('teacher_id');
            $table->unsignedBigInteger('user_id')->primary()->change();
        });

        Schema::table('classrooms', function (Blueprint $table) {
            $table->foreign('teacher_id')->references('user_id')->on('profile_teachers')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
