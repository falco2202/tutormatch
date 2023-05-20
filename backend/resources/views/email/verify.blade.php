@extends('email.layout')
@section('content')
    <h2>Chào mừng đến với TutorMatch</h2>
    <div>
        <h3>Chào {{ $name }},</h3>
    <p>
        Chào mừng bạn đến với trang web TutorMatch. Đây là email xác nhận tài khoản của bạn. Vui lòng nhấn vào nút bên dưới để xác nhận tài khoản.
    </p>
    </div> 
    <a href="{{ $url }}" class="content__btn">Xác thực tài khoản của bạn</a>
@endsection 