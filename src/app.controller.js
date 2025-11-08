import blogRouter from './Modules/Blog/blog.controller.js';
import authRouter from './Modules/User/user.controller.js';

const bootstrap = (app, express) => {
    app.use("/users", authRouter);
    app.use("/blog", blogRouter);

    app.use((err, req, res, next)=>{
        return res.status(500).json({message: "Internal Server Error", error: err.message});
    });
};
export default bootstrap;