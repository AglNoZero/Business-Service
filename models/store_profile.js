var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoreProfileSchema = new Schema(
  {

    name: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    logo: { type: String, required: false },
    receptionist_name: { type: String, required: true },
    goods_type: { type: Schema.Types.Array, required: true },
    opening_time: { type: String, required: true },
    closing_time: { type: String, required: true },
    established_date: { type: String, required: true },
    licenses: { type: String, required: false },
  },
  {
    versionKey: false,
    statics: {
      isStoreProfileExisted(email_db, callback) {
        try {
          return this.countDocuments({ email: email_db }).exec();
        } catch (e) {
          callback(e);
        }
      },
    },
  }
);

module.exports = mongoose.model("StoreProfile", StoreProfileSchema);
