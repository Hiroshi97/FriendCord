import Swal from 'sweetalert2';

export const triggerAlert = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton: false,
      timer: 2000
    })
  }