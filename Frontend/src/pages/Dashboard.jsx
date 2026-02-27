import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");   // 🔥 added search state
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    instructor: "",
  });

  const token = localStorage.getItem("token");

  // Fetch courses when page loads
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/courses",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/courses",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Course created successfully");
      setFormData({
        courseName: "",
        courseDescription: "",
        instructor: "",
      });
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/courses/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Create Course</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="courseDescription"
          placeholder="Course Description"
          value={formData.courseDescription}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Create Course</button>
      </form>

      <hr />

    
      <h3>Search Course</h3>

      <input
        type="text"
        placeholder="Search by course name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <hr />

      <h3>All Courses</h3>

      {courses
        .filter((course) =>
          course.courseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((course) => (
          <div key={course._id}>
            <p><b>{course.courseName}</b></p>
            <p>{course.courseDescription}</p>
            <p>{course.instructor}</p>
            <button onClick={() => handleDelete(course._id)}>
              Delete
            </button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Dashboard;