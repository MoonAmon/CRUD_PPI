
const Paciente = require('../models/paciente');
const express = require('express');
const router = express.Router();
const debug = require('debug')('pacientes:router');
const sequelize = require('../models/db');

// Sychronize the model with the database
sequelize.sync().then(() => {
  console.log('Database synchronized');
});

// GET /
router.get('/', (req, res) => {
  res.render('layout', { title: 'Menu', body: 'pacientes' });
});

// GET /pacientes
router.get('/show', async (req, res) => {
  try {
    const pacientesResultado = await Paciente.findAll();

    if (!pacientesResultado) {
        res.status(404);
        return res.render('emptylist', { title: 'Erro'});
    }

    res.status(200);
    res.render('pacienteshow', {
      title: 'Lista de Pacientes', body: 'pacientes', pacientes: pacientesResultado,
    });
  } catch (error) {
    res.status(500);
    debug(error.message);
    return res.render('error', { title: 'Erro', message: error.message, error: error });
  }
});

// POST /add
router.get('/add', (req, res) => {
  res.render('addpaciente', { title: 'Adicionar Paciente' });
});

router.post('/add', async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body);
        res.status(201);
        res.redirect('/pacientes/show');
    } catch (error) {
        res.status(400);
        return res.render('error', { title: 'Erro', message: error.message, error: error });
    }
});



router.post('/delete' , async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.body.cpf);
        if (!paciente) {
            res.status(404);
            return res.render('error', { title: 'Erro 404', message: 'Paciente não encontrado' });
        }
        await paciente.destroy();
        res.redirect('/pacientes');
    } catch (error) {
        res.status(500);
        return res.render('error', { title: 'Erro 500', message: error.message, error: error });
    }
});

router.get('/delete', async (req, res) => {
    try {

        const pacientes = await Paciente.findAll();

        if (!pacientes) {
            res.status(404);
            return res.render('emptylist', { title: 'Erro'});
        }
        res.status(200);
        res.render('pacientedelete', { title: 'Deletar Paciente'});
    } catch (error) {
        res.status(500);
        return res.render('error', { title: 'Erro 500', message: error.message, error: error });
    }
});

// Delete by the action of the button
router.post('/delete/:cpf', async (req, res) => {
    try {
        // Get the cpf from the URL
        const cpf = req.params.cpf;

        // Find the paciente by the cpf
        const paciente = await Paciente.findByPk(req.params.cpf);

        // If the paciente is not found, return a 404 error
        if (!paciente) {
            res.status(404);
            return res.render('error', { title: 'Erro', message: 'Paciente não encontrado' });
        }

        // If the paciente is found, delete it
        await Paciente.destroy({
            where: {
                cpf: cpf,
            },
        });
        res.redirect('/pacientes/show');
    } catch (error) {
        res.status(500);
        return res.render('error', { title: 'Erro', message: error.message, error: error });
    }
});

router.get('/update', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.render('pacienteupdatefound', { pacientes: pacientes, pacienteFound: pacientes[0], title: 'Atualizar Paciente' });
    } catch (error) {
        res.status(500);
        return res.render('error', { title: 'Erro', message: error.message, error: error });
    }
});

// Update by the action of the button
router.post('/update/:cpf', async (req, res) => {
    try {
        // Get the cpf from the URL
        const cpf = req.params.cpf;

        // Get all the pacientes
        const pacientes = await Paciente.findAll();

        // Find the paciente by the cpf
        const paciente = await Paciente.findByPk(cpf);

        // If the paciente is not found, return a 404 error
        if (!paciente) {
            res.status(404);
            return res.render('error', { title: 'Erro', message: 'Paciente não encontrado' });
        }

        // If the paciente is found, render the update form
        res.render('pacienteupdatefound', { title: 'Atualizar Paciente', pacienteFound: paciente, pacientes: pacientes });

    } catch (error) {
        res.status(500);
        return res.render('error', { title: 'Erro', message: error.message, error: error });
    }
});


module.exports = router;