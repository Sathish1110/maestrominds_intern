import React from "react";
import { useParams } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  progress: number;
}

interface CourseContentProps {
  courses: Course[];
}

const CourseContent: React.FC<CourseContentProps> = ({ courses }) => {
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) {
    return <div>Course not found.</div>;
  }
  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-content-page">
      <h1>{course.title}</h1>
      <img src={course.imageUrl} alt={course.title} className="course-image" />
      <p>
        <strong>Category:</strong> {course.category}
      </p>
      <p>
        <strong>Level:</strong> {course.level}
      </p>
      <p>{course.description}</p>
      {course.videoUrl && (
        <video controls>
          <source src={course.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${course.progress}%` }}
        />
      </div>
    </div>
  );
};

export default CourseContent;
