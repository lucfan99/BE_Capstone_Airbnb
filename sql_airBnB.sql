CREATE DATABASE Booking;
USE Booking;

CREATE TABLE ViTri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_vi_tri VARCHAR(255),
    tinh_thanh VARCHAR(255),
    quoc_gia VARCHAR(255),
    hinh_anh VARCHAR(255)
);

CREATE TABLE Phong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_phong VARCHAR(255),
    khach INT,
    phong_ngu INT,
    giuong INT,
    phong_tam INT,
    mo_ta VARCHAR(255),
    gia_tien INT,
    may_giat BOOLEAN,
    ban_la BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    ban_ui BOOLEAN,
    hinh_anh VARCHAR(255),
    vi_tri_id INT,
    FOREIGN KEY (vi_tri_id) REFERENCES ViTri(id)
);

  CREATE TABLE NguoiDung (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      pass_word VARCHAR(255),
      phone VARCHAR(255),
      birth_day VARCHAR(255),
      gender VARCHAR(50),
      role VARCHAR(50)
  );
  
  CREATE TABLE DatPhong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_phong INT,
    ngay_den DATETIME,
    ngay_di DATETIME,
    so_luong_khach INT,
    ma_nguoi_dat INT,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id),
    FOREIGN KEY (ma_nguoi_dat) REFERENCES NguoiDung(id)
);

CREATE TABLE BinhLuan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_cong_viec INT,
    ma_nguoi_binh_luan INT,
    ngay_binh_luan DATETIME,
    noi_dung VARCHAR(255),
    sao_binh_luan INT,
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id)
);

INSERT INTO ViTri (ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh)
VALUES
('Hà Nội', 'Hà Nội', 'Việt Nam', 'https://cdn-images.vtv.vn/Uploaded/lanchi/2013_09_19/10-hinh-anh-dac-trung-cua-ha-noi-0.jpg'),
('Đà Nẵng', 'Đà Nẵng', 'Việt Nam', 'https://tourism.danang.vn/wp-content/uploads/2023/02/cau-rong-da-nang.jpeg'),
('Hồ Chí Minh', 'Hồ Chí Minh', 'Việt Nam', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Ho_Chi_Minh_City_Skyline_at_Night.jpg'),
('Nha Trang', 'Khánh Hòa', 'Việt Nam', 'https://cdn.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg'),
('Phú Quốc', 'Kiên Giang', 'Việt Nam', 'https://static-images.vnncdn.net/files/publish/2022/9/30/phu-quoc-435.jpg'),
('Hội An', 'Quảng Nam', 'Việt Nam', 'https://images2.thanhnien.vn/528068263637045248/2023/4/4/hoi-an-1680591517857660432696.jpg'),
('Huế', 'Thừa Thiên Huế', 'Việt Nam', 'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/cam-nang-du-lich-hue-1-1550.jpg'),
('Sapa', 'Lào Cai', 'Việt Nam', 'https://mtcs.1cdn.vn/2023/06/07/spcv.jpg'),
('Vũng Tàu', 'Bà Rịa - Vũng Tàu', 'Việt Nam', 'https://file.hstatic.net/200000285021/article/trai_nghiem_thanh_pho_bien_vung_tau__2__91f4b94076944aa4ab7fbfdf4b1e17f2.jpg'),
('Đà Lạt', 'Lâm Đồng', 'Việt Nam', 'https://viettimetravel.vn/wp-content/uploads/2017/08/dalat-news-1-1080x530.jpg');

INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, vi_tri_id)
VALUES
('Phòng Deluxe', 2, 1, 1, 1, 'Phòng cao cấp với view đẹp', 1500000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'deluxe.jpg', 1),
('Phòng Standard', 2, 1, 1, 1, 'Phòng tiêu chuẩn', 800000, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'standard.jpg', 2),
('Phòng Family', 4, 2, 2, 2, 'Phòng gia đình rộng rãi', 2500000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'family.jpg', 3),
('Phòng Suite', 3, 1, 2, 1, 'Phòng suite sang trọng', 3000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'suite.jpg', 4),
('Phòng Studio', 2, 1, 1, 1, 'Phòng nhỏ tiện nghi', 1200000, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'studio.jpg', 5),
('Phòng Twin', 2, 1, 2, 1, 'Phòng có 2 giường đơn', 1000000, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'twin.jpg', 6),
('Phòng VIP', 4, 2, 2, 2, 'Phòng VIP tiện nghi cao cấp', 5000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'vip.jpg', 7),
('Phòng Budget', 2, 1, 1, 1, 'Phòng giá rẻ', 600000, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, 'budget.jpg', 8),
('Phòng Dorm', 6, 1, 3, 2, 'Phòng tập thể', 200000, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, 'dorm.jpg', 9),
('Phòng Penthouse', 6, 3, 3, 3, 'Penthouse với view thành phố', 10000000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'penthouse.jpg', 10);

INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role)
VALUES
('Nguyễn Văn A', 'nguyenvana@gmail.com', 'password123', '0123456789', '1990-01-01', 'Nam', 'Admin'),
('Trần Thị B', 'tranthib@gmail.com', 'password123', '0987654321', '1992-02-02', 'Nữ', 'User'),
('Lê Văn C', 'levanc@gmail.com', 'password123', '0934567890', '1988-03-03', 'Nam', 'User'),
('Phạm Thị D', 'phamthid@gmail.com', 'password123', '0976543210', '1995-04-04', 'Nữ', 'User'),
('Hoàng Văn E', 'hoangvane@gmail.com', 'password123', '0912345678', '1980-05-05', 'Nam', 'User'),
('Đỗ Thị F', 'dothif@gmail.com', 'password123', '0909876543', '1985-06-06', 'Nữ', 'User'),
('Vũ Văn G', 'vuvang@gmail.com', 'password123', '0923456789', '1993-07-07', 'Nam', 'Admin'),
('Trịnh Thị H', 'trinhthih@gmail.com', 'password123', '0965432109', '1997-08-08', 'Nữ', 'User'),
('Lý Văn I', 'lyvani@gmail.com', 'password123', '0945678901', '1991-09-09', 'Nam', 'User'),
('Tô Thị J', 'tothij@gmail.com', 'password123', '0956789012', '1994-10-10', 'Nữ', 'User');

INSERT INTO DatPhong (ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat)
VALUES
(1, '2024-12-10', '2024-12-15', 2, 1),
(2, '2024-12-11', '2024-12-16', 2, 2),
(3, '2024-12-12', '2024-12-17', 4, 3),
(4, '2024-12-13', '2024-12-18', 3, 4),
(5, '2024-12-14', '2024-12-19', 2, 5),
(6, '2024-12-15', '2024-12-20', 2, 6),
(7, '2024-12-16', '2024-12-21', 4, 7),
(8, '2024-12-17', '2024-12-22', 2, 8),
(9, '2024-12-18', '2024-12-23', 6, 9),
(10, '2024-12-19', '2024-12-24', 6, 10);

INSERT INTO BinhLuan (ma_cong_viec, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan)
VALUES
(1, 1, '2024-12-01', 'Dịch vụ rất tốt!', 5),
(2, 2, '2024-12-02', 'Phòng hơi nhỏ nhưng sạch sẽ.', 4),
(3, 3, '2024-12-03', 'Nhân viên thân thiện.', 5),
(4, 4, '2024-12-04', 'Giá cả hợp lý.', 4),
(5, 5, '2024-12-05', 'View đẹp, rất hài lòng.', 5),
(6, 6, '2024-12-06', 'Wifi hơi yếu.', 3),
(7, 7, '2024-12-07', 'Phòng cách âm không tốt.', 3),
(8, 8, '2024-12-08', 'Sẽ quay lại lần sau.', 5),
(9, 9, '2024-12-09', 'Dịch vụ ổn.', 4),
(10, 10, '2024-12-10', 'Tuyệt vời!', 5);