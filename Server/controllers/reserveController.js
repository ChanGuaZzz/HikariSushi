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

    console.log(`Mesas ocupadas el dia ${date} a las ${hour} : `, CountOfReservation);

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

    return res.status(201).json({ message: "Reserva pendiente, le sera enviado por correo la confirmacion de la reserva" });

    console.log(reservation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getReservations = async (req, res) => {
  try {
    if (req.session.user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00 para comparar solo la fecha

    await Reservation.destroy({
      where: {
        date: {
          [Op.lt]: today, // Menor que hoy
        },
      },
    });

    const reservations = await Reservation.findAll({
      where: {
        customerPhone: req.session.user.phone,
      },
      order: [["date", "ASC"]],
    });

    return res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAvailableHours = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Fecha no proporcionada" });
  }

  try {
    const reservations = await Reservation.findAll({
      where: {
        date: new Date(date),
      },
    });

    const reservedHoursCount = reservations.reduce((acc, reservation) => {
      acc[reservation.hour] = (acc[reservation.hour] || 0) + 1;
      return acc;
    }, {});

    const allHours = ["9:00", "12:00", "14:00", "16:00", "21:00"];
    const maxReservationsPerHour = 4;

    const availableHours = allHours.filter(hour => {
      return (reservedHoursCount[hour] || 0) < maxReservationsPerHour;
    });

    return res.status(200).json(availableHours);
  } catch (error) {
    console.error('Error al obtener las horas disponibles:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { reserveTable, getReservations, getAvailableHours };
