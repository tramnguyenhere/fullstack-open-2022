import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.name}>
          <div>
          {part.name} {part.exerciseCount}
          </div>
          <div>
              <Part part={part} />
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Content;