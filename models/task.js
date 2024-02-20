const mongoose = require('mongoose');

// Определение схемы задачи
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['выполнена', 'не выполнена'], default: 'не выполнена' }
});

// Создание модели Task
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
