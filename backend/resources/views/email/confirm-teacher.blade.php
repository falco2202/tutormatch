@extends('email.layout')
@section('content')
    <h2>Tài khoản của bạn đã được xác nhận</h2>
    <div>
        <h3>Chào {{ $name }},</h3>
    <p>
        Xác nhận tài khoản thành công, từ bây giờ bạn có thể sử dụng dịch vụ trên hệ thống, nếu có thắc mắc bạn có thể liên hệ với chúng tôi.
    </p>
    </div>
    <a href="{{ $url }}" class="content__btn">Liên hệ với chúng tôi</a>
@endsection