/*
Here, we render the dashboard.ejs as the view here and accessing the 
req.user, which is available once there is an active session established 
by expressjs . With that, we have successfully logged into the dashboard.
*/
//For Register Page
const dashboardView = (req, res) => {
    res.render("dashboard", {
      user: req.user
    });
  };

  module.exports = {
    dashboardView,
  };