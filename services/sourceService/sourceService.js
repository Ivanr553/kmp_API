const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const Source = {

  constructURL: (req) => {

    //Assigning variables
    let subject = req.request.subject
    let season = req.request.season
    let crn = req.request.crn
    let year = req.request.year

    //Formatting season
    switch(season) {
      case 'Fall':
        season = '07'
        break
      case 'Spring':
        season = '03'
        break
      case 'Summer':
        season = '05'
        break
    }

    //Constructing url
    let url = 'https://ssb.vcccd.edu/prod/pw_pub_sched.p_course_popup?vsub='
      + subject
      + '&vterm='
      + year
      + season
      + '&vcrn='
      + crn

    return url
  },

  //Returns true or false depending on waitlist availability
  getHtmlSource: (url) => {

    //Making request for page to parse
    var req = new XMLHttpRequest()
    req.open('GET', url, false)
    req.send(null)

    //Setting variable for response html text
    let text = req.responseText

    //Finding waitlist slots
    let info = text.slice(3098, 3099)

    //Returning true or false depending on the state of the waitlist
    info = info == '0' ? true : false

    return info

  }

}

module.exports = Source
