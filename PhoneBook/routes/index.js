const express = require('express');
const router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// Получение и поиск контактов
// [{id, name, phone}]
let contacts = [];
let currentContactId = 1;

// /api/contacts?term=...
router.get("/api/contacts", function (req, res) {
    const term = (req.query.term || "").trim().toUpperCase();

    if (term.length === 0) {
        res.send(contacts);
    } else {
        res.send(contacts.filter(c => c.name.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term)));
    }
});

//Создание контакта
//{name, phone}
router.post("/api/contacts", function (req, res) {
    const name = (req.body.name || "").trim();

    if (name.length === 0) {
        res.send({
            success: false,
            errorCode: 1,
            message: "Необходимо заполнить имя контакта"
        });
        return;
    }

    const phone = (req.body.phone || "").trim();

    if (phone.length === 0) {
        res.send({
            success: false,
            errorCode: 2,
            message: "Необходимо заполнить телефон"
        });
        return;
    }

    const phoneInUpperCase = phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === phoneInUpperCase)) {
        res.send({
            success: false,
            errorCode: 3,
            message: "Уже есть контакт с таким номером телефона"
        })
        return;
    }

    contacts.push({
        id: currentContactId,
        name,
        phone
    });

    currentContactId++;

    res.send({
        success: true,
        errorCode: null,
        message: null
    });
});

router.delete("/api/contacts/:id", function (req, res) {
    const idString = req.params.id

    if (!idString) {
        res.send({
            success: false,
            message: "Необходимо указать id контакта"
        })
        return;
    }

    const id = Number(idString);

    if (isNaN(id)) {
        res.send({
            success: false,
            message: "Id контакта должен быть числом"
        })
        return;
    }

    contacts = contacts.filter(c => c.id !== id);

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;
