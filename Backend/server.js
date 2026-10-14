import app from './app.js';
import DbConnection from './config/db.js';


const port = process.env.PORT || 5000;

const startServer = async() =>{

    await DbConnection();

    app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
    });
};



startServer();



