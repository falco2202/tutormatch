@extends('email.layout')
@section('content')
    @if($is_approve)
        <h2>Duyệt vào lớp thành công</h2>
        <div>
            <h3>Chào {{ $name }},</h3>
        <p>
            {{ $student_name }} đã được duyệt vào lớp {{ $class_name }} bây giờ bạn có thể xem, nhận thông báo về lớp học này.
        </p>
        </div>
        <a href="{{ $url }}" class="content__btn">Xem lớp học</a>
    @else
        <h2>Từ chối đăng ký lớp học</h2>
        <div>
            <h3>Chào {{ $name }},</h3>
        <p>
            Giáo viên đã từ chối {{ $student_name }} đăng ký vào lớp {{ $class_name }} do số lượng đăng ký đạt tối đa, bạn có thể xem tất cả các lớp đang mở trên hệ thống để đăng ký cho con.
        </p>
        </div>
        <a href="{{ $url }}" class="content__btn">Xem lớp học đang mở</a>
    @endif
@endsection