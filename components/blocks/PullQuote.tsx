export default function PullQuote(props: {
  source?: string;
  children: any;
}) {
  return (
    <div className="pullquote">
      <p>{props.children}</p>
      {props.source && (
        <div className="pullquote-source">&mdash; {props.source}</div>
      )}
    </div>
  );
}
