// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // User login, lanjut ke route
  } else {
    return res.redirect("/login"); // User tidak login, redirect ke login
  }
}

module.exports = ensureAuthenticated;
