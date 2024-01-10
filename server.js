const express = require('express');
const routes = require('./controllers');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize') (session.Store);
const PORT = 3001;
const hbs = exphbs.create();
const sess = { 
  secret: "123456",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  },
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({db: sequelize})
}

app.use(session(sess));

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.use(express.json());

app.use(express.urlencoded({extend:true}));

app.use(express.static('./public'));

app.use(routes);


sequelize.sync( {force: false })
.then ( () => { 
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
})
