export type User = {
    user: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    // image?: string;
    password?: string;
    confirmPassword?: string;
    token:string


  username?: string;
  accountType?: "Admin" | "Customer" | "Mechanic";
  profilePhoto?: string;
  phoneNumber?: string;
  orders?:string[];
  resetPasswordExpires?: Date | null;
  id?: string;
  carSelected?: string[];
  mechName?: string;
           address?: string;
            zipcode?: string;
            state?: string;
             country?: string;
               yourCar?: string[];
              favouriteCar?: string[];
    // isAdmin?: boolean;
    // _id?: string;
    // token?: string;
    // createdAt?: string;
    // updatedAt?: string;
  };
  
  export type Passwords = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  
  export type RowsType = {
    data: any;
    users: any;
    onEditFunction?: any;
    onDeleteFunction?: any;
  };
  