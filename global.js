var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.43.46",
  user: "timo",
  password: "ohms4139",
  multipleStatements: true,
  database: "chukacu_v3"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
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

query(
  `
  SELECT * from v_users_grouping_data where user_gender='FEMALE' and user_year='1' order by rand();
  SELECT * from v_users_grouping_data where user_gender='MALE' and user_year='1' order by rand();
  SELECT * from v_users_grouping_data where user_gender='FEMALE' and user_year='2' order by rand();
  SELECT * from v_users_grouping_data where user_gender='MALE' and user_year='2' order by rand();
  SELECT * from v_users_grouping_data where user_gender='FEMALE' and user_year='3' order by rand();
  SELECT * from v_users_grouping_data where user_gender='MALE' and user_year='3' order by rand();
  SELECT * from v_users_grouping_data where user_gender='FEMALE' and user_year='4' order by rand();
  SELECT * from v_users_grouping_data where user_gender='MALE' and user_year='4' order by rand();
  `,
  function(data) {
    // console.log(data);

    // CALCULATE NUMBER OF ALL USERS
    query("select COUNT(user_id) from v_users_grouping_data ", function(
      users_number
    ) {
      console.log(users_number);
      analyse(data, users_number[0]["COUNT(user_id)"]);
    });
  }
);

var analyse = (data, number) => {
  // CALCULATE NUMBER OF ALL LEADERS
  query(
    "SELECT l.user_id user_id, l.group_id group_id from leaders l where l.period_id=3 and l.position='BS PASTOR'; ",
    function(leaders) {
      console.log("leaders=", leaders.length);
      console.log("all=", number);

      NumberOFGroupsMembers = Math.floor(number / leaders.length);
      numberOfLeader = leaders.length;
      console.log("members=", NumberOFGroupsMembers);

      var groupCount = 0;

      // for (var x in data) {
      //   var group = data[x];

      //     groupCount++;
      //     if (groupCount == NumberOFGroupsMembers) {
      //       groupCount = 0;

      //       Group.push(group[0]);

      //   }
      // }
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
        process.stdout.write(".");
      });
      // console.log(q2);
    }
  }

  return false;
}
