import SignupForm from "./SignupForm";
import useSignupForm from "./SignupFormHook";

const SignupFormContainer = () => {
  const {
    signup,
    idInputRef,
    passwordInputRef,
    passwordCheckInputRef,
    nicknameInputRef,
    emailInputRef,
  } = useSignupForm();

  return (
    <SignupForm
      signup={signup}
      idInputRef={idInputRef}
      passwordInputRef={passwordInputRef}
      passwordCheckInputRef={passwordCheckInputRef}
      nicknameInputRef={nicknameInputRef}
      emailInputRef={emailInputRef}
    />
  );
};

export default SignupFormContainer;
