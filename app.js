const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require("moment");
const Pagamento = require('./models/pagamento');

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//rotas
app.get('/pagamento', (req, res) => {
    Pagamento.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((pagamentos) => {
        const context = {
            pagamentos: pagamentos.map((pagamento) => {
                return {
                    id: pagamento.id,
                    nome: pagamento.nome,
                    valor: pagamento.valor,
                    createdAt: pagamento.createdAt
                }
            })
        }

        res.render('pagamento', {
            pagamentos: context.pagamentos
        });
    });
});


app.get('/cad-pagamento', (req, res) => {
    res.render('cad-pagamento');
});

app.post('/add-pagamento', (req, res) => {
    // res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>");
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function () {
        res.redirect('/pagamento');
    }).catch(function (err, result) {
        res.send("Falha ao cadastrar pagamento" + err);
    });
});

app.get('/del-pagamento/:id', function (req, res) {
    Pagamento.destroy({
        where: {
            'id': req.params.id
        }
    }).then(function () {
        // res.send("Pagamento apagado com sucesso");
        res.redirect('/pagamento');
    }).catch(function (err) {
        res.send("Falha ao apagar pagamento");
    });
});

app.listen(8080);