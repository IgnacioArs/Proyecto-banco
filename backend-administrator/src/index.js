import app from "./app.js";
import "../src/database.js";

async function main(){
    app.listen(app.get('port'),() => {
        console.log("server listening on port ",app.get('port'));
    })
}
main();