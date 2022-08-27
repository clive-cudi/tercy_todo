export function SignupForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input type={`email`} placeholder={`Enter your email`} />
      <input type={`text`} placeholder={`Enter preferred username`} />
      <input type="password" placeholder={`Enter password`} />
      <input type="password" placeholder={`Confirm password`} />
      <button type={`submit`}>Submit</button>
    </form>
  );
}
