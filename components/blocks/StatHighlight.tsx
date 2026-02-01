export default function StatHighlight(props: {
  number: string;
  children: any;
}) {
  return (
    <div className="stat-highlight">
      <div className="stat-number">{props.number}</div>
      <div className="stat-text">{props.children}</div>
    </div>
  );
}
