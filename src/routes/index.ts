import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import categoryRoutes from "../modules/category/category.route";
import eventRoutes from "../modules/event/event.route";
import reviewRoutes from "../modules/review/review.route";
import bookingRoutes from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
  { path: "/categories", route: categoryRoutes },
  { path: "/events", route: eventRoutes },
  { path: "/reviews", route: reviewRoutes },
  { path: "/bookings", route: bookingRoutes },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;