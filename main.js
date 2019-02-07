console.log("Starting ....");

let periodID = 3;

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.43.46",
  user: "timo",
  password: "ohms4139",
  multipleStatements: true,
  database: "chukacu_testing_4"
});

const _cliProgress = require("cli-progress");

// create a new progress bar instance and use shades_classic theme
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
let barCount = 0;

let TotalUsers;
// start the progress bar with a total value of 200 and start value of 0

// update the current value in your application..

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
  console.log(".......................... ");
});

// connection.query("", function(error, results, fields) {
//   if (error) throw error;
//   // connected!
// });

var users = [{}];

// ids

function query(str, callback, err) {
  connection.query(str, function(error, results, fields) {
    if (callback != undefined) {
      callback(results);
    }
    if (error) {
      console.log(str);
      throw error;
    }
  });
}

// query("select * from leaders id from")

let sql = ` SELECT * FROM  (
                        
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
      WHERE up.user_id=u.id AND up.type="STUDY_SEMISTER" AND up.period_id=pp.period_id
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
      
      WHERE n.current_year>0`;

query(
  `
  ${sql} and n.user_gender='FEMALE' and n.current_year='1' order by rand();
  ${sql} and n.user_gender='MALE' and n.current_year='1' order by rand();
  ${sql} and n.user_gender='FEMALE' and n.current_year='2' order by rand();
  ${sql} and n.user_gender='MALE' and n.current_year='2' order by rand();
  ${sql} and n.user_gender='FEMALE' and n.current_year='3' order by rand();
  ${sql} and n.user_gender='MALE' and n.current_year='3' order by rand();
  ${sql} and n.user_gender='FEMALE' and n.current_year='4' order by rand();
  ${sql} and n.user_gender='MALE' and n.current_year='4' order by rand();
  `,
  function(data) {
    // console.log(data);

    // CALCULATE NUMBER OF ALL USERS
    query(sql, function(users_number) {
      TotalUsers = users_number.length;
      analyse(data, users_number.length);
    });
  }
);

var analyse = (data, number) => {
  // CALCULATE NUMBER OF ALL LEADERS
  console.log(
    "SELECT l.user_id user_id, l.group_id group_id from leaders l where l.period_id=" +
      periodID +
      " and l.position='BS PASTOR'; "
  );

  query(
    "SELECT l.user_id user_id, l.group_id group_id from leaders l where l.period_id=" +
      periodID +
      " and l.position='BS PASTOR'; ",
    function(leaders) {
      console.log("Number of groups =", leaders.length);
      console.log("Total number of users =", number);

      NumberOFGroupsMembers = Math.floor(number / leaders.length);
      numberOfLeader = leaders.length;
      console.log("Avg number of members per group =", NumberOFGroupsMembers);
      bar1.start(TotalUsers, 0);

      var groupCount = 0;

      Group = [];
      // Group[0] = [];
      Endreached = false;
      // console.log(JSON.stringify(data));

      var counter = 0;
      var loopCounter = 0;
      var classCounter = 0;

      var totalLoop = 0;
      while (totalLoop < number) {
        if (Group[counter] == undefined) {
          Group[counter] = [];
        }

        if (data[classCounter].length != 0) {
          Group[counter].push(data[classCounter][0]);

          data[classCounter].shift();

          loopCounter++;

          totalLoop++;
          // console.log(totalLoop);

          if (Endreached) {
            counter++;
          } else if (loopCounter == NumberOFGroupsMembers) {
            counter++;
            loopCounter = 0;
          }

          if (counter == leaders.length) {
            counter = 0;
            Endreached = true;
          }
        }

        classCounter++;
        // console.log(classCounter);
        if (classCounter == data.length) {
          classCounter = 0;
        }

        // if (!data[classCounter]) {
        //   console.log(classCounter);
        //   break;
        // }
      }

      // console.log(data);

      // console.log(Group.length);
      // console.log(JSON.stringify(Group));

      FinishByInsert(leaders, Group);
    }
  );
};

function FinishByInsert(Leaders, Group) {
  for (x in Leaders) {
    var q1 =
      "INSERT INTO `groups_members` (`user_id`, `group_id`) VALUES ('" +
      Leaders[x].user_id +
      "', '" +
      Leaders[x].group_id +
      "'); INSERT INTO `biblestudy_sessions_groups` (`group_id`, `biblestudy_session`) VALUES ('" +
      Leaders[x].group_id +
      "', '1');";
    query(q1);

    // console.log(q1);

    for (var y in Group[x]) {
      var q2 =
        "INSERT INTO `groups_members` (`user_id`, `group_id`) VALUES ('" +
        Group[x][y].user_id +
        "', '" +
        Leaders[x].group_id +
        "');";

      query(q2, function() {
        // process.stdout.write(".");
        bar1.update(++barCount);
        if (barCount == TotalUsers) {
          bar1.stop();
          connection.end();
        }
      });
      // console.log(q2);
    }
  }

  return false;
}
