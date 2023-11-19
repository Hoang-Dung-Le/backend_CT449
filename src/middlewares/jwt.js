import jwt from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    // Lấy thông tin token từ header Authorization
    const token = req.headers['authorization'];

    // Kiểm tra xem token có tồn tại không
    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token, xác thực bị từ chối' });
    }

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }
        // Lưu thông tin giải mã từ token vào request để sử dụng trong các xử lý tiếp theo
        req.user = decoded;
        next(); // Tiếp tục điều hướng tới middleware hoặc route tiếp theo
    });
}

// module.exports = authenticateToken;
export default authenticateToken;