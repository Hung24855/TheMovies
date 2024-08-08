
/*Tạo ra 1 mảng các năm từ năm hiện tại về trước
    params number: số năm muốn tạo
*/ 
export function gennerateYear(number:number): number[] {
  let currentYear = new Date().getFullYear();
  const years = [currentYear];
  for (let i = 0; i < number; i++) {
    years.push(--currentYear);
  }
  return years;
}