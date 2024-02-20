const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Получение списка всех задач
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.log()
        res.status(500).json({ message: err.message });
    }
});

// Получение конкретной задачи по ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Задача не найдена' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание новой задачи
router.post('/', async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    try {
        const createdTask = await newTask.save();
        res.status(201).json(createdTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Обновление задачи
router.patch('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Задача не найдена' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Удаление задачи
router.delete('/:id', async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: 'Задача удалена' });
        } else {
            res.status(404).json({ message: 'Задача не найдена' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
