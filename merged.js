let periodID = 3;

console.log("starting ....");

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.43.46",
  user: "timo",
  password: "ohms4139",
  multipleStatements: true,
  database: "chukacu_testing_3"
});

let phones = [
  {
    phone: 790213692
  },
  {
    phone: 715768010
  },
  {
    phone: 713808480
  },
  {
    phone: 715206162
  },
  {
    phone: 799491428
  },
  {
    phone: 729596714
  },
  {
    phone: 799450685
  },
  {
    phone: 712846535
  },
  {
    phone: 741029230
  },
  {
    phone: 795307715
  },
  {
    phone: 719865118
  },
  {
    phone: 719865117
  },
  {
    phone: 799880759
  },
  {
    phone: 798176723
  },
  {
    phone: 704813684
  },
  {
    phone: 742653101
  },
  {
    phone: 790740928
  },
  {
    phone: 790641691
  },
  {
    phone: 757137835
  },
  {
    phone: 792713436
  },
  {
    phone: 714723842
  },
  {
    phone: 791426994
  },
  {
    phone: 712309142
  },
  {
    phone: 723028609
  },
  {
    phone: 791251798
  },
  {
    phone: 710300619
  },
  {
    phone: 790128613
  },
  {
    phone: 790126585
  },
  {
    phone: 718127601
  },
  {
    phone: 719187893
  },
  {
    phone: 790881286
  },
  {
    phone: 740758494
  },
  {
    phone: 718485790
  },
  {
    phone: 719280463
  },
  {
    phone: 717948920
  },
  {
    phone: 701898755
  },
  {
    phone: 717789481
  },
  {
    phone: 700095048
  },
  {
    phone: 712590267
  },
  {
    phone: 797208606
  },
  {
    phone: 718567877
  },
  {
    phone: 715630783
  },
  {
    phone: 714818122
  },
  {
    phone: 745148727
  },
  {
    phone: 745696675
  },
  {
    phone: 743082481
  },
  {
    phone: 799163829
  },
  {
    phone: 702152809
  },
  {
    phone: 703876295
  },
  {
    phone: 711605507
  },
  {
    phone: 714072391
  },
  {
    phone: 701666762
  },
  {
    phone: 716225539
  },
  {
    phone: 790170573
  },
  {
    phone: 727076219
  },
  {
    phone: 702495835
  },
  {
    phone: 717517202
  },
  {
    phone: 723029649
  },
  {
    phone: 741373477
  },
  {
    phone: 717713669
  },
  {
    phone: 703759720
  },
  {
    phone: 797208606
  },
  {
    phone: 702504462
  },
  {
    phone: 717697413
  },
  {
    phone: 741739879
  },
  {
    phone: 780653076
  },
  {
    phone: 712590267
  },
  {
    phone: 791709952
  },
  {
    phone: 790708731
  },
  {
    phone: 745696675
  },
  {
    phone: 718430074
  },
  {
    phone: 746265784
  },
  {
    phone: 714986392
  },
  {
    phone: 725648672
  },
  {
    phone: 711785592
  },
  {
    phone: 791586193
  },
  {
    phone: 702164114
  },
  {
    phone: 743127359
  },
  {
    phone: 790661149
  },
  {
    phone: 790181717
  },
  {
    phone: 792806184
  },
  {
    phone: 798601644
  },
  {
    phone: 796031238
  },
  {
    phone: 795174064
  },
  {
    phone: 799008541
  },
  {
    phone: 712369699
  },
  {
    phone: 790507860
  },
  {
    phone: 791584627
  },
  {
    phone: 798789164
  },
  {
    phone: 704112228
  },
  {
    phone: 798290115
  },
  {
    phone: 792069990
  },
  {
    phone: 727268524
  },
  {
    phone: 785504647
  },
  {
    phone: 727297308
  },
  {
    phone: 729017311
  },
  {
    phone: 797432990
  },
  {
    phone: 729762034
  },
  {
    phone: 708941262
  },
  {
    phone: 748347075
  },
  {
    phone: 704133549
  },
  {
    phone: 795200195
  },
  {
    phone: 746551264
  },
  {
    phone: 729702502
  },
  {
    phone: 704746709
  },
  {
    phone: 721399359
  },
  {
    phone: 704412717
  },
  {
    phone: 712910460
  },
  {
    phone: 708586663
  },
  {
    phone: 715943767
  },
  {
    phone: 719476140
  },
  {
    phone: 705495787
  },
  {
    phone: 704281104
  },
  {
    phone: 740099897
  },
  {
    phone: 715075140
  },
  {
    phone: 703396621
  },
  {
    phone: 719463736
  },
  {
    phone: 799133324
  },
  {
    phone: 727560183
  },
  {
    phone: 702443359
  },
  {
    phone: 708912454
  },
  {
    phone: 719245063
  },
  {
    phone: 791426994
  },
  {
    phone: 707295459
  },
  {
    phone: 796435151
  },
  {
    phone: 748195262
  },
  {
    phone: 704627861
  },
  {
    phone: 740811018
  },
  {
    phone: 796337173
  },
  {
    phone: 713599671
  },
  {
    phone: 743306579
  },
  {
    phone: 746860099
  },
  {
    phone: 719832731
  },
  {
    phone: 741769394
  },
  {
    phone: 795414768
  },
  {
    phone: 743127359
  },
  {
    phone: 792485138
  },
  {
    phone: 792447465
  },
  {
    phone: 716776140
  },
  {
    phone: 705345310
  },
  {
    phone: 796235999
  },
  {
    phone: 796367520
  },
  {
    phone: 727454780
  },
  {
    phone: 724553595
  }
];

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
// 715768010

let sql1 = `SELECT  u.id user_id, UPPER(CONCAT(u.firstname,' ',u.secondname,' ',u.lastname)) user_name,upn.phone_number user_phone_no, u.gender user_gender,
up.value user_year
FROM users u
JOIN users_phone_numbers upn ON upn.user_id=u.id
JOIN users_period up ON up.user_id=u.id
LEFT JOIN leaders l ON l.user_id=u.id
WHERE up.type="STUDY_YEAR" AND up.value<5 AND up.value>0  AND LENGTH(upn.phone_number) >8 AND LENGTH(upn.phone_number) <10 AND u.status=1 `;

let phone_number = "715768012";

// console.log(`${sql1} and upn.phone_number=${phone_number} `);

phones.forEach(function(j) {
  let phone_number = j.phone;

  connection.query(`${sql1} and upn.phone_number=${phone_number} `, function(
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
          "', 'BS pastor', '.', '.', 'MALE', '" +
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

    connection.query(
      "CALL `create_bs_groups_pastors_pnone_number`('" +
        phone_number +
        "', '" +
        periodID +
        "')",
      function(err, data) {
        console.log(data);
        if (err) {
          console.log(err);
        }
      }
    );

    // console.log(data);
    // console.log("complete")
  });
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

let sql = `SELECT  u.id user_id, UPPER(CONCAT(u.firstname,' ',u.secondname,' ',u.lastname)) user_name,upn.phone_number user_phone_no, u.gender user_gender,
up.value user_year
FROM users u
JOIN users_phone_numbers upn ON upn.user_id=u.id
JOIN users_period up ON up.user_id=u.id
LEFT JOIN leaders l ON l.user_id=u.id
WHERE up.type="STUDY_YEAR" AND up.value<5 AND up.value>0 AND up.period_id=${periodID} AND LENGTH(upn.phone_number) >8 AND LENGTH(upn.phone_number) <10 AND u.status=1 AND l.id IS NULL `;

query(
  `
  ${sql} and u.gender='FEMALE' and up.value='1' order by rand();
  ${sql} and u.gender='MALE' and up.value='1' order by rand();
  ${sql} and u.gender='FEMALE' and up.value='2' order by rand();
  ${sql} and u.gender='MALE' and up.value='2' order by rand();
  ${sql} and u.gender='FEMALE' and up.value='3' order by rand();
  ${sql} and u.gender='MALE' and up.value='3' order by rand();
  ${sql} and u.gender='FEMALE' and up.value='4' order by rand();
  ${sql} and u.gender='MALE' and up.value='4' order by rand();
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
