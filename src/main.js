import Employee from "./employee.js";
import Manager from "./employee_Manager.js";

const manager = new Manager();

// Dom tới Id
const dom_Element_Id = (id) => document.getElementById(id);

// Lấy thông tin của từng employee
const get_Employee_Info = () => {
  const input_tai_Khoan = dom_Element_Id("tknv").value;
  const input_ho_Ten = dom_Element_Id("name").value;
  const input_email = dom_Element_Id("email").value;
  const input_mat_Khau = dom_Element_Id("password").value;
  const input_ngay_Lam = dom_Element_Id("datepicker").value;
  const input_luong_Co_Ban = dom_Element_Id("luongCB").value;
  const input_chuc_Vu = dom_Element_Id("chucvu").value;
  const input_gio_Lam = dom_Element_Id("gioLam").value;

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
    employee.xep_Loai = "Nhân viên xuất sắc";
  } else if (input_gio_Lam >= 176 && input_gio_Lam < 192) {
    employee.xep_Loai = "Nhân viên giỏi";
  } else if (input_gio_Lam >= 160 && input_gio_Lam < 176) {
    employee.xep_Loai = "Nhân viên khá";
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
        <td class="d-flex">
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

// 7. Khi nhấp vào nút xóa employee
const btn_Delete_Employee = (tai_Khoan) => {
  console.log(tai_Khoan);

  manager.delete_Employee(tai_Khoan);

  render_Info_UI(manager.array_Employee);

  set_localStorage();
};
// Khai báo ra ngoài window
window.btn_Delete_Employee = btn_Delete_Employee;

// Dom tới nút thêm employee
dom_Element_Id("btnThem").onclick = function () {
  dom_Element_Id("header-title").innerHTML = "Log In";
  dom_Element_Id("btnThemNV").style.display = "block";
  dom_Element_Id("btnCapNhat").style.display = "none";

  // Mỏ phần tai_Khoan
  dom_Element_Id("tknv").disabled = false;
};

// 4. Khi nhấp vào nút edit employee
const btn_Edit_Employee = (tai_Khoan) => {
  dom_Element_Id("header-title").innerHTML = "Edit Information";
  dom_Element_Id("btnThemNV").style.display = "none";
  dom_Element_Id("btnCapNhat").style.display = "block";

  // Block phần tai_Khoan
  dom_Element_Id("tknv").disabled = true;

  // Đưa lại thông tin vào phần input
  const object_Employee = manager.edit_Employee(tai_Khoan);

  dom_Element_Id("tknv").value = object_Employee.tai_Khoan;
  dom_Element_Id("name").value = object_Employee.ho_Ten;
  dom_Element_Id("email").value = object_Employee.email;
  dom_Element_Id("password").value = object_Employee.mat_Khau;
  dom_Element_Id("datepicker").value = object_Employee.ngay_Lam;
  dom_Element_Id("luongCB").value = object_Employee.luong_Co_Ban;
  dom_Element_Id("chucvu").value = object_Employee.chuc_Vu;
  dom_Element_Id("gioLam").value = object_Employee.gio_Lam;
};
// Khai báo ra ngoài window
window.btn_Edit_Employee = btn_Edit_Employee;

// 5. Khi nhấp vào nút update employee
dom_Element_Id("btnCapNhat").onclick = function () {
  let new_object_Employee = get_Employee_Info();

  const locate_tai_Khoan = manager.update_Employee(
    new_object_Employee.tai_Khoan
  );

  for (let i = 0; i < manager.array_Employee.length; i += 1) {
    let object_Employee = manager.array_Employee[i];
    if (locate_tai_Khoan === object_Employee.tai_Khoan) {
      manager.array_Employee[i] = new_object_Employee;
    }
  }

  render_Info_UI(manager.array_Employee);

  set_localStorage();
};

// 6. Khi bấm nút tìm kiếm xếp loại
dom_Element_Id("btnTimNV").onclick = function () {
  // Dom tới người dùng nhập tìm kiếm
  const input_Search = dom_Element_Id("searchName").value;

  if (input_Search === "Tất cả" || input_Search === "All") {
    render_Info_UI(manager.array_Employee);
    return;
  }

  const filter_Employee = manager.filter_Employee(input_Search);

  render_Info_UI(filter_Employee);
};

// 2. Khi bấm nút thêm employee
dom_Element_Id("btnThemNV").onclick = function () {
  const object_Employee = get_Employee_Info();

  manager.add_Employee(object_Employee);

  render_Info_UI(manager.array_Employee);

  set_localStorage();
};

console.log(manager.array_Employee);
