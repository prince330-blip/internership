import sequelize from "../../config/db.js";
import User from "./user.js";
import Appointment from "./appointment.js";
import DoctorAvailability from "./doctorAvailability.js";
import Notification from "./notifications.js";

const db = {
  sequelize,
  User,
  Appointment,
  DoctorAvailability,
  Notification,
};

export default db;