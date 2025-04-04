export default function Error({ status, msg }) {
  return (
    <div className="error-page">
      <h2>Error {status}</h2>
      <p>{msg}</p>
      <p>Please try again or go back to the homepage.</p>
    </div>
  );
}