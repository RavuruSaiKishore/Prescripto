import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'


//Api to register User
const registerUser = async(req, res) =>{
    try {
        const { name, email, password } = req.body

        if(!name || ! email || !password){
            return res.json({
                success: false,
                message: 'Missing Details'
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                messaage: 'Enter a Valid Email'
            })
        }

        if(password.length < 8){
            return res.json({
                success: false,
                message: 'Enter the Strong Password'
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, 
            email, 
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API for the Login user
const loginUser = async(req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success: false,
                message: 'User Does not Exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password) ;
        if (isMatch) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          res.json({
            success: true,
            token,
          });
        }else {
          res.json({
            success: false,
            message: "Invalid credientials"
          });
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to get User Profile
const getProfile = async(req, res) =>{
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({
            success: true,
            userData,
            
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.messsge
        })
    }
}

//API to update the user Profile
const updateProfile = async(req, res) =>{
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender){
            res.json({
                success: false,
                message: "Data Missing"
            })
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender});

        if(imageFile){
            //upload file to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'});
            const imageURL = imageUpload.secure_url;
            console.log(imageURL);

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Api to book appointment
const bookAppointment = async(req, res) =>{
    try {
      const { userId, docId, slotDate, slotTime } = req.body;

      const docData = await doctorModel.findById(docId).select("-password");

      if (!docData.available) {
        return res.json({
          success: false,
          message: "doctor is not Available",
        });
      }

      let slots_booked = docData.slots_booked;
      //checking for slot availability
      if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return res.json({
              success: false,
              message: "doctor is not Available",
            });
        }else{
            slots_booked[slotDate].push(slotTime);
        }
      }
      else{
        slots_booked[slotDate] = [];
        slots_booked[slotDate].push(slotTime);
      }

      const userData = await userModel.findById(userId).select('-password');
      delete docData.slots_booked;

      const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount:docData.fees,
        slotTime,
        slotDate,
        date:Date.now(),
      }

      const newAppointment = new appointmentModel(appointmentData);
      await newAppointment.save();

      //save new slots data in docdata
      await doctorModel.findByIdAndUpdate(docId,{slots_booked});
      res.json({
        success: true,
        message: "appointment booked"
      })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            messaage:error.message
        })
    }
}

//  Api to get the user appointments for frontend my-appointment page
const listAppointment = async(req, res) =>{
    try {
        const { userId } = req.body;
        console.log(userId);
        const appointments = await  appointmentModel.find({userId});

        res.json({
            success: true,
            appointments,
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: error.message
        })
    }
}

//  Api to cancel the appointment
const cancelAppointment = async(req, res) =>{
    try {
        console.log(req.body);
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({
                success: true,
                message:"Unauthorized action"
            })
        }   

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled : true});

        //  releasing the doctors slot
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime);

        await doctorModel.findByIdAndUpdate(docId, {slots_booked});
        res.json({
            success: true,
            message: 'Appointment cancelled',
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        })
    }
}

// Api for razorpay instance
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_uXA0aXFF4ftAVe",
  key_secret: "BowTpKgziOBLn5b79HM8GwT3",
});

//  Api to make the payment of appointment razorpay
const paymentRazorpay = async(req, res) =>{
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
          return res.json({
            success: false,
            message: "Appointment cancelled or not found",
          });
        }

        //creating options for razorpay payment
        const options = {
          amount: appointmentData.amount * 100,
          currency: process.env.CURRENCY,
          receipt: appointmentId,
        };

        //creation of an order
        const order = await razorpayInstance.orders.create(options);
        res.json({
          success: true,
          order,
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        })
    }
}

//  Api to verify the payment of razorpay
const verifyRazorpay = async(req, res) =>{
    try {
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        console.log(orderInfo.status);
        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            res.json({
                success: true,
                orderInfo,
            })
        }
        else{
            res.json({
                success:false,
                message:'payment failed'
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
          success: false,
          message: error.message,
        });   
    }
}



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment,listAppointment , cancelAppointment, paymentRazorpay, verifyRazorpay};