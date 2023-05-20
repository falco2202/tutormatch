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
            $table->string('date_end')->nullable(false)->change();
            $table->float('tuition_fee')->nullable()->change();
            $table->float('time')->nullable()->change();
            $table->text('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('classrooms', function (Blueprint $table) {
            $table->string('date_end')->nullable(false)->change();
            $table->float('tuition_fee')->nullable()->change();
            $table->float('time')->nullable()->change();
            $table->text('description')->nullable()->change();
        });
    }
};
