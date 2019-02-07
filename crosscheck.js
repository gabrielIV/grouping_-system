let periodID = 3;

console.log("Running a crosscheck ....");

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.43.46",
  user: "timo",
  password: "ohms4139",
  multipleStatements: true,
  database: "chukacu_testing_4"
});

// let phones;

const csv = require("csvtojson");
csv()
  .fromFile("./src/pastors.csv")
  .then(phones => {
    // console.log(phones);

    // return false;

    connection.connect(function(err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }

      console.log("connected as id " + connection.threadId);
    });
    // 715768010
    // connection.query(
    //   `CALL init_period('Period2', 'sfsfddsf', '2011-01-01', '2011-01-01', '2', '1', '1'); `,
    //   function() {
    let sql = ` 


        SELECT * FROM  (
			
          SELECT 
              u.id user_id, 
              UPPER(CONCAT(u.firstname,' ',u.secondname,' ',u.lastname)) user_name,
              uph.phone_number user_phone_no,
              u.gender user_gender,
    
              pp.period_id,
              if((
              SELECT up.value
              FROM users_period up
              WHERE up.user_id=u.id AND up.type="STUDY_YEAR" AND up.period_id=pp.period_id
              ORDER BY up.period_id DESC
              LIMIT 1) IS NOT NULL,
              
              (
              SELECT up.value
              FROM users_period up
              WHERE up.user_id=u.id AND up.type="STUDY_YEAR" AND up.period_id=pp.period_id
              ORDER BY up.period_id DESC
              LIMIT 1)
              
              
              ,"1") current_year,
              
              if((
              SELECT up.value
              FROM users_period up
              WHERE up.user_id=u.id AND up.type="STUDY_SEMISTER" AND up.period_id=pp.period_id
              ORDER BY up.period_id DESC
              LIMIT 1) IS NOT NULL,
              
              (
              SELECT up.value
              FROM users_period up
              WHERE up.user_id=u.id AND uptype="STUDY_SEMISTER" AND up.period_id=pp.period_id
              ORDER BY up.period_id DESC
              LIMIT 1)
              
              
              ,"1") current_semister
              FROM users u
              INNER JOIN users_phone_numbers uph ON uph.user_id=u.id
              LEFT JOIN users_email_addresses ue ON ue.user_id=u.id 
              JOIN users_period pp ON pp.user_id=u.id 
              WHERE pp.period_id=${periodID}
              
              
              group BY u.id
              ) n
              
              WHERE n.current_year>0

`;

    let phone_number = "715768012";

    // console.log(`${sql} and upn.phone_number=${phone_number} `);

    phones.forEach(function(j) {
      let phone_number = j.phone;
      let arr = j.name.split(" ");
      arr[0] = arr[0] ? arr[0] : "";
      arr[1] = arr[1] ? arr[1] : "";
      arr[2] = arr[2] ? arr[2] : "";

      connection.query(`${sql} and n.user_phone_no=${phone_number} `, function(
        err,
        data
      ) {
        if (data.length == 0) {
          //   console.log(
          //     "CALL `proc_bs_register`('1', '" +
          //       periodID +
          //       "', 'BS pastor', '.', '.', 'MALE', '" +
          //       phone_number +
          //       "', '" +
          //       phone_number +
          //       "@chukaunicu.org', '1', '1', 'BACHELORS', '2', '1', '12345678')"
          //   );

          // connection.query("INSERT INTO `chukacu_testing_1`.`groups` (`period_id`, `name`, `desciption`, `created_at`, `updated_at`) VALUES ('2', 'Bible Study', 'Bible Study Group', '2018-09-29 11:06:19', '2018-09-29 11:06:19');",function(){

          // })

          connection.query(
            "CALL `proc_bs_register`('1', '" +
              periodID +
              "', '" +
              arr[0] +
              "', '" +
              arr[1] +
              "', '" +
              arr[2] +
              "', 'MALE', '" +
              phone_number +
              "', '" +
              phone_number +
              "@chukaunicu.org', '1', '1', 'BACHELORS', '2', '1', '12345678')",
            function(err, data) {
              console.log(data);
              if (err) {
                console.log(err);
              }
            }
          );
        } else {
        }

        // connection.query(
        //   "CALL `create_bs_groups_pastors_pnone_number`('" +
        //     phone_number +
        //     "', '" +
        //     periodID +
        //     "')",
        //   function(err, data) {
        //     //   console.log("data");
        //     process.stdout.write(".");
        //     if (err) {
        //       console.log(err);
        //     }
        //   }
        // );

        // console.log(data);
        // console.log("complete")
      });
    });
    // });
  });
