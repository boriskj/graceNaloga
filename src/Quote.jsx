export default function Quote(props) {
  return (
    <>
      <div className=" rounded-md border-4 border-gray-500 p-6 text-center">
        <div>{props.test.content}</div>
        <div className="font-bold">{props.test.author}</div>
      </div>
    </>
  );
}
