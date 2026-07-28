-- Create and select the database

CREATE DATABASE p06_eduhub;
USE p06_eduhub;

-- -----------------------------------------------------
-- 1. USERS Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'institute', 'admin') NOT NULL,
    status ENUM('active', 'blocked') NOT NULL,
    approval_status ENUM('pending', 'approved', 'rejected') NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL
);

-- -----------------------------------------------------
-- 2. STUDENT_PROFILE Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE STUDENT_PROFILE (
    student_profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_of_birth DATE NULL,
    gender VARCHAR(20) NULL,
    mobile VARCHAR(15) NULL,
    college_name VARCHAR(100) NULL,
    degree VARCHAR(100) NULL,
    city VARCHAR(50) NULL,
    profile_picture VARCHAR(255) NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 3. INSTITUTE_PROFILE Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE INSTITUTE_PROFILE (
    institute_profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address TEXT NOT NULL,
    gstin VARCHAR(20) UNIQUE NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    description TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 4. INSTITUTE_DOCUMENTS Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE INSTITUTE_DOCUMENTS (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    institute_profile_id INT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_name VARCHAR(100) NOT NULL,
    document_url VARCHAR(255) NOT NULL,
    verification_status ENUM('pending', 'verified', 'rejected') NOT NULL,
    uploaded_at DATETIME NOT NULL,
    verified_at DATETIME NULL,
    FOREIGN KEY (institute_profile_id) REFERENCES INSTITUTE_PROFILE(institute_profile_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 5. INSTRUCTOR Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE INSTRUCTOR (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    institute_profile_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    experience INT NULL,
    bio TEXT NULL,
    photo VARCHAR(255) NULL,
    FOREIGN KEY (institute_profile_id) REFERENCES INSTITUTE_PROFILE(institute_profile_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 6. COURSE Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE COURSE (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    institute_profile_id INT NOT NULL,
    instructor_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(255) NULL,
    approval_status ENUM('pending', 'approved', 'rejected') NOT NULL,
    status ENUM('active', 'inactive', 'draft') NOT NULL,
    FOREIGN KEY (institute_profile_id) REFERENCES INSTITUTE_PROFILE(institute_profile_id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES INSTRUCTOR(instructor_id)
);

-- -----------------------------------------------------
-- 7. CATEGORY Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE CATEGORY (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- -----------------------------------------------------
-- 8. COURSE_CATEGORY (Junction Table)[cite: 1]
-- -----------------------------------------------------
CREATE TABLE COURSE_CATEGORY (
    course_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (course_id, category_id),
    FOREIGN KEY (course_id) REFERENCES COURSE(course_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 9. PAYMENT Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE PAYMENT (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    course_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('success', 'failed', 'pending') NOT NULL,
    payment_date DATETIME NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (student_user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);

-- -----------------------------------------------------
-- 10. ENROLLMENT Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE ENROLLMENT (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    course_id INT NOT NULL,
    payment_id INT NOT NULL,
    enrollment_date DATETIME NOT NULL,
    status ENUM('active', 'completed', 'cancelled') NOT NULL,
    FOREIGN KEY (student_user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
    FOREIGN KEY (payment_id) REFERENCES PAYMENT(payment_id)
);

-- -----------------------------------------------------
-- 11. REVIEW Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE REVIEW (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 12. REVENUE_SHARE Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE REVENUE_SHARE (
    revenue_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id INT NOT NULL,
    platform_share DECIMAL(10, 2) NOT NULL,
    institute_share DECIMAL(10, 2) NOT NULL,
    commission_percentage DECIMAL(5, 2) NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES PAYMENT(payment_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 13. PLATFORM_SETTINGS Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE PLATFORM_SETTINGS (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL,
    commission_percentage DECIMAL(5, 2) NOT NULL,
    support_email VARCHAR(100) NOT NULL,
    updated_at DATETIME NULL
);

-- -----------------------------------------------------
-- 14. ROLES Table[cite: 1]
-- -----------------------------------------------------
CREATE TABLE roles (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
