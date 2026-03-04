# CSLS - Comprehensive Student Learning System

## Project Features:

### Core Functionality
- **Authentication:** Secure user login and registration.
- **Role Management:** Define and assign roles (e.g., Admin, Teacher, Student) with appropriate permissions.
- **Student Progress Tracking:** Monitor student performance, completion rates, and grades.
- **Class Management:** Create, manage, and enroll students in classes.
- **Lessons Management:**
    - **Video Lessons:** Upload unlisted videos to YouTube and embed them within the platform.
    - **Text-based Lessons:** Create and manage textual lesson content.
- **Assignments and Tests:** Create, assign, and grade assignments and tests.

### User Interfaces
- **Back Office UI:** For administrative tasks (e.g., user management, platform configuration, analytics).
- **Teacher UI:** For managing classes, lessons, assignments, and tracking student progress.
- **Student UI:** For accessing lessons, submitting assignments, taking tests, and viewing their progress.

## Implementation Considerations:

### Video Hosting
- Leverage YouTube API for uploading videos as "unlisted."
- Store YouTube video IDs in the database for embedding in lessons.

### Database Schema (High-Level)
- **Users:** ID, Name, Email, Password Hash, Role ID
- **Roles:** ID, Name, Permissions
- **Classes:** ID, Name, Description, Teacher ID
- **Enrollments:** Student ID, Class ID, Enrollment Date
- **Lessons:** ID, Title, Description, Type (Video/Text), Content (Video ID/Text), Class ID, Order
- **Assignments/Tests:** ID, Title, Description, Type, Class ID, Due Date, Max Score
- **Submissions:** Assignment/Test ID, Student ID, Submission Date, Score, Feedback
- **Progress:** Student ID, Lesson ID, Status (Completed/In Progress), Completion Date

### Technology Stack
- Next.js (with TypeScript)
- Tailwind CSS
- Database: Vercel Postgres
- ORM: Prisma (Installed)
- Authentication Library: [To be determined, e.g., NextAuth.js]
