const ErrorMessage = ({ errors }) =>
  Array.isArray(errors) &&
  errors.length > 0 && (
    <ul className="alert alert-danger">
      {errors.map(({ message }) => (
        <li key={message} className="mx-2">
          {message}
        </li>
      ))}
    </ul>
  );

export default ErrorMessage;
