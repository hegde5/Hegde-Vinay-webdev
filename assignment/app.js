/**
 * Created by Vinay on 10/30/2016.
 */

module.exports = function(app) {

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);


}