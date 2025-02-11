import { Op, Sequelize } from "sequelize";
import Reservation from "../models/Reservation.js";
import transporter from "../config/mailer.js";

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
        status: {
          [Op.or]: ["pending", "confirm"],
        },
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
        status: {
          [Op.or]: ["pending", "confirm"],
        },
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

    if (req.session.user.role === "admin") {
      const status = req.body.status;

      if (!status) {
        return res.status(400).json({ message: "missing data" });
      }
      const reservations = await Reservation.findAll({
        where: {
          status: status,
        },
        order: [["date", "ASC"]],
      });

      return res.status(200).json(reservations);
    }
    const reservations = await Reservation.findAll({
      attributes: [
        "date",
        "hour",
        "people",
        "customerName",
        "customerEmail",
        "customerPhone",
        "tableNumber",
        "date",
        [
          Sequelize.literal(`
          CASE
            WHEN MAX(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) = 1 THEN 'confirmed'
            WHEN MAX(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) = 1 THEN 'pending'
            ELSE 'cancelled'
          END
        `),
          "status",
        ],
        [
          Sequelize.literal(`
          (SELECT id
           FROM Reservations AS r
           WHERE r.date = Reservation.date
           AND r.status = (
             SELECT CASE
               WHEN MAX(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) = 1 THEN 'confirmed'
               WHEN MAX(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) = 1 THEN 'pending'
               ELSE 'cancelled'
             END
             FROM Reservations
             WHERE date = Reservation.date
           )
           LIMIT 1)
        `),
          "id",
        ],
      ],
      where: {
        customerPhone: req.session.user.phone,
      },
      group: ["date"],
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
        status: {
          [Op.or]: ["pending", "confirm"],
        },
      },
    });

    const reservedHoursCount = reservations.reduce((acc, reservation) => {
      acc[reservation.hour] = (acc[reservation.hour] || 0) + 1;
      return acc;
    }, {});

    const allHours = ["9:00", "12:00", "14:00", "16:00", "21:00"];
    const maxReservationsPerHour = 5;

    const availableHours = allHours.filter((hour) => {
      return (reservedHoursCount[hour] || 0) < maxReservationsPerHour;
    });

    return res.status(200).json(availableHours);
  } catch (error) {
    console.error("Error al obtener las horas disponibles:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const reservationManage = async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: "missing data" });
  }

  console.log(id, status);
  if (status !== "confirmed" && status !== "cancelled") {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    reservation.status = status;
    await reservation.save();

    const html =
      status === "confirmed"
        ? `
      <h1>Estado de la reserva: <span style="color: green">Confirmada</span>  </h1>
      <h2>Estimado/a ${reservation.customerName}🥋,</h2>
      <p>Le informamos que su reserva para el dia <b>${reservation.date}</b> a las </b>${reservation.hour}<b>
       ha sido confirmada.</p>

      <p>Por favor presentarse 10 minutos antes de la hora de la reserva.</p>

      <p>Si no puede presentarse favor cancelar la reserva.</p>

      <i>Te esperamos... 😉</i>

      <p>Si desea realizar una nueva reserva acceda al siguiente enlace <a href="https://hikarisushi.onrender.com">Hikari</a></p>

      <p>Para mas informacion contactenos al 1234567890 📞</p>

      <p>Gracias por preferirnos 🤗</p>

      <p>Atentamente, Hikari Restaurant 🍣</p>

      <img src="https://www.granadadigital.es/wp-content/uploads/2022/04/sushi-2853382_960_720.jpg" alt="Hikari Sushi" width="500" height="200">


      `
        : `
      <h1>Estado de la reserva: <span style="color: red">Cancelada</span> </h1>
      <h2>Estimado/a ${reservation.customerName}🥋,</h2>
      <p>Le informamos que su reserva para el dia <b>${reservation.date}</b> a las </b>${reservation.hour}<b>
       ha sido cancelada.</p>

      <p> Lamentamos los inconvenientes ocasionados😥</p>

      <b> Sera otro dia... 😊</b>

      <p>Si desea realizar una nueva reserva acceda al siguiente enlace <a href="https://hikarisushi.onrender.com">Hikari</a></p>

      <p>Para mas informacion contactenos al 1234567890 📞</p>

      <p>Gracias por preferirnos 🤗</p>

      <p>Atentamente, Hikari Restaurant 🍣</p>

      <img src="https://www.granadadigital.es/wp-content/uploads/2022/04/sushi-2853382_960_720.jpg" alt="Hikari Sushi" width="500" height="200">

      `;

    await transporter
      .sendMail({
        from: '"Hikari Restaurant 🍣" <officialhikarisushi@gmail.com>', // sender address
        to: reservation.customerEmail, // list of receivers
        subject: "Reserva", // Subject line
        html: html, // html body
      })
      .then((info) => {
        console.log("Message sent: %s", info.messageId);
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
      });

    return res.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export { reserveTable, getReservations, getAvailableHours, reservationManage };
