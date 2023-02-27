import type { NextPage } from "next";
import { navs } from "./config";
import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useState } from "react";
import Login from "@/components/Login";

const NavBar: NextPage = () => {
  let userId;
  const [isShow, setIsShown] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const handleGotoEditorPage = () => {};

  const handleLogin = () => {
    setIsShown(true);
  };

  const handleClose = () => {
    setIsShown(false);
  };

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

        {userId ? (
          <>
            {/* <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown> */}
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
