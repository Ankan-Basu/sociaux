import Link from "next/link";
import React, { type ChangeEvent, type FC, useState, useContext } from "react";
import { FiLock, FiEyeOff, FiEye, FiLogIn } from "react-icons/fi";
import type InputDataType from "../util/InputDataType";
import inputValidator from "../util/inputValidator";
import type ValidatedOutput from "../util/ValidatedOutput";

import { useSession, signIn, type SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../loading/loading";
import { api } from "~/utils/api";
import { ErrorContext, ErrorContextType } from "~/contexts/errorContext";
import { TRPCClientError } from "@trpc/client";

const PasswordResetComponent: FC = () => {
  const session = useSession();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [passwordMisMatch, setPasswordMisMatch] = useState<boolean>(false);

  const [unameEmail, setUnameEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");

  const [otp, setOtp] = useState<string>("");
  const [otpReceived, setOtpReceived] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);

  const [currErr, setCurrErr] = useState<string>("");
  const [waiting, setWaiting] = useState<boolean>(false);

  const [restDone, setResetDone] = useState<boolean>(false);

  const { setErrorDisplay, setErrorMessage, setErrorType } = useContext(
    ErrorContext
  ) as ErrorContextType;

  const emailVerifier = api.passwordReset.verifyMail.useMutation();
  const otpSendMutation = api.passwordReset.sendOtp.useMutation();
  const otpVerifier = api.passwordReset.verifyOtp.useMutation();
  const passwordMutation = api.passwordReset.changePassword.useMutation();

  const handlePasswordResetSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (!otpReceived) {
        // verify email and send otp
        if (!unameEmail) {
          return;
        }
        if (currErr) {
          return;
        }
        try {
          setWaiting(true);
          const x = await otpSendMutation.mutateAsync({ email: unameEmail });
          console.log("EMAIL veri", x);
          setWaiting(false);
          if (x.status === 200) {
            setOtpReceived(true);
          } else if (x.status === 500) {
            setCurrErr("No account is linked with this email");
          } else {
            throw "Error";
          }
        } catch (err) {
          setWaiting(false);
          throw err;
        }
      } else {
        if (!otpVerified) {
          // verify otp and grant change password right
          if (!otp) {
            return;
          }
          try {
            const x = await otpVerifier.mutateAsync({
              email: unameEmail,
              otp: otp,
            });
            if (x) {
              setOtpVerified(true);
            } else {
              setCurrErr("Wrong OTP or OTP expired");
            }
          } catch (err) { throw err; }
        } else {
          //change password
          if (!password || passwordMisMatch) {
            return;
          }

          if (password.length < 8) {
            setPasswordInvalid(true);
            return;
          }

          try {
            const x = passwordMutation.mutateAsync({
              email: unameEmail,
              password: password,
            });
            setResetDone(true);
          } catch (err) { throw err; }
        }
      }
    } catch (err) {
      setErrorDisplay(true);
      let msg = "An unexpexted error occured";
      if (err instanceof TRPCClientError) {
        msg = err.data.code || msg;
      }
      setErrorMessage(msg);
      setErrorType("redirectLogin");
    }
  };


  if (restDone) {
    return (
      <div
      className="
    m-auto w-5/6 max-w-md rounded-lg bg-white/70 p-3
    shadow-2xl"
    >
      <h2
        className="
      flex gap-1
      text-3xl font-medium
      "
      >
        <FiLock />
        Reset Password:
      </h2>
        <div className="mt-4">
          Password reset successfully.
        </div>
        <div>You can now 
        <Link href="/app/login">
            <span
              className="
        ml-1
        text-primary active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary"
            >
              Login.
            </span>
            </Link>
          </div>
      
    </div>
    )
  }

  return (
    <div
      className="
    m-auto w-5/6 max-w-md rounded-lg bg-white/70 p-3
    shadow-2xl"
    >
      <h2
        className="
      flex gap-1
      text-3xl font-medium
      "
      >
        <FiLock />
        Reset Password:
      </h2>
      <form
        className="relative mt-4 flex flex-col gap-4"
        onSubmit={(e) => {
          handlePasswordResetSubmit(e)
            .then(() => {})
            .catch(() => {});
        }}
      >
        <input
          className={`
        w-full rounded-lg
        bg-secondary2 p-1
         outline-primary2 
        `}
          placeholder="Email"
          type="text"
          value={unameEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (!otpReceived) {
              setUnameEmail(e.target.value);
              setCurrErr("");
            }
          }}
        />

        <input
          className={`
        ${otpReceived ? "block" : "hidden"}
        w-full rounded-lg
        bg-secondary2 p-1
         outline-primary2 
        `}
          placeholder="OTP"
          type="text"
          value={otp}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (!otpVerified) {
              setOtp(e.target.value);
              setCurrErr("");
            }
          }}
        />

        {/*  PASSWORDS */}
        <div className={`${otpVerified ? "flex" : "hidden"} flex-col gap-4`}>
          <div className="relative">
            <input
              className={`
        w-full rounded-lg
        bg-secondary2 p-1 outline-primary2
        `}
              placeholder="Password"
              type={`${showPassword ? "text" : "password"}`}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setPasswordInvalid(false);
                if (e.target.value !== cPassword) {
                  setPasswordMisMatch(true);
                } else {
                  setPasswordMisMatch(false);
                }
              }}
            ></input>

            {/*  --- Eye icon --- */}
            <div
              className={`
        ${showPassword ? "block" : "hidden"}
        absolute top-0
        right-0 cursor-pointer p-2
        text-lg
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
              onClick={() => setShowPassword((currState) => !currState)}
            >
              <FiEyeOff />
            </div>

            <div
              className={`
        ${!showPassword ? "block" : "hidden"}
        absolute top-0
        right-0 cursor-pointer p-2
        text-lg
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
              onClick={() => setShowPassword((currState) => !currState)}
            >
              <FiEye />
            </div>
            {/*  --- Eye icon --- */}

            <div
              className={`
${passwordInvalid ? "block" : "hidden"}
text-red-500

`}
            >
              Passwords must be atleast 8 characters long
            </div>
          </div>

          {/* confirm password */}
          <div className="relative">
            <input
              className={`
        w-full rounded-lg
        bg-secondary2 p-1 outline-primary2
        `}
              placeholder="Confirm Password"
              type={`${showCPassword ? "text" : "password"}`}
              value={cPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCPassword(e.target.value);
                setPasswordInvalid(false);
                if (e.target.value !== password) {
                  setPasswordMisMatch(true);
                } else {
                  setPasswordMisMatch(false);
                }
              }}
            ></input>

            {/*  --- Eye icon --- */}
            <div
              className={`
        ${showCPassword ? "block" : "hidden"}
        absolute top-0
        right-0 cursor-pointer p-2
        text-lg
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
              onClick={() => setShowCPassword((currState) => !currState)}
            >
              <FiEyeOff />
            </div>

            <div
              className={`
        ${!showCPassword ? "block" : "hidden"}
        absolute top-0
        right-0 cursor-pointer p-2
        text-lg
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
              onClick={() => setShowCPassword((currState) => !currState)}
            >
              <FiEye />
            </div>
            {/*  --- Eye icon --- */}

            <div
              className={`
${passwordMisMatch ? "block" : "hidden"}
text-red-500

`}
            >
              Passwords don&apos;t match
            </div>
          </div>
        </div>
        <div
          className={`
        ${currErr ? "block" : "hidden"}
        text-red-500
        `}
        >
          {currErr}
        </div>

        <div className={`mx-auto ${waiting ? "block" : "hidden"}`}>
          <Loading height={30} width={30} />
        </div>

        <button
          className="
        flex
        cursor-pointer items-center
        justify-center rounded-lg border-2
        border-solid
        border-primary2 bg-primary p-1
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:hover:text-white
        lg:active:bg-primary lg:active:text-black
        "
          type="submit"
        >
          Submit
        </button>

        <div
          className="
      /text-primary /active:text-primary2
      h-1/2lg:hover:text-primary2 /lg:active:text-primary"
        >
          Remembered Password?
          <Link href="/app/login">
            <span
              className="
        ml-1
        text-primary active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary"
            >
              Login.
            </span>
          </Link>
        </div>

        <div>
          Don&apos;t have an account?
          <Link href="/app/signup">
            <span
              className="
        ml-1
        text-primary active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary"
            >
              Sign Up.
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetComponent;
