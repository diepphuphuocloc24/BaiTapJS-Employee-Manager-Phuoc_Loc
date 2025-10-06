import Employee from "./employee.js";
import Manager from "./employee_Manager.js";
import Validation from "./validation.js";

const manager = new Manager();
const validation = new Validation();

// Dom tới Id
export const dom_Element_Id = (id) => document.getElementById(id);

// Reset lại toàn bộ thông tin khi nhập thông tin employee mới
const reset_Info = () => {
  dom_Element_Id("employee_Form").reset();
};

// Dom tới nút thêm employee
dom_Element_Id("btnThem").onclick = function () {
  dom_Element_Id("header-title").innerHTML = "Log In";
  dom_Element_Id("btnThemNV").style.display = "block";
  dom_Element_Id("btnCapNhat").style.display = "none";

  // Mỏ phần tai_Khoan
  dom_Element_Id("tknv").disabled = false;

  // Reset khi nhập thông tin mới
  reset_Info();
};

// Lấy thông tin của từng employee
const get_Employee_Info = (isAdd) => {
  const input_tai_Khoan = dom_Element_Id("tknv").value;
  const input_ho_Ten = dom_Element_Id("name").value;
  const input_email = dom_Element_Id("email").value;
  const input_mat_Khau = dom_Element_Id("password").value;
  const input_ngay_Lam = dom_Element_Id("datepicker").value;
  const input_luong_Co_Ban = dom_Element_Id("luongCB").value;
  const input_chuc_Vu = dom_Element_Id("chucvu").value;
  const input_gio_Lam = dom_Element_Id("gioLam").value;

  // 4. Check xem có để trống hay không
  let isValid = true;

  // 4. Check hợp lệ Validation
  // Tài khoản
  if (isAdd) {
    isValid &=
      validation.input_Empty(
        input_tai_Khoan,
        "invalidTK",
        "tknv",
        "Vui lòng nhập Tài khoản."
      ) &&
      validation.checkCharacter_Number(
        input_tai_Khoan,
        "invalidTK",
        "tknv",
        "Tài khoản không hợp lệ. Vui lòng chỉ nhập số."
      ) &&
      validation.checkTK_Length(
        input_tai_Khoan,
        "invalidTK",
        "tknv",
        "Tài khoản không hợp lệ. Vui lòng nhập 4-6 ký số.",
        4,
        6
      ) &&
      validation.checkExist(
        input_tai_Khoan,
        "invalidTK",
        "tknv",
        "Tài khoản đã tồn tại. Vui lòng nhập Tài khoản khác.",
        manager.array_Employee
      );
  }

  // Họ Tên
  isValid &=
    validation.input_Empty(
      input_ho_Ten,
      "invalidName",
      "name",
      "Vui lòng nhập Họ tên."
    ) &&
    validation.checkCharacter_String(
      input_ho_Ten,
      "invalidName",
      "name",
      "Vui lòng chỉ nhập chữ."
    );

  // Email
  isValid &=
    validation.input_Empty(
      input_email,
      "invalidEmail",
      "email",
      "Vui lòng nhập Email."
    ) &&
    validation.checkEmail(
      input_email,
      "invalidEmail",
      "email",
      "Email không hợp lệ. Vui lòng nhập lại Email."
    );

  // Mật khẩu
  isValid &=
    validation.input_Empty(
      input_mat_Khau,
      "invalidPassword",
      "password",
      "Vui lòng nhập Mật khẩu."
    ) &&
    validation.checkTK_Length(
      input_mat_Khau,
      "invalidPassword",
      "password",
      "Mật khẩu không hợp lệ. Vui lòng nhập Mật khẩu từ 6-10 ký tự.",
      6,
      10
    ) &&
    validation.checkPassword(
      input_mat_Khau,
      "invalidPassword",
      "password",
      "Mật khẩu không hợp lệ. Vui lòng nhập lại Mật khẩu có chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt."
    );

  // Ngày làm
  isValid &=
    validation.input_Empty(
      input_ngay_Lam,
      "invalidNgaylam",
      "datepicker",
      "Vui lòng nhập Ngày làm."
    ) &&
    validation.checkNgaylam(
      input_ngay_Lam,
      "invalidNgaylam",
      "datepicker",
      "Định dạng Ngày làm không hợp lệ. Vui lòng nhập lại theo mm/dd/yyyy"
    );

  // Lương cơ bản
  isValid &=
    validation.input_Empty(
      input_luong_Co_Ban,
      "invalidLuongcoban",
      "luongCB",
      "Vui lòng nhập Lương cơ bản."
    ) &&
    validation.checkCharacter_Number(
      input_luong_Co_Ban,
      "invalidLuongcoban",
      "luongCB",
      "Lương cơ bản không hợp lệ. Vui lòng chỉ nhập số."
    ) &&
    validation.checkLuongcoban(
      input_luong_Co_Ban,
      "invalidLuongcoban",
      "luongCB",
      "Vui lòng nhập Lương cơ bản từ 10000000 đến 20000000",
      10000000,
      20000000
    );

  // Chức vự
  isValid &= validation.select_Empty(
    "chucvu",
    "invalid_Chucvu",
    "Vui lòng chọn Chức vụ."
  );

  // Giờ làm
  isValid &=
    validation.input_Empty(
      input_gio_Lam,
      "invalidGiolam",
      "gioLam",
      "Vui lòng nhập Giờ làm."
    ) &&
    validation.checkGiolam(
      input_gio_Lam,
      "invalidGiolam",
      "gioLam",
      "Giờ làm không hợp lệ. Vui lòng chỉ nhập giờ làm từ 80 đến 200",
      80,
      200
    );

  if (!isValid) {
    return null;
  }

  const employee = new Employee(
    input_tai_Khoan,
    input_ho_Ten,
    input_email,
    input_mat_Khau,
    input_ngay_Lam,
    input_luong_Co_Ban,
    input_chuc_Vu,
    input_gio_Lam
  );

  // 5. Tính tổng lương
  let he_So = 1;
  if (input_chuc_Vu === "Sếp") {
    he_So = 3;
  } else if (input_chuc_Vu === "Trưởng phòng") {
    he_So = 2;
  }

  employee.calculate_tong_Luong(he_So);

  // 6. Xếp loại
  if (input_gio_Lam >= 192) {
    employee.xep_Loai = "Xuat sac";
  } else if (input_gio_Lam >= 176 && input_gio_Lam < 192) {
    employee.xep_Loai = "Gioi";
  } else if (input_gio_Lam >= 160 && input_gio_Lam < 176) {
    employee.xep_Loai = "Kha";
  } else {
    employee.xep_Loai = "Trung binh";
  }

  return employee;
};

// 1. Render danh sách ra ngoài UI
const render_Info_UI = (employee_List) => {
  let content_HTML = "";
  for (let i = 0; i < employee_List.length; i += 1) {
    const object_Employee = employee_List[i];
    content_HTML += `
      <tr>
        <td>${object_Employee.tai_Khoan}</td>
        <td>${object_Employee.ho_Ten}</td>
        <td>${object_Employee.email}</td>
        <td>${object_Employee.ngay_Lam}</td>
        <td>${object_Employee.chuc_Vu}</td>
        <td>${object_Employee.tong_Luong}</td>
        <td>${object_Employee.xep_Loai}</td>
        <td class="d-flex align-items-center">
          <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="btn_Edit_Employee('${object_Employee.tai_Khoan}')">Sửa</button>
          <button class="btn btn-danger" onclick="btn_Delete_Employee('${object_Employee.tai_Khoan}')">Xóa</button>
        </td>
      </tr>
    `;
  }
  dom_Element_Id("tableDanhSach").innerHTML = content_HTML;
};

// Lưu thông tin employee vào localStorage
const set_localStorage = () => {
  const convert_JSON_to_String = JSON.stringify(manager.array_Employee);
  localStorage.setItem("LIST_EMPLOYEE", convert_JSON_to_String);
};

// Đưa thông tin đã lưu lên UI lại
const get_localStorage = () => {
  const info_String = localStorage.getItem("LIST_EMPLOYEE");

  if (!info_String) return true;

  const convert_String_to_JSCON = JSON.parse(info_String);

  manager.array_Employee = convert_String_to_JSCON;

  render_Info_UI(convert_String_to_JSCON);
};
get_localStorage();

// 2. Khi bấm nút thêm employee
dom_Element_Id("btnThemNV").onclick = function () {
  const object_Employee = get_Employee_Info(true);

  // Khi không hợp lệ trả về null, viết trường hợp không có info thì dừng
  if (!object_Employee) {
    return;
  }

  manager.add_Employee(object_Employee);

  render_Info_UI(manager.array_Employee);

  set_localStorage();

  // Dom tới nút đóng khi thêm hoặc cập nhật employee
  dom_Element_Id("btnDong").click();
};

console.log(manager.array_Employee);

// 7. Khi nhấp vào nút xóa employee
const btn_Delete_Employee = (tai_Khoan) => {
  console.log(tai_Khoan);

  manager.delete_Employee(tai_Khoan);

  render_Info_UI(manager.array_Employee);

  set_localStorage();
};
// Khai báo ra ngoài window
window.btn_Delete_Employee = btn_Delete_Employee;

// 8. Khi nhấp vào nút Sửa employee
const btn_Edit_Employee = (tai_Khoan) => {
  dom_Element_Id("header-title").innerHTML = "Edit Information";
  dom_Element_Id("btnThemNV").style.display = "none";
  dom_Element_Id("btnCapNhat").style.display = "block";

  // Gọi phần nhập lại thông tin vào input khi mở bên manager
  const object_Employee = manager.get_Tai_khoan(tai_Khoan);

  // Check điều kiện có tồn tại
  if (object_Employee) {
    dom_Element_Id("tknv").value = object_Employee.tai_Khoan;

    // Block phần tai_Khoan
    dom_Element_Id("tknv").disabled = true;

    dom_Element_Id("name").value = object_Employee.ho_Ten;
    dom_Element_Id("email").value = object_Employee.email;
    dom_Element_Id("password").value = object_Employee.mat_Khau;
    dom_Element_Id("datepicker").value = object_Employee.ngay_Lam;
    dom_Element_Id("luongCB").value = object_Employee.luong_Co_Ban;
    dom_Element_Id("chucvu").value = object_Employee.chuc_Vu;
    dom_Element_Id("gioLam").value = object_Employee.gio_Lam;
  }
};
// Khai báo ra ngoài window
window.btn_Edit_Employee = btn_Edit_Employee;

// 8. Khi nhấp vào nút Cập nhật employee
dom_Element_Id("btnCapNhat").onclick = function () {
  let object_Employee = get_Employee_Info(false);

  manager.update_Employee(object_Employee);

  render_Info_UI(manager.array_Employee);

  set_localStorage();

  // Dom tới nút đóng khi thêm hoặc sửa employee
  dom_Element_Id("btnDong").click();
};

// 9. Khi bấm nút Tìm kiếm xếp loại
dom_Element_Id("btnTimNV").onclick = function () {
  // Dom tới người dùng nhập tìm kiếm
  const input_Search = dom_Element_Id("searchName").value;
  console.log(input_Search);

  const search_Employee = manager.search_Employee(input_Search);

  render_Info_UI(search_Employee);
};
