@echo off
echo 启动糖巢网站开发环境...
echo.

:: 启动后端服务器
echo [1/2] 启动后端 API 服务器...
start "糖巢后端" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak >nul

:: 启动前端开发服务器
echo [2/2] 启动前端开发服务器...
start "糖巢前端" cmd /k "npm run dev"

echo.
echo ✅ 开发环境启动完成！
echo.
echo 后端: http://localhost:3001
echo 前端: http://localhost:5173
echo.
echo 按任意键关闭此窗口...
pause >nul
