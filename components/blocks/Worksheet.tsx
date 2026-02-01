import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Worksheet(props: { title?: string; children: any }) {
  return (
    <div className="worksheet">
      {props.title && <div className="worksheet-title">{props.title}</div>}
      {props.children}
    </div>
  );
}
