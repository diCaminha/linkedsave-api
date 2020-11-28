const { MongoNetworkError, ObjectId } = require("mongodb");
const Dayread = require("../../models/dayread");
const user = require("../../models/user");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
module.exports = async (userId) => {
  try {
    const date = new Date();
    const dateString =
      date.getMonth() + "-" + date.getUTCDate() + "-" + date.getFullYear();
    const dayOfWeek = days[date.getDay()];
    console.log(dateString);
    const dayread = await Dayread.findOne({ user: userId, date: dateString });
    console.log(dayread);
    if (!dayread) {
      const newDayread = {
        total: 1,
        dayWeek: dayOfWeek,
        user: userId,
        date: dateString,
      };
      console.log(newDayread);
      const savedDayread = await Dayread.create(newDayread);
      console.log(savedDayread);
    } else {
      dayread.total += 1;
      let savedDayread = await dayread.save();
      console.log(savedDayread);
    }
  } catch (err) {
    console.log(err);
  }
};
