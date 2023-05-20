<?php

namespace App\Services;

use App\Models\Classroom;
use App\Models\Lesson;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class LessonService
{
    protected $lesson;

    public function __construct(Lesson $lesson)
    {
        $this->lesson = $lesson;
    }
    public function dayIsValid($start, $end, $lessons)
    {
        $dayWeek = [];
        for ($date = Carbon::parse($start); $date->lte(Carbon::parse($end)); $date->addDay()) {
            if (count($dayWeek) > 7) {
                return true;
            }
            $dayWeek[] = $date->dayOfWeek;
        }
        foreach ($lessons as $item) {
            if (!in_array($item['day'], $dayWeek)) {
                return false;
            }
        }
        return true;
    }
    public function createLesson($start, $end, $lessons, $classroomId)
    {
        try {
            $listLessons = [];
            for ($date = Carbon::parse($start); $date->lte(Carbon::parse($end)); $date->addDay()) {
                $result = $this->checkDate($date, $lessons);
                if (!$result) {
                    continue;
                }
                $listLessons[] = [
                    'time_start' => $result['time_start'],
                    'time_end' => $result['time_end'],
                ];
            }
            Classroom::find($classroomId)->lessons()->createMany($listLessons);
        } catch (Exception $e) {
            throw $e;
        }
    }

    private function checkDate($date, $lessons)
    {
        foreach ($lessons as $item) {
            if ($date->dayOfWeek == $item['day']) {
                $timeStart = Carbon::parse($item['start']);
                $timeEnd = Carbon::parse($item['end']);
                return [
                    'time_start' => ((Carbon::parse($date))
                                      ->setTime($timeStart->hour, $timeStart->minute, $timeStart->second))
                                      ->format(config('constant.datetime_format')),
                    'time_end' => ((Carbon::parse($date))
                                    ->setTime($timeEnd->hour, $timeEnd->minute, $timeEnd->second))
                                    ->format(config('constant.datetime_format'))
                ];
            }
        }
        return false;
    }

    public function updateLesson($start, $end, $lessons, $classroomId)
    {
        try {
            $this->lesson->where('classroom_id', $classroomId)
                            ->where('time_start', '>', Carbon::today())
                            ->delete();
            if ($start < Carbon::today()) {
                $start = Carbon::today();
            }
            $this->createLesson($start, $end, $lessons, $classroomId);
        } catch (Exception $exception) {
            return $exception;
        }
    }
    public function getLessonInClass($id)
    {
        $classroom = Classroom::find($id);
        $lessons = $classroom->lessons()->get();
        return $lessons;
    }
    public function getDaysOfWeek($lessons)
    {
        $daysOfWeeks = [];
        foreach ($lessons as $item) {
            $day = Carbon::parse($item->time_start);
            $dayOfWeek = $day->dayOfWeek;
            if (!in_array($dayOfWeek, $daysOfWeeks)) {
                 $daysOfWeeks[] = [
                    'day' => $dayOfWeek,
                    'start' => Carbon::parse($item->time_start)->format(config('constant.time_format')),
                    'end' => Carbon::parse($item->time_end)->format(config('constant.time_format'))
                 ];
            }
        }
        sort($daysOfWeeks);
        $daysOfWeeks = array_map("unserialize", array_unique(array_map("serialize", $daysOfWeeks)));
        $numLessons[] = $daysOfWeeks;
        return $numLessons;
    }
}
