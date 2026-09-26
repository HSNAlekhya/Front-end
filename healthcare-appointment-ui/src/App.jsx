import { useState } from "react";
import "./App.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 Years",
    rating: 4.9,
    reviews: 245,
    fee: 800,
    location: "Bhimavaram",
    availability: "Available Today",
    image: "https://i.pravatar.cc/150?img=47",
    about:
      "Experienced cardiologist specializing in heart health, preventive cardiology and cardiovascular treatment.",
  },
  {
    id: 2,
    name: "Dr. Michael Smith",
    specialty: "Dermatologist",
    experience: "9 Years",
    rating: 4.8,
    reviews: 189,
    fee: 600,
    location: "Vijayawada",
    availability: "Available Today",
    image: "https://i.pravatar.cc/150?img=12",
    about:
      "Dermatologist specializing in skin care, acne treatment, allergies and cosmetic dermatology.",
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Pediatrician",
    experience: "10 Years",
    rating: 4.9,
    reviews: 312,
    fee: 700,
    location: "Eluru",
    availability: "Tomorrow",
    image: "https://i.pravatar.cc/150?img=32",
    about:
      "Pediatrician providing comprehensive healthcare and preventive care for children.",
  },
  {
    id: 4,
    name: "Dr. David Brown",
    specialty: "Neurologist",
    experience: "15 Years",
    rating: 4.7,
    reviews: 167,
    fee: 1000,
    location: "Rajahmundry",
    availability: "Available Today",
    image: "https://i.pravatar.cc/150?img=68",
    about:
      "Neurologist specializing in neurological disorders, headaches and nervous system conditions.",
  },
  {
    id: 5,
    name: "Dr. Olivia Taylor",
    specialty: "Gynecologist",
    experience: "11 Years",
    rating: 4.8,
    reviews: 220,
    fee: 900,
    location: "Vijayawada",
    availability: "Tomorrow",
    image: "https://i.pravatar.cc/150?img=44",
    about:
      "Gynecologist offering women's health services, preventive care and consultation.",
  },
  {
    id: 6,
    name: "Dr. James Anderson",
    specialty: "Orthopedic",
    experience: "14 Years",
    rating: 4.9,
    reviews: 278,
    fee: 850,
    location: "Bhimavaram",
    availability: "Available Today",
    image: "https://i.pravatar.cc/150?img=11",
    about:
      "Orthopedic specialist focused on bone, joint and muscle health and treatment.",
  },
];

const specialties = [
  {
    name: "Cardiologist",
    icon: "❤️",
    description: "Heart & cardiovascular care",
  },
  {
    name: "Dermatologist",
    icon: "🧴",
    description: "Skin & hair care",
  },
  {
    name: "Pediatrician",
    icon: "👶",
    description: "Child healthcare",
  },
  {
    name: "Neurologist",
    icon: "🧠",
    description: "Brain & nervous system",
  },
  {
    name: "Gynecologist",
    icon: "🌸",
    description: "Women's healthcare",
  },
  {
    name: "Orthopedic",
    icon: "🦴",
    description: "Bone & joint care",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "28 Sep 2026",
      time: "10:30 AM",
      status: "Confirmed",
      image: "https://i.pravatar.cc/150?img=47",
    },
  ]);

  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    patientName: "",
    phone: "",
    reason: "",
  });

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "All" ||
      doctor.specialty === selectedSpecialty;

    const matchesLocation =
      location === "All" || doctor.location === location;

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const openDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setPage("doctor");
  };

  const bookAppointment = () => {
    if (
      !bookingForm.date ||
      !bookingForm.time ||
      !bookingForm.patientName ||
      !bookingForm.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: bookingForm.date,
      time: bookingForm.time,
      status: "Confirmed",
      image: selectedDoctor.image,
    };

    setAppointments([...appointments, newAppointment]);

    setBookingForm({
      date: "",
      time: "",
      patientName: "",
      phone: "",
      reason: "",
    });

    setSelectedDoctor(null);
    setPage("appointments");
    alert("Appointment booked successfully!");
  };

  const cancelAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="container nav">
          <div className="logo" onClick={() => setPage("home")}>
            <span className="logo-icon">+</span>
            <span>HealthCare</span>
          </div>

          <nav className="nav-links">
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => setPage("home")}
            >
              Home
            </button>

            <button
              className={page === "doctors" ? "active" : ""}
              onClick={() => setPage("doctors")}
            >
              Find Doctors
            </button>

            <button
              className={page === "specialties" ? "active" : ""}
              onClick={() => setPage("specialties")}
            >
              Specialties
            </button>

            <button
              className={page === "appointments" ? "active" : ""}
              onClick={() => setPage("appointments")}
            >
              My Appointments
            </button>
          </nav>

          <button className="profile-btn" onClick={() => setPage("profile")}>
            👤 Profile
          </button>
        </div>
      </header>

      {/* HOME */}
      {page === "home" && (
        <>
          <section className="hero">
            <div className="container hero-content">
              <div className="hero-text">
                <span className="hero-badge">Trusted Healthcare Platform</span>

                <h1>
                  Your Health,
                  <br />
                  <span>Our Priority.</span>
                </h1>

                <p>
                  Find trusted doctors, explore medical specialties and book
                  healthcare appointments easily.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => setPage("doctors")}
                >
                  Find a Doctor →
                </button>
              </div>

              <div className="hero-card">
                <div className="doctor-avatar">👨‍⚕️</div>
                <h3>Quality Healthcare</h3>
                <p>Connect with experienced healthcare professionals.</p>

                <div className="hero-stats">
                  <div>
                    <strong>500+</strong>
                    <span>Doctors</span>
                  </div>

                  <div>
                    <strong>20+</strong>
                    <span>Specialties</span>
                  </div>

                  <div>
                    <strong>10K+</strong>
                    <span>Patients</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEARCH */}
          <section className="search-section">
            <div className="container">
              <div className="search-box">
                <div className="search-field">
                  <label>Search Doctor</label>
                  <input
                    type="text"
                    placeholder="Doctor or specialty"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="search-field">
                  <label>Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option>All</option>
                    <option>Bhimavaram</option>
                    <option>Vijayawada</option>
                    <option>Eluru</option>
                    <option>Rajahmundry</option>
                  </select>
                </div>

                <button
                  className="search-btn"
                  onClick={() => setPage("doctors")}
                >
                  Search
                </button>
              </div>
            </div>
          </section>

          {/* SPECIALTIES */}
          <section className="section">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="small-title">EXPLORE</span>
                  <h2>Medical Specialties</h2>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setPage("specialties")}
                >
                  View All →
                </button>
              </div>

              <div className="specialty-grid">
                {specialties.map((specialty) => (
                  <div
                    className="specialty-card"
                    key={specialty.name}
                    onClick={() => {
                      setSelectedSpecialty(specialty.name);
                      setPage("doctors");
                    }}
                  >
                    <div className="specialty-icon">{specialty.icon}</div>
                    <h3>{specialty.name}</h3>
                    <p>{specialty.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DOCTORS */}
          <section className="section doctors-section">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="small-title">OUR DOCTORS</span>
                  <h2>Top Doctors</h2>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setPage("doctors")}
                >
                  View All →
                </button>
              </div>

              <div className="doctor-grid">
                {doctors.slice(0, 3).map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onView={openDoctor}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* DOCTORS PAGE */}
      {page === "doctors" && (
        <section className="page-section">
          <div className="container">
            <div className="page-title">
              <span className="small-title">HEALTHCARE PROFESSIONALS</span>
              <h1>Find a Doctor</h1>
              <p>Search and choose a doctor based on your healthcare needs.</p>
            </div>

            <div className="filters">
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option>All</option>
                {specialties.map((specialty) => (
                  <option key={specialty.name}>{specialty.name}</option>
                ))}
              </select>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All</option>
                <option>Bhimavaram</option>
                <option>Vijayawada</option>
                <option>Eluru</option>
                <option>Rajahmundry</option>
              </select>
            </div>

            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onView={openDoctor}
                />
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="empty-state">
                <div>🔍</div>
                <h3>No doctors found</h3>
                <p>Try changing your search or filters.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SPECIALTIES PAGE */}
      {page === "specialties" && (
        <section className="page-section">
          <div className="container">
            <div className="page-title">
              <span className="small-title">HEALTHCARE</span>
              <h1>Medical Specialties</h1>
              <p>Choose a specialty to find the right doctor.</p>
            </div>

            <div className="specialty-grid large">
              {specialties.map((specialty) => (
                <div
                  className="specialty-card"
                  key={specialty.name}
                  onClick={() => {
                    setSelectedSpecialty(specialty.name);
                    setPage("doctors");
                  }}
                >
                  <div className="specialty-icon">{specialty.icon}</div>
                  <h3>{specialty.name}</h3>
                  <p>{specialty.description}</p>
                  <span className="specialty-link">Find Doctors →</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DOCTOR DETAILS */}
      {page === "doctor" && selectedDoctor && (
        <section className="page-section">
          <div className="container">
            <button className="back-btn" onClick={() => setPage("doctors")}>
              ← Back to Doctors
            </button>

            <div className="doctor-detail">
              <div className="doctor-profile">
                <img src={selectedDoctor.image} alt={selectedDoctor.name} />

                <div className="doctor-detail-info">
                  <span className="verified">✓ Verified Doctor</span>

                  <h1>{selectedDoctor.name}</h1>

                  <h3>{selectedDoctor.specialty}</h3>

                  <div className="rating">
                    ⭐ {selectedDoctor.rating}
                    <span>({selectedDoctor.reviews} reviews)</span>
                  </div>

                  <p>📍 {selectedDoctor.location}</p>

                  <p>💼 {selectedDoctor.experience} experience</p>

                  <p>💰 Consultation Fee: ₹{selectedDoctor.fee}</p>

                  <div className="available">
                    ● {selectedDoctor.availability}
                  </div>
                </div>
              </div>

              <div className="doctor-about">
                <h2>About Doctor</h2>
                <p>{selectedDoctor.about}</p>

                <h2>Book Appointment</h2>

                <div className="booking-form">
                  <div className="form-row">
                    <div>
                      <label>Appointment Date *</label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label>Preferred Time *</label>
                      <select
                        value={bookingForm.time}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            time: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Time</option>
                        <option>09:00 AM</option>
                        <option>10:30 AM</option>
                        <option>12:00 PM</option>
                        <option>02:30 PM</option>
                        <option>04:00 PM</option>
                        <option>06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label>Patient Name *</label>
                      <input
                        type="text"
                        placeholder="Enter patient name"
                        value={bookingForm.patientName}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            patientName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={bookingForm.phone}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <label>Reason for Visit</label>
                  <textarea
                    placeholder="Describe your reason for consultation..."
                    value={bookingForm.reason}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        reason: e.target.value,
                      })
                    }
                  />

                  <button
                    className="primary-btn full"
                    onClick={bookAppointment}
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* APPOINTMENTS */}
      {page === "appointments" && (
        <section className="page-section">
          <div className="container">
            <div className="page-title">
              <span className="small-title">MY HEALTHCARE</span>
              <h1>My Appointments</h1>
              <p>View and manage your upcoming appointments.</p>
            </div>

            <div className="appointments-list">
              {appointments.length === 0 ? (
                <div className="empty-state">
                  <div>📅</div>
                  <h3>No appointments yet</h3>
                  <p>Book an appointment with a doctor to see it here.</p>
                  <button
                    className="primary-btn"
                    onClick={() => setPage("doctors")}
                  >
                    Find a Doctor
                  </button>
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div className="appointment-card" key={appointment.id}>
                    <img src={appointment.image} alt={appointment.doctor} />

                    <div className="appointment-info">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                      <div className="appointment-meta">
                        <span>📅 {appointment.date}</span>
                        <span>🕐 {appointment.time}</span>
                      </div>
                    </div>

                    <div className="appointment-actions">
                      <span
                        className={
                          appointment.status === "Confirmed"
                            ? "status confirmed"
                            : "status cancelled"
                        }
                      >
                        {appointment.status}
                      </span>

                      {appointment.status === "Confirmed" && (
                        <button
                          className="cancel-btn"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <section className="page-section">
          <div className="container">
            <div className="page-title">
              <span className="small-title">ACCOUNT</span>
              <h1>My Profile</h1>
              <p>Manage your healthcare profile information.</p>
            </div>

            <div className="profile-card">
              <div className="profile-avatar">👤</div>

              <div className="profile-info">
                <h2>Patient Profile</h2>
                <p>Manage your personal information and appointments.</p>

                <div className="profile-fields">
                  <div>
                    <span>Full Name</span>
                    <strong>Patient Name</strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>patient@example.com</strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>+91 98765 43210</strong>
                  </div>

                  <div>
                    <span>Appointments</span>
                    <strong>{appointments.length}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <div className="logo footer-logo">
              <span className="logo-icon">+</span>
              <span>HealthCare</span>
            </div>
            <p>Making healthcare appointments simpler and easier.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <button onClick={() => setPage("doctors")}>Find Doctors</button>
            <button onClick={() => setPage("specialties")}>
              Specialties
            </button>
            <button onClick={() => setPage("appointments")}>
              Appointments
            </button>
          </div>

          <div>
            <h4>Contact</h4>
            <p>📧 support@healthcare.com</p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>

        <div className="copyright">
          © 2026 HealthCare Appointment UI. Frontend project for learning.
        </div>
      </footer>
    </div>
  );
}

function DoctorCard({ doctor, onView }) {
  return (
    <div className="doctor-card">
      <div className="doctor-card-top">
        <img src={doctor.image} alt={doctor.name} />

        <div>
          <span className="verified-small">✓ Verified</span>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
        </div>
      </div>

      <div className="doctor-info">
        <div>
          ⭐ <strong>{doctor.rating}</strong>
          <span> ({doctor.reviews})</span>
        </div>

        <div>💼 {doctor.experience}</div>
        <div>📍 {doctor.location}</div>
      </div>

      <div className="doctor-card-bottom">
        <strong>₹{doctor.fee}</strong>
        <span>Consultation</span>

        <button onClick={() => onView(doctor)}>View Doctor</button>
      </div>
    </div>
  );
}

export default App;