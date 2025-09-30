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
    this.array_Employee.splice(index, 1);
  }

  edit_Employee(tai_Khoan) {
    const index = this.locate_index(tai_Khoan);
    const object_Employee = this.array_Employee[index];
    return object_Employee;
  }

  update_Employee(tai_Khoan) {
    const index = this.locate_index(tai_Khoan);
    const object_Employee = this.array_Employee[index];
    const new_tai_Khoan = object_Employee.tai_Khoan;
    return new_tai_Khoan;
  }

  filter_Employee(input_Search) {
    const filter_Employee = [];

    for (let i = 0; i < this.array_Employee.length; i += 1) {
      const object_Employee = this.array_Employee[i];
      if (input_Search === object_Employee.xep_Loai) {
        filter_Employee.push(object_Employee);
      }
    }
    return filter_Employee;
  }
}
export default Manager;
