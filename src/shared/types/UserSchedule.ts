import { Serialized } from 'chrome-extension-toolkit';
import { Course } from './Course';

/**
 * Represents a user's schedule that is stored in the extension
 */
export class UserSchedule {
    courses: Course[];
    id: string;
    name: string;
    creditHours: number;

    constructor(schedule: Serialized<UserSchedule>) {
        this.courses = schedule.courses.map(c => new Course(c));
        this.creditHours = this.courses.reduce((acc, course) => acc + course.creditHours, 0);
        this.id = schedule.id;
        this.name = schedule.name;
    }

    containsCourse(course: Course): boolean {
        return this.courses.some(c => c.uniqueId === course.uniqueId);
    }
}
