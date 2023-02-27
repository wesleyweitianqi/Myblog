import styles from "@/components/Login/index.module.scss";
import { useState } from "react";
import CountDown from "../CountDown";
import React, { ChangeEvent } from "react";
import { message } from "antd";
import request from "@/service/fetch";

interface IProps {
  isShow: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: Function;
  handleLogin: Function;
}

const Login = (props: IProps) => {
  const { isShow, handleLogin, setIsShown } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    verify: "",
  });

  const handleClose = () => {
    setIsShown(false);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGetVerifyCode = () => {
    // setIsShowVerifyCode(true);
    if (!form?.phone) {
      message.warning("Please enter phone number");
    }
    request
      .post("/api/user/sendVerifyCode", {
        to: form?.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.message || "unknow");
        }
      });
  };

  const handleOAuthGithub = () => {};
  const onEnd = () => {
    setIsShowVerifyCode(false);
  };

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>Mobile Login</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          name="phone"
          type="text"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            name="verify"
            type="text"
            placeholder="Enter Auth Code"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={onEnd} />
            ) : (
              "Auth-code"
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          Login
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          Or Login By
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a
            href="https://moco.imooc.com/privacy.html"
            target="_blank"
            rel="noreferrer"
          >
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
