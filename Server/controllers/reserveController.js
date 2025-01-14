import { Op } from "sequelize";
import Reservation from "../models/Reservation.js";

const reserveTable = async (req, res) => {


  try {
    if (req.session.user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    } else if (!req.body.reservation) {
      return res.status(401).json({ message: "missing data" });
    }
    console.log(req.session.user);
    const reserveLimits = 5;
    const { date, hour, people } = req.body.reservation;

    console.log(date, hour, people);
     
    const CountOfReservation = await Reservation.count({
      where: {
        date: new Date(date),
        hour: `${hour}:00`,
      },
    });

    console.log(`Mesas ocupadas el dia ${date} a las ${hour} : `,CountOfReservation);

    if (CountOfReservation > reserveLimits) {
        console.log("No hay mesas disponibles");
      return res.status(401).json({ message: "No hay mesas disponibles" });
    }
    
    const ReserveDateExists = await Reservation.findOne({
        where: {
            date: new Date(date),
            customerPhone: req.session.user.phone,
        },
        });

    if (ReserveDateExists) {
        console.log("Ya tienes una reserva para esa fecha");
        return res.status(401).json({ message: "Ya tienes una reserva para esa fecha" });
    }

    const reservation = await Reservation.create({
        customerName: req.session.user.name,
        customerEmail: req.session.user.email,
        customerPhone: req.session.user.phone,
        date,
        hour,
        people,
    });

    console.log("Reserva creada con exito");

    return res.status(201).json({ message: "Reserva creada con exito" });

    console.log(reservation);



    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getReservations = async (req, res) => {};

const getAvailableHours = async (req, res) => {};

export { reserveTable, getReservations, getAvailableHours };
