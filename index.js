const express = require('express');
const {google} = require('googleapis');
const keys = require('./mycrel.json');

const app = express();

app.get('/',async(req,res)=>{


const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

 client.authorize(function(err,token){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Connected');
        
    }
});


    const gsheet_api = google.sheets({version:'v4',auth: client});
    const read_opt = {
        spreadsheetId:'1LO_9_NYLsX1gyy_lviyZxDIsQP2MbOpcBCKDslGK-mk',
        range:'sheet1!a1:q'
    };
    let read_result = await gsheet_api.spreadsheets.values.get(read_opt);     
    res.send(read_result.data.values[0]);


});
app.listen(3000,()=>console.log('server is running ....'));

///////////////////////GoogleAuth///////////////////////
/*
const auth = new google.auth.GoogleAuth({
        keyFile:"credentials.json",
        scopes:'https://www.googleapis.com/auth/spreadsheets'
    });

    const client = await auth.getClient();
    gsheet_api = google.sheets({version:'v4',auth: client});
    const rows = await gsheet_api.spreadsheets.values.get({
        auth,
        spreadsheetId:'1LO_9_NYLsX1gyy_lviyZxDIsQP2MbOpcBCKDslGK-mk',
        range:'Sheet1'
        
    });
    res.send(rows.data);
*/




/*//////////////// thisis jwt ///////////////////
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,token){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Connected');
        googlesheetrun(client);
    }
});

async function googlesheetrun(cl){
    const gsheet_api = google.sheets({version:'v4',auth: cl});
    const read_opt = {
        spreadsheetId:'1LO_9_NYLsX1gyy_lviyZxDIsQP2MbOpcBCKDslGK-mk',
        range:'sheet1!a1:q'
    };
    let read_result = await gsheet_api.spreadsheets.values.get(read_opt);     console.log(read_result.data.values);
*/    
/*
    const update_opt = {
        spreadsheetId:'1LO_9_NYLsX1gyy_lviyZxDIsQP2MbOpcBCKDslGK-mk',
        range:'sheet1!a2:b5'
        valueInputOption:'USER_ENTERED'
        resource: {values: [array to be written]}
    };
    let update_result = await gsheet_api.spreadsheets.values.update(update_opt);*/
/*
    console.log(read_result.data.values);
}
////////////////////////////////// end jwt ////////////////////////
*/
/*
const app = express();
//app.get('/',(req,res)=>{
    
//});

//app.listen(3000,()=>{
    console.log("server is running ....")

});*/
