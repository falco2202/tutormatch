# Tutor Match BE

## Hướng dẫn

Sửa file env
```
cp .env.example .env
```

Thêm  
```
DB_PASSWORD=<pass>
```

Chạy docker  
```bash
docker compose up -d
```

Generate key
```bash
docker compose exec app php artisan key:generate
```

**Lưu ý**: App chạy ở port 8080