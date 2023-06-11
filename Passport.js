//last updated on june 11th 2023

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// mock user database
const users = [
    {
        id: 1,
        username: 'john',
        password: bcrypt.hashSync('password', 10),
    },
];

passport.use(
    new LocalStrategy((username, password, done) => {
        const user = users.find((user) => user.username === username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((user) => user.id === id);
    done(null, user);
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Loging successful' });
});

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ message: 'Access granted' });
    } else {
        res.status(401).json({ message: 'Access denied' });
    }
});
