import Link from "next/link";
import { type ChangeEvent, type FC, useState, useContext } from "react";
import { FiEye, FiEyeOff, FiUserCheck } from "react-icons/fi";

import type InputDataType from "../util/InputDataType";
import inputValidator from "../util/inputValidator";
import type ValidatedOutput from "../util/ValidatedOutput";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";

const SignupComponent: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [uname, setUname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");

  const [passwordMisMatch, setPasswordMisMatch] = useState<boolean>(false);

  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [unameInvalid, setUnameInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

  const [duplEmail, setDuplEmail] = useState<boolean>(false);
  const [duplUname, setDuplUname] = useState<boolean>(false);

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const router = useRouter();

  const signupMutation = api.signup.signup.useMutation();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const obj: InputDataType = {
      email: email,
      uname: uname,
      password: password,
    };

    if (password !== cPassword) {
      setPasswordMisMatch(true);
      return;
    }

    const resObj: ValidatedOutput = inputValidator(obj);


    const obj2 = { name, uname: "", email: "", password: "" };

    let invalidDetected = false;

    if (!resObj.password) {
      console.log("INVALID Password");
      setPasswordInvalid(true);
      invalidDetected = true;
      // return;
    } else {
      obj2.password = password;
    }

    if (!resObj.email) {

      setEmailInvalid(true);
      invalidDetected = true;
      // return;
    } else {
      obj2.email = email;
    }

    if (!resObj.uname) {
      setUnameInvalid(true);
      invalidDetected = true;
      // return;
    } else {
      obj2.uname = uname;
    }

    if (invalidDetected) {
      return;
    }

    const resp = await signupMutation.mutateAsync({
      email: obj2.email,
      name: obj2.name,
      uname: obj2.uname,
      password: obj2.password,
    });


    if (resp.status === 201) {
      //do login and redirect

      const status = await signIn("credentials", {
        redirect: false,
        email: obj2.email,
        password: obj2.password,
        callbackUrl: "/app/feed",
      });

      if (!status) {
        setErrorDisplay(true);
        setErrorMessage('An unexpected error occured');
        setErrorType('logout');
        return;
      }

      if (status.ok) {
        router.push("/app/feed")
        .then(()=>{}).catch(()=>{});
      }
      //  else {
      //   // ERROR
      // }
    } else if (resp.status === 400) {
      if (resp.email) {
        setDuplEmail(true);
      } else if (resp.uname) {
        setDuplUname(true);
      } else {
        // show err modal
        setErrorDisplay(true);
        setErrorMessage('An unexpected error occured');
        setErrorType('simple');
      }
    }
  };

  return (
    <div
      className="
    m-auto w-5/6 max-w-md rounded-lg
    p-3 shadow-2xl bg-white/70"
    >
      <h2
        className="
      flex gap-1
      text-3xl font-medium
      "
      >
        <FiUserCheck />
        Sign Up:
      </h2>
      <form
        className="relative mt-4 flex flex-col gap-4"
        onSubmit={(e) => {
          handleLoginSubmit(e)
          .then(()=>{}).catch(()=>{});
        }}
      >
        <input
          className={`
        w-full rounded-lg
        bg-secondary2 p-1 outline-primary2
        `}
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
            setDuplEmail(false);
            setDuplUname(false);
          }}
        ></input>

        <div>
          <input
            className={`
        w-full rounded-lg
        bg-secondary2 p-1 outline-primary2
        `}
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setEmailInvalid(false);
              setDuplEmail(false);
              setDuplUname(false);
            }}
          ></input>
          <div
            className={`
            ${emailInvalid ? "block" : "hidden"}
            text-red-500
          `}
          >
            Invalid Email
          </div>
        </div>

        <div>
          <input
            className={`
        w-full rounded-lg
        bg-secondary2 p-1 outline-primary2
        `}
            placeholder="Username"
            type="text"
            value={uname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUname(e.target.value);
              setUnameInvalid(false);
              setDuplEmail(false);
              setDuplUname(false);
            }}
          ></input>
          <div
            className={`
            ${unameInvalid ? "block" : "hidden"}
            text-red-500
          `}
          >
            Username can only contain letters, digits, dots, underscores and
            hyphens
          </div>
        </div>

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
              setDuplEmail(false);
              setDuplUname(false);
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
              setDuplEmail(false);
              setDuplUname(false);
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

        <div
          className={`
            ${duplEmail || duplUname ? "block" : "hidden"}
            text-red-500
          `}
        >
          {`User with this ${duplEmail ? "email" : "username"} already exists`}
        </div>

        <button
          className="
        flex cursor-pointer items-center
        justify-center rounded-lg border-2
        border-solid border-primary2 bg-primary p-1
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:hover:text-white
        lg:active:bg-primary lg:active:text-black
        "
          type="submit"
        >
          Sign Up
        </button>

        <div>
          Already have an account?
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
      </form>
    </div>
  );
};

export default SignupComponent;
