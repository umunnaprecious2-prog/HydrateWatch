import { Router } from "express";
import { feedController } from "../controllers/feed.controller";

const router = Router();

router.get("/posts", feedController.getPosts);
router.get("/posts/:post_id", feedController.getPost);
router.get("/stats", feedController.getStats);
router.post("/fetch", feedController.triggerFetch);
router.get("/fetch-logs", feedController.getFetchLogs);
router.get("/content-types", feedController.getContentTypes);
router.get("/sources", feedController.getSources);
router.get("/tags", feedController.getPopularTags);

export default router;
