class Manager {
  constructor() {
    // Tạo một array về tất cả employee
    this.array_Employee = [];
  }

  add_Employee(object_Employee) {
    this.array_Employee.push(object_Employee);
  }

  locate_index(tai_Khoan) {
    let index = -1;
    for (let i = 0; i < this.array_Employee.length; i += 1) {
      const object_Employee = this.array_Employee[i];
      if (object_Employee.tai_Khoan === tai_Khoan) {
        index = i;
        break;
      }
    }
    return index;
  }

  delete_Employee(tai_Khoan) {
    const index = this.locate_index(tai_Khoan);
    // Xóa
    if (index !== -1) {
      // Tìm thấy thì mới trả về object
      this.array_Employee.splice(index, 1);
    }
  }

  get_Tai_khoan(tai_Khoan) {
    const index = this.locate_index(tai_Khoan);
    if (index !== -1) {
      // Tìm thấy thì mới trả về object
      return this.array_Employee[index];
    }
    return null;
  }

  update_Employee(object_Employee) {
    const index = this.locate_index(object_Employee.tai_Khoan);
    if (index !== -1) {
      this.array_Employee[index] = object_Employee;
    }
  }

  search_Employee(input_Search) {
    const search_Employee_Array = [];

    if (input_Search === "tat ca" || input_Search === "all") {
      return this.array_Employee;
    }

    for (let i = 0; i < this.array_Employee.length; i += 1) {
      const object_Employee = this.array_Employee[i];

      // Chuyển xếp loại sang chữ thường
      const lower_Input_Search = input_Search.toLowerCase();

      // Chuyển input_Search sang chữ thường
      const lower_Xep_Loai = object_Employee.xep_Loai.toLowerCase();

      if (lower_Xep_Loai.indexOf(lower_Input_Search) !== -1) {
        search_Employee_Array.push(object_Employee);
      }
    }

    return search_Employee_Array;
  }
}
export default Manager;
