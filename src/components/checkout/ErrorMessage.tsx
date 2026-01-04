type ErrorMessageProps = {
  msg: string | undefined;
};
const ErrorMessage = ({ msg }: ErrorMessageProps) => {
  return <p className="text-red-500 text-xs">{msg}</p>;
};

export default ErrorMessage;
