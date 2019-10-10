var pparse = require('papaparse');
var fs = require('fs');

function findQualtricsUrl(studyId, cb) {
    let found = false;
    pparse.parse(fs.createReadStream(__dirname + '/./dummy.csv', 'utf-8'), {
        step: function(results, parser) {
            const { study_ID: id, Link: survey } = results.data;
            console.log(results);
            console.log(id, studyId)
            if (studyId === id) {
                found = true;
                cb(survey);
                parser.abort();
            }
        },
        error: function(err, file) {
            console.log(err);
        },
        header: true,
        complete: function() {
            // console.log(found);
            if (!found) {
                cb('https://connectingtocongress.org');
            }
        }
    });
}

module.exports = findQualtricsUrl;
