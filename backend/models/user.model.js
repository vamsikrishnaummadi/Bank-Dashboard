import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
       userType : {
          type : String,
          required: true
       },
       balance : {
          type : Number,
          required: true
       },
       accountNumber : {
          type: Number,
          required: true,
          unique: true
       },
       fullName : {
         type : String,
         required : true
       },
       userName : {
         type : String,
         required : true,
         unique : true 
       },
       email : {
         type: String,
         required: true,
         unique : true
       },
       password : {
         type: String,
         required: true
       },
       dateOfBirth : {
         type: Date,
         required: true
       },
       profileImage : {
         type: String,
         required: true
       },
       presentAddress : {
         type: String,
         required: true
       },
       permanentAddress : {
         type: String,
         required: true
       },
       city : {
         type: String,
         required: true
       },
       postalCode : {
         type: Number,
         required: true
       },
       country : {
         type: String,
         required: true
       },
       currency : {
         type: String,
         required: true
       },
       timeZone : {
         type: String,
         required: true
       },
       enabletwoFactorAuthentication : {
        type : Boolean,
        required: true
       },
       enableRecomendations : {
         type: Boolean,
         required: true
       },
       enableNotifications : {
        type: Boolean,
        required: true
       },
       enableDigitalCurrency : {
        type: Boolean,
        required: true
       },
       recentPasswordChangedTime : {
         type: Date,
         required: true
       },
       favourites : {
         type: String,
       },
       requestedForDelete : {
         type: Boolean,
         required: true
       }
       
});

const User = mongoose.model("user", userSchema);

export default User;
 
/* 
   userType - customer or Admin
   accountNumber
   fullName 
   userName
   email
   password
   dateOfBirth
   profileImage
   presentAddress
   permanentAddress
   city
   postalCode
   country
   currency
   timeZone
   enabletwoFactorAuthentication
   recentPasswordChangedTime
   enableRecomendations
   enableNotifications
   enableDigitalCurrency
   favourites : "userids string"
   requestedForDelete
*/

