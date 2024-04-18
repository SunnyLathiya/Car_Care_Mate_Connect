export type User = {
    user: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    // image?: string;
    password?: string;
    confirmPassword?: string;
    token:string
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
  