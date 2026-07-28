USE p06_eduhub;

-- ----------------------------------------------------------
-- 1. USERS (2 Students, 2 Institutes)
-- -----------------------------------------------------
INSERT INTO USERS (name, email, password, role, status, approval_status, created_at) VALUES
('Rohan Sharma', 'rohan@example.com', 'edu123', 'student', 'active', 'approved', '2026-06-15 10:00:00'),
('Priya Patel', 'priya@example.com', 'edu123', 'student', 'active', 'approved', '2026-06-16 11:30:00'),
('Tech Elevate Academy', 'contact@techelevate.in', 'edu123', 'institute', 'active', 'approved', '2026-06-10 09:00:00'),
('Design Masters Institute', 'hello@designmasters.com', 'edu123', 'institute', 'active', 'approved', '2026-06-12 14:15:00');

-- -----------------------------------------------------
-- 2. STUDENT_PROFILE (Referencing User 1 and 2)
-- -----------------------------------------------------
INSERT INTO STUDENT_PROFILE (user_id, date_of_birth, gender, mobile, college_name, degree, city) VALUES
(1, '2002-05-14', 'Male', '9876543210', 'Pune University', 'B.Tech Computer Science', 'Pune'),
(2, '2001-08-22', 'Female', '9123456789', 'Mumbai University', 'B.Sc IT', 'Mumbai');

-- -----------------------------------------------------
-- 3. INSTITUTE_PROFILE (Referencing User 3 and 4)
-- -----------------------------------------------------
INSERT INTO INSTITUTE_PROFILE (user_id, address, gstin, contact_no, description) VALUES
(3, '45 Tech Park, Hinjewadi, Pune', '27AAAAA0000A1Z5', '8001234567', 'Leading institute for programming and software dev.'),
(4, '12 Creative Lane, Bandra, Mumbai', '27BBBBB1111B2Z6', '8009876543', 'Specialized in UI/UX and Graphic Design courses.');

-- -----------------------------------------------------
-- 4. INSTITUTE_DOCUMENTS (Referencing Institutes 1 and 2)
-- -----------------------------------------------------
INSERT INTO INSTITUTE_DOCUMENTS (institute_profile_id, document_type, document_name, document_url, verification_status, uploaded_at, verified_at) VALUES
(1, 'GST', 'TechElevate_GST.pdf', '/docs/inst_1_gst.pdf', 'verified', '2026-06-10 09:30:00', '2026-06-11 10:00:00'),
(1, 'PAN', 'TechElevate_PAN.pdf', '/docs/inst_1_pan.pdf', 'verified', '2026-06-10 09:35:00', '2026-06-11 10:05:00'),
(2, 'Registration', 'DesignMasters_Reg.pdf', '/docs/inst_2_reg.pdf', 'pending', '2026-06-12 14:30:00', NULL);

-- -----------------------------------------------------
-- 5. INSTRUCTOR (Referencing Institutes 1 and 2)
-- -----------------------------------------------------
INSERT INTO INSTRUCTOR (institute_profile_id, name, specialization, experience, bio) VALUES
(1, 'Amit Verma', 'Full Stack Development', 8, 'Ex-software engineer passionate about teaching.'),
(1, 'Neha Gupta', 'Data Science', 5, 'Specializes in Python and Machine Learning.'),
(2, 'Karan Singh', 'UI/UX Design', 10, 'Award-winning designer with 10 years of agency experience.');

-- -----------------------------------------------------
-- 6. COURSE (Referencing Institutes and Instructors)
-- -----------------------------------------------------
INSERT INTO COURSE (institute_profile_id, instructor_id, title, description, price, duration, approval_status, status) VALUES
(1, 1, 'Complete Web Development Bootcamp', 'Learn HTML, CSS, JS, Node, and React.', 4999.00, '3 months', 'approved', 'active'),
(1, 2, 'Data Science for Beginners', 'Intro to Data Science using Python and Pandas.', 3500.00, '2 months', 'approved', 'active'),
(2, 3, 'Mastering Figma & UI Design', 'Go from zero to hero in UI design.', 2999.00, '45 hours', 'approved', 'active'),
(1, 1, 'Advanced Node.js Architecture', 'Deep dive into backend systems.', 5999.00, '40 hours', 'pending', 'draft');

-- -----------------------------------------------------
-- 7. CATEGORY
-- -----------------------------------------------------
INSERT INTO CATEGORY (category_name) VALUES
('Web Development'),
('Data Science'),
('Design'),
('Business');

-- -----------------------------------------------------
-- 8. COURSE_CATEGORY (Linking Courses to Categories)
-- -----------------------------------------------------
INSERT INTO COURSE_CATEGORY (course_id, category_id) VALUES
(1, 1), -- Web Dev Bootcamp -> Web Development
(2, 2), -- Data Science for Beginners -> Data Science
(3, 3), -- Mastering Figma -> Design
(4, 1); -- Advanced Node.js -> Web Development

-- -----------------------------------------------------
-- 9. PAYMENT (Referencing Students and Courses)
-- -----------------------------------------------------
INSERT INTO PAYMENT (student_user_id, course_id, total_amount, payment_status, payment_date, transaction_id, payment_method) VALUES
(1, 1, 4999.00, 'success', '2026-06-20 10:15:00', 'TXN987654321', 'UPI'),
(1, 2, 3500.00, 'success', '2026-06-25 14:20:00', 'TXN123456789', 'Card'),
(2, 3, 2999.00, 'success', '2026-06-22 09:45:00', 'TXN555555555', 'Net Banking');

-- -----------------------------------------------------
-- 10. ENROLLMENT (Referencing Students, Courses, Payments)
-- -----------------------------------------------------
INSERT INTO ENROLLMENT (student_user_id, course_id, payment_id, enrollment_date, status) VALUES
(1, 1, 1, '2026-06-20 10:16:00', 'active'),
(1, 2, 2, '2026-06-25 14:21:00', 'active'),
(2, 3, 3, '2026-06-22 09:46:00', 'completed');

-- -----------------------------------------------------
-- 11. REVIEW (Referencing Enrollments)
-- -----------------------------------------------------
INSERT INTO REVIEW (enrollment_id, rating, comment, created_at) VALUES
(1, 5, 'Amazing course, totally worth the money!', '2026-07-01 18:30:00'),
(3, 4, 'Great insights into Figma, but wish it was longer.', '2026-07-02 10:00:00');

-- -----------------------------------------------------
-- 12. REVENUE_SHARE (Referencing Payments - e.g., 20% platform fee)
-- -----------------------------------------------------
INSERT INTO REVENUE_SHARE (payment_id, platform_share, institute_share, commission_percentage, created_at) VALUES
(1, 999.80, 3999.20, 20.00, '2026-06-20 10:15:00'),
(2, 700.00, 2800.00, 20.00, '2026-06-25 14:20:00'),
(3, 599.80, 2399.20, 20.00, '2026-06-22 09:45:00');

-- -----------------------------------------------------
-- 13. PLATFORM_SETTINGS
-- -----------------------------------------------------
INSERT INTO PLATFORM_SETTINGS (platform_name, commission_percentage, support_email, updated_at) VALUES
('EduHub Master', 20.00, 'support@eduhub.com', '2026-01-01 00:00:00');

-- -----------------------------------------------------
-- 13. Roles
-- -----------------------------------------------------
INSERT INTO roles (role_id, role_name) VALUES
(1, 'Admin'),
(2, 'Institute'),
(3, 'Student');

ALTER TABLE users
ADD COLUMN role_id INT;

UPDATE users
SET role_id =
CASE role
    WHEN 'admin' THEN 1
    WHEN 'institute' THEN 2
    WHEN 'student' THEN 3
END
WHERE user_id > 0;

ALTER TABLE users
MODIFY role_id INT NOT NULL;

ALTER TABLE users
ADD CONSTRAINT fk_users_roles
FOREIGN KEY (role_id)
REFERENCES roles(role_id);

ALTER TABLE users
DROP COLUMN role;