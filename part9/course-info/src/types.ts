export interface HeaderProps {
    name: string;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
    description?: string;
}

interface CourseNormalPart extends CoursePartBase {
    type: 'normal';  
}

interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
    type: 'submission';
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
    type: 'special';
    requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;



