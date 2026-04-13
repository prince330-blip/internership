-- Create Users Table
CREATE TABLE `users` (
  `id` CHAR(36) BINARY NOT NULL,
  `fullname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(255) UNIQUE,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Appointments Table
CREATE TABLE `appointments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `patient_id` CHAR(36) BINARY NOT NULL,
  `doctor_id` CHAR(36) BINARY NOT NULL,
  `appointment_date` DATETIME NOT NULL,
  `reason` VARCHAR(255),
  `status` ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Doctors Availability Table
CREATE TABLE `doctors_availability` (
  `id` CHAR(36) BINARY NOT NULL,
  `doctorId` CHAR(36) BINARY NOT NULL,
  `dayOfWeek` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Notifications Table
CREATE TABLE `notifications` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `userId` CHAR(36) BINARY NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `read` TINYINT(1) DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
