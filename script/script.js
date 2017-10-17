const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const Script = {

  parseReq: (req) => {

    let subject = req.request.subject
    let season = req.request.season
    let crn = req.request.crn
    let year = req.request.year

    //Formatting season
    switch(season) {
      case 'Fall':
        season = 07
        break
      case 'Spring':
        season = 03
        break
      case 'Summer':
        season = 05
        break
    }

    let url = 'https://ssb.vcccd.edu/prod/pw_pub_sched.p_course_popup?vsub=' + subject + '&vterm=' + year + season + '&vcrn=' + crn

    console.log(url)

    return url
  },

  getHtmlSource: (url) => {

    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);

    let text = req.text
    console.log(text)

    let info = text.slice((text.lastIndexOf('default3')), 11)

    return info

  }

}

module.exports = Script

// notes
//   year: number
//   season:
//     spring: 03
//     summer: 05
//     fall: 07
