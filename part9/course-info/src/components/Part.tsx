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
                    <i>project exercises {part.groupProjectCount}</i>
                </div>
            );
        case 'submission':
            return (
                <div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                      submit to <a href={`${part.exerciseSubmissionLink}`}>{part.exerciseSubmissionLink}</a>
                    </div>
               </div>
            );
        case 'special':
            return (
                <div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        <i>Required skills: </i>
                        <ul>
                            {part.requirements.map(item => (
                                <li key={Math.floor(Math.random()*10000)}>{item}</li>
                            ))}
                        </ul>
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