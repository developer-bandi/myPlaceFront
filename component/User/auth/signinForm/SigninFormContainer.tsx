import SignInForm from "./SigninForm";
import useSigninForm from "./SigninFormHook";

const SigninFormContainer = () => {
  const {checkLogin, idInputRef, passwordInputRef} = useSigninForm();

  return (
    <SignInForm
      checkLogin={checkLogin}
      idInputRef={idInputRef}
      passwordInputRef={passwordInputRef}
    ></SignInForm>
  );
};

export default SigninFormContainer;
