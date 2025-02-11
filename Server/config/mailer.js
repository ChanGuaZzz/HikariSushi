import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "officialhikarisushi@gmail.com",
      pass: "bkrm ojlb fwmt ksrj",
    },
  });

  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

  export default transporter;