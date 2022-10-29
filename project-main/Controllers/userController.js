const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
const _ = require("lodash");
const { User } = require('../Model/userModel');
const { Otp } = require('../Model/otpModel');

module.exports.signUp = async (req, res) => {
    
    const user = await User.findOne({
        number: req.body.number
    });
    
    if (user) return res.status(400).send("User already registered!");
    const OTP = otpGenerator.generate(6, {
        digits: true, alphabets: false, upperCase: false, specialChars: false
    });
    const number = req.body.number;
    console.log("OTP",OTP);
    const otp = new Otp({ number: number, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    await otp.save();
    return res.status(200).send("Otp send successfully!");
    
}
module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
        
    });
    number= req.body.number;
    // console.log(number);
    // console.log(otpHolder);
    if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send("User Registration Successfull!");
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
}
module.exports.logOut = async (req, res) => {
    try {
    if(req.token._id) {delete req.token._id;

    res.send();
    }
    else {
                res.send({result: 'ERROR', message: 'User is not logged in.'});
            }
    }catch (e) {
            res.status(500).send("logged out")
        }
    }