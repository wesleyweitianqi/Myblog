import styles from "@/components/Login/index.module.scss";
import { useState } from "react";
import CountDown from "../CountDown";
import React, { ChangeEvent } from "react";
import { message } from "antd";
// import request from "@/service/fetch";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import firebaseApp from "@/service/firebase";

const auth = getAuth(firebaseApp);
interface IProps {
  isShow: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: Function;
  handleLogin: Function;
}

const Login = (props: IProps) => {
  const { isShow, setIsShown } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
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
    if (!form?.phone) {
      message.warning("Please enter phone number");
      return;
    }
    // if (form?.phone.length !== 11) {
    //   message.warning("Invalid phone number");
    //   return;
    // }

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

    signInWithPhoneNumber(auth, form?.phone, appVerifier)
      .then((res) => {
        setConfirmationResult(res);
        setIsShowVerifyCode(true);
      })
      .catch((err) => {
        console.log(err.message);
        // message.error(err);
      });
  };

  const handleVerifyCode = () => {
    confirmationResult
      ?.confirm(form?.verify)
      .then((result) => {
        console.log(result);
        message.success("Login successful");
        setIsShown(false);
      })
      .catch((error) => {
        console.error(error);
        message.error("Invalid verification code");
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
              <CountDown time={60} onEnd={onEnd} />
            ) : (
              "Auth-code"
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleVerifyCode}>
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
        <div id="recaptcha-container"></div>
      </div>
    </div>
  ) : null;
};

export default Login;
