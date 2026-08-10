import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import EventController from "./event.controller";

const router = Router();

router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.post("/", auth("ADMIN"), EventController.createEvent);
router.patch("/:id", auth("ADMIN"), EventController.updateEvent);
router.delete("/:id", auth("ADMIN"), EventController.deleteEvent);

export default router;