import dotenv from 'dotenv';
import sequelize from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import app from './app.js';
dotenv.config();

app.use('/', userRoutes);

sequelize.sync({alter: true}).then(() => {
  app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
});

export default app;