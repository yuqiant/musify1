import Signin from "./signin";
import Account from "./account";
import UserTable from "./table";
import Signup from "./signup";
import { Routes, Route } from "react-router-dom";
import Nav from "./nav";

function Users() {
  return (
    <div className="row">
      <div>
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="profile" element={<Account />} />
          <Route path="signup" element={<Signup />} />
          <Route path="admin/dashboard" element={<UserTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default Users;
