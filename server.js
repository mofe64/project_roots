const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const schedule = require('node-schedule');
const User = require('./models/UserModel');
const billController = require('./controllers/billController');
const reportController = require('./controllers/reportController');
let DBConnection;
if (process.env.NODE_ENV == 'test') {
  DBConnection = process.env.DATABASE_TEST;
} else if (process.env.NODE_ENV == 'production') {
  DBConnection = process.env.DATABASE_PROD;
} else if (process.env.NODE_ENV == 'development') {
  DBConnection = process.env.DATABASE_LOCAL;
}

mongoose
  .connect(DBConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`app running in ${process.env.NODE_ENV} mode on port ${port}`);
});

const j1 = schedule.scheduleJob('42 14 * * *', async function () {
  try {
    const users = await User.find();
    users.forEach((user) => {
      reportController.getMonthlyIncomeStats(user._id);
      reportController.getMontlyExpenseStats(user._id);
    });
    console.log('Monthly income task completed');
  } catch (error) {
    console.log(error);
  }
});
