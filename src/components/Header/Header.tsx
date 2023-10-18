import { AuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>Welcome!</h1>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
