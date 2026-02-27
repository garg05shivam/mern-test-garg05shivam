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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="secondary-btn">Logout</button>
      </div>

      <section className="panel search-panel">
      <h3>Search Course</h3>
      <input
        type="text"
        placeholder="Search by course name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-input"
      />
      </section>

      <section className="panel">
      <h3>Create Course</h3>
      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          className="text-input"
        />

        <input
          type="text"
          name="courseDescription"
          placeholder="Course Description"
          value={formData.courseDescription}
          onChange={handleChange}
          className="text-input"
        />

        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="text-input"
        />

        <button type="submit" className="primary-btn">Create Course</button>
      </form>
      </section>

      <section className="panel">
      <h3>All Courses</h3>
      <div className="course-list">
      {courses
        .filter((course) =>
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((course) => (
          <div key={course._id} className="course-item">
            <p>
              <b>{course.courseName}</b>
            </p>
            <p>{course.courseDescription}</p>
            <p>{course.instructor}</p>
            <button onClick={() => handleDelete(course._id)} className="danger-btn">Delete</button>
          </div>
        ))}
        {courses.length === 0 && <p className="empty-state">No courses yet. Create your first one.</p>}
      </div>
      </section>
    </div>
  );
}

export default Dashboard;
