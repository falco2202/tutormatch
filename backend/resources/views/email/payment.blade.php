@extends('email.layout')
@section('content')
    <h2>Thanh toán phí dịch vụ tháng</h2>
    <div>
        <h3>Chào {{ $name }},</h3>
    <p>
        Tài khoản của bạn đã đến hạn thanh toán. Để duy trì tài khoản, vui lòng chọn nút bên dưới để tiến hành thanh toán.
    </p>
    </div>
    <a href="{{ $url }}" class="content__btn">Thanh toán</a>
@endsection