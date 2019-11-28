'use strict';

const app = require('./express/server');

app.get('/', (req, res)=>{
    res.json({name: 'dave'})
})
app.listen(3000, () => console.log('Local app listening on port 3000!'));
