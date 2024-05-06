const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
// const emailUser = require('../credentials');
// const emailPassword = require('../credentials');

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: 'jermain.pollich15@ethereal.email',
    pass: 'xYaRycD9Wn9GZR8qVG'
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, age, password } = req.body;
    if (!username || !email || !age || !password) {
      return res.status(400).json({ message: 'Необходимо заполнить все поля' });
    } 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, age, password: hashedPassword });
    await newUser.save();

    const mailOptions = {
      from: 'To-Do MEAN App',
      to: newUser.email,
      subject: 'Registration Successful',
      text: 'Congratulations! You have successfully registered.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Проверка на временную блокировку аккаунта
    if (user.blockedUntil && user.blockedUntil > new Date()) {
      return res.status(401).json({ message: `Account is blocked until ${user.blockedUntil}` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Увеличение количества неудачных попыток входа и установка временной блокировки
      const loginAttempts = user.loginAttempts + 1;
      const maxLoginAttempts = 5;
      const lockoutTimeInMinutes = 5; // Время блокировки в минутах
      if (loginAttempts >= maxLoginAttempts) {
        const blockedUntil = new Date();
        blockedUntil.setSeconds(blockedUntil.getSeconds() + lockoutTimeInMinutes);
        await User.findByIdAndUpdate(user._id, { loginAttempts: 0, blockedUntil });
        return res.status(401).json({ message: `Too many login attempts. Account is blocked until ${blockedUntil}` });
      } else {
        await User.findByIdAndUpdate(user._id, { loginAttempts });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Сброс количества неудачных попыток входа и временной блокировки при успешном входе
    await User.findByIdAndUpdate(user._id, { loginAttempts: 0, blockedUntil: null });

    // Создание JWT токена и отправка ответа
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const token = jwt.sign({ userId: user._id, exp: Math.floor(expirationTime.getTime() / 1000) }, 'stack_mean');
    
    res.status(200).json({ message: 'Login successful', token, expirationTime, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
