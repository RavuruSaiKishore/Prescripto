import validator from "validator";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// API for  adding doctor
const addDoctor = async(req, res) =>{
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;
        console.log("the req.body data is ",req.body);
        
        // checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success: false, message:"Missing Details"});
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "please Enter valid Email"})
        }

        //Validating  Strong password
        if(password.length < 8){
            return res.json({success: false, message: "enter password of length more than 8"});
        }

        //Hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password, salt);

        //Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        // it generates a respose and that is stored in imageUpload variable 
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email, 
            image: imageUrl,
            password: hassedPassword,
            speciality,
            degree,
            experience, 
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        
        res.json({success: true, message: "Doctor Added"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


// api for the admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            console.log(token);
            return res.json({ success: true, token }); // Ensure that you return the response
        } else {
             console.log("Invalid credentials"); 
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log("Error in backend:", error);
        return res.json({ success: false, message: error.message }); // Also ensure you're returning here
    }
}


//  API to get all doctors list for admin panel
const allDoctors = async(req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success: true, doctors});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });   
    }
}

// Api to get all the appointments list
const appointmentsAdmin = async(req, res) =>{
    try {
        const appointments = await appointmentModel.find({});
        res.json({
          success: true,
          appointments,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error.message,
        })
    }
}

// api to cancel the appointment
//  Api to cancel the appointment
const AppointmentCancel = async(req, res) =>{
    try {
        console.log(req.body);
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
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

// api to get the dashboard data for the admin panel
const adminDashboard = async(req, res) =>{
    try {

        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
          doctors: doctors.length,
          appointments: appointments.length,
          patients: users.length,
          latestAppointments : appointments.reverse().slice(0,5),
        };

        res.json({
            success: true,
            dashData,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        })
    }
}


export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, AppointmentCancel, adminDashboard }