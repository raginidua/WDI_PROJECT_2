module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/project-app',
  secret: process.env.SECRET || 'Shhh, this is secret'
};