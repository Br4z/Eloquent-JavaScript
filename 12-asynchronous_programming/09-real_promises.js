import text_file from './07-asynchronous_bugs.js';
import activity_graph from './08-quiet_times.js';

function activity_table_v1(day) {
  const table = Array(24).fill(0);

  return text_file('camera_logs.txt')
    .then((files) => {
      return Promise.all(
        files.split('\n').map((log) => {
          return text_file(log).then((log_content) => {
            for (let timestamp of log_content.split('\n')) {
              const date = new Date(parseInt(timestamp));
              if (date.getDay() == day) table[date.getHours()]++;
            }
          });
        }),
      );
    })
    .then(() => table);
}

function activity_table_v2(day) {
  return text_file('camera_logs.txt')
    .then((files) => {
      return Promise.all(files.split('\n').map(text_file));
    })
    .then((logs) => {
      const table = Array(24).fill(0);

      for (let log of logs) {
        for (let timestamp of log.split('\n')) {
          const date = new Date(parseInt(timestamp));
          if (date.getDay() == day) table[date.getHours()]++;
        }
      }

      return table;
    });
}

/* ---------------------------------- TEST ---------------------------------- */

activity_table_v1(1).then((table) => console.log(activity_graph(table)));

activity_table_v2(1).then((table) => console.log(activity_graph(table)));
