import { Router } from "express";
import * as blogService from "./blog.service.js";
const router = Router();


router.post("/",blogService.createBlog);
router.patch("/:blogId",blogService.updateBlog);
router.delete("/:blogId",blogService.deleteBlog);
router.get("/",blogService.getAllBlogs);
router.get("/:blogId",blogService.getBlogById);

export default router;