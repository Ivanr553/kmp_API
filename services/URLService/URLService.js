const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const URL = {

  //Accepts the classID as a string as its argument
  construct: (id) => {

    //Extracting values from url concatenation
    let subject = id.slice(0, id.indexOf('.'))
    id = id.slice(id.indexOf('.')+1)

    let year = id.slice(0, id.indexOf('.'))
    id = id.slice(id.indexOf('.')+1)

    let season = id.slice(0, id.indexOf('.'))
    id = id.slice(id.indexOf('.')+1)

    let crn = id.slice(0, id.indexOf('.'))

    //Formatting season to fit url parameters
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

    //Constructing url with parameters
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
  checkWaitlist: (list) => {

    let url = list[0]

    //Making request for page to parse
    let req = new XMLHttpRequest()
    req.open('GET', url, false)
    req.send(null)

    //Setting variable for response html text
    let resHTML = req.responseText

    //Finding waitlist slots in html response
    let waitlistSpots = resHTML.slice(resHTML.lastIndexOf('default3')+10, resHTML.lastIndexOf('default3')+11)

    //Creating boolean for waitlist availability
    let waitlistBoolean = false

    if(waitlistSpots) {
      //Returning true or false depending on the state of the waitlist
      waitlistBoolean = waitlistSpots >= '0' ? true : false
    }

    //Constructing result
    let results = {
        listItem: list[0],
        spots: waitlistSpots,
        isAvailable: waitlistBoolean
    }

    return results

  },

  //Formats the database ClassIDs to proper urls to be used by the URL.checkWaitlist method
  format: async function() {

    let list = await DB.findClassList()
    list = list.classIDs

    list = list.map( (id) => {
      return URL.constructURL(id)
    })

    return(list)
  }

}

module.exports = URL
