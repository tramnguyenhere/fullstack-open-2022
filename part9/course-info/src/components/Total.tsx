import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <div>
            <p>
                Number of exercises {parts.reduce((sum,part)=>sum+part.exerciseCount, 0)}
            </p>
        </div>
    );
};

export default Total;