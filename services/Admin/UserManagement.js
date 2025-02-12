const Admin = require("../../models/Admin.Model");
const User = require("../../models/User.Model")
const Cleaner = require("../../models/Cleaner.Model");
const Booking = require("../../models/Booking.Model");
const bcrypt = require("bcryptjs");

class UserManagement {
  //User Management
//   async createAdmin(payload) {
//     // console.log(payload);
//     const hashedPassword = await bcrypt.hash(payload.password, 12);
//     const newUser = new User({
//       email: payload.email,
//       password: hashedPassword,
//       role: "Admin",
//       registrationMethod: "local",
//       status: 1,
//     });
//     await newUser.save();

//     const adminProfle = new Admin({
//       fullName: payload.fullName,
//     });

//     await adminProfle.save();

//     newUser.profile = adminProfle._id;

//     await newUser.save();

//     return {
//       message: "Authenticated",
//       content: newUser,
//     };
//   }
  async getAllUsers() {
    const users = await User.find({}).populate("role").exec();
    console.log("Users:", users);
    return {
      message: "Authenticated",
      content: users,
    };
  }

  async getUser(id) {
    const user = await User.findById(id);
    console.log("User:" + user);

    return {
      message: "Authenticated",
      content: user,
    };
  }

  async updateClient(id, payload) {
    if (payload.password)
      payload.password = await bcrypt.hash(payload.password, 12);

    let client = await User.findById(id);

    client.email = payload.email || client.email;
    client.password = payload.password || client.password;
    // Add fields if needed

    client = await client.save();

    console.log(client);
    return {
      message: "Authenticated",
      content: client,
    };
  }

  async deleteClient(id) {
    const client = await User.findByIdAndDelete(id);

    if (client.bookings.length > 0) {
      // Batch delete bookings linked to the user
      await Booking.deleteMany({ _id: { $in: client.bookings } });
    }

    return {
      message: "Client Deleted",
    };
  }
}

module.exports = new UserManagement();