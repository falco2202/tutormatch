<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
    <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }

        body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .verify__email {
            width: 600px;
            height: 500px;
            background: #fff;
            border: 1px solid #0369a1;
        }

        .header, .footer{
            height: 80px;
            background-color: #0369a1;
            color: #fff;
            text-align: center;
            line-height: 80px;
        }

        .footer h3{
            font-weight: lighter;
        }

        .content {
            height: calc(100% - 160px);
            padding: 1rem 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        .content h3 {
            align-self: self-start;
            margin-bottom: 1rem;
        }

        .content__btn {
            padding: .8rem 1rem;
            font-size: 1rem;
            background-color: #0369a1;
            border: none;
            color: #fff;
            font-weight: bold;
            border-radius: 4px;
            margin-bottom: 1rem;
            cursor: pointer;
            text-decoration: none;
            display: block;
        }
    </style>
</head>
<body>
    <div class="verify__email">
        <div class="header">
            <h1>TutorMatch</h1>
        </div>
        <div class="content">
            @yield('content')
        </div>
        <div class="footer">
            <h3>Copyright © 2023 Rikkeisoft Hue City. All rights reserved.</h3>
        </div>
    </div>
</body>
</html>