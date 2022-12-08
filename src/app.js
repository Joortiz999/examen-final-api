const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const prompt = require('prompt-sync')({sigint: true});

const app = express();
const port = 3040;

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

axios.get('https://comicvine.gamespot.com/api/issues/?api_key=6f7e42c1a04a1903ca5c2a635e441781e12a537b&format=json&field_list=date_added,description,image,name,issue_number,volume,api_detail_url')
  .then(response => {
    var obj = response.data.results;
    var i = 20; // Visualize 10 at a time
    // objArray = [
    //   {
    //     "Issue_#1": [
    //       "<img src = " + obj[i].image.original_url + ">",
    //       obj[i].volume.name + " #" + obj[i].issue_number,
    //       `${obj[i].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i].date_added,
    //       obj[i].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#2": [
    //       obj[i].image.original_url,
    //       obj[i + 1].volume.name + " #" + obj[i + 1].issue_number,
    //       `${obj[i + 1].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 1].date_added,
    //       obj[i + 1].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#3": [
    //       obj[i + 2].image.original_url,
    //       obj[i + 2].volume.name + " #" + obj[i + 2].issue_number,
    //       `${obj[i + 2].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 2].date_added,
    //       obj[i + 2].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#4": [
    //       obj[i + 3].image.original_url,
    //       obj[i + 3].volume.name + " #" + obj[i + 3].issue_number,
    //       `${obj[i + 3].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 3].date_added,
    //       obj[i + 3].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#5": [
    //       obj[i + 4].image.original_url,
    //       obj[i + 4].volume.name + " #" + obj[i + 4].issue_number,
    //       `${obj[i + 4].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 4].date_added,
    //       obj[i + 4].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#6": [
    //       obj[i + 5].image.original_url,
    //       obj[i + 5].volume.name + " #" + obj[i + 5].issue_number,
    //       `${obj[i + 5].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 5].date_added,
    //       obj[i + 5].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#7": [
    //       obj[i + 6].image.original_url,
    //       obj[i + 6].volume.name + " #" + obj[i + 6].issue_number,
    //       `${obj[i + 6].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 6].date_added,
    //       obj[i + 6].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#8": [
    //       obj[i + 7].image.original_url,
    //       obj[i + 7].volume.name + " #" + obj[i + 7].issue_number,
    //       `${obj[i + 7].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 7].date_added,
    //       obj[i + 7].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#9": [
    //       obj[i + 8].image.original_url,
    //       obj[i + 8].volume.name + " #" + obj[i + 8].issue_number,
    //       `${obj[i + 8].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 8].date_added,
    //       obj[i + 8].api_detail_url
    //     ]
    //   },
    //   {
    //     "Issue_#10": [
    //       obj[i + 9].image.original_url,
    //       obj[i + 9].volume.name + " #" + obj[i + 9].issue_number,
    //       `${obj[i + 9].description}`.replace(/<[^>]*>?/gm, ''),
    //       obj[i + 9].date_added,
    //       obj[i + 9].api_detail_url]
    //   }]
    const issuesHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>
  <body id="body">
    <main>
      <div class="title"><h1>Comic Books</h1></div>
      <div>

        <div class="row"> 
  <div class="column">
    <img src = "${obj[i].image.original_url}" height="200">
    <h3>${obj[i].volume.name + " #" + obj[i].issue_number}</h3>
    <p>${`${obj[i].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
    <p style="color:gray">${obj[i].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 1].image.original_url}" height="200">
  <h3>${obj[i + 1].volume.name + " #" + obj[i + 1].issue_number}</h3>
  <p>${`${obj[i + 1].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 1].date_added}</p>
  </div> 
  <div class="column">
  <img src = "${obj[i + 2].image.original_url}" height="200">
  <h3>${obj[i + 2].volume.name + " #" + obj[i + 2].issue_number}</h3>
  <p>${`${obj[i + 2].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 2].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 3].image.original_url}" height="200">
  <h3>${obj[i + 3].volume.name + " #" + obj[i + 3].issue_number}</h3>
  <p>${`${obj[i + 3].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 3].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 4].image.original_url}" height="200">
  <h3>${obj[i + 4].volume.name + " #" + obj[i + 4].issue_number}</h3>
  <p>${`${obj[i + 4].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 4].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 5].image.original_url}" height="200">
  <h3>${obj[i + 5].volume.name + " #" + obj[i + 5].issue_number}</h3>
  <p>${`${obj[i + 5].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 5].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 6].image.original_url}" height="200">
  <h3>${obj[i + 6].volume.name + " #" + obj[i + 6].issue_number}</h3>
  <p>${`${obj[i + 6].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 6].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 7].image.original_url}" height="200">
  <h3>${obj[i + 7].volume.name + " #" + obj[i + 7].issue_number}</h3>
  <p>${`${obj[i + 7].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 7].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 8].image.original_url}" height="200">
  <h3>${obj[i + 8].volume.name + " #" + obj[i + 8].issue_number}</h3>
  <p>${`${obj[i + 8].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 8].date_added}</p>
  </div>
  <div class="column">
  <img src = "${obj[i + 8].image.original_url}" height="200">
  <h3>${obj[i + 9].volume.name + " #" + obj[i + 9].issue_number}</h3>
  <p>${`${obj[i + 9].description}`.replace(/<[^>]*>?/gm, '').replace(null, "No Description")}</p>
  <p style="color:gray">${obj[i + 9].date_added}</p>
  </div>
</div>
      </div>
    </main>
  </body>
</html>
`;
const iSelectedInput = prompt('What comic book issue you want to select?');
console.log(`Selected ${Number(iSelectedInput)+Number(i)}`);
    var iSelected = Number(iSelectedInput)+ Number(i);
    var api_detail_url = obj[iSelected].api_detail_url;
    console.log("Detail Issue Selected: "+api_detail_url)
    axios.get(`${api_detail_url}?api_key=6f7e42c1a04a1903ca5c2a635e441781e12a537b&format=json&field_list=image,character_credits,team_credits,location_credits`)
      .then(response => {
        var objDetail = response.data.results;
        if (typeof objDetail.character_credits[0] == `undefined`) { objDetail.character_credits = 'No character credits' }
        else if (typeof objDetail.character_credits[0] != `undefined` && typeof objDetail.character_credits[1] != `undefined` && typeof objDetail.character_credits[2] != `undefined`) {
          objDetail.character_credits = objDetail.character_credits[0].name + ", " + objDetail.character_credits[1].name + ", " + objDetail.character_credits[2].name;
        }
        else if (typeof objDetail.character_credits[0] != `undefined` && typeof objDetail.character_credits[1] != `undefined`) {
          objDetail.character_credits = objDetail.character_credits[0].name + ", " + objDetail.character_credits[1].name;
        } else if (typeof objDetail.character_credits[0] != `undefined`) {
          objDetail.character_credits = objDetail.character_credits[0].name;
        };
        if (typeof objDetail.team_credits[0] == `undefined`) { objDetail.team_credits = "No team credits" }
        else if (typeof objDetail.team_credits[0] != `undefined` && typeof objDetail.team_credits[1] != `undefined` && typeof objDetail.team_credits[2] != `undefined`) {
          objDetail.team_credits = objDetail.team_credits[0].name + ", " + objDetail.team_credits[1].name + ", " + objDetail.team_credits[2].name;
        }
        else if (typeof objDetail.team_credits[0] != `undefined` && typeof objDetail.team_credits[1] != `undefined`) {
          objDetail.team_credits = objDetail.team_credits[0].name + ", " + objDetail.team_credits[1].name;
        } else if (typeof objDetail.team_credits[0] != `undefined`) {
          objDetail.team_credits = objDetail.team_credits[0].name;
        };
        if (typeof objDetail.location_credits[0] == `undefined`) { objDetail.location_credits = "No location credits" }
        else if (typeof objDetail.location_credits[0] != `undefined` && typeof objDetail.location_credits[1] != `undefined` && typeof objDetail.location_credits[2] != `undefined`) {
          objDetail.location_credits = objDetail.location_credits[0].name + ", " + objDetail.location_credits[1].name + ", " + objDetail.location_credits[2].name;
        }
        else if (typeof objDetail.location_credits[0] != `undefined` && typeof objDetail.location_credits[1] != `undefined`) {
          objDetail.location_credits = objDetail.location_credits[0].name + ", " + objDetail.location_credits[1].name;
        } else if (typeof objDetail.location_credits[0] != `undefined`) {
          objDetail.location_credits = objDetail.location_credits[0].name;
        };
        // objDetailArray =
        //   objDetail.image.original_url,
        //   { character_credits: objDetail.character_credits },
        //   { team_credits: objDetail.team_credits },
        //   { location_credits: objDetail.location_credits }

        const issueDetailHTML = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            </head>
            <body id="body">
              <main>
                <div class="title"><h1>Comic Book Detail</h1></div>
                <div>

                  <div class="row">
            <div class="column">
              <img src = "${objDetail.image.original_url}" height="500">
            </div>
            <div class="column">
            <script type= "text/javascript">
            if ${Object.keys(objDetail.character_credits).length} != 0 {
              ${character_Credits_body = objDetail.character_credits}
            } 
            </script>
            <div>
            <h4 style="">Character Credits: </h4>
            ${character_Credits_body + "<br>"}
            </div>
            </div> 
            <div class="column">
            <script type= "text/javascript">
            if ${Object.keys(objDetail.team_credits).length} != 0 {
              ${team_Credits_body = objDetail.team_credits}
            }
            </script>
            <div>
            <h4 style="">Team Credits: </h4>
            ${team_Credits_body + "<br>"}
            </div>
            </div> 
            <div class="column">
            <script type= "text/javascript">
            if ${Object.keys(objDetail.location_credits).length} != 0 {
              ${location_Credits_body = objDetail.location_credits}
            }
            </script>
            <div>
            <h4 style="">Location Credits: </h4>
            ${location_Credits_body + "<br>"}
            </div>
            </div> 
          </div>
                </div>
              </main>
            </body>
          </html>
          `;
        app.get("/detailissue", (req, res) => res.send(issueDetailHTML));
      })
      .catch(error => {
        console.log(error);
      });
    app.get("/", (req, res) => res.send(issuesHTML));
  })
  .catch(error => {
    console.log(error);
  });


app.listen(port, () => console.log(`Comic Book app listening on port ${port}!`));