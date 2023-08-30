export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  addressL: string;
}
//DTO , muốn data giữa FE và BE thống nhất với nhau
//không dùng interface cho DTO -> dùng class
//DTO là 1 object định nghĩa hình dạng dữ liệu được “transfer” (frontend và backend)
