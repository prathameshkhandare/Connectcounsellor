const AppointmentModel = require('../models/Appointment');
const AppointmentController = async function (req,res){
let {name, phone, date}=req.body;
try{
    const newappointment = await AppointmentModel.create({name, phone, date});
    
    res.status(200).json({message:"Appointment booked successfully"});}
catch(err){
    res.status(500).json({ message:"error booking appointment" });
}


}

const getAppointment =  async function (req,res){
    try {
        const Appointment = await AppointmentModel.find();

res.status(200).json(Appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
       
    }

}

module.exports = {AppointmentController, getAppointment};