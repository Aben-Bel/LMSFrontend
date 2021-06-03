import VideoC from "./VideoC";

export default function Content(props) {
  console.log("in content");
  const { id, title, contentType } = props.data;
  const type = contentType ? contentType.toLowerCase() : "";
  console.log("data: ", props.data);

  if (type.includes("video")) {
    console.log("was here for video");
    return (
      <div>
        <VideoC src="path"></VideoC>
      </div>
    );
  }
  if (type.includes("quiz")) {
    return <div>{title + "- QUIZ"}</div>;
  }

  if (type.includes("note")) {
    return <div>{title + "- NOTE"}</div>;
  }

  return <div>{title}</div>;
}
