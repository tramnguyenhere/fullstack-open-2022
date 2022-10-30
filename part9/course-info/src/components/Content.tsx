import { CoursePartProps } from "../types";

const Content = ({ parts }: { parts: CoursePartProps[] }) => {
  return (
    <div>
      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;