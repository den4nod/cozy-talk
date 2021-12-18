export function Post({subject, body, tags}) {
  return (
    <div>
      <h3><b>{subject}</b></h3>
      <div>{body}</div>
      <div>{tags}</div>
    </div>
  );
}
