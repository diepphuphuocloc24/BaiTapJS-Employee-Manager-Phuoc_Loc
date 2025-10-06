import { dom_Element_Id } from "./main.js";

class Validation {
  input_Empty(input, errorID, inputID, message) {
    if (input === "") {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    } else {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    }
  }

  select_Empty(selectID, errorID, message) {
    const optionIndex = dom_Element_Id(selectID).selectedIndex;
    if (optionIndex === 0) {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(selectID).classList.add("is-invalid");
      return false;
    } else {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(selectID).classList.remove("is-invalid");
      return true;
    }
  }

  checkExist(input, errorID, inputID, message, array_Employee) {
    let isExist = false;
    for (let i = 0; i < array_Employee.length; i += 1) {
      const object_Employee = array_Employee[i];
      if (input === object_Employee.tai_Khoan) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    } else {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    }
  }

  checkTK_Length(input, errorID, inputID, message, min, max) {
    if ((input && min > input.trim().length) || max < input.trim().length) {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    } else {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    }
  }

  checkCharacter_String(input, errorID, inputID, message) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(letter)) {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    } else {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    }
  }

  checkCharacter_Number(input, errorID, inputID, message) {
    const number = /^[0-9]+$/;
    if (input.match(number)) {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    } else {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    }
  }

  checkEmail(input, errorID, inputID, message) {
    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(email)) {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    } else {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    }
  }

  checkPassword(input, errorID, inputID, message) {
    const password =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(password)) {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    } else {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    }
  }

  checkNgaylam(input, errorID, inputID, message) {
    const ngay_Lam =
      /^(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (input.match(ngay_Lam)) {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    } else {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
        " " +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    }
  }

  checkLuongcoban(input, errorID, inputID, message, min, max) {
    if (Number(input) < min || Number(input) > max) {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    } else {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    }
  }

  checkGiolam(input, errorID, inputID, message, min, max) {
    if (Number(input) < min || Number(input) > max) {
      dom_Element_Id(errorID).style.display = "block";
      dom_Element_Id(errorID).innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' +
        message;
      dom_Element_Id(inputID).classList.add("is-invalid");
      dom_Element_Id(inputID).classList.remove("is-valid");
      return false;
    } else {
      dom_Element_Id(errorID).style.display = "none";
      dom_Element_Id(errorID).innerHTML = "";
      dom_Element_Id(inputID).classList.remove("is-invalid");
      dom_Element_Id(inputID).classList.add("is-valid");
      return true;
    }
  }
}
export default Validation;
