class Employee {
  constructor(
    tai_Khoan,
    ho_Ten,
    email,
    mat_Khau,
    ngay_Lam,
    luong_Co_Ban,
    chuc_Vu,
    gio_Lam
  ) {
    this.tai_Khoan = tai_Khoan;
    this.ho_Ten = ho_Ten;
    this.email = email;
    this.mat_Khau = mat_Khau;
    this.ngay_Lam = ngay_Lam;
    this.luong_Co_Ban = luong_Co_Ban;
    this.chuc_Vu = chuc_Vu;
    this.gio_Lam = gio_Lam;
    this.tong_Luong = 0;
    this.xep_Loai = "";
  }
  calculate_tong_Luong(he_So) {
    this.tong_Luong = Number(this.luong_Co_Ban * he_So);
  }
}
export default Employee;
