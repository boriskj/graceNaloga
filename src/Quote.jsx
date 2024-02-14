export default function Quote(props) {
  return (
    <>
      <div>{props.quote.content}</div>
      <div>{props.quote.author}</div>
    </>
  );
}
