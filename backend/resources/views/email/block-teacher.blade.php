@extends('email.layout')
@section('content')
    @if($is_confirm)
        <h2>Tài khoản của bạn đã được mở khóa</h2>
        <div>
            <h3>Chào {{ $name }},</h3>
        <p>
            Tài khoản của bạn đã được mở khóa, mọi thắc mắc xin liên hệ với chúng tôi.
        </p>
        </div>
        <a href="{{ $url }}" class="content__btn">Liên hệ với chúng tôi</a>
    @else
        <h2>Tài khoản của bạn đã bị khóa</h2>
        <div>
            <h3>Chào {{ $name }},</h3>
        <p>
            Tài khoản của bạn đã bị khóa, mọi thắc mắc xin liên hệ với chúng tôi.
        </p>
        </div>
        <a href="{{ $url }}" class="content__btn">Liên hệ với chúng tôi</a>
    @endif
@endsection