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
            'm_wards',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name', 100);
                $table->unsignedBigInteger('m_city_id');
                $table->foreign('m_city_id')->references('id')->on('m_cities')->constrained()->cascadeOnDelete();
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
        Schema::dropIfExists('m_wards');
    }
};
