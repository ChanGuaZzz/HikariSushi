import { Op, Sequelize } from "sequelize";
import Reservation from "../models/Reservation.js";
import transporter from "../config/mailer.js";
import DateReservation from "../models/DateReservation.js";
import { format } from "date-fns";
import { da, es, se } from "date-fns/locale";
import Settings from "../models/Settings.js";

const html = (status, customerName, date, hour) => {
  const formattedDate = format(new Date(date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  if (status === "confirmed") {
    return `
      <h1>Estado de la reserva: <span style="color: green">Confirmada</span>  </h1>
      <h2>Estimado/a ${customerName}🥋,</h2>
      <p>Le informamos que su reserva para el dia <b>${formattedDate}</b> a las </b>${hour}<b>
       ha sido confirmada.</p>

      <p>Por favor presentarse 10 minutos antes de la hora de la reserva.</p>

      <p>Si no puede presentarse favor cancelar la reserva.</p>

      <i>Te esperamos... 😉</i>

      <p>Si desea realizar una nueva reserva acceda al siguiente enlace <a href="https://hikarisushi.onrender.com">Hikari</a></p>

      <p>Para mas informacion contactenos al 1234567890 📞</p>

      <p>Gracias por preferirnos 🤗</p>

      <p>Atentamente, Hikari Restaurant 🍣</p>

      <img src="https://www.granadadigital.es/wp-content/uploads/2022/04/sushi-2853382_960_720.jpg" alt="Hikari Sushi" width="500" height="200">


      `;
  }
  return `
      <h1>Estado de la reserva: <span style="color: red">Cancelada</span> </h1>
      <h2>Estimado/a ${customerName}🥋,</h2>
      <p>Le informamos que su reserva para el dia <b>${formattedDate}</b> a las </b>${hour}<b>
       ha sido cancelada.</p>

      <p> Lamentamos los inconvenientes ocasionados😥</p>

      <b> Sera otro dia... 😊</b>

      <p>Si desea realizar una nueva reserva acceda al siguiente enlace <a href="https://hikarisushi.onrender.com">Hikari</a></p>

      <p>Para mas informacion contactenos al 1234567890 📞</p>

      <p>Gracias por preferirnos 🤗</p>

      <p>Atentamente, Hikari Restaurant 🍣</p>

      <img src="https://www.granadadigital.es/wp-content/uploads/2022/04/sushi-2853382_960_720.jpg" alt="Hikari Sushi" width="500" height="200">

      `;
};

const reserveTable = async (req, res) => {
  let admincreate = false;

  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.session.user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    } else if (!req.body.reservation) {
      return res.status(401).json({ message: "missing data" });
    }
    console.log(req.session.user);
    const { date, hour, people, name, phone } = req.body.reservation;

    console.log(date, hour, people, name, phone);

    if (name && phone) {
      admincreate = true;
    }

    const ReserveDateExists = await Reservation.findOne({
      where: {
        date: new Date(date),
        customerPhone: phone || req.session.user.phone,
        status: "confirmed",
      },
    });

    if (ReserveDateExists) {
      console.log("Ya tienes una reserva para esa fecha");
      return res.status(401).json({ message: "Ya tienes una reserva para esa fecha" });
    }

    let dateReservation = await DateReservation.findOne({
      where: {
        date: new Date(date),
        hour,
      },
    });
    console.log(dateReservation, "FECHA DE RESERVA");

    if (!dateReservation) {
      dateReservation = await DateReservation.create({
        date: new Date(date),
        hour,
        typeOfTables: settings.typeOfTables,
      });
    }
    let busyTables = 1;
    const tables = dateReservation.typeOfTables; // [{"qty":20,"capacity":2},{"qty":4,"capacity":4},{"qty":5,"capacity":8}]
    //PROGRAMAR EL BUCLE FOR DEL DISCORD
    let thereTable = false;
    let tableCapacity = dateReservation.typeOfTables[0].capacity;

    for (let i = 0; i < tables.length; i++) {
      console.log("mesa ", tables[i].capacity, " con ", tables[i].qty, " mesas disponibles");

      if (tables[i].qty > 0) {
        console.log("hay mesas disponibles en esta mesa");

        // Calculate how many tables of this size would be needed
        const neededTables = Math.round(people / tables[i].capacity);

        // Check if we have enough tables of this size
        if (neededTables <= tables[i].qty) {
          thereTable = true;
          busyTables = neededTables;
          tableCapacity = tables[i].capacity;
          console.log(`Asignando ${busyTables} mesas de capacidad ${tableCapacity}`);
          break; // Exit the loop since we found suitable tables
        }
      }
      console.log("thereTable", thereTable);
    }

    if (thereTable === true) {
      console.log("Hay mesas disponibles para esa cantidad de personas");
      console.log("personas ", people, " y ocupa ", busyTables, " mesas de ", tableCapacity, " personas");

      dateReservation.typeOfTables = tables.map((table) => {
        if (table.capacity === tableCapacity) {
          table.qty -= busyTables;
        }
        return table;
      });
      await dateReservation.save(); // actualiza las mesas

      if (admincreate) {
        const reservation = await Reservation.create({
          customerName: name,
          customerEmail: "usuario@creado.admin",
          customerPhone: phone,
          busyTables,
          tableCapacity,
          date,
          hour,
          people,
        });
        // console.log(reservation);
        console.log("Reserva creada con exito");

        return res.status(201).json({ message: "Reserva pendiente, le sera enviado por correo la confirmacion de la reserva" });
      }

      const reservation = await Reservation.create({
        customerName: req.session.user.name,
        customerEmail: req.session.user.email,
        customerPhone: req.session.user.phone,
        busyTables,
        tableCapacity,
        date,
        hour,
        people,
      });

      await transporter
        .sendMail({
          from: '"Hikari Restaurant 🍣" <officialhikarisushi@gmail.com>', // sender address
          to: reservation.customerEmail, // list of receivers
          subject: "Reserva", // Subject line
          html: html(reservation.status, reservation.customerName, reservation.date, reservation.hour), // html body
        })
        .then((info) => {
          console.log("Message sent: %s", info.messageId);
        })
        .catch((error) => {
          console.error("Error al enviar el correo:", error);
        });

      console.log("Reserva creada con exito");

      // console.log(reservation);
      return res.status(201).json({ message: "Reserva pendiente, le sera enviado por correo la confirmacion de la reserva" });
    } else {
      return res.status(401).json({ message: "No hay mesas disponibles para esa cantidad de personas" });
    }
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
    const AvailableHours = [];
    let allHours;

    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(200).json(AvailableHours);
    }

    allHours = settings.allHours;
    for (let i = 0; i < allHours.length; i++) {
      let dateReservation = await DateReservation.findOne({
        where: {
          date: new Date(date),
          hour: allHours[i],
        },
      });
      if (!dateReservation) {
        dateReservation = await DateReservation.create({
          date: new Date(date),
          hour: allHours[i],
          typeOfTables: settings.typeOfTables, // [{ qty: 20, capacity: 4 }, { qty: 10, capacity: 6 }],
        });
      }

      console.log(dateReservation.typeOfTables, " MESAS DE LA FECHA");

      const availableTables = dateReservation.typeOfTables.reduce((total, table) => total + table.qty, 0);

      console.log(availableTables, "MESAS DISPONIBLES A LA HORA", allHours[i]);

      if (dateReservation.availableTables > 0) {
        AvailableHours.push({ hour: allHours[i], available: true });
      } else {
        AvailableHours.push({ hour: allHours[i], available: true });
      }
    }

    console.log(AvailableHours);

    return res.status(200).json(AvailableHours);
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
    if (reservation.status !== status) {
      reservation.status = status;
      if (status === "cancelled") {
        const dateReservation = await DateReservation.findOne({
          where: {
            date: reservation.date,
            hour: reservation.hour,
          },
        });

        dateReservation.typeOfTables = dateReservation.typeOfTables.map((table) => {
          if (table.capacity === reservation.tableCapacity) {
            table.qty += reservation.busyTables;
          }
          return table;
        });
        await dateReservation.save();
      }
      console.log("Reserva actualizada con exito");
    } else {
      return res.status(400).json({ message: "Reservation already has that status" });
    }

    await reservation.save();

    await transporter
      .sendMail({
        from: '"Hikari Restaurant 🍣" <officialhikarisushi@gmail.com>', // sender address
        to: reservation.customerEmail, // list of receivers
        subject: "Reserva", // Subject line
        html: html(status, reservation.customerName, reservation.date, reservation.hour), // html body
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
