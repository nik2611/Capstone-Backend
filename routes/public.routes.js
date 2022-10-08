const controller = require("../controllers/public.controller");


app.get("/api/test/all", controller.allAccess);