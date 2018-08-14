export default function(checkbox) {
  const checkboxIdArr = checkbox.id.split('-');
  checkboxIdArr.pop();
  return checkboxIdArr.join(' ');
}
