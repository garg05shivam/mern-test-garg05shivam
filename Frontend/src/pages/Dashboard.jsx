import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    instructor: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCourses = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    loadCourses();
  }, [navigate, token]);

  const fetchCourses = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
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
      await axios.post("http://localhost:5000/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Create Course</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="courseDescription"
          placeholder="Course Description"
          value={formData.courseDescription}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
        <br />
        <br />

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
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((course) => (
          <div key={course._id}>
            <p>
              <b>{course.courseName}</b>
            </p>
            <p>{course.courseDescription}</p>
            <p>{course.instructor}</p>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
