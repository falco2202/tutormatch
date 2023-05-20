@extends('email.layout')
@section('content')
        <h2>Điểm danh lớp {{ $class_name }} ngày {{ $day }}</h2>
        <div>
            <h3>Chào {{ $name }},</h3>
        @if($is_present)
            <p>
                {{ $student_name }} đã có mặt trong buổi học ngày {{ $day }} của lớp {{ $class_name }}
            </p>
        @else
            <p>
                {{ $student_name }} đã vắng mặt trong buổi học ngày {{ $day }} của lớp {{ $class_name }}
            </p>
        @endif
        </div>
        <a href="{{ $url }}" class="content__btn">Xem lớp học</a>
@endsection