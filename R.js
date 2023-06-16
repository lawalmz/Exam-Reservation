const express = require("express");
const request = require("request");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
var router = express.Router()
app.use(bodyParser.urlencoded({extended: true}));

let con;

if (process.env.JAWSDB_URL){
  con = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  con = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   connectionLimit:50
  })
}

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.listen(process.env.PORT||2000, function(){
  console.log("Server is running on port 3000")
})







 app.post("/R",function(req,res){
   f_name = req.body.firstname;
   l_name = req.body.lastname;
   email_ = req.body.email;
   p_number= req.body.p_number;
   exam_ = req.body.exam;



    sql = "insert into reserve(first_name,last_name,email,phone_number,exam_type)values('"+f_name+"','"+l_name+"','"+email_+"','"+p_number+"','"+exam_+"')";

     con.query(sql,function(err,result){
       if (err)throw err;
       res.send('Reservation was succesfully date and time will be sent to your email');


     });


 })

//






app.post("/A",function(req,res){




      // if(err)throw err;
      emails =  req.body.Admin_email;

      sql2 = "select email from admin"
      con.query(sql2,function(err,ren){
          // if (err)throw err;

         eem = ren[0].email
           // if (err)throw err;

           if (eem == emails ){
             sql1 = "select * from reserve"

              con.query(sql1,function(err,result){

                const html = `
         <!DOCTYPE html>
         <html>
         <head>
             <title>MySQL Deploy Demo</title>
             <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

        <style>
        .b{
          background-color:Black;
          color:white;
        }
        @media only screen and (max-width:800px) {
         #no-more-tables tbody,
         #no-more-tables tr,
         #no-more-tables td {
             display: block;
         }
         #no-more-tables thead tr {
             position: absolute;
             top: -9999px;
             left: -9999px;
         }
         #no-more-tables td {
             position: relative;
             padding-left: 50%;
             border: none;
             border-bottom: 1px solid #eee;
         }
         #no-more-tables td:before {
             content: attr(data-title);
             position: absolute;
             left: 6px;
             font-weight: bold;
         }
         #no-more-tables tr {
             border-bottom: 1px solid #ccc;
         }
     }
        </style>
         </head>
         <body>
         <div class="container table-responsive" id="no-more-tables">
             <h1 class="text-center">List of people that made the reservation</h1>

             <table class="table table-striped" >
                 <thead class="b">
                     <tr>
                     <th scope="col">first_name</th>
                     <th scope="col">last_name</th>
                     <th scope="col">phone_number</th>
                     <th scope="col">exam_type</th>
                     <th scope="col">email</th>
                     <th scope="col">Reservation_time</th>
                     </tr>
                 </thead>
                 <tbody>
                 ${result
                   .map((reserve) => {
                     return `
                         <tr>

                         <td data-title="first_name">${reserve.first_name}</td>
                         <td data-title="last_name">${reserve.last_name}</td>
                         <td data-title="phone_number">${reserve.phone_number}</td>
                         <td data-title="exam_type">${reserve.exam_type}</td>
                         <td data-title="email">${reserve.email}</td>
                         <td data-title="Reservation">${reserve.Reservation_date}</td>
                         </tr>
                     `;
                   })
                   .join("")}
                 <tbody>
             </table>
             </div>
         </body>
         </html>
         `;
  res.send(html);






              });

           }else{
             res.send("failed")
            }



       })





 })
