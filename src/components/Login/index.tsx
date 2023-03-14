import styles from "@/components/Login/index.module.scss";
import { useContext, useState } from "react";
import CountDown from "../CountDown";
import React, { ChangeEvent } from "react";
import { message } from "antd";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import firebaseApp from "@/service/firebase";
import { userContext } from "../Layout";
import request, { LoginRequest } from "@/service/fetch";

const auth = getAuth(firebaseApp);

interface IProps {
  isShow: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: Function;
  handleLogin: Function;
}

const Login = (props: IProps) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  console.log("🚀 ~ file: index.tsx:27 ~ Login ~ currentUser:", currentUser);

  const { isShow, setIsShown } = props;
  const [isCounting, setIsCounting] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    verifyCode: "",
  });

  const handleClose = () => {
    setIsShown(false);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getAuthCode = async () => {
    if (!form?.phone) {
      message.warning("Please enter phone number");
      return;
    }
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // Handle the reCAPTCHA callback
        },
      },
      auth
    );

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      form?.phone,
      appVerifier
    );
    setConfirmationResult(confirmationResult);
  };

  const clickLogin = () => {
    confirmationResult
      ?.confirm(form?.verifyCode)
      .then((result) => {
        message.success("Login successful");
        setIsShown(false);
        setCurrentUser(result?.user);
        localStorage.setItem("accessToken", result?.user.accessToken);

        request("/api/user/login", {
          method: "POST",
          data: { ...form },
        } as LoginRequest).then((res: any) => {
          console.log(res);
        });
      })
      .catch((error) => {
        console.error(error);
        message.error("Invalid verification code");
      });
  };

  const handleOAuthGithub = () => {};
  const onEnd = () => {
    setIsCounting(false);
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
            name="verifyCode"
            type="text"
            placeholder="Enter Auth Code"
            value={form.verifyCode}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={getAuthCode}>
            {isCounting ? <CountDown time={60} onEnd={onEnd} /> : "Auth-code"}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={clickLogin}>
          Login
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          Or Login By Github
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
        <div id="recaptcha-container"></div>
      </div>
    </div>
  ) : null;
};

export default Login;
