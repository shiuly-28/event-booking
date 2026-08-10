import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import BookingController from "./booking.controller";

const router = Router();

router.get("/", auth("ADMIN"), BookingController.getAllBookings);
router.get("/:id", auth(), BookingController.getBookingById);
router.post("/", auth(), BookingController.createBooking);
router.patch("/:id", auth(), BookingController.updateBooking);
router.delete("/:id", auth(), BookingController.deleteBooking);

export default router;