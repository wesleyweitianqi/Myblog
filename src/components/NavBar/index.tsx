import type { NextPage } from "next";
import { navs } from "./config";
import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { Button, Dropdown, Avatar, message } from "antd";
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import Login from "@/components/Login";
import { userContext } from "../Layout";
import firebaseApp from "@/service/firebase";
import { getAuth, signOut } from "firebase/auth";

const NavBar: NextPage = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [isShow, setIsShown] = useState(false);

  const { pathname, push } = useRouter();
  const auth = getAuth(firebaseApp);

  const handleGotoEditorPage = () => {
    if (currentUser) {
      push("/editor/new");
    } else {
      message.warning("Please login ");
    }
  };

  const handleLogin = () => {
    setIsShown(true);
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    setCurrentUser({});
  };

  const handleClose = () => {
    setIsShown(false);
  };

  const handleGotoPersonalPage = () => {
    push(`/user/${currentUser.uid}`);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={handleGotoPersonalPage}>
          <HomeOutlined />
          &nbsp; Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogout}>
          <LoginOutlined />
          &nbsp; Logout
        </div>
      ),
    },
  ];

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value} legacyBehavior>
            <a className={pathname === nav?.value ? styles.active : ""}>
              {nav?.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>Writing</Button>

        {currentUser ? (
          <>
            {
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Avatar src={currentUser.photoURL} size={32} />
              </Dropdown>
            }
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </section>
      <Login
        isShow={isShow}
        setIsShown={setIsShown}
        onClose={handleClose}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default NavBar;
