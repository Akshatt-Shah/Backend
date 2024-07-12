export class messages {
  addsuccess(message: string) {
    return message + " Created Successfully..";
  }
  adderror(message: string) {
    return message + " Not Created Successfully..";
  }
  getsuccess(message: string) {
    return message + " Retriewed Successfully..";
  }
  geterror(message: string) {
    return message + " Not Retriewed Successfully..";
  }
  updatesuccess(message: string) {
    return message + " Updated Successfully..";
  }
  updateerror(message: string) {
    return message + " Not Updated Successfully..";
  }
  deletesuccess(message: string) {
    return message + " Deleted Successfully..";
  }
  deleteerror(message: string) {
    return message + " Not Deleted Successfully..";
  }
  loginsuccess(message: string) {
    return message + " Login Successfully..";
  }
  loginerror(message: string) {
    return message + "  Login UnSuccessfull..";
  }
}
