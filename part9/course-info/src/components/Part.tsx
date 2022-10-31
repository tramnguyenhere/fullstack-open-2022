import { CoursePart } from "../types";

const Part = ({part}:{part: CoursePart}) => {
    switch (part.type) {
        case 'normal': 
            return (
                <div>
                    <i>{part.description}</i>
                </div>
            );
        case 'groupProject':
            return (
                <div>
                    <i>Number of projects: {part.groupProjectCount}</i>
                </div>
            );
        case 'submission':
            return (
                <div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                       <a href={`${part.exerciseSubmissionLink}`}>{part.exerciseSubmissionLink}</a>
                    </div>
               </div>
            );
        default:
            return assertNever(part);
    } 
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default Part;